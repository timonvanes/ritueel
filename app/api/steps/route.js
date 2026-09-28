import { NextResponse } from "next/server";
import { getSteps, createStep } from "../../../lib/kv";

export async function GET() {
  try {
    const steps = await getSteps();
    return NextResponse.json(steps);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  const data = await request.json();
  if (!data || !data.name || !String(data.name).trim()) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }
  try {
    const step = await createStep(data);
    return NextResponse.json(step, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
