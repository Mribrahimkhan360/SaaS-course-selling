// src/components/ui/Modal.jsx
// ─────────────────────────────────────────────────────────────
// Accessible modal overlay.
// Props:
//   title    – heading string
//   onClose  – callback to close
//   dark     – boolean
//   children – modal body content
// ─────────────────────────────────────────────────────────────

import { X } from "lucide-react";

export default function Modal({ title, onClose, dark = true, children }) {
  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Panel */}
      <div
        className={`w-full max-w-md rounded-2xl shadow-2xl border
          ${dark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"}`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-5 border-b ${dark ? "border-zinc-800" : "border-zinc-100"}`}>
          <h3 className={`font-bold text-lg ${dark ? "text-white" : "text-zinc-900"}`}>{title}</h3>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
              ${dark ? "text-zinc-400 hover:bg-zinc-800 hover:text-white" : "text-zinc-500 hover:bg-zinc-100"}`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
