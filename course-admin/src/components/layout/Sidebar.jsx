// src/components/layout/Sidebar.jsx
// ─────────────────────────────────────────────────────────────
// Collapsible sidebar navigation.
// Props:
//   page        – active page key string
//   setPage     – fn(pageKey)
//   collapsed   – boolean
//   setCollapsed – fn(bool)
//   dark        – boolean
// ─────────────────────────────────────────────────────────────

import {
  LayoutDashboard, BookOpen, Users, ShoppingCart,
  FileText, User, Settings, LogOut,
  GraduationCap, ChevronLeft, ChevronRight,
} from "lucide-react";

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses",   label: "Courses",   icon: BookOpen        },
  { id: "students",  label: "Students",  icon: Users           },
  { id: "orders",    label: "Orders",    icon: ShoppingCart    },
  { id: "blogs",     label: "Blogs",     icon: FileText        },
  { id: "profile",   label: "Profile",   icon: User            },
  { id: "settings",  label: "Settings",  icon: Settings        },
];

export default function Sidebar({ page, setPage, collapsed, setCollapsed, dark }) {
  const border  = dark ? "border-zinc-800" : "border-zinc-200";
  const bg      = dark ? "bg-zinc-950"     : "bg-white";
  const textDim = dark ? "text-zinc-400"   : "text-zinc-500";

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full z-30 flex flex-col transition-all duration-300
        border-r ${bg} ${border}
        ${collapsed ? "w-16" : "w-60"}
      `}
    >
      {/* ── Logo ── */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b ${border}`}>
        <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
          <GraduationCap size={18} className="text-black" />
        </div>

        {!collapsed && (
          <span className={`font-black text-lg tracking-tight ${dark ? "text-white" : "text-zinc-900"}`}>
            LearnHub
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`ml-auto transition-colors ${dark ? "text-zinc-500 hover:text-white" : "text-zinc-400 hover:text-zinc-900"}`}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* ── Nav items ── */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = page === id || (id === "courses" && page === "addcourse");
          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`
                relative w-full flex items-center gap-3 px-4 py-2.5 my-0.5
                text-sm font-medium transition-all duration-150 group
                ${active
                  ? "text-amber-500 bg-amber-500/10"
                  : `${textDim} ${dark ? "hover:text-white hover:bg-zinc-800/50" : "hover:text-zinc-900 hover:bg-zinc-100"}`}
              `}
            >
              {/* Active indicator bar */}
              {active && (
                <span className="absolute left-0 top-1 bottom-1 w-1 bg-amber-500 rounded-r-full" />
              )}

              <Icon size={18} className="flex-shrink-0" />

              {!collapsed && <span>{label}</span>}

              {/* Tooltip when collapsed */}
              {collapsed && (
                <span className={`
                  absolute left-full ml-2 px-2.5 py-1 rounded-lg text-xs font-semibold
                  whitespace-nowrap z-50 pointer-events-none
                  opacity-0 group-hover:opacity-100 transition-opacity duration-150
                  ${dark ? "bg-zinc-800 text-white" : "bg-zinc-900 text-white"}
                `}>
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Logout ── */}
      <div className={`p-4 border-t ${border}`}>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors">
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
