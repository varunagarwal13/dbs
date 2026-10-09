import urllib.request
import json

try:
    response = urllib.request.urlopen('http://localhost:5000/products')
    data = json.loads(response.read().decode('utf-8'))
    print(json.dumps(data, indent=2))
except Exception as e:
    print(e)
