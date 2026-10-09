import re

file_path = r"c:\Users\varun\OneDrive\Desktop\dbs\cyberdeck-demo\public\landing-pages\kage.html"

with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update Navigation links
old_nav = '''  <nav class="nav-links" id="navlinks">
    <a class="nav-link" href="#gate" data-cursor><span>Temples</span><span class="alt">伽藍</span></a>
    <a class="nav-link" href="#pathways" data-cursor><span>Gardens</span><span class="alt">庭園</span></a>
    <a class="nav-link" href="#lessons" data-cursor><span>Rituals</span><span class="alt">神事</span></a>
    <a class="nav-link" href="#eternity" data-cursor><span>Afterlight</span><span class="alt">残光</span></a>
  </nav>'''

new_nav = '''  <nav class="nav-links" id="navlinks">
    <a class="nav-link" href="#gate" data-cursor><span>Keyboard</span><span class="alt">軸</span></a>
    <a class="nav-link" href="#pathways" data-cursor><span>Collection</span><span class="alt">製品</span></a>
    <a class="nav-link" href="#lessons" data-cursor><span>Catalogue</span><span class="alt">仕様</span></a>
    <a class="nav-link" href="#eternity" data-cursor><span>Coming Soon</span><span class="alt">予告</span></a>
  </nav>'''

html = html.replace(old_nav, new_nav)

# 2. Update Hero
old_hero_top = '''    <div class="eyebrow" data-rv="fade"><span class="dot"></span> Chapter 00 — Boutique Exterior</div>
    <h1 class="display h-hero">
      <span class="mask-line"><span>Welcome to</span></span>
      <span class="mask-line"><span>Kroma</span></span>
      <span class="mask-line"><span>Atelier.</span></span>
    </h1>
    <p class="hero-sub body" data-rv="up">Enter the Kage Store experience, where precision
      engineering and minimalist design intersect.</p>'''

new_hero_top = '''    <div class="eyebrow" data-rv="fade"><span class="dot"></span> THE SAKURA ATELIER // WORKSPACE HARDWARE 2026</div>
    <h1 class="display h-hero">
      <span class="mask-line"><span>Tactile</span></span>
      <span class="mask-line"><span>Shadows.</span></span>
      <span class="mask-line"><span>Illuminated.</span></span>
    </h1>
    <p class="hero-sub body" data-rv="up">A curated workspace ecosystem carved from aluminum, frosted glass, and midnight sakura tones. Featuring our custom mechanical keyboard, ergonomic mouse, architectural desk lamp, and upcoming electronics.</p>'''

html = html.replace(old_hero_top, new_hero_top)

# Update hero chapter chips
old_chips = '''    <div class="chapters" id="chips">
      <div class="chip" data-chip="0" data-rv="up" data-cursor><span class="num">01</span>
        <span class="tx"><b>Exterior</b><p>Discover the high-end architectural storefront.</p></span></div>
      <div class="chip" data-chip="1" data-rv="up" data-cursor><span class="num">02</span>
        <span class="tx"><b>Showroom</b><p>Experience the open-concept minimalist gallery.</p></span></div>
      <div class="chip" data-chip="2" data-rv="up" data-cursor><span class="num">03</span>
        <span class="tx"><b>Axis Keyboard</b><p>Precision CNC-machined space gray aluminum.</p></span></div>
      <div class="chip" data-chip="3" data-rv="up" data-cursor><span class="num">04</span>
        <span class="tx"><b>Brass Weight</b><p>Exposed chamfered brass bottom weight.</p></span></div>
    </div>'''

new_chips = '''    <div class="chapters" id="chips">
      <div class="chip" data-chip="0" data-rv="up" data-cursor><span class="num">01</span>
        <span class="tx"><b>Axis Keyboard</b><p>75% CNC aluminum chassis with crimson PBT.</p></span></div>
      <div class="chip" data-chip="1" data-rv="up" data-cursor><span class="num">02</span>
        <span class="tx"><b>Arc Mouse</b><p>Ultra-light ergonomic wireless with PTFE skates.</p></span></div>
      <div class="chip" data-chip="2" data-rv="up" data-cursor><span class="num">03</span>
        <span class="tx"><b>Halo Desk Lamp</b><p>Architectural 3000K warm diffused light.</p></span></div>
      <div class="chip" data-chip="3" data-rv="up" data-cursor><span class="num">04</span>
        <span class="tx"><b>Coming Soon</b><p>Future modular audio DAC & macro pads.</p></span></div>
    </div>'''

html = html.replace(old_chips, new_chips)

# Update peek preview caption
old_peek = '''    <span class="peek-cap"><b class="jp">山門</b><i>Sanmon — before the bell</i></span>'''
new_peek = '''    <span class="peek-cap"><b class="jp">軸</b><i>Axis 75 — Midnight Sakura</i></span>'''
html = html.replace(old_peek, new_peek)

# 3. Update Chapter I (Axis Keyboard Focus)
old_gate_head = '''  <div class="sec-head" data-rv="fade">
    <span class="k"><b>01</b> — Boutique Exterior</span><span class="rule"></span><span class="k jp">山門</span>
  </div>
  <div class="gate-grid">
    <h2 class="display h-sec" data-rv="up">Dark patinated bronze and ultra-clear glass.</h2>
    <div class="gate-copy">
      <p class="lead" data-rv="up">Kage Store begins on a cobblestone metropolitan street: a high-end architectural storefront. Floor-to-ceiling ultra-clear low-iron glass framed in dark patinated bronze.
        The minimalist backlit signage reads \'KROMA\' in an elegant sans-serif typeface.
        Inside, warm 3000K ambient illumination contrasts with dusk exterior light.</p>
      <p class="body" data-rv="up">Step inside the Kroma Showroom Interior. An open-concept minimalist gallery featuring polished micro-cement flooring,
        slatted Scandinavian white oak wall partitions, fluted cast glass dividers,
        and recessed warm architectural linear lighting tracks embedded in matte off-white ceilings.
        Experience the space.</p>
      <a class="arrowlink" href="#pathways" data-rv="fade" data-cursor>
        <span>Cross the threshold</span>
        <span class="ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
      </a>
    </div>
  </div>
  <div class="gate-stats" data-rv="up">
    <div><b>05</b><span>Chapters</span></div>
    <div><b>92</b><span>Minutes</span></div>
    <div><b>1611</b><span>Hall raised</span></div>
    <div><b>∞</b><span>Stillness</span></div>
  </div>'''

new_gate_head = '''  <div class="sec-head" data-rv="fade">
    <span class="k"><b>01</b> — Axis Mechanical Keyboard</span><span class="rule"></span><span class="k jp">鍵盤</span>
  </div>
  <div class="gate-grid">
    <h2 class="display h-sec" data-rv="up">Acoustic depth in every keystroke.</h2>
    <div class="gate-copy">
      <p class="lead" data-rv="up">The flagship Axis 75 is precision CNC-machined from single-block 6063 aerospace aluminum, finished in deep charcoal anodization with blood-red and bone PBT keycaps. Inspired by twilight cherry blossoms caught on dark stone.</p>
      <p class="body" data-rv="up">Fitted with hand-lubed linear mechanical switches, custom acoustic leaf-spring gaskets, and an exposed chamfered brass bottom weight for deep, resonant marble acoustics. Engineered to bring calm intentionality to your daily workflow.</p>
      <a class="arrowlink" href="#pathways" data-rv="fade" data-cursor>
        <span>Explore the Full Lineup</span>
        <span class="ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
      </a>
    </div>
  </div>
  <div class="gate-stats" data-rv="up">
    <div><b>75%</b><span>Compact Layout</span></div>
    <div><b>6063</b><span>CNC Aluminum</span></div>
    <div><b>1890g</b><span>Brass Weighted</span></div>
    <div><b>Custom</b><span>Tuned Acoustics</span></div>
  </div>'''

html = html.replace(old_gate_head, new_gate_head)

# 4. Update Chapter II (The 3 Cards)
old_cards_sec = '''  <div class="sec-head" data-rv="fade">
    <span class="k"><b>02</b> — Showroom Interior</span><span class="rule"></span><span class="k jp">庭園</span>
  </div>
  <div class="cards" id="cards">
    <article class="card" data-rv="up" data-view="0" data-cursor>
      <div class="card-fr" data-frame>
                <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow" style="--gx:80.2%; --gy:23.9%; --gr:22%; --gt:6.1s; --gt2:9.7s; --gc1:rgba(255,142,108,.50); --gc2:rgba(212,56,38,.24)"></i>
        <div class="card-lab"><b>Approach</b><span class="jp">参道</span></div>
      </div>
      <div class="card-meta"><span>The long climb</span><span>01 / 03</span></div>
    </article>
    <article class="card" data-rv="up" data-view="1" data-cursor>
      <div class="card-fr" data-frame>
                <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow glow--flame" style="--gx:70.5%; --gy:47.2%; --gr:14%; --gt:3.7s; --gt2:5.3s; --gc1:rgba(255,198,124,.62); --gc2:rgba(226,118,40,.30)"></i>
        <div class="card-lab"><b>Lanterns</b><span class="jp">灯籠</span></div>
      </div>
      <div class="card-meta"><span>Lantern court</span><span>02 / 03</span></div>
    </article>
    <article class="card" data-rv="up" data-view="2" data-cursor>
      <div class="card-fr" data-frame>
                <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow" style="--gx:48.0%; --gy:16.8%; --gr:20%; --gt:7.3s; --gt2:11.2s; --gc1:rgba(255,138,104,.52); --gc2:rgba(208,54,36,.24)"></i>
        <div class="card-lab"><b>Moonwater</b><span class="jp">月影</span></div>
      </div>
      <div class="card-meta"><span>The wet court</span><span>03 / 03</span></div>
    </article>
  </div>'''

new_cards_sec = '''  <div class="sec-head" data-rv="fade">
    <span class="k"><b>02</b> — Workspace Ecosystem</span><span class="rule"></span><span class="k jp">製品</span>
  </div>
  <div class="cards" id="cards">
    <article class="card" data-rv="up" data-view="0" data-cursor>
      <div class="card-fr" data-frame>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow" style="--gx:80.2%; --gy:23.9%; --gr:22%; --gt:6.1s; --gt2:9.7s; --gc1:rgba(255,142,108,.50); --gc2:rgba(212,56,38,.24)"></i>
        <div class="card-lab"><b>Axis Keyboard</b><span class="jp">鍵盤</span></div>
      </div>
      <div class="card-meta"><span>75% CNC Aluminum • $189</span><span>01 / 03</span></div>
    </article>
    <article class="card" data-rv="up" data-view="1" data-cursor>
      <div class="card-fr" data-frame>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow glow--flame" style="--gx:70.5%; --gy:47.2%; --gr:14%; --gt:3.7s; --gt2:5.3s; --gc1:rgba(255,198,124,.62); --gc2:rgba(226,118,40,.30)"></i>
        <div class="card-lab"><b>Arc Mouse</b><span class="jp">鼠</span></div>
      </div>
      <div class="card-meta"><span>Wireless Ergonomic • $89</span><span>02 / 03</span></div>
    </article>
    <article class="card" data-rv="up" data-view="2" data-cursor>
      <div class="card-fr" data-frame>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow" style="--gx:48.0%; --gy:16.8%; --gr:20%; --gt:7.3s; --gt2:11.2s; --gc1:rgba(255,138,104,.52); --gc2:rgba(208,54,36,.24)"></i>
        <div class="card-lab"><b>Halo Desk Lamp</b><span class="jp">灯</span></div>
      </div>
      <div class="card-meta"><span>Warm Diffused 3000K • $129</span><span>03 / 03</span></div>
    </article>
  </div>'''

html = html.replace(old_cards_sec, new_cards_sec)

# 5. Update Chapter III (Catalogue & Upcoming)
old_chapter_iii = '''  <div class="sec-head" data-rv="fade">
    <span class="k"><b>03</b> — Axis Keyboard</span><span class="rule"></span><span class="k jp">手業</span>
  </div>
  <div class="cur-head">
    <h2 class="display h-sec" data-rv="up">Precision CNC-machined chassis. Crisp legends.</h2>
    <p class="body-lg" data-rv="up">A 75% mechanical keyboard with a precision CNC-machined space gray aluminum chassis,
      matte dual-tone charcoal and bone PBT keycaps, and an exposed chamfered brass bottom weight.</p>
  </div>
  <div class="cur" id="cur">
    <div class="les" data-les="0" data-cursor>
      <span class="k">01</span>
      <h3>Boutique Exterior<em class="jp">山門</em></h3>
      <p>Floor-to-ceiling ultra-clear glass framed in bronze.</p>
      <span class="t">14 min</span><i class="bar"></i>
    </div>
    <div class="les" data-les="1" data-cursor>
      <span class="k">02</span>
      <h3>Showroom Interior<em class="jp">借景</em></h3>
      <p>Polished micro-cement and Scandinavian white oak.</p>
      <span class="t">18 min</span><i class="bar"></i>
    </div>
    <div class="les" data-les="2" data-cursor>
      <span class="k">03</span>
      <h3>Axis Mechanical Keyboard<em class="jp">焼杉</em></h3>
      <p>75% layout, space gray aluminum chassis.</p>
      <span class="t">21 min</span><i class="bar"></i>
    </div>
    <div class="les" data-les="3" data-cursor>
      <span class="k">04</span>
      <h3>Keycaps & Legends<em class="jp">灯籠</em></h3>
      <p>Matte dual-tone charcoal and bone PBT keycaps.</p>
      <span class="t">17 min</span><i class="bar"></i>
    </div>
    <div class="les" data-les="4" data-cursor>
      <span class="k">05</span>
      <h3>Brass Weight<em class="jp">朱月</em></h3>
      <p>An exposed chamfered brass bottom weight.</p>
      <span class="t">22 min</span><i class="bar"></i>
    </div>
  </div>'''

new_chapter_iii = '''  <div class="sec-head" data-rv="fade">
    <span class="k"><b>03</b> — Hardware Specifications</span><span class="rule"></span><span class="k jp">仕様</span>
  </div>
  <div class="cur-head">
    <h2 class="display h-sec" data-rv="up">Considered tools for elevated focus.</h2>
    <p class="body-lg" data-rv="up">From CNC-milled mechanical keyboards to optical desk lamps and upcoming modular audio electronics, each instrument is crafted for tactile tranquility.</p>
  </div>
  <div class="cur" id="cur">
    <div class="les" data-les="0" data-cursor>
      <span class="k">01</span>
      <h3>Axis 75 Mechanical Keyboard<em class="jp">軸</em></h3>
      <p>Solid 6063 aerospace aluminum case with chamfered brass sound plate.</p>
      <span class="t">$189.00</span><i class="bar"></i>
    </div>
    <div class="les" data-les="1" data-cursor>
      <span class="k">02</span>
      <h3>Arc Wireless Ergonomic Mouse<em class="jp">鼠</em></h3>
      <p>Magnesium unibody, crimson PTFE skates, and silent optical switches.</p>
      <span class="t">$89.00</span><i class="bar"></i>
    </div>
    <div class="les" data-les="2" data-cursor>
      <span class="k">03</span>
      <h3>Halo Architectural Table Lamp<em class="jp">灯</em></h3>
      <p>Diffused 3000K warm anti-glare light with solid brass dial dimmer.</p>
      <span class="t">$129.00</span><i class="bar"></i>
    </div>
    <div class="les" data-les="3" data-cursor>
      <span class="k">04</span>
      <h3>Link USB-C Audio Hub & DAC<em class="jp">予告</em></h3>
      <p>Coming Soon — Solid block metal audiophile DAC & 100W power delivery.</p>
      <span class="t">Late 2026</span><i class="bar"></i>
    </div>
    <div class="les" data-les="4" data-cursor>
      <span class="k">05</span>
      <h3>Kage Macro Pad & Dial Controller<em class="jp">予告</em></h3>
      <p>Coming Soon — 9-key programmable artisan knob controller in crimson.</p>
      <span class="t">Late 2026</span><i class="bar"></i>
    </div>
  </div>'''

html = html.replace(old_chapter_iii, new_chapter_iii)

# 6. Update Chapter IV (Coming Soon & The Vault)
old_chapter_iv = '''  <div class="eyebrow" data-rv="fade">Chapter 04 — Afterlight</div>
  <h2 class="display" data-rv="up">Afterlight</h2>
  <p class="body-lg" data-rv="up">The gate does not close behind you. Take the walk whenever the noise
    gets loud — it is always the same path, and never the same light.</p>
  <a class="cta" href="#top" data-rv="fade" data-cursor>
    <i></i><span>Begin the walk</span>
    <svg viewBox="0 0 14 14" fill="none" width="13" height="13"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg>
  </a>'''

new_chapter_iv = '''  <div class="eyebrow" data-rv="fade">Chapter 04 — The Vault</div>
  <h2 class="display" data-rv="up">Future Electronics // Coming Soon</h2>
  <p class="body-lg" data-rv="up">Our engineering atelier is actively prototyping portable cyberdeck modules, high-fidelity audio interfaces, and custom programmable artisan controllers. Join our private reserve list to be notified of the next limited production run.</p>
  <a class="cta" href="#top" data-rv="fade" data-cursor>
    <i></i><span>Join Priority Reserve</span>
    <svg viewBox="0 0 14 14" fill="none" width="13" height="13"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg>
  </a>'''

html = html.replace(old_chapter_iv, new_chapter_iv)

# 7. Update Footer text
old_foot = '''      <p>A five-chapter night walk through a Kyoto mountain temple. Three illustrated garden field notes
        sit inside a live Three.js sanctuary.</p>'''

new_foot = '''      <p>Bespoke sakura workspace hardware. Precision mechanical keyboards, ergonomic mice, architectural desk lighting, and future artisan electronics engineered for quiet focus.</p>'''

html = html.replace(old_foot, new_foot)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Successfully updated all product and ecosystem sections in kage.html!")
