# Design System Prompt — Khadija Okbi (khadijaokbi.ch)

> Dieses Dokument enthält alle persistenten Design-Anforderungen für KI-gestützte Frontend-Entwicklung (Copilot, Claude, ChatGPT etc.). Immer als Kontext mitgeben oder in den System-Prompt einfügen.

---

## 🎨 CSS Root Variables (immer verwenden)

```css
:root {
  /* Farben */
  --darkgreen:  #1C2B1E;   /* Primär – Hintergrund, Headlines */
  --burgundy:   #6B2737;   /* Akzent – CTA, Hover, Highlights */
  --mauve:      #9C7B8B;   /* Sekundär – Subtext, Borders, Muted */
  --mint:       #A8C5A0;   /* Akzent hell – Tags, Badges, Highlights */
  --white:      #F5F5F0;   /* Off-White – Fließtext auf dark */
  --off-black:  #1A1A1A;   /* Für helle Layouts als Text */
  --black:      #0D0D0D;   /* Tiefschwarz – Overlays, harte Kontraste */
}
```

**Regeln:**
- Niemals hardcodierte Hex-Werte. Ausschließlich diese Custom Properties verwenden.
- Kein Gradient, kein reines Weiß (#ffffff) als Hintergrund.
- Dunkle Layouts bevorzugen (`--darkgreen` als Background, `--white` als Text).

---

## 🔤 Typografie

| Rolle        | Font               | Verwendung                          |
|--------------|--------------------|--------------------------------------|
| Display / H1 | **Higuen** (custom serif) | Große Headlines, Hero-Titel     |
| Heading      | **Tenor Sans**     | H2–H4, Sektions-Titel               |
| Body         | **Work Sans**      | Fließtext, UI-Labels, Navigation    |
| Serif Akzent | **Playfair Display** | Quotes, editoriale Akzente        |

**Regeln:**
- Niemals Inter, Roboto, Arial oder System-Fonts.
- Higuen ist nur für H1/Display reserviert – sparsam einsetzen.
- Schriftgrößen fluid mit `clamp()` oder responsive rem-Skala.
- Letter-Spacing bei Tenor Sans leicht erhöhen: `letter-spacing: 0.04em`.

---

## 🧩 Layout & Komposition

- **Asymmetrische Layouts** bevorzugen – kein zentrierter Standardstack.
- Großzügige Whitespace-Nutzung oder kontrollierte Dichte (kein Mittelweg).
- **Overlap-Elemente**: Text über Bilder, Elemente die Sektionsgrenzen brechen.
- Grid-breaking: mindestens ein Element pro Seite bricht das Raster.
- Maximale Breite `max-width: 1440px`, Sektionen mindestens `100vh`.
- Sticky/Fixed Elemente sparsam, aber präzise eingesetzt.

---

## ✨ Motion & Interaktivität

### Scroll-Animationen
```css
/* Basis-Eintrittsanimation (mit IntersectionObserver) */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```
- Staggered reveals mit `animation-delay` (je Element +80–120ms).
- Scroll-getriggerte Parallax-Effekte auf Hero-Elemente.

### Hover-States
- Alle interaktiven Elemente haben spürbare Hover-Transitions (`0.25s ease`).
- Button-Hover: Background-Wechsel + leichtes `translateY(-2px)` oder `scale(1.02)`.
- Link-Hover: kein simples Underline – lieber Farb- oder Clip-Path-Transition.

### Kinetic Typografie / Marquee
```css
/* Horizontaler Endlos-Marquee */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 20s linear infinite;
}
```

---

## 🌐 3D & Immersive Showcases

Für interaktive 3D-Elemente (z.B. Produkt-Showcase, Portfolio-Cards):

### Tilt-Effekt (CSS + JS, kein externes Plugin nötig)
```javascript
el.addEventListener('mousemove', (e) => {
  const { left, top, width, height } = el.getBoundingClientRect();
  const x = (e.clientX - left) / width - 0.5;
  const y = (e.clientY - top) / height - 0.5;
  el.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
});
el.addEventListener('mouseleave', () => {
  el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
});
```

### CSS 3D Cards
```css
.card-3d {
  transform-style: preserve-3d;
  transition: transform 0.4s ease;
  will-change: transform;
}
.card-3d:hover {
  transform: perspective(600px) rotateY(8deg) rotateX(-4deg) scale(1.02);
}
```

### Glassmorphism (Akzent, nicht dominant)
```css
.glass {
  background: rgba(168, 197, 160, 0.08);  /* --mint mit Opacity */
  backdrop-filter: blur(12px);
  border: 1px solid rgba(168, 197, 160, 0.15);
  border-radius: 12px;
}
```

---

## 🖼️ Visuelle Atmosphäre & Hintergründe

- **Kein** solider Einheitsfarb-Hintergrund ohne Textur oder Tiefe.
- Bevorzugte Techniken:
  - Noise-Overlay: `filter: url(#noise)` oder SVG-Textur als Pseudo-Element
  - Radial-Gradient Mesh: mehrere überlagerte `radial-gradient()` in gedämpften Farben
  - Subtle grain via CSS `backdrop-filter` + Opacity-Ebene
- Dekoration via SVG-Elemente (Linien, organische Formen, geometrische Akzente) in `--mauve` oder `--mint` mit 10–20% Opacity.
- Schatten: weich, großräumig, Farbe immer aus dem Farbsystem (kein generisches `rgba(0,0,0,0.3)`).

```css
/* Beispiel: warmer dunkler Hintergrund mit Tiefe */
body {
  background-color: var(--darkgreen);
  background-image:
    radial-gradient(ellipse at 20% 50%, rgba(107, 39, 55, 0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 10%, rgba(168, 197, 160, 0.08) 0%, transparent 50%);
}
```

---

## 🧱 Komponenten-Standards

### Buttons
```css
.btn-primary {
  background: var(--burgundy);
  color: var(--white);
  font-family: 'Work Sans', sans-serif;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.75rem 1.75rem;
  border: none;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.2s ease;
}
.btn-primary:hover {
  background: var(--mauve);
  transform: translateY(-2px);
}
```

### Tags / Badges
```css
.tag {
  background: transparent;
  border: 1px solid var(--mint);
  color: var(--mint);
  font-family: 'Work Sans', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
}
```

### Section Divider
```css
.divider {
  width: 48px;
  height: 2px;
  background: var(--burgundy);
  margin: 1.5rem 0;
}
```

---

## 📐 Allgemeine Codier-Regeln

1. **Keine hardcodierten Farben** – ausschließlich CSS Custom Properties aus `:root`.
2. **Keine externen CSS-Frameworks** (kein Bootstrap, kein Tailwind) außer explizit gewünscht.
3. Animationen immer mit `prefers-reduced-motion` absichern:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after { animation-duration: 0.01ms !important; }
   }
   ```
4. Bilder immer mit `object-fit: cover` + definierten Dimensionen.
5. Alle Abstände auf 8px-Raster basieren (8, 16, 24, 32, 48, 64, 96, 128px).
6. Semantic HTML: `<section>`, `<article>`, `<nav>`, `<main>` korrekt einsetzen.

---

## 🎯 Tonalität & Ästhetik

- **Stil:** Editorial,Elegant, High End, Awwwards Winning Design,refined, modern-minimalist mit einem Femininen, girly, sinnlichen Unterton.
- **Nicht:** Corporate-clean, tech-bro-blau, generische KI-Ästhetik, überladene Effekte.
- **Referenz:** Zwischen Luxus-Portfolio und zeitgenössischem Schweizer Design – präzise, aber mit Persönlichkeit.
- Jeder Output soll sich anfühlen wie: *selbst designed, nicht generiert*.

---

*Zuletzt aktualisiert: März 2026 — khadijaokbi.ch*
