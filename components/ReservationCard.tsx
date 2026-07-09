"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type View = "home" | "reserve" | "events" | "success" | "already";

type ReserveStep =
  | "date"
  | "guests"
  | "time"
  | "details";

export default function ReservationCard() {
  const [view, setView] = useState<View>("home");

  const [reserveStep, setReserveStep] =
    useState<ReserveStep>("date");

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  const [guests, setGuests] = useState(2);

  const [selectedTime, setSelectedTime] =
    useState("");
    const [fullName, setFullName] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");

  const [largePartyWarning, setLargePartyWarning] =
    useState(false);

  function generateDates() {
    const dates = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }

    return dates;
  }

  const dates = generateDates();

  const times = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
  "11:00 PM",
  "12:00 AM",
];

  function submitWithCooldown(
    key: string,
    success: View = "success"
  ) {
    const lastSubmission =
      localStorage.getItem(key);

    if (lastSubmission) {
      const minutes =
        (Date.now() -
          Number(lastSubmission)) /
        (1000 * 60);

      if (minutes < 30) {
        setView("already");
        return false;
      }
    }

    localStorage.setItem(
      key,
      Date.now().toString()
    );

    setView(success);
    return true;
  }


  function handleEventsSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const form = e.currentTarget;

    const honeypot =
      (
        form.elements.namedItem(
          "website"
        ) as HTMLInputElement
      )?.value;

    if (honeypot) return;

    submitWithCooldown(
      "livingroom-event-submitted"
    );
  }


  async function handleReservationSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const form = e.currentTarget;

    const honeypot =
      (
        form.elements.namedItem(
          "website"
        ) as HTMLInputElement
      )?.value;

    if (honeypot) return;

    const { data, error } = await supabase
  .from("reservations")
  .insert([
    {
  full_name: fullName,
  phone,
  email,
  reservation_date:
    selectedDate?.toISOString().split("T")[0],
  reservation_time: selectedTime,
  guests,
},
  ])
  .select();

if (error) {
  console.error(error);
  return;
}

submitWithCooldown(
  "livingroom-reservation-submitted"
);
  }


  function continueFromGuests() {
    if (guests > 8) {
      setLargePartyWarning(true);
      return;
    }

    setReserveStep("time");
  }


  function progressWidth() {
    if (reserveStep === "date")
      return "25%";

    if (reserveStep === "guests")
      return "50%";

    if (reserveStep === "time")
      return "75%";

    return "100%";
  }


  return (
    <section className="w-full max-w-5xl">

      <div
        className="
          rounded-[36px]
          bg-[#FFFDF9]
          border border-[#F4C7A3]
          shadow-[0_20px_60px_rgba(228,124,48,0.12)]
          p-5 sm:p-8 md:p-12
          min-h-[520px]
          flex items-center justify-center
          relative
        "
      >

      {view === "home" && (

        <div className="
          w-full
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        ">


          {/* MENU */}
          <a
            href="https://qr1.me-qr.com/mobile/pdf/a6e82d73-19d6-41ae-9b94-85948e5824be"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              h-56
              md:h-80
              rounded-3xl
              border
              border-[#EFE4D8]
              bg-white
              flex
              flex-col
              items-center
              justify-center
              text-center
              transition-all
              hover:-translate-y-1
              hover:shadow-xl
              hover:border-[#D67A4A]
              px-8
            "
          >

            <div className="
              text-6xl
              mb-5
              transition-transform
              group-hover:scale-110
            ">
              🍽️
            </div>


            <h2
              className="
                font-nunito
                uppercase
                text-[#3A2A21]
              "
              style={{
                fontWeight:800,
                fontSize:"clamp(1.8rem,2vw,2rem)",
                lineHeight:".92",
                letterSpacing:"-.03em"
              }}
            >
              Our Menu
            </h2>


            <p className="
              mt-4
              text-[#7A7068]
            ">
              Explore our handcrafted
              <br />
              food & drinks.
            </p>


          </a>


          {/* RESERVE */}
          <button
            onClick={() => {
              setView("reserve");
              setReserveStep("date");
            }}
            className="
              group
              h-56
              md:h-80
              rounded-3xl
              border
              border-[#EFE4D8]
              bg-white
              flex
              flex-col
              items-center
              justify-center
              text-center
              transition-all
              hover:-translate-y-1
              hover:shadow-xl
              hover:border-[#D67A4A]
              px-8
            "
          >

            <div className="
              text-6xl
              mb-5
              transition-transform
              group-hover:scale-110
            ">
              📅
            </div>


            <h2
              className="
                font-nunito
                uppercase
                text-[#3A2A21]
              "
              style={{
                fontWeight:800,
                fontSize:"clamp(1.8rem,2vw,2rem)",
                lineHeight:".92",
                letterSpacing:"-.03em"
              }}
            >
              Reserve
            </h2>


            <p className="
              mt-4
              text-[#7A7068]
            ">
              Reserve your table
              <br />
              in seconds.
            </p>

          </button>


          {/* EVENTS */}
          <button
            onClick={() => setView("events")}
            className="
              group
              h-56
              md:h-80
              rounded-3xl
              border
              border-[#EFE4D8]
              bg-white
              flex
              flex-col
              items-center
              justify-center
              text-center
              transition-all
              hover:-translate-y-1
              hover:shadow-xl
              hover:border-[#D67A4A]
              px-8
            "
          >

            <div className="
              text-6xl
              mb-5
              transition-transform
              group-hover:scale-110
            ">
              🎉
            </div>


            <h2
              className="
                font-nunito
                uppercase
                text-[#3A2A21]
              "
              style={{
                fontWeight:800,
                fontSize:"clamp(1.8rem,2vw,2rem)",
                lineHeight:".92",
                letterSpacing:"-.03em"
              }}
            >
              Events
            </h2>


            <p className="
              mt-4
              text-[#7A7068]
            ">
              Host birthdays,
              <br />
              gatherings & celebrations.
            </p>

          </button>


        </div>

      )}                {/* RESERVATION WIZARD */}
        {view === "reserve" && (
          <div className="w-full max-w-2xl">

            {/* [PROGRESS BAR] */}
            <div className="w-full h-2 bg-[#EDE6DC] rounded-full overflow-hidden mb-8">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: progressWidth(),
                  backgroundColor: "#285C5F",
                }}
              />
            </div>

            {/* DATE */}
            {reserveStep === "date" && (
              <div>

                <h2
                  className="font-nunito text-[#3A2A21] text-center"
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(2rem,5vw,3rem)",
                    letterSpacing: "-.04em",
                  }}
                >
                  When will you be visiting?
                </h2>

                <p className="text-center mt-3 text-[#7A7068]">
                  Pick the day that works best for you.
                </p>

                <div className="flex gap-3 overflow-x-auto mt-8 pb-3">
                  {dates.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`
                        min-w-[78px]
                        rounded-2xl
                        py-4
                        border
                        transition
                        ${
                          selectedDate?.toDateString() ===
                          date.toDateString()
                            ? "bg-[#285C5F] text-white border-[#285C5F]"
                            : "bg-white border-[#E8DDD2] text-[#3A2A21]"
                        }
                      `}
                    >
                      <div className="text-xs uppercase">
                        {date.toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </div>

                      <div className="text-2xl font-bold">
                        {date.getDate()}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setView("home")}
                    className="
                      flex-1
                      rounded-2xl
                      border border-[#E8DDD2]
                      py-4
                      font-semibold
                      text-[#6E6259]
                    "
                  >
                    Back
                  </button>

                  <button
                    disabled={!selectedDate}
                    onClick={() => setReserveStep("guests")}
                    className="
                      flex-1
                      rounded-2xl
                      py-4
                      text-white
                      font-semibold
                      bg-[#285C5F]
                      disabled:opacity-40
                    "
                  >
                    Continue →
                  </button>
                </div>

              </div>
            )}

            {/* GUESTS */}
            {reserveStep === "guests" && (
              <div className="text-center">

                <h2
                  className="font-nunito text-[#3A2A21]"
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(2rem,5vw,3rem)",
                    letterSpacing: "-.04em",
                  }}
                >
                  Who's joining you?
                </h2>

                <p className="mt-3 text-[#7A7068]">
                  Tell us how many seats you'll need.
                </p>

                <div className="flex items-center justify-center gap-8 mt-10">

                  <button
                    onClick={() =>
                      setGuests(Math.max(1, guests - 1))
                    }
                    className="
                      w-14 h-14
                      rounded-full
                      border border-[#E8DDD2]
                      text-2xl
                    "
                  >
                    −
                  </button>

                  <span className="text-5xl font-bold text-[#3A2A21]">
                    {guests}
                  </span>

                  <button
                    onClick={() =>
                      setGuests(guests + 1)
                    }
                    className="
                      w-14 h-14
                      rounded-full
                      border border-[#E8DDD2]
                      text-2xl
                    "
                  >
                    +
                  </button>

                </div>

                <div className="flex gap-4 mt-10">
                  <button
                    onClick={() =>
                      setReserveStep("date")
                    }
                    className="
                      flex-1
                      rounded-2xl
                      border border-[#E8DDD2]
                      py-4
                      font-semibold
                      text-[#6E6259]
                    "
                  >
                    Back
                  </button>

                  <button
                    onClick={continueFromGuests}
                    className="
                      flex-1
                      rounded-2xl
                      py-4
                      bg-[#285C5F]
                      text-white
                      font-semibold
                    "
                  >
                    Continue →
                  </button>
                </div>

              </div>
            )}

            {/* TIME */}
            {reserveStep === "time" && (
              <div>

                <h2
                  className="font-nunito text-[#3A2A21] text-center"
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(2rem,5vw,3rem)",
                    letterSpacing: "-.04em",
                  }}
                >
                  When should we expect you?
                </h2>

                <p className="text-center mt-3 text-[#7A7068]">
                 We'll have your table ready for you.
                </p>

                <div className="grid grid-cols-3 gap-3 mt-8">

                  {[
                    "10:00 AM",
                    "11:00 AM",
                    "12:00 PM",
                    "1:00 PM",
                    "2:00 PM",
                    "3:00 PM",
                    "4:00 PM",
                    "5:00 PM",
                    "6:00 PM",
                    "7:00 PM",
                    "8:00 PM",
                    "9:00 PM",
                    "10:00 PM",
                    "11:00 PM",
                    "12:00 AM",
                  ].map((time) => (
                    <button
                      key={time}
                      onClick={() =>
                        setSelectedTime(time)
                      }
                      className={`
                        rounded-2xl
                        py-3
                        border
                        transition
                        ${
                          selectedTime === time
                            ? "bg-[#285C5F] text-white border-[#285C5F]"
                            : "bg-white border-[#E8DDD2]"
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}

                </div>

                <div className="flex gap-4 mt-8">

                  <button
                    onClick={() =>
                      setReserveStep("guests")
                    }
                    className="
                      flex-1
                      rounded-2xl
                      border border-[#E8DDD2]
                      py-4
                      font-semibold
                      text-[#6E6259]
                    "
                  >
                    Back
                  </button>

                  <button
                    disabled={!selectedTime}
                    onClick={() =>
                      setReserveStep("details")
                    }
                    className="
                      flex-1
                      rounded-2xl
                      py-4
                      bg-[#285C5F]
                      text-white
                      font-semibold
                      disabled:opacity-40
                    "
                  >
                    Continue →
                  </button>

                </div>

              </div>
            )}

            {/* DETAILS */}
            {reserveStep === "details" && (
              <form
                onSubmit={handleReservationSubmit}
                className="space-y-5"
              >

                <h2
                  className="font-nunito text-[#3A2A21] text-center"
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(2rem,5vw,3rem)",
                    letterSpacing: "-.04em",
                  }}
                >
                  Just a few details.
                </h2>

                <p className="text-center text-[#7A7068]">
                  We'll have your table ready.
                </p>

                <input
                  type="text"
                  name="website"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <input
  required
  type="text"
  placeholder="Full Name"
  value={fullName}
  onChange={(e) =>
    setFullName(e.target.value)
  }
  className="w-full rounded-2xl border border-[#E8DDD2] px-5 py-4"
/>

                <input
  required
  type="tel"
  placeholder="Mobile Number"
  inputMode="numeric"
  pattern="[0-9]{10,11}"
  maxLength={11}
  value={phone}
  onChange={(e) =>
    setPhone(
      e.target.value
        .replace(/\D/g, "")
        .slice(0, 11)
    )
  }
  className="w-full rounded-2xl border border-[#E8DDD2] px-5 py-4"
/>

                <input
  required
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
  className="w-full rounded-2xl border border-[#E8DDD2] px-5 py-4"
/>

                <div className="flex gap-4 pt-2">

                  <button
                    type="button"
                    onClick={() =>
                      setReserveStep("time")
                    }
                    className="
                      flex-1
                      rounded-2xl
                      border border-[#E8DDD2]
                      py-4
                      font-semibold
                      text-[#6E6259]
                    "
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="
                      flex-1
                      rounded-2xl
                      bg-[#285C5F]
                      py-4
                      text-white
                      font-semibold
                    "
                  >
                    Reserve
                  </button>

                </div>

              </form>
            )}

          </div>
        )}        {/* EVENTS */}
        {view === "events" && (
          <div className="w-full max-w-2xl">

            <div className="text-center mb-8">
              <h2
                className="font-nunito text-[#3A2A21]"
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(2rem,5vw,3rem)",
                  letterSpacing: "-.04em",
                }}
              >
                Let's plan something special.
              </h2>

              <p className="mt-3 text-[#7A7068] text-lg">
                Tell us a little about your event and we'll get in touch.
              </p>
            </div>

            <form
              onSubmit={handleEventsSubmit}
              className="space-y-5"
            >
              <input
                type="text"
                name="website"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <input
                required
                type="text"
                placeholder="Full Name"
                className="w-full rounded-2xl border border-[#E8DDD2] px-5 py-4"
              />

              <input
                required
                type="tel"
                placeholder="Mobile Number"
                inputMode="numeric"
                pattern="[0-9]{10,11}"
maxLength={11}
onInput={(e) => {
  e.currentTarget.value =
    e.currentTarget.value.replace(/\D/g, "").slice(0, 11);
}}
                className="w-full rounded-2xl border border-[#E8DDD2] px-5 py-4"
              />

              <input
                required
                type="email"
                placeholder="Email Address"
                className="w-full rounded-2xl border border-[#E8DDD2] px-5 py-4"
              />

              <textarea
                rows={5}
                placeholder="Special requests or event details (optional)"
                className="w-full rounded-2xl border border-[#E8DDD2] px-5 py-4 resize-none"
              />

              <div className="flex gap-4 pt-2">

                <button
                  type="button"
                  onClick={() => setView("home")}
                  className="
                    flex-1
                    rounded-2xl
                    border border-[#E8DDD2]
                    py-4
                    font-semibold
                    text-[#6E6259]
                  "
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="
                    flex-1
                    rounded-2xl
                    bg-[#285C5F]
                    py-4
                    text-white
                    font-semibold
                  "
                >
                  Send Inquiry
                </button>

              </div>
            </form>

          </div>
        )}
{/* SUCCESS */}
{view === "success" && (
  <div className="text-center max-w-xl">
    <h2
      className="font-nunito text-[#3A2A21]"
      style={{
        fontWeight: 800,
        fontSize: "clamp(2.2rem,5vw,3.2rem)",
        letterSpacing: "-.04em",
      }}
    >
      Thank You! ✨
    </h2>

    <p className="mt-6 text-[#7A7068] text-lg leading-relaxed">
      We've received your reservation and will contact you shortly.
    </p>

    <button
      onClick={() => {
        setView("home");
        setReserveStep("date");

        setFullName("");
        setPhone("");
        setEmail("");

        setSelectedDate(null);
        setSelectedTime("");
        setGuests(2);
      }}
      className="
        mt-10
        rounded-2xl
        bg-[#285C5F]
        text-white
        px-8
        py-4
        font-semibold
        transition
        hover:opacity-90
      "
    >
      Return Home
    </button>
  </div>
)}

{/* ALREADY REGISTERED */}
{view === "already" && (
  <div className="text-center max-w-xl">
    <h2
      className="font-nunito text-[#3A2A21]"
      style={{
        fontWeight: 800,
        fontSize: "clamp(2.2rem,5vw,3.2rem)",
        letterSpacing: "-.04em",
      }}
    >
      You're already on our list ✨
    </h2>

    <p className="mt-6 text-[#7A7068] text-lg leading-relaxed">
      You have already registered and will be contacted shortly.
    </p>

    <button
      onClick={() => setView("home")}
      className="
        mt-10
        rounded-2xl
        bg-[#285C5F]
        text-white
        px-8
        py-4
        font-semibold
        transition
        hover:opacity-90
      "
    >
      Return Home
    </button>
  </div>
)}
      </div>
    </section>
  );
}