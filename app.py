from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample products data
products = [
    { "id": 1, "name": "Product 1", "price": "$20", "img": "https://via.placeholder.com/200" },
    { "id": 2, "name": "Product 2", "price": "$30", "img": "https://via.placeholder.com/200" },
    # Add more products as needed
]

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True)
