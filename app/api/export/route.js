import { getSteps, getAllLogs } from "../../../lib/kv";

function csvEscape(value) {
  const s = value === null || value === undefined ? "" : String(value);
  if (/[",\r\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

export async function GET() {
  try {
    const [steps, logsMap] = await Promise.all([getSteps(), getAllLogs()]);

    const nameById = {};
    steps.forEach((s) => {
      nameById[s.id] = s.name;
    });
    const stepIds = steps.map((s) => s.id);

    const extraIds = new Set();
    Object.values(logsMap).forEach((log) => {
      Object.keys(log.done || {}).forEach((id) => {
        if (!nameById[id]) extraIds.add(id);
      });
      Object.keys(log.skipped || {}).forEach((id) => {
        if (!nameById[id]) extraIds.add(id);
      });
    });
    const allIds = stepIds.concat([...extraIds]);

    const headers = ["Datum"]
      .concat(allIds.map((id) => nameById[id] || `(verwijderd) ${id}`))
      .concat(["Voltooid", "Notitie"]);

    const dates = Object.keys(logsMap).sort();
    const rows = dates.map((date) => {
      const log = logsMap[date] || {};
      const done = log.done || {};
      const skipped = log.skipped || {};
      const cells = [date];
      allIds.forEach((id) => {
        if (skipped[id]) cells.push("Overgeslagen");
        else if (done[id]) cells.push("Gedaan");
        else cells.push("");
      });
      const doneCount = Object.keys(done).filter((k) => done[k]).length;
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
