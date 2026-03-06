// src/pages/admin/Students.jsx
// ─────────────────────────────────────────────────────────────
// Students management: search + table.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { Search }   from "lucide-react";
import StudentTable from "../../components/tables/StudentTable";
import initialData  from "../../data/students.json";

export default function Students({ dark, showToast }) {
  const [students, setStudents] = useState(initialData);
  const [search,   setSearch]   = useState("");

  const visible = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleRemove = (student) => {
    setStudents((prev) => prev.filter((s) => s.id !== student.id));
    showToast(`${student.name} removed`, "success");
  };

  return (
    <div className="space-y-5">

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className={`text-sm ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
          {visible.length} student{visible.length !== 1 ? "s" : ""} found
        </p>

        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm
          ${dark ? "bg-zinc-900 border-zinc-700 text-zinc-400" : "bg-white border-zinc-200"}`}
        >
          <Search size={14} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="bg-transparent outline-none w-44 text-sm"
          />
        </div>
      </div>

      {/* ── Table ── */}
      <StudentTable
        students={visible}
        dark={dark}
        onView={(s)   => showToast(`Viewing ${s.name}'s profile`, "info")}
        onRemove={handleRemove}
      />
    </div>
  );
}
