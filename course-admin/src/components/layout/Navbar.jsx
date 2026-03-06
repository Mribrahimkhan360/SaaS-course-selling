// src/components/layout/Navbar.jsx
// ─────────────────────────────────────────────────────────────
// Top fixed navbar: page title, search, notifications, dark-toggle, avatar.
// Props:
//   page            – active page key
//   dark            – boolean
//   toggleDark      – fn()
//   sidebarCollapsed – boolean (controls left offset)
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { Bell, Search, Moon, Sun, X } from "lucide-react";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  courses:   "Courses",
  addcourse: "Add New Course",
  students:  "Students",
  orders:    "Orders",
  blogs:     "Blogs",
  profile:   "Profile",
  settings:  "Settings",
};

const NOTIFICATIONS = [
  { text: "New student enrolled in React course",  time: "2m ago"  },
  { text: "Order #ORD-007 placed",                 time: "10m ago" },
  { text: "Blog post awaiting review",             time: "1h ago"  },
];

export default function Navbar({ page, dark, toggleDark, sidebarCollapsed }) {
  const [notifOpen, setNotifOpen] = useState(false);

  const border = dark ? "border-zinc-800" : "border-zinc-200";
  const bg     = dark ? "bg-zinc-950/90 backdrop-blur-md" : "bg-white/90 backdrop-blur-md";

  return (
    <header
      className={`
        fixed top-0 right-0 z-20 h-16 flex items-center gap-4 px-6
        border-b transition-all duration-300
        ${bg} ${border}
        ${sidebarCollapsed ? "left-16" : "left-60"}
      `}
    >
      {/* Page title */}
      <h1 className={`text-lg font-bold ${dark ? "text-white" : "text-zinc-900"}`}>
        {PAGE_TITLES[page] ?? "Admin"}
      </h1>

      <div className="flex-1" />

      {/* Search bar (desktop) */}
      <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm
        ${dark ? "bg-zinc-900 border-zinc-700 text-zinc-400" : "bg-zinc-50 border-zinc-200 text-zinc-500"}`}
      >
        <Search size={14} />
        <input
          placeholder="Search..."
          className="bg-transparent outline-none w-40 placeholder:text-current text-sm"
        />
      </div>

      {/* Notification bell */}
      <div className="relative">
        <button
          onClick={() => setNotifOpen((o) => !o)}
          className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors
            ${dark ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-100 text-zinc-600"}`}
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
        </button>

        {notifOpen && (
          <div className={`absolute right-0 top-11 w-72 rounded-xl shadow-2xl border z-50
            ${dark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"}`}
          >
            {/* Notif header */}
            <div className={`flex items-center justify-between px-4 py-3 border-b ${dark ? "border-zinc-800" : "border-zinc-100"}`}>
              <p className={`font-bold text-sm ${dark ? "text-white" : "text-zinc-900"}`}>Notifications</p>
              <button onClick={() => setNotifOpen(false)} className={dark ? "text-zinc-500 hover:text-white" : "text-zinc-400"}>
                <X size={14} />
              </button>
            </div>

            {NOTIFICATIONS.map((n, i) => (
              <div key={i} className={`flex gap-3 p-4 border-b last:border-0 ${dark ? "border-zinc-800" : "border-zinc-50"}`}>
                <span className="w-2 h-2 mt-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                <div>
                  <p className={`text-xs ${dark ? "text-zinc-300" : "text-zinc-700"}`}>{n.text}</p>
                  <p className={`text-xs mt-1 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dark-mode toggle */}
      <button
        onClick={toggleDark}
        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors
          ${dark ? "hover:bg-zinc-800 text-amber-400" : "hover:bg-zinc-100 text-zinc-600"}`}
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Admin avatar */}
      <div className="flex items-center gap-2">
        <img src="https://i.pravatar.cc/40?img=10" className="w-8 h-8 rounded-full ring-2 ring-amber-500" alt="admin" />
        <div className="hidden md:block">
          <p className={`text-xs font-bold ${dark ? "text-white" : "text-zinc-900"}`}>Admin</p>
          <p className={`text-xs ${dark ? "text-zinc-500" : "text-zinc-400"}`}>Super Admin</p>
        </div>
      </div>
    </header>
  );
}
