"use client";

import { useRouter } from "next/navigation";

export default function AdminActions({
  table,
  id,
  completed = false,
}: {
  table: string;
  id: string;
  completed?: boolean;
}) {
  const router = useRouter();

  async function complete() {
    if (!confirm("Mark this request as completed?")) return;

    await fetch("/api/admin/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        table,
        id,
      }),
    });

    router.refresh();
  }

  async function remove() {
    if (!confirm("Delete this request permanently?")) return;

    await fetch("/api/admin/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        table,
        id,
      }),
    });

    router.refresh();
  }

  return (
  <div className="flex gap-2">

    {!completed && (
      <button
        onClick={complete}
        className="rounded-lg bg-[#285C5F] px-3 py-1 text-white hover:opacity-90"
      >
        ✓ Complete
      </button>
    )}

    <button
      onClick={remove}
      className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600"
    >
      🗑 Delete
    </button>

  </div>
);
}