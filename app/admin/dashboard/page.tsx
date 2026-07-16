import { getDashboardData } from "@/lib/dashboard";
import AdminActions from "@/components/AdminActions";

export default async function DashboardPage() {
  const { reservations, events } = await getDashboardData();

  const totalGuests = reservations.reduce(
    (sum, r) => sum + (r.guests ?? 0),
    0
  );

  const pendingReservations = reservations.filter(
    (r) => r.status === "pending"
  ).length;

  const pendingEvents = events.filter(
    (e) => e.status === "pending"
  ).length;

  return (
    <main className="min-h-screen bg-[#FAF7F1] p-4 md:p-8 lg:p-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10">

          <div>
            <h1 className="text-4xl md:text-5xl font-black text-[#285C5F]">
              Admin Control
            </h1>

            <p className="text-[#6D665D]">
              Live reservations & event inquiries
            </p>
          </div>

          <div className="grid grid-cols-2 lg:flex gap-4">

            <StatCard
              title="Guests"
              value={totalGuests}
            />

            <StatCard
              title="Reservations"
              value={pendingReservations}
            />

            <StatCard
              title="Events"
              value={pendingEvents}
            />

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-xl md:text-2xl font-bold mb-6">
            Reservations
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4">
                    Name
                  </th>

                  <th className="text-left">
                    Phone
                  </th>

                  <th>Email</th>

                  <th>Date</th>

                  <th>Time</th>

                  <th>Guests</th>

                  <th>Status</th>
                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {reservations.map((r) => (

                  <tr
                    key={r.id}
                    className="border-b last:border-none"
                  >

                    <td className="py-4">
                      {r.full_name}
                    </td>

                    <td>{r.phone}</td>

                    <td>{r.email}</td>

                    <td>{r.reservation_date}</td>

                    <td>{r.reservation_time}</td>

                    <td>{r.guests}</td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold
                        ${
                          r.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {r.status}
                      </span>

                    </td>

                    <td>
                      {r.status === "pending" ? (
                        <AdminActions
                          table="reservations"
                          id={r.id}
                        />
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="text-green-700 font-semibold">
                            ✓ Completed
                          </span>

                          <AdminActions
                            table="reservations"
                            id={r.id}
                            completed
                          />
                        </div>
                      )}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

          <h2 className="text-xl md:text-2xl font-bold mb-6">
            Event Inquiries
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4">
                    Name
                  </th>

                  <th>Phone</th>

                  <th>Email</th>

                  <th>Description</th>

                  <th>Status</th>
                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {events.map((e) => (

                  <tr
                    key={e.id}
                    className="border-b last:border-none"
                  >

                    <td className="py-4">
                      {e.full_name}
                    </td>

                    <td>{e.phone}</td>

                    <td>{e.email}</td>

                    <td>{e.description}</td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold
                        ${
                          e.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {e.status}
                      </span>

                    </td>

                    <td>
                      {e.status === "pending" ? (
                        <AdminActions
                          table="events"
                          id={e.id}
                        />
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="text-green-700 font-semibold">
                            ✓ Completed
                          </span>

                          <AdminActions
                            table="events"
                            id={e.id}
                            completed
                          />
                        </div>
                      )}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 w-full lg:min-w-[150px]">

      <p className="text-sm text-gray-500 uppercase">
        {title}
      </p>

      <p className="text-4xl font-black text-[#285C5F]">
        {value}
      </p>

    </div>
  );
}
