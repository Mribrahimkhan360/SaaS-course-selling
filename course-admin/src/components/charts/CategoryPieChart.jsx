// src/components/charts/CategoryPieChart.jsx
// ─────────────────────────────────────────────────────────────
// Donut pie chart showing course category breakdown.
// Props:
//   data  – array of { name, value }
//   dark  – boolean
// ─────────────────────────────────────────────────────────────

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#8b5cf6"];

function CustomTooltip({ active, payload, dark }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={`px-3 py-2 rounded-xl border shadow-lg text-xs
      ${dark ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-zinc-200 text-zinc-900"}`}
    >
      <p className="font-semibold">{payload[0].name}</p>
      <p style={{ color: payload[0].payload.fill }} className="font-bold">{payload[0].value}%</p>
    </div>
  );
}

export default function CategoryPieChart({ data, dark }) {
  return (
    <div className={`rounded-2xl border p-5 ${dark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"}`}>
      <h3 className={`font-bold ${dark ? "text-white" : "text-zinc-900"}`}>Course Categories</h3>
      <p className={`text-xs mb-4 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>Distribution by category</p>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={52}
            outerRadius={78}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip dark={dark} />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="space-y-1.5 mt-3">
        {data.map((d, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
              <span className={dark ? "text-zinc-400" : "text-zinc-600"}>{d.name}</span>
            </div>
            <span className={`font-bold ${dark ? "text-white" : "text-zinc-900"}`}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
