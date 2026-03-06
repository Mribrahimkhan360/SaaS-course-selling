// src/components/tables/CourseTable.jsx
// ─────────────────────────────────────────────────────────────
// Courses management table with Edit / View / Delete actions.
// Props:
//   courses     – array of course objects
//   dark        – boolean
//   onEdit      – fn(course)
//   onView      – fn(course)
//   onDelete    – fn(course)  → triggers confirmation modal in parent
// ─────────────────────────────────────────────────────────────

import { Edit, Eye, Trash2, Star } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";

const COLS = ["Course", "Instructor", "Students", "Price", "Rating", "Status", "Actions"];

export default function CourseTable({ courses = [], dark, onEdit, onView, onDelete }) {
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
            {courses.map((c) => (
              <tr key={c.id} className={rowBase}>
                {/* Thumbnail + title */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <img src={c.thumb} alt={c.title} className="w-12 h-8 rounded-lg object-cover flex-shrink-0" />
                    <span className={`font-medium ${dark ? "text-white" : "text-zinc-900"}`}>{c.title}</span>
                  </div>
                </td>

                <td className={`px-5 py-3.5 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{c.instructor}</td>

                <td className={`px-5 py-3.5 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
                  {c.students.toLocaleString()}
                </td>

                <td className="px-5 py-3.5 text-amber-500 font-bold">${c.price}</td>

                {/* Rating */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className={`text-xs ${dark ? "text-zinc-300" : "text-zinc-700"}`}>{c.rating}</span>
                  </div>
                </td>

                <td className="px-5 py-3.5"><StatusBadge status={c.status} /></td>

                {/* Actions */}
                <td className="px-5 py-3.5">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit?.(c)}   title="Edit"   className="p-1.5 rounded-lg bg-blue-500/10  text-blue-400  hover:bg-blue-500/20  transition-colors"><Edit   size={14} /></button>
                    <button onClick={() => onView?.(c)}   title="View"   className="p-1.5 rounded-lg bg-zinc-500/10  text-zinc-400  hover:bg-zinc-500/20  transition-colors"><Eye    size={14} /></button>
                    <button onClick={() => onDelete?.(c)} title="Delete" className="p-1.5 rounded-lg bg-rose-500/10  text-rose-400  hover:bg-rose-500/20  transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {courses.length === 0 && (
          <p className={`text-center py-12 text-sm ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
            No courses found.
          </p>
        )}
      </div>
    </div>
  );
}
