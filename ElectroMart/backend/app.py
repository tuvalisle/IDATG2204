from flask import Flask
from flask_cors import CORS
from routes.products import product_routes
from routes.users import user_routes
from routes.orders import order_routes

# Enable CORS for all routes


app = Flask(__name__)
CORS(app)


# Registrer ruter
app.register_blueprint(product_routes)
app.register_blueprint(user_routes)
app.register_blueprint(order_routes)

if __name__ == '__main__':
    app.run(debug=True, port=8080)


app.register_blueprint(user_routes)
app.register_blueprint(order_routes)
