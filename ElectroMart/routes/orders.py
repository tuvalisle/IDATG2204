from flask import Blueprint, request, jsonify
from db import get_db_connection
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
