// src/components/ui/Toast.jsx
// ─────────────────────────────────────────────────────────────
// Auto-dismissing toast notification (bottom-right corner).
// Props:
//   msg      – message string
//   type     – "success" | "error" | "info"
//   onClose  – callback fired after 3s or on manual close
// ─────────────────────────────────────────────────────────────

import { useEffect } from "react";
import { Check, AlertCircle, X } from "lucide-react";

const styles = {
  success: { bg: "bg-emerald-500", Icon: Check     },
  error:   { bg: "bg-rose-500",    Icon: AlertCircle },
  info:    { bg: "bg-amber-500",   Icon: AlertCircle },
};

export default function Toast({ msg, type = "success", onClose }) {
  // Auto-dismiss after 3 s
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const { bg, Icon } = styles[type] ?? styles.info;

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-[60] flex items-center gap-3
        ${bg} text-white px-5 py-3 rounded-xl shadow-2xl
        text-sm font-medium
        animate-[slideUp_0.3s_ease]
      `}
    >
      <Icon size={16} className="flex-shrink-0" />
      <span>{msg}</span>
      <button onClick={onClose} className="ml-1 opacity-70 hover:opacity-100 transition-opacity">
        <X size={14} />
      </button>
    </div>
  );
}
