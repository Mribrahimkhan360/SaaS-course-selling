import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Play, Star, Users, BookOpen,
  TrendingUp, Award, CheckCircle, Zap,
  GraduationCap, BarChart3, Globe2
} from 'lucide-react'

/* ──────────────────────────────────────────
   Keyframes + CSS injected once
────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

  @keyframes hero-up {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes hero-scale {
    from { opacity:0; transform:scale(.93); }
    to   { opacity:1; transform:scale(1); }
  }
  @keyframes float-a {
    0%,100% { transform:translateY(0px) rotate(-1deg); }
    50%      { transform:translateY(-10px) rotate(1deg); }
  }
  @keyframes float-b {
    0%,100% { transform:translateY(0px) rotate(1deg); }
    50%      { transform:translateY(-14px) rotate(-1deg); }
  }
  @keyframes float-c {
    0%,100% { transform:translateY(0px); }
    50%      { transform:translateY(-8px); }
  }
  @keyframes spin-slow {
    from { transform:rotate(0deg); }
    to   { transform:rotate(360deg); }
  }
  @keyframes shimmer-text {
    0%,100% { background-position:0% 50%; }
    50%      { background-position:100% 50%; }
  }
  @keyframes pulse-dot {
    0%,100% { box-shadow:0 0 0 0 rgba(34,197,94,.5); }
    50%      { box-shadow:0 0 0 6px rgba(34,197,94,0); }
  }
  @keyframes count-in {
    from { opacity:0; transform:translateY(8px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes border-spin {
    from { --angle:0deg; }
    to   { --angle:360deg; }
  }

  .hero-font-display { font-family:'Syne',sans-serif; }
  .hero-font-body    { font-family:'DM Sans',sans-serif; }

  .hero-gradient-text {
    background: linear-gradient(135deg, #fff 0%, #ff4444 45%, #ff8c42 100%);
    background-size:200% 200%;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation: shimmer-text 4s ease-in-out infinite;
  }

  .float-a { animation: float-a 6s ease-in-out infinite; }
  .float-b { animation: float-b 7s ease-in-out infinite; }
  .float-c { animation: float-c 5s ease-in-out infinite; }

  .spin-slow { animation: spin-slow 20s linear infinite; }

  .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }

  .delay-0   { animation-delay:0ms; }
  .delay-100 { animation-delay:100ms; }
  .delay-200 { animation-delay:200ms; }
  .delay-300 { animation-delay:300ms; }
  .delay-400 { animation-delay:400ms; }
  .delay-500 { animation-delay:500ms; }
  .delay-600 { animation-delay:600ms; }

  .hero-in    { animation: hero-up .65s cubic-bezier(.16,1,.3,1) both; }
  .hero-scale { animation: hero-scale .7s cubic-bezier(.16,1,.3,1) both; }

  .noise-bg::before {
    content:'';
    position:absolute;
    inset:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity:.028;
    pointer-events:none;
    z-index:1;
  }

  .glass-card {
    background: rgba(255,255,255,.04);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,.09);
  }
  .glass-card-light {
    background: rgba(255,255,255,.96);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(0,0,0,.06);
  }

  .hero-cta-primary {
    background: linear-gradient(135deg,#ef4444,#dc2626);
    box-shadow: 0 4px 24px -4px rgba(239,68,68,.55);
    transition: box-shadow .2s ease, transform .2s ease;
  }
  .hero-cta-primary:hover {
    box-shadow: 0 8px 36px -4px rgba(239,68,68,.7);
    transform: translateY(-2px);
  }
  .hero-cta-secondary {
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.12);
    transition: background .2s ease, transform .2s ease;
  }
  .hero-cta-secondary:hover {
    background: rgba(255,255,255,.11);
    transform: translateY(-2px);
  }

  .stat-item { animation: count-in .5s ease both; }
`

function injectCSS() {
  if (typeof document !== 'undefined' && !document.getElementById('hero-css')) {
    const s = document.createElement('style')
    s.id = 'hero-css'
    s.textContent = CSS
    document.head.appendChild(s)
  }
}

/* ──────────────────────────────────────────
   Animated counter
────────────────────────────────────────── */
function useCountUp(target, suffix = '', duration = 1600) {
  const [val, setVal] = useState(0)
  const done = useRef(false)
  useEffect(() => {
    if (done.current) return
    done.current = true
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(ease * target))
      if (p < 1) requestAnimationFrame(tick)
      else setVal(target)
    }
    requestAnimationFrame(tick)
  }, [target, duration])
  return `${val}${suffix}`
}

/* ──────────────────────────────────────────
   Stat block
────────────────────────────────────────── */
const STATS = [
  { raw: 200, suffix: 'K+', label: 'Students',    icon: Users      },
  { raw: 500, suffix: '+',  label: 'Courses',     icon: BookOpen   },
  { raw: 98,  suffix: '%',  label: 'Satisfaction',icon: TrendingUp },
  { raw: 150, suffix: '+',  label: 'Instructors', icon: Award      },
]

function StatItem({ raw, suffix, label, icon: Icon, delay }) {
  const val = useCountUp(raw, suffix, 1800)
  return (
    <div
      className="stat-item text-center lg:text-left"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
        <Icon className="w-4 h-4 text-red-400 flex-shrink-0" />
        <span className="hero-font-display text-3xl font-extrabold text-white tracking-tight">
          {val}
        </span>
      </div>
      <p className="text-sm text-slate-500 font-medium hero-font-body">{label}</p>
    </div>
  )
}

/* ──────────────────────────────────────────
   Main Component
────────────────────────────────────────── */
export default function HeroSection() {
  injectCSS()

  return (
    <section className="noise-bg relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-navy hero-font-body">

      {/* ── Mesh gradient background ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-rose-900/12 rounded-full blur-[80px]" />
      </div>

      {/* ── Subtle dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[.055]"
        style={{
          zIndex: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.7) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Rotating ring ornament ── */}
      <div className="absolute top-24 right-24 w-64 h-64 opacity-10 spin-slow pointer-events-none hidden xl:block" style={{ zIndex: 0 }}>
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <circle cx="100" cy="100" r="90" stroke="url(#rg)" strokeWidth="1" strokeDasharray="8 6" />
          <circle cx="100" cy="100" r="60" stroke="url(#rg)" strokeWidth="1" strokeDasharray="4 8" />
          <defs>
            <linearGradient id="rg" x1="0" y1="0" x2="200" y2="200">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28" style={{ zIndex: 2 }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ────── Left: Text ────── */}
          <div className="text-center lg:text-left">

            {/* Announcement badge */}
            <div
              className="hero-in delay-0 inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-8 glass-card"
            >
              <span className="pulse-dot w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
              <span className="text-sm font-semibold text-slate-300 hero-font-body">
                New courses added every week
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-0.5 rounded-full">
                <Zap className="w-2.5 h-2.5 fill-red-400" />
                Live
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-font-display hero-in delay-100 text-[3.2rem] sm:text-[4rem] lg:text-[4.5rem] font-extrabold leading-[1.04] tracking-tight text-white mb-6">
              Learn Skills
              <br />
              That{' '}
              <span className="relative inline-block">
                <span className="hero-gradient-text">Actually</span>
                {/* hand-drawn underline */}
                <svg
                  className="absolute -bottom-1 left-0 w-full pointer-events-none"
                  viewBox="0 0 220 10" fill="none"
                >
                  <path
                    d="M3 7 C 55 2, 110 1, 217 7"
                    stroke="url(#ug)" strokeWidth="3.5" strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="ug" x1="0" y1="0" x2="220" y2="0">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity=".8" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity=".5" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{' '}
              Pay
            </h1>

            {/* Subtitle */}
            <p className="hero-in delay-200 text-base sm:text-lg text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-9">
              Join <span className="text-white font-semibold">200,000+</span> ambitious learners mastering in-demand skills with world-class instructors. Real projects, real feedback, real results.
            </p>

            {/* CTAs */}
            <div className="hero-in delay-300 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
              <Link
                to="/courses"
                className="hero-cta-primary inline-flex items-center justify-center gap-2 text-white font-bold text-sm px-7 py-4 rounded-2xl group"
              >
                <BookOpen className="w-4 h-4" />
                Browse All Courses
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/courses/3"
                className="hero-cta-secondary inline-flex items-center justify-center gap-2.5 text-white font-semibold text-sm px-7 py-4 rounded-2xl group"
              >
                <span className="w-8 h-8 bg-white/10 border border-white/15 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white/15 transition-colors duration-200">
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                </span>
                Watch Preview
              </Link>
            </div>

            {/* Social proof row */}
            <div className="hero-in delay-400 flex items-center justify-center lg:justify-start gap-4">
              {/* Avatar stack */}
              <div className="flex -space-x-2.5">
                {[3, 47, 25, 12, 60].map((id) => (
                  <img
                    key={id}
                    src={`https://i.pravatar.cc/40?img=${id}`}
                    alt="Student"
                    className="w-9 h-9 rounded-full border-2 border-[#080810] object-cover"
                  />
                ))}
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1,2,3,4,5].map(n => (
                    <Star key={n} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-sm font-bold text-white ml-1 tabular-nums">4.9</span>
                </div>
                <p className="text-xs text-slate-500">from 24,000+ reviews</p>
              </div>
            </div>
          </div>

          {/* ────── Right: Visual ────── */}
          <div className="hero-scale delay-200 relative hidden lg:flex items-center justify-center">

            {/* Main image card */}
            <div className="relative w-full max-w-md mx-auto">
              {/* Outer glow ring */}
              <div className="absolute -inset-3 bg-gradient-to-br from-red-500/20 via-transparent to-blue-500/15 rounded-[2.5rem] blur-2xl" />

              <div className="relative bg-[#12121e] rounded-3xl border border-white/8 overflow-hidden shadow-[0_32px_80px_-16px_rgba(0,0,0,0.7)]">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=380&fit=crop"
                  alt="Students learning"
                  className="w-full h-72 object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12121e] via-transparent to-transparent" />

                {/* Play button */}
                <button className="absolute inset-0 flex items-center justify-center group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150 group-hover:scale-[1.8] transition-transform duration-300" />
                    <div className="relative w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Play className="w-6 h-6 text-red-600 fill-red-600 ml-0.5" />
                    </div>
                  </div>
                </button>

                {/* Bottom bar inside card */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-sm hero-font-display">React Mastery 2024</p>
                      <p className="text-slate-400 text-xs mt-0.5">Module 3 — Hooks & State</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-400/15 border border-red-400/25 px-2 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full pulse-dot" />
                      LIVE
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Float chip: Lesson complete */}
            <div className="float-a absolute -top-4 -left-4 glass-card-light rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 leading-tight">Lesson Completed!</p>
                <p className="text-[11px] text-gray-400 mt-0.5">React Hooks — Module 3</p>
              </div>
            </div>

            {/* Float chip: Instructor */}
            <div className="float-b absolute -bottom-4 -left-6 glass-card-light rounded-2xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-2.5 mb-2">
                <img
                  src="https://i.pravatar.cc/40?img=47"
                  alt="Sarah Chen"
                  className="w-8 h-8 rounded-full ring-2 ring-red-100 flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-900 leading-tight">Sarah Chen</p>
                  <p className="text-[10px] text-gray-400">Top Instructor</p>
                </div>
                <div className="flex items-center gap-0.5 ml-2">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-gray-700">4.9</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <Users className="w-3 h-3" />
                18,420 students enrolled
              </div>
            </div>

            {/* Float chip: stat badge */}
            <div className="float-c absolute -right-6 top-1/3 rounded-2xl px-5 py-4 shadow-xl text-center"
              style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)', boxShadow: '0 12px 40px -8px rgba(239,68,68,.55)' }}
            >
              <GraduationCap className="w-5 h-5 text-red-200 mx-auto mb-1" />
              <p className="hero-font-display text-2xl font-extrabold text-white leading-none">500+</p>
              <p className="text-xs text-red-200 mt-0.5">Expert Courses</p>
            </div>

            {/* Float chip: score */}
            <div className="float-a absolute -right-4 bottom-8 glass-card rounded-2xl px-3 py-2.5 shadow-lg flex items-center gap-2" style={{ animationDelay: '1s' }}>
              <BarChart3 className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-white leading-tight">Skill Progress</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" />
                  </div>
                  <span className="text-[10px] text-slate-400">72%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="mt-20 pt-10 border-t border-white/6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <StatItem key={s.label} {...s} delay={600 + i * 80} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}