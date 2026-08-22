# MASTERPROMPT – REDESIGN INGENIEURBÜRO KALTBRUNN

## 0. AUFGABE

Erstelle ein vollständiges Redesign der bestehenden Website des **Ingenieurbüro Kaltbrunn**.

**Bestehende Website / Content-Quelle:**
https://bilal-altu.github.io/kaltbrunn/index.html

Die bestehende Website dient als **verbindliche inhaltliche Source of Truth**.  
Das Redesign darf visuell, strukturell und technisch komplett neu gedacht werden, aber die vorhandenen Leistungen, Informationen, Kontaktangaben, Qualifikationen, rechtlichen Inhalte und Kernaussagen müssen erhalten bleiben.

### Kernziel

Die aktuelle Website wirkt zu unruhig, generisch, teilweise wie ein typisches KI-Webdesign und nicht hochwertig genug.

Das Redesign soll deshalb klar wirken wie:

> **moderner unabhängiger TÜV-/DEKRA-Konkurrent × Copperlane × hochwertiges deutsches Ingenieurbüro**

Die Seite soll nicht wie eine klassische 0815-Handwerkerwebsite, ein ThemeForest-Template, eine SaaS-Landingpage oder eine KI-generierte Agenturseite aussehen.

### Prioritäten – in exakt dieser Reihenfolge

1. **Conversion**
2. **Premium-Optik**
3. **Vertrauen**
4. **technische Kompetenz**
5. **lokaler Bezug zu Heppenheim / Bergstraße**

Bei Designkonflikten entscheidet diese Priorisierung.

---

# 1. TECH STACK

Verwende:

- **Astro**
- **TypeScript**
- **Tailwind CSS**
- **Motion / Framer Motion**, soweit sinnvoll in Astro integrierbar
- **GSAP**, falls für hochwertige Scroll-Inszenierungen nötig
- keine vorgefertigte Component Library
- keine shadcn-Komponenten
- keine gekauften UI-Komponenten

Alle Komponenten sollen für dieses Projekt individuell gestaltet werden.

## Technische Philosophie

Die Optik hat hohe Priorität.

Performance soll trotzdem professionell bleiben, aber es ist erlaubt, für eine deutlich hochwertigere Experience kontrolliert Animationen, große Bilder und Scroll-Inszenierungen einzusetzen.

Keine Animation darf jedoch Navigation, Lesbarkeit oder Conversion behindern.

---

# 2. DESIGNREFERENZEN

## Positive Referenz 1 – Copperlane

https://lexingtonthemes.com/viewports/copperlane

Diese Referenz ist besonders wichtig für:

- Automotive-Charakter
- großflächige Fotografie
- hochwertige Bildkomposition
- großzügige Layouts
- typografische Hierarchie
- Wechsel zwischen visuellen und informativen Bereichen
- Premium-Wirkung
- Scroll-Rhythmus
- Editorial-Charakter
- große, ruhige Inhaltsflächen

**Wichtig:** Copperlane nicht 1:1 kopieren.

Übernimm die gestalterischen Prinzipien und den Qualitätsanspruch, nicht das konkrete Template.

## Positive Referenz 2 – Pinterest

https://i.pinimg.com/736x/83/d6/48/83d64861913069a778e89959fcfb2959.jpg

Gewichtung der beiden positiven Referenzen:

> **ungefähr 50 / 50**

Die Referenzen sollen zusammengeführt werden, nicht getrennt nebeneinander existieren.

---

# 3. NEGATIVREFERENZ

Diese Website dient ausdrücklich als Beispiel dafür, wie die neue Kaltbrunn-Seite **nicht** wirken soll:

https://www.avci-geruestbau.de/

Zu vermeiden ist insbesondere das typische Schema:

- austauschbarer Hero
- Kennzahlenleiste
- Standard-Leistungsgrid
- Standard-„Warum wir“-Sektion
- Standard-Ablauf
- Standard-Bewertungen
- Standard-Einsatzgebiet
- Standard-Kontakt
- ein gleichförmiger Block nach dem anderen
- jede Sektion sieht strukturell ähnlich aus
- sichtbarer Template-Charakter

Das Kaltbrunn-Redesign muss deutlich individueller, ruhiger und hochwertiger komponiert sein.

---

# 4. DESIGN CONSTITUTION

## 4.1 Grundgefühl

Die Website muss gleichzeitig folgende Eigenschaften vermitteln:

- Premium
- seriös
- technisch
- ingenieurmäßig
- präzise
- unabhängig
- vertrauenswürdig
- modern
- automotive
- hochwertig
- lokal verankert

Sie darf **nicht** verspielt oder „tech-startup-mäßig“ wirken.

Die Gestaltung soll eher an moderne Automotive-Kommunikation, Prüfgesellschaften, hochwertige Ingenieurbüros und Premium-Mobilitätsmarken erinnern.

---

# 5. FARBWELT

## Primärfarben

### TÜV-Blau

TÜV-Blau ist die dominante Markenfarbe.

Es darf auch für größere Flächen verwendet werden.

Die Website soll hauptsächlich auf folgenden Farbräumen basieren:

- TÜV-Blau
- Weiß
- sehr dunkles Anthrazit / Schwarz für Typografie
- neutrale Grauwerte

## Orange

Akzentfarbe:

`#ff8a4a`

Orange darf eingesetzt werden, wenn es tatsächlich harmoniert.

Bevorzugte Anwendung:

- einzelne CTA
- kleine Hervorhebungen
- Hover States
- kleine grafische Akzente
- ausgewählte Conversion-Elemente

Orange darf **nicht** inflationär eingesetzt werden.

Wenn Orange den hochwertigen Gesamteindruck verschlechtert, darf darauf verzichtet werden.

## Hintergrund

Grundsätzlich:

- **reines Weiß**
- gezielte große blaue Sektionen
- eventuell sehr dunkle Bereiche, wenn dies für Kontrast und visuelle Dramaturgie sinnvoll ist

Keine bunten Verläufe.

---

# 6. TYPOGRAFIE

Stil:

> **Schweizer / technische Sans Serif × hochwertige Automotive-Editorial-Typografie**

Orientierung:

- Helvetica
- Suisse
- Inter
- ähnliche moderne Neo-Grotesk-Schriften

Keine verspielten Display-Fonts.

Keine futuristischen „AI-/Cyber“-Fonts.

## Headlines

- groß, aber kontrolliert
- starke Typohierarchie
- nicht absurd große 10vw-Agentur-Headlines
- klare Zeilenumbrüche
- wenig Text
- hohe visuelle Präzision

Großbuchstaben dürfen gezielt eingesetzt werden.

Bei Headlines darf Uppercase vorkommen, wenn es zur Komposition passt.

Nicht jede Headline in Versalien setzen.

---

# 7. FORMENSPRACHE

## Ecken

Leichte Abrundungen:

> ungefähr **4–8 px**

Keine 24–40 px SaaS-Radien.

Keine vollständig runden Cards.

## Buttons

- rechteckig
- leicht gerundet
- klar
- hochwertig
- gute Hover-States

Keine Pill-Buttons.

## Schatten

Nur sehr subtil.

Kein:

- Floating-Card-Look
- starke Drop Shadows
- Neon Glow
- Glassmorphism

## Linien

Keine ständig wiederkehrenden dünnen Trennlinien als gestalterisches Gimmick.

Struktur primär durch:

- Weißraum
- Typografie
- Fotografie
- Flächen
- Ausrichtung

---

# 8. ANTI-AI-SLOP CONSTITUTION

Diese Regeln sind verbindlich.

## VERBOTEN

### Keine generischen Icon-Welten

Keine Reihe aus:

- Shield Icon
- Check Icon
- Lightning Icon
- Award Icon
- Car Icon
- Gear Icon
- Clock Icon

nur um Textblöcke visuell aufzufüllen.

Icons nur funktional einsetzen, beispielsweise:

- Telefon
- WhatsApp
- E-Mail
- Standort
- Navigation

---

### Keine Pill-Badge-Flut

Keine Elemente wie:

`✓ Zertifiziert`

`24/7 Service`

`Premium Qualität`

`100% zuverlässig`

in zehn kleinen Pills.

---

### Keine KI-Gradienten

Keine:

- orange/blauen Glow-Blobs
- radialen Gradient-Kugeln
- Neon-Lichter
- Aurora-Hintergründe
- Mesh Gradients

---

### Keine SaaS-Cards

Nicht jede Information in eine Card setzen.

Keine typischen:

- 3 Karten nebeneinander
- Icon oben
- Heading
- zwei Sätze
- Learn More →

als universelle Lösung.

---

### Keine Bento-Grids als Selbstzweck

Ein Grid ist nur erlaubt, wenn es inhaltlich und fotografisch sinnvoll ist.

---

### Keine künstlichen Kennzahlen

Keine erfundenen Zahlen.

Keine erfundenen:

- Kundenanzahlen
- Gutachtenanzahlen
- Erfolgsquoten
- Reaktionszeiten
- Jahre Erfahrung
- Zertifizierungen
- Bewertungen
- Fahrzeugzahlen
- Standorte

---

### Keine generischen Marketingphrasen

Vermeide Sätze wie:

- „Ihre Zufriedenheit ist unser Anspruch.“
- „Qualität, auf die Sie vertrauen können.“
- „Ihr Partner rund ums Auto.“
- „Wir sind für Sie da.“
- „Innovative Lösungen für Ihre Bedürfnisse.“
- „Kompetenz trifft Leidenschaft.“

Texte müssen konkret auf Nurettin, seine Expertise, Unabhängigkeit und das konkrete Problem des Kunden eingehen.

---

### Keine visuelle Überladung

Die bisherige Seite wird als zu unruhig wahrgenommen.

Deshalb:

- weniger gleichzeitig sichtbare Elemente
- weniger UI-Chrome
- weniger kleine Labels
- weniger kleine Textblöcke
- weniger unterschiedliche Card-Arten
- mehr Ruhe
- mehr Bildfläche
- mehr klare Hierarchie

Wenn zwischen „etwas zu leer“ und „etwas zu voll“ gewählt werden muss:

> **lieber etwas leerer**

---

# 9. BILDSPRACHE

Die vorhandenen Bilder der bestehenden Kaltbrunn-Website stehen zur Verfügung.

## Priorität

1. gute vorhandene Originalbilder
2. zusätzliche hochwertige Automotive-Bilder, falls notwendig
3. Platzhalter, falls noch kein geeignetes finales Bild vorhanden ist

KI-generierte Bilder dürfen **nur als Platzhalter** verwendet werden.

Sie dürfen nicht als finale Produktionsbilder behandelt werden.

## Bildstil

Gesucht ist eine Mischung aus:

- hochwertiger Automotive-Fotografie
- Premiumfahrzeugen
- Nurettin bei der Arbeit
- Schadensaufnahme
- technischen Details
- Messmitteln
- Karosserie
- Fahrzeugdetails
- Nutzfahrzeugen
- Unfallfahrzeugen

Bilder sollen hochwertig, ruhig, real und glaubwürdig wirken.

## Unfallbilder

Unfallschäden dürfen gezeigt werden.

Aber:

- seriös
- ästhetisch komponiert
- nicht sensationsheischend
- keine übertriebene Crash-Ästhetik

## Marken / Logos

Auf Fahrzeugbildern sollen erkennbare Marken möglichst vermieden bzw. neutralisiert werden.

Bevorzugte Reihenfolge:

1. Bildausschnitt so wählen, dass Markenlogos nicht prominent sichtbar sind
2. falls nicht möglich: Logo sauber retuschieren / neutralisieren
3. keine billigen Blur-Balken

Kennzeichen grundsätzlich datenschutzfreundlich behandeln.

---

# 10. HEADER / NAVIGATION

## Desktop

Der Header soll zunächst **transparent über dem Hero** liegen.

Beim Scrollen:

- Übergang zu weißem Hintergrund
- bessere Lesbarkeit
- dezente Animation
- hochwertiges Sticky-Verhalten

Navigation darf etwas ausführlicher bleiben und sich an der vorhandenen Website orientieren.

Vorhandene Hauptpunkte:

- Leistungen
- Über mich
- Referenzen
- Warum ich
- Ihr Recht
- Kontakt

CTA:

- Gutachten anfragen
- alternativ direkter Kontakt

Der Header soll nicht wie ein SaaS-Dashboard aussehen.

## Mobile

Fullscreen-Menü.

Beim Öffnen:

- gesamte Bildschirmfläche
- große Navigation
- Telefonnummer / WhatsApp sichtbar
- klares Premium-Layout
- saubere Übergangsanimation

---

# 11. HERO

## Desktop

Hero grundsätzlich:

> **100vh**

Bevorzugt ein großflächiges Automotive-Motiv.

Die Anmutung darf sich an den Referenzen orientieren.

Der Hero soll wie eine echte Premium-Automotive-Kampagne wirken und nicht wie eine typische lokale Dienstleisterwebsite.

## Hauptmotiv

Priorität:

> **Nurettin + Fahrzeug**

Nurettin soll vorhanden sein, aber nicht als überdimensioniertes Personal-Branding-Portrait.

Das Fahrzeug und die Automotive-Welt bleiben visuell wichtig.

Alternative Motive können sein:

- Premiumfahrzeug
- Schadensaufnahme
- technische Begutachtung

## Hero Copy

Bestehende Aussage bleibt grundsätzlich erhalten.

Neue H1:

> **Vom Premium-Hersteller zum unabhängigen Gutachter in Heppenheim.**

Diese Formulierung ist verbindlich.

Die aktuelle Subheadline der bestehenden Website soll inhaltlich erhalten bleiben.

Die CTA sollen klar conversion-orientiert sein.

Primär:

- **Jetzt anrufen**

Sekundär:

- **Online-Anfrage senden**

WhatsApp darf zusätzlich sehr sichtbar sein.

## Mobile Hero

- großformatiges Hintergrundbild
- Text über dem Bild
- kein stumpfes Desktop-Layout, das nur enger gemacht wurde
- Kontrast muss perfekt funktionieren
- CTA im ersten Viewport gut erreichbar

---

# 12. DIREKT NACH DEM HERO

Nach dem Hero soll eine sehr reduzierte Vertrauens-/Faktenpassage folgen.

Kein klassischer vierteiliger SaaS-Stats-Strip.

Ziel:

Der Nutzer soll innerhalb weniger Sekunden verstehen:

- unabhängiger Sachverständiger
- Ingenieur
- technische Expertise
- direkter Ansprechpartner
- Heppenheim / Region
- im Schadenfall unkompliziert erreichbar

Dieser Bereich muss visuell ruhig bleiben.

---

# 13. „WIE AUS EINEM UNFALL EIN GUTACHTEN WIRD“

Die bestehende Story / Aussage soll erhalten bleiben.

Sie soll aber komplett neu inszeniert werden.

Kein generischer 1-2-3-4-Stepper.

Besser:

- Scroll-Story
- große Typografie
- Bilder / Detailaufnahmen
- reduzierte Textabschnitte
- kontrollierte GSAP-/Motion-Animation
- starke Dramaturgie

Der wichtige Kerngedanke der bestehenden Seite bleibt:

Nach einem Unfall versucht die Versicherung möglicherweise, einen eigenen Gutachter einzusetzen – der Geschädigte darf seinen eigenen unabhängigen Gutachter wählen.

Die Darstellung soll Vertrauen schaffen und den Besucher zur direkten Kontaktaufnahme führen.

---

# 14. LEISTUNGEN

Alle bestehenden Leistungen müssen erhalten bleiben.

Aktuelle Leistungsgruppen sind unter anderem:

- Schadengutachten
- Wertgutachten
- Nutzfahrzeuge & Fuhrpark
- Prüfung & Gegengutachten
- Technische Analysen
- Karosserievermessung
- Wohnmobil & Wohnwagen

Zusätzlich vorhandene Fahrzeugkategorien ebenfalls übernehmen.

## Darstellung

Bevorzugt:

> **wenige große bildstarke Cards / Copperlane-artige Service-Komposition**

Nicht sieben identische kleine SaaS-Karten.

Möglich:

- wichtige Leistungen als große Bildmodule
- weitere Leistungen in ruhigerem Grid
- Variation in Größe
- Editorial Layout
- hochwertige Automotive-Fotografie

Alle Leistungen müssen trotzdem einfach auffindbar sein.

---

# 15. ÜBER NURETTIN

Der Bereich soll bewusst kompakter sein als auf einer Personal-Branding-Seite.

Er dient primär als Vertrauenssignal.

Bestehende biografische Informationen übernehmen.

Dazu gehören insbesondere:

- Nurettin Sogukcesme
- Ingenieur / B. Eng.
- Kfz-Sachverständiger
- Hintergrund als Nutzfahrzeug-Mechatroniker
- Maschinenbaustudium
- Tätigkeit als Qualitätsingenieur bei einem Premium-Autohersteller
- fachliche Qualifikationen
- Sprachen

Die Premium-Hersteller-Vergangenheit sichtbar darstellen, aber nicht übertreiben.

Keine fremden Markenlogos prominent verwenden.

---

# 16. QUALIFIKATIONEN

Qualifikationen erhalten eine eigene hochwertige Sektion.

Bekannte Inhalte der bestehenden Seite müssen übernommen werden.

Dazu gehören beispielsweise:

- B. Eng. Maschinenbau
- VDA 6.3 Prozessauditor
- DGQ-Qualitätsmanager
- Elektrofachkraft für HV-Komponenten

Wenn später echte Zertifikate / Dokumente bereitgestellt werden, soll die Struktur deren Integration ermöglichen.

Keine Zertifikate erfinden.

---

# 17. „WARUM ICH“

Die vorhandenen Argumente sollen inhaltlich erhalten bleiben.

Dazu gehören:

- echte Unabhängigkeit
- Premium-Qualitätsstandard
- fundierte Beweissicherung
- direkter Draht

Keine Standard-4-Card-Sektion.

Besser beispielsweise:

- große typografische Argumente
- Bild/Text-Komposition
- Sticky Content
- wechselnde Bilddetails
- ruhiger Editorial-Aufbau

Keine Nummerierung `01 / 02 / 03 / 04` als dominantes Gestaltungselement.

---

# 18. RECHTLICHER SCHUTZ / IHR RECHT

Der bestehende Informationsbereich bleibt vollständig erhalten.

Behandelte Themen:

- freie Gutachterwahl
- Kostenübernahme bei unverschuldetem Unfall
- Schutz vor Kürzungen

Dieser Bereich muss besonders vertrauenswürdig und seriös wirken.

Kein Alarmismus.

Keine erfundenen juristischen Aussagen.

Vorhandene Inhalte nur hinsichtlich Rechtschreibung / Lesbarkeit anpassen.

Keine juristischen Fakten eigenständig erweitern.

---

# 19. GOOGLE REVIEWS / TESTIMONIALS

Google-Bewertungen sollen prominent integriert werden.

Aktuell zunächst:

> vorhandene Bewertungen übernehmen

Eine spätere technische Live-Anbindung soll möglich bleiben.

Stil:

> **Copperlane-artig / editorial + klar erkennbarer Google-Bezug**

Möglich:

- große einzelne Bewertung
- hochwertige Typografie
- Sterne
- Name / Google-Hinweis
- ruhige Transition

Kein typischer 3-Card-Testimonial-Slider.

---

# 20. STANDORT HEPPENHEIM

Heppenheim ist ein wichtiger lokaler Bezug und SEO-Faktor.

Die Standortsektion soll kombinieren:

- Foto aus Heppenheim / der Region
- hochwertige Typografie
- Karte
- Einzugsgebiet

SEO-Lokationen aus der bestehenden Seite beibehalten.

Besonders relevant:

- Heppenheim
- Kreis Bergstraße
- Bensheim
- Weinheim
- Mannheim
- Heidelberg
- Rhein-Neckar-Region

Die Sektion soll nicht wie eine lange SEO-Städteliste wirken.

---

# 21. KONTAKT / CONVERSION

Conversion ist Priorität Nummer 1.

Der Kontaktbereich muss deshalb sehr stark gestaltet werden.

## Kontaktwege

Priorität:

1. WhatsApp
2. Telefon
3. Formular
4. E-Mail

WhatsApp soll sehr prominent sein.

## Sticky WhatsApp

Ein Sticky WhatsApp-Button ist gewünscht.

Er soll:

- klar als WhatsApp erkennbar sein
- sich trotzdem in die visuelle Corporate Identity einfügen
- hochwertig wirken
- nicht wie ein billiges WordPress-Plugin aussehen

## Formular

Das bestehende Kontaktformular soll inhaltlich grundsätzlich erhalten bleiben.

Aktuelle Felder / Inhalte prüfen und migrieren.

Zusätzlich:

> **Upload von Schadensbildern ermöglichen**

Upload UX:

- Mobile zuerst denken
- Kamera / Fotomediathek einfach nutzbar
- mehrere Bilder möglich
- klar kommunizieren, welche Dateitypen / Größen erlaubt sind
- Uploadzustand sichtbar
- Datenschutz berücksichtigen

Keine unnötig komplizierte Multi-Step-Form.

---

# 22. KONTAKTDATEN

Die vorhandenen Daten der aktuellen Website exakt übernehmen.

Zum aktuellen Stand gehören:

**Ingenieurbüro Kaltbrunn**  
**Nurettin Sogukcesme**  
Mannheimer Straße 1  
64646 Heppenheim

Telefon:  
+49 176 37998836

E-Mail:  
info@ing-nuri.de

Öffnungszeiten:  
Mo–Fr 8:00–18:00 Uhr

Diese Daten niemals eigenständig ändern.

---

# 23. FOOTER

Der Footer darf sich stark an Copperlane orientieren.

Ziel:

- groß
- hochwertig
- Automotive / Editorial
- klare Navigation
- Kontakt
- Standort
- rechtliche Links

Nicht einfach eine kleine graue Standard-Footerleiste.

---

# 24. RECHTLICHE INHALTE

Impressum und Datenschutzerklärung der bestehenden Website müssen übernommen werden.

Die Inhalte nicht eigenständig neu formulieren oder juristisch ergänzen.

Bestehende Website ist Source of Truth.

Rechtliche Texte sollen visuell zugänglich bleiben, aber müssen nicht die Hauptseite optisch dominieren.

---

# 25. CONTENT-REGELN

## Verbindliche Source of Truth

Alle fachlichen Informationen stammen aus:

https://bilal-altu.github.io/kaltbrunn/index.html

## Erlaubt

- Rechtschreibung korrigieren
- Grammatik korrigieren
- unnötige Wiederholungen reduzieren
- Texte für Mobile verkürzen, wenn die vollständige Information weiterhin erreichbar bleibt
- Zeilenumbrüche optimieren
- Texte visuell besser portionieren

## Nicht erlaubt

- bestehende Fakten verändern
- Leistungen entfernen
- Qualifikationen erfinden
- Berufserfahrung erfinden
- Standorte erfinden
- Telefonnummern verändern
- Namen verändern
- Adressen verändern
- Bewertungen erfinden
- juristische Aussagen erfinden

## Wenn Informationen fehlen

1. bestehende Website nochmals prüfen
2. wenn dort keine belastbare Information existiert:
   `[INFORMATION FEHLT]`
3. nicht raten

---

# 26. RESPONSIVE DESIGN

Mobile ist genauso wichtig wie Desktop.

Die Website muss auf Mobile wie eine bewusst gestaltete mobile Experience aussehen.

Nicht:

> Desktop-Version verkleinern und alles untereinander stapeln.

## Mobile-Anforderungen

- Hero speziell komponieren
- Fullscreen Navigation
- große Tap Targets
- sticky WhatsApp
- Telefonnummer leicht erreichbar
- Kontaktformular einfach
- Schadensbilder direkt vom Smartphone hochladbar
- Bild-Crops pro Breakpoint
- Typografie neu umbrechen
- Abstände bewusst reduzieren
- Scroll-Animationen vereinfachen, wenn sie auf Mobile stören

---

# 27. MOTION / INTERACTION

Animationen:

> subtil bis hochwertig inszeniert

Gesucht:

- gute Page Entry Animation
- dezente Header Transition
- hochwertiges Image Reveal
- leichte Parallax-Effekte
- Scroll-Story beim Unfall-/Gutachten-Bereich
- sanfte Hover States
- kontrollierte Text-Reveals

Nicht:

- alles fade-in
- jedes Element von unten einfliegen lassen
- springende Cards
- übertriebene Magnet-Buttons
- Cursor-Effekte
- Neon Glows
- dauerhafte Bewegung

GSAP darf für einzelne stark inszenierte Scrollbereiche eingesetzt werden.

Motion / CSS für Microinteractions bevorzugen.

---

# 28. SEO

Primäre lokale SEO-Ziele:

- KFZ Gutachter Heppenheim
- KFZ Sachverständiger Heppenheim
- Unfallgutachten Heppenheim
- KFZ Gutachter Bergstraße
- KFZ Sachverständiger Bergstraße
- relevante Umgebung wie Bensheim und Rhein-Neckar

## Technische SEO

Umsetzen:

- korrekte semantische HTML-Struktur
- genau eine klare H1
- sinnvolle H2/H3
- Title
- Meta Description
- OpenGraph
- Canonical
- LocalBusiness / ProfessionalService Schema, soweit faktisch korrekt
- gute Alt-Texte
- saubere URLs
- Sitemap
- robots.txt
- strukturierte Kontaktdaten
- lokale Informationen natürlich einbauen

Kein Keyword-Stuffing.

---

# 29. ACCESSIBILITY

Accessibility Basics müssen sauber umgesetzt sein.

Mindestens:

- ausreichende Kontraste
- Tastaturnavigation
- sichtbare Focus States
- semantisches HTML
- Alt-Texte
- Formularlabels
- ARIA nur wo nötig
- `prefers-reduced-motion`
- keine Information ausschließlich über Farbe vermitteln

---

# 30. DARK MODE

Kein Dark-Mode-Schalter.

Die Seite darf jedoch bewusst zwischen:

- weißen
- blauen
- sehr dunklen

Sektionen wechseln.

Diese Wechsel sind Teil der visuellen Dramaturgie.

---

# 31. GEWÜNSCHTE SEITEN-DRAMATURGIE

Die genaue Geometrie darf anhand der Referenzen optimiert werden.

Bevorzugte Story:

### 01 – Header
Transparent über Hero.

### 02 – Hero
100vh, großflächige Automotive-Fotografie, Nurettin + Fahrzeug.

### 03 – Immediate Trust
Sehr kompakte Vertrauenssignale und direkte Erreichbarkeit.

### 04 – Unfall → Gutachten
Inszenierte Scroll-Story statt Standard-Prozesskarten.

### 05 – Leistungen
Bildstarkes Automotive-Service-Layout.

### 06 – Über Nurettin
Kompakter persönlicher Vertrauensblock.

### 07 – Qualifikationen
Technisch, ruhig, hochwertig.

### 08 – Warum unabhängig?
Bestehende „Warum ich“-Argumente in Editorial-Form.

### 09 – Ihr Recht
Seriöse rechtliche Aufklärung.

### 10 – Bewertungen
Google Reviews editorial inszeniert.

### 11 – Heppenheim / Region
Bild + Karte + lokaler Bezug.

### 12 – Conversion / Kontakt
WhatsApp, Telefon und Formular.

### 13 – Footer
Copperlane-inspiriertes großes Finale.

Diese Reihenfolge ist eine starke Vorgabe, aber kleine Anpassungen sind erlaubt, wenn dadurch Conversion, Story oder Responsive Design klar verbessert werden.

---

# 32. NICHT ZU VIEL TEXT IM ERSTEN VIEWPORT

Desktop darf ausführliche Inhalte enthalten.

Mobile soll Texte stärker reduzieren und besser portionieren.

Dabei darf keine relevante Information vollständig verschwinden.

Mögliche Lösungen:

- Akkordeons
- „Mehr erfahren“
- progressive Disclosure
- kürzere Introtexte
- lange Informationen weiter unten

Nicht jede Sektion braucht einen langen Einleitungstext.

---

# 33. VERTRAUEN VOR DEKORATION

Jede Designentscheidung muss mindestens eines verbessern:

- Vertrauen
- Conversion
- Verständlichkeit
- Premium-Wirkung
- technische Kompetenz

Wenn ein Element nur „cool“ aussieht, aber keine dieser Aufgaben erfüllt, entfernen.

---

# 34. ENTSCHEIDUNGSFREIHEIT DES BUILD-AGENTEN

Der Build-Agent hat **wenig Freiheit**.

Er darf selbst entscheiden:

- exakte Spacing-Werte
- Grid-Gaps
- kleine Breakpoint-Anpassungen
- Mikrotypografie
- technische Implementierungsdetails
- präzise Bild-Crops
- subtile Motion-Timings

Er darf nicht selbst entscheiden:

- neue Farben hinzufügen
- Leistungen entfernen
- neue Leistungen erfinden
- Markenstil verändern
- generische Cards hinzufügen
- große Textblöcke erfinden
- Fakten ändern
- Aussagen über Erfahrung erfinden
- neue Zertifizierungen hinzufügen
- neue Standorte erfinden
- neuen visuellen Stil wählen

---

# 35. DESIGN QUALITY CHECK

Vor Fertigstellung jede Sektion gegen folgende Fragen prüfen:

1. Könnte diese Sektion exakt so auf 50 anderen lokalen Dienstleister-Websites stehen?
   - Wenn ja: redesignen.

2. Sieht sie nach einem vorgefertigten Template aus?
   - Wenn ja: redesignen.

3. Gibt es unnötige Cards, Badges oder Icons?
   - Wenn ja: entfernen.

4. Ist zu viel gleichzeitig sichtbar?
   - Wenn ja: reduzieren.

5. Ist die Fotografie hochwertig genug?
   - Wenn nein: bessere Bildauswahl.

6. Ist TÜV-Blau dominant und Orange nur gezielt eingesetzt?
   - Wenn nein: korrigieren.

7. Ist der nächste sinnvolle Kontaktweg jederzeit leicht erreichbar?
   - Wenn nein: Conversion verbessern.

8. Wirkt Nurettin wie ein unabhängiger technischer Experte und nicht wie eine austauschbare KFZ-Werkstatt?
   - Wenn nein: Positionierung verbessern.

9. Funktioniert die Sektion Mobile genauso hochwertig?
   - Wenn nein: separat für Mobile gestalten.

10. Wurde irgendein Fakt erfunden?
    - Wenn ja: sofort entfernen.

---

# 36. FINALES QUALITÄTSZIEL

Die fertige Seite soll beim ersten Eindruck vermitteln:

> **„Das sieht wie eine individuell entwickelte 10.000-€-Website für einen modernen KFZ-Sachverständigen aus.“**

Gleichzeitig soll sie wirken wie:

> **ein moderner unabhängiger TÜV-/DEKRA-Konkurrent**

und:

> **ein hochwertiges deutsches Ingenieurbüro mit Automotive-DNA**

Sie darf nicht aussehen wie:

- eine KI-generierte Website
- eine SaaS-Landingpage
- ein 0815-Astro-/Tailwind-Template
- eine typische WordPress-Handwerkerseite
- ein ThemeForest-Theme
- eine Agentur-Demo
- eine Werkstatt-Template-Seite

---

# 37. WICHTIGSTE ABSCHLUSSREGEL

**Nicht die bestehende Website „verschönern“.**

Die bestehende Website dient nur als inhaltliche Basis.

Das neue Projekt soll visuell und strukturell wie ein **komplettes Redesign von Grund auf** behandelt werden.

Behalte:

- Inhalt
- Expertise
- Leistungen
- Kontaktdaten
- Fakten
- Qualifikationen
- rechtliche Inhalte

Ersetze:

- Layout
- visuelle Hierarchie
- Komposition
- Sektionen
- Kartenstruktur
- Animation
- Typografie-System
- Bildinszenierung
- Navigationserlebnis
- Mobile Experience

durch ein neues, ruhiges, technisch präzises und hochwertiges Automotive-Design.

**Conversion zuerst. Premium direkt danach.**
