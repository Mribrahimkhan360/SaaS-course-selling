import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Check, Zap, Shield, ArrowRight, Crown,
  Sparkles, Star
} from 'lucide-react'

/* ─── Shimmer keyframe injected once ─── */
const STYLE = `
@keyframes shimmer {
  0%   { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(220%) skewX(-12deg); }
}
@keyframes pulse-ring {
  0%, 100% { opacity: .15; transform: scale(1); }
  50%       { opacity: .30; transform: scale(1.06); }
}
@keyframes float-up {
  0%   { opacity: 0; transform: translateY(18px); }
  100% { opacity: 1; transform: translateY(0); }
}
.shimmer-btn::after {
  content: '';
  position: absolute;
  inset-block: 0;
  left: 0;
  width: 45%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
  animation: shimmer 2.6s infinite;
}
`

function injectStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('pc-styles')) {
    const s = document.createElement('style')
    s.id = 'pc-styles'
    s.textContent = STYLE
    document.head.appendChild(s)
  }
}

/* ─── Feature row ─── */
function Feature({ text, bold, isPopular }) {
  return (
    <li className="flex items-start gap-3 group/feat">
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-200 group-hover/feat:scale-110 ${
          isPopular
            ? 'bg-red-500/20 border border-red-400/30'
            : 'bg-emerald-50 border border-emerald-200'
        }`}
      >
        <Check
          className={`w-2.5 h-2.5 stroke-[3] ${isPopular ? 'text-red-400' : 'text-emerald-600'}`}
        />
      </span>
      <span
        className={`text-sm leading-snug transition-colors duration-150 ${
          isPopular
            ? `text-slate-300 group-hover/feat:text-white ${bold ? 'font-semibold text-white' : ''}`
            : `text-gray-500 group-hover/feat:text-gray-800 ${bold ? 'font-semibold text-gray-800' : ''}`
        }`}
      >
        {text}
      </span>
    </li>
  )
}

/* ─── Main Component ─── */
export default function PricingCard({ plan, isPopular = false }) {
  injectStyle()
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

  /* Subtle 3-D tilt on hover */
  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    cardRef.current.style.transform = `perspective(900px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateY(-6px)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = ''
    setHovered(false)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        animation: 'float-up .55s ease both',
        transition: 'transform .25s ease, box-shadow .25s ease',
      }}
      className={`relative rounded-3xl flex flex-col select-none ${
        isPopular
          ? 'bg-[#0F1117] border border-white/10'
          : 'bg-white border border-gray-100'
      } ${
        isPopular
          ? 'shadow-[0_24px_60px_-12px_rgba(0,0,0,0.55)]'
          : 'shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]'
      }`}
    >
      {/* Popular glow ring (behind card) */}
      {isPopular && (
        <div
          className="absolute -inset-px rounded-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(239,68,68,.35) 0%, transparent 50%, rgba(239,68,68,.15) 100%)',
            animation: 'pulse-ring 3.5s ease-in-out infinite',
          }}
        />
      )}

      {/* Decorative top-right orb */}
      {isPopular && (
        <div className="absolute top-0 right-0 w-40 h-40 rounded-3xl overflow-hidden pointer-events-none">
          <div
            className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)' }}
          />
        </div>
      )}

      {/* Subtle grid texture for popular */}
      {isPopular && (
        <div
          className="absolute inset-0 rounded-3xl opacity-[.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      )}

      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-red-500/30 tracking-wide">
            <Crown className="w-3 h-3 fill-white" />
            MOST POPULAR
          </span>
        </div>
      )}

      <div className={`relative flex flex-col flex-1 p-8 ${isPopular ? 'pt-10' : ''}`}>

        {/* Header */}
        <div className="mb-7">
          {/* Icon */}
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 ${
              hovered ? 'scale-110' : ''
            } ${
              isPopular
                ? 'bg-red-500/15 border border-red-400/25'
                : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <span className={isPopular ? 'text-red-400' : 'text-gray-500'}>
              {plan.icon}
            </span>
          </div>

          {/* Plan name */}
          <h3
            className={`text-xl font-extrabold tracking-tight mb-1.5 ${
              isPopular ? 'text-white' : 'text-gray-900'
            }`}
          >
            {plan.name}
          </h3>
          <p className={`text-sm leading-relaxed ${isPopular ? 'text-slate-400' : 'text-gray-400'}`}>
            {plan.description}
          </p>
        </div>

        {/* Price block */}
        <div className="mb-7">
          <div className="flex items-end gap-1.5">
            <span
              className={`text-5xl font-black tracking-tighter leading-none ${
                isPopular ? 'text-white' : 'text-gray-900'
              }`}
            >
              ${plan.price}
            </span>
            {plan.period && (
              <span className={`text-sm mb-1.5 ${isPopular ? 'text-slate-500' : 'text-gray-400'}`}>
                / {plan.period}
              </span>
            )}
          </div>

          {plan.originalPrice && (
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-sm line-through ${isPopular ? 'text-slate-600' : 'text-gray-400'}`}>
                ${plan.originalPrice}
              </span>
              <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                Save ${plan.originalPrice - plan.price}
              </span>
            </div>
          )}

          {/* Thin separator */}
          <div
            className={`mt-5 h-px ${
              isPopular
                ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent'
                : 'bg-gradient-to-r from-transparent via-gray-200 to-transparent'
            }`}
          />
        </div>

        {/* Features */}
        <ul className="space-y-3 flex-1 mb-8">
          {plan.features.map((feature, i) => (
            <Feature key={i} text={feature.text} bold={feature.bold} isPopular={isPopular} />
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/signup"
          className={`relative overflow-hidden w-full text-center font-bold text-sm py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 group/btn ${
            isPopular
              ? 'bg-red-500 text-white hover:bg-red-400 shadow-[0_6px_24px_-4px_rgba(239,68,68,.5)] hover:shadow-[0_8px_32px_-4px_rgba(239,68,68,.65)] shimmer-btn'
              : 'bg-gray-900 text-white hover:bg-gray-800 shadow-[0_4px_16px_-4px_rgba(0,0,0,.25)] hover:shadow-[0_6px_24px_-4px_rgba(0,0,0,.35)]'
          }`}
        >
          <Zap
            className={`w-4 h-4 transition-transform duration-200 group-hover/btn:-rotate-12 ${
              isPopular ? 'fill-white' : 'fill-white'
            }`}
          />
          {plan.cta}
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
        </Link>

        {/* Guarantee */}
        {plan.guarantee && (
          <p
            className={`flex items-center justify-center gap-1.5 text-center text-[11px] mt-3.5 ${
              isPopular ? 'text-slate-500' : 'text-gray-400'
            }`}
          >
            <Shield className="w-3 h-3 flex-shrink-0" />
            {plan.guarantee}
          </p>
        )}
      </div>
    </div>
  )
}