import os

file_path = r"c:\Users\varun\OneDrive\Desktop\dbs\cyberdeck-demo\public\landing-pages\kage.html"

with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

replacements = {
    "Kage — Where stillness reveals the unseen": "SakuraDeck — Kroma Web Experience",
    "Kage begins where the city stops: a mountain gate of cedar burned black,": "SakuraDeck begins on a cobblestone metropolitan street: a high-end architectural storefront. Floor-to-ceiling ultra-clear low-iron glass framed in dark patinated bronze.",
    "standing in its own weather. The soot is not decoration. It is how a board is taught to survive a": "The minimalist backlit signage reads 'KROMA' in an elegant sans-serif typeface.",
    "hundred rainy seasons, and the first thing this place asks you to understand.": "Inside, warm 3000K ambient illumination contrasts with dusk exterior light.",
    
    "Climb the worn steps and the worship hall lifts out of the mist, its paper": "Step inside the Kroma Showroom Interior. An open-concept minimalist gallery featuring polished micro-cement flooring,",
    "screens lit from inside like a lantern the size of a house. Above the eaves a vermilion moon holds": "slatted Scandinavian white oak wall partitions, fluted cast glass dividers,",
    "its place, patient, half hidden. Nothing here is in a hurry. Neither, for the next ninety minutes,": "and recessed warm architectural linear lighting tracks embedded in matte off-white ceilings.",
    "are you.": "Experience the space.",

    "<b>KAGE</b><i>HIDDEN REALMS OF KYOTO</i>": "<b>SAKURADECK</b><i>KROMA ATELIER</i>",
    "KAGE</div>": "SAKURADECK</div>",
    "KAGE - a live Kyoto mountain temple, after dark.": "SAKURADECK - Kroma Web Experience",
    "© 2026 Kage — Kage no Michi": "© 2026 SakuraDeck — Kroma",
    
    "<b>01</b> — The Sanmon": "<b>01</b> — Boutique Exterior",
    "Charred cypress, worn stone, one gate left open.": "Dark patinated bronze and ultra-clear glass.",
    
    "<b>02</b> — Still Gardens": "<b>02</b> — Showroom Interior",
    
    "<b>03</b> — Sacred Craft": "<b>03</b> — Axis Keyboard",
    "Five chapters. Ninety minutes. One quiet mind.": "Precision CNC-machined chassis. Crisp legends.",
    "Each chapter is a walk, not a lecture. You arrive at the gate, climb the": "A 75% mechanical keyboard with a precision CNC-machined space gray aluminum chassis,",
    "steps, sit with the lantern, and leave with one thing worth keeping.": "matte dual-tone charcoal and bone PBT keycaps, and an exposed chamfered brass bottom weight.",
    
    "The Hidden Gate": "Boutique Exterior",
    "Why a gate is a sentence, and what you agree to when you walk under one.": "Floor-to-ceiling ultra-clear glass framed in bronze.",
    
    "Borrowed Scenery": "Showroom Interior",
    "Shakkei: composing with a mountain you will never own.": "Polished micro-cement and Scandinavian white oak.",
    
    "Charred Cypress": "Axis Mechanical Keyboard",
    "Yakisugi: burning a board black so the weather will let it live.": "75% layout, space gray aluminum chassis.",
    
    "Lantern Light": "Keycaps & Legends",
    "How a single ember decides the scale of everything around it.": "Matte dual-tone charcoal and bone PBT keycaps.",
    
    "The Vermilion Moon": "Brass Weight",
    "Why the moon burns red over the valley, and what the garden does with it.": "An exposed chamfered brass bottom weight.",
    
    "Chapter 00 — The Hidden Gate": "Chapter 00 — Boutique Exterior",
    "Where stillness": "Welcome to",
    "reveals the": "Kroma",
    "unseen.": "Atelier.",
    "Enter Kyoto through its quiet thresholds, where ritual,": "Enter the SakuraDeck experience, where precision",
    "craft, and memory shape the path.": "engineering and minimalist design intersect.",
    
    "<b>Thresholds</b><p>Discover the hidden gates that open on to deeper paths.</p>": "<b>Exterior</b><p>Discover the high-end architectural storefront.</p>",
    "<b>Still Gardens</b><p>Witness the courts where silence gently unfolds.</p>": "<b>Showroom</b><p>Experience the open-concept minimalist gallery.</p>",
    "<b>Sacred Craft</b><p>Embrace the hands and heritage that shape devotion.</p>": "<b>Axis Keyboard</b><p>Precision CNC-machined space gray aluminum.</p>",
    "<b>Night Rituals</b><p>Explore the rites that awaken when the day is done.</p>": "<b>Brass Weight</b><p>Exposed chamfered brass bottom weight.</p>"
}

for old, new in replacements.items():
    html = html.replace(old, new)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Done replacements in kage.html")
