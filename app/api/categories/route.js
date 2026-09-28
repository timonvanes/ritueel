import { NextResponse } from "next/server";
import { getCategories, createCategory } from "../../../lib/kv";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
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
    const category = await createCategory(data.name);
    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
