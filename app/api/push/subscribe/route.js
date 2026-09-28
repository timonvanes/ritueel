import { NextResponse } from "next/server";
import { addSubscription } from "../../../../lib/push";

export async function POST(request) {
  const sub = await request.json();
  if (!sub || !sub.endpoint) {
    return NextResponse.json({ error: "invalid subscription" }, { status: 400 });
  }
  try {
    await addSubscription(sub);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
