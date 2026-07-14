import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { table, id } = await req.json();

  console.log("Complete request:", { table, id });

  const { data, error } = await supabase
    .from(table)
    .update({ status: "completed" })
    .eq("id", id)
    .select();

  console.log("Updated rows:", data);
  console.log("Supabase error:", error);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}