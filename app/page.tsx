import Image from "next/image";
import ReservationCard from "@/components/ReservationCard";

function Waves({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className={`w-full h-12 ${flip ? "rotate-180" : ""}`}
      viewBox="0 0 1200 50"
      preserveAspectRatio="none"
    >
      {/* Top Wave */}
      <path
        d="
          M0 12
          Q15 2 30 12
          T60 12 T90 12 T120 12 T150 12 T180 12
          T210 12 T240 12 T270 12 T300 12 T330 12
          T360 12 T390 12 T420 12 T450 12 T480 12
          T510 12 T540 12 T570 12 T600 12 T630 12
          T660 12 T690 12 T720 12 T750 12 T780 12
          T810 12 T840 12 T870 12 T900 12 T930 12
          T960 12 T990 12 T1020 12 T1050 12
          T1080 12 T1110 12 T1140 12 T1170 12 T1200 12"
        fill="none"
        stroke="#2C6A69"
        strokeWidth="2.7"
        strokeLinecap="round"
      />

      {/* Lower Wave */}
      <path
        d="
          M0 24
          Q15 14 30 24
          T60 24 T90 24 T120 24 T150 24 T180 24
          T210 24 T240 24 T270 24 T300 24 T330 24
          T360 24 T390 24 T420 24 T450 24 T480 24
          T510 24 T540 24 T570 24 T600 24 T630 24
          T660 24 T690 24 T720 24 T750 24 T780 24
          T810 24 T840 24 T870 24 T900 24 T930 24
          T960 24 T990 24 T1020 24 T1050 24
          T1080 24 T1110 24 T1140 24 T1170 24 T1200 24"
        fill="none"
        stroke="#2C6A69"
        strokeWidth="2.7"
        strokeLinecap="round"
        opacity=".65"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF7F1] flex flex-col items-center px-5 sm:px-6 py-6">

      {/* TOP WAVES */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-20">
        <Waves />
      </div>

      {/* LOGO */}
      <Image
        src="/brand/livingroom.png"
        alt="Living Room Café"
        width={360}
        height={170}
        priority
        className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto mt-5 z-10"
      />

      {/* HERO */}
      <div className="text-center mt-5 mb-8 z-10">
        <h1
          className="font-nunito text-[#3A2A21]"
          style={{
            fontWeight: 800,
            lineHeight: ".88",
            letterSpacing: "-.055em",
            fontSize: "clamp(3.5rem,9vw,5.3rem)",
          }}
        >
          Treat Yourself
        </h1>
      </div>

      {/* MAIN CARD */}
      <div className="w-full max-w-5xl z-10">
        <ReservationCard />
      </div>

      <p
  className="font-amsterdam text-[#275A5D] text-center mt-16 mb-24 z-10"
  style={{
    fontSize: "clamp(2rem,5vw,2.8rem)",
    lineHeight: ".9",
  }}
>
  We got the spot.
</p>

      {/* BOTTOM PEOPLE (DESKTOP ONLY) */}
<div className="hidden lg:block absolute bottom-0 left-0 w-full pointer-events-none overflow-hidden z-0">
  <img
    src="/art/sitting.svg"
    alt=""
    className="block w-full h-auto opacity-80"
  />
</div>

    </main>
  );
}