from flask import Blueprint, request, jsonify
from db import get_db_connection

product_routes = Blueprint('products', __name__)

# GET: Hent alle produkter
@product_routes.route('/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Product")
    products = cursor.fetchall()
    conn.close()
    return jsonify(products)

# POST: Legg til et nytt produkt
@product_routes.route('/products', methods=['POST'])
def add_product():
    try:
        data = request.json  # Hent JSON-data fra forespørselen

        # Sjekk at alle nødvendige felter er inkludert
        required_fields = ['name', 'description', 'price', 'stock_quantity', 'category_id', 'brand_id']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # Koble til databasen
        conn = get_db_connection()
        cursor = conn.cursor()

        # Legg til produktet i databasen
        query = """
        INSERT INTO Product (name, description, price, stock_quantity, category_id, brand_id)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (
            data['name'], 
            data['description'], 
            data['price'], 
            data['stock_quantity'], 
            data['category_id'], 
            data['brand_id']
        ))

        conn.commit()
        new_product_id = cursor.lastrowid  # Få ID-en til det nye produktet
        conn.close()

        return jsonify({'message': 'Product added successfully', 'product_id': new_product_id}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@product_routes.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    try:
        data = request.json  # Hent JSON-data fra forespørselen

        # Sjekk at minst ett felt er oppgitt for oppdatering
        updatable_fields = ['name', 'description', 'price', 'stock_quantity', 'category_id', 'brand_id']
        update_values = {key: data[key] for key in updatable_fields if key in data}
        
        if not update_values:
            return jsonify({'error': 'No fields provided for update'}), 400

        # Koble til databasen
        conn = get_db_connection()
        cursor = conn.cursor()

        # Dynamisk bygge SET-delen av SQL-spørringen
        set_clause = ', '.join(f"{key} = %s" for key in update_values.keys())
        query = f"UPDATE Product SET {set_clause} WHERE product_id = %s"
        
        cursor.execute(query, (*update_values.values(), product_id))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Product updated successfully'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@product_routes.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        # Koble til databasen
        conn = get_db_connection()
        cursor = conn.cursor()

        # Sjekk om produktet finnes før sletting
        cursor.execute("SELECT * FROM Product WHERE product_id = %s", (product_id,))
        product = cursor.fetchone()
        
        if not product:
            conn.close()
            return jsonify({'error': 'Product not found'}), 404

        # Slett produktet
        cursor.execute("DELETE FROM Product WHERE product_id = %s", (product_id,))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Product deleted successfully'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

