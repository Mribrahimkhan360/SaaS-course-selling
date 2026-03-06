// src/components/layout/DashboardLayout.jsx
// ─────────────────────────────────────────────────────────────
// Shell layout: Sidebar + Navbar + scrollable main content.
// Handles both desktop (collapsible sidebar) and mobile
// (drawer sidebar with overlay).
//
// Props:
//   page        – active page key
//   setPage     – fn(pageKey)
//   dark        – boolean
//   toggleDark  – fn()
//   children    – page content
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import Navbar  from "./Navbar";

export default function DashboardLayout({ page, setPage, dark, toggleDark, children }) {
  const [collapsed,   setCollapsed]   = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  return (
    <div className={`min-h-screen ${dark ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-900"}`}>

      {/* ── Desktop sidebar ── */}
      <div className="hidden md:block">
        <Sidebar
          page={page}
          setPage={setPage}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          dark={dark}
        />
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 h-full w-60">
            <Sidebar
              page={page}
              setPage={(p) => { setPage(p); setMobileOpen(false); }}
              collapsed={false}
              setCollapsed={() => {}}
              dark={dark}
            />
          </div>
        </div>
      )}

      {/* ── Mobile hamburger ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className={`
          md:hidden fixed top-3.5 left-4 z-20 w-9 h-9 rounded-xl
          flex items-center justify-center border shadow-sm
          ${dark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}
        `}
      >
        <Menu size={18} />
      </button>

      {/* ── Top navbar ── */}
      <Navbar
        page={page}
        dark={dark}
        toggleDark={toggleDark}
        sidebarCollapsed={collapsed}
      />

      {/* ── Page content ── */}
      <main className={`pt-16 transition-all duration-300 ${collapsed ? "md:ml-16" : "md:ml-60"} p-6`}>
        {children}
      </main>
    </div>
  );
}
