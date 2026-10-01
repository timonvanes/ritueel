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
4. `vercel.json` bevat twee Cron Jobs (1x per dag, toegestaan op het gratis Hobby-plan) die `/api/push/tick` aanroepen; die route bepaalt zelf of het echt rond 7:00 of 22:00 lokale tijd is (met marge voor zomer-/wintertijd) en verstuurt dan, maar nooit twee keer per dag per moment. De GitHub Action in `.github/workflows/push-reminders.yml` roept dezelfde route vaker aan als extra backup.
5. Op je telefoon: zet de app eerst op het beginscherm (vereist voor push op iOS), open hem van daaruit, en tik in **Instellingen** op "Meldingen aanzetten".

## Lokaal draaien

```bash
npm install
npm run dev
```

Zonder Vercel KV-omgevingsvariabelen werkt de UI, maar falen de opslag-calls (je ziet dan de "kon geen verbinding maken"-banner). Koppel `vercel env pull` om lokaal met dezelfde KV-database te werken.

## Geschiedenis exporteren

**Instellingen → Exporteer naar CSV** downloadt de volledige historie (elke dag ooit gelogd: wat is afgevinkt, overgeslagen, en de dagnotitie) als CSV-bestand, te openen in Excel/Google Sheets.

## Databasemodel

- `steps` — array met alle routine-stappen (naam, categorie-id, moment — array met `ochtend` en/of `avond` — dagen/herhaling, notitie). Wordt bij de eerste aanvraag automatisch gevuld met de huidige routine.
- `categories` — array met categorieën (`{id, name}`), begint met Huid en Haar; voeg je eigen categorie toe via het "+ Nieuw"-knopje bij een product.
- `log:<YYYY-MM-DD>` — per dag welke stappen zijn afgevinkt (`done`), welke zijn overgeslagen (`skipped`), het totaal aantal toepasselijke stappen die dag, en een vrije dagnotitie (`note`).
- `push_subs` — geregistreerde push-abonnementen per toestel.
- `push_sent:<slot>:<YYYY-MM-DD>` — houdt bij of de melding voor "morning"/"evening" die dag al is verstuurd.
