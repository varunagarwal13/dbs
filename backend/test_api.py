import urllib.request
import urllib.error
import json

def make_request(url, method, payload=None):
    print(f"\n--- Testing {method} {url} ---")
    headers = {'Content-Type': 'application/json'}
    data = json.dumps(payload).encode('utf-8') if payload else None
    
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode())
            print(f"Status Code: {response.getcode()}")
            print(f"Response: {json.dumps(result, indent=2)}")
    except urllib.error.HTTPError as e:
        try:
            result = json.loads(e.read().decode())
            print(f"Status Code: {e.code}")
            print(f"Response: {json.dumps(result, indent=2)}")
        except:
            print(f"Status Code: {e.code}")
            print(f"Response: {e.reason}")
    except urllib.error.URLError as e:
        print(f"URL Error: {e.reason}")

if __name__ == '__main__':
    BASE_URL = "http://localhost:5000"
    
    # Insert: POST
    print("Executing POST /cart/add with payload {'product_id': 1, 'quantity': 1}")
    make_request(f"{BASE_URL}/cart/add", "POST", {"product_id": 1, "quantity": 1})
    
    # Update: PUT
    print("\nExecuting PUT /cart/update/1 with payload {'quantity': 3}")
    make_request(f"{BASE_URL}/cart/update/1", "PUT", {"quantity": 3})
    
    # Delete: DELETE
    print("\nExecuting DELETE /cart/remove/1")
    make_request(f"{BASE_URL}/cart/remove/1", "DELETE")
