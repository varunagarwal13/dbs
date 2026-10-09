import oracledb, os, sys
from dotenv import load_dotenv
load_dotenv()

conn = oracledb.connect(
    user=os.getenv("ORACLE_USER", "system"),
    password=os.getenv("ORACLE_PASSWORD"),
    dsn=os.getenv("ORACLE_DSN", "localhost:1521/XE"),
)
cur = conn.cursor()

# python db.py seed   -> runs seed_products.sql
# python db.py        -> shows the cart
if len(sys.argv) > 1 and sys.argv[1] == "seed":
    sql = open("seed_products.sql", encoding="utf-8").read()
    for stmt in sql.split(";"):
        s = stmt.strip()
        if s and s.upper() != "COMMIT" and not s.startswith("--"):
            cur.execute(s)
    conn.commit()
    print("Seed done.")
else:
    cur.execute("""
        SELECT ci.Cart_Item_ID, p.Product_Name, ci.Quantity
        FROM Cart c
        JOIN Cart_Item ci ON c.Cart_ID = ci.Cart_ID
        JOIN Product p ON ci.Product_ID = p.Product_ID
        WHERE c.Customer_ID = '25BYB0186'
    """)
    rows = cur.fetchall()
    print("CART:", rows if rows else "(empty)")
    cur.execute("SELECT COUNT(*) FROM Product")
    print("Products in DB:", cur.fetchone()[0])