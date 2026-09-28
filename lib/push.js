import webpush from "web-push";
import { Redis } from "@upstash/redis";

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const kv = url && token ? new Redis({ url, token }) : null;

const SUBS_KEY = "push_subs";

function vapidReady() {
  return Boolean(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY);
}

function configureWebPush() {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:admin@example.com",
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

export async function addSubscription(sub) {
  if (!kv || !sub || !sub.endpoint) return;
  const all = (await kv.get(SUBS_KEY)) || {};
  all[sub.endpoint] = sub;
  await kv.set(SUBS_KEY, all);
}

export async function removeSubscription(endpoint) {
  if (!kv || !endpoint) return;
  const all = (await kv.get(SUBS_KEY)) || {};
  if (all[endpoint]) {
    delete all[endpoint];
    await kv.set(SUBS_KEY, all);
  }
}

export async function sendToAll(title, body) {
  if (!kv) throw new Error("Geen KV/Upstash Redis gekoppeld.");
  if (!vapidReady()) throw new Error("VAPID-sleutels ontbreken in de omgevingsvariabelen.");
  configureWebPush();

  const all = (await kv.get(SUBS_KEY)) || {};
  const endpoints = Object.keys(all);
  const payload = JSON.stringify({ title, body });

  let sent = 0;
  await Promise.all(
    endpoints.map(async (endpoint) => {
      try {
        await webpush.sendNotification(all[endpoint], payload);
        sent++;
      } catch (err) {
        if (err.statusCode === 404 || err.statusCode === 410) {
          await removeSubscription(endpoint);
        }
      }
    })
  );
  return { sent, total: endpoints.length };
}

// Idempotent per calendar day + slot, based on Europe/Amsterdam local time,
// so a UTC-only scheduler (GitHub Actions) still fires at the right local
// hour year-round despite the CET/CEST switch.
export async function markSentIfDue(slot, hour) {
  if (!kv) return { due: false, reason: "no-kv" };
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Amsterdam",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(now);
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const localHour = Number(get("hour"));
  const dateId = `${get("year")}-${get("month")}-${get("day")}`;

  if (localHour !== hour) return { due: false, reason: "wrong-hour", localHour };

  const flagKey = `push_sent:${slot}:${dateId}`;
  const already = await kv.get(flagKey);
  if (already) return { due: false, reason: "already-sent" };

  await kv.set(flagKey, true, { ex: 60 * 60 * 6 });
  return { due: true };
}
