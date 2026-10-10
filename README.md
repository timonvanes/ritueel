# Ritueel

Persoonlijke huid- en haarroutine tracker. Next.js app, data in Vercel KV (Upstash Redis).

## Eenmalige setup op Vercel

1. Ga naar [vercel.com/new](https://vercel.com/new) en importeer deze repository (`timonvanes/ritueel`).
2. Deploy zonder extra instellingen — de eerste build werkt ook nog zonder database (de API's falen dan pas bij gebruik).
3. Ga in het Vercel-project naar **Storage → Create Database → KV** (Upstash Redis) en koppel hem aan dit project. Vercel zet de benodigde env vars (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, ...) automatisch klaar.
4. Redeploy het project (Vercel doet dit meestal automatisch na het koppelen van de database).
5. Zet in **Settings → Environment Variables** een `AUTH_USER` en `AUTH_PASS` om de site achter een login te zetten — zonder deze twee variabelen is de app voor iedereen met de link te openen (geen inlogscherm).
6. *(optioneel, voor meldingen)* zie hieronder.

Daarna deployt elke `git push` naar de `main`-branch automatisch opnieuw.

## Meldingen (push-notificaties)

Elke dag om 7:00 en 22:00 (Europe/Amsterdam-tijd, automatisch correct met zomer-/wintertijd) stuurt de app een melding "Vergeet het niet" naar elk toestel dat zich heeft aangemeld via **Instellingen → Meldingen aanzetten** in de app.

Setup:

1. Genereer eenmalig een VAPID-sleutelpaar (nodig om browser-pushberichten te mogen versturen):
   ```bash
   npx web-push generate-vapid-keys
   ```
2. Zet in Vercel **Settings → Environment Variables**:
   - `VAPID_PUBLIC_KEY`
   - `VAPID_PRIVATE_KEY`
   - `VAPID_SUBJECT` — bv. `mailto:jouw@email.nl`
3. Redeploy.
4. `vercel.json` bevat twee Cron Jobs (1x per dag, toegestaan op het gratis Hobby-plan) die `/api/push/tick` aanroepen op tijden die zo gekozen zijn dat ze zowel in de winter- als zomertijd binnen een uur van 7:00/22:00 lokale tijd vallen (Vercel Cron Jobs draaien altijd in UTC, niet tijdzone-bewust); die route bepaalt zelf of het echt rond 7:00 of 22:00 lokale tijd is en verstuurt dan, maar nooit twee keer per dag per moment. De GitHub Action in `.github/workflows/push-reminders.yml` is handmatig (workflow_dispatch) — niet meer op een schema, want GitHub's eigen onbetrouwbare timing op zo'n schema zorgde er juist voor dat meldingen op willekeurige tijden aankwamen in plaats van rond 7:00/22:00.
5. Op je telefoon: zet de app eerst op het beginscherm (vereist voor push op iOS), open hem van daaruit, en tik in **Instellingen** op "Meldingen aanzetten".

## Lokaal draaien

```bash
npm install
npm run dev
```

Zonder Vercel KV-omgevingsvariabelen werkt de UI, maar falen de opslag-calls (je ziet dan de "kon geen verbinding maken"-banner). Koppel `vercel env pull` om lokaal met dezelfde KV-database te werken.

## Geschiedenis exporteren

**Instellingen → Exporteer naar CSV** downloadt de volledige historie (elke dag ooit gelogd: wat is afgevinkt, overgeslagen, en de dagnotitie) als CSV-bestand, te openen in Excel/Google Sheets.

**Instellingen → Exporteer producten (CSV)** downloadt per product de korte naam, volledige productnaam en ingrediëntenlijst (zoals ingevuld bij het bewerken van een product), handig om in één keer met AI te laten analyseren.

## Ochtend + Avond onafhankelijk van elkaar

Een product dat zowel 's ochtends als 's avonds gepland staat (bv. een cleanser) heeft twee losse vinkjes: afvinken in de Ochtend-kaart vinkt hem niet automatisch ook af voor Avond, en andersom. "Sla over" en "Stel uit" blijven wel voor de hele dag gelden (voor beide momenten samen), maar het daadwerkelijk afvinken is per moment.

## Een stap uitstellen

Bij een stap die aan de beurt is kun je naast "Sla over" ook "Stel uit" kiezen: die stap verdwijnt dan voor vandaag en komt morgen (los van zijn normale schema) gegarandeerd weer als "aan de beurt" terug, totdat je hem afvinkt of overslaat.

## Producten die niet mogen combineren

Bij een product kun je onder "Conflicteert met" (een dropdown, meerdere te selecteren) aangeven welke andere producten niet op dezelfde dag mogen (bv. retinol en zelftanner). Dit geldt automatisch ook omgekeerd: zet je bij retinol dat die conflicteert met zelftanner, dan staat zelftanner's eigen "Conflicteert met" er ook meteen bij — je hoeft het niet aan beide kanten apart in te stellen. Komen twee conflicterende producten toch op dezelfde dag uit, dan wint automatisch wie het langst geleden is gedaan (of nog nooit); de ander krijgt die dag een duidelijke "Conflicteert vandaag met …"-melding te zien in plaats van een aanvinkbare stap, en komt de volgende dag vanzelf weer gewoon aan de beurt. Dit wordt elke keer opnieuw uitgerekend op basis van de echte geschiedenis, dus het past zich automatisch aan als het schema verschuift.

## Verdeling tussen gekoppelde producten

Bij "Gekoppeld aan ander product" (bv. conditioner/masker na shampoo) stel je de verdeling in op twee manieren, te kiezen boven de verdeling:

- **Percentage** — een schuifje per product dat aan hetzelfde doel gekoppeld is, inclusief het product dat je op dat moment bewerkt. Schuif je conditioner naar 67%, dan schuift masker automatisch mee naar 33% — samen altijd precies 100%. Bij 3 of meer gekoppelde producten schuiven de andere proportioneel mee.
- **Delen** — typ per product een heel getal (bv. masker = 1, conditioner = 2); het totaal (hier 3) is automatisch de noemer, dus dat is 1/3 en 2/3. Handig als je liever in "1 op de zoveel keer" denkt dan in procenten.

Beide manieren leveren dezelfde onderliggende breuk op — percentages werken ook voor verhoudingen die geen mooie breuk zijn (bv. 25%: dat is gewoon 1 op de 4 keer, geen probleem). De verdeling wordt, net als bij conflicten, elke keer vers berekend uit de echte geschiedenis — kies je een keer iets anders dan voorgesteld, dan schuift de rest zich automatisch bij.

## Databasemodel

- `steps` — array met alle routine-stappen (naam, volledige productnaam, ingrediëntenlijst, categorie-id, moment — array met `ochtend` en/of `avond` — dagen/herhaling, `conflictsWith` — ids van producten die niet dezelfde dag mogen, `ratioN`/`ratioOf` bij gekoppelde producten, notitie). Wordt bij de eerste aanvraag automatisch gevuld met de huidige routine.
- `categories` — array met categorieën (`{id, name}`), begint met Huid en Haar; voeg je eigen categorie toe via het "+ Nieuw"-knopje bij een product.
- `log:<YYYY-MM-DD>` — per dag welke stappen zijn afgevinkt (`done`), welke zijn overgeslagen (`skipped`), welke zijn uitgesteld naar een latere datum (`postponed`), het totaal aantal toepasselijke stappen die dag, en een vrije dagnotitie (`note`).
- `push_subs` — geregistreerde push-abonnementen per toestel.
- `push_sent:<slot>:<YYYY-MM-DD>` — houdt bij of de melding voor "morning"/"evening" die dag al is verstuurd.
