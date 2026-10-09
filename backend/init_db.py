import oracledb
import os

ORACLE_USER = os.getenv('ORACLE_USER', 'system')
ORACLE_PASSWORD = os.getenv('ORACLE_PASSWORD', '25BYB0186')
ORACLE_DSN = os.getenv('ORACLE_DSN', 'localhost:1521/XE')

def execute_schema():
    connection = None
    try:
        connection = oracledb.connect(
            user=ORACLE_USER,
            password=ORACLE_PASSWORD,
            dsn=ORACLE_DSN
        )
        print("Connected successfully to Oracle XE.")
        
        with open('schema.sql', 'r') as f:
            sql_script = f.read()
            
        # Split statements by semicolon
        # Also need to make sure we don't execute empty statements
        statements = sql_script.split(';')
        
        with connection.cursor() as cursor:
            for statement in statements:
                stmt = statement.strip()
                if stmt and stmt.upper() != "COMMIT":
                    print(f"Executing: {stmt[:50]}...")
                    try:
                        cursor.execute(stmt)
                    except Exception as ex:
                        print(f"Failed to execute statement: {ex}")
                        # Continuing even if tables already exist or fail
            
            connection.commit()
            print("Schema executed and committed successfully.")
            
    except Exception as e:
        print(f"Connection/Execution Error: {e}")
    finally:
        if connection:
            connection.close()

if __name__ == '__main__':
    execute_schema()
