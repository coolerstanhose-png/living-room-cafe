import { createClient } from "./supabase-server";

export async function getDashboardData() {
  const supabase = await createClient();

  const [reservations, events] = await Promise.all([
    supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false }),

    supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  return {
    reservations: reservations.data ?? [],
    events: events.data ?? [],
  };
}