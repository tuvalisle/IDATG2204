from flask import Blueprint, request, jsonify
from db import get_db_connection

product_routes = Blueprint('products', __name__)

@product_routes.route('/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Product")
    products = cursor.fetchall()
    conn.close()
    return jsonify(products)

@product_routes.route('/products', methods=['POST'])
def add_product():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Product (name, description, price, stock_quantity, category_id, brand_id) VALUES (%s, %s, %s, %s, %s, %s)",
                   (data['name'], data['description'], data['price'], data['stock_quantity'], data['category_id'], data['brand_id']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Product added successfully!'}), 201
