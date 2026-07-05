import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF7F1] flex flex-col items-center pt-20">

      {/* Logos */}
      <div className="flex items-center gap-8">

        <Image
          src="/brand/livingroom.png"
          alt="Living Room Café"
          width={260}
          height={120}
        />

        <div className="w-px h-16 bg-gray-400"></div>

        <Image
          src="/brand/yallak.png"
          alt="Yalla K Spaces"
          width={180}
          height={120}
        />

      </div>

      {/* Title */}

      <h1 className="mt-10 text-6xl font-bold text-[#3A2A21]">
        Reserve Your Space
      </h1>

      <p className="mt-3 text-xl text-[#275A5D]">
        work. meet. create.
      </p>

    </main>
  );
}