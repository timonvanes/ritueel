import { Redis } from "@upstash/redis";

const url =
  process.env.KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL;
const token =
  process.env.KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN;

// Lazily created so the app can still build/boot without storage configured;
// calls only fail at request time, with a clear error, once data is actually needed.
const kv = url && token ? new Redis({ url, token }) : null;

function requireKv() {
  if (!kv) {
    throw new Error(
      "Geen KV/Upstash Redis gekoppeld — zie README voor de Vercel Storage-setup."
    );
  }
  return kv;
}

const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];

export const SEED_STEPS = [
  { id: "shampoo", name: "Andrelon Oil & Care shampoo", category: "haar", moment: ["ochtend"], scheduleType: "interval", everyDays: 2, days: ALL_DAYS, notes: "Inwrijven 1-2 min, uitspoelen", createdAt: 1000 },
  { id: "conditioner", name: "Andrelon Oil & Care conditioner", category: "haar", moment: ["ochtend"], scheduleType: "linked", linkedTo: "shampoo", days: ALL_DAYS, notes: "Na shampoo, 2-3 min laten zitten — niet op maskerdagen", createdAt: 1001 },
  { id: "keratinemasker", name: "Kruidvat Repair Keratin Haarmasker", category: "haar", moment: ["ochtend"], scheduleType: "linked", linkedTo: "shampoo", days: ALL_DAYS, notes: "5 min laten zitten, uitspoelen — geen conditioner erna", createdAt: 1002 },
  { id: "minoxidil", name: "Minoxidil", category: "haar", moment: ["ochtend"], scheduleType: "weekly", days: ALL_DAYS, notes: "Op droge hoofdhuid, volledig laten intrekken", createdAt: 1003 },
  { id: "cleanser-ochtend", name: "CeraVe Foaming Cleanser", category: "huid", moment: ["ochtend", "avond"], scheduleType: "weekly", days: ALL_DAYS, notes: "", createdAt: 1005 },
  { id: "moisturizer-ochtend", name: "CeraVe Moisturizing Lotion", category: "huid", moment: ["ochtend", "avond"], scheduleType: "weekly", days: ALL_DAYS, notes: "", createdAt: 1006 },
  { id: "spf", name: "La Roche-Posay Anthelios SPF 50+", category: "huid", moment: ["ochtend"], scheduleType: "weekly", days: ALL_DAYS, notes: "Laatste stap", createdAt: 1007 },
  { id: "retinol", name: "Kruidvat Renew Retinol 0.2% Night Serum", category: "huid", moment: ["avond"], scheduleType: "weekly", days: [2, 5], notes: "Nooit combineren met self-tanner", conflictsWith: ["selftanner"], createdAt: 1010 },
  { id: "selftanner", name: "Collistar Magic Drops Face for Men", category: "huid", moment: ["avond"], scheduleType: "weekly", days: [1, 4], notes: "Meng een paar druppels door de CeraVe Moisturizing Lotion — niet los aanbrengen", createdAt: 1011 }
];

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const DEFAULT_CATEGORIES = [
  { id: "huid", name: "Huid" },
  { id: "haar", name: "Haar" }
];

export async function getCategories() {
  let categories = await requireKv().get("categories");
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    categories = DEFAULT_CATEGORIES;
    await requireKv().set("categories", categories);
  }
  return categories;
}

export async function createCategory(name) {
  const trimmed = String(name || "").trim();
  if (!trimmed) throw new Error("naam is verplicht");
  const categories = await getCategories();
  const existing = categories.find(
    (c) => c.name.toLowerCase() === trimmed.toLowerCase()
  );
  if (existing) return existing;
  const category = { id: newId(), name: trimmed };
  categories.push(category);
  await requireKv().set("categories", categories);
  return category;
}

export async function getSteps() {
  let steps = await requireKv().get("steps");
  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    steps = SEED_STEPS;
    await requireKv().set("steps", steps);
  }
  return steps;
}

async function saveSteps(steps) {
  await requireKv().set("steps", steps);
}

const SCHEDULE_TYPES = ["weekly", "interval", "linked"];

function scheduleFields(data, fallback) {
  const scheduleType = SCHEDULE_TYPES.includes(data.scheduleType)
    ? data.scheduleType
    : (fallback ? fallback.scheduleType : "weekly");
  const fields = { scheduleType };
  if (scheduleType === "interval") {
    const n = Number(data.everyDays);
    fields.everyDays = Number.isFinite(n) && n > 0 ? Math.round(n) : (fallback && fallback.everyDays) || 1;
    fields.days = ALL_DAYS;
    fields.linkedTo = null;
  } else if (scheduleType === "linked") {
    fields.linkedTo = data.linkedTo ? String(data.linkedTo).trim() : (fallback && fallback.linkedTo) || null;
    // "X op de Y keer" — set directly per sibling instead of inferring one
    // sibling's share from the other's. Left blank on edit, an existing
    // ratio (or the older single occurrenceEvery field) is kept as-is.
    const rn = Number(data.ratioN);
    const ro = Number(data.ratioOf);
    if (Number.isFinite(rn) && rn > 0 && Number.isFinite(ro) && ro > 0) {
      fields.ratioN = Math.round(rn);
      fields.ratioOf = Math.round(ro);
    } else {
      fields.ratioN = (fallback && fallback.ratioN) || null;
      fields.ratioOf = (fallback && fallback.ratioOf) || null;
    }
    fields.occurrenceEvery = (fallback && fallback.occurrenceEvery) || null;
    fields.days = ALL_DAYS;
    fields.everyDays = null;
  } else {
    fields.days = Array.isArray(data.days) && data.days.length ? data.days : (fallback && fallback.days) || ALL_DAYS;
    fields.everyDays = null;
    fields.linkedTo = null;
    fields.ratioN = null;
    fields.ratioOf = null;
    fields.occurrenceEvery = null;
  }
  return fields;
}

const MOMENTS = ["ochtend", "avond"];

function normalizeMoments(value) {
  const arr = Array.isArray(value) ? value : [value];
  const cleaned = arr.filter((m) => MOMENTS.includes(m));
  const deduped = [...new Set(cleaned)];
  return deduped.length ? deduped : ["ochtend"];
}

function normalizeConflicts(value, ownId) {
  const arr = Array.isArray(value) ? value : [];
  const cleaned = arr.map((id) => String(id).trim()).filter((id) => id && id !== ownId);
  return [...new Set(cleaned)];
}

export async function createStep(data) {
  const steps = await getSteps();
  const step = {
    id: newId(),
    name: String(data.name || "").trim(),
    fullName: String(data.fullName || "").trim(),
    ingredients: String(data.ingredients || "").trim(),
    category: data.category ? String(data.category).trim() : "huid",
    moment: normalizeMoments(data.moment),
    notes: String(data.notes || ""),
    createdAt: Date.now(),
    ...scheduleFields(data, null)
  };
  step.conflictsWith = normalizeConflicts(data.conflictsWith, step.id);
  steps.push(step);
  await saveSteps(steps);
  return step;
}

export async function updateStep(id, data) {
  const steps = await getSteps();
  const idx = steps.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  const current = steps[idx];
  const scheduleTouched =
    data.scheduleType !== undefined ||
    data.days !== undefined ||
    data.everyDays !== undefined ||
    data.linkedTo !== undefined ||
    data.ratioN !== undefined ||
    data.ratioOf !== undefined ||
    data.occurrenceEvery !== undefined;
  steps[idx] = {
    ...current,
    name: data.name !== undefined ? String(data.name).trim() : current.name,
    fullName: data.fullName !== undefined ? String(data.fullName).trim() : current.fullName || "",
    ingredients: data.ingredients !== undefined ? String(data.ingredients).trim() : current.ingredients || "",
    category: data.category !== undefined ? String(data.category).trim() : current.category,
    moment: data.moment !== undefined ? normalizeMoments(data.moment) : current.moment,
    notes: data.notes !== undefined ? String(data.notes) : current.notes,
    conflictsWith: data.conflictsWith !== undefined ? normalizeConflicts(data.conflictsWith, id) : current.conflictsWith || [],
    ...(scheduleTouched ? scheduleFields(data, current) : {})
  };
  await saveSteps(steps);
  return steps[idx];
}

export async function deleteStep(id) {
  const steps = await getSteps();
  await saveSteps(steps.filter((s) => s.id !== id));
}

export async function getLogs(dates) {
  if (!dates.length) return {};
  const client = requireKv();
  const results = await Promise.all(dates.map((d) => client.get(`log:${d}`)));
  const map = {};
  dates.forEach((d, i) => {
    if (results[i]) map[d] = results[i];
  });
  return map;
}

// Full history for CSV export — Upstash has no "get all dates" index, so
// this scans the log:* keyspace. Fine at personal-app scale (one key per
// day); an artifact's database guidance against unbounded growth does not
// apply here since this is its own KV store, not the 5000-doc cap.
export async function getAllLogs() {
  const client = requireKv();
  let cursor = "0";
  const keys = [];
  do {
    const [next, batch] = await client.scan(cursor, { match: "log:*", count: 200 });
    keys.push(...batch);
    cursor = next;
  } while (cursor !== "0" && cursor !== 0);
  if (keys.length === 0) return {};
  const values = await Promise.all(keys.map((k) => client.get(k)));
  const map = {};
  keys.forEach((k, i) => {
    if (values[i]) map[k.slice(4)] = values[i];
  });
  return map;
}

export async function setLog(date, data) {
  await requireKv().set(`log:${date}`, {
    done: data.done && typeof data.done === "object" ? data.done : {},
    skipped: data.skipped && typeof data.skipped === "object" ? data.skipped : {},
    postponed: data.postponed && typeof data.postponed === "object" ? data.postponed : {},
    total: Number.isFinite(data.total) ? data.total : 0,
    note: typeof data.note === "string" ? data.note.slice(0, 4000) : ""
  });
}
