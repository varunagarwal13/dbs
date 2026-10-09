import os

file_path = r"c:\Users\varun\OneDrive\Desktop\dbs\cyberdeck-demo\public\landing-pages\kage.html"

with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

replacements = {
    "SakuraDeck — Kroma Web Experience": "Kage Store — Web Experience",
    "SakuraDeck begins on a cobblestone metropolitan street": "Kage Store begins on a cobblestone metropolitan street",
    "<b>SAKURADECK</b><i>KROMA ATELIER</i>": "<b>KAGE STORE</b><i>KROMA ATELIER</i>",
    "SAKURADECK</div>": "KAGE STORE</div>",
    "SAKURADECK - Kroma Web Experience": "KAGE STORE - Kroma Web Experience",
    "© 2026 SakuraDeck — Kroma": "© 2026 Kage Store — Kroma",
    "Enter the SakuraDeck experience": "Enter the Kage Store experience"
}

for old, new in replacements.items():
    html = html.replace(old, new)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Done replacements in kage.html")
