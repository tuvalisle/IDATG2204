import mysql.connector
from config import DATABASE_CONFIG

def get_db_connection():
    conn = mysql.connector.connect(**DATABASE_CONFIG)
    return conn
