import json
import os
import urllib.request
import hashlib

json_path = r"C:\Users\varun\.gemini\antigravity-ide\brain\ec2935f3-8736-4471-bf8a-c7466eb14526\.system_generated\steps\72\content.md"
dest_dir = r"c:\Users\varun\OneDrive\Desktop\dbs\cyberdeck-demo"

# Read JSON
with open(json_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Strip markdown header
json_start = content.find('{')
json_str = content[json_start:]

data = json.loads(json_str)

for file in data['files']:
    path = os.path.join(dest_dir, file['path'])
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if 'code' in file:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(file['code'])
        print(f"Wrote {path} from JSON")
    elif 'base64' in file:
        import base64
        with open(path, 'wb') as f:
            f.write(base64.b64decode(file['base64']))
        print(f"Wrote {path} from JSON base64")
    else:
        print(f"Skipping {path} (no code/base64)")

# Now download binary assets
assets = [
    ("public/landing-pages/secret-pathways-assets/generated/kage-sanmon-preview.webp", "23937f8c8350c55730c3bd17066a250548b2d29aad0e6ffb96218c1354b6db43"),
    ("public/landing-pages/secret-pathways-assets/generated/kage-approach.webp", "39ff338936097e1bde0c4eadcf09805b9890862703186e67314942de7e0bc36c"),
    ("public/landing-pages/secret-pathways-assets/generated/kage-lantern-court.webp", "c0a6ff7da1cd6909d66e2f3f690b0d524a693e01d2222ab846d0074a90f47471"),
    ("public/landing-pages/secret-pathways-assets/generated/kage-moonwater.webp", "b8c8060c51c87a103bae619b3a4cc8b8b80632649d83f1f2c2299051e7f9b400"),
    ("public/landing-pages/secret-pathways-assets/foreground/png/temple-wall.webp", "41c00f017e4ecf2147ee468d74da955bb4e2dad773f75a575022842eaf7609ce"),
    ("public/landing-pages/secret-pathways-assets/foreground/png/pine-tree.webp", "79b233716d067bbc64c1507f79e4a30ba5f445995158c78562cc5b81f607ede7"),
    ("public/landing-pages/secret-pathways-assets/foreground/png/tall-grass.webp", "8db0b5fbd160a7225391a6283a99681e346e205f24191031657285ef85ef12d2"),
    ("public/landing-pages/secret-pathways-assets/foreground/png/sakura-branch.webp", "48564194d40496090dbf3bba2a68785cf91fafb655dc8d43ac16f6678aff196d"),
    ("public/landing-pages/secret-pathways-assets/foreground/png/maple-leaves.webp", "35a90fec62c1a6bbfbbe73cd5d7b1acb889e80546d404182ef9a45fe417b531f"),
    ("public/landing-pages/secret-pathways-assets/foreground/png/stone-lantern.webp", "d5f3c881bc9d92b72eaaff2b709614d66e21a19e14025d2b9b16a15ab52df3bc"),
    ("public/landing-pages/secret-pathways-assets/foreground/png/garden-bush.webp", "707e2516ebc0108041fe0ddc26d8bff0a69dc9700641f837765018b64e9ff15e"),
    ("public/landing-pages/secret-pathways-assets/foreground/png/basalt-stones.webp", "150f1c87e181d651c318168c271bb65c9c8abac6dea6f2421fdd081c5b740471"),
    ("public/landing-pages/secret-pathways-assets/foreground/png/hill.webp", "ffba816244bcba98e4e33c6ee56165edfe4048db4af122ef3f5822180a85edbc"),
    ("public/landing-pages/secret-pathways-assets/foreground/png/shrine-ruins.webp", "77006e58f2066e6fa9bfc504df396db49b1c7977858fa52d34dd2dad5feced77")
]

base_url = "https://threeui.com/"

for asset_path, expected_sha in assets:
    url = base_url + asset_path.replace("public/", "") # adjust url based on domain structure
    # Wait, the URL on threeui.com for public assets: https://threeui.com/landing-pages/secret-pathways-assets/...
    
    path = os.path.join(dest_dir, asset_path)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    
    if not os.path.exists(path) or hashlib.sha256(open(path, 'rb').read()).hexdigest() != expected_sha:
        try:
            print(f"Downloading {url}...")
            # Set a user agent to avoid 403
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(path, 'wb') as out_file:
                data = response.read()
                out_file.write(data)
            
            actual_sha = hashlib.sha256(data).hexdigest()
            print(f"Downloaded {path}")
            if actual_sha != expected_sha:
                print(f"WARNING: SHA mismatch for {asset_path}. Expected {expected_sha}, got {actual_sha}")
        except Exception as e:
            print(f"Failed to download {url}: {e}")
    else:
        print(f"Asset {asset_path} already exists and matches SHA-256")
