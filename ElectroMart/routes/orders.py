from flask import Blueprint, request, jsonify
from db import get_db_connection

order_routes = Blueprint('orders', __name__)

# POST: Opprett ny bestilling
@order_routes.route('/orders', methods=['POST'])
def create_order():
    try:
        data = request.json
        required_fields = ['user_id', 'products']  # 'products' skal være en liste med {product_id, quantity}
        
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Opprett ny bestilling
        cursor.execute("INSERT INTO Orders (user_id) VALUES (%s)", (data['user_id'],))
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

# GET: Hent alle bestillinger
@order_routes.route('/orders', methods=['GET'])
def get_orders():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Orders")
    orders = cursor.fetchall()
    conn.close()
    return jsonify(orders)
