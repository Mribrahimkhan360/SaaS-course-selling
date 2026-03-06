import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Trophy,
  Clock,
  Flame,
  Play,
  ArrowRight,
  Download,
  CheckCircle2,
  Lock,
  Plus,
  Calendar,
  ChevronRight,
  Sparkles,
  BarChart3,
  Target,
  Zap,
  Star,
  GraduationCap,
  Cpu,
  Palette,
  Award,
  Users,
  Bell,
  Settings,
  TrendingUp,
  Video,
} from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import courses from '../data/courses.json'

// ─── Static data ──────────────────────────────────────────────────────────────

const enrolledCourses = [
  {
    ...courses[0],
    progress: 68,
    lastLesson: 'React Hooks Deep Dive — useEffect',
    completedLessons: 28,
    totalLessons: 52,
    Icon: Cpu,
    accentColor: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-50',
    textAccent: 'text-blue-600',
  },
  {
    ...courses[2],
    progress: 34,
    lastLesson: 'Pandas DataFrame Operations',
    completedLessons: 15,
    totalLessons: 63,
    Icon: BarChart3,
    accentColor: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
    textAccent: 'text-violet-600',
  },
  {
    ...courses[1],
    progress: 12,
    lastLesson: 'Introduction to Design Thinking',
    completedLessons: 6,
    totalLessons: 51,
    Icon: Palette,
    accentColor: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
    textAccent: 'text-rose-600',
  },
]

const certificates = [
  {
    title: 'Node.js & Express Fundamentals',
    date: 'Nov 2024',
    id: 'LH-2024-NODE-9821',
    grade: 'Distinction',
    icon: '🟢',
  },
  {
    title: 'AWS Cloud Practitioner Essentials',
    date: 'Sep 2024',
    id: 'LH-2024-AWS-3341',
    grade: 'Merit',
    icon: '🔵',
  },
]

const achievements = [
  { Icon: Flame,       label: '30-Day Streak',   desc: 'Learned 30 days in a row',       earned: true,  color: 'text-orange-500', bg: 'bg-orange-50',  border: 'border-orange-100' },
  { Icon: Zap,         label: 'Fast Finisher',    desc: 'Completed a course in < 7 days', earned: true,  color: 'text-yellow-500', bg: 'bg-yellow-50',  border: 'border-yellow-100' },
  { Icon: Star,        label: 'Perfect Score',    desc: 'Scored 100% on a quiz',          earned: true,  color: 'text-amber-500',  bg: 'bg-amber-50',   border: 'border-amber-100'  },
  { Icon: Users,       label: 'Community Hero',   desc: 'Help 10 fellow students',        earned: false, color: 'text-sky-400',    bg: 'bg-sky-50',     border: 'border-sky-100'    },
  { Icon: Trophy,      label: 'Top 1%',           desc: 'Rank in the top 1% globally',    earned: false, color: 'text-violet-400', bg: 'bg-violet-50',  border: 'border-violet-100' },
  { Icon: GraduationCap, label: 'Diamond Learner',desc: 'Complete 10 courses',           earned: false, color: 'text-brand-red',  bg: 'bg-red-50',     border: 'border-red-100'    },
]

const upcomingEvents = [
  {
    title: 'Live Q&A: React Performance',
    instructor: 'Sarah Chen',
    date: 'Dec 20',
    time: '3:00 PM',
    avatar: 'https://i.pravatar.cc/40?img=47',
    tag: 'Q&A',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    title: 'Workshop: Building AI Apps',
    instructor: 'Dr. Priya Sharma',
    date: 'Dec 23',
    time: '2:00 PM',
    avatar: 'https://i.pravatar.cc/40?img=25',
    tag: 'Workshop',
    tagColor: 'bg-violet-100 text-violet-700',
  },
]

const statCards = [
  { label: 'In Progress',      value: 3,     sub: 'courses',  Icon: BookOpen, gradient: 'from-blue-500/10 to-blue-600/5',   iconColor: 'text-blue-600',   iconBg: 'bg-blue-100'   },
  { label: 'Completed',        value: 2,     sub: 'courses',  Icon: Trophy,   gradient: 'from-emerald-500/10 to-emerald-600/5', iconColor: 'text-emerald-600', iconBg: 'bg-emerald-100' },
  { label: 'Hours Learned',    value: '127', sub: 'total',    Icon: Clock,    gradient: 'from-amber-500/10 to-amber-600/5',  iconColor: 'text-amber-600',  iconBg: 'bg-amber-100'  },
  { label: 'Day Streak',       value: 14,    sub: 'days',     Icon: Flame,    gradient: 'from-rose-500/10 to-rose-600/5',   iconColor: 'text-rose-600',   iconBg: 'bg-rose-100'   },
]

const tabs = [
  { id: 'courses',      label: 'My Courses',   Icon: BookOpen },
  { id: 'certificates', label: 'Certificates', Icon: Award },
  { id: 'achievements', label: 'Achievements', Icon: Trophy },
]

// ─── Animated counter ────────────────────────────────────────────────────────

function AnimatedCounter({ target, duration = 1200 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const num = parseInt(target)
    if (isNaN(num)) { setCount(target); return }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const steps = 40
        const increment = num / steps
        let current = 0
        const timer = setInterval(() => {
          current = Math.min(current + increment, num)
          setCount(Math.round(current))
          if (current >= num) clearInterval(timer)
        }, duration / steps)
      }
    })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{typeof count === 'number' ? count : target}</span>
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('courses')
  const [hoveredCourse, setHoveredCourse] = useState(null)

  return (
    <div className="min-h-screen bg-slate-50 pt-20">

      {/* ── Hero Header ──────────────────────────────────────────────────── */}
      <div className="bg-brand-navy relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
        <div className="absolute -top-28 -right-28 w-96 h-96 bg-brand-red/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Top bar: User info + actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src="https://i.pravatar.cc/80?img=3"
                  alt="Alex Thompson"
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/20"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-brand-navy" />
              </div>

              {/* User info */}
              <div>
                <p className="text-slate-400 text-xs font-medium mb-0.5">Welcome back 👋</p>
                <h1 className="font-display text-xl font-bold text-white leading-tight">Alex Thompson</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wide uppercase text-brand-red bg-brand-red/15 px-2 py-0.5 rounded-full border border-brand-red/20">
                    <Sparkles className="w-2.5 h-2.5" />
                    Pro Member
                  </span>
                  <span className="text-slate-500 text-xs">· Joined Jan 2024</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2.5">
              <button className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/12 hover:text-white transition-all duration-200">
                <Bell className="w-4 h-4" strokeWidth={1.75} />
              </button>
              <button className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/12 hover:text-white transition-all duration-200">
                <Settings className="w-4 h-4" strokeWidth={1.75} />
              </button>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/15 hover:border-white/30 hover:bg-white/8 px-4 py-2 rounded-xl transition-all duration-200"
              >
                <Plus className="w-4 h-4" strokeWidth={2} />
                Browse Courses
              </Link>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {statCards.map(({ label, value, sub, Icon, gradient, iconColor, iconBg }) => (
              <div
                key={label}
                className={`relative bg-gradient-to-br ${gradient} border border-white/8 rounded-2xl p-5 overflow-hidden group hover:border-white/15 transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center opacity-90`}>
                    <Icon className={`w-4.5 h-4.5 ${iconColor}`} strokeWidth={1.75} />
                  </div>
                  <TrendingUp className="w-3.5 h-3.5 text-white/20 group-hover:text-white/40 transition-colors" strokeWidth={2} />
                </div>
                <p className="font-display text-3xl font-bold text-white leading-none">
                  <AnimatedCounter target={value} />
                </p>
                <p className="text-slate-400 text-xs mt-1.5">{label}</p>
                <p className="text-slate-500 text-[10px] uppercase tracking-wide font-semibold mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Left / Main ──────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Tab bar */}
            <div className="flex items-center gap-1 bg-white rounded-2xl p-1 border border-gray-100 w-fit shadow-sm">
              {tabs.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeTab === id
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={activeTab === id ? 2 : 1.75} />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            {/* ── Courses Tab ────────────────────────────────────────────── */}
            {activeTab === 'courses' && (
              <div className="space-y-3">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    onMouseEnter={() => setHoveredCourse(course.id)}
                    onMouseLeave={() => setHoveredCourse(null)}
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                      hoveredCourse === course.id
                        ? 'border-gray-200 shadow-lg shadow-gray-100/80 -translate-y-0.5'
                        : 'border-gray-100 shadow-sm'
                    }`}
                  >
                    {/* Progress accent line */}
                    <div className={`h-1 w-full bg-gradient-to-r ${course.accentColor}`}
                      style={{ width: `${course.progress}%`, transition: 'width 1.2s ease' }}
                    />

                    <div className="p-5">
                      <div className="flex gap-4 items-start">
                        {/* Thumbnail */}
                        <div className="relative flex-shrink-0 group/thumb">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-20 h-16 rounded-xl object-cover"
                          />
                          {/* Play overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 cursor-pointer">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <Play className="w-3.5 h-3.5 text-brand-navy fill-brand-navy ml-0.5" />
                            </div>
                          </div>
                          {/* Category icon badge */}
                          <div className={`absolute -top-2 -right-2 w-6 h-6 ${course.bgLight} rounded-lg flex items-center justify-center shadow-sm border border-white`}>
                            <course.Icon className={`w-3 h-3 ${course.textAccent}`} strokeWidth={2} />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="font-display font-bold text-brand-navy text-sm leading-snug line-clamp-2">
                              {course.title}
                            </h3>
                            {/* Progress badge */}
                            <span className={`flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${
                              course.progress >= 80
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                : course.progress >= 40
                                ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                : 'bg-blue-50 text-blue-700 border border-blue-100'
                            }`}>
                              {course.progress}%
                            </span>
                          </div>

                          {/* Last lesson */}
                          <div className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${course.textAccent} ${course.bgLight} px-2.5 py-1 rounded-lg mb-3`}>
                            <Video className="w-3 h-3 flex-shrink-0" strokeWidth={2} />
                            <span className="truncate max-w-[220px]">{course.lastLesson}</span>
                          </div>

                          {/* Progress bar */}
                          <ProgressBar progress={course.progress} showLabel={false} size="sm" />

                          {/* Footer row */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-400 font-medium">
                                {course.completedLessons}/{course.totalLessons} lessons
                              </span>
                              <span className="w-1 h-1 bg-gray-200 rounded-full" />
                              <span className="text-xs text-gray-400">{course.instructor.name}</span>
                            </div>
                            <Link
                              to={`/courses/${course.id}`}
                              className={`inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r ${course.accentColor} px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity shadow-sm`}
                            >
                              Continue
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add course CTA */}
                <Link
                  to="/courses"
                  className="group flex items-center justify-center gap-2.5 w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-semibold text-gray-400 hover:border-brand-red/40 hover:text-brand-red hover:bg-red-50/50 transition-all duration-200"
                >
                  <div className="w-6 h-6 rounded-lg bg-gray-100 group-hover:bg-brand-red/10 flex items-center justify-center transition-colors">
                    <Plus className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-red transition-colors" strokeWidth={2.5} />
                  </div>
                  Add a new course
                </Link>
              </div>
            )}

            {/* ── Certificates Tab ───────────────────────────────────────── */}
            {activeTab === 'certificates' && (
              <div className="space-y-4">
                {certificates.map((cert, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-5"
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Award className="w-7 h-7 text-amber-500" strokeWidth={1.5} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className="font-display font-bold text-brand-navy text-sm leading-snug">{cert.title}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                          cert.grade === 'Distinction'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : 'bg-blue-50 text-blue-700 border border-blue-100'
                        }`}>
                          {cert.grade}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" strokeWidth={1.75} />
                        <span>Issued {cert.date}</span>
                        <span className="text-gray-200">·</span>
                        <span className="font-mono text-[10px] bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded-md">{cert.id}</span>
                      </div>
                    </div>

                    {/* Download */}
                    <button className="flex-shrink-0 inline-flex items-center gap-2 text-xs font-semibold text-brand-navy border border-gray-200 hover:border-brand-navy hover:bg-gray-50 px-3 py-2 rounded-xl transition-all duration-200">
                      <Download className="w-3.5 h-3.5" strokeWidth={2} />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                ))}

                {/* Unlock more banner */}
                <div className="relative bg-brand-navy rounded-2xl p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-brand-red/15 rounded-full blur-2xl" />
                  <div className="relative flex items-center justify-between gap-6">
                    <div>
                      <GraduationCap className="w-7 h-7 text-brand-red mb-3" strokeWidth={1.5} />
                      <p className="font-display font-bold text-white text-base mb-1">Unlock more certificates</p>
                      <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                        Complete courses to earn shareable, verifiable certificates you can add to your LinkedIn profile.
                      </p>
                    </div>
                    <Link
                      to="/courses"
                      className="flex-shrink-0 inline-flex items-center gap-2 bg-brand-red hover:bg-red-600 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25"
                    >
                      Browse Courses
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* ── Achievements Tab ───────────────────────────────────────── */}
            {activeTab === 'achievements' && (
              <div className="space-y-4">
                {/* Earned count summary */}
                <div className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-amber-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-brand-navy text-sm">
                      {achievements.filter(a => a.earned).length} / {achievements.length} achievements earned
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                          style={{ width: `${(achievements.filter(a => a.earned).length / achievements.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 font-semibold">50%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {achievements.map(({ Icon, label, desc, earned, color, bg, border }, i) => (
                    <div
                      key={i}
                      className={`relative rounded-2xl p-5 border transition-all duration-300 ${
                        earned
                          ? `bg-white ${border} shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-default`
                          : 'bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      {/* Earned glow dot */}
                      {earned && (
                        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-400 shadow-sm" />
                      )}

                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${earned ? `${bg} border ${border}` : 'bg-gray-100 border border-gray-200'}`}>
                        {earned
                          ? <Icon className={`w-5 h-5 ${color}`} strokeWidth={1.75} />
                          : <Lock className="w-4 h-4 text-gray-400" strokeWidth={1.75} />
                        }
                      </div>

                      <p className={`font-display font-bold text-sm leading-snug mb-1 ${earned ? 'text-brand-navy' : 'text-gray-400'}`}>
                        {label}
                      </p>
                      <p className={`text-[11px] leading-snug ${earned ? 'text-gray-400' : 'text-gray-300'}`}>{desc}</p>

                      {earned && (
                        <div className="flex items-center gap-1 mt-3">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Earned</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right Sidebar ────────────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Weekly goal card */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-display font-bold text-brand-navy text-sm">Weekly Goal</h3>
                  <p className="text-xs text-gray-400 mt-0.5">5h of 7h target</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                  <Target className="w-2.5 h-2.5" />
                  On Track
                </span>
              </div>

              {/* Circular progress */}
              <div className="relative w-28 h-28 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="9" />
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="url(#goalGradient)"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40 * (5 / 7)} ${2 * Math.PI * 40}`}
                    style={{ transition: 'stroke-dasharray 1.5s ease' }}
                  />
                  <defs>
                    <linearGradient id="goalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#E5373A" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display font-bold text-2xl text-brand-navy leading-none">5h</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">of 7h</span>
                </div>
              </div>

              {/* Day pills */}
              <div className="grid grid-cols-7 gap-1 mt-2">
                {['M','T','W','T','F','S','S'].map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-colors ${
                      i < 4 ? 'bg-brand-red text-white' : i === 4 ? 'bg-brand-red/20 text-brand-red ring-1 ring-brand-red/30' : 'bg-gray-100 text-gray-300'
                    }`}>{d}</div>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-gray-400 mt-3">2 more hours to hit your goal</p>
            </div>

            {/* Live events */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-brand-navy text-sm">Upcoming Events</h3>
                <ChevronRight className="w-4 h-4 text-gray-300" strokeWidth={1.75} />
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event, i) => (
                  <div key={i} className="flex items-start gap-3 group cursor-pointer">
                    <div className="relative flex-shrink-0">
                      <img
                        src={event.avatar}
                        alt={event.instructor}
                        className="w-9 h-9 rounded-xl object-cover"
                      />
                      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-brand-navy group-hover:text-brand-red transition-colors leading-snug">
                        {event.title}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{event.instructor}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${event.tagColor}`}>{event.tag}</span>
                        <span className="text-[10px] text-gray-400">{event.date} · {event.time}</span>
                      </div>
                    </div>
                    <button className="flex-shrink-0 self-start text-[10px] font-bold uppercase tracking-wide text-brand-navy border border-gray-200 hover:border-brand-navy hover:bg-gray-50 px-2 py-1.5 rounded-lg transition-all duration-200 mt-0.5">
                      RSVP
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended courses */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display font-bold text-brand-navy text-sm">Recommended</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Based on your progress</p>
                </div>
                <Sparkles className="w-4 h-4 text-brand-red" strokeWidth={1.75} />
              </div>

              <div className="space-y-3">
                {courses.slice(3, 5).map((course) => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.id}`}
                    className="flex gap-3 group items-start"
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-14 h-11 rounded-xl object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 text-white fill-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-brand-navy group-hover:text-brand-red transition-colors leading-snug line-clamp-2">
                        {course.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-[10px] font-bold text-gray-500">{course.rating}</span>
                        <span className="text-[10px] font-bold text-brand-navy">${course.price}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                to="/courses"
                className="flex items-center justify-center gap-1.5 w-full mt-4 py-2.5 rounded-xl border border-gray-100 text-xs font-semibold text-gray-400 hover:border-brand-red/30 hover:text-brand-red hover:bg-red-50/50 transition-all duration-200"
              >
                View all courses
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}