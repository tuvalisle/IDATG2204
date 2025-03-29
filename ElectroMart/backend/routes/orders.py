from flask import Blueprint, request, jsonify
from ElectroMart.backend.db import get_db_connection
from functools import wraps
import jwt

order_routes = Blueprint('orders', __name__)

# Hemmelig nøkkel for å verifisere JWT (samme som i users.py)
SECRET_KEY = "supersecretkey"

# Funksjon for å kreve autentisering på endepunkter
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'error': 'Token is missing!'}), 401
        
        try:
            # Fjern "Bearer " fra tokenet hvis det er inkludert
            token = token.replace("Bearer ", "")
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.user_id = data['user_id']
        except:
            return jsonify({'error': 'Invalid or expired token!'}), 401

        return f(*args, **kwargs)
    return decorated

# POST: Opprett ny bestilling
@order_routes.route('/orders', methods=['POST'])
@token_required  # Krever autentisering
def create_order():
    try:
        data = request.json
        required_fields = ['products']  # 'products' skal være en liste med {product_id, quantity}
        
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Opprett ny bestilling (bruker-ID hentes fra token)
        cursor.execute("INSERT INTO Orders (user_id) VALUES (%s)", (request.user_id,))
        order_id = cursor.lastrowid

        # Legg til produkter i OrderItem-tabellen
        for product in data['products']:
            cursor.execute("INSERT INTO OrderItem (order_id, product_id, quantity, subtotal) VALUES (%s, %s, %s, %s)",
                           (order_id, product['product_id'], product['quantity'], product['quantity'] * 100))  # Subtotal = pris * antall
        
        conn.commit()
        conn.close()

        return jsonify({'message': 'Order created successfully', 'order_id': order_id}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500




@order_routes.route('/orders', methods=['GET'])
@token_required
def get_orders():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # Hent kun ordrene til den innloggede brukeren
    cursor.execute("SELECT * FROM Orders WHERE user_id = %s", (request.user_id,))
    orders = cursor.fetchall()
    
    conn.close()
    return jsonify(orders)


# PUT: Oppdater ordrestatus
@order_routes.route('/orders/<int:order_id>', methods=['PUT'])
@token_required
def update_order(order_id):
    try:
        data = request.json
        if 'status' not in data:
            return jsonify({'error': 'Missing status field'}), 400
        
        conn = get_db_connection()
        cursor = conn.cursor()

        # Sjekk om ordren tilhører brukeren
        cursor.execute("SELECT user_id FROM Orders WHERE order_id = %s", (order_id,))
        order = cursor.fetchone()
        if not order:
            return jsonify({'error': 'Order not found'}), 404
        if order[0] != request.user_id:
            return jsonify({'error': 'Unauthorized to update this order'}), 403

        # Oppdater status
        cursor.execute("UPDATE Orders SET status = %s WHERE order_id = %s", (data['status'], order_id))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Order updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# DELETE: Slett en ordre
@order_routes.route('/orders/<int:order_id>', methods=['DELETE'])
@token_required
def delete_order(order_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Sjekk om ordren eksisterer og tilhører brukeren
        cursor.execute("SELECT user_id, status FROM Orders WHERE order_id = %s", (order_id,))
        order = cursor.fetchone()
        if not order:
            return jsonify({'error': 'Order not found'}), 404
        if order[0] != request.user_id:
            return jsonify({'error': 'Unauthorized to delete this order'}), 403
        if order[1] != 'pending':
            return jsonify({'error': 'Only pending orders can be deleted'}), 400

        # Slett ordre og tilhørende OrderItem-poster
        cursor.execute("DELETE FROM OrderItem WHERE order_id = %s", (order_id,))
        cursor.execute("DELETE FROM Orders WHERE order_id = %s", (order_id,))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Order deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

