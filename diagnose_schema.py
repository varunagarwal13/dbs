import oracledb
import os
import json
from dotenv import load_dotenv

load_dotenv('backend/.env')

conn = oracledb.connect(
    user=os.getenv('ORACLE_USER'),
    password=os.getenv('ORACLE_PASSWORD'),
    dsn=os.getenv('ORACLE_DSN')
)
cur = conn.cursor()

print('=== DIAGNOSIS ===')

# Find constraint
cur.execute('''
SELECT a.table_name, a.column_name, a.constraint_name, c.owner, 
       c.r_owner, c_pk.table_name r_table_name
  FROM all_cons_columns a
  JOIN all_constraints c ON a.owner = c.owner AND a.constraint_name = c.constraint_name
  JOIN all_constraints c_pk ON c.r_owner = c_pk.owner AND c.r_constraint_name = c_pk.constraint_name
 WHERE c.constraint_name = 'SYS_C008336'
''')
res = cur.fetchall()
print('Constraint SYS_C008336:', res)

tables = ['PRODUCT', 'INVENTORY', 'CART', 'CART_ITEM', 'CATEGORY']

for t in tables:
    try:
        cur.execute(f"SELECT column_name, data_type, nullable, data_default FROM user_tab_columns WHERE table_name = '{t}' ORDER BY column_id")
        print(f'\nTable {t}:', cur.fetchall())
        
        cur.execute(f"SELECT constraint_name, constraint_type FROM user_constraints WHERE table_name = '{t}'")
        print(f'Constraints {t}:', cur.fetchall())
        
        # Check rows
        cur.execute(f'SELECT * FROM {t}')
        rows = cur.fetchall()
        print(f'Rows in {t}:', len(rows))
    except Exception as e:
        print(f'Table {t} error:', e)

print('\n=== BACKUP ===')
backup = {}
for t in ['PRODUCT', 'INVENTORY', 'CART', 'CART_ITEM']:
    try:
        cur.execute(f'SELECT * FROM {t}')
        cols = [c[0] for c in cur.description]
        backup[t] = [dict(zip(cols, row)) for row in cur.fetchall()]
    except Exception as e:
        pass

with open('backend/backup_before_seed.json', 'w') as f:
    json.dump(backup, f, default=str)
print('Backup saved to backend/backup_before_seed.json')

conn.close()
