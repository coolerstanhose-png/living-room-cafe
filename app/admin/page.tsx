"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!res.ok) {
      setError("Incorrect username or password.");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAF7F1] p-8">

      <form
        onSubmit={login}
        className="
          w-full
          max-w-xl
          rounded-[34px]
          bg-white
          border
          border-[#E8DDD2]
          shadow-[0_18px_50px_rgba(40,92,95,.12)]
          p-12
        "
      >

        <h1
          className="
            font-nunito
            text-center
            text-[#3A2A21]
            mb-3
          "
          style={{
            fontSize: "3rem",
            fontWeight: 800,
            letterSpacing: "-0.04em",
          }}
        >
          Admin Access
        </h1>

        <p className="text-center text-[#7A7068] mb-10">
          Living Room Café Dashboard
        </p>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="
            w-full
            rounded-2xl
            border
            border-[#E8DDD2]
            p-5
            text-xl
            mb-5
            outline-none
            transition
            focus:border-[#285C5F]
            focus:ring-2
            focus:ring-[#285C5F]/20
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full
            rounded-2xl
            border
            border-[#E8DDD2]
            p-5
            text-xl
            outline-none
            transition
            focus:border-[#285C5F]
            focus:ring-2
            focus:ring-[#285C5F]/20
          "
        />

        {error && (
          <p className="mt-5 text-center text-red-600">
            {error}
          </p>
        )}

        <button
          className="
            mt-8
            w-full
            rounded-2xl
            bg-[#285C5F]
            py-5
            text-xl
            font-bold
            text-white
            transition
            hover:brightness-110
            shadow-lg
          "
        >
          Access Dashboard
        </button>

      </form>

    </main>
  );
}