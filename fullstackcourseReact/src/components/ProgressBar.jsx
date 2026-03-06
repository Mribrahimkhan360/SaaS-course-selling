import { useEffect, useRef, useState } from 'react'
import {
  TrendingUp, Flame, Droplets, Star, Zap,
  CheckCircle2, Clock, Target
} from 'lucide-react'

/* ─── Inject keyframes once ─── */
const CSS = `
@keyframes pb-fill {
  from { width: 0%; }
  to   { width: var(--pb-w); }
}
@keyframes pb-shimmer {
  0%   { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(350%)  skewX(-15deg); }
}
@keyframes pb-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: .45; }
}
@keyframes pb-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.pb-track  { position: relative; overflow: hidden; }
.pb-fill   {
  height: 100%;
  border-radius: inherit;
  animation: pb-fill .95s cubic-bezier(.4,0,.2,1) both;
  position: relative;
  overflow: hidden;
}
.pb-fill::after {
  content: '';
  position: absolute;
  inset-block: 0;
  left: 0;
  width: 30%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.38), transparent);
  animation: pb-shimmer 2.2s ease-in-out infinite;
}
.pb-dot-pulse { animation: pb-pulse 1.5s ease-in-out infinite; }
.pb-wrap { animation: pb-in .4s ease both; }
`

function injectCSS() {
  if (typeof document !== 'undefined' && !document.getElementById('pb-css')) {
    const s = document.createElement('style')
    s.id = 'pb-css'
    s.textContent = CSS
    document.head.appendChild(s)
  }
}

/* ─── Config ─── */
const SIZES = {
  xs: { track: 'h-1',    radius: 'rounded-full' },
  sm: { track: 'h-2',    radius: 'rounded-full' },
  md: { track: 'h-3',    radius: 'rounded-full' },
  lg: { track: 'h-4',    radius: 'rounded-full' },
  xl: { track: 'h-5',    radius: 'rounded-xl'   },
}

const PALETTES = {
  red: {
    fill:    'bg-gradient-to-r from-rose-500 to-red-500',
    track:   'bg-rose-100',
    dot:     'bg-rose-500',
    text:    'text-rose-600',
    badge:   'bg-rose-50 border-rose-200 text-rose-600',
    glow:    'shadow-[0_0_12px_2px_rgba(239,68,68,.35)]',
    icon:    Flame,
  },
  green: {
    fill:    'bg-gradient-to-r from-emerald-400 to-green-500',
    track:   'bg-emerald-100',
    dot:     'bg-emerald-500',
    text:    'text-emerald-600',
    badge:   'bg-emerald-50 border-emerald-200 text-emerald-600',
    glow:    'shadow-[0_0_12px_2px_rgba(16,185,129,.35)]',
    icon:    TrendingUp,
  },
  blue: {
    fill:    'bg-gradient-to-r from-sky-400 to-blue-500',
    track:   'bg-sky-100',
    dot:     'bg-blue-500',
    text:    'text-blue-600',
    badge:   'bg-sky-50 border-sky-200 text-blue-600',
    glow:    'shadow-[0_0_12px_2px_rgba(59,130,246,.35)]',
    icon:    Droplets,
  },
  amber: {
    fill:    'bg-gradient-to-r from-amber-400 to-orange-400',
    track:   'bg-amber-100',
    dot:     'bg-amber-500',
    text:    'text-amber-600',
    badge:   'bg-amber-50 border-amber-200 text-amber-600',
    glow:    'shadow-[0_0_12px_2px_rgba(245,158,11,.35)]',
    icon:    Star,
  },
  violet: {
    fill:    'bg-gradient-to-r from-violet-400 to-purple-500',
    track:   'bg-violet-100',
    dot:     'bg-violet-500',
    text:    'text-violet-600',
    badge:   'bg-violet-50 border-violet-200 text-violet-600',
    glow:    'shadow-[0_0_12px_2px_rgba(139,92,246,.35)]',
    icon:    Zap,
  },
}

/* ─── Milestone marker ─── */
function Milestone({ pct, reached }) {
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
      style={{ left: `${pct}%` }}
    >
      <div
        className={`w-2.5 h-2.5 rounded-full border-2 border-white ring-1 transition-colors duration-500 ${
          reached ? 'bg-gray-700 ring-gray-400' : 'bg-white ring-gray-300'
        }`}
      />
    </div>
  )
}

/* ─── Main component ─── */
export default function ProgressBar({
  progress   = 0,
  label      = '',
  sublabel   = '',
  showLabel  = true,
  showBadge  = true,
  size       = 'md',
  color      = 'red',
  milestones = [],      // e.g. [25, 50, 75]
  icon,                 // override icon (Lucide component)
  animate    = true,
  striped    = false,
  className  = '',
}) {
  injectCSS()

  const clamp   = Math.min(100, Math.max(0, progress))
  const palette = PALETTES[color] ?? PALETTES.red
  const track   = SIZES[size]    ?? SIZES.md
  const Icon    = icon ?? palette.icon

  const done    = clamp >= 100
  const started = clamp > 0

  /* animate width from 0 → clamp */
  const [displayed, setDisplayed] = useState(animate ? 0 : clamp)
  const raf = useRef(null)

  useEffect(() => {
    if (!animate) { setDisplayed(clamp); return }
    const start = performance.now()
    const from  = displayed
    const diff  = clamp - from
    const dur   = 900

    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setDisplayed(from + diff * ease)
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [clamp])

  return (
    <div className={`pb-wrap w-full ${className}`}>
      {/* Label row */}
      {showLabel && (
        <div className="flex items-center justify-between mb-2 gap-3">
          <div className="flex items-center gap-2 min-w-0">
            {/* Icon chip */}
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                started ? palette.badge : 'bg-gray-100 border border-gray-200'
              }`}
            >
              {done
                ? <CheckCircle2 className={`w-3.5 h-3.5 ${palette.text}`} />
                : <Icon className={`w-3.5 h-3.5 ${started ? palette.text : 'text-gray-400'}`} />
              }
            </div>

            {/* Text */}
            <div className="min-w-0">
              {label && (
                <p className="text-xs font-semibold text-gray-800 truncate leading-tight">
                  {label}
                </p>
              )}
              {sublabel && (
                <p className="text-[10px] text-gray-400 truncate leading-tight mt-0.5">
                  {sublabel}
                </p>
              )}
            </div>
          </div>

          {/* Percentage badge */}
          {showBadge && (
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 tabular-nums transition-colors duration-300 ${
                started ? palette.badge : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}
            >
              {done && <CheckCircle2 className="w-2.5 h-2.5" />}
              {Math.round(displayed)}%
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div
        className={`pb-track w-full ${track.track} ${track.radius} bg-opacity-80 ${
          color === 'red'    ? 'bg-rose-100'   :
          color === 'green'  ? 'bg-emerald-100' :
          color === 'blue'   ? 'bg-sky-100'    :
          color === 'amber'  ? 'bg-amber-100'  :
          'bg-violet-100'
        }`}
      >
        {/* Milestones */}
        {milestones.map(m => (
          <Milestone key={m} pct={m} reached={clamp >= m} />
        ))}

        {/* Fill */}
        {started && (
          <div
            className={`pb-fill ${track.radius} ${palette.fill} ${
              clamp > 60 ? palette.glow : ''
            } ${striped ? 'progress-striped' : ''}`}
            style={{
              '--pb-w': `${clamp}%`,
              width: `${displayed}%`,
              animation: animate ? undefined : 'none',
            }}
            role="progressbar"
            aria-valuenow={clamp}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label || 'Progress'}
          />
        )}

        {/* Leading dot pulse */}
        {started && !done && (
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
            style={{ left: `${displayed}%` }}
          >
            <div className={`w-2 h-2 rounded-full ${palette.dot} pb-dot-pulse`} />
          </div>
        )}
      </div>
    </div>
  )
}