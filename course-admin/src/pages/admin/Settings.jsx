// src/pages/admin/Settings.jsx
// ─────────────────────────────────────────────────────────────
// Settings: appearance (dark mode toggle) + notification toggles.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import Button from "../../components/ui/Button";

// Reusable toggle row
function ToggleRow({ label, desc, value, onChange, dark }) {
  return (
    <div className={`flex items-center justify-between py-3 border-b last:border-0 ${dark ? "border-zinc-800" : "border-zinc-100"}`}>
      <div>
        <p className={`text-sm font-medium ${dark ? "text-white" : "text-zinc-900"}`}>{label}</p>
        {desc && <p className={`text-xs mt-0.5 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{desc}</p>}
      </div>

      {/* Toggle switch */}
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200
          ${value ? "bg-amber-500" : dark ? "bg-zinc-700" : "bg-zinc-300"}`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200
            ${value ? "translate-x-5" : "translate-x-0.5"}`}
        />
      </button>
    </div>
  );
}

// Section card wrapper
function Section({ title, dark, children }) {
  return (
    <div className={`rounded-2xl border p-5 ${dark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"}`}>
      <h3 className={`font-bold text-sm mb-4 ${dark ? "text-white" : "text-zinc-900"}`}>{title}</h3>
      {children}
    </div>
  );
}

export default function Settings({ dark, toggleDark, showToast }) {
  const [notif, setNotif] = useState({ email: true, sms: false, push: true });
  const setN = (k) => (v) => setNotif((p) => ({ ...p, [k]: v }));

  return (
    <div className="max-w-lg space-y-5">

      {/* ── Appearance ── */}
      <Section title="Appearance" dark={dark}>
        <ToggleRow
          label="Dark Mode"
          desc="Switch between light and dark theme"
          value={dark}
          onChange={toggleDark}
          dark={dark}
        />
      </Section>

      {/* ── Notifications ── */}
      <Section title="Notifications" dark={dark}>
        <ToggleRow label="Email Notifications"   desc="Receive updates via email"            value={notif.email} onChange={setN("email")} dark={dark} />
        <ToggleRow label="SMS Notifications"     desc="Receive updates via SMS"              value={notif.sms}   onChange={setN("sms")}   dark={dark} />
        <ToggleRow label="Push Notifications"    desc="Browser push notifications"           value={notif.push}  onChange={setN("push")}  dark={dark} />
      </Section>

      {/* ── Security ── */}
      <Section title="Security" dark={dark}>
        <ToggleRow label="Two-Factor Authentication" desc="Add an extra layer of account security" value={false} onChange={() => showToast("2FA setup coming soon", "info")} dark={dark} />
      </Section>

      <Button className="w-full justify-center" onClick={() => showToast("Settings saved!", "success")}>
        Save Settings
      </Button>
    </div>
  );
}
