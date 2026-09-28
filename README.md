# Ritueel

Persoonlijke huid- en haarroutine tracker. Next.js app, data in Vercel KV (Upstash Redis).

## Eenmalige setup op Vercel

1. Ga naar [vercel.com/new](https://vercel.com/new) en importeer deze repository (`timonvanes/ritueel`).
2. Deploy zonder extra instellingen — de eerste build werkt ook nog zonder database (de API's falen dan pas bij gebruik).
3. Ga in het Vercel-project naar **Storage → Create Database → KV** (Upstash Redis) en koppel hem aan dit project. Vercel zet de benodigde env vars (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, ...) automatisch klaar.
4. Redeploy het project (Vercel doet dit meestal automatisch na het koppelen van de database).
5. *(optioneel, aanbevolen)* Zet in **Settings → Environment Variables** een `AUTH_USER` en `AUTH_PASS` om de site achter een wachtwoord te zetten — zonder deze twee variabelen is de app voor iedereen met de link te openen.

Daarna deployt elke `git push` naar de `main`-branch automatisch opnieuw.

## Lokaal draaien

```bash
npm install
npm run dev
```

Zonder Vercel KV-omgevingsvariabelen werkt de UI, maar falen de opslag-calls (je ziet dan de "kon geen verbinding maken"-banner). Koppel `vercel env pull` om lokaal met dezelfde KV-database te werken.

## Databasemodel

- `steps` — array met alle routine-stappen (naam, categorie huid/haar, moment ochtend/avond, dagen van de week, notitie). Wordt bij de eerste aanvraag automatisch gevuld met de huidige routine.
- `log:<YYYY-MM-DD>` — per dag welke stappen zijn afgevinkt (`done`), welke zijn overgeslagen (`skipped`) en het totaal aantal toepasselijke stappen die dag.
