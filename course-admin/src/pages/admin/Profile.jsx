// src/pages/admin/Profile.jsx
// ─────────────────────────────────────────────────────────────
// Admin profile: avatar upload, name/email/password fields,
// quick stats summary card.
// ─────────────────────────────────────────────────────────────

import { useState }  from "react";
import { Upload }    from "lucide-react";
import FormInput     from "../../components/ui/FormInput";
import Button        from "../../components/ui/Button";

const STATS = [
  { label: "Courses Created",  value: "42"     },
  { label: "Total Revenue",    value: "$12.4k"  },
  { label: "Active Students",  value: "1,280"  },
];

export default function Profile({ dark, showToast }) {
  const [form, setForm] = useState({
    name:     "Admin User",
    email:    "admin@learnhub.com",
    password: "",
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="max-w-lg space-y-5">

      {/* ── Profile card ── */}
      <div className={`rounded-2xl border p-6 ${dark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"}`}>

        {/* Avatar row */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/80?img=10"
              alt="admin"
              className="w-20 h-20 rounded-2xl ring-2 ring-amber-500 object-cover"
            />
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-500 hover:bg-amber-400 transition-colors rounded-full flex items-center justify-center shadow-md">
              <Upload size={12} className="text-black" />
            </button>
          </div>
          <div>
            <p className={`font-black text-lg ${dark ? "text-white" : "text-zinc-900"}`}>{form.name}</p>
            <p className={`text-sm ${dark ? "text-zinc-500" : "text-zinc-400"}`}>Super Administrator</p>
            <span className="mt-1.5 inline-block text-xs bg-amber-500/15 text-amber-500 font-semibold px-2.5 py-0.5 rounded-full">
              Pro Plan
            </span>
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <FormInput
            label="Full Name" dark={dark} required
            value={form.name} onChange={(e) => set("name", e.target.value)}
          />
          <FormInput
            label="Email Address" dark={dark} type="email"
            value={form.email} onChange={(e) => set("email", e.target.value)}
          />
          <FormInput
            label="New Password" dark={dark} type="password"
            value={form.password} onChange={(e) => set("password", e.target.value)}
            placeholder="Leave blank to keep current"
          />
        </div>

        <Button className="w-full justify-center mt-6" onClick={() => showToast("Profile updated!", "success")}>
          Update Profile
        </Button>
      </div>

      {/* ── Quick stats ── */}
      <div className={`rounded-2xl border p-5 grid grid-cols-3 gap-4 text-center
        ${dark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"}`}
      >
        {STATS.map(({ label, value }) => (
          <div key={label}>
            <p className={`text-xl font-black ${dark ? "text-white" : "text-zinc-900"}`}>{value}</p>
            <p className={`text-xs mt-0.5 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
