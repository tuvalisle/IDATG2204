from flask import Flask
from routes.products import product_routes

app = Flask(__name__)

# Registrer ruter
app.register_blueprint(product_routes)

if __name__ == '__main__':
    app.run(debug=True)
