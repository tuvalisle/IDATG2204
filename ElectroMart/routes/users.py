from flask import Blueprint, request, jsonify
from db import get_db_connection
import bcrypt  # For passordhashing
import jwt
import datetime

user_routes = Blueprint('users', __name__)

# Hemmelig nøkkel for å signere JWT (Bør lagres sikkert, f.eks. i .env-fil)
SECRET_KEY = "supersecretkey"

# POST: Registrer ny bruker
@user_routes.route('/users/register', methods=['POST'])
def register_user():
    try:
        data = request.json
        required_fields = ['first_name', 'last_name', 'email', 'password', 'address', 'phone_number']
        
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Hash passordet før lagring
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO Users (first_name, last_name, email, password_hash, address, phone_number)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (
            data['first_name'], data['last_name'], data['email'], hashed_password, data['address'], data['phone_number']
        ))

        conn.commit()
        new_user_id = cursor.lastrowid
        conn.close()

        return jsonify({'message': 'User registered successfully', 'user_id': new_user_id}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# GET: Hent alle brukere
@user_routes.route('/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT user_id, first_name, last_name, email, address, phone_number FROM Users")
    users = cursor.fetchall()
    conn.close()
    return jsonify(users)

# POST: Logg inn bruker og returner JWT-token
@user_routes.route('/users/login', methods=['POST'])
def login_user():
    try:
        data = request.json
        required_fields = ['email', 'password']

        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing email or password'}), 400

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Sjekk om brukeren finnes i databasen
        cursor.execute("SELECT * FROM Users WHERE email = %s", (data['email'],))
        user = cursor.fetchone()
        conn.close()

        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401

        # Verifiser passordet
        if not bcrypt.checkpw(data['password'].encode('utf-8'), user['password_hash'].encode('utf-8')):
            return jsonify({'error': 'Invalid email or password'}), 401

        # Generer JWT-token
        token = jwt.encode({
            'user_id': user['user_id'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token utløper etter 1 time
        }, SECRET_KEY, algorithm="HS256")

        return jsonify({'token': token}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
