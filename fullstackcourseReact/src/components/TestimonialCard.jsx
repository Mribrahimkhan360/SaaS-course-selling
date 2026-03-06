import { useState, useRef } from 'react'
import { Star, Quote, BadgeCheck, BookOpen, ThumbsUp } from 'lucide-react'

/* ─── Inject keyframes once ─── */
const CSS = `
@keyframes tc-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes tc-shimmer {
  0%   { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(260%)  skewX(-12deg); }
}
@keyframes tc-star {
  0%,100% { transform: scale(1);    }
  50%     { transform: scale(1.25); }
}
.tc-card  { animation: tc-in .45s cubic-bezier(.4,0,.2,1) both; }
.tc-avatar-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent);
  animation: tc-shimmer 2.8s ease-in-out infinite;
}
.tc-star-pop { animation: tc-star .3s ease; }
`
function injectCSS() {
  if (typeof document !== 'undefined' && !document.getElementById('tc-css')) {
    const s = document.createElement('style')
    s.id = 'tc-css'
    s.textContent = CSS
    document.head.appendChild(s)
  }
}

/* ─── Stars ─── */
function Stars({ count }) {
  const [popIdx, setPopIdx] = useState(null)
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          onMouseEnter={() => setPopIdx(n)}
          onMouseLeave={() => setPopIdx(null)}
          className={`w-3.5 h-3.5 cursor-default transition-all duration-150 ${
            n <= count
              ? 'text-amber-400 fill-amber-400'
              : 'text-gray-200 fill-gray-200'
          } ${popIdx === n ? 'tc-star-pop scale-125' : ''}`}
        />
      ))}
    </div>
  )
}

/* ─── Main Component ─── */
export default function TestimonialCard({ testimonial, delay = 0 }) {
  injectCSS()

  const [liked, setLiked]   = useState(false)
  const [tilted, setTilted] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  /* subtle 3-D tilt */
  const onMove = (e) => {
    if (!cardRef.current) return
    const r  = cardRef.current.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2)
    setTilted({ x: dx * 4, y: dy * 4 })
  }
  const onLeave = () => setTilted({ x: 0, y: 0 })

  const isTop = testimonial.rating === 5

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        animationDelay: `${delay}ms`,
        transform: `perspective(800px) rotateY(${tilted.x}deg) rotateX(${-tilted.y}deg)`,
        transition: 'transform .22s ease, box-shadow .22s ease',
      }}
      className={`tc-card relative flex flex-col rounded-3xl p-6 border select-none overflow-hidden
        ${isTop
          ? 'bg-brand-navy border-white/8 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.5)]'
          : 'bg-white border-gray-100 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.14)]'
        }`}
    >
      {/* Background glow for 5-star cards */}
      {isTop && (
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-amber-400/8 blur-2xl pointer-events-none" />
      )}

      {/* Subtle grid for dark card */}
      {isTop && (
        <div
          className="absolute inset-0 opacity-[.025] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.7) 1px,transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      )}

      {/* Top row: quote icon + stars */}
      <div className="relative flex items-start justify-between mb-5">
        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0
          ${isTop ? 'bg-amber-400/12 border border-amber-400/20' : 'bg-rose-50 border border-rose-100'}`}>
          <Quote className={`w-4 h-4 ${isTop ? 'text-amber-400' : 'text-rose-500'}`} fill="currentColor" />
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <Stars count={testimonial.rating} />
          {isTop && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full tracking-wide">
              <BadgeCheck className="w-2.5 h-2.5" /> Verified
            </span>
          )}
        </div>
      </div>

      {/* Review text */}
      <p className={`text-sm leading-relaxed flex-1 mb-5 ${isTop ? 'text-slate-300' : 'text-gray-500'}`}>
        <span className={`font-semibold ${isTop ? 'text-white' : 'text-gray-800'}`}>"</span>
        {testimonial.review}
        <span className={`font-semibold ${isTop ? 'text-white' : 'text-gray-800'}`}>"</span>
      </p>

      {/* Course tag */}
      <div className="mb-4">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border
          ${isTop
            ? 'text-slate-300 bg-white/6 border-white/10'
            : 'text-rose-600 bg-rose-50 border-rose-100'
          }`}>
          <BookOpen className="w-3 h-3 flex-shrink-0" />
          {testimonial.course}
        </span>
      </div>

      {/* Divider */}
      <div className={`h-px mb-4 ${isTop
        ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent'
        : 'bg-gradient-to-r from-transparent via-gray-200 to-transparent'}`}
      />

      {/* Author row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar with shimmer */}
          <div className="relative tc-avatar-shimmer flex-shrink-0">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className={`w-10 h-10 rounded-full object-cover ring-2 ${
                isTop ? 'ring-white/15' : 'ring-rose-100'
              }`}
            />
            {isTop && (
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-amber-400 rounded-full border-2 border-[#0F1117] flex items-center justify-center">
                <BadgeCheck className="w-2.5 h-2.5 text-[#0F1117]" strokeWidth={3} />
              </span>
            )}
          </div>

          <div>
            <p className={`text-sm font-bold leading-tight ${isTop ? 'text-white' : 'text-gray-900'}`}>
              {testimonial.name}
            </p>
            <p className={`text-[11px] mt-0.5 ${isTop ? 'text-slate-500' : 'text-gray-400'}`}>
              {testimonial.role}
            </p>
          </div>
        </div>

        {/* Like button */}
        <button
          onClick={() => setLiked(l => !l)}
          className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 ${
            liked
              ? isTop
                ? 'bg-rose-500/20 border-rose-400/30 text-rose-400'
                : 'bg-rose-50 border-rose-200 text-rose-500'
              : isTop
                ? 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'
                : 'bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-600'
          }`}
        >
          <ThumbsUp className={`w-3 h-3 transition-transform duration-200 ${liked ? 'fill-current -rotate-6' : ''}`} />
          {liked ? 'Helpful' : 'Helpful?'}
        </button>
      </div>
    </div>
  )
}