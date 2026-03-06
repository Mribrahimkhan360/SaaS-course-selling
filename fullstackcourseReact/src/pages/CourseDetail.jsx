import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Star, Users, Clock, Globe, RefreshCw, ChevronDown,
  CheckCircle, Play, Shield, Smartphone, Award, Infinity,
  ArrowRight, Flame, BookOpen, BarChart2, Zap, Lock
} from 'lucide-react'
import courses from '../data/courses.json'

/* ─── Animated counter hook ─── */
function useCountUp(target, duration = 1200) {
  const [val, setVal] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (started.current) return
    started.current = true
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setVal(Math.floor(p * p * target))
      if (p < 1) requestAnimationFrame(tick)
      else setVal(target)
    }
    requestAnimationFrame(tick)
  }, [target, duration])
  return val
}

/* ─── Star Rating ─── */
function StarRating({ rating, count, size = 'md' }) {
  const s = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5'
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(n => (
          <Star
            key={n}
            className={`w-4 h-4 ${n <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
          />
        ))}
      </div>
      <span className="font-bold text-gray-900 text-sm tabular-nums">{rating}</span>
      {count && <span className="text-gray-400 text-xs">({count?.toLocaleString()} reviews)</span>}
    </div>
  )
}

/* ─── Stat Pill ─── */
function StatPill({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-slate-300">
      <Icon className="w-3.5 h-3.5 text-slate-400" />
      {label}
    </span>
  )
}

/* ─── Include Item ─── */
function IncludeItem({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-gray-600">
      <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-emerald-600" />
      </div>
      {text}
    </div>
  )
}

/* ─── Pricing Card ─── */
function PricingCard({ course, discount, bought, onBuy }) {
  const students = useCountUp(course.studentCount, 1400)

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden">
      {/* Thumbnail */}
      <div className="relative group cursor-pointer">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/95 backdrop-blur rounded-full shadow-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Play className="w-6 h-6 text-red-600 fill-red-600 ml-0.5" />
          </div>
        </div>
        <p className="absolute bottom-3 left-0 right-0 text-center text-white text-xs font-medium tracking-wide">
          Preview course
        </p>
      </div>

      <div className="p-6">
        {/* Price */}
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-4xl font-extrabold text-gray-900 tracking-tight">${course.price}</span>
          <span className="text-lg text-gray-400 line-through font-normal">${course.originalPrice}</span>
          <span className="ml-auto text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
            {discount}% OFF
          </span>
        </div>
        <p className="text-xs text-red-500 font-semibold mb-5 flex items-center gap-1">
          <Zap className="w-3 h-3 fill-red-500" />
          Limited offer — {Math.floor(Math.random() * 8) + 3} hrs left
        </p>

        {/* CTA */}
        <button
          onClick={onBuy}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 mb-3 flex items-center justify-center gap-2 ${
            bought
              ? 'bg-emerald-500 text-white shadow-[0_4px_20px_-4px_rgba(16,185,129,0.5)]'
              : 'bg-gray-900 text-white hover:bg-gray-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_28px_-4px_rgba(0,0,0,0.4)] hover:-translate-y-0.5'
          }`}
        >
          {bought ? (
            <><CheckCircle className="w-5 h-5" /> Enrolled — Go to Dashboard</>
          ) : (
            <><BookOpen className="w-4 h-4" /> Enroll Now</>
          )}
        </button>

        <Link
          to="/dashboard"
          className="block text-center text-xs text-gray-400 hover:text-gray-700 transition-colors mb-5"
        >
          View in Dashboard <ArrowRight className="inline w-3 h-3" />
        </Link>

        {/* Includes */}
        <div className="border-t border-gray-100 pt-5 space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">This course includes</p>
          <IncludeItem icon={Clock}     text={`${course.duration} of on-demand video`} />
          <IncludeItem icon={Infinity}  text="Full lifetime access" />
          <IncludeItem icon={Award}     text="Certificate of completion" />
          <IncludeItem icon={Smartphone} text="Mobile & desktop access" />
        </div>

        {/* Guarantee */}
        <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <Shield className="w-3.5 h-3.5" />
          30-day money-back guarantee
        </div>
      </div>
    </div>
  )
}

/* ─── Main Component ─── */
export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = courses.find(c => c.id === id)
  const [openModule, setOpenModule] = useState(0)
  const [bought, setBought] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-9 h-9 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-500 mb-6">This course doesn't exist or has been removed.</p>
          <Link to="/courses" className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors">
            Browse All Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)

  return (
    <div className="min-h-screen bg-[#F7F7F9] pt-20">

      {/* ── Hero ── */}
      <div className="bg-brand-navy relative overflow-hidden">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Radial glow */}
        <div className="absolute -top-24 -right-24 w-[480px] h-[480px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-0 w-[360px] h-[360px] bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-8">
            <Link to="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 -rotate-90 text-slate-600" />
            <Link to="/courses" className="hover:text-slate-300 transition-colors">Courses</Link>
            <ChevronDown className="w-3 h-3 -rotate-90 text-slate-600" />
            <span className="text-slate-400 truncate max-w-[200px]">{course.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-14">
            {/* Left */}
            <div
              className={`lg:col-span-2 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 bg-red-400/10 border border-red-400/20 px-2.5 py-1 rounded-full">
                  <BarChart2 className="w-3 h-3" /> {course.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 bg-white/8 border border-white/10 px-2.5 py-1 rounded-full">
                  {course.level}
                </span>
                {course.popular && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
                    <Flame className="w-3 h-3 fill-amber-400" /> Bestseller
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-[2.4rem] font-extrabold text-white leading-[1.15] tracking-tight mb-5">
                {course.title}
              </h1>

              <p className="text-slate-300 text-base leading-relaxed mb-6 max-w-xl">{course.description}</p>

              <StarRating rating={course.rating} count={course.reviewCount} />

              {/* Meta pills */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5">
                <StatPill icon={Users}    label={`${course.studentCount.toLocaleString()} students`} />
                <StatPill icon={Clock}    label={course.duration} />
                <StatPill icon={Globe}    label={course.language} />
                <StatPill icon={RefreshCw} label={`Updated ${course.lastUpdated}`} />
              </div>

              {/* Instructor chip */}
              <div className="flex items-center gap-3 mt-8 bg-white/7 backdrop-blur border border-white/10 rounded-2xl px-4 py-3 w-fit">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-11 h-11 rounded-xl object-cover ring-2 ring-white/15"
                />
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">{course.instructor.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{course.instructor.role}</p>
                </div>
              </div>
            </div>

            {/* Pricing card – desktop */}
            <div
              className={`hidden lg:block transition-all duration-700 delay-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <PricingCard course={course} discount={discount} bought={bought} onBuy={() => setBought(true)} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">

            {/* What You'll Learn */}
            <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <Zap className="w-4.5 h-4.5 text-emerald-600" />
                </div>
                <h2 className="text-xl font-extrabold text-gray-900">What You'll Learn</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.whatYouLearn.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-150"
                  >
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <h2 className="text-xl font-extrabold text-gray-900">Course Curriculum</h2>
              </div>
              <div className="space-y-3">
                {course.curriculum.map((mod, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-shadow hover:shadow-md duration-200"
                  >
                    <button
                      onClick={() => setOpenModule(openModule === i ? -1 : i)}
                      className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50/80 transition-colors duration-150 group"
                    >
                      <span className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-gray-900 group-hover:text-white text-gray-500 font-bold text-xs flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">
                          {mod.module}: {mod.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                          <Play className="w-2.5 h-2.5 fill-gray-400" /> {mod.lessons} lessons
                          <span className="text-gray-300">·</span>
                          <Clock className="w-2.5 h-2.5" /> {mod.duration}
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-4.5 h-4.5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${openModule === i ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Accordion body */}
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${openModule === i ? 'max-h-96' : 'max-h-0'}`}
                    >
                      <div className="px-5 pb-4 pt-3 border-t border-gray-100 bg-gray-50/60">
                        {Array.from({ length: Math.min(3, mod.lessons) }).map((_, li) => (
                          <div key={li} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
                            <div className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Lock className="w-3 h-3 text-gray-400" />
                            </div>
                            <span className="text-xs text-gray-600 flex-1">
                              Lesson {li + 1} — {mod.title} Part {li + 1}
                            </span>
                            <span className="text-xs text-gray-400 tabular-nums">
                              {Math.round(parseInt(mod.duration) / mod.lessons * 60)}m
                            </span>
                          </div>
                        ))}
                        {mod.lessons > 3 && (
                          <p className="text-xs text-gray-400 mt-2.5 pl-10">
                            + {mod.lessons - 3} more lessons
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Instructor */}
            <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center">
                  <Award className="w-4.5 h-4.5 text-violet-600" />
                </div>
                <h2 className="text-xl font-extrabold text-gray-900">Your Instructor</h2>
              </div>
              <div className="flex items-start gap-5">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-gray-100 flex-shrink-0"
                />
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900">{course.instructor.name}</h3>
                  <p className="text-red-600 text-xs font-bold uppercase tracking-widest mt-0.5 mb-3">{course.instructor.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{course.instructor.bio}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Mobile pricing card */}
          <div className="lg:hidden">
            <PricingCard course={course} discount={discount} bought={bought} onBuy={() => setBought(true)} />
          </div>

          {/* Desktop sticky sidebar — intentionally empty because the card is in the hero */}
          <div className="hidden lg:block">
            {/* sticky placeholder keeps grid consistent */}
          </div>
        </div>
      </div>
    </div>
  )
}