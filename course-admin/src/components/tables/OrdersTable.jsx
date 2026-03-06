// src/components/tables/OrdersTable.jsx
// ─────────────────────────────────────────────────────────────
// Sales / orders management table.
// Props:
//   orders – array of order objects
//   dark   – boolean
// ─────────────────────────────────────────────────────────────

import StatusBadge from "../ui/StatusBadge";

const COLS = ["Order ID", "Student", "Course", "Amount", "Method", "Date", "Status"];

export default function OrdersTable({ orders = [], dark }) {
  const rowBase = `border-t transition-colors ${dark ? "border-zinc-800 hover:bg-zinc-800/30" : "border-zinc-100 hover:bg-zinc-50"}`;

  return (
    <div className={`rounded-2xl border ${dark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"}`}>
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
            {orders.map((o, i) => (
              <tr key={i} className={rowBase}>
                <td className="px-5 py-3.5 font-mono text-xs font-bold text-amber-500">{o.id}</td>
                <td className={`px-5 py-3.5 font-medium ${dark ? "text-white" : "text-zinc-900"}`}>{o.student}</td>
                <td className={`px-5 py-3.5 text-xs ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{o.course}</td>
                <td className="px-5 py-3.5 font-bold text-emerald-400">${o.amount}</td>
                <td className={`px-5 py-3.5 text-xs ${dark ? "text-zinc-400" : "text-zinc-500"}`}>{o.method}</td>
                <td className={`px-5 py-3.5 text-xs ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{o.date}</td>
                <td className="px-5 py-3.5"><StatusBadge status={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className={`text-center py-12 text-sm ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
}
