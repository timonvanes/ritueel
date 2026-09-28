import { NextResponse } from "next/server";
import { updateStep, deleteStep } from "../../../../lib/kv";

export async function PATCH(request, { params }) {
  const data = await request.json();
  try {
    const step = await updateStep(params.id, data);
    if (!step) return NextResponse.json({ error: "not found" }, { status: 404 });
    return NextResponse.json(step);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await deleteStep(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
