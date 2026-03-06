// src/components/tables/BlogTable.jsx
// ─────────────────────────────────────────────────────────────
// Blog posts management table.
// Props:
//   posts     – array of blog objects
//   dark      – boolean
//   onEdit    – fn(post)
//   onPublish – fn(post)   (shown only if status === "Draft")
//   onDelete  – fn(post)
// ─────────────────────────────────────────────────────────────

import { Edit, Trash2, Check } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";

const COLS = ["Post", "Author", "Date", "Status", "Actions"];

export default function BlogTable({ posts = [], dark, onEdit, onPublish, onDelete }) {
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
            {posts.map((b) => (
              <tr key={b.id} className={rowBase}>
                {/* Image + title */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <img src={b.img} alt={b.title} className="w-14 h-9 rounded-lg object-cover flex-shrink-0" />
                    <span className={`font-medium ${dark ? "text-white" : "text-zinc-900"}`}>{b.title}</span>
                  </div>
                </td>

                <td className={`px-5 py-3.5 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{b.author}</td>
                <td className={`px-5 py-3.5 text-xs ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{b.date}</td>
                <td className="px-5 py-3.5"><StatusBadge status={b.status} /></td>

                {/* Actions */}
                <td className="px-5 py-3.5">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit?.(b)}    title="Edit"    className="p-1.5 rounded-lg bg-blue-500/10    text-blue-400    hover:bg-blue-500/20    transition-colors"><Edit   size={14} /></button>
                    {b.status === "Draft" && (
                      <button onClick={() => onPublish?.(b)} title="Publish" className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"><Check  size={14} /></button>
                    )}
                    <button onClick={() => onDelete?.(b)}  title="Delete"  className="p-1.5 rounded-lg bg-rose-500/10    text-rose-400    hover:bg-rose-500/20    transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {posts.length === 0 && (
          <p className={`text-center py-12 text-sm ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
            No blog posts found.
          </p>
        )}
      </div>
    </div>
  );
}
