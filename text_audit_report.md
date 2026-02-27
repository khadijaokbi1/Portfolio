# Text-Audit (ohne `web/`)

## Scope
- Geprüft: alle HTML-Seiten ausser `web/`
- Enthalten: Sprachqualität, Platzhaltertexte, Inkonsistenzen, offensichtliche Sinn-/Grammatikfehler

## Priorisierte Anpassungen

1. Datei: `about.html`
- Problem: "Unsere Triebe, Veranlagerungen und Triebe."
- Typ: Rechtschreibung + Dopplung
- Vorschlag: "Unsere Triebe, Veranlagungen und Muster."

2. Datei: `about.html`
- Problem: "..., und ich nehme jede Gelegenheit mit, etwas neues zu lernen."
- Typ: Rechtschreibung
- Vorschlag: "..., und ich nutze jede Gelegenheit, etwas Neues zu lernen."

3. Datei: `about.html`
- Problem: "..., und wo die Bruchstellen liegen. warum wir Dinge tun ..."
- Typ: Satzanfang klein
- Vorschlag: "..., und wo die Bruchstellen liegen. Warum wir Dinge tun ..."

4. Datei: `about.html`
- Problem: Timeline-Satzbruch: "Nach vier Jahren ... durfte ich ... Komthur. Im ein umfassendes Online-Marketing-Konzept entwickeln."
- Typ: Sinnfehler / Satzbruch
- Vorschlag: "Nach vier Jahren Ausbildung zur Mediamatikerin durfte ich im Rahmen meiner IPA für die Werbeagentur Komthur ein umfassendes Online-Marketing-Konzept entwickeln."

5. Datei: `about.html`
- Problem: "Beginn der zwei Jährigen schulischen Ausbildung."
- Typ: Rechtschreibung
- Vorschlag: "Beginn der zweijährigen schulischen Ausbildung."

6. Datei: `about.html`
- Problem: Persönlichkeitstyp inkonsistent (oben: `ENTJ-A`, unten: `INTP-A`).
- Typ: Inhaltliche Inkonsistenz
- Vorschlag: auf einen finalen Typ vereinheitlichen.

7. Datei: `blog.html`
- Problem: "Texte die mehr hinterfragen ..."
- Typ: Kommasetzung
- Vorschlag: "Texte, die mehr hinterfragen ..."

8. Datei: `blog/corona.html`
- Problem: Navigation uneinheitlich (`work`, `about` kleingeschrieben).
- Typ: UI-Text-Inkonsistenz
- Vorschlag: `Work`, `About` (wie restliche Seiten).

9. Datei: `blog/corona.html`
- Problem: "Corona Pandemie"
- Typ: Rechtschreibung
- Vorschlag: "Corona-Pandemie" (an allen Stellen).

10. Datei: `index.html`
- Problem: "Konstanz während des Corona-Lockdown"
- Typ: Grammatik
- Vorschlag: "Konstanz während des Corona-Lockdowns"

11. Datei: `index.html`
- Problem: "Community building on Threads"
- Typ: Sprachmix (DE/EN)
- Vorschlag (DE): "Community-Aufbau auf Threads"

12. Datei: mehrere Seiten
- Problem: Footer-Text "Design & Development by Khadija Okbi" in englisch, restliche Seite meist deutsch.
- Typ: Sprachkonsistenz
- Vorschlag (optional): "Design & Entwicklung von Khadija Okbi" oder bewusst überall Englisch.

## Platzhaltertexte / Demo-Inhalte (anpassen oder aus Live-Navigation entfernen)

1. Datei: `pages/template.html`
- Enthält zahlreiche Platzhalter:
- "Projekt Titel"
- "Projekt Übersicht"
- "Einleitung und Kontext"
- "Beschreibung des Kunden und der Zusammenarbeit."
- "Die Herausforderung und Zielsetzung des Projekts."
- "Projektdauer und wichtige Meilensteine."
- "Hier beschreibst du den konzeptionellen Ansatz ..."
- "Welche Tools und Technologien wurden verwendet?"
- "Probleme, die gelöst wurden ..."
- "Hier präsentierst du das fertige Projekt ..."

2. Datei: `pages/preloader-demo.html`
- Demo-Text vorhanden (kein Fehler, aber kein produktiver Seiteninhalt):
- "Preloader Demo"
- "Nochmal testen"

3. Datei: `pages/wellen-demo.html`
- Reine Demo-Seite (kein Fehler, aber nicht inhaltlich redaktionell):
- "Wellen Demo"

4. Datei: `work/personal.html`
- Sichtbarer Placeholder: "Portfolio UI" (Element-ID `bPlaceholder`).

## Optionaler Feinschliff (kein harter Fehler)
- Einheitliche Schreibweise von Navigationstexten (`Work` vs ggf. `Arbeiten`).
- Einheitliche Mikrocopy bei Buttons (`MEHR DETAILS` vs `Jetzt lesen` vs `Weiterlesen`).

## Hinweis zur Vollständigkeit
- Vollständige, extrahierte Textsammlung liegt in: `text_audit_all_texts.md`.
