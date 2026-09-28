import { NextResponse } from "next/server";
import { sendToAll } from "../../../../lib/push";

export async function POST() {
  try {
    const res = await sendToAll("Ritueel", "Testmelding — als je dit ziet, werkt het.");
    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
