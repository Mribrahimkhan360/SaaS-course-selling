// src/pages/admin/Orders.jsx
// ─────────────────────────────────────────────────────────────
// Orders / sales page: summary cards, status filter, table.
// ─────────────────────────────────────────────────────────────

import { useState }   from "react";
import OrdersTable    from "../../components/tables/OrdersTable";
import initialOrders  from "../../data/orders.json";

const FILTERS = ["All", "Paid", "Pending", "Refunded"];

export default function Orders({ dark }) {
  const [filter, setFilter] = useState("All");

  const visible = initialOrders.filter((o) => filter === "All" || o.status === filter);

  const totalRevenue = initialOrders
    .filter((o) => o.status === "Paid")
    .reduce((sum, o) => sum + o.amount, 0);

  const summaryCards = [
    { label: "Total Revenue",   value: `$${totalRevenue}`, color: "text-emerald-400" },
    { label: "Paid Orders",     value: initialOrders.filter((o) => o.status === "Paid").length,     color: "text-blue-400"    },
    { label: "Pending Orders",  value: initialOrders.filter((o) => o.status === "Pending").length,  color: "text-amber-400"   },
    { label: "Refunded Orders", value: initialOrders.filter((o) => o.status === "Refunded").length, color: "text-rose-400"    },
  ];

  return (
    <div className="space-y-5">

      {/* ── Summary cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map(({ label, value, color }) => (
          <div key={label} className={`rounded-2xl border p-4 ${dark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"}`}>
            <p className={`text-xs ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{label}</p>
            <p className={`text-2xl font-black mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* ── Status filters ── */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors
              ${filter === f
                ? "bg-amber-500 text-black"
                : dark
                  ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Table ── */}
      <OrdersTable orders={visible} dark={dark} />
    </div>
  );
}
