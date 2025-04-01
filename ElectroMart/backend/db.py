import mysql.connector
#from ElectroMart.backend.config import DATABASE_CONFIG
from config import DATABASE_CONFIG


def get_db_connection():
    conn = mysql.connector.connect(**DATABASE_CONFIG)
    return conn
