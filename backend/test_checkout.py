import requests

print('Testing Endpoints...')

try:
    # 1. Get products
    res = requests.get('http://localhost:5000/products')
    products = res.json().get('data', [])
    print(f'1. GET /products: Found {len(products)} products.')
    if not products:
        print('FAIL: No products found.')
        exit(1)

    product_id = products[0]['product_id']

    # 2. Add to cart
    add_res = requests.post('http://localhost:5000/cart/add', json={'product_id': product_id, 'quantity': 1})
    if add_res.status_code != 201:
        print(f'FAIL: /cart/add returned {add_res.status_code}', add_res.text)
        exit(1)
    print('2. POST /cart/add: Successfully added item to cart.')

    # 3. Checkout
    checkout_res = requests.post('http://localhost:5000/checkout', json={})
    if checkout_res.status_code != 201:
        print(f'FAIL: /checkout returned {checkout_res.status_code}', checkout_res.text)
        exit(1)
    order_id = checkout_res.json().get('order_id')
    print(f'3. POST /checkout: Successfully checked out. Order ID: {order_id}')

    # 4. Get Orders
    orders_res = requests.get('http://localhost:5000/orders')
    orders = orders_res.json().get('data', [])
    print(f'4. GET /orders: Found {len(orders)} orders.')

    # 5. Get Order Details
    order_res = requests.get(f'http://localhost:5000/orders/{order_id}')
    order_data = order_res.json().get('data', {})
    items = order_data.get("items", [])
    print(f'5. GET /orders/{order_id}: Fetched order details successfully. Items: {len(items)}')

    print('ALL TESTS PASSED!')
except Exception as e:
    print("Test script failed:", e)
    exit(1)
