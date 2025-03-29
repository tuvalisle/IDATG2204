from flask import Flask
from routes.products import product_routes
from routes.users import user_routes
from routes.orders import order_routes

app = Flask(__name__)

# Registrer ruter
app.register_blueprint(product_routes)
app.register_blueprint(user_routes)
app.register_blueprint(order_routes)

if __name__ == '__main__':
    app.run(debug=True)


app.register_blueprint(user_routes)
app.register_blueprint(order_routes)
