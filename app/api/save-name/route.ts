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
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred." }, { status: 500 });
  }
}
