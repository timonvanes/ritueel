import { NextResponse } from "next/server";
import { markSentIfDue, sendToAll } from "../../../../lib/push";

const SLOTS = [
  { slot: "morning", hour: 7 },
  { slot: "evening", hour: 22 }
];

export async function GET() {
  const results = [];
  for (const { slot, hour } of SLOTS) {
    const check = await markSentIfDue(slot, hour);
    if (check.due) {
      try {
        const res = await sendToAll("Ritueel", "Vergeet het niet");
        results.push({ slot, sent: true, ...res });
      } catch (err) {
        results.push({ slot, sent: false, error: err.message });
      }
    } else {
      results.push({ slot, sent: false, reason: check.reason });
    }
  }
  return NextResponse.json({ ok: true, results });
}
