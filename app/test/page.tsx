"use client";

import { supabase } from "@/lib/supabase";

export default function TestPage() {
  async function insertTest() {
    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          full_name: "Test Person",
          phone: "01234567890",
          email: "test@test.com",
          description: "Testing database connection",
        },
      ])
      .select();

    console.log("DATA:", data);
    console.log("ERROR:", error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={insertTest}
        className="
          rounded-2xl
          bg-[#285C5F]
          px-8
          py-4
          text-white
          font-semibold
        "
      >
        Insert Test Event
      </button>
    </div>
  );
}