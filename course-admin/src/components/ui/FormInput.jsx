// src/components/ui/FormInput.jsx
// ─────────────────────────────────────────────────────────────
// Generic form input / textarea / select with dark-mode support.
// Props:
//   label      – field label text
//   type       – "text" | "email" | "password" | "number" |
//                "textarea" | "select"
//   options    – string[] (only for type="select")
//   dark       – boolean  (dark theme flag)
//   required   – boolean
//   ...rest    – forwarded to underlying element
// ─────────────────────────────────────────────────────────────

export default function FormInput({
  label,
  type = "text",
  options = [],
  dark = true,
  required = false,
  className = "",
  ...rest
}) {
  const base = `
    w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors
    ${dark
      ? "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-amber-500"
      : "bg-white   border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-400"}
    ${className}
  `;

  const labelEl = (
    <label className={`block text-xs font-semibold mb-1.5 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
      {label} {required && <span className="text-rose-400">*</span>}
    </label>
  );

  if (type === "textarea") {
    return (
      <div>
        {labelEl}
        <textarea className={`${base} resize-none`} rows={4} {...rest} />
      </div>
    );
  }

  if (type === "select") {
    return (
      <div>
        {labelEl}
        <select className={base} {...rest}>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      {labelEl}
      <input type={type} className={base} {...rest} />
    </div>
  );
}
