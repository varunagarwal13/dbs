from PIL import Image
import os

img_path = r'c:\Users\varun\OneDrive\Desktop\dbs\frontend\REFERENCES\Screenshot 2026-10-09 072616.png'
out_dir = r'c:\Users\varun\OneDrive\Desktop\dbs\frontend\public\products'

if not os.path.exists(out_dir):
    os.makedirs(out_dir)

img = Image.open(img_path)

# Approximate coordinates for a 553x704 image grid
# Col widths: ~125px, Row heights: ~150px
# Offsets: Left sidebar ~ 135px. Top header ~ 160px. Gap ~ 15px.
start_x = 135
start_y = 160
card_w = 125
card_h = 100 # just the image part
gap_x = 10
gap_y = 65

slugs = [
    "axis-mechanical-keyboard", "arc-wireless-mouse", "halo-desk-light",
    "orbit-usb-c-hub", "rise-laptop-stand", "felt-desk-mat",
    "pulse-wireless-charger", "beam-monitor-light", "link-usb-c-cable"
]

idx = 0
for row in range(3):
    for col in range(3):
        x0 = start_x + col * (card_w + gap_x)
        y0 = start_y + row * (card_h + gap_y)
        x1 = x0 + card_w
        y1 = y0 + card_h
        
        # ensure we don't go out of bounds
        x1 = min(x1, img.width)
        y1 = min(y1, img.height)
        
        crop = img.crop((x0, y0, x1, y1))
        crop.save(os.path.join(out_dir, f"{slugs[idx]}.png"))
        print(f"Saved {slugs[idx]}.png")
        idx += 1
