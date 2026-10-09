import requests
import oracledb
import os
import time
from dotenv import load_dotenv

load_dotenv('backend/.env')

BASE = 'http://localhost:5000'

def run_sql(sql, params=[]):
    try:
        conn = oracledb.connect(
            user=os.getenv('ORACLE_USER'),
            password=os.getenv('ORACLE_PASSWORD'),
            dsn=os.getenv('ORACLE_DSN')
        )
        cur = conn.cursor()
        cur.execute(sql, params)
        if sql.strip().upper().startswith("SELECT"):
            columns = [col[0] for col in cur.description]
            rows = cur.fetchall()
            conn.close()
            return {"columns": columns, "rows": rows}
        conn.commit()
        conn.close()
        return "SUCCESS"
    except Exception as e:
        return str(e)

print("=== PHASE 4: DATABASE EVIDENCE ===")

# 1. Load catalog: product count equals SELECT COUNT(*) from Product joined with Inventory
print("\n[STEP 1] Load catalog")
r = requests.get(f"{BASE}/products")
print(f"API Response Count: {len(r.json().get('data', []))}")
sql1 = "SELECT COUNT(*) FROM Product p LEFT JOIN Inventory i ON p.Product_ID = i.Product_ID"
print(f"SQL Result: {run_sql(sql1)}")

# 2. Search "keyboard" and a nonsense term
print("\n[STEP 2] Search")
r_kbd = requests.get(f"{BASE}/products?search=keyboard")
print(f"API Search 'keyboard' count: {len(r_kbd.json().get('data', []))}")
r_non = requests.get(f"{BASE}/products?search=zzxxyyzz")
print(f"API Search 'zzxxyyzz' count: {len(r_non.json().get('data', []))}")

# 3. Add product X: row appears in Cart_Item (give SELECT)
print("\n[STEP 3] Add product 1")
# First cleanup for clean test
run_sql("DELETE FROM Cart_Item WHERE Cart_ID = (SELECT Cart_ID FROM Cart WHERE Customer_ID = '25BYB0186')")
r3 = requests.post(f"{BASE}/cart/add", json={'product_id': 1, 'quantity': 1})
print(f"API Response: {r3.json()}")
sql3 = "SELECT Cart_Item_ID, Product_ID, Quantity FROM Cart_Item WHERE Cart_ID = (SELECT Cart_ID FROM Cart WHERE Customer_ID = '25BYB0186')"
print(f"SQL Result: {run_sql(sql3)}")

# 4. Add product X again: quantity increments, no duplicate row
print("\n[STEP 4] Add product 1 again")
r4 = requests.post(f"{BASE}/cart/add", json={'product_id': 1, 'quantity': 2})
print(f"API Response: {r4.json()}")
print(f"SQL Result: {run_sql(sql3)}")

# 5. Increase quantity via PUT: DB matches UI
item_id = r4.json().get('cart_item_id')
print(f"\n[STEP 5] Increase quantity via PUT (item_id={item_id})")
r5 = requests.put(f"{BASE}/cart/update/{item_id}", json={'quantity': 5})
print(f"API Response: {r5.json()}")
print(f"SQL Result: {run_sql(sql3)}")

# 6. Exceed available_quantity: rejected with a clear message, DB unchanged
print("\n[STEP 6] Exceed available_quantity")
r6 = requests.put(f"{BASE}/cart/update/{item_id}", json={'quantity': 9999})
print(f"API Response (Expected 400): {r6.status_code} - {r6.json()}")
print(f"SQL Result: {run_sql(sql3)}")

# 7. Decrease below 1: DELETE is called (frontend behavior simulated), row gone
# (Note: PUT < 1 returns 400. Frontend must call DELETE. So we simulate calling DELETE).
print("\n[STEP 7] Decrease below 1 (Frontend calls DELETE)")
r7_put = requests.put(f"{BASE}/cart/update/{item_id}", json={'quantity': 0})
print(f"API PUT quantity=0 Response: {r7_put.status_code} - {r7_put.json()}")
r7 = requests.delete(f"{BASE}/cart/remove/{item_id}")
print(f"API DELETE Response: {r7.status_code} - {r7.json()}")
print(f"SQL Result: {run_sql(sql3)}")

# 8. Remove item: row gone (tested in step 7)

# 9. Refresh with items in cart: cart is restored from GET /cart
print("\n[STEP 9] Restore from GET /cart")
requests.post(f"{BASE}/cart/add", json={'product_id': 2, 'quantity': 1})
r9 = requests.get(f"{BASE}/cart")
print(f"API Response: {r9.json()}")

# Clean up
run_sql("DELETE FROM Cart_Item WHERE Cart_ID = (SELECT Cart_ID FROM Cart WHERE Customer_ID = '25BYB0186')")
