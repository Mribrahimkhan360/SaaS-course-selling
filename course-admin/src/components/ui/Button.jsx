// src/components/ui/Button.jsx
// ─────────────────────────────────────────────────────────────
// Reusable button with variants: primary | secondary | danger | ghost
// Sizes: sm | md (default) | lg
// ─────────────────────────────────────────────────────────────

const variants = {
  primary:   "bg-amber-500 hover:bg-amber-400 text-black font-bold",
  secondary: "bg-zinc-800  hover:bg-zinc-700  text-white font-semibold border border-zinc-700",
  danger:    "bg-rose-500  hover:bg-rose-600  text-white font-semibold",
  ghost:     "bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-white font-medium",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-4 py-2.5 text-sm rounded-xl",
  lg: "px-6 py-3   text-base rounded-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  type = "button",
  icon: Icon,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 transition-colors duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {Icon && <Icon size={size === "sm" ? 13 : size === "lg" ? 18 : 15} />}
      {children}
    </button>
  );
}
