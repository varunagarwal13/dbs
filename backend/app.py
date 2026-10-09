from flask import Flask, jsonify, request
from flask_cors import CORS
import oracledb
import os
import logging
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
# Restrict CORS to frontend
CORS(app, origins=["http://localhost:3000"])

# Setup logging
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

# Oracle Connection Configuration
ORACLE_USER = os.getenv('ORACLE_USER', 'system')
ORACLE_PASSWORD = os.getenv('ORACLE_PASSWORD') # No default secret!
ORACLE_DSN = os.getenv('ORACLE_DSN', 'localhost:1521/XE')

DEFAULT_CUSTOMER_ID = '25BYB0186'

pool = None

def init_db_pool():
    global pool
    try:
        pool = oracledb.create_pool(
            user=ORACLE_USER,
            password=ORACLE_PASSWORD,
            dsn=ORACLE_DSN,
            min=1,
            max=5,
            increment=1
        )
        print("Successfully connected to Oracle Database")
    except Exception as e:
        logger.error(f"Error creating connection pool: {e}")

def get_connection():
    if pool is None:
        raise Exception("Database pool not initialized")
    return pool.acquire()

@app.route('/products', methods=['GET'])
def get_products():
    search = request.args.get('search', '')
    try:
        with get_connection() as connection:
            with connection.cursor() as cursor:
                if search:
                    sql = """
                        SELECT p.Product_ID, p.Product_Name, p.Brand, p.Price, NVL(i.Available_Quantity, 0) as Available_Quantity
                        FROM Product p
                        LEFT JOIN Inventory i ON p.Product_ID = i.Product_ID
                        WHERE LOWER(p.Product_Name) LIKE LOWER(:search) OR LOWER(p.Brand) LIKE LOWER(:search)
                    """
                    cursor.execute(sql, search=f'%{search}%')
                else:
                    sql = """
                        SELECT p.Product_ID, p.Product_Name, p.Brand, p.Price, NVL(i.Available_Quantity, 0) as Available_Quantity
                        FROM Product p
                        LEFT JOIN Inventory i ON p.Product_ID = i.Product_ID
                    """
                    cursor.execute(sql)

                columns = [col[0].lower() for col in cursor.description]
                products = [dict(zip(columns, row)) for row in cursor.fetchall()]
                return jsonify({'success': True, 'data': products}), 200
    except Exception as e:
        if str(e) == "Database pool not initialized":
            return jsonify({'success': False, 'error': 'Service Unavailable'}), 503
        logger.error(f"DB Error in /products: {e}")
        return jsonify({'success': False, 'error': 'Internal Server Error'}), 500

@app.route('/cart', methods=['GET'])
def get_cart():
    customer_id = request.args.get('customer_id', DEFAULT_CUSTOMER_ID)
    try:
        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT ci.Cart_Item_ID, ci.Product_ID, ci.Quantity,
                           p.Product_Name, p.Brand, p.Price, NVL(i.Available_Quantity, 0) as Available_Quantity
                    FROM Cart c
                    JOIN Cart_Item ci ON c.Cart_ID = ci.Cart_ID
                    JOIN Product p ON ci.Product_ID = p.Product_ID
                    LEFT JOIN Inventory i ON p.Product_ID = i.Product_ID
                    WHERE c.Customer_ID = :1
                    ORDER BY ci.Cart_Item_ID
                """, [customer_id])
                columns = [col[0].lower() for col in cursor.description]
                items = [dict(zip(columns, row)) for row in cursor.fetchall()]
                return jsonify({'success': True, 'data': items}), 200
    except Exception as e:
        if str(e) == "Database pool not initialized":
            return jsonify({'success': False, 'error': 'Service Unavailable'}), 503
        logger.error(f"DB Error in /cart: {e}")
        return jsonify({'success': False, 'error': 'Internal Server Error'}), 500

@app.route('/cart/add', methods=['POST'])
def add_to_cart():
    data = request.json or {}
    customer_id = data.get('customer_id', DEFAULT_CUSTOMER_ID)
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)

    if not product_id:
        return jsonify({'success': False, 'error': 'Product ID is required'}), 400
        
    try:
        quantity = int(quantity)
        if quantity < 1:
            return jsonify({'success': False, 'error': 'Quantity must be at least 1'}), 400
    except ValueError:
        return jsonify({'success': False, 'error': 'Invalid quantity format'}), 400

    try:
        with get_connection() as connection:
            with connection.cursor() as cursor:
                # Check product existence and inventory
                cursor.execute("SELECT NVL(Available_Quantity, 0) FROM Inventory WHERE Product_ID = :1", [product_id])
                inv_row = cursor.fetchone()
                if not inv_row:
                    return jsonify({'success': False, 'error': 'Product not found or out of stock'}), 404
                available_stock = inv_row[0]
                
                # Check cart
                cursor.execute("SELECT Cart_ID FROM Cart WHERE Customer_ID = :1", [customer_id])
                row = cursor.fetchone()
                if not row:
                    return jsonify({'success': False, 'error': 'Cart not found for this customer'}), 404
                cart_id = row[0]

                # Check existing cart item (use FOR UPDATE to lock row against race conditions)
                cursor.execute(
                    "SELECT Cart_Item_ID, Quantity FROM Cart_Item WHERE Cart_ID = :1 AND Product_ID = :2 FOR UPDATE",
                    [cart_id, product_id])
                item = cursor.fetchone()

                if item:
                    new_qty = item[1] + quantity
                    if new_qty > available_stock:
                        return jsonify({'success': False, 'error': f'Cannot add {quantity}. Only {available_stock - item[1]} more available.'}), 400
                    
                    cursor.execute("UPDATE Cart_Item SET Quantity = :1 WHERE Cart_Item_ID = :2", [new_qty, item[0]])
                else:
                    if quantity > available_stock:
                        return jsonify({'success': False, 'error': f'Not enough stock. Only {available_stock} available.'}), 400
                        
                    cursor.execute(
                        "INSERT INTO Cart_Item (Cart_ID, Product_ID, Quantity) VALUES (:1, :2, :3)",
                        [cart_id, product_id, quantity])

                connection.commit()

                # Return the Cart_Item_ID
                cursor.execute(
                    "SELECT Cart_Item_ID, Quantity FROM Cart_Item WHERE Cart_ID = :1 AND Product_ID = :2",
                    [cart_id, product_id])
                saved = cursor.fetchone()

                return jsonify({
                    'success': True,
                    'message': 'Item successfully added to cart',
                    'cart_item_id': saved[0],
                    'quantity': saved[1]
                }), 201
    except Exception as e:
        if str(e) == "Database pool not initialized":
            return jsonify({'success': False, 'error': 'Service Unavailable'}), 503
        logger.error(f"DB Error in /cart/add: {e}")
        return jsonify({'success': False, 'error': 'Internal Server Error'}), 500

@app.route('/cart/update/<int:item_id>', methods=['PUT'])
def update_cart_item(item_id):
    data = request.json or {}
    quantity = data.get('quantity')
    
    try:
        quantity = int(quantity)
        if quantity < 1:
             return jsonify({'success': False, 'error': 'Quantity must be at least 1'}), 400
    except (ValueError, TypeError):
        return jsonify({'success': False, 'error': 'Valid integer quantity is required'}), 400

    try:
        with get_connection() as connection:
            with connection.cursor() as cursor:
                # Need to lock the item and check inventory
                cursor.execute("""
                    SELECT ci.Product_ID, NVL(i.Available_Quantity, 0) 
                    FROM Cart_Item ci 
                    LEFT JOIN Inventory i ON ci.Product_ID = i.Product_ID 
                    WHERE ci.Cart_Item_ID = :1 FOR UPDATE
                """, [item_id])
                item_data = cursor.fetchone()
                
                if not item_data:
                    return jsonify({'success': False, 'error': 'Cart item not found'}), 404
                    
                available_stock = item_data[1]
                
                if quantity > available_stock:
                    return jsonify({'success': False, 'error': f'Not enough stock. Only {available_stock} available.'}), 400

                cursor.execute("UPDATE Cart_Item SET Quantity = :1 WHERE Cart_Item_ID = :2", [quantity, item_id])
                connection.commit()
                return jsonify({'success': True, 'message': 'Cart item updated'}), 200
    except Exception as e:
        if str(e) == "Database pool not initialized":
            return jsonify({'success': False, 'error': 'Service Unavailable'}), 503
        logger.error(f"DB Error in /cart/update: {e}")
        return jsonify({'success': False, 'error': 'Internal Server Error'}), 500

@app.route('/cart/remove/<int:item_id>', methods=['DELETE'])
def remove_cart_item(item_id):
    try:
        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM Cart_Item WHERE Cart_Item_ID = :1", [item_id])
                if cursor.rowcount == 0:
                    return jsonify({'success': False, 'error': 'Cart item not found'}), 404
                connection.commit()
                return jsonify({'success': True, 'message': 'Item removed from cart'}), 200
    except Exception as e:
        if str(e) == "Database pool not initialized":
            return jsonify({'success': False, 'error': 'Service Unavailable'}), 503
        logger.error(f"DB Error in /cart/remove: {e}")
        return jsonify({'success': False, 'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    init_db_pool()
    # Debug=True is OK for local demo, but we should not expose to 0.0.0.0 safely
    app.run(debug=True, port=5000)