// app/api/save-name/route.ts
import { supabase } from "../../../lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.from("names").insert([{ name }]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "Name saved successfully!", data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
