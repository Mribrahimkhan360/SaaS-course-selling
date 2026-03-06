// src/pages/admin/AddCourse.jsx
// ─────────────────────────────────────────────────────────────
// Add / Edit course form with dynamic curriculum builder.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { Plus, Upload, X } from "lucide-react";
import FormInput from "../../components/ui/FormInput";
import Button    from "../../components/ui/Button";

const CATEGORIES = ["Development", "Design", "Marketing", "Business"];

const defaultModules = [{ title: "Introduction", lessons: ["Lesson 1 – Welcome"] }];

export default function AddCourse({ dark, setPage, showToast }) {
  const [form, setForm] = useState({
    title: "", description: "", instructor: "",
    price: "", category: "Development",
  });
  const [modules, setModules] = useState(defaultModules);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    if (!form.title.trim())      { showToast("Course title is required",      "error"); return false; }
    if (!form.instructor.trim()) { showToast("Instructor name is required",   "error"); return false; }
    return true;
  };

  // ── Module / lesson helpers ──
  const addModule  = () => setModules((p) => [...p, { title: `Module ${p.length + 1}`, lessons: ["Lesson 1"] }]);
  const removeModule = (mi) => setModules((p) => p.filter((_, i) => i !== mi));
  const updateModuleTitle = (mi, v) => setModules((p) => p.map((m, i) => i === mi ? { ...m, title: v } : m));
  const addLesson  = (mi) => setModules((p) => p.map((m, i) => i === mi ? { ...m, lessons: [...m.lessons, `Lesson ${m.lessons.length + 1}`] } : m));
  const updateLesson = (mi, li, v) => setModules((p) => p.map((m, i) => i !== mi ? m : { ...m, lessons: m.lessons.map((l, j) => j === li ? v : l) }));

  return (
    <div className="max-w-2xl space-y-5">

      {/* ── Course details card ── */}
      <div className={`rounded-2xl border p-6 space-y-4 ${dark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"}`}>
        <h2 className={`font-bold ${dark ? "text-white" : "text-zinc-900"}`}>Course Details</h2>

        <FormInput label="Course Title"   dark={dark} required value={form.title}       onChange={(e) => set("title",       e.target.value)} placeholder="e.g. React for Beginners" />
        <FormInput label="Description"    dark={dark} type="textarea" value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="What will students learn?" />

        <div className="grid grid-cols-2 gap-3">
          <FormInput label="Instructor Name" dark={dark} required value={form.instructor} onChange={(e) => set("instructor", e.target.value)} placeholder="Full name" />
          <FormInput label="Price ($)"       dark={dark} type="number" value={form.price} onChange={(e) => set("price",      e.target.value)} placeholder="49" />
        </div>

        <FormInput label="Category" dark={dark} type="select" options={CATEGORIES} value={form.category} onChange={(e) => set("category", e.target.value)} />

        {/* Thumbnail upload zone */}
        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>Thumbnail</label>
          <div className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors
            ${dark ? "border-zinc-700 hover:border-amber-500" : "border-zinc-200 hover:border-amber-400"}`}
          >
            <Upload size={20} className="mx-auto mb-2 text-zinc-400" />
            <p className={`text-xs ${dark ? "text-zinc-500" : "text-zinc-400"}`}>Click to upload or drag &amp; drop</p>
            <p className={`text-xs mt-1 ${dark ? "text-zinc-600" : "text-zinc-300"}`}>PNG, JPG, WebP – max 2 MB</p>
          </div>
        </div>
      </div>

      {/* ── Curriculum builder ── */}
      <div className={`rounded-2xl border p-6 ${dark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`font-bold ${dark ? "text-white" : "text-zinc-900"}`}>Curriculum</h2>
          <button onClick={addModule} className="text-xs text-amber-500 font-semibold flex items-center gap-1 hover:underline">
            <Plus size={13} /> Add Module
          </button>
        </div>

        <div className="space-y-3">
          {modules.map((mod, mi) => (
            <div key={mi} className={`rounded-xl border p-4 ${dark ? "border-zinc-800 bg-zinc-950/30" : "border-zinc-100 bg-zinc-50"}`}>
              {/* Module title row */}
              <div className="flex items-center gap-2 mb-3">
                <input
                  value={mod.title}
                  onChange={(e) => updateModuleTitle(mi, e.target.value)}
                  className={`flex-1 text-sm font-semibold bg-transparent outline-none border-b pb-0.5 transition-colors
                    ${dark ? "text-white border-zinc-700 focus:border-amber-500" : "text-zinc-900 border-zinc-200 focus:border-amber-400"}`}
                />
                <button onClick={() => removeModule(mi)} className="text-zinc-500 hover:text-rose-400 transition-colors"><X size={14} /></button>
              </div>

              {/* Lessons */}
              {mod.lessons.map((les, li) => (
                <div key={li} className="flex items-center gap-2 mb-1.5 ml-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                  <input
                    value={les}
                    onChange={(e) => updateLesson(mi, li, e.target.value)}
                    className={`flex-1 text-xs bg-transparent outline-none ${dark ? "text-zinc-400" : "text-zinc-600"}`}
                  />
                </div>
              ))}

              <button onClick={() => addLesson(mi)} className="ml-3 mt-1 text-xs text-amber-500 hover:underline">
                + Add Lesson
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div className="flex gap-3">
        <Button variant="ghost"     onClick={() => setPage("courses")}>Cancel</Button>
        <Button variant="secondary" onClick={() => { if (validate()) { showToast("Draft saved!", "info"); setPage("courses"); } }}>Save Draft</Button>
        <Button variant="primary"   onClick={() => { if (validate()) { showToast("Course published!", "success"); setPage("courses"); } }}>Publish Course</Button>
      </div>
    </div>
  );
}
