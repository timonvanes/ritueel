import { NextResponse } from "next/server";
import { getLogs } from "../../../lib/kv";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const datesParam = searchParams.get("dates") || "";
  const dates = datesParam.split(",").map((d) => d.trim()).filter(Boolean).slice(0, 60);
  try {
    const map = await getLogs(dates);
    return NextResponse.json(map);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
