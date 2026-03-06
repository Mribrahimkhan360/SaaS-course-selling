// src/components/ui/StatsCard.jsx
// ─────────────────────────────────────────────────────────────
// Dashboard metric card with icon, value, label, growth %.
// Props:
//   icon    – Lucide icon component
//   value   – display value string e.g. "$12,430"
//   label   – card subtitle
//   growth  – number (positive = up, negative = down)
//   color   – "amber" | "blue" | "emerald" | "violet"
//   dark    – boolean
// ─────────────────────────────────────────────────────────────

import { ChevronUp, ChevronDown } from "lucide-react";

const iconColors = {
  amber:   "bg-amber-500/15   text-amber-500",
  blue:    "bg-blue-500/15    text-blue-400",
  emerald: "bg-emerald-500/15 text-emerald-400",
  violet:  "bg-violet-500/15  text-violet-400",
};

export default function StatsCard({ icon: Icon, value, label, growth, color = "amber", dark }) {
  const positive = growth >= 0;

  return (
    <div
      className={`
        rounded-2xl p-5 border transition-all duration-200
        hover:scale-[1.02] hover:shadow-lg
        ${dark
          ? "bg-zinc-900 border-zinc-800"
          : "bg-white border-zinc-200 shadow-sm"}
      `}
    >
      {/* Top row: icon + growth */}
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconColors[color]}`}>
          <Icon size={20} />
        </div>
        <span
          className={`text-xs font-semibold flex items-center gap-0.5
            ${positive ? "text-emerald-400" : "text-rose-400"}`}
        >
          {positive ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {Math.abs(growth)}%
        </span>
      </div>

      {/* Value */}
      <p className={`text-2xl font-black mt-3 tracking-tight ${dark ? "text-white" : "text-zinc-900"}`}>
        {value}
      </p>

      {/* Label */}
      <p className={`text-sm mt-0.5 ${dark ? "text-zinc-500" : "text-zinc-500"}`}>
        {label}
      </p>
    </div>
  );
}
