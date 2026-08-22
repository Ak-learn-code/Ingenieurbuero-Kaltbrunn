# Content-Ledger – Ingenieurbüro Kaltbrunn

Stand: 22. August 2026  
Geltungsbereich: Phase 0 und Phase 1 der Astro-Migration  
Verbindliche Gestaltungs- und Inhaltsvorgabe: `KALTBRUNN_REDESIGN_MASTERPROMPT.md`

## Statuslegende

- `VERBINDLICH`: muss inhaltlich übernommen werden.
- `MASTERPROMPT`: der Masterprompt überschreibt einen abweichenden Legacy-Stand.
- `HISTORISCH REKONSTRUIERT`: ursprünglicher Wortlaut ist eindeutig in der Git-Historie belegt.
- `RECHTLICH UNVERÄNDERT`: nur wortgleich migrieren; keine eigenständige juristische Ergänzung.
- `INFORMATION FEHLT`: nicht raten, nicht erfinden und nicht sichtbar als Tatsache ausgeben.
- `ASSET FEHLT`: benötigtes Produktionsasset ist im Repository nicht vorhanden.

## Quellenhierarchie

1. `KALTBRUNN_REDESIGN_MASTERPROMPT.md` für verbindliche Redesign-, Inhalts- und Qualitätsentscheidungen.
2. Aktueller Stand von `index.html`, `referenzen.html` und `bau_referenzen.py` für bestehende Fakten und aktuelle Texte.
3. Dokumentierte historische Inhalte aus der Git-Historie, wenn der Masterprompt ihre Wiederaufnahme ausdrücklich verlangt.
4. `README.md` für Herkunft, Entscheidungsverlauf, Prüfhinweise und bekannte offene Punkte.

Historische Hauptquelle für die wiederaufgenommenen Inhalte:

- Commit `f4940c78f076227a3c7ac960397427a98a5e79ce` – „Anriss füllt genau eine Bildschirmhöhe“.
- Die Texte wurden aus `index.html` dieses Commits rekonstruiert und mit den späteren Diffs abgeglichen.

## Unternehmensdaten

| ID                       | Inhalt                         | Status      | Quelle                                        |
| ------------------------ | ------------------------------ | ----------- | --------------------------------------------- |
| `business.name`          | Ingenieurbüro Kaltbrunn        | VERBINDLICH | Masterprompt §22; `index.html`                |
| `business.owner`         | Nurettin Sogukcesme            | VERBINDLICH | Masterprompt §15/§22; `index.html`            |
| `business.street`        | Mannheimer Straße 1            | VERBINDLICH | Masterprompt §22; `index.html`                |
| `business.postalCode`    | 64646                          | VERBINDLICH | Masterprompt §22; `index.html`                |
| `business.city`          | Heppenheim                     | VERBINDLICH | Masterprompt §22; `index.html`                |
| `business.phone.display` | +49 176 37998836               | VERBINDLICH | Masterprompt §22; `index.html`                |
| `business.phone.e164`    | +4917637998836                 | VERBINDLICH | `tel:`- und WhatsApp-Verweise in `index.html` |
| `business.email`         | info@ing-nuri.de               | VERBINDLICH | Masterprompt §22; `index.html`                |
| `business.openingHours`  | Mo–Fr 8:00–18:00 Uhr           | VERBINDLICH | Masterprompt §22; `index.html`                |
| `business.claim`         | Kfz-Gutachten mit Sachverstand | VERBINDLICH | `README.md`; `index.html`                     |

## Hero und Conversion

| ID                   | Inhalt                                                                                                                                                                        | Status                                           | Quelle           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------- |
| `hero.heading`       | Vom Premium-Hersteller zum unabhängigen Gutachter in Heppenheim.                                                                                                              | MASTERPROMPT                                     | Masterprompt §11 |
| `hero.legacyHeading` | Ihr Unfall. Ihr Recht. Mein unabhängiges Gutachten schützt Ihr Geld.                                                                                                          | VERBINDLICH ALS LEGACY-QUELLE, NICHT ALS NEUE H1 | `index.html`     |
| `hero.subheading`    | Ihr freier Kfz-Sachverständiger im Kreis Bergstraße sowie im Rhein-Main- und Rhein-Neckar-Gebiet. Absolut weisungsfrei, fachlich kompromisslos und direkt für Sie erreichbar. | VERBINDLICH                                      | `index.html`     |
| `hero.primaryCta`    | Jetzt anrufen                                                                                                                                                                 | MASTERPROMPT                                     | Masterprompt §11 |
| `hero.secondaryCta`  | Online-Anfrage senden                                                                                                                                                         | MASTERPROMPT                                     | Masterprompt §11 |
| `contact.priority`   | WhatsApp → Telefon → Formular → E-Mail                                                                                                                                        | MASTERPROMPT                                     | Masterprompt §21 |

Hinweis: `README.md` dokumentiert, dass die neue Masterprompt-H1 in einem früheren Stand wegen einer möglicherweise fortlaufenden Tätigkeit beim Hersteller ersetzt wurde. Der Masterprompt legt den Wortlaut dennoch verbindlich fest. Die faktische Freigabe bleibt ein Content-Gate vor Veröffentlichung; der Wortlaut wird nicht eigenständig geändert.

## Vertrauensdaten aus dem Legacy-Stand

| ID                   | Inhalt                                    | Status                                   | Quelle                                             |
| -------------------- | ----------------------------------------- | ---------------------------------------- | -------------------------------------------------- |
| `trust.experience`   | 15+ Jahre Branchenerfahrung               | VERBINDLICH VORHANDEN; DARSTELLUNG OFFEN | `index.html`; laut `README.md` am 22.08. bestätigt |
| `trust.independence` | 100% unabhängige Gutachten                | VERBINDLICH VORHANDEN; DARSTELLUNG OFFEN | `index.html`; laut `README.md` am 22.08. bestätigt |
| `trust.firstContact` | Erstkontakt innerhalb 24 Stunden          | VERBINDLICH VORHANDEN; DARSTELLUNG OFFEN | `index.html`; `README.md`                          |
| `trust.noCost`       | Unverschuldet? Dann zahlt die Gegenseite. | VERBINDLICH VORHANDEN                    | `index.html`                                       |

Diese Angaben dürfen wegen der Anti-AI-Slop-Regeln nicht automatisch wieder als Kennzahlenleiste erscheinen.

## Biografie

| ID                | Inhalt                                                                                                                                                                                                                                 | Status                   | Quelle                                                         |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------- |
| `about.role`      | Ingenieur · Kfz-Sachverständiger                                                                                                                                                                                                       | VERBINDLICH              | `index.html`                                                   |
| `about.intro`     | Vom Blaumann im Nutzfahrzeug-Betrieb über das Maschinenbaustudium bis hin zum Qualitätsingenieur bei einem Premium-Automobilhersteller: Mein Weg zeichnet sich durch pure Begeisterung für Fahrzeugtechnik aus.                        | VERBINDLICH              | `index.html`                                                   |
| `about.body`      | Als Ihr unabhängiger Kfz-Sachverständiger bringe ich diese gebündelte Expertise direkt zu Ihnen. Ob nach einem Unfall, für eine Wertermittlung oder bei technischen Unklarheiten – ich sichere Ihre Ansprüche mit absoluter Präzision. | VERBINDLICH              | `index.html`                                                   |
| `about.education` | Nutzfahrzeug-Mechatroniker, danach B. Eng. Maschinenbau                                                                                                                                                                                | VERBINDLICH              | `index.html`                                                   |
| `about.languages` | Deutsch, Türkisch, Kurdisch, Englisch                                                                                                                                                                                                  | HISTORISCH REKONSTRUIERT | Commit `f4940c78…`; vom Masterprompt §15 ausdrücklich verlangt |

## Qualifikationen

| ID                                    | Inhalt                              | Status            | Quelle                                 |
| ------------------------------------- | ----------------------------------- | ----------------- | -------------------------------------- |
| `qualification.mechanicalEngineering` | B. Eng. Maschinenbau                | VERBINDLICH       | Masterprompt §16; `index.html`         |
| `qualification.vda`                   | VDA 6.3 Prozessauditor              | VERBINDLICH       | Masterprompt §16; `index.html`         |
| `qualification.dgq`                   | DGQ-Qualitätsmanager                | VERBINDLICH       | Masterprompt §16; `index.html`         |
| `qualification.highVoltage`           | Elektrofachkraft für HV-Komponenten | VERBINDLICH       | Masterprompt §16; `index.html`         |
| `qualification.documents`             | Echte Zertifikatsdateien            | INFORMATION FEHLT | Keine Zertifikatsdateien im Repository |

## Leistungen

### Aktueller Wortlaut

| ID                          | Titel                      | Beschreibung                                                                                                                                                                                                                                           | Status      | Quelle       |
| --------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ------------ |
| `service.damageAssessment`  | Schadengutachten           | Haftpflicht- und Kaskoschäden. Ich halte den Schaden vollständig und neutral fest, damit Sie bekommen, was Ihnen zusteht. War der Unfall unverschuldet, zahlt das Gutachten in aller Regel die gegnerische Versicherung – für Sie bleibt es kostenlos. | VERBINDLICH | `index.html` |
| `service.valueAssessment`   | Wertgutachten              | Für Kauf, Verkauf oder Versicherung. Ein belastbarer Wert, den Sie einem Käufer, einem Verkäufer oder Ihrer Versicherung vorlegen können.                                                                                                              | VERBINDLICH | `index.html` |
| `service.technicalAnalysis` | Technische Analysen        | Bei komplexen Fehlerbildern. Wenn nicht klar ist, was die Ursache war, gehe ich der Sache technisch auf den Grund und leite die Bewertung nachvollziehbar her.                                                                                         | VERBINDLICH | `index.html` |
| `service.counterAssessment` | Prüfung und Gegengutachten | Bei strittigen Fällen. Liegt bereits ein Gutachten vor, das Ihnen nicht schlüssig erscheint, prüfe ich es und halte dagegen, wo es nötig ist.                                                                                                          | VERBINDLICH | `index.html` |

### Historisch eindeutig rekonstruierter Wortlaut

| ID                             | Titel                    | Beschreibung                                                                                                                                                                                               | Status                   | Quelle                               |
| ------------------------------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------ |
| `service.commercialVehicles`   | Nutzfahrzeuge & Fuhrpark | LKW, Transporter, Busse und Anhänger. Angefangen habe ich als Nutzfahrzeug-Mechatroniker – hier bin ich zu Hause. Dazu die technische Betreuung ganzer Flotten, planbar und mit einem Auge auf die Kosten. | HISTORISCH REKONSTRUIERT | Commit `f4940c78…`; Masterprompt §14 |
| `service.bodyMeasurement`      | Karosserievermessung     | Millimetergenaue Vermessung der Karosserie: Unfallschäden nachweisen, verdeckte Vorschäden finden, Reparaturen kontrollieren.                                                                              | HISTORISCH REKONSTRUIERT | Commit `f4940c78…`; Masterprompt §14 |
| `service.recreationalVehicles` | Wohnmobil & Wohnwagen    | Ein eigenes Kapitel: Schaden bewerten, Wert ermitteln, Technik beurteilen.                                                                                                                                 | HISTORISCH REKONSTRUIERT | Commit `f4940c78…`; Masterprompt §14 |

### Fahrzeugkategorien

- PKW
- Wohnwagen & Wohnmobil
- Motorrad
- LKW, Bus & Transporter

Status: `HISTORISCH REKONSTRUIERT`. Quelle: Git-Historie vor Commit `7374e22`; Masterprompt §14 verlangt vorhandene Fahrzeugkategorien.

## Warum ich

| ID                    | Titel                     | Beschreibung                                                                                                              | Status                   | Quelle                               |
| --------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------ |
| `why.independence`    | Echte Unabhängigkeit      | Ich arbeite ausschließlich für Sie als Fahrzeughalter, für Anwälte oder Gerichte – niemals im Auftrag von Versicherungen. | HISTORISCH REKONSTRUIERT | Commit `f4940c78…`; Masterprompt §17 |
| `why.premiumStandard` | Premium-Qualitätsstandard | Durch meine Tätigkeit als Qualitätsingenieur und Auditor kenne ich die strengsten Standards der Automobilindustrie.       | HISTORISCH REKONSTRUIERT | Commit `f4940c78…`; Masterprompt §17 |
| `why.evidence`        | Fundierte Beweissicherung | Ich ermittle Schadensursachen lückenlos, leite Bewertungen logisch her und dokumentiere alles rechtssicher.               | HISTORISCH REKONSTRUIERT | Commit `f4940c78…`; Masterprompt §17 |
| `why.directContact`   | Direkter Draht            | Bei mir gibt es kein Callcenter. Wenn Sie anrufen, sprechen Sie direkt mit mir – Ihrem Experten.                          | HISTORISCH REKONSTRUIERT | Commit `f4940c78…`; Masterprompt §17 |

## Ihr Recht

| ID                    | Titel                                   | Inhalt                                                                                                                                                                                                                                       | Status                | Quelle       |
| --------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------ |
| `rights.intro`        | Ihr gutes Recht bei einem Unfallschaden | Ein Unfall bringt ohnehin schon genug Ärger mit sich. Umso wichtiger ist ein Partner, dem Sie blind vertrauen können. Da ich vollkommen weisungsfrei und unabhängig von Versicherungsgesellschaften agiere, steht allein Ihr Recht im Fokus. | VERBINDLICH           | `index.html` |
| `rights.freeChoice`   | Freie Gutachterwahl                     | Bei einem unverschuldeten Unfall (Haftpflichtschaden) haben Sie das gesetzliche Recht, Ihren Gutachter selbst zu wählen.                                                                                                                     | RECHTLICH UNVERÄNDERT | `index.html` |
| `rights.costCoverage` | Kostenübernahme                         | Die Kosten für mein unabhängiges Gutachten müssen in diesem Fall von der Versicherung des Unfallverursachers getragen werden.                                                                                                                | RECHTLICH UNVERÄNDERT | `index.html` |
| `rights.protection`   | Schutz vor Kürzungen                    | Versicherungen versuchen oft, den Schaden eigenmächtig herunterzurechnen – mein Gutachten schützt Sie vor finanziellen Verlusten.                                                                                                            | RECHTLICH UNVERÄNDERT | `index.html` |

## Unfall-zu-Gutachten-Erzählung

Verbindliche Kernaussagen:

1. Es dauert eine Sekunde.
2. Danach schickt die Versicherung des anderen ihren Gutachter.
3. Sie dürfen Ihren eigenen wählen.
4. Und der bin ich.
5. Freie Gutachterwahl. Für Sie entstehen keine Kosten.

Status: `VERBINDLICH`. Quelle: `index.html`; Masterprompt §13. Die alte gezeichnete Animation ist keine verbindliche Darstellungsform.

## Regionen und lokales SEO

Verbindlich vorhanden:

- Heppenheim
- Kreis Bergstraße
- Bensheim
- Lorsch
- Bürstadt
- Viernheim
- Weinheim
- Mannheim
- Heidelberg
- Rhein-Neckar-Region
- Rhein-Main-Gebiet
- Darmstadt
- Frankfurt am Main

Quelle: `index.html` und dessen JSON-LD. Die im Masterprompt besonders priorisierten Orte werden nicht durch neue Orte ergänzt.

## Kontaktformular

Aktuelle Felder:

- Name – erforderlich
- Telefonnummer – erforderlich
- E-Mail-Adresse – erforderlich
- Kennzeichen / Fahrzeug – optional
- Ihre Nachricht – erforderlich
- Datenschutzeinwilligung – erforderlich

Masterprompt-Erweiterung:

- mehrere Schadensbilder hochladen
- Mobile-Kamera/Fotomediathek
- Dateitypen und Größen kommunizieren
- Uploadstatus anzeigen

Status des Upload-Backends: `INFORMATION FEHLT`. Hosting, Empfänger, Speicherort, Aufbewahrung, Dateitypen, Größenlimits und Spam-Schutz sind nicht festgelegt.

## Referenzen

Sieben echte Fälle sind verbindlich vorhanden. Primärquelle für strukturierte Texte ist `bau_referenzen.py` (`FAELLE`), nicht das generierte `referenzen.html`.

1. BMW X1 – Streifschaden über beide Türen – Februar 2026
2. Toyota Corolla Hybrid – Lenkachse gebrochen – Januar 2025
3. Toyota Corolla Hybrid – Heckstoßfänger, Detailaufnahme – August 2024
4. Mercedes-Benz E-Klasse – Front rechts – Juli 2025
5. BMW – Detailaufnahme mit Dellensegel – Mai 2025
6. Audi A5 – Front, Aufnahme mit Maßstab – Juli 2024
7. Audi A6 – Heckschaden mit starker Deformation – Juni 2024

Langtexte und Alt-Texte werden in der Astro-Content-Collection wortgleich übernommen.

## Rechtliche Inhalte

- Impressum: `RECHTLICH UNVERÄNDERT`, Quelle `index.html#impressum`.
- Datenschutzerklärung: `RECHTLICH UNVERÄNDERT`, Quelle `index.html#datenschutz`.
- Die aktuelle Erklärung beschreibt ausdrücklich eine Website ohne externe Dienste.
- Bild-Upload, Live-Google-Bewertungen oder eine externe Karte würden diese tatsächliche Lage verändern und benötigen vor Veröffentlichung eine autorisierte rechtliche Aktualisierung.
- Laut `README.md` fehlen beziehungsweise sind zu klären: USt-IdNr./Kleinunternehmerstatus und Berufshaftpflichtversicherung.

## Fehlende Informationen und Assets

| ID                         | Fehlender Inhalt                                          | Status            |
| -------------------------- | --------------------------------------------------------- | ----------------- |
| `reviews.items`            | Echte Google-Bewertungstexte, Namen, Sterne und Freigaben | INFORMATION FEHLT |
| `location.photo`           | Echtes Foto aus Heppenheim/Region                         | ASSET FEHLT       |
| `location.map`             | Freigegebene Kartenlösung                                 | INFORMATION FEHLT |
| `hero.productionImage`     | Hochwertiges finales Motiv Nurettin + Fahrzeug            | ASSET FEHLT       |
| `about.workImages`         | Nurettin bei Begutachtung/Schadensaufnahme                | ASSET FEHLT       |
| `qualifications.documents` | Echte Zertifikatsdateien                                  | ASSET FEHLT       |
| `form.backend`             | Verarbeitungs- und Speicherlösung für Anfrage und Upload  | INFORMATION FEHLT |
| `deployment.domain`        | Finale neue Domain                                        | INFORMATION FEHLT |
| `legal.insurance`          | Berufshaftpflichtangaben                                  | INFORMATION FEHLT |
| `legal.vat`                | USt-IdNr. oder bestätigter Kleinunternehmerstatus         | INFORMATION FEHLT |

## Asset-Source-of-Truth

- `fotos/original/*.jpg`: nicht veröffentlichte Originalablage; niemals durch optimierte Derivate ersetzen.
- `fotos/*.webp`: vorhandene veröffentlichungsfähige Derivate und Responsive-Größen.
- Root-`WhatsApp Image … .jpeg`: bytegleiche Duplikate der sieben Originale; bis auf ausdrückliche Freigabe nicht löschen.
- `marke/vorlage/logo_nurettin.webp`: Ursprungsreferenz der Marke.
- `marke/k.svg`: verwendbares Monogramm.
- `marke/wagen.svg`, `marke/auto.svg`, `marke/mensch.svg`, `marke/skizze.svg`, `marke/stadt.svg`: Legacy-/Animationsassets; erhalten, aber nicht automatisch Teil des Redesigns.
- In `index.html` eingebettete Portraits: 256 × 256 und 570 × 760 Pixel; in Phase 1 als benannte Kopien organisiert, Legacy-HTML bleibt unverändert.

## Anti-AI-Slop-Migrationsregeln

- Keine Inhalte als Karten, Pills, Badges, Icons oder Kennzahlen formatieren, nur weil der Legacy-Stand das tut.
- Keine neuen Zahlen, Leistungen, Bewertungen, Zertifikate, Orte oder juristischen Behauptungen.
- Kein sichtbarer Inhalt aus diesem Ledger wird in Phase 1 als Website-Sektion implementiert.
- Architektur und Contentmodell dürfen keine spätere Standard-Card-Darstellung erzwingen.
- Jede spätere Sektion benötigt eine eigene Prüfung gegen die Anti-AI-Slop Constitution des Masterprompts.
