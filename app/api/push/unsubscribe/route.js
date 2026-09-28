import { NextResponse } from "next/server";
import { removeSubscription } from "../../../../lib/push";

export async function POST(request) {
  const { endpoint } = await request.json();
  try {
    await removeSubscription(endpoint);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
