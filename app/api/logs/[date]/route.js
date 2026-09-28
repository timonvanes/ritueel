import { NextResponse } from "next/server";
import { setLog } from "../../../../lib/kv";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function PUT(request, { params }) {
  if (!DATE_RE.test(params.date)) {
    return NextResponse.json({ error: "invalid date" }, { status: 400 });
  }
  const data = await request.json();
  try {
    await setLog(params.date, data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
