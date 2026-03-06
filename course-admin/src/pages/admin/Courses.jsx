// src/pages/admin/Courses.jsx
// ─────────────────────────────────────────────────────────────
// Course management: search, filter by status, table + delete modal.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import CourseTable from "../../components/tables/CourseTable";
import Modal       from "../../components/ui/Modal";
import Button      from "../../components/ui/Button";
import initialData from "../../data/courses.json";

const FILTERS = ["All", "Published", "Draft"];

export default function Courses({ dark, setPage, showToast }) {
  const [courses,     setCourses]     = useState(initialData);
  const [search,      setSearch]      = useState("");
  const [filter,      setFilter]      = useState("All");
  const [deleteTarget,setDeleteTarget]= useState(null); // course to delete

  // Derived list
  const visible = courses.filter((c) =>
    (filter === "All" || c.status === filter) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    setCourses((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
    showToast("Course deleted successfully", "success");
  };

  return (
    <div className="space-y-5">

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap gap-3 items-center justify-between">

        {/* Status filters */}
        <div className="flex gap-2">
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

        <div className="flex gap-3">
          {/* Search */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm
            ${dark ? "bg-zinc-900 border-zinc-700 text-zinc-400" : "bg-white border-zinc-200"}`}
          >
            <Search size={14} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses…"
              className="bg-transparent outline-none w-36 text-sm"
            />
          </div>

          {/* Add button */}
          <Button icon={Plus} onClick={() => setPage("addcourse")}>Add Course</Button>
        </div>
      </div>

      {/* ── Table ── */}
      <CourseTable
        courses={visible}
        dark={dark}
        onEdit={(c)   => showToast(`Editing "${c.title}"`, "info")}
        onView={(c)   => showToast(`Viewing "${c.title}"`, "info")}
        onDelete={(c) => setDeleteTarget(c)}
      />

      {/* ── Delete confirmation modal ── */}
      {deleteTarget && (
        <Modal title="Delete Course" onClose={() => setDeleteTarget(null)} dark={dark}>
          <p className={`text-sm mb-5 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
            Are you sure you want to delete{" "}
            <strong className={dark ? "text-white" : "text-zinc-900"}>"{deleteTarget.title}"</strong>?
            This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setDeleteTarget(null)} className="flex-1 justify-center">
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} className="flex-1 justify-center">
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
