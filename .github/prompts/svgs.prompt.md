---
name: svgs
description: svgs I like to implement on demand search for fitting element if asked
---

<!-- Tip: Use /create-prompt in chat to generate content with agent assistance -->

<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Khadija — Component Hub</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,500&family=Outfit:wght@200;300;400;500;600&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --cream:#F5F0EA;
  --white:#FFFFFF;
  --dark:#2D2020;
  --dg:#314A51;
  --burg:#6E3B49;
  --mauve:#B5A19E;
  --blush:#D4B9B5;
  --mint:#56686A;
  --off:#525252;
  --ease:cubic-bezier(.16,1,.3,1);
  --sidebar:260px;
  --panel:300px;
}
html,body{height:100%;overflow:hidden;font-family:'Outfit',sans-serif}
body{background:var(--cream);color:var(--dark);display:grid;grid-template-columns:var(--sidebar) 1fr var(--panel);grid-template-rows:1fr 64px}

/* ════ SIDEBAR ════ */
.sidebar{grid-row:1/3;background:var(--white);border-right:1px solid rgba(0,0,0,.06);display:flex;flex-direction:column;overflow:hidden}
.sidebar-head{padding:20px 18px 14px;border-bottom:1px solid rgba(0,0,0,.05)}
.sidebar-head h1{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:20px;letter-spacing:.05em;color:var(--dg)}
.sidebar-head p{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--mauve);margin-top:3px}
.search-wrap{padding:10px 12px;border-bottom:1px solid rgba(0,0,0,.04)}
.search{width:100%;padding:7px 11px;border:1px solid rgba(0,0,0,.08);border-radius:6px;font-family:'Outfit',sans-serif;font-size:11.5px;color:var(--dark);background:var(--cream);outline:none;transition:border-color .2s}
.search::placeholder{color:var(--mauve)}.search:focus{border-color:var(--burg)}
.nav{flex:1;overflow-y:auto;padding:4px 8px 20px}
.nav::-webkit-scrollbar{width:3px}.nav::-webkit-scrollbar-thumb{background:rgba(181,161,158,.3);border-radius:99px}
.cat{font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:var(--mauve);padding:12px 8px 4px;display:flex;align-items:center;gap:6px}
.cat::after{content:'';flex:1;height:1px;background:rgba(181,161,158,.2)}
.item{padding:7px 10px;border-radius:6px;font-size:12px;color:var(--off);cursor:pointer;display:flex;align-items:center;gap:7px;transition:background .15s,color .15s;margin-bottom:1px}
.item:hover{background:rgba(110,59,73,.06);color:var(--burg)}
.item.active{background:var(--dark);color:#fff;font-weight:500}
.item-dot{width:4px;height:4px;border-radius:50%;background:var(--mauve);flex-shrink:0;transition:background .15s}
.item.active .item-dot,.item:hover .item-dot{background:var(--burg)}
.item.hidden{display:none}.cat.hidden{display:none}

/* ════ STAGE ════ */
.stage{display:flex;flex-direction:column;background:#fafafa;overflow:hidden}
.stage-topbar{padding:12px 20px 10px;border-bottom:1px solid rgba(0,0,0,.05);background:var(--white);display:flex;align-items:center;gap:10px;flex-shrink:0}
#stageName{font-family:'Cormorant Garamond',serif;font-size:16px;font-style:italic;color:var(--dg);flex:1}
#stageTag{font-size:7.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--mauve);border:1px solid rgba(181,161,158,.4);padding:3px 9px;border-radius:99px}
.preview-wrap{flex:1;display:flex;align-items:center;justify-content:center;overflow:auto;position:relative;background-image:radial-gradient(rgba(181,161,158,.22) 1px,transparent 1px);background-size:22px 22px}
.preview-inner{padding:44px;display:flex;align-items:center;justify-content:center;transition:transform .3s var(--ease)}
.scale-row{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);display:flex;gap:3px;background:rgba(255,255,255,.92);border:1px solid rgba(0,0,0,.07);border-radius:8px;padding:3px;backdrop-filter:blur(8px)}
.sc-btn{font-size:10px;padding:4px 10px;border:none;border-radius:5px;background:transparent;color:var(--off);cursor:pointer;transition:all .18s}
.sc-btn.on{background:var(--dark);color:#fff}
.bg-row{position:absolute;bottom:12px;right:14px;display:flex;gap:5px;align-items:center}
.bg-sw{width:18px;height:18px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:border-color .2s}
.bg-sw.on{border-color:var(--burg)}

/* ════ COPY BAR ════ */
.copy-bar{background:var(--white);border-top:1px solid rgba(0,0,0,.06);display:flex;align-items:center;padding:0 16px;gap:6px}
.copy-lbl{font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:var(--mauve);margin-right:4px}
.cp-btn{padding:7px 14px;border:1px solid rgba(0,0,0,.09);border-radius:6px;font-family:'Outfit',sans-serif;font-size:10.5px;font-weight:600;letter-spacing:.05em;cursor:pointer;background:var(--cream);color:var(--dark);transition:all .18s;display:flex;align-items:center;gap:5px;white-space:nowrap}
.cp-btn:hover{background:var(--dark);color:#fff;border-color:var(--dark)}
.cp-btn.done{background:var(--mint);color:#fff;border-color:var(--mint)}
.cp-btn.cp-all{background:var(--burg);color:#fff;border-color:var(--burg)}
.cp-btn.cp-all:hover{background:#5a2f3c;border-color:#5a2f3c}
.cp-btn.cp-all.done{background:var(--mint);border-color:var(--mint)}

/* ════ SETTINGS PANEL ════ */
.panel{grid-row:1/3;background:var(--white);border-left:1px solid rgba(0,0,0,.06);display:flex;flex-direction:column;overflow-y:auto}
.panel::-webkit-scrollbar{width:3px}.panel::-webkit-scrollbar-thumb{background:rgba(181,161,158,.3);border-radius:99px}

.panel-tabs{display:flex;border-bottom:1px solid rgba(0,0,0,.06);flex-shrink:0}
.ptab{flex:1;padding:11px 6px;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--mauve);cursor:pointer;text-align:center;border-bottom:2px solid transparent;transition:all .2s;font-family:'Outfit',sans-serif}
.ptab.on{color:var(--burg);border-bottom-color:var(--burg)}
.ptab-pane{display:none;padding:14px 14px 20px;flex-direction:column;gap:0}
.ptab-pane.on{display:flex}

.panel-section{margin-bottom:4px}
.section-head{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(181,161,158,.7);padding:10px 0 6px}
.field{margin-bottom:10px}
.field label{display:block;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--off);opacity:.55;margin-bottom:4px}
.field input,.field select,.field textarea{width:100%;padding:7px 9px;border:1px solid rgba(0,0,0,.09);border-radius:6px;font-family:'Outfit',sans-serif;font-size:11.5px;color:var(--dark);background:var(--cream);outline:none;transition:border-color .2s}
.field input:focus,.field select:focus{border-color:var(--burg)}
.field input[type=color]{padding:3px;height:34px;cursor:pointer}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:7px}
.field-row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px}
.divider{height:1px;background:rgba(0,0,0,.05);margin:10px 0}
.range-row{display:flex;align-items:center;gap:7px}
.range-row input[type=range]{flex:1;accent-color:var(--burg);height:3px}
.range-val{font-size:11px;color:var(--burg);font-weight:600;min-width:34px;text-align:right}

/* toggles */
.toggle-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.toggle-row span{font-size:11px;color:var(--off)}
.toggle{width:32px;height:18px;background:rgba(0,0,0,.12);border-radius:99px;position:relative;cursor:pointer;transition:background .25s;flex-shrink:0}
.toggle.on{background:var(--burg)}
.toggle::after{content:'';position:absolute;top:3px;left:3px;width:12px;height:12px;border-radius:50%;background:#fff;transition:transform .25s}
.toggle.on::after{transform:translateX(14px)}

/* segment control */
.seg{display:flex;background:var(--cream);border-radius:6px;padding:3px;gap:2px;margin-bottom:8px}
.seg-btn{flex:1;padding:5px 4px;border:none;border-radius:4px;font-size:10px;font-family:inherit;cursor:pointer;background:transparent;color:var(--off);transition:all .18s;text-align:center}
.seg-btn.on{background:var(--white);color:var(--dark);font-weight:600;box-shadow:0 1px 4px rgba(0,0,0,.08)}

/* position helper viz */
.pos-viz{display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr 1fr;gap:3px;width:80px;height:80px;margin:0 auto 10px}
.pos-dot{border-radius:50%;cursor:pointer;background:rgba(181,161,158,.2);border:1px solid rgba(181,161,158,.3);transition:background .15s}
.pos-dot.on{background:var(--burg);border-color:var(--burg)}
.pos-dot:hover{background:rgba(110,59,73,.3)}

/* tip */
.tip{background:rgba(110,59,73,.04);border:1px solid rgba(110,59,73,.1);border-radius:8px;padding:11px;font-size:10px;line-height:1.6;color:var(--off);margin-top:8px}
.tip strong{color:var(--burg)}

/* ════ ANIMATIONS ════ */
@keyframes rotCW{to{transform:rotate(360deg)}}
@keyframes rotCCW{to{transform:rotate(-360deg)}}
@keyframes floatY{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-10px) rotate(2deg)}}
@keyframes flapL{from{transform:perspective(400px) rotateY(0deg) scaleX(1)}to{transform:perspective(400px) rotateY(-62deg) scaleX(.85)}}
@keyframes flapR{from{transform:perspective(400px) rotateY(0deg) scaleX(1)}to{transform:perspective(400px) rotateY(62deg) scaleX(.85)}}
@keyframes petalDrop{0%,100%{transform:translateX(-50%) translateY(0);opacity:1}60%{transform:translateX(-50%) translateY(10px);opacity:.3}61%{transform:translateX(-50%) translateY(0);opacity:0}62%{opacity:1}}
@keyframes pulseDot{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}
@keyframes expandRing{0%{transform:scale(.3);opacity:.8}100%{transform:scale(1.4);opacity:0}}
@keyframes sc6move{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes dashAnim{to{stroke-dashoffset:-100}}
@keyframes twinkle{0%,100%{opacity:.2;transform:scale(.7)}40%{opacity:1;transform:scale(1.1)}}
@keyframes ringBreath{0%,100%{opacity:.2}50%{opacity:.55}}
@keyframes moonrise{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-6px) rotate(2deg)}}
@keyframes arrowBob{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}
@keyframes pulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
@keyframes waveFlow{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes blink{0%,90%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
</style>
</head>
<body>

<!-- SIDEBAR -->
<aside class="sidebar">
  <div class="sidebar-head">
    <h1>Khadija Hub</h1>
    <p>Komponenten · Design System</p>
  </div>
  <div class="search-wrap">
    <input class="search" type="text" id="searchInput" placeholder="Suchen …">
  </div>
  <nav class="nav" id="navList">
    <div class="cat" data-cat="hero">Hero &amp; Rotating</div>
    <div class="item active" data-id="hero-flower"><span class="item-dot"></span>Rotierende Blume</div>
    <div class="item" data-id="triple-rings"><span class="item-dot"></span>Triple Ringe</div>
    <div class="item" data-id="dash-rose"><span class="item-dot"></span>Dash Rose</div>
    <div class="item" data-id="petal-spin"><span class="item-dot"></span>Petal Spinner</div>
    <div class="item" data-id="dotted-orbit"><span class="item-dot"></span>Dotted Orbit</div>
    <div class="item" data-id="star-petals"><span class="item-dot"></span>Star Petals</div>
    <div class="item" data-id="asterisk-spin"><span class="item-dot"></span>Asterisk Spin</div>
    <div class="item" data-id="rotating-seal"><span class="item-dot"></span>Rotating Seal</div>
    <div class="cat" data-cat="butterfly">Schmetterlinge</div>
    <div class="item" data-id="bf-glasswing"><span class="item-dot"></span>Mauve Glasswing</div>
    <div class="item" data-id="bf-morpho"><span class="item-dot"></span>Dark Morpho</div>
    <div class="item" data-id="bf-blush"><span class="item-dot"></span>Blush Klein</div>
    <div class="item" data-id="bf-moth"><span class="item-dot"></span>Boho Moth</div>
    <div class="item" data-id="bf-resting"><span class="item-dot"></span>Ruhend 3D</div>
    <div class="item" data-id="bf-pair"><span class="item-dot"></span>Pärchen</div>
    <div class="cat" data-cat="boho">Boho Shapes</div>
    <div class="item" data-id="boho-arch"><span class="item-dot"></span>Rainbow Arch</div>
    <div class="item" data-id="boho-oval"><span class="item-dot"></span>Oval Frame</div>
    <div class="item" data-id="boho-orbit"><span class="item-dot"></span>Orbit Sphere</div>
    <div class="item" data-id="boho-vesica"><span class="item-dot"></span>Vesica / Mandorla</div>
    <div class="item" data-id="boho-spiral"><span class="item-dot"></span>Spirale Shell</div>
    <div class="item" data-id="boho-starburst"><span class="item-dot"></span>Starburst</div>
    <div class="item" data-id="boho-wave"><span class="item-dot"></span>Triple Wave</div>
    <div class="cat" data-cat="florals">Florals &amp; Botanik</div>
    <div class="item" data-id="fl-peony"><span class="item-dot"></span>Pfingstrose</div>
    <div class="item" data-id="fl-tulip"><span class="item-dot"></span>Tulpe</div>
    <div class="item" data-id="fl-lily"><span class="item-dot"></span>Lilie</div>
    <div class="item" data-id="fl-sprig"><span class="item-dot"></span>Botanischer Sprig</div>
    <div class="item" data-id="fl-wreath"><span class="item-dot"></span>Blätterkranz</div>
    <div class="item" data-id="fl-rose"><span class="item-dot"></span>Rose</div>
    <div class="item" data-id="fl-wildblume"><span class="item-dot"></span>Wildblume</div>
    <div class="item" data-id="fl-chrys"><span class="item-dot"></span>Chrysantheme</div>
    <div class="item" data-id="fl-branch"><span class="item-dot"></span>Horizontalzweig</div>
    <div class="cat" data-cat="celestial">Stars &amp; Moon</div>
    <div class="item" data-id="cel-sparkle"><span class="item-dot"></span>Sparkle Cluster</div>
    <div class="item" data-id="cel-moon"><span class="item-dot"></span>Mondsichel</div>
    <div class="item" data-id="cel-phases"><span class="item-dot"></span>Mondphasen</div>
    <div class="item" data-id="cel-sun"><span class="item-dot"></span>Sunburst</div>
    <div class="item" data-id="cel-diamond"><span class="item-dot"></span>Diamant</div>
    <div class="item" data-id="cel-star"><span class="item-dot"></span>4-Point Star</div>
    <div class="item" data-id="cel-eye"><span class="item-dot"></span>Boho Eye</div>
    <div class="item" data-id="cel-constellation"><span class="item-dot"></span>Konstellation</div>
    <div class="cat" data-cat="textfillers">Text Fillers</div>
    <div class="item" data-id="tf-circle"><span class="item-dot"></span>Kreistext</div>
    <div class="item" data-id="tf-vertical"><span class="item-dot"></span>Vertical Italic</div>
    <div class="item" data-id="tf-marquee"><span class="item-dot"></span>Marquee</div>
    <div class="item" data-id="tf-micro"><span class="item-dot"></span>Micro Labels</div>
    <div class="item" data-id="tf-ghost"><span class="item-dot"></span>Ghost Number</div>
    <div class="item" data-id="tf-arch"><span class="item-dot"></span>Arch Curved Text</div>
    <div class="item" data-id="tf-badge"><span class="item-dot"></span>Status Badge</div>
    <div class="cat" data-cat="geo">Geometric</div>
    <div class="item" data-id="geo-squares"><span class="item-dot"></span>Nested Squares</div>
    <div class="item" data-id="geo-dots"><span class="item-dot"></span>Dot Grid</div>
    <div class="item" data-id="geo-hex"><span class="item-dot"></span>Hexagon</div>
    <div class="item" data-id="geo-infinity"><span class="item-dot"></span>Infinity</div>
    <div class="item" data-id="geo-cube"><span class="item-dot"></span>Cube Wireframe</div>
    <div class="item" data-id="geo-lines"><span class="item-dot"></span>Line Stack</div>
    <div class="cat" data-cat="frames">Frames &amp; Labels</div>
    <div class="item" data-id="fr-arch"><span class="item-dot"></span>Arch Frame</div>
    <div class="item" data-id="fr-corner"><span class="item-dot"></span>Corner Frame</div>
    <div class="item" data-id="fr-circle"><span class="item-dot"></span>Botanischer Kreisrahmen</div>
    <div class="item" data-id="fr-badge"><span class="item-dot"></span>Dark Badge</div>
    <div class="item" data-id="fr-stamp"><span class="item-dot"></span>Seal / Stamp</div>
    <div class="item" data-id="fr-tag"><span class="item-dot"></span>Inline Category Tag</div>
    <div class="cat" data-cat="burger">Burger Menus</div>
    <div class="item" data-id="bg-classic"><span class="item-dot"></span>Classic Lines</div>
    <div class="item" data-id="bg-stagger"><span class="item-dot"></span>Stagger Slide</div>
    <div class="item" data-id="bg-dots"><span class="item-dot"></span>Dot Matrix</div>
    <div class="item" data-id="bg-circle"><span class="item-dot"></span>Morph Circle</div>
    <div class="cat" data-cat="buttons">CTA Buttons</div>
    <div class="item" data-id="btn-fill"><span class="item-dot"></span>Fill Reveal</div>
    <div class="item" data-id="btn-burg"><span class="item-dot"></span>Burgundy</div>
    <div class="item" data-id="btn-pill"><span class="item-dot"></span>Pill</div>
    <div class="item" data-id="btn-ghost"><span class="item-dot"></span>Ghost Line</div>
    <div class="item" data-id="btn-outline"><span class="item-dot"></span>Outline Slide Up</div>
    <div class="cat" data-cat="scroll">Scroll Indicators</div>
    <div class="item" data-id="sc-petal"><span class="item-dot"></span>Petal Drop</div>
    <div class="item" data-id="sc-cross"><span class="item-dot"></span>Crosshair Pulse</div>
    <div class="item" data-id="sc-rot"><span class="item-dot"></span>Rotating Text</div>
    <div class="item" data-id="sc-marq"><span class="item-dot"></span>Mini Marquee</div>
    <div class="item" data-id="sc-floral"><span class="item-dot"></span>Floral Dip</div>
    <div class="item" data-id="sc-bracket"><span class="item-dot"></span>Bracket + Arrow</div>
    <div class="item" data-id="sc-quill"><span class="item-dot"></span>Feather Quill</div>
    <div class="item" data-id="sc-rosette"><span class="item-dot"></span>Rosette Spin</div>
    <div class="item" data-id="sc-stack"><span class="item-dot"></span>Serif Word Stack</div>
    <div class="cat" data-cat="prevnext">Prev / Next</div>
    <div class="item" data-id="pn-luxe"><span class="item-dot"></span>Luxe Full-Width</div>
    <div class="item" data-id="pn-typo"><span class="item-dot"></span>Typographic</div>
    <div class="item" data-id="pn-minimal"><span class="item-dot"></span>Minimal</div>
    <div class="item" data-id="pn-card"><span class="item-dot"></span>Card Hover</div>
    <div class="cat" data-cat="nav">Navigation</div>
    <div class="item" data-id="nav-classic"><span class="item-dot"></span>Classic Underline</div>
    <div class="item" data-id="nav-dark"><span class="item-dot"></span>Dark Bar</div>
    <div class="item" data-id="nav-pill"><span class="item-dot"></span>Pill Nav</div>
    <div class="cat" data-cat="deco">Dekorative Elemente</div>
    <div class="item" data-id="deco-sprig"><span class="item-dot"></span>Sprig Divider</div>
    <div class="item" data-id="deco-quote"><span class="item-dot"></span>Quote Flora Box</div>
    <div class="item" data-id="deco-tag"><span class="item-dot"></span>Flora Tag Pill</div>
    <div class="item" data-id="deco-stat"><span class="item-dot"></span>Flora Stat Box</div>
    <div class="item" data-id="deco-eyebrow"><span class="item-dot"></span>Petal Eyebrow</div>
    <div class="item" data-id="deco-connector"><span class="item-dot"></span>Connector Line</div>
    <div class="item" data-id="deco-box-a"><span class="item-dot"></span>Box Corner Reveal</div>
    <div class="item" data-id="deco-box-b"><span class="item-dot"></span>Box Stack Rotate</div>
    <div class="item" data-id="deco-box-c"><span class="item-dot"></span>Box Dark Bloom</div>
    <div class="item" data-id="deco-box-d"><span class="item-dot"></span>Box Dash Border</div>
    <div class="item" data-id="deco-box-e"><span class="item-dot"></span>Box Top Line</div>
  </nav>
</aside>

<!-- MAIN STAGE -->
<main class="stage">
  <div class="stage-topbar">
    <span id="stageName">Rotierende Blume</span>
    <span id="stageTag">Hero</span>
  </div>
  <div class="preview-wrap" id="previewWrap">
    <div class="preview-inner" id="previewEl"></div>
    <div class="scale-row">
      <button class="sc-btn on" data-scale="1">100%</button>
      <button class="sc-btn" data-scale=".75">75%</button>
      <button class="sc-btn" data-scale="1.5">150%</button>
      <button class="sc-btn" data-scale="2">200%</button>
    </div>
    <div class="bg-row">
      <div class="bg-sw on" data-bg="#fafafa" style="background:#fafafa;border:1.5px solid #ddd"></div>
      <div class="bg-sw" data-bg="#F5F0EA" style="background:#F5F0EA;border:1.5px solid #ddd"></div>
      <div class="bg-sw" data-bg="#314A51" style="background:#314A51"></div>
      <div class="bg-sw" data-bg="#2D2020" style="background:#2D2020"></div>
    </div>
  </div>
</main>

<!-- COPY BAR -->
<div class="copy-bar">
  <span class="copy-lbl">Kopieren:</span>
  <button class="cp-btn" onclick="doCopy('html')" title="Nur das HTML-Element">
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="1" y="3" width="7" height="8" rx="1"/><path d="M3.5 3V2a1 1 0 011-1h5a1 1 0 011 1v8a1 1 0 01-1 1H8"/></svg>HTML
  </button>
  <button class="cp-btn" onclick="doCopy('css')" title="Nur das CSS">
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="1" y="3" width="7" height="8" rx="1"/><path d="M3.5 3V2a1 1 0 011-1h5a1 1 0 011 1v8a1 1 0 01-1 1H8"/></svg>CSS
  </button>
  <button class="cp-btn" onclick="doCopy('js')" title="Nur das JavaScript">
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="1" y="3" width="7" height="8" rx="1"/><path d="M3.5 3V2a1 1 0 011-1h5a1 1 0 011 1v8a1 1 0 01-1 1H8"/></svg>JS
  </button>
  <button class="cp-btn cp-all" onclick="doCopy('all')" title="Alles zusammen — HTML + CSS + JS in einem Snippet">
    ✦ Alles kopieren
  </button>
</div>

<!-- SETTINGS PANEL -->
<aside class="panel" id="panel">
  <div class="panel-tabs">
    <div class="ptab on" data-tab="text">Text</div>
    <div class="ptab" data-tab="position">Position</div>
    <div class="ptab" data-tab="typo">Typo</div>
    <div class="ptab" data-tab="anim">Anim</div>
    <div class="ptab" data-tab="color">Farbe</div>
  </div>

  <!-- TAB: TEXT -->
  <div class="ptab-pane on" id="tab-text">
    <div class="section-head">Inhalte</div>
    <div class="field" id="f-text"><label>Text / Label</label><input type="text" id="set-text" value="Entdecken"></div>
    <div class="field" id="f-text2"><label>Text 2</label><input type="text" id="set-text2" value="Nächstes Projekt"></div>
    <div class="field" id="f-text3"><label>Text 3</label><input type="text" id="set-text3" value="Vorheriges"></div>
    <div class="field">
      <label>Grösse</label>
      <div class="range-row">
        <input type="range" id="set-size" min="30" max="280" value="80">
        <span class="range-val" id="sz-val">80px</span>
      </div>
    </div>
  </div>

  <!-- TAB: POSITION -->
  <div class="ptab-pane" id="tab-position">
    <div class="section-head">Ausrichtung im Container</div>
    <div class="seg" id="seg-align">
      <button class="seg-btn on" data-val="flex-start">Links</button>
      <button class="seg-btn" data-val="center">Mitte</button>
      <button class="seg-btn" data-val="flex-end">Rechts</button>
    </div>
    <div class="seg" id="seg-valign">
      <button class="seg-btn on" data-val="flex-start">Oben</button>
      <button class="seg-btn" data-val="center">Mitte</button>
      <button class="seg-btn" data-val="flex-end">Unten</button>
    </div>

    <div class="section-head" style="margin-top:8px">Abstände (px)</div>
    <div class="field-row">
      <div class="field"><label>Oben</label><input type="number" id="set-mt" value="0" min="-200" max="400"></div>
      <div class="field"><label>Unten</label><input type="number" id="set-mb" value="0" min="-200" max="400"></div>
    </div>
    <div class="field-row">
      <div class="field"><label>Links</label><input type="number" id="set-ml" value="0" min="-200" max="400"></div>
      <div class="field"><label>Rechts</label><input type="number" id="set-mr" value="0" min="-200" max="400"></div>
    </div>
    <div class="field-row">
      <div class="field"><label>Padding H</label><input type="number" id="set-ph" value="0" min="0" max="80"></div>
      <div class="field"><label>Padding V</label><input type="number" id="set-pv" value="0" min="0" max="80"></div>
    </div>

    <div class="section-head" style="margin-top:8px">Position-Modus</div>
    <div class="seg" id="seg-pos">
      <button class="seg-btn on" data-val="relative">relative</button>
      <button class="seg-btn" data-val="absolute">absolute</button>
      <button class="seg-btn" data-val="fixed">fixed</button>
    </div>

    <div class="field">
      <label>Radius</label>
      <div class="range-row">
        <input type="range" id="set-radius" min="0" max="50" value="0">
        <span class="range-val" id="rad-val">0px</span>
      </div>
    </div>
    <div class="field">
      <label>Opacity</label>
      <div class="range-row">
        <input type="range" id="set-opacity" min="10" max="100" value="100">
        <span class="range-val" id="op-val">100%</span>
      </div>
    </div>

    <div class="tip"><strong>Tipp:</strong> Die kopierten CSS-Werte enthalten alle Abstände und Ausrichtung als inline-CSS-Block, den du direkt in dein Element einfügen kannst.</div>
  </div>

  <!-- TAB: TYPOGRAPHY -->
  <div class="ptab-pane" id="tab-typo">
    <div class="section-head">Schrift</div>
    <div class="field">
      <label>Font</label>
      <select id="set-font">
        <option value="'Outfit', sans-serif">Outfit (Standard)</option>
        <option value="'Cormorant Garamond', serif">Cormorant Garamond</option>
        <option value="'Work Sans', sans-serif">Work Sans</option>
        <option value="'Playfair Display', serif">Playfair Display</option>
        <option value="'Higuen', serif">Higuen</option>
      </select>
    </div>
    <div class="field">
      <label>Grösse</label>
      <select id="set-fontsize">
        <option value="9px">9px — xs Tags</option>
        <option value="11px">11px — text-xs</option>
        <option value="13px">13px — text-sm</option>
        <option value="16px" selected>16px — text-base</option>
        <option value="18px">18px — text-md</option>
        <option value="24px">24px — text-lg / H3</option>
        <option value="42px">42px — text-xl / H2</option>
        <option value="64px">64px — text-2xl / H1</option>
      </select>
    </div>
    <div class="field">
      <label>Font Weight</label>
      <div class="seg" id="seg-fw">
        <button class="seg-btn" data-val="200">Thin</button>
        <button class="seg-btn on" data-val="400">Reg</button>
        <button class="seg-btn" data-val="600">Semi</button>
      </div>
    </div>
    <div class="toggle-row">
      <span>Italic</span>
      <div class="toggle" id="tog-italic" onclick="toggleIt(this)"></div>
    </div>
    <div class="toggle-row">
      <span>Uppercase</span>
      <div class="toggle" id="tog-upper" onclick="toggleIt(this)"></div>
    </div>
    <div class="field">
      <label>Letter Spacing</label>
      <div class="range-row">
        <input type="range" id="set-ls" min="0" max="40" value="5">
        <span class="range-val" id="ls-val">0.05em</span>
      </div>
    </div>
    <div class="field">
      <label>Line Height</label>
      <div class="range-row">
        <input type="range" id="set-lh" min="10" max="25" value="16">
        <span class="range-val" id="lh-val">1.6</span>
      </div>
    </div>
    <div class="tip"><strong>Deine Skala:</strong> xs·11px, sm·13px, base·16px, md·18px, lg·24px, xl·42px, 2xl·64px</div>
  </div>

  <!-- TAB: ANIMATION -->
  <div class="ptab-pane" id="tab-anim">
    <div class="section-head">Animation</div>
    <div class="toggle-row">
      <span>Animation aktiv</span>
      <div class="toggle on" id="tog-anim" onclick="toggleIt(this,'anim')"></div>
    </div>

    <div class="field">
      <label>Typ</label>
      <select id="set-animtype">
        <option value="rotCW">Rotieren ↻</option>
        <option value="rotCCW">Rotieren ↺</option>
        <option value="float">Float auf/ab</option>
        <option value="pulse">Pulse (scale)</option>
        <option value="twinkle">Twinkle</option>
        <option value="ringBreath">Ring Breathe</option>
        <option value="moonrise">Moonrise</option>
        <option value="arrowBob">Arrow Bob</option>
        <option value="waveFlow">Wave Flow</option>
      </select>
    </div>

    <div class="field">
      <label>Dauer (s)</label>
      <div class="range-row">
        <input type="range" id="set-dur" min="1" max="40" value="12">
        <span class="range-val" id="dur-val">12s</span>
      </div>
    </div>
    <div class="field">
      <label>Timing</label>
      <select id="set-timing">
        <option value="linear">linear</option>
        <option value="ease-in-out" selected>ease-in-out</option>
        <option value="ease">ease</option>
        <option value="cubic-bezier(.16,1,.3,1)">Smooth Out</option>
        <option value="cubic-bezier(.34,1.56,.64,1)">Bounce</option>
      </select>
    </div>
    <div class="toggle-row">
      <span>Infinite</span>
      <div class="toggle on" id="tog-infinite" onclick="toggleIt(this)"></div>
    </div>
    <div class="field">
      <label>Delay (s)</label>
      <div class="range-row">
        <input type="range" id="set-delay" min="0" max="10" value="0" step="0.1">
        <span class="range-val" id="delay-val">0s</span>
      </div>
    </div>
    <div class="tip"><strong>Tipp:</strong> Der Animations-Override wird als inline <code>style=</code> auf das Wurzel-Element geschrieben und im "Alles kopieren" mit ausgegeben.</div>
  </div>

  <!-- TAB: COLOR -->
  <div class="ptab-pane" id="tab-color">
    <div class="section-head">Deine Palette</div>
    <div class="field-row">
      <div class="field"><label>Primär (Burg)</label><input type="color" id="set-c1" value="#6E3B49"></div>
      <div class="field"><label>Sekundär (Mauve)</label><input type="color" id="set-c2" value="#B5A19E"></div>
    </div>
    <div class="field-row">
      <div class="field"><label>Akzent (DG)</label><input type="color" id="set-c3" value="#314A51"></div>
      <div class="field"><label>Text (Dark)</label><input type="color" id="set-c4" value="#2D2020"></div>
    </div>
    <div class="divider"></div>
    <div class="section-head">Schnell-Palette</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
      <div class="pal-dot" data-c1="#6E3B49" data-c2="#B5A19E" data-c3="#314A51" data-c4="#2D2020" style="width:22px;height:22px;border-radius:50%;background:#6E3B49;cursor:pointer;border:2px solid transparent" title="Khadija Original"></div>
      <div class="pal-dot" data-c1="#2D2020" data-c2="#525252" data-c3="#1a1a1a" data-c4="#0a0a0a" style="width:22px;height:22px;border-radius:50%;background:#2D2020;cursor:pointer;border:2px solid transparent" title="Monochrome Dark"></div>
      <div class="pal-dot" data-c1="#314A51" data-c2="#56686A" data-c3="#1e3235" data-c4="#0d1a1c" style="width:22px;height:22px;border-radius:50%;background:#314A51;cursor:pointer;border:2px solid transparent" title="Forest Green"></div>
      <div class="pal-dot" data-c1="#8B6B5A" data-c2="#C4A882" data-c3="#5C3D2E" data-c4="#2D1B0E" style="width:22px;height:22px;border-radius:50%;background:#8B6B5A;cursor:pointer;border:2px solid transparent" title="Warm Terra"></div>
      <div class="pal-dot" data-c1="#4A4A6A" data-c2="#9A9ABB" data-c3="#2A2A4A" data-c4="#1a1a2e" style="width:22px;height:22px;border-radius:50%;background:#4A4A6A;cursor:pointer;border:2px solid transparent" title="Midnight Blue"></div>
    </div>
    <div class="tip"><strong>Farben</strong> werden live auf die Komponente angewendet und in alle 4 Copy-Buttons übernommen.</div>
  </div>
</aside>

<script>
// ═══════════════════════════════════════════════════
//  COMPONENT LIBRARY (vollständig aus Doc 1)
// ═══════════════════════════════════════════════════
const C = {
'hero-flower':{name:'Rotierende Blume',tag:'Hero',
html:`<div style="position:relative;display:flex;align-items:center;justify-content:center;width:[[SZ]]px;height:[[SZ]]px">
  <svg style="animation:rotCW 16s linear infinite;position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 80 80" fill="none">
    <ellipse cx="40" cy="40" rx="7" ry="24" stroke="rgba(181,161,158,.45)" stroke-width=".9"/>
    <ellipse cx="40" cy="40" rx="7" ry="24" stroke="rgba(181,161,158,.45)" stroke-width=".9" transform="rotate(60 40 40)"/>
    <ellipse cx="40" cy="40" rx="7" ry="24" stroke="rgba(181,161,158,.45)" stroke-width=".9" transform="rotate(120 40 40)"/>
    <circle cx="40" cy="40" r="34" stroke="rgba(181,161,158,.1)" stroke-width=".6" stroke-dasharray="2 4"/>
  </svg>
  <svg style="animation:rotCCW 11s linear infinite;position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 80 80" fill="none">
    <ellipse cx="40" cy="40" rx="5" ry="15" stroke="rgba(212,185,181,.35)" stroke-width=".7" transform="rotate(30 40 40)"/>
    <ellipse cx="40" cy="40" rx="5" ry="15" stroke="rgba(212,185,181,.35)" stroke-width=".7" transform="rotate(90 40 40)"/>
    <ellipse cx="40" cy="40" rx="5" ry="15" stroke="rgba(212,185,181,.35)" stroke-width=".7" transform="rotate(150 40 40)"/>
  </svg>
  <div style="position:absolute;width:8px;height:8px;background:[[C1]];border-radius:50%;box-shadow:0 0 0 4px rgba(110,59,73,.15)"></div>
</div>`,
css:`@keyframes rotCW{to{transform:rotate(360deg)}}
@keyframes rotCCW{to{transform:rotate(-360deg)}}`,js:''},

'triple-rings':{name:'Triple Ringe',tag:'Hero',
html:`<div style="position:relative;width:[[SZ]]px;height:[[SZ]]px;display:flex;align-items:center;justify-content:center">
  <div style="position:absolute;border-radius:50%;border:1px solid [[C2]];opacity:.35;width:60%;height:60%;animation:ringBreath 4s ease-in-out infinite"></div>
  <div style="position:absolute;border-radius:50%;border:1px solid [[C2]];opacity:.35;width:80%;height:40%;animation:ringBreath 4s ease-in-out infinite .5s"></div>
  <div style="position:absolute;border-radius:50%;border:1px solid [[C2]];opacity:.35;width:98%;height:25%;animation:ringBreath 4s ease-in-out infinite 1s"></div>
</div>`,
css:`@keyframes ringBreath{0%,100%{opacity:.2}50%{opacity:.55}}`,js:''},

'dash-rose':{name:'Dash Rose',tag:'Hero',
html:`<div style="position:relative;width:[[SZ]]px;height:[[SZ]]px;display:flex;align-items:center;justify-content:center">
  <svg style="width:100%;height:100%;animation:rotCW 22s linear infinite" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" stroke="rgba(181,161,158,.35)" stroke-width="1" stroke-dasharray="4 5"/>
    <line x1="50" y1="5" x2="50" y2="14" stroke="rgba(181,161,158,.45)" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="50" y1="5" x2="50" y2="14" stroke="rgba(181,161,158,.45)" stroke-width="1.2" stroke-linecap="round" transform="rotate(45 50 50)"/>
    <line x1="50" y1="5" x2="50" y2="14" stroke="rgba(181,161,158,.45)" stroke-width="1.2" stroke-linecap="round" transform="rotate(90 50 50)"/>
    <line x1="50" y1="5" x2="50" y2="14" stroke="rgba(181,161,158,.45)" stroke-width="1.2" stroke-linecap="round" transform="rotate(135 50 50)"/>
    <line x1="50" y1="5" x2="50" y2="14" stroke="rgba(181,161,158,.45)" stroke-width="1.2" stroke-linecap="round" transform="rotate(180 50 50)"/>
    <line x1="50" y1="5" x2="50" y2="14" stroke="rgba(181,161,158,.45)" stroke-width="1.2" stroke-linecap="round" transform="rotate(225 50 50)"/>
    <line x1="50" y1="5" x2="50" y2="14" stroke="rgba(181,161,158,.45)" stroke-width="1.2" stroke-linecap="round" transform="rotate(270 50 50)"/>
    <line x1="50" y1="5" x2="50" y2="14" stroke="rgba(181,161,158,.45)" stroke-width="1.2" stroke-linecap="round" transform="rotate(315 50 50)"/>
    <ellipse cx="50" cy="50" rx="7" ry="20" stroke="rgba(181,161,158,.5)" stroke-width=".8"/>
    <ellipse cx="50" cy="50" rx="7" ry="20" stroke="rgba(181,161,158,.5)" stroke-width=".8" transform="rotate(60 50 50)"/>
    <ellipse cx="50" cy="50" rx="7" ry="20" stroke="rgba(181,161,158,.5)" stroke-width=".8" transform="rotate(120 50 50)"/>
    <circle cx="50" cy="50" r="4" fill="rgba(110,59,73,.4)"/>
  </svg>
  <div style="position:absolute;width:5px;height:5px;background:[[C2]];border-radius:50%"></div>
</div>`,
css:`@keyframes rotCW{to{transform:rotate(360deg)}}`,js:''},

'petal-spin':{name:'Petal Spinner',tag:'Hero',
html:`<div style="position:relative;width:[[SZ]]px;height:[[SZ]]px;display:flex;align-items:center;justify-content:center">
  <svg style="animation:rotCW 12s linear infinite" width="[[SZ]]" height="[[SZ]]" viewBox="0 0 80 80" fill="none">
    <ellipse cx="40" cy="40" rx="5" ry="18" stroke="[[C1]]" stroke-width=".8" opacity=".7"/>
    <ellipse cx="40" cy="40" rx="5" ry="18" stroke="[[C1]]" stroke-width=".8" opacity=".7" transform="rotate(45 40 40)"/>
    <ellipse cx="40" cy="40" rx="5" ry="18" stroke="[[C1]]" stroke-width=".8" opacity=".7" transform="rotate(90 40 40)"/>
    <ellipse cx="40" cy="40" rx="5" ry="18" stroke="[[C1]]" stroke-width=".8" opacity=".7" transform="rotate(135 40 40)"/>
  </svg>
  <div style="position:absolute;width:8px;height:8px;background:[[C1]];border-radius:50%"></div>
</div>`,
css:`@keyframes rotCW{to{transform:rotate(360deg)}}`,js:''},

'dotted-orbit':{name:'Dotted Orbit',tag:'Hero',
html:`<div style="position:relative;width:[[SZ]]px;height:[[SZ]]px;display:flex;align-items:center;justify-content:center">
  <svg style="animation:rotCW 20s linear infinite;position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 88 88" fill="none">
    <circle cx="44" cy="44" r="38" stroke="rgba(181,161,158,.2)" stroke-width=".8" stroke-dasharray="3 6"/>
    <circle cx="44" cy="6" r="3" fill="[[C1]]"/>
    <circle cx="44" cy="6" r="3" fill="[[C2]]" transform="rotate(90 44 44)"/>
    <circle cx="44" cy="6" r="3" fill="[[C2]]" transform="rotate(180 44 44)"/>
    <circle cx="44" cy="6" r="3" fill="[[C2]]" transform="rotate(270 44 44)"/>
  </svg>
  <div style="position:absolute;width:12px;height:12px;border:1.5px solid [[C1]];border-radius:50%"></div>
</div>`,
css:`@keyframes rotCW{to{transform:rotate(360deg)}}`,js:''},

'star-petals':{name:'Star Petals',tag:'Hero',
html:`<svg style="animation:rotCW 25s linear infinite" width="[[SZ]]" height="[[SZ]]" viewBox="0 0 80 80" fill="none">
  <ellipse cx="40" cy="40" rx="4" ry="16" fill="[[C2]]" opacity=".35"/>
  <ellipse cx="40" cy="40" rx="4" ry="16" fill="[[C2]]" opacity=".35" transform="rotate(30 40 40)"/>
  <ellipse cx="40" cy="40" rx="4" ry="16" fill="[[C2]]" opacity=".35" transform="rotate(60 40 40)"/>
  <ellipse cx="40" cy="40" rx="4" ry="16" fill="[[C2]]" opacity=".35" transform="rotate(90 40 40)"/>
  <ellipse cx="40" cy="40" rx="4" ry="16" fill="[[C2]]" opacity=".35" transform="rotate(120 40 40)"/>
  <ellipse cx="40" cy="40" rx="4" ry="16" fill="[[C2]]" opacity=".35" transform="rotate(150 40 40)"/>
  <circle cx="40" cy="40" r="5" fill="[[C1]]" opacity=".5"/>
</svg>`,css:`@keyframes rotCW{to{transform:rotate(360deg)}}`,js:''},

'asterisk-spin':{name:'Asterisk Spin',tag:'Hero',
html:`<span style="font-size:[[SZ]]px;color:[[C2]];animation:rotCW 8s linear infinite;display:inline-block;line-height:1">✳</span>`,
css:`@keyframes rotCW{to{transform:rotate(360deg)}}`,js:''},

'rotating-seal':{name:'Rotating Seal',tag:'Hero',
html:`<div style="width:[[SZ]]px;height:[[SZ]]px;border-radius:50%;border:1px dashed [[C2]];display:flex;align-items:center;justify-content:center;font-size:8px;text-transform:uppercase;letter-spacing:.12em;animation:rotCW 12s linear infinite;color:[[C4]];font-family:inherit">[[T]]</div>`,
css:`@keyframes rotCW{to{transform:rotate(360deg)}}`,js:''},

'bf-glasswing':{name:'Mauve Glasswing',tag:'Butterfly',
html:`<div style="animation:float 5s ease-in-out infinite;cursor:pointer">
  <svg width="140" height="120" viewBox="0 0 140 120" overflow="visible" class="bf-hover-only">
    <g class="bf-wL">
      <path d="M67 57 C60 44 40 18 20 16 C6 15 2 30 8 46 C14 60 42 68 67 64Z" fill="rgba(181,161,158,.18)" stroke="[[C1]]" stroke-width="1.4"/>
      <path d="M67 64 C52 74 28 86 16 80 C7 75 12 62 28 60 C44 58 60 62 67 64Z" fill="rgba(212,185,181,.22)" stroke="[[C2]]" stroke-width="1.2"/>
    </g>
    <g class="bf-wR">
      <path d="M73 57 C80 44 100 18 120 16 C134 15 138 30 132 46 C126 60 98 68 73 64Z" fill="rgba(181,161,158,.18)" stroke="[[C1]]" stroke-width="1.4"/>
      <path d="M73 64 C88 74 112 86 124 80 C133 75 128 62 112 60 C96 58 80 62 73 64Z" fill="rgba(212,185,181,.22)" stroke="[[C2]]" stroke-width="1.2"/>
    </g>
    <ellipse cx="70" cy="62" rx="2.8" ry="22" fill="[[C3]]" opacity=".82"/>
    <circle cx="70" cy="41" r="4.5" fill="[[C3]]"/>
    <path d="M70 37 Q64 26 58 16" stroke="[[C3]]" stroke-width="1.1" fill="none" stroke-linecap="round"/>
    <circle cx="56" cy="7" r="3" fill="[[C3]]"/>
    <path d="M70 37 Q76 26 82 16" stroke="[[C3]]" stroke-width="1.1" fill="none" stroke-linecap="round"/>
    <circle cx="84" cy="7" r="3" fill="[[C3]]"/>
  </svg>
</div>`,
css:`.bf-hover-only .bf-wL,.bf-hover-only .bf-wR{transform-origin:center 55%}
.bf-hover-only:hover .bf-wL{animation:flapL .6s cubic-bezier(.45,0,.55,1) infinite alternate}
.bf-hover-only:hover .bf-wR{animation:flapR .6s cubic-bezier(.45,0,.55,1) infinite alternate}
@keyframes flapL{from{transform:perspective(400px) rotateY(0deg) scaleX(1)}to{transform:perspective(400px) rotateY(-62deg) scaleX(.85)}}
@keyframes flapR{from{transform:perspective(400px) rotateY(0deg) scaleX(1)}to{transform:perspective(400px) rotateY(62deg) scaleX(.85)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`,js:''},

'bf-morpho':{name:'Dark Morpho',tag:'Butterfly',
html:`<div class="bf-wrap-anim" style="--speed:2.2s;animation:float 6s ease-in-out infinite">
  <svg width="150" height="125" viewBox="0 0 150 125" overflow="visible">
    <g class="bf-wL"><path d="M72 60 C62 44 34 12 12 16 C-2 20 0 42 10 58 C20 72 50 78 72 70Z" fill="rgba(49,74,81,.2)" stroke="[[C3]]" stroke-width="1.5"/>
    <path d="M72 70 C52 82 22 96 10 88 C0 82 8 66 28 64 C48 62 66 68 72 70Z" fill="rgba(86,104,106,.18)" stroke="[[C3]]" stroke-width="1.2" opacity=".7"/></g>
    <g class="bf-wR"><path d="M78 60 C88 44 116 12 138 16 C152 20 150 42 140 58 C130 72 100 78 78 70Z" fill="rgba(49,74,81,.2)" stroke="[[C3]]" stroke-width="1.5"/>
    <path d="M78 70 C98 82 128 96 140 88 C150 82 142 66 122 64 C102 62 84 68 78 70Z" fill="rgba(86,104,106,.18)" stroke="[[C3]]" stroke-width="1.2" opacity=".7"/></g>
    <ellipse cx="75" cy="68" rx="2.8" ry="24" fill="[[C3]]" opacity=".88"/>
    <circle cx="75" cy="44" r="4.8" fill="[[C3]]"/>
    <path d="M75 40 Q68 28 62 16" stroke="[[C3]]" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <circle cx="60" cy="6" r="3.2" fill="[[C3]]"/>
    <path d="M75 40 Q82 28 88 16" stroke="[[C3]]" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <circle cx="90" cy="6" r="3.2" fill="[[C3]]"/>
  </svg>
</div>`,
css:`.bf-wrap-anim .bf-wL{transform-origin:100% 50%;animation:flapL var(--speed,1.8s) cubic-bezier(.45,0,.55,1) infinite alternate}
.bf-wrap-anim .bf-wR{transform-origin:0% 50%;animation:flapR var(--speed,1.8s) cubic-bezier(.45,0,.55,1) infinite alternate}
@keyframes flapL{from{transform:perspective(400px) rotateY(0deg) scaleX(1)}to{transform:perspective(400px) rotateY(-62deg) scaleX(.85)}}
@keyframes flapR{from{transform:perspective(400px) rotateY(0deg) scaleX(1)}to{transform:perspective(400px) rotateY(62deg) scaleX(.85)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`,js:''},

'bf-blush':{name:'Blush Klein',tag:'Butterfly',
html:`<div class="bf-hover-only" style="animation:float 4s ease-in-out infinite;cursor:pointer">
  <svg width="[[SZ]]" height="86" viewBox="0 0 100 86" overflow="visible">
    <g class="bf-wL">
      <path d="M47 43 C40 33 22 12 8 14 C0 16 0 28 6 38 C12 48 30 52 47 48Z" fill="rgba(212,185,181,.3)" stroke="[[C2]]" stroke-width="1.3"/>
      <path d="M47 48 C34 56 16 64 8 60 C2 56 8 46 20 44 C32 42 42 46 47 48Z" fill="rgba(181,161,158,.22)" stroke="[[C2]]" stroke-width="1.1"/>
    </g>
    <g class="bf-wR">
      <path d="M53 43 C60 33 78 12 92 14 C100 16 100 28 94 38 C88 48 70 52 53 48Z" fill="rgba(212,185,181,.3)" stroke="[[C2]]" stroke-width="1.3"/>
      <path d="M53 48 C66 56 84 64 92 60 C98 56 92 46 80 44 C68 42 58 46 53 48Z" fill="rgba(181,161,158,.22)" stroke="[[C2]]" stroke-width="1.1"/>
    </g>
    <ellipse cx="50" cy="47" rx="2.4" ry="16" fill="[[C1]]" opacity=".75"/>
    <circle cx="50" cy="29" r="3.8" fill="[[C1]]" opacity=".85"/>
    <path d="M50 26 Q46 18 42 12" stroke="[[C1]]" stroke-width=".9" fill="none" stroke-linecap="round"/>
    <circle cx="41" cy="11" r="2.2" fill="[[C1]]"/>
    <path d="M50 26 Q54 18 58 12" stroke="[[C1]]" stroke-width=".9" fill="none" stroke-linecap="round"/>
    <circle cx="59" cy="11" r="2.2" fill="[[C1]]"/>
  </svg>
</div>`,
css:`.bf-hover-only .bf-wL,.bf-hover-only .bf-wR{transform-origin:center 55%}
.bf-hover-only:hover .bf-wL{animation:flapL .6s cubic-bezier(.45,0,.55,1) infinite alternate}
.bf-hover-only:hover .bf-wR{animation:flapR .6s cubic-bezier(.45,0,.55,1) infinite alternate}
@keyframes flapL{from{transform:perspective(400px) rotateY(0deg) scaleX(1)}to{transform:perspective(400px) rotateY(-62deg) scaleX(.85)}}
@keyframes flapR{from{transform:perspective(400px) rotateY(0deg) scaleX(1)}to{transform:perspective(400px) rotateY(62deg) scaleX(.85)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`,js:''},

'bf-moth':{name:'Boho Moth',tag:'Butterfly',
html:`<div class="bf-wrap-anim" style="--speed:3s;background:[[C3]];padding:20px;display:inline-block">
  <svg width="140" height="120" viewBox="0 0 140 120" overflow="visible">
    <g class="bf-wL">
      <path d="M68 58 C56 46 30 22 12 24 C0 26 0 44 10 56 C20 66 46 70 68 66Z" fill="rgba(212,185,181,.15)" stroke="rgba(212,185,181,.6)" stroke-width="1.4"/>
      <path d="M68 66 C48 76 24 84 14 78 C6 73 12 60 30 58 C46 56 62 62 68 66Z" fill="rgba(181,161,158,.1)" stroke="rgba(181,161,158,.5)" stroke-width="1.1"/>
    </g>
    <g class="bf-wR">
      <path d="M72 58 C84 46 110 22 128 24 C140 26 140 44 130 56 C120 66 94 70 72 66Z" fill="rgba(212,185,181,.15)" stroke="rgba(212,185,181,.6)" stroke-width="1.4"/>
      <path d="M72 66 C92 76 116 84 126 78 C134 73 128 60 110 58 C94 56 78 62 72 66Z" fill="rgba(181,161,158,.1)" stroke="rgba(181,161,158,.5)" stroke-width="1.1"/>
    </g>
    <ellipse cx="70" cy="63" rx="3" ry="20" fill="rgba(245,245,245,.7)"/>
    <circle cx="70" cy="42" r="5" fill="rgba(245,245,245,.8)"/>
    <path d="M70 38 Q62 28 54 18" stroke="rgba(245,245,245,.5)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <path d="M70 38 Q78 28 86 18" stroke="rgba(245,245,245,.5)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  </svg>
</div>`,
css:`.bf-wrap-anim .bf-wL{transform-origin:100% 50%;animation:flapL var(--speed,1.8s) cubic-bezier(.45,0,.55,1) infinite alternate}
.bf-wrap-anim .bf-wR{transform-origin:0% 50%;animation:flapR var(--speed,1.8s) cubic-bezier(.45,0,.55,1) infinite alternate}
@keyframes flapL{from{transform:perspective(400px) rotateY(0deg)}to{transform:perspective(400px) rotateY(-70deg)}}
@keyframes flapR{from{transform:perspective(400px) rotateY(0deg)}to{transform:perspective(400px) rotateY(70deg)}}`,js:''},

'bf-resting':{name:'Ruhend 3D',tag:'Butterfly',
html:`<div class="bf-hover-only" style="cursor:pointer">
  <svg width="130" height="105" viewBox="0 0 130 105" overflow="visible">
    <g class="bf-wL" style="transform:perspective(600px) rotateY(-15deg)">
      <path d="M62 54 C52 40 26 10 8 14 C-4 18 -2 38 8 52 C18 64 44 70 62 64Z" fill="rgba(110,59,73,.16)" stroke="[[C1]]" stroke-width="1.5"/>
      <path d="M62 64 C44 76 18 88 8 82 C0 77 6 62 24 60 C40 58 56 62 62 64Z" fill="rgba(181,161,158,.2)" stroke="[[C2]]" stroke-width="1.2"/>
    </g>
    <g class="bf-wR" style="transform:perspective(600px) rotateY(15deg)">
      <path d="M68 54 C78 40 104 10 122 14 C134 18 132 38 122 52 C112 64 86 70 68 64Z" fill="rgba(110,59,73,.16)" stroke="[[C1]]" stroke-width="1.5"/>
      <path d="M68 64 C86 76 112 88 122 82 C130 77 124 62 106 60 C90 58 74 62 68 64Z" fill="rgba(181,161,158,.2)" stroke="[[C2]]" stroke-width="1.2"/>
    </g>
    <ellipse cx="65" cy="60" rx="2.8" ry="20" fill="[[C3]]" opacity=".85"/>
    <circle cx="65" cy="40" r="4.6" fill="[[C3]]"/>
    <path d="M65 36 Q59 25 53 14" stroke="[[C3]]" stroke-width="1.1" fill="none" stroke-linecap="round"/>
    <circle cx="51" cy="5" r="3" fill="[[C3]]"/>
    <path d="M65 36 Q71 25 77 14" stroke="[[C3]]" stroke-width="1.1" fill="none" stroke-linecap="round"/>
    <circle cx="79" cy="5" r="3" fill="[[C3]]"/>
  </svg>
</div>`,
css:`.bf-hover-only .bf-wL,.bf-hover-only .bf-wR{transform-origin:center 55%}
.bf-hover-only:hover .bf-wL{animation:flapL .6s cubic-bezier(.45,0,.55,1) infinite alternate}
.bf-hover-only:hover .bf-wR{animation:flapR .6s cubic-bezier(.45,0,.55,1) infinite alternate}
@keyframes flapL{from{transform:perspective(400px) rotateY(0deg)}to{transform:perspective(400px) rotateY(-62deg)}}
@keyframes flapR{from{transform:perspective(400px) rotateY(0deg)}to{transform:perspective(400px) rotateY(62deg)}}`,js:''},

'bf-pair':{name:'Schmetterlinge Pärchen',tag:'Butterfly',
html:`<div style="position:relative;width:120px;height:100px">
  <div class="bf-wrap-anim" style="--speed:1.9s;position:absolute;top:0;left:0;animation:float 4s ease-in-out infinite">
    <svg width="70" height="58" viewBox="0 0 100 86" overflow="visible">
      <g class="bf-wL"><path d="M47 43 C40 33 22 12 8 14 C0 16 0 28 6 38 C12 48 30 52 47 48Z" fill="rgba(212,185,181,.28)" stroke="[[C2]]" stroke-width="1.4"/>
      <path d="M47 48 C34 56 16 64 8 60 C2 56 8 46 20 44 C32 42 42 46 47 48Z" fill="rgba(181,161,158,.2)" stroke="[[C2]]" stroke-width="1.1"/></g>
      <g class="bf-wR"><path d="M53 43 C60 33 78 12 92 14 C100 16 100 28 94 38 C88 48 70 52 53 48Z" fill="rgba(212,185,181,.28)" stroke="[[C2]]" stroke-width="1.4"/>
      <path d="M53 48 C66 56 84 64 92 60 C98 56 92 46 80 44 C68 42 58 46 53 48Z" fill="rgba(181,161,158,.2)" stroke="[[C2]]" stroke-width="1.1"/></g>
      <ellipse cx="50" cy="47" rx="2.2" ry="15" fill="[[C1]]" opacity=".72"/>
      <circle cx="50" cy="30" r="3.5" fill="[[C1]]" opacity=".78"/>
    </svg>
  </div>
  <div class="bf-wrap-anim" style="--speed:2.4s;position:absolute;bottom:0;right:0;animation:float 4s ease-in-out .8s infinite">
    <svg width="55" height="48" viewBox="0 0 100 86" overflow="visible">
      <g class="bf-wL"><path d="M47 43 C40 33 22 12 8 14 C0 16 0 28 6 38 C12 48 30 52 47 48Z" fill="rgba(49,74,81,.18)" stroke="[[C3]]" stroke-width="1.4"/>
      <path d="M47 48 C34 56 16 64 8 60 C2 56 8 46 20 44 C32 42 42 46 47 48Z" fill="rgba(86,104,106,.14)" stroke="[[C3]]" stroke-width="1.1"/></g>
      <g class="bf-wR"><path d="M53 43 C60 33 78 12 92 14 C100 16 100 28 94 38 C88 48 70 52 53 48Z" fill="rgba(49,74,81,.18)" stroke="[[C3]]" stroke-width="1.4"/>
      <path d="M53 48 C66 56 84 64 92 60 C98 56 92 46 80 44 C68 42 58 46 53 48Z" fill="rgba(86,104,106,.14)" stroke="[[C3]]" stroke-width="1.1"/></g>
      <ellipse cx="50" cy="47" rx="2" ry="15" fill="[[C3]]" opacity=".8"/>
      <circle cx="50" cy="30" r="3.5" fill="[[C3]]" opacity=".85"/>
    </svg>
  </div>
</div>`,
css:`.bf-wrap-anim .bf-wL{transform-origin:100% 50%;animation:flapL var(--speed,1.8s) cubic-bezier(.45,0,.55,1) infinite alternate}
.bf-wrap-anim .bf-wR{transform-origin:0% 50%;animation:flapR var(--speed,1.8s) cubic-bezier(.45,0,.55,1) infinite alternate}
@keyframes flapL{from{transform:perspective(400px) rotateY(0deg)}to{transform:perspective(400px) rotateY(-62deg)}}
@keyframes flapR{from{transform:perspective(400px) rotateY(0deg)}to{transform:perspective(400px) rotateY(62deg)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`,js:''},

'boho-arch':{name:'Rainbow Arch',tag:'Boho',
html:`<svg width="[[SZ]]" height="[[SZ]]" viewBox="0 0 60 54" fill="none">
  <path d="M4 50 Q4 4 30 4 Q56 4 56 50" stroke="[[C2]]" stroke-width="1.2" fill="none"/>
  <path d="M10 50 Q10 12 30 12 Q50 12 50 50" stroke="rgba(181,161,158,.6)" stroke-width=".9" fill="none"/>
  <path d="M16 50 Q16 20 30 20 Q44 20 44 50" stroke="rgba(181,161,158,.4)" stroke-width=".7" fill="none"/>
  <path d="M22 50 Q22 28 30 28 Q38 28 38 50" stroke="rgba(181,161,158,.25)" stroke-width=".6" fill="none"/>
</svg>`,css:'',js:''},

'boho-oval':{name:'Oval Frame',tag:'Boho',
html:`<svg width="[[SZ]]" height="[[SZ]]" viewBox="0 0 52 68" fill="none">
  <ellipse cx="26" cy="36" rx="22" ry="30" fill="none" stroke="[[C2]]" stroke-width="1.2"/>
  <ellipse cx="26" cy="36" rx="16" ry="24" fill="none" stroke="rgba(181,161,158,.5)" stroke-width=".8" stroke-dasharray="3 4"/>
  <circle cx="26" cy="36" r="2" fill="[[C1]]" opacity=".4"/>
  <circle cx="26" cy="8" r="1.5" fill="[[C2]]" opacity=".6"/>
</svg>`,css:'',js:''},

'boho-orbit':{name:'Orbit Sphere',tag:'Boho',
html:`<svg style="animation:rotCW 8s linear infinite" width="[[SZ]]" height="[[SZ]]" viewBox="0 0 54 54" fill="none">
  <ellipse cx="27" cy="27" rx="24" ry="10" fill="none" stroke="[[C2]]" stroke-width="1"/>
  <ellipse cx="27" cy="27" rx="24" ry="10" fill="none" stroke="rgba(181,161,158,.5)" stroke-width=".8" transform="rotate(60 27 27)"/>
  <ellipse cx="27" cy="27" rx="24" ry="10" fill="none" stroke="rgba(181,161,158,.3)" stroke-width=".7" transform="rotate(120 27 27)"/>
  <circle cx="27" cy="27" r="3" fill="none" stroke="[[C1]]" stroke-width=".9"/>
</svg>`,css:`@keyframes rotCW{to{transform:rotate(360deg)}}`,js:''},

'boho-vesica':{name:'Vesica / Mandorla',tag:'Boho',
html:`<svg width="[[SZ]]" height="[[SZ]]" viewBox="0 0 56 56" fill="none">
  <path d="M28 4 C28 4 50 28 28 52 C6 28 28 4 28 4Z" fill="none" stroke="[[C2]]" stroke-width="1.1"/>
  <path d="M4 28 C4 28 28 50 52 28 C28 6 4 28 4 28Z" fill="none" stroke="rgba(181,161,158,.5)" stroke-width=".9"/>
  <circle cx="28" cy="28" r="4" fill="none" stroke="[[C1]]" stroke-width=".8"/>
  <circle cx="28" cy="28" r="1.5" fill="[[C1]]" opacity=".5"/>
</svg>`,css:'',js:''},

'boho-spiral':{name:'Spirale Shell',tag:'Boho',
html:`<svg width="[[SZ]]" height="[[SZ]]" viewBox="0 0 60 60" fill="none">
  <path d="M30 4 Q52 4 52 28 Q52 52 28 52 Q4 52 4 28 Q4 10 20 6 Q36 2 44 14 Q52 26 40 38 Q28 50 16 42 Q4 34 12 22 Q20 10 32 14 Q44 18 44 28" stroke="[[C2]]" stroke-width="1" fill="none"/>
</svg>`,css:'',js:''},

'boho-starburst':{name:'Starburst',tag:'Boho',
html:`<svg style="animation:rotCW 25s linear infinite" width="[[SZ]]" height="[[SZ]]" viewBox="0 0 58 58" fill="none">
  <path d="M29 2 L32 20 L46 8 L36 22 L55 22 L38 29 L55 36 L36 36 L46 50 L32 38 L29 56 L26 38 L12 50 L22 36 L3 36 L20 29 L3 22 L22 22 L12 8 L26 20Z" fill="none" stroke="rgba(181,161,158,.45)" stroke-width="1" stroke-linejoin="round"/>
  <circle cx="29" cy="29" r="4" fill="none" stroke="[[C1]]" stroke-width=".8"/>
</svg>`,css:`@keyframes rotCW{to{transform:rotate(360deg)}}`,js:''},

'boho-wave':{name:'Triple Wave',tag:'Boho',
html:`<svg width="[[SZ]]" height="40" viewBox="0 0 [[SZ]] 28" fill="none">
  <path d="M0 8 Q8 2 16 8 Q24 14 32 8 Q40 2 48 8 Q56 14 64 8" stroke="[[C2]]" stroke-width="1.1" fill="none"/>
  <path d="M0 16 Q8 10 16 16 Q24 22 32 16 Q40 10 48 16 Q56 22 64 16" stroke="rgba(181,161,158,.5)" stroke-width=".8" fill="none"/>
  <path d="M0 24 Q8 18 16 24 Q24 30 32 24 Q40 18 48 24 Q56 30 64 24" stroke="rgba(181,161,158,.25)" stroke-width=".6" fill="none"/>
</svg>`,css:'',js:''},

'fl-peony':{name:'Pfingstrose',tag:'Floral',
html:`<svg width="44" height="[[SZ]]" viewBox="0 0 44 80" fill="none" style="animation:float 4s ease-in-out infinite">
  <line x1="22" y1="80" x2="22" y2="50" stroke="[[C2]]" stroke-width="1"/>
  <path d="M22 50 Q16 45 14 36 Q18 38 22 44 Q26 38 30 36 Q28 45 22 50Z" fill="none" stroke="[[C1]]" stroke-width="1.1"/>
  <path d="M22 44 Q14 38 12 28 Q18 32 22 38 Q26 32 32 28 Q30 38 22 44Z" fill="none" stroke="[[C1]]" stroke-width="1"/>
  <path d="M22 38 Q13 30 12 18 Q18 24 22 30 Q26 24 32 18 Q31 30 22 38Z" fill="none" stroke="rgba(110,59,73,.6)" stroke-width=".9"/>
  <ellipse cx="22" cy="16" rx="6" ry="8" fill="none" stroke="[[C2]]" stroke-width=".8"/>
  <path d="M22 60 Q12 56 10 48" fill="none" stroke="#56686A" stroke-width=".9"/>
  <path d="M22 60 Q32 56 34 48" fill="none" stroke="#56686A" stroke-width=".9"/>
</svg>`,css:`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`,js:''},

'fl-tulip':{name:'Tulpe',tag:'Floral',
html:`<svg width="50" height="[[SZ]]" viewBox="0 0 50 86" fill="none" style="animation:float 5s ease-in-out infinite">
  <line x1="25" y1="86" x2="25" y2="56" stroke="[[C2]]" stroke-width="1.1"/>
  <path d="M25 56 C16 50 10 38 14 28 C18 18 24 14 25 14 C26 14 32 18 36 28 C40 38 34 50 25 56Z" fill="none" stroke="[[C1]]" stroke-width="1.3"/>
  <path d="M25 70 Q12 66 8 55 Q16 56 25 64Z" fill="none" stroke="#56686A" stroke-width=".9"/>
  <path d="M25 64 Q38 60 42 48 Q34 52 25 60Z" fill="none" stroke="#56686A" stroke-width=".9"/>
</svg>`,css:`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`,js:''},

'fl-lily':{name:'Lilie',tag:'Floral',
html:`<svg width="60" height="[[SZ]]" viewBox="0 0 60 90" fill="none" style="animation:float 4.5s ease-in-out infinite">
  <line x1="30" y1="90" x2="30" y2="60" stroke="[[C2]]" stroke-width="1.1"/>
  <path d="M30 60 Q18 48 12 35 Q20 38 28 50 Q30 55 30 60Z" fill="none" stroke="[[C1]]" stroke-width="1.2"/>
  <path d="M30 60 Q42 48 48 35 Q40 38 32 50 Q30 55 30 60Z" fill="none" stroke="[[C1]]" stroke-width="1.2"/>
  <path d="M30 60 Q14 54 10 40 Q20 44 28 54Z" fill="none" stroke="rgba(110,59,73,.5)" stroke-width="1"/>
  <path d="M30 60 Q46 54 50 40 Q40 44 32 54Z" fill="none" stroke="rgba(110,59,73,.5)" stroke-width="1"/>
  <circle cx="30" cy="30" r="3" fill="[[C1]]" opacity=".3"/>
  <path d="M30 75 Q18 72 14 62" stroke="#56686A" stroke-width=".9" fill="none"/>
  <path d="M30 68 Q42 65 46 55" stroke="#56686A" stroke-width=".9" fill="none"/>
</svg>`,css:`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`,js:''},

'fl-sprig':{name:'Botanischer Sprig',tag:'Floral',
html:`<svg width="[[SZ]]" height="[[SZ]]" viewBox="0 0 70 90" fill="none" style="animation:float 5s ease-in-out infinite">
  <path d="M35 90 Q32 70 30 50 Q28 30 32 12" stroke="[[C2]]" stroke-width="1.1" fill="none"/>
  <circle cx="32" cy="12" r="4" fill="none" stroke="[[C1]]" stroke-width="1"/>
  <circle cx="24" cy="22" r="3" fill="none" stroke="rgba(110,59,73,.5)" stroke-width=".9"/>
  <path d="M30 22 L24 22" stroke="[[C2]]" stroke-width=".7"/>
  <path d="M30 42 Q18 38 16 28 Q22 32 30 40Z" fill="none" stroke="#56686A" stroke-width=".9"/>
  <path d="M31 52 Q44 48 46 38 Q40 42 31 50Z" fill="none" stroke="#56686A" stroke-width=".9"/>
</svg>`,css:`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`,js:''},

'fl-wreath':{name:'Blätterkranz',tag:'Floral',
html:`<svg width="[[SZ]]" height="[[SZ]]" viewBox="0 0 68 68" fill="none">
  <circle cx="34" cy="34" r="28" fill="none" stroke="rgba(181,161,158,.2)" stroke-width=".6"/>
  <path d="M34 6 Q30 12 34 18 Q38 12 34 6Z" fill="none" stroke="#56686A" stroke-width=".9"/>
  <path d="M34 6 Q30 12 34 18 Q38 12 34 6Z" fill="none" stroke="#56686A" stroke-width=".9" transform="rotate(45 34 34)"/>
  <path d="M34 6 Q30 12 34 18 Q38 12 34 6Z" fill="none" stroke="#56686A" stroke-width=".9" transform="rotate(90 34 34)"/>
  <path d="M34 6 Q30 12 34 18 Q38 12 34 6Z" fill="none" stroke="#56686A" stroke-width=".9" transform="rotate(135 34 34)"/>
  <path d="M34 6 Q30 12 34 18 Q38 12 34 6Z" fill="none" stroke="#56686A" stroke-width=".9" transform="rotate(180 34 34)"/>
  <path d="M34 6 Q30 12 34 18 Q38 12 34 6Z" fill="none" stroke="#56686A" stroke-width=".9" transform="rotate(225 34 34)"/>
  <path d="M34 6 Q30 12 34 18 Q38 12 34 6Z" fill="none" stroke="#56686A" stroke-width=".9" transform="rotate(270 34 34)"/>
  <path d="M34 6 Q30 12 34 18 Q38 12 34 6Z" fill="none" stroke="#56686A" stroke-width=".9" transform="rotate(315 34 34)"/>
  <circle cx="34" cy="34" r="8" fill="none" stroke="[[C1]]" stroke-width=".9"/>
</svg>`,css:'',js:''},

'fl-rose':{name:'Rose',tag:'Floral',
html:`<svg width="[[SZ]]" height="[[SZ]]" viewBox="0 0 66 82" fill="none" style="animation:float 5s ease-in-out infinite">
  <line x1="33" y1="82" x2="33" y2="58" stroke="[[C2]]" stroke-width="1.1"/>
  <path d="M33 54 C20 50 14 40 16 30 C18 20 26 14 33 14 C40 14 48 20 50 30 C52 40 46 50 33 54Z" fill="none" stroke="[[C1]]" stroke-width="1.3"/>
  <path d="M33 50 C22 46 18 38 20 30 C22 22 28 18 33 18 C38 18 44 22 46 30 C48 38 44 46 33 50Z" fill="none" stroke="rgba(110,59,73,.55)" stroke-width="1"/>
  <path d="M33 58 Q20 54 18 44 Q26 48 33 56Z" fill="none" stroke="#56686A" stroke-width="1"/>
  <path d="M33 62 Q46 58 48 48 Q40 52 33 60Z" fill="none" stroke="#56686A" stroke-width="1"/>
</svg>`,css:`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`,js:''},

'fl-wildblume':{name:'Wildblume',tag:'Floral',
html:`<svg width="56" height="[[SZ]]" viewBox="0 0 56 80" fill="none" style="animation:float 4s ease-in-out infinite">
  <line x1="28" y1="80" x2="28" y2="44" stroke="[[C2]]" stroke-width="1"/>
  <ellipse cx="28" cy="26" rx="5" ry="14" fill="none" stroke="[[C2]]" stroke-width="1.1"/>
  <ellipse cx="28" cy="26" rx="5" ry="14" fill="none" stroke="[[C2]]" stroke-width="1.1" transform="rotate(45 28 26)"/>
  <ellipse cx="28" cy="26" rx="5" ry="14" fill="none" stroke="[[C2]]" stroke-width="1.1" transform="rotate(90 28 26)"/>
  <ellipse cx="28" cy="26" rx="5" ry="14" fill="none" stroke="[[C2]]" stroke-width="1.1" transform="rotate(135 28 26)"/>
  <circle cx="28" cy="26" r="6" fill="none" stroke="[[C1]]" stroke-width="1"/>
  <circle cx="28" cy="26" r="3" fill="[[C1]]" opacity=".3"/>
</svg>`,css:`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`,js:''},

'fl-chrys':{name:'Chrysantheme',tag:'Floral',
html:`<svg style="animation:rotCW 30s linear infinite" width="[[SZ]]" height="[[SZ]]" viewBox="0 0 52 52" fill="none">
  <ellipse cx="26" cy="26" rx="5" ry="18" fill="none" stroke="rgba(181,161,158,.6)" stroke-width="1.1"/>
  <ellipse cx="26" cy="26" rx="5" ry="18" fill="none" stroke="rgba(181,161,158,.6)" stroke-width="1.1" transform="rotate(30 26 26)"/>
  <ellipse cx="26" cy="26" rx="5" ry="18" fill="none" stroke="rgba(181,161,158,.6)" stroke-width="1.1" transform="rotate(60 26 26)"/>
  <ellipse cx="26" cy="26" rx="5" ry="18" fill="none" stroke="rgba(181,161,158,.6)" stroke-width="1.1" transform="rotate(90 26 26)"/>
  <ellipse cx="26" cy="26" rx="5" ry="18" fill="none" stroke="rgba(181,161,158,.6)" stroke-width="1.1" transform="rotate(120 26 26)"/>
  <ellipse cx="26" cy="26" rx="5" ry="18" fill="none" stroke="rgba(181,161,158,.6)" stroke-width="1.1" transform="rotate(150 26 26)"/>
  <circle cx="26" cy="26" r="5" fill="none" stroke="[[C1]]" stroke-width=".9"/>
</svg>`,css:`@keyframes rotCW{to{transform:rotate(360deg)}}`,js:''},

'fl-branch':{name:'Horizontalzweig',tag:'Floral',
html:`<svg width="[[SZ]]" height="56" viewBox="0 0 80 56" fill="none">
  <path d="M4 36 Q20 28 40 30 Q60 32 76 24" stroke="[[C2]]" stroke-width="1.1" fill="none"/>
  <path d="M16 32 Q12 22 18 16 Q20 24 16 32Z" fill="none" stroke="#56686A" stroke-width=".9"/>
  <path d="M28 30 Q30 18 36 14 Q34 22 28 30Z" fill="none" stroke="#56686A" stroke-width=".9"/>
  <circle cx="22" cy="44" r="3" fill="none" stroke="[[C1]]" stroke-width=".9"/>
</svg>`,css:'',js:''},

'cel-sparkle':{name:'Sparkle Cluster',tag:'Celestial',
html:`<svg width="[[SZ]]" height="60" viewBox="0 0 70 60" fill="none">
  <path d="M35 4 L37 18 L50 20 L37 22 L35 36 L33 22 L20 20 L33 18Z" fill="[[C2]]" opacity=".8" style="animation:twinkle 2.2s ease-in-out infinite"/>
  <path d="M14 12 L15 20 L22 21 L15 22 L14 30 L13 22 L6 21 L13 20Z" fill="rgba(181,161,158,.5)" style="animation:twinkle 1.8s ease-in-out .4s infinite"/>
  <path d="M58 8 L59 14 L64 15 L59 16 L58 22 L57 16 L52 15 L57 14Z" fill="rgba(181,161,158,.4)" style="animation:twinkle 2.5s ease-in-out .9s infinite"/>
</svg>`,css:`@keyframes twinkle{0%,100%{opacity:.2;transform:scale(.7)}40%{opacity:1;transform:scale(1.1)}}`,js:''},

'cel-moon':{name:'Mondsichel',tag:'Celestial',
html:`<svg width="[[SZ]]" height="[[SZ]]" viewBox="0 0 56 56" fill="none" style="animation:moonrise 4s ease-in-out infinite">
  <circle cx="28" cy="28" r="22" fill="none" stroke="[[C2]]" stroke-width="1.2"/>
  <circle cx="36" cy="24" r="18" fill="#F5F0EA"/>
  <path d="M10 14 L11 18 L14 19 L11 20 L10 24 L9 20 L6 19 L9 18Z" fill="rgba(181,161,158,.45)"/>
</svg>`,css:`@keyframes moonrise{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-6px) rotate(2deg)}}`,js:''},

'cel-phases':{name:'Mondphasen',tag:'Celestial',
html:`<svg width="[[SZ]]" height="24" viewBox="0 0 90 24" fill="none">
  <circle cx="12" cy="12" r="9" fill="none" stroke="[[C2]]" stroke-width="1"/>
  <circle cx="36" cy="12" r="9" fill="none" stroke="[[C2]]" stroke-width="1"/>
  <circle cx="40" cy="12" r="8" fill="#F5F0EA"/>
  <circle cx="60" cy="12" r="9" fill="none" stroke="[[C2]]" stroke-width="1"/>
  <rect x="60" y="3" width="9" height="18" fill="#F5F0EA"/>
  <circle cx="84" cy="12" r="8" fill="none" stroke="rgba(181,161,158,.5)" stroke-width="1"/>
</svg>`,css:'',js:''},

'cel-sun':{name:'Sunburst',tag:'Celestial',
html:`<svg width="[[SZ]]" height="[[SZ]]" viewBox="0 0 58 58" fill="none">
  <circle cx="29" cy="29" r="8" fill="rgba(181,161,158,.2)" stroke="[[C2]]" stroke-width="1"/>
  <line x1="29" y1="4" x2="29" y2="18" stroke="[[C2]]" stroke-width="1" stroke-linecap="round"/>
  <line x1="29" y1="40" x2="29" y2="54" stroke="[[C2]]" stroke-width="1" stroke-linecap="round"/>
  <line x1="4" y1="29" x2="18" y2="29" stroke="[[C2]]" stroke-width="1" stroke-linecap="round"/>
  <line x1="40" y1="29" x2="54" y2="29" stroke="[[C2]]" stroke-width="1" stroke-linecap="round"/>
  <line x1="12" y1="12" x2="22" y2="22" stroke="rgba(181,161,158,.6)" stroke-width=".9" stroke-linecap="round"/>
  <line x1="36" y1="36" x2="46" y2="46" stroke="rgba(181,161,158,.6)" stroke-width=".9" stroke-linecap="round"/>
  <line x1="46" y1="12" x2="36" y2="22" stroke="rgba(181,161,158,.6)" stroke-width=".9" stroke-linecap="round"/>
  <line x1="12" y1="46" x2="22" y2="36" stroke="rgba(181,161,158,.6)" stroke-width=".9" stroke-linecap="round"/>
</svg>`,css:'',js:''},

'cel-diamond':{name:'Diamant',tag:'Celestial',
html:`<svg width="44" height="[[SZ]]" viewBox="0 0 44 52" fill="none" style="animation:pulse 3s ease-in-out infinite">
  <path d="M22 4 L40 20 L22 48 L4 20Z" fill="none" stroke="[[C2]]" stroke-width="1.2"/>
  <path d="M4 20 L22 4 L40 20" fill="none" stroke="rgba(181,161,158,.4)" stroke-width=".8"/>
  <line x1="4" y1="20" x2="40" y2="20" stroke="rgba(181,161,158,.3)" stroke-width=".7"/>
</svg>`,css:`@keyframes pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}`,js:''},

'cel-star':{name:'4-Point Star',tag:'Celestial',
html:`<svg width="[[SZ]]" height="[[SZ]]" viewBox="0 0 56 56" fill="none">
  <path d="M28 2 L30.5 22 L50 24 L30.5 26 L28 46 L25.5 26 L6 24 L25.5 22Z" fill="[[C1]]" opacity=".25" style="animation:twinkle 3s ease-in-out infinite"/>
  <path d="M28 6 L30 22 L44 24 L30 26 L28 42 L26 26 L12 24 L26 22Z" fill="none" stroke="[[C2]]" stroke-width="1"/>
</svg>`,css:`@keyframes twinkle{0%,100%{opacity:.2;transform:scale(.7)}40%{opacity:1;transform:scale(1.1)}}`,js:''},

'cel-eye':{name:'Boho Eye',tag:'Celestial',
html:`<svg width="[[SZ]]" height="40" viewBox="0 0 64 40" fill="none">
  <path d="M4 20 Q20 4 32 4 Q44 4 60 20 Q44 36 32 36 Q20 36 4 20Z" fill="none" stroke="[[C2]]" stroke-width="1.1"/>
  <circle cx="32" cy="20" r="10" fill="none" stroke="[[C3]]" stroke-width="1" style="transform-origin:32px 20px;animation:blink 5s ease-in-out infinite"/>
  <circle cx="32" cy="20" r="6" fill="rgba(49,74,81,.15)"/>
  <circle cx="32" cy="20" r="3" fill="[[C3]]" opacity=".5"/>
</svg>`,css:`@keyframes blink{0%,90%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}`,js:''},

'cel-constellation':{name:'Konstellation',tag:'Celestial',
html:`<svg width="[[SZ]]" height="64" viewBox="0 0 74 64" fill="none">
  <circle cx="20" cy="14" r="2.5" fill="[[C2]]" opacity=".6"/>
  <circle cx="42" cy="8" r="3" fill="[[C2]]" opacity=".7"/>
  <circle cx="58" cy="22" r="2" fill="rgba(181,161,158,.5)"/>
  <circle cx="50" cy="40" r="2.5" fill="[[C2]]" opacity=".6"/>
  <circle cx="28" cy="50" r="2" fill="rgba(181,161,158,.45)"/>
  <circle cx="10" cy="38" r="1.8" fill="rgba(181,161,158,.4)"/>
  <line x1="20" y1="14" x2="42" y2="8" stroke="rgba(181,161,158,.25)" stroke-width=".6" stroke-dasharray="2 3"/>
  <line x1="42" y1="8" x2="58" y2="22" stroke="rgba(181,161,158,.25)" stroke-width=".6" stroke-dasharray="2 3"/>
  <line x1="58" y1="22" x2="50" y2="40" stroke="rgba(181,161,158,.25)" stroke-width=".6" stroke-dasharray="2 3"/>
  <line x1="50" y1="40" x2="28" y2="50" stroke="rgba(181,161,158,.25)" stroke-width=".6" stroke-dasharray="2 3"/>
</svg>`,css:'',js:''},

'tf-circle':{name:'Kreistext',tag:'Text',
html:`<svg width="[[SZ]]" height="[[SZ]]" viewBox="0 0 100 100" style="animation:rotCW 18s linear infinite">
  <path id="c1" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" fill="none"/>
  <text font-size="6" letter-spacing="3" fill="[[C1]]" font-family="Outfit,sans-serif" text-transform="uppercase">
    <textPath href="#c1">[[T]] · [[T2]] · </textPath>
  </text>
</svg>`,css:`@keyframes rotCW{to{transform:rotate(360deg)}}`,js:''},

'tf-vertical':{name:'Vertical Italic',tag:'Text',
html:`<span style="writing-mode:vertical-rl;transform:rotate(180deg);font-family:'Cormorant Garamond',serif;font-style:italic;font-size:12px;letter-spacing:.15em;color:rgba(181,161,158,.6);display:inline-block">[[T]] · [[T2]]</span>`,css:'',js:''},

'tf-marquee':{name:'Marquee',tag:'Text',
html:`<div style="overflow:hidden;white-space:nowrap;max-width:260px">
  <div style="display:inline-flex;animation:waveFlow 10s linear infinite">
    <span style="font-size:8px;letter-spacing:.3em;text-transform:uppercase;color:rgba(181,161,158,.5);padding:0 16px">[[T]] <span style="color:[[C1]]">✦</span></span>
    <span style="font-size:8px;letter-spacing:.3em;text-transform:uppercase;color:rgba(181,161,158,.5);padding:0 16px">[[T2]] <span style="color:[[C1]]">✦</span></span>
    <span style="font-size:8px;letter-spacing:.3em;text-transform:uppercase;color:rgba(181,161,158,.5);padding:0 16px">[[T]] <span style="color:[[C1]]">✦</span></span>
    <span style="font-size:8px;letter-spacing:.3em;text-transform:uppercase;color:rgba(181,161,158,.5);padding:0 16px">[[T2]] <span style="color:[[C1]]">✦</span></span>
  </div>
</div>`,css:`@keyframes waveFlow{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`,js:''},

'tf-micro':{name:'Micro Labels',tag:'Text',
html:`<div style="display:flex;flex-direction:column;gap:8px;align-items:center">
  <div style="font-size:7px;letter-spacing:.35em;text-transform:uppercase;color:rgba(181,161,158,.45);display:flex;align-items:center;gap:8px">
    <span style="display:block;width:16px;height:1px;background:rgba(181,161,158,.3)"></span>[[T]]<span style="display:block;width:16px;height:1px;background:rgba(181,161,158,.3)"></span></div>
  <div style="font-size:7px;letter-spacing:.35em;text-transform:uppercase;color:rgba(181,161,158,.45);display:flex;align-items:center;gap:8px">
    <span style="display:block;width:16px;height:1px;background:rgba(181,161,158,.3)"></span>[[T2]]<span style="display:block;width:16px;height:1px;background:rgba(181,161,158,.3)"></span></div>
</div>`,css:'',js:''},

'tf-ghost':{name:'Ghost Number',tag:'Text',
html:`<div style="font-family:'Cormorant Garamond',serif;font-size:[[SZ]]px;line-height:1;color:rgba(181,161,158,.15);letter-spacing:-.02em;font-weight:300">[[T]]</div>`,css:'',js:''},

'tf-arch':{name:'Arch Curved Text',tag:'Text',
html:`<svg width="[[SZ]]" height="56" viewBox="0 0 110 56">
  <path id="ap" d="M10 50 Q55 5 100 50" fill="none"/>
  <text fill="rgba(110,59,73,.5)" font-family="Cormorant Garamond,serif" font-style="italic" font-size="9.5" letter-spacing="3">
    <textPath href="#ap" startOffset="50%" text-anchor="middle">[[T]]</textPath>
  </text>
</svg>`,css:'',js:''},

'tf-badge':{name:'Status Badge',tag:'Text',
html:`<div style="display:flex;flex-direction:column;align-items:center;gap:6px">
  <div style="display:flex;align-items:center;gap:5px">
    <div style="width:5px;height:5px;border-radius:50%;background:#56686A;animation:pulse 2s ease-in-out infinite"></div>
    <span style="font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:#56686A;font-family:inherit">[[T]]</span>
  </div>
  <div style="font-size:7px;letter-spacing:.18em;text-transform:uppercase;color:rgba(181,161,158,.5);font-family:inherit">[[T2]]</div>
</div>`,css:`@keyframes pulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}`,js:''},

'geo-squares':{name:'Nested Squares',tag:'Geo',
html:`<svg width="[[SZ]]" height="[[SZ]]" viewBox="0 0 60 60" fill="none">
  <rect x="10" y="10" width="40" height="40" fill="none" stroke="rgba(181,161,158,.4)" stroke-width=".8" transform="rotate(0 30 30)"/>
  <rect x="15" y="15" width="30" height="30" fill="none" stroke="rgba(181,161,158,.35)" stroke-width=".7" transform="rotate(15 30 30)"/>
  <rect x="20" y="20" width="20" height="20" fill="none" stroke="rgba(181,161,158,.3)" stroke-width=".7" transform="rotate(30 30 30)"/>
  <rect x="25" y="25" width="10" height="10" fill="none" stroke="[[C1]]" stroke-width=".8" transform="rotate(45 30 30)"/>
</svg>`,css:'',js:''},

'geo-dots':{name:'Dot Grid',tag:'Geo',
html:`<svg width="[[SZ]]" height="[[SZ]]" viewBox="0 0 60 60" fill="none">
  <circle cx="12" cy="12" r="1.5" fill="rgba(181,161,158,.4)"/><circle cx="24" cy="12" r="1.5" fill="rgba(181,161,158,.4)"/>
  <circle cx="36" cy="12" r="1.5" fill="rgba(181,161,158,.4)"/><circle cx="48" cy="12" r="1.5" fill="rgba(181,161,158,.4)"/>
  <circle cx="12" cy="24" r="1.5" fill="rgba(181,161,158,.4)"/><circle cx="24" cy="24" r="2" fill="[[C1]]" opacity=".4"/>
  <circle cx="36" cy="24" r="1.5" fill="rgba(181,161,158,.4)"/><circle cx="48" cy="24" r="1.5" fill="rgba(181,161,158,.4)"/>
  <circle cx="12" cy="36" r="1.5" fill="rgba(181,161,158,.4)"/><circle cx="24" cy="36" r="1.5" fill="rgba(181,161,158,.4)"/>
  <circle cx="36" cy="36" r="2" fill="[[C2]]" opacity=".5"/><circle cx="48" cy="36" r="1.5" fill="rgba(181,161,158,.4)"/>
  <circle cx="12" cy="48" r="1.5" fill="rgba(181,161,158,.4)"/><circle cx="24" cy="48" r="1.5" fill="rgba(181,161,158,.4)"/>
  <circle cx="36" cy="48" r="1.5" fill="rgba(181,161,158,.4)"/><circle cx="48" cy="48" r="2" fill="#56686A" opacity=".4"/>
</svg>`,css:'',js:''},

'geo-hex':{name:'Hexagon',tag:'Geo',
html:`<svg width="[[SZ]]" height="[[SZ]]" viewBox="0 0 60 60" fill="none">
  <path d="M30 4 L52 17 L52 43 L30 56 L8 43 L8 17Z" fill="none" stroke="[[C2]]" stroke-width="1.1"/>
  <path d="M30 12 L46 21 L46 39 L30 48 L14 39 L14 21Z" fill="none" stroke="rgba(181,161,158,.4)" stroke-width=".7"/>
  <circle cx="30" cy="30" r="6" fill="none" stroke="[[C1]]" stroke-width=".8"/>
</svg>`,css:'',js:''},

'geo-infinity':{name:'Infinity',tag:'Geo',
html:`<svg width="[[SZ]]" height="28" viewBox="0 0 64 28" fill="none">
  <path d="M32 14 C32 14 20 2 12 6 C4 10 4 18 12 22 C20 26 32 14 32 14 C32 14 44 2 52 6 C60 10 60 18 52 22 C44 26 32 14 32 14Z" fill="none" stroke="[[C2]]" stroke-width="1.1"/>
</svg>`,css:'',js:''},

'geo-cube':{name:'Cube Wireframe',tag:'Geo',
html:`<svg width="[[SZ]]" height="[[SZ]]" viewBox="0 0 60 60" fill="none">
  <rect x="16" y="20" width="28" height="24" fill="none" stroke="[[C2]]" stroke-width="1"/>
  <path d="M16 20 L24 12 L52 12 L44 20" fill="none" stroke="rgba(181,161,158,.5)" stroke-width=".8"/>
  <path d="M44 20 L52 12 L52 36 L44 44" fill="none" stroke="rgba(181,161,158,.4)" stroke-width=".8"/>
</svg>`,css:'',js:''},

'geo-lines':{name:'Line Stack',tag:'Geo',
html:`<svg width="[[SZ]]" height="40" viewBox="0 0 66 40" fill="none">
  <line x1="0" y1="4" x2="66" y2="4" stroke="rgba(181,161,158,.5)" stroke-width="1"/>
  <line x1="8" y1="12" x2="58" y2="12" stroke="rgba(181,161,158,.4)" stroke-width=".8"/>
  <line x1="0" y1="20" x2="66" y2="20" stroke="rgba(181,161,158,.3)" stroke-width=".6" stroke-dasharray="4 4"/>
  <line x1="12" y1="28" x2="54" y2="28" stroke="rgba(181,161,158,.25)" stroke-width=".6"/>
</svg>`,css:'',js:''},

'fr-arch':{name:'Arch Frame',tag:'Frame',
html:`<div style="position:relative;width:[[SZ]]px;min-height:90px;display:flex;align-items:center;justify-content:center">
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 120 90" fill="none" preserveAspectRatio="none">
    <path d="M6 84 L6 22 Q6 6 20 6 L100 6 Q114 6 114 22 L114 84" stroke="[[C2]]" stroke-width="1.1" fill="none"/>
    <circle cx="6" cy="84" r="2" fill="[[C2]]" opacity=".5"/>
    <circle cx="114" cy="84" r="2" fill="[[C2]]" opacity=".5"/>
  </svg>
  <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:13px;color:[[C3]];text-align:center;z-index:1">[[T]]<br><span style="font-size:9px;font-family:Outfit,sans-serif;font-style:normal;letter-spacing:.2em;text-transform:uppercase;color:[[C2]]">[[T2]]</span></div>
</div>`,css:'',js:''},

'fr-corner':{name:'Corner Frame',tag:'Frame',
html:`<div style="position:relative;width:[[SZ]]px;min-height:70px;display:flex;align-items:center;justify-content:center">
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 130 70" fill="none" preserveAspectRatio="none">
    <rect x="3" y="3" width="124" height="64" fill="none" stroke="rgba(181,161,158,.25)" stroke-width="1"/>
    <path d="M3 18 L3 3 L18 3" fill="none" stroke="[[C1]]" stroke-width="1.2"/>
    <path d="M112 3 L127 3 L127 18" fill="none" stroke="[[C1]]" stroke-width="1.2"/>
    <path d="M3 52 L3 67 L18 67" fill="none" stroke="[[C1]]" stroke-width="1.2"/>
    <path d="M112 67 L127 67 L127 52" fill="none" stroke="[[C1]]" stroke-width="1.2"/>
  </svg>
  <div style="font-size:8px;letter-spacing:.28em;text-transform:uppercase;color:[[C3]];z-index:1;font-family:inherit">[[T]]</div>
</div>`,css:'',js:''},

'fr-circle':{name:'Botanischer Kreisrahmen',tag:'Frame',
html:`<div style="position:relative;width:[[SZ]]px;height:[[SZ]]px;display:flex;align-items:center;justify-content:center">
  <svg style="position:absolute;inset:0" width="[[SZ]]" height="[[SZ]]" viewBox="0 0 130 130" fill="none">
    <circle cx="65" cy="65" r="58" fill="none" stroke="rgba(181,161,158,.3)" stroke-width="1"/>
    <circle cx="65" cy="65" r="50" fill="none" stroke="rgba(181,161,158,.15)" stroke-width=".5" stroke-dasharray="2 5"/>
    <path d="M65 8 Q62 14 65 20 Q68 14 65 8Z" fill="none" stroke="[[C2]]" stroke-width=".9"/>
    <path d="M65 8 Q62 14 65 20 Q68 14 65 8Z" fill="none" stroke="[[C2]]" stroke-width=".9" transform="rotate(90 65 65)"/>
  </svg>
  <div style="text-align:center;z-index:1">
    <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;color:[[C3]]">[[T]]</div>
    <div style="font-size:7px;letter-spacing:.25em;text-transform:uppercase;color:[[C2]];margin-top:2px;font-family:inherit">[[T2]]</div>
  </div>
</div>`,css:'',js:''},

'fr-badge':{name:'Dark Badge',tag:'Frame',
html:`<div style="background:[[C3]];padding:14px 22px;position:relative;display:inline-block">
  <div style="font-size:7.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(181,161,158,.6);margin-bottom:3px;font-family:inherit">[[T2]]</div>
  <div style="font-family:'Cormorant Garamond',serif;font-size:18px;color:rgba(245,245,245,.85);letter-spacing:.06em">[[T]]</div>
</div>`,css:'',js:''},

'fr-stamp':{name:'Seal / Stamp',tag:'Frame',
html:`<div style="position:relative;width:[[SZ]]px;height:[[SZ]]px;display:flex;align-items:center;justify-content:center">
  <svg style="position:absolute;inset:0;animation:rotCW 30s linear infinite" width="[[SZ]]" height="[[SZ]]" viewBox="0 0 90 90" fill="none">
    <path d="M45 4 Q52 0 58 4 Q64 0 70 4 Q76 2 80 8 Q86 10 86 18 Q90 22 88 28 Q92 34 88 40 Q90 46 86 52 Q88 58 82 62 Q82 68 76 72 Q74 78 68 80 Q64 86 58 86 Q52 90 46 88 Q40 92 34 88 Q28 90 24 84 Q18 84 14 78 Q8 76 8 70 Q2 66 4 60 Q0 54 4 48 Q2 42 6 36 Q2 30 6 24 Q6 18 12 14 Q12 8 18 6 Q22 0 28 2 Q34 -2 40 2Z" fill="none" stroke="rgba(181,161,158,.35)" stroke-width=".8"/>
  </svg>
  <div style="text-align:center;z-index:1">
    <div style="font-size:6.5px;letter-spacing:.22em;text-transform:uppercase;color:[[C2]];font-family:inherit">[[T2]]</div>
    <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:11px;color:[[C3]]">[[T]]</div>
  </div>
</div>`,css:`@keyframes rotCW{to{transform:rotate(360deg)}}`,js:''},

'fr-tag':{name:'Inline Category Tag',tag:'Frame',
html:`<div style="border:1px solid rgba(181,161,158,.25);padding:12px 20px;display:inline-flex;align-items:center;gap:10px">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <ellipse cx="10" cy="10" rx="3" ry="8" fill="none" stroke="[[C1]]" stroke-width=".9"/>
    <ellipse cx="10" cy="10" rx="8" ry="3" fill="none" stroke="[[C1]]" stroke-width=".9"/>
  </svg>
  <div>
    <div style="font-size:7px;letter-spacing:.2em;text-transform:uppercase;color:[[C2]];font-family:inherit">[[T2]]</div>
    <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:14px;color:[[C3]]">[[T]]</div>
  </div>
</div>`,css:'',js:''},

'bg-classic':{name:'Burger Classic',tag:'Menu',
html:`<div onclick="this.classList.toggle('kh-open')" style="width:30px;height:22px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer" class="kh-bg1">
  <span></span><span></span><span></span>
</div>`,
css:`.kh-bg1 span{display:block;height:1px;background:#2D2020;transition:all .5s cubic-bezier(.23,1,.32,1);transform-origin:center}
.kh-bg1.kh-open span:nth-child(1){transform:translateY(10.5px) rotate(45deg)}
.kh-bg1.kh-open span:nth-child(2){opacity:0;transform:scaleX(0)}
.kh-bg1.kh-open span:nth-child(3){transform:translateY(-10.5px) rotate(-45deg)}`,
js:`// onclick="this.classList.toggle('kh-open')" ist bereits im HTML`},

'bg-stagger':{name:'Burger Stagger',tag:'Menu',
html:`<div onclick="this.classList.toggle('kh-open')" style="width:30px;height:22px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer" class="kh-bg2">
  <span></span><span></span><span></span>
</div>`,
css:`.kh-bg2 span{display:block;height:1px;background:#2D2020;transition:all .4s cubic-bezier(.23,1,.32,1)}
.kh-bg2 span:nth-child(1){width:100%}
.kh-bg2 span:nth-child(2){width:70%;margin-left:auto}
.kh-bg2 span:nth-child(3){width:40%;margin-left:auto}
.kh-bg2.kh-open span:nth-child(1){transform:translateY(10px) rotate(45deg);width:100%}
.kh-bg2.kh-open span:nth-child(2){opacity:0;width:0}
.kh-bg2.kh-open span:nth-child(3){transform:translateY(-10px) rotate(-45deg);width:100%}`,
js:`// onclick="this.classList.toggle('kh-open')" ist bereits im HTML`},

'bg-dots':{name:'Burger Dot Matrix',tag:'Menu',
html:`<div onclick="this.classList.toggle('kh-open')" style="width:28px;height:28px;display:grid;grid-template-columns:repeat(3,7px);grid-template-rows:repeat(3,7px);gap:3.5px;cursor:pointer" class="kh-bg3">
  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
</div>`,
css:`.kh-bg3 span{display:block;border-radius:50%;background:#2D2020;transition:all .5s cubic-bezier(.23,1,.32,1)}
.kh-bg3.kh-open span{background:[[C1]]}
.kh-bg3.kh-open span:nth-child(1){transform:translate(18px,18px)}
.kh-bg3.kh-open span:nth-child(3){transform:translate(-18px,18px)}
.kh-bg3.kh-open span:nth-child(7){transform:translate(18px,-18px)}
.kh-bg3.kh-open span:nth-child(9){transform:translate(-18px,-18px)}`,
js:`// onclick="this.classList.toggle('kh-open')" ist bereits im HTML`},

'bg-circle':{name:'Burger Morph Circle',tag:'Menu',
html:`<div onclick="this.classList.toggle('kh-open')" style="width:40px;height:40px;border-radius:50%;border:1px solid rgba(0,0,0,.15);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;cursor:pointer;position:relative" class="kh-bg4">
  <span style="display:block;width:16px;height:1px;background:#2D2020;transition:all .4s cubic-bezier(.23,1,.32,1)"></span>
  <span style="display:block;width:10px;height:1px;background:#2D2020;transition:all .4s cubic-bezier(.23,1,.32,1);margin-left:-6px"></span>
  <span style="display:block;width:16px;height:1px;background:#2D2020;transition:all .4s cubic-bezier(.23,1,.32,1)"></span>
</div>`,
css:`.kh-bg4.kh-open{border-color:[[C1]];background:rgba(110,59,73,.05)}
.kh-bg4.kh-open span:nth-child(1){transform:translateY(6px) rotate(45deg)}
.kh-bg4.kh-open span:nth-child(2){opacity:0;width:0}
.kh-bg4.kh-open span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}`,
js:`// onclick="this.classList.toggle('kh-open')" ist bereits im HTML`},

'btn-fill':{name:'Button Fill Reveal',tag:'Button',
html:`<button class="kh-btn-fill" style="padding:14px 40px;font-family:inherit">[[T]]</button>`,
css:`.kh-btn-fill{border:1px solid #2D2020;background:transparent;letter-spacing:.18em;text-transform:uppercase;font-size:11px;cursor:pointer;position:relative;overflow:hidden;transition:color .4s cubic-bezier(.23,1,.32,1)}
.kh-btn-fill::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:#2D2020;transition:left .4s cubic-bezier(.23,1,.32,1);z-index:-1}
.kh-btn-fill:hover::before{left:0}
.kh-btn-fill:hover{color:#fff}`,js:''},

'btn-burg':{name:'Button Burgundy',tag:'Button',
html:`<button class="kh-btn-burg" style="padding:14px 40px;font-family:inherit">[[T]]</button>`,
css:`.kh-btn-burg{border:1px solid [[C1]];background:transparent;letter-spacing:.18em;text-transform:uppercase;font-size:11px;cursor:pointer;position:relative;overflow:hidden;transition:color .4s cubic-bezier(.23,1,.32,1);color:[[C1]]}
.kh-btn-burg::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:[[C1]];transition:left .4s cubic-bezier(.23,1,.32,1);z-index:-1}
.kh-btn-burg:hover::before{left:0}
.kh-btn-burg:hover{color:#fff}`,js:''},

'btn-pill':{name:'Button Pill',tag:'Button',
html:`<button class="kh-btn-pill" style="padding:12px 36px;font-family:inherit">[[T]]</button>`,
css:`.kh-btn-pill{border:1px solid [[C1]];border-radius:999px;background:transparent;letter-spacing:.18em;text-transform:uppercase;font-size:11px;cursor:pointer;color:[[C1]];transition:all .35s cubic-bezier(.16,1,.3,1)}
.kh-btn-pill:hover{background:[[C1]];color:#fff;transform:translateY(-2px);box-shadow:0 8px 24px rgba(110,59,73,.2)}`,js:''},

'btn-ghost':{name:'Button Ghost Line',tag:'Button',
html:`<button class="kh-btn-ghost" style="padding:12px 36px;font-family:inherit">[[T]]</button>`,
css:`.kh-btn-ghost{background:transparent;border:none;letter-spacing:.22em;text-transform:uppercase;font-size:11px;cursor:pointer;color:#525252;position:relative}
.kh-btn-ghost::after{content:'';position:absolute;bottom:6px;left:36px;right:36px;height:1px;background:[[C1]];transform:scaleX(0);transition:transform .4s cubic-bezier(.16,1,.3,1)}
.kh-btn-ghost:hover::after{transform:scaleX(1)}
.kh-btn-ghost:hover{color:[[C1]]}`,js:''},

'btn-outline':{name:'Outline Slide Up',tag:'Button',
html:`<button class="kh-btn-up" style="padding:14px 40px;font-family:inherit">[[T]]</button>`,
css:`.kh-btn-up{border:1px solid [[C2]];background:transparent;letter-spacing:.18em;text-transform:uppercase;font-size:11px;cursor:pointer;color:#525252;position:relative;overflow:hidden;transition:color .4s}
.kh-btn-up::before{content:'';position:absolute;bottom:-100%;left:0;width:100%;height:100%;background:[[C1]];transition:bottom .4s cubic-bezier(.16,1,.3,1);z-index:-1}
.kh-btn-up:hover::before{bottom:0}
.kh-btn-up:hover{color:#fff;border-color:[[C1]]}`,js:''},

'sc-petal':{name:'Scroll Petal Drop',tag:'Scroll',
html:`<div style="display:flex;flex-direction:column;align-items:center;gap:0">
  <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:13px;letter-spacing:.12em;color:#525252;opacity:.7">[[T]]</span>
  <div style="width:1px;height:44px;background:linear-gradient(to bottom,[[C1]],transparent);position:relative">
    <div style="width:10px;height:14px;border:1px solid [[C1]];border-radius:50% 50% 40% 40%;position:absolute;bottom:-2px;left:50%;transform:translateX(-50%);animation:petalDrop 2.4s ease-in-out infinite"></div>
  </div>
</div>`,
css:`@keyframes petalDrop{0%,100%{transform:translateX(-50%) translateY(0);opacity:1}60%{transform:translateX(-50%) translateY(10px);opacity:.3}61%{transform:translateX(-50%) translateY(0);opacity:0}62%{opacity:1}}`,js:''},

'sc-cross':{name:'Scroll Crosshair',tag:'Scroll',
html:`<div style="position:relative;width:66px;height:66px;display:flex;align-items:center;justify-content:center">
  <div style="position:absolute;width:1px;height:100%;left:50%;background:rgba(181,161,158,.4)"></div>
  <div style="position:absolute;height:1px;width:100%;top:50%;background:rgba(181,161,158,.4)"></div>
  <div style="position:absolute;width:28px;height:28px;border:1px solid [[C1]];border-radius:50%;animation:expandRing 2s ease-out infinite"></div>
  <div style="width:6px;height:6px;background:[[C1]];border-radius:50%;z-index:1;animation:pulseDot 2s ease-in-out infinite"></div>
</div>`,
css:`@keyframes expandRing{0%{transform:scale(.3);opacity:.8}100%{transform:scale(1.4);opacity:0}}
@keyframes pulseDot{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}`,js:''},

'sc-rot':{name:'Scroll Rotating Text',tag:'Scroll',
html:`<div style="position:relative;width:80px;height:80px;display:flex;align-items:center;justify-content:center">
  <svg style="position:absolute;inset:0;width:100%;height:100%;animation:rotCW 18s linear infinite" viewBox="0 0 80 80">
    <path id="sc1" d="M40,40 m-30,0 a30,30 0 1,1 60,0 a30,30 0 1,1 -60,0" fill="none"/>
    <text font-size="6" letter-spacing="3" fill="[[C1]]" font-family="Outfit,sans-serif">
      <textPath href="#sc1">[[T]] · [[T]] · </textPath>
    </text>
  </svg>
  <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:11px;color:[[C1]];z-index:1;animation:rotCW 18s linear infinite reverse">↓</span>
</div>`,
css:`@keyframes rotCW{to{transform:rotate(360deg)}}`,js:''},

'sc-marq':{name:'Scroll Marquee',tag:'Scroll',
html:`<div style="overflow:hidden;width:130px">
  <div style="display:flex;gap:20px;animation:sc6move 4s linear infinite;white-space:nowrap">
    <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:12px;color:[[C2]];display:flex;align-items:center;gap:8px;flex-shrink:0">[[T]]<span style="font-style:normal;font-size:8px;color:[[C1]]">✦</span></span>
    <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:12px;color:[[C2]];display:flex;align-items:center;gap:8px;flex-shrink:0">[[T]]<span style="font-style:normal;font-size:8px;color:[[C1]]">✦</span></span>
    <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:12px;color:[[C2]];display:flex;align-items:center;gap:8px;flex-shrink:0">[[T]]<span style="font-style:normal;font-size:8px;color:[[C1]]">✦</span></span>
  </div>
  <div style="width:100%;height:1px;background:linear-gradient(90deg,transparent,[[C1]],transparent);margin-top:8px"></div>
</div>`,
css:`@keyframes sc6move{from{transform:translateX(0)}to{transform:translateX(-50%)}}`,js:''},

'sc-floral':{name:'Scroll Floral Dip',tag:'Scroll',
html:`<div style="display:flex;flex-direction:column;align-items:center;gap:4px">
  <span style="font-size:8.5px;letter-spacing:.28em;text-transform:uppercase;color:[[C2]];font-family:inherit">[[T]]</span>
  <svg width="40" height="50" viewBox="0 0 40 50" fill="none" style="animation:arrowBob 3s ease-in-out infinite">
    <line x1="20" y1="0" x2="20" y2="30" stroke="[[C1]]" stroke-width=".8"/>
    <ellipse cx="20" cy="35" rx="5" ry="8" fill="none" stroke="[[C1]]" stroke-width="1"/>
    <path d="M15 30 Q8 28 10 22 Q14 24 20 30Z" fill="none" stroke="rgba(181,161,158,.5)" stroke-width=".7"/>
    <path d="M25 30 Q32 28 30 22 Q26 24 20 30Z" fill="none" stroke="rgba(181,161,158,.5)" stroke-width=".7"/>
  </svg>
</div>`,
css:`@keyframes arrowBob{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}`,js:''},

'sc-bracket':{name:'Scroll Bracket Arrow',tag:'Scroll',
html:`<div style="display:flex;align-items:center;gap:8px">
  <div style="display:flex;flex-direction:column;justify-content:space-between;height:36px;width:8px">
    <span style="display:block;height:1px;width:100%;background:[[C1]]"></span>
    <span style="display:block;width:1px;height:100%;background:[[C1]]"></span>
    <span style="display:block;height:1px;width:100%;background:[[C1]]"></span>
  </div>
  <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:14px;color:[[C3]]">[[T]]</span>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="animation:arrowBob 1.8s ease-in-out infinite">
    <line x1="8" y1="2" x2="8" y2="14" stroke="[[C1]]" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M4 10 L8 14 L12 10" stroke="[[C1]]" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <div style="display:flex;flex-direction:column;justify-content:space-between;height:36px;width:8px;align-items:flex-end">
    <span style="display:block;height:1px;width:100%;background:[[C1]]"></span>
    <span style="display:block;width:1px;height:100%;background:[[C1]];margin-left:auto"></span>
    <span style="display:block;height:1px;width:100%;background:[[C1]]"></span>
  </div>
</div>`,
css:`@keyframes arrowBob{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}`,js:''},

'sc-quill':{name:'Scroll Quill',tag:'Scroll',
html:`<div style="display:flex;flex-direction:column;align-items:center;gap:6px">
  <span style="font-size:22px;color:[[C2]];animation:arrowBob 3s ease-in-out infinite;display:block">✦</span>
  <div style="width:1px;height:30px;background:linear-gradient(to bottom,[[C2]],transparent)"></div>
  <span style="font-size:8px;letter-spacing:.25em;text-transform:uppercase;color:[[C2]];font-family:inherit">[[T]]</span>
</div>`,
css:`@keyframes arrowBob{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}`,js:''},

'sc-rosette':{name:'Scroll Rosette',tag:'Scroll',
html:`<div style="width:72px;height:72px;position:relative;display:flex;align-items:center;justify-content:center">
  <svg style="width:100%;height:100%;animation:rotCW 22s linear infinite" viewBox="0 0 72 72" fill="none">
    <path id="rs1" d="M36,36 m-28,0 a28,28 0 1,1 56,0 a28,28 0 1,1 -56,0" fill="none"/>
    <text font-size="5.5" letter-spacing="3" fill="[[C1]]" font-family="Outfit,sans-serif">
      <textPath href="#rs1">[[T]] · </textPath>
    </text>
  </svg>
  <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:9px;color:[[C1]];text-align:center;z-index:1;animation:rotCW 22s linear infinite reverse">scroll</span>
</div>`,
css:`@keyframes rotCW{to{transform:rotate(360deg)}}`,js:''},

'sc-stack':{name:'Scroll Word Stack',tag:'Scroll',
html:`<div style="display:flex;flex-direction:column;align-items:center;gap:2px">
  <span style="font-family:'Cormorant Garamond',serif;font-size:10px;letter-spacing:.35em;text-transform:uppercase;color:#525252;opacity:.3">[[T2]]</span>
  <span style="font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:.35em;text-transform:uppercase;color:#525252;opacity:.6">[[T]]</span>
  <span style="font-family:'Cormorant Garamond',serif;font-size:14px;letter-spacing:.3em;text-transform:uppercase;color:[[C1]];opacity:.9">[[T]]</span>
  <span style="font-size:18px;color:[[C1]];animation:arrowBob 2s ease-in-out infinite;margin-top:4px">↓</span>
</div>`,
css:`@keyframes arrowBob{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}`,js:''},

'pn-luxe':{name:'Prev/Next Luxe Split',tag:'Nav',
html:`<div class="kh-pna" style="min-width:340px">
  <div class="kh-pna-side">
    <span class="kh-pna-dir">← Vorheriges</span>
    <span class="kh-pna-title">[[T3]]</span>
    <span class="kh-pna-arr">←</span>
  </div>
  <div style="width:1px;background:rgba(181,161,158,.2);display:flex;align-items:center;justify-content:center"><div style="width:5px;height:5px;background:[[C2]];border-radius:50%"></div></div>
  <div class="kh-pna-side kh-pna-right">
    <span class="kh-pna-dir">Nächstes →</span>
    <span class="kh-pna-title">[[T2]]</span>
    <span class="kh-pna-arr">→</span>
  </div>
</div>`,
css:`.kh-pna{display:grid;grid-template-columns:1fr auto 1fr;border:1px solid rgba(181,161,158,.2)}
.kh-pna-side{padding:20px 22px;display:flex;flex-direction:column;gap:5px;cursor:pointer;position:relative;overflow:hidden;transition:background .4s;background:#fff}
.kh-pna-side::before{content:'';position:absolute;inset:0;background:[[C3]];transform:translateX(-101%);transition:transform .55s cubic-bezier(.16,1,.3,1)}
.kh-pna-right::before{transform:translateX(101%)}
.kh-pna-side:hover::before{transform:none}
.kh-pna-dir{font-size:7px;letter-spacing:.28em;text-transform:uppercase;color:[[C2]];position:relative;z-index:1;transition:color .3s;font-family:inherit}
.kh-pna-title{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:16px;color:#2D2020;position:relative;z-index:1;transition:color .3s}
.kh-pna-arr{font-size:18px;color:rgba(181,161,158,.5);position:relative;z-index:1;transition:all .4s;align-self:flex-end;margin-top:4px}
.kh-pna-side:hover .kh-pna-dir,.kh-pna-side:hover .kh-pna-title,.kh-pna-side:hover .kh-pna-arr{color:#fff}`,js:''},

'pn-typo':{name:'Prev/Next Typographic',tag:'Nav',
html:`<div style="display:flex;justify-content:space-between;gap:0;min-width:340px">
  <div class="kh-pnb-s kh-pnb-l">
    <div class="kh-pnb-n">01</div>
    <div class="kh-pnb-lbl">Vorheriges</div>
    <div class="kh-pnb-title">[[T3]]</div>
    <span class="kh-pnb-arr">←</span>
  </div>
  <div class="kh-pnb-s kh-pnb-r">
    <div class="kh-pnb-n">02</div>
    <div class="kh-pnb-lbl">Nächstes</div>
    <div class="kh-pnb-title">[[T2]]</div>
    <span class="kh-pnb-arr">→</span>
  </div>
</div>`,
css:`.kh-pnb-s{flex:1;padding:20px 22px;cursor:pointer;border:1px solid rgba(181,161,158,.18);position:relative;overflow:hidden;transition:border-color .3s;background:#fff}
.kh-pnb-r{text-align:right}
.kh-pnb-s::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,[[C1]],[[C2]]);transform:scaleX(0);transform-origin:left;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.kh-pnb-r::after{transform-origin:right}
.kh-pnb-s:hover::after{transform:scaleX(1)}
.kh-pnb-n{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:300;color:rgba(181,161,158,.15);line-height:1;position:absolute;top:12px;right:16px}
.kh-pnb-l .kh-pnb-n{right:auto;left:16px}
.kh-pnb-lbl{font-size:7px;letter-spacing:.3em;text-transform:uppercase;color:[[C2]];margin-bottom:8px;font-family:inherit}
.kh-pnb-title{font-family:'Cormorant Garamond',serif;font-size:18px;color:[[C3]];line-height:1.25;transition:color .3s}
.kh-pnb-s:hover .kh-pnb-title{color:[[C1]]}
.kh-pnb-arr{font-size:14px;color:[[C2]];margin-top:8px;display:block;transition:transform .4s}
.kh-pnb-s:hover .kh-pnb-arr{transform:translateX(4px);color:[[C1]]}
.kh-pnb-r:hover .kh-pnb-arr{transform:translateX(-4px)}`,js:''},

'pn-minimal':{name:'Prev/Next Minimal',tag:'Nav',
html:`<div style="display:flex;align-items:center;gap:24px;width:100%;max-width:400px;justify-content:space-between">
  <a href="#" style="display:flex;align-items:center;gap:8px;text-decoration:none">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><line x1="16" y1="10" x2="4" y2="10" stroke="[[C1]]" stroke-width="1.2" stroke-linecap="round"/><path d="M8 6 L4 10 L8 14" stroke="[[C1]]" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <span style="font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:[[C2]];font-family:inherit">[[T3]]</span>
  </a>
  <div style="width:1px;height:20px;background:rgba(181,161,158,.3)"></div>
  <a href="#" style="display:flex;align-items:center;gap:8px;text-decoration:none">
    <span style="font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:[[C2]];font-family:inherit">[[T2]]</span>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><line x1="4" y1="10" x2="16" y2="10" stroke="[[C1]]" stroke-width="1.2" stroke-linecap="round"/><path d="M12 6 L16 10 L12 14" stroke="[[C1]]" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </a>
</div>`,css:'',js:''},

'pn-card':{name:'Prev/Next Card Hover',tag:'Nav',
html:`<div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;min-width:340px">
  <div class="kh-pnc">
    <div class="kh-pnc-eye">←</div>
    <div class="kh-pnc-lbl">Vorheriges</div>
    <div class="kh-pnc-t">[[T3]]</div>
  </div>
  <div class="kh-pnc">
    <div class="kh-pnc-eye">→</div>
    <div class="kh-pnc-lbl">Nächstes</div>
    <div class="kh-pnc-t">[[T2]]</div>
  </div>
</div>`,
css:`.kh-pnc{padding:22px 20px;background:#fff;cursor:pointer;transition:background .35s cubic-bezier(.16,1,.3,1);border:1px solid rgba(181,161,158,.18)}
.kh-pnc:hover{background:[[C3]]}
.kh-pnc-eye{font-size:20px;color:[[C2]];margin-bottom:8px;transition:transform .35s,color .3s}
.kh-pnc:hover .kh-pnc-eye{transform:scale(1.3);color:#fff}
.kh-pnc-lbl{font-size:7px;letter-spacing:.28em;text-transform:uppercase;color:[[C2]];margin-bottom:5px;font-family:inherit;transition:color .3s}
.kh-pnc:hover .kh-pnc-lbl{color:rgba(245,245,245,.6)}
.kh-pnc-t{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;color:#2D2020;line-height:1.3;transition:color .3s}
.kh-pnc:hover .kh-pnc-t{color:#fff}`,js:''},

'nav-classic':{name:'Nav Classic Underline',tag:'Nav',
html:`<nav style="display:flex;gap:24px;align-items:center">
  <a href="#" class="kh-nav-a">Home</a>
  <a href="#" class="kh-nav-a">Work</a>
  <a href="#" class="kh-nav-a">[[T]]</a>
  <a href="#" class="kh-nav-a">Contact</a>
</nav>`,
css:`.kh-nav-a{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#525252;text-decoration:none;position:relative;transition:color .3s;font-family:inherit}
.kh-nav-a::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:[[C1]];transition:width .35s cubic-bezier(.16,1,.3,1)}
.kh-nav-a:hover{color:[[C1]]}
.kh-nav-a:hover::after{width:100%}`,js:''},

'nav-dark':{name:'Nav Dark Bar',tag:'Nav',
html:`<nav style="display:flex;gap:0;align-items:center;background:[[C3]];padding:0 20px">
  <a href="#" class="kh-navd-a">Home</a>
  <a href="#" class="kh-navd-a">Work</a>
  <a href="#" class="kh-navd-a">[[T]]</a>
  <a href="#" class="kh-navd-a">Contact</a>
</nav>`,
css:`.kh-navd-a{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:rgba(245,245,245,.5);text-decoration:none;padding:14px 14px;position:relative;transition:color .3s;font-family:inherit}
.kh-navd-a::after{content:'';position:absolute;bottom:0;left:14px;right:14px;height:1px;background:[[C2]];transform:scaleX(0);transition:transform .35s cubic-bezier(.16,1,.3,1)}
.kh-navd-a:hover{color:rgba(245,245,245,.9)}
.kh-navd-a:hover::after{transform:scaleX(1)}`,js:''},

'nav-pill':{name:'Nav Pill',tag:'Nav',
html:`<nav style="display:flex;gap:4px;align-items:center;background:rgba(255,255,255,.7);backdrop-filter:blur(12px);padding:4px;border-radius:999px;border:1px solid rgba(181,161,158,.2)">
  <a href="#" class="kh-navp-a">Home</a>
  <a href="#" class="kh-navp-a kh-navp-active">Work</a>
  <a href="#" class="kh-navp-a">[[T]]</a>
  <a href="#" class="kh-navp-a">Contact</a>
</nav>`,
css:`.kh-navp-a{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#525252;text-decoration:none;padding:7px 14px;border-radius:999px;transition:all .25s;font-family:inherit}
.kh-navp-a:hover{background:rgba(110,59,73,.08);color:[[C1]]}
.kh-navp-active{background:[[C3]];color:#fff!important}`,js:''},

'deco-sprig':{name:'Sprig Divider',tag:'Dekor',
html:`<div style="display:flex;align-items:center;gap:12px;max-width:[[SZ]]px;width:100%">
  <div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,[[C2]])"></div>
  <svg width="18" height="40" viewBox="0 0 18 40" fill="none">
    <line x1="9" y1="40" x2="9" y2="5" stroke="[[C2]]" stroke-width=".8"/>
    <path d="M9 27Q3 24 4 17Q6 22 9 27Z" fill="none" stroke="[[C1]]" stroke-width=".8"/>
    <path d="M9 27Q15 24 14 17Q12 22 9 27Z" fill="none" stroke="[[C1]]" stroke-width=".8"/>
    <circle cx="9" cy="3" r="2" fill="none" stroke="[[C1]]" stroke-width=".8"/>
  </svg>
  <div style="flex:1;height:1px;background:linear-gradient(90deg,[[C2]],transparent)"></div>
</div>`,css:'',js:''},

'deco-quote':{name:'Quote Flora Box',tag:'Dekor',
html:`<div style="border:1px solid rgba(181,161,158,.3);padding:[[PAD]]px 24px;position:relative;text-align:center;max-width:[[SZ]]px;display:inline-block">
  <svg style="position:absolute;top:-1px;left:-1px;width:22px;height:22px;opacity:.4" viewBox="0 0 24 24" fill="none"><path d="M2 2 L10 2 M2 2 L2 10" stroke="[[C1]]" stroke-width="1.5" stroke-linecap="round"/></svg>
  <svg style="position:absolute;top:-1px;right:-1px;width:22px;height:22px;opacity:.4;transform:rotate(90deg)" viewBox="0 0 24 24" fill="none"><path d="M2 2 L10 2 M2 2 L2 10" stroke="[[C1]]" stroke-width="1.5" stroke-linecap="round"/></svg>
  <svg style="position:absolute;bottom:-1px;left:-1px;width:22px;height:22px;opacity:.4;transform:rotate(-90deg)" viewBox="0 0 24 24" fill="none"><path d="M2 2 L10 2 M2 2 L2 10" stroke="[[C1]]" stroke-width="1.5" stroke-linecap="round"/></svg>
  <svg style="position:absolute;bottom:-1px;right:-1px;width:22px;height:22px;opacity:.4;transform:rotate(180deg)" viewBox="0 0 24 24" fill="none"><path d="M2 2 L10 2 M2 2 L2 10" stroke="[[C1]]" stroke-width="1.5" stroke-linecap="round"/></svg>
  <q style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:17px;color:[[C3]];line-height:1.55;display:block;margin:6px 0 10px">[[T]]</q>
  <p style="font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:[[C2]];font-family:inherit">[[T2]]</p>
</div>`,css:'',js:''},

'deco-tag':{name:'Flora Tag Pill',tag:'Dekor',
html:`<span class="kh-ftag">
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><ellipse cx="6" cy="6" rx="2" ry="5" stroke="currentColor" stroke-width=".8"/><ellipse cx="6" cy="6" rx="5" ry="2" stroke="currentColor" stroke-width=".8"/></svg>
  [[T]]
</span>`,
css:`.kh-ftag{display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(110,59,73,.3);padding:6px 16px;border-radius:999px;font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:[[C1]];cursor:pointer;transition:all .3s;font-family:inherit}
.kh-ftag:hover{background:[[C1]];color:#fff;border-color:[[C1]]}
.kh-ftag svg{transition:transform .5s cubic-bezier(.16,1,.3,1)}
.kh-ftag:hover svg{transform:rotate(180deg)}`,js:''},

'deco-stat':{name:'Flora Stat Box',tag:'Dekor',
html:`<div class="kh-fstat" style="width:[[SZ]]px;padding:[[PAD]]px">
  <svg style="position:absolute;top:-8px;right:-8px;opacity:.07;pointer-events:none" width="80" height="80" viewBox="0 0 80 80" fill="none">
    <ellipse cx="40" cy="40" rx="6" ry="22" fill="[[C1]]"/><ellipse cx="40" cy="40" rx="6" ry="22" fill="[[C1]]" transform="rotate(60 40 40)"/><ellipse cx="40" cy="40" rx="6" ry="22" fill="[[C1]]" transform="rotate(120 40 40)"/>
  </svg>
  <div style="font-family:'Cormorant Garamond',serif;font-size:46px;font-weight:300;color:[[C3]];line-height:1">[[T]]</div>
  <div style="font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:[[C2]];margin-top:4px;font-family:inherit">[[T2]]</div>
</div>`,
css:`.kh-fstat{border:1px solid rgba(181,161,158,.2);position:relative;text-align:center;overflow:hidden;transition:border-color .3s;background:#fff;display:inline-block}
.kh-fstat:hover{border-color:rgba(110,59,73,.3)}`,js:''},

'deco-eyebrow':{name:'Petal Eyebrow',tag:'Dekor',
html:`<div style="display:inline-flex;align-items:center;gap:10px;font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:[[C1]];font-family:inherit">
  <div style="display:flex;gap:3px;align-items:flex-end">
    <span style="display:inline-block;width:5px;height:7px;background:[[C2]];border-radius:50% 50% 40% 40%;opacity:.5"></span>
    <span style="display:inline-block;width:5px;height:11px;background:[[C1]];border-radius:50% 50% 40% 40%;opacity:.8"></span>
    <span style="display:inline-block;width:5px;height:7px;background:[[C2]];border-radius:50% 50% 40% 40%;opacity:.5"></span>
  </div>
  [[T]]
  <div style="display:flex;gap:3px;align-items:flex-end;transform:scaleX(-1)">
    <span style="display:inline-block;width:5px;height:7px;background:[[C2]];border-radius:50% 50% 40% 40%;opacity:.5"></span>
    <span style="display:inline-block;width:5px;height:11px;background:[[C1]];border-radius:50% 50% 40% 40%;opacity:.8"></span>
    <span style="display:inline-block;width:5px;height:7px;background:[[C2]];border-radius:50% 50% 40% 40%;opacity:.5"></span>
  </div>
</div>`,css:'',js:''},

'deco-connector':{name:'Connector Line',tag:'Dekor',
html:`<div style="display:flex;align-items:center;gap:0;max-width:[[SZ]]px;width:100%">
  <div style="width:5px;height:5px;border-radius:50%;background:[[C2]];flex-shrink:0"></div>
  <div style="flex:1;height:1px;background:linear-gradient(90deg,[[C2]],rgba(181,161,158,.1))"></div>
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <ellipse cx="7" cy="7" rx="2" ry="5" stroke="[[C2]]" stroke-width=".7"/>
    <ellipse cx="7" cy="7" rx="5" ry="2" stroke="[[C2]]" stroke-width=".7"/>
    <circle cx="7" cy="7" r="1.2" fill="[[C1]]" opacity=".6"/>
  </svg>
</div>`,css:'',js:''},

'deco-box-a':{name:'Box Corner Reveal',tag:'Dekor',
html:`<div class="kh-boxa" style="width:[[SZ]]px;padding:[[PAD]]px;border-radius:[[RAD]]px">
  <div style="font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:[[C2]];margin-bottom:8px;font-family:inherit">[[T2]]</div>
  <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:19px;color:[[C3]];line-height:1.3">[[T]]</div>
</div>`,
css:`.kh-boxa{border:1px solid rgba(181,161,158,.25);position:relative;cursor:pointer;transition:border-color .4s;background:#fff;display:inline-block}
.kh-boxa:hover{border-color:rgba(110,59,73,.35)}
.kh-boxa::before,.kh-boxa::after{content:'';position:absolute;width:16px;height:16px;border-color:[[C1]];border-style:solid;border-width:0;transition:border-width .4s cubic-bezier(.16,1,.3,1)}
.kh-boxa::before{top:-1px;left:-1px;border-top-width:1.5px;border-left-width:1.5px}
.kh-boxa::after{bottom:-1px;right:-1px;border-bottom-width:1.5px;border-right-width:1.5px}
.kh-boxa:hover::before,.kh-boxa:hover::after{border-width:1.5px}`,js:''},

'deco-box-b':{name:'Box Stack Rotate',tag:'Dekor',
html:`<div class="kh-boxb" style="width:[[SZ]]px">
  <div style="padding:[[PAD]]px;position:relative;z-index:1">
    <div style="font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:[[C2]];margin-bottom:8px;font-family:inherit">[[T2]]</div>
    <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:19px;color:[[C3]];line-height:1.3">[[T]]</div>
  </div>
</div>`,
css:`.kh-boxb{position:relative;cursor:pointer;background:#fff;display:inline-block}
.kh-boxb::before{content:'';position:absolute;inset:0;border:1px solid rgba(181,161,158,.2);transform:rotate(1.5deg);transition:transform .5s cubic-bezier(.16,1,.3,1)}
.kh-boxb::after{content:'';position:absolute;inset:0;border:1px solid rgba(110,59,73,.12);transform:rotate(-1deg);transition:transform .5s cubic-bezier(.16,1,.3,1)}
.kh-boxb:hover::before{transform:rotate(3deg)}
.kh-boxb:hover::after{transform:rotate(-2.5deg)}`,js:''},

'deco-box-c':{name:'Box Dark Bloom',tag:'Dekor',
html:`<div style="background:[[C3]];padding:[[PAD]]px;position:relative;overflow:hidden;width:[[SZ]]px;display:inline-block;border-radius:[[RAD]]px">
  <svg style="position:absolute;bottom:-20px;right:-20px;opacity:.06;pointer-events:none" width="100" height="100" viewBox="0 0 100 100" fill="none">
    <ellipse cx="50" cy="50" rx="8" ry="30" fill="#fff"/><ellipse cx="50" cy="50" rx="8" ry="30" fill="#fff" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="8" ry="30" fill="#fff" transform="rotate(120 50 50)"/>
  </svg>
  <div style="position:relative;z-index:1">
    <div style="font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:[[C2]];margin-bottom:8px;font-family:inherit">[[T2]]</div>
    <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:19px;color:rgba(245,245,245,.95);line-height:1.3">[[T]]</div>
  </div>
</div>`,css:'',js:''},

'deco-box-d':{name:'Box Dash Border',tag:'Dekor',
html:`<div style="padding:[[PAD]]px;position:relative;background:#fff;width:[[SZ]]px;display:inline-block;border-radius:[[RAD]]px">
  <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100%" height="100%" rx="[[RAD]]" fill="none" stroke="[[C2]]" stroke-width="1" stroke-dasharray="6 4" style="animation:dashAnim 8s linear infinite"/>
  </svg>
  <div style="font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:[[C2]];margin-bottom:8px;font-family:inherit">[[T2]]</div>
  <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:19px;color:[[C3]];line-height:1.3">[[T]]</div>
</div>`,
css:`@keyframes dashAnim{to{stroke-dashoffset:-100}}`,js:''},

'deco-box-e':{name:'Box Top Line',tag:'Dekor',
html:`<div class="kh-boxe" style="width:[[SZ]]px;border-radius:[[RAD]]px;padding:[[PAD]]px">
  <div style="font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:[[C2]];margin-bottom:8px;font-family:inherit">[[T2]]</div>
  <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:19px;color:[[C3]];line-height:1.3">[[T]]</div>
</div>`,
css:`.kh-boxe{border:1px solid rgba(181,161,158,.2);position:relative;overflow:hidden;transition:box-shadow .4s;cursor:pointer;background:#fff;display:inline-block}
.kh-boxe::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,[[C1]],[[C2]],[[C1]]);transform:scaleX(0);transform-origin:left;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.kh-boxe:hover::before{transform:scaleX(1)}
.kh-boxe:hover{box-shadow:0 12px 40px rgba(0,0,0,.06)}`,js:''}
};

// ═══════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════
let current = 'hero-flower';

// ═══════════════════════════════════════════════════
//  SETTINGS HELPERS
// ═══════════════════════════════════════════════════
function g(id){ return document.getElementById(id) }

function vals(){
  return {
    t:  g('set-text').value||'',
    t2: g('set-text2').value||'',
    t3: g('set-text3').value||'',
    sz: g('set-size').value,
    pad: '20',
    rad: g('set-radius').value,
    c1: g('set-c1').value,
    c2: g('set-c2').value,
    c3: g('set-c3').value,
    c4: g('set-c4').value
  };
}

function applyVals(str, v){
  return str
    .replaceAll('[[T]]', v.t).replaceAll('[[T2]]', v.t2).replaceAll('[[T3]]', v.t3)
    .replaceAll('[[SZ]]', v.sz).replaceAll('[[PAD]]', v.pad).replaceAll('[[RAD]]', v.rad)
    .replaceAll('[[C1]]', v.c1).replaceAll('[[C2]]', v.c2)
    .replaceAll('[[C3]]', v.c3).replaceAll('[[C4]]', v.c4);
}

// Build position CSS block from panel settings
function getPositionCSS(){
  const mt = g('set-mt').value||'0';
  const mb = g('set-mb').value||'0';
  const ml = g('set-ml').value||'0';
  const mr = g('set-mr').value||'0';
  const ph = g('set-ph').value||'0';
  const pv = g('set-pv').value||'0';
  const pos = getSegVal('seg-pos');
  const align = getSegVal('seg-align');
  const valign = getSegVal('seg-valign');
  const op = (g('set-opacity').value||'100')/100;
  return `position:${pos};margin-top:${mt}px;margin-bottom:${mb}px;margin-left:${ml}px;margin-right:${mr}px;padding:${pv}px ${ph}px;opacity:${op};display:flex;align-items:${valign};justify-content:${align};`;
}

// Build typography CSS block
function getTypoCSS(){
  const font = g('set-font').value;
  const size = g('set-fontsize').value;
  const fw = getSegVal('seg-fw');
  const italic = g('tog-italic').classList.contains('on') ? 'italic' : 'normal';
  const upper = g('tog-upper').classList.contains('on') ? 'uppercase' : 'none';
  const ls = (g('set-ls').value/100).toFixed(2);
  const lh = (g('set-lh').value/10).toFixed(1);
  return `font-family:${font};font-size:${size};font-weight:${fw};font-style:${italic};text-transform:${upper};letter-spacing:${ls}em;line-height:${lh};`;
}

// Build animation override
function getAnimCSS(){
  if(!g('tog-anim').classList.contains('on')) return '';
  const type = g('set-animtype').value;
  const dur = g('set-dur').value;
  const timing = g('set-timing').value;
  const inf = g('tog-infinite').classList.contains('on') ? 'infinite' : '1';
  const delay = g('set-delay').value;
  return `animation:${type} ${dur}s ${timing} ${inf};animation-delay:${delay}s;`;
}

function getSegVal(segId){
  const active = g(segId).querySelector('.seg-btn.on');
  return active ? active.dataset.val : '';
}

// ═══════════════════════════════════════════════════
//  RENDER
// ═══════════════════════════════════════════════════
function render(){
  const comp = C[current]; if(!comp) return;
  const v = vals();
  const html = applyVals(comp.html, v);
  const css  = applyVals(comp.css, v);

  // Apply position/typo/anim to preview wrapper
  const posCSS = getPositionCSS();
  const typoCSS = getTypoCSS();
  const animOverride = getAnimCSS();

  // Inject into preview
  g('previewEl').innerHTML = html;
  g('previewEl').style.cssText = `padding:44px;display:flex;align-items:center;justify-content:center;transition:transform .3s;${posCSS}`;

  // Apply typo/anim to first child if present
  const firstChild = g('previewEl').firstElementChild;
  if(firstChild && animOverride){
    // Apply animation override to first animatable element
    const animEl = firstChild.querySelector('[style*="animation"]') || firstChild;
    if(animEl && animEl !== firstChild.parentElement){
      const existing = animEl.style.cssText;
      // Only override if animation already present
      if(existing.includes('animation')){
        animEl.style.animation = getAnimCSS().replace('animation:','').replace(';','');
      }
    }
  }

  // Update stage label
  g('stageName').textContent = comp.name;
  g('stageTag').textContent  = comp.tag;

  // Live CSS
  let st = g('__live');
  if(!st){st=document.createElement('style');st.id='__live';document.head.appendChild(st);}
  st.textContent = css;

  // Show/hide text fields
  g('f-text2').style.display = comp.html.includes('[[T2]]') ? '' : 'none';
  g('f-text3').style.display = comp.html.includes('[[T3]]') ? '' : 'none';
}

// ═══════════════════════════════════════════════════
//  COPY
// ═══════════════════════════════════════════════════
function doCopy(type){
  const comp = C[current]; if(!comp) return;
  const v = vals();
  const posCSS = getPositionCSS();
  const typoCSS = getTypoCSS();
  const animCSS = getAnimCSS();
  const htmlContent = applyVals(comp.html, v);
  const cssContent  = applyVals(comp.css, v);
  const jsContent   = comp.js || '// Kein JavaScript nötig.';

  let content = '';
  if(type==='html') content = htmlContent;
  else if(type==='css') content = cssContent;
  else if(type==='js') content = jsContent;
  else if(type==='all'){
    content =
`<!-- ── HTML: in <body> einfügen ────────────────────────── -->
<div style="${posCSS}${typoCSS}${animCSS}">
${htmlContent}
</div>

<!-- ── CSS: in <style> oder .css Datei einfügen ─────────── -->
<style>
${cssContent}
</style>

<!-- ── JS: vor </body> einfügen (falls nötig) ────────────── -->
<script>
${jsContent}
<\/script>`;
  }

  navigator.clipboard.writeText(content).then(()=>{
    const map = {html:0,css:1,js:2,all:3};
    const btn = document.querySelectorAll('.cp-btn')[map[type]];
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Kopiert!';
    btn.classList.add('done');
    setTimeout(()=>{btn.innerHTML=orig;btn.classList.remove('done');},1800);
  });
}

// ═══════════════════════════════════════════════════
//  PANEL TABS
// ═══════════════════════════════════════════════════
document.querySelectorAll('.ptab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.ptab').forEach(t=>t.classList.remove('on'));
    document.querySelectorAll('.ptab-pane').forEach(p=>p.classList.remove('on'));
    tab.classList.add('on');
    g('tab-'+tab.dataset.tab).classList.add('on');
  });
});

// ═══════════════════════════════════════════════════
//  SEGMENT CONTROLS
// ═══════════════════════════════════════════════════
document.querySelectorAll('.seg').forEach(seg=>{
  seg.querySelectorAll('.seg-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      seg.querySelectorAll('.seg-btn').forEach(b=>b.classList.remove('on'));
      btn.classList.add('on');
      render();
    });
  });
});

// ═══════════════════════════════════════════════════
//  TOGGLE
// ═══════════════════════════════════════════════════
function toggleIt(el){
  el.classList.toggle('on');
  render();
}

// ═══════════════════════════════════════════════════
//  SIDEBAR NAV
// ═══════════════════════════════════════════════════
document.querySelectorAll('.item').forEach(el=>{
  el.addEventListener('click',()=>{
    document.querySelectorAll('.item').forEach(i=>i.classList.remove('active'));
    el.classList.add('active');
    current = el.dataset.id;
    render();
  });
});

// ═══════════════════════════════════════════════════
//  SEARCH
// ═══════════════════════════════════════════════════
g('searchInput').addEventListener('input', e=>{
  const q = e.target.value.toLowerCase().trim();
  document.querySelectorAll('.item').forEach(el=>{
    el.classList.toggle('hidden', q && !el.textContent.toLowerCase().includes(q));
  });
  document.querySelectorAll('.cat').forEach(cat=>{
    let sib = cat.nextElementSibling, visible = false;
    while(sib && !sib.classList.contains('cat')){
      if(!sib.classList.contains('hidden') && sib.classList.contains('item')) visible = true;
      sib = sib.nextElementSibling;
    }
    cat.classList.toggle('hidden', q && !visible);
  });
});

// ═══════════════════════════════════════════════════
//  SCALE
// ═══════════════════════════════════════════════════
document.querySelectorAll('.sc-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.sc-btn').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    g('previewEl').style.transform=`scale(${btn.dataset.scale})`;
  });
});

// ═══════════════════════════════════════════════════
//  BACKGROUND
// ═══════════════════════════════════════════════════
document.querySelectorAll('.bg-sw').forEach(sw=>{
  sw.addEventListener('click',()=>{
    document.querySelectorAll('.bg-sw').forEach(s=>s.classList.remove('on'));
    sw.classList.add('on');
    g('previewWrap').style.background=sw.dataset.bg;
  });
});

// ═══════════════════════════════════════════════════
//  RANGE LABELS
// ═══════════════════════════════════════════════════
g('set-size').addEventListener('input',e=>{g('sz-val').textContent=e.target.value+'px';render()});
g('set-radius').addEventListener('input',e=>{g('rad-val').textContent=e.target.value+'px';render()});
g('set-opacity').addEventListener('input',e=>{g('op-val').textContent=e.target.value+'%';render()});
g('set-ls').addEventListener('input',e=>{g('ls-val').textContent=(e.target.value/100).toFixed(2)+'em';render()});
g('set-lh').addEventListener('input',e=>{g('lh-val').textContent=(e.target.value/10).toFixed(1);render()});
g('set-dur').addEventListener('input',e=>{g('dur-val').textContent=e.target.value+'s';render()});
g('set-delay').addEventListener('input',e=>{g('delay-val').textContent=e.target.value+'s';render()});

// ═══════════════════════════════════════════════════
//  ALL OTHER INPUTS
// ═══════════════════════════════════════════════════
['set-text','set-text2','set-text3','set-mt','set-mb','set-ml','set-mr','set-ph','set-pv',
 'set-c1','set-c2','set-c3','set-c4','set-font','set-fontsize','set-animtype','set-timing'].forEach(id=>{
  g(id).addEventListener('input', render);
});

// ═══════════════════════════════════════════════════
//  QUICK PALETTES
// ═══════════════════════════════════════════════════
document.querySelectorAll('.pal-dot').forEach(dot=>{
  dot.addEventListener('click',()=>{
    g('set-c1').value = dot.dataset.c1;
    g('set-c2').value = dot.dataset.c2;
    g('set-c3').value = dot.dataset.c3;
    g('set-c4').value = dot.dataset.c4;
    render();
  });
});

// ═══════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════
g('f-text2').style.display='none';
g('f-text3').style.display='none';
render();
</script>
</body>
</html>
