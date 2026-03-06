// src/components/charts/RevenueChart.jsx
// ─────────────────────────────────────────────────────────────
// Monthly revenue area chart using Recharts.
// Props:
//   data  – array of { month, revenue }
//   dark  – boolean
// ─────────────────────────────────────────────────────────────

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom tooltip box
function CustomTooltip({ active, payload, label, dark }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={`px-4 py-3 rounded-xl border shadow-xl text-sm
      ${dark ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-zinc-200 text-zinc-900"}`}
    >
      <p className="font-bold mb-1">{label}</p>
      <p className="text-amber-400 font-semibold">
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export default function RevenueChart({ data, dark }) {
  const grid  = dark ? "#27272a" : "#f4f4f5";
  const tick  = dark ? "#71717a" : "#a1a1aa";

  return (
    <div className={`rounded-2xl border p-5 ${dark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`font-bold ${dark ? "text-white" : "text-zinc-900"}`}>Revenue Overview</h3>
          <p className={`text-xs mt-0.5 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>Monthly revenue trend</p>
        </div>
        <span className="text-xs bg-amber-500/15 text-amber-500 px-3 py-1 rounded-full font-semibold">2024</span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}   />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke={grid} />

          <XAxis
            dataKey="month"
            tick={{ fill: tick, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: tick, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip dark={dark} />} />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#f59e0b"
            strokeWidth={2.5}
            fill="url(#revGrad)"
            dot={false}
            activeDot={{ r: 5, fill: "#f59e0b", stroke: dark ? "#18181b" : "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
