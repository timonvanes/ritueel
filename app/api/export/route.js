import { getSteps, getAllLogs } from "../../../lib/kv";

function csvEscape(value) {
  const s = value === null || value === undefined ? "" : String(value);
  if (/[",\r\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

function stepMoments(step) {
  const m = Array.isArray(step.moment) ? step.moment : [step.moment];
  const cleaned = m.filter((x) => x === "ochtend" || x === "avond");
  return cleaned.length ? cleaned : ["ochtend"];
}

// A product scheduled for both Ochtend and Avond is tracked (and can be
// checked off) independently per moment, so it gets one CSV column per
// moment; skip stays one decision for the whole product either way.
function stepColumns(step) {
  const moments = stepMoments(step);
  if (moments.length > 1) {
    return moments.map((m) => ({
      key: `${step.id}__${m}`,
      skipKey: step.id,
      label: `${step.name} (${m === "avond" ? "avond" : "ochtend"})`
    }));
  }
  return [{ key: step.id, skipKey: step.id, label: step.name }];
}

export async function GET() {
  try {
    const [steps, logsMap] = await Promise.all([getSteps(), getAllLogs()]);

    const columns = [];
    steps.forEach((s) => { columns.push(...stepColumns(s)); });
    const knownKeys = new Set(columns.map((c) => c.key));

    const extraIds = new Set();
    Object.values(logsMap).forEach((log) => {
      Object.keys(log.done || {}).forEach((id) => {
        if (!knownKeys.has(id)) extraIds.add(id);
      });
      Object.keys(log.skipped || {}).forEach((id) => {
        if (!knownKeys.has(id)) extraIds.add(id);
      });
    });
    [...extraIds].forEach((id) => columns.push({ key: id, skipKey: id, label: `(verwijderd) ${id}` }));

    const headers = ["Datum"]
      .concat(columns.map((c) => c.label))
      .concat(["Voltooid", "Notitie"]);

    const dates = Object.keys(logsMap).sort();
    const rows = dates.map((date) => {
      const log = logsMap[date] || {};
      const done = log.done || {};
      const skipped = log.skipped || {};
      const cells = [date];
      columns.forEach((c) => {
        if (skipped[c.skipKey]) cells.push("Overgeslagen");
        else if (done[c.key]) cells.push("Gedaan");
        else cells.push("");
      });
      // One point per product (matching the app's own streak count), not
      // per moment column — a twice-daily product only counts once it's
      // done for every moment it's scheduled for.
      const doneCount = steps.filter((s) => {
        const cols = stepColumns(s);
        return cols.every((c) => !!done[c.key]);
      }).length;
      cells.push(`${doneCount}/${log.total || 0}`);
      cells.push(log.note || "");
      return cells;
    });

    const lines = [headers, ...rows].map((r) => r.map(csvEscape).join(","));
    const csv = "﻿" + lines.join("\r\n") + "\r\n";

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="ritueel-export.csv"'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
