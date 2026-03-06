// src/components/tables/EnrollmentsTable.jsx
// ─────────────────────────────────────────────────────────────
// Recent enrollments table used on the Dashboard page.
// Props:
//   rows  – array from analytics.json recentEnrollments
//   dark  – boolean
// ─────────────────────────────────────────────────────────────

import StatusBadge from "../ui/StatusBadge";

const COLS = ["Student", "Course", "Price", "Date", "Status"];

export default function EnrollmentsTable({ rows = [], dark }) {
  const rowBase = `border-t transition-colors ${dark ? "border-zinc-800 hover:bg-zinc-800/30" : "border-zinc-100 hover:bg-zinc-50"}`;

  return (
    <div className={`rounded-2xl border ${dark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"}`}>
      {/* Card header */}
      <div className={`flex items-center justify-between p-5 border-b ${dark ? "border-zinc-800" : "border-zinc-200"}`}>
        <h3 className={`font-bold ${dark ? "text-white" : "text-zinc-900"}`}>Recent Enrollments</h3>
        <button className="text-xs text-amber-500 font-semibold hover:underline">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={dark ? "bg-zinc-950/50" : "bg-zinc-50"}>
              {COLS.map((h) => (
                <th key={h} className={`px-5 py-3.5 text-left text-xs font-semibold ${dark ? "text-zinc-500" : "text-zinc-500"}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={rowBase}>
                <td className={`px-5 py-3.5 font-medium ${dark ? "text-white" : "text-zinc-900"}`}>{r.student}</td>
                <td className={`px-5 py-3.5 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{r.course}</td>
                <td className="px-5 py-3.5 text-amber-500 font-bold">{r.price}</td>
                <td className={`px-5 py-3.5 text-xs ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{r.date}</td>
                <td className="px-5 py-3.5"><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && (
          <p className={`text-center py-10 text-sm ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
            No enrollments yet.
          </p>
        )}
      </div>
    </div>
  );
}
