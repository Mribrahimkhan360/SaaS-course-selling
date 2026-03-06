// src/components/tables/StudentTable.jsx
// ─────────────────────────────────────────────────────────────
// Students management table.
// Props:
//   students  – array of student objects
//   dark      – boolean
//   onView    – fn(student)
//   onRemove  – fn(student)
// ─────────────────────────────────────────────────────────────

import { Eye, Trash2 } from "lucide-react";

const COLS = ["Student", "Email", "Courses", "Joined", "Actions"];

export default function StudentTable({ students = [], dark, onView, onRemove }) {
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
            {students.map((s) => (
              <tr key={s.id} className={rowBase}>
                {/* Avatar + name */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full flex-shrink-0" />
                    <span className={`font-medium ${dark ? "text-white" : "text-zinc-900"}`}>{s.name}</span>
                  </div>
                </td>

                <td className={`px-5 py-3.5 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{s.email}</td>

                {/* Courses badge */}
                <td className="px-5 py-3.5">
                  <span className="bg-amber-500/15 text-amber-500 text-xs font-bold px-2.5 py-1 rounded-full">
                    {s.courses} course{s.courses !== 1 ? "s" : ""}
                  </span>
                </td>

                <td className={`px-5 py-3.5 text-xs ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{s.joined}</td>

                {/* Actions */}
                <td className="px-5 py-3.5">
                  <div className="flex gap-2">
                    <button onClick={() => onView?.(s)}   title="View Profile" className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"><Eye    size={14} /></button>
                    <button onClick={() => onRemove?.(s)} title="Remove"       className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {students.length === 0 && (
          <p className={`text-center py-12 text-sm ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
            No students found.
          </p>
        )}
      </div>
    </div>
  );
}
