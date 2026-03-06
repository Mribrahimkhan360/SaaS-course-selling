// src/components/ui/StatusBadge.jsx
// ─────────────────────────────────────────────────────────────
// Renders a colour-coded pill badge for any status string.
// Supported values: Published | Draft | Active | Inactive |
//                   Paid | Pending | Refunded
// ─────────────────────────────────────────────────────────────

const colorMap = {
  Published: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Active:    "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Paid:      "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Draft:     "bg-zinc-500/15    text-zinc-400    border-zinc-500/30",
  Inactive:  "bg-zinc-500/15    text-zinc-400    border-zinc-500/30",
  Pending:   "bg-amber-500/15   text-amber-400   border-amber-500/30",
  Refunded:  "bg-rose-500/15    text-rose-400    border-rose-500/30",
};

export default function StatusBadge({ status }) {
  const cls = colorMap[status] ?? "bg-zinc-700 text-zinc-300 border-zinc-600";
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cls}`}>
      {status}
    </span>
  );
}
