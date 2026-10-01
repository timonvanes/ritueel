import { getSteps, getCategories } from "../../../../lib/kv";

function csvEscape(value) {
  const s = value === null || value === undefined ? "" : String(value);
  if (/[",\r\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

function momentLabel(step) {
  const m = Array.isArray(step.moment) ? step.moment : [step.moment];
  const has = (x) => m.includes(x);
  if (has("ochtend") && has("avond")) return "Ochtend + Avond";
  if (has("avond")) return "Avond";
  return "Ochtend";
}

function scheduleLabel(step, nameById) {
  const type = step.scheduleType || "weekly";
  if (type === "interval") return `Elke ${step.everyDays || 1} dagen`;
  if (type === "linked") {
    const base = `Gekoppeld aan ${nameById[step.linkedTo] || "?"}`;
    return step.occurrenceEvery > 1 ? `${base} (1 op de ${step.occurrenceEvery} keer)` : base;
  }
  if (!step.days || step.days.length === 0) return "Nooit";
  if (step.days.length === 7) return "Elke dag";
  const labels = { 0: "Zo", 1: "Ma", 2: "Di", 3: "Wo", 4: "Do", 5: "Vr", 6: "Za" };
  const order = [1, 2, 3, 4, 5, 6, 0];
  return order.filter((d) => step.days.includes(d)).map((d) => labels[d]).join(" ");
}

export async function GET() {
  try {
    const [steps, categories] = await Promise.all([getSteps(), getCategories()]);
    const categoryNameById = {};
    categories.forEach((c) => {
      categoryNameById[c.id] = c.name;
    });
    const nameById = {};
    steps.forEach((s) => {
      nameById[s.id] = s.name;
    });

    const headers = [
      "Naam",
      "Volledige productnaam",
      "Ingrediënten",
      "Categorie",
      "Moment",
      "Herhaling",
      "Notitie"
    ];
    const rows = steps.map((s) => [
      s.name,
      s.fullName || "",
      s.ingredients || "",
      categoryNameById[s.category] || s.category,
      momentLabel(s),
      scheduleLabel(s, nameById),
      s.notes || ""
    ]);

    const lines = [headers, ...rows].map((r) => r.map(csvEscape).join(","));
    const csv = "﻿" + lines.join("\r\n") + "\r\n";

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="ritueel-producten.csv"'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
