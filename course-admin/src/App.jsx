// src/App.jsx
// ─────────────────────────────────────────────────────────────
// Root component: wires together state, layout, router, toast.
// ─────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import DashboardLayout from "./components/layout/DashboardLayout";
import AppRouter       from "./router/AppRouter";
import Toast           from "./components/ui/Toast";

export default function App() {
  const [dark,  setDark]  = useState(true);
  const [page,  setPage]  = useState("dashboard");
  const [toast, setToast] = useState(null); // { msg, type }

  const toggleDark = () => setDark((d) => !d);

  // Stable showToast reference so children don't re-render unnecessarily
  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
  }, []);

  return (
    <>
      <DashboardLayout page={page} setPage={setPage} dark={dark} toggleDark={toggleDark}>
        <AppRouter
          page={page}
          setPage={setPage}
          dark={dark}
          toggleDark={toggleDark}
          showToast={showToast}
        />
      </DashboardLayout>

      {/* Global toast */}
      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
