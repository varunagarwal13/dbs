import oracledb
import os

ORACLE_USER = os.getenv('ORACLE_USER', 'system')
ORACLE_PASSWORD = os.getenv('ORACLE_PASSWORD', '25BYB0186')
ORACLE_DSN = os.getenv('ORACLE_DSN', 'localhost:1521/XE')

def main():
    try:
        connection = oracledb.connect(
            user=ORACLE_USER,
            password=ORACLE_PASSWORD,
            dsn=ORACLE_DSN
        )
        print("Connected successfully.")
        with connection.cursor() as cursor:
            cursor.execute("SELECT owner, table_name FROM all_tables WHERE table_name IN ('PRODUCT', 'INVENTORY', 'CART')")
            rows = cursor.fetchall()
            if rows:
                for row in rows:
                    print(f"Owner: {row[0]}, Table: {row[1]}")
            else:
                print("No tables found matching 'PRODUCT', 'INVENTORY', 'CART'.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    main()
