import { useState, useMemo, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  SlidersHorizontal,
  X,
  BookOpen,
  Users,
  Star,
  TrendingUp,
  ArrowUpDown,
  ChevronDown,
  LayoutGrid,
  LayoutList,
  Sparkles,
  GraduationCap,
  Code2,
  Palette,
  BarChart3,
  Megaphone,
  Cloud,
  Filter,
  ArrowRight,
  Clock,
  Flame,
} from 'lucide-react'
import CourseCard from '../components/CourseCard'
import courses from '../data/courses.json'

// ─── Config ──────────────────────────────────────────────────────────────────

const categories = [
  { label: 'All',          Icon: Sparkles,       count: courses.length },
  { label: 'Development',  Icon: Code2,          count: courses.filter(c => c.category === 'Development').length },
  { label: 'Design',       Icon: Palette,        count: courses.filter(c => c.category === 'Design').length },
  { label: 'Data Science', Icon: BarChart3,      count: courses.filter(c => c.category === 'Data Science').length },
  { label: 'Marketing',    Icon: Megaphone,      count: courses.filter(c => c.category === 'Marketing').length },
  { label: 'Cloud',        Icon: Cloud,          count: courses.filter(c => c.category === 'Cloud').length },
]

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']

const sortOptions = [
  { value: 'Most Popular',       label: 'Most Popular',       Icon: TrendingUp  },
  { value: 'Highest Rated',      label: 'Highest Rated',      Icon: Star        },
  { value: 'Price: Low to High', label: 'Price: Low → High',  Icon: ArrowUpDown },
  { value: 'Price: High to Low', label: 'Price: High → Low',  Icon: ArrowUpDown },
]

const headerStats = [
  { value: `${courses.length}+`,    label: 'Courses',         Icon: BookOpen },
  { value: '150+',                  label: 'Instructors',     Icon: GraduationCap },
  { value: '200K+',                 label: 'Students',        Icon: Users },
  { value: '4.9',                   label: 'Avg Rating',      Icon: Star },
]

// ─── Hook: click-outside ─────────────────────────────────────────────────────

function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (e) => { if (ref.current && !ref.current.contains(e.target)) handler() }
    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  }, [ref, handler])
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOutsideClick(ref, () => setOpen(false))
  const current = sortOptions.find(o => o.value === value) || sortOptions[0]

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-2.5 bg-white border border-gray-200 hover:border-gray-300 text-sm font-semibold text-gray-700 px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-sm w-full sm:w-auto justify-between sm:justify-start min-w-[190px]"
      >
        <current.Icon className="w-4 h-4 text-gray-400" strokeWidth={1.75} />
        <span className="flex-1 text-left">{current.label}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} strokeWidth={2} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/80 py-1.5 z-30 animate-fade-in">
          {sortOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors duration-150 ${
                value === opt.value
                  ? 'text-brand-red font-semibold bg-red-50'
                  : 'text-gray-600 hover:bg-gray-50 font-medium'
              }`}
            >
              <opt.Icon className={`w-4 h-4 ${value === opt.value ? 'text-brand-red' : 'text-gray-400'}`} strokeWidth={1.75} />
              {opt.label}
              {value === opt.value && <span className="ml-auto w-1.5 h-1.5 bg-brand-red rounded-full" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function EmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center">
          <Search className="w-10 h-10 text-gray-300" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center">
          <X className="w-4 h-4 text-brand-red" strokeWidth={2.5} />
        </div>
      </div>
      <h3 className="font-display text-xl font-bold text-brand-navy mb-2">No courses found</h3>
      <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-7">
        We couldn't find any courses matching your current filters. Try broadening your search.
      </p>
      <button
        onClick={onClear}
        className="inline-flex items-center gap-2 bg-brand-navy hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200"
      >
        <Filter className="w-4 h-4" strokeWidth={2} />
        Clear all filters
      </button>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Courses() {
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('All')
  const [level, setLevel]       = useState('All Levels')
  const [sort, setSort]         = useState('Most Popular')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [showFilters, setShowFilters] = useState(false)
  const searchRef = useRef(null)

  const filtered = useMemo(() => {
    let result = [...courses]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        c =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.name.toLowerCase().includes(q) ||
          c.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    if (category !== 'All') result = result.filter(c => c.category === category)
    if (level !== 'All Levels') result = result.filter(c => c.level.toLowerCase().includes(level.toLowerCase()))

    switch (sort) {
      case 'Highest Rated':      result.sort((a, b) => b.rating - a.rating);          break
      case 'Price: Low to High': result.sort((a, b) => a.price - b.price);            break
      case 'Price: High to Low': result.sort((a, b) => b.price - a.price);            break
      default:                   result.sort((a, b) => b.studentCount - a.studentCount)
    }

    return result
  }, [search, category, level, sort])

  const activeFilterCount = [
    category !== 'All',
    level !== 'All Levels',
  ].filter(Boolean).length

  const clearAll = () => { setSearch(''); setCategory('All'); setLevel('All Levels'); setSort('Most Popular') }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">

      {/* ── Hero Header ──────────────────────────────────────────────────── */}
      <div className="bg-brand-navy relative overflow-hidden">
        {/* Decorations */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-red/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 left-1/3 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-red/15 border border-brand-red/20 text-brand-red text-[11px] font-bold tracking-widest uppercase mb-5">
            <BookOpen className="w-3 h-3" />
            Course Library
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-[1.05] mb-4">
                Find your next
                <br />
                <span className="text-brand-red">breakthrough course</span>
              </h1>
              <p className="text-slate-400 text-base leading-relaxed max-w-md">
                {courses.length} expert-led courses across development, design, data science, and more. Filter to find your perfect fit.
              </p>
            </div>

            {/* Stat pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:justify-end">
              {headerStats.map(({ value, label, Icon }) => (
                <div key={label} className="bg-white/5 border border-white/8 rounded-2xl px-4 py-3 hover:bg-white/8 transition-colors duration-200">
                  <Icon className="w-4 h-4 text-brand-red mb-2" strokeWidth={1.75} />
                  <p className="font-display text-xl font-bold text-white leading-none">{value}</p>
                  <p className="text-slate-500 text-[11px] mt-1 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Inline Search Bar ─────────────────────────────────────────── */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-brand-red transition-colors duration-200"
                strokeWidth={2}
              />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search courses, topics or instructors…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/8 border border-white/12 hover:border-white/20 focus:border-brand-red/60 focus:bg-white/12 text-white placeholder:text-slate-500 rounded-xl pl-11 pr-10 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-red/20"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-white/15 rounded-full flex items-center justify-center hover:bg-white/25 transition-colors"
                >
                  <X className="w-3 h-3 text-white" strokeWidth={2.5} />
                </button>
              )}
            </div>
            <button
              onClick={() => searchRef.current?.focus()}
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-red-900/30 flex-shrink-0"
            >
              <Search className="w-4 h-4" strokeWidth={2} />
              Search Courses
            </button>
          </div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Category Tabs ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-1.5 mb-5 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {categories.map(({ label, Icon, count }) => {
              const active = category === label
              return (
                <button
                  key={label}
                  onClick={() => setCategory(label)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    active
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-gray-400'}`} strokeWidth={active ? 2 : 1.75} />
                  {label}
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
                    active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Filter + Sort Bar ─────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(v => !v)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
              showFilters || activeFilterCount > 0
                ? 'bg-brand-navy text-white border-brand-navy'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" strokeWidth={1.75} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-brand-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Level pills — only shown when filter panel is open */}
          {showFilters && (
            <div className="flex items-center gap-2 flex-wrap animate-fade-in">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Level:</span>
              {levels.map(lv => (
                <button
                  key={lv}
                  onClick={() => setLevel(lv)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    level === lv
                      ? 'bg-brand-red text-white shadow-sm shadow-red-100'
                      : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-red/40 hover:text-brand-red hover:bg-red-50/50'
                  }`}
                >
                  {lv}
                </button>
              ))}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Active filter chips */}
          {(category !== 'All' || level !== 'All Levels' || search) && (
            <div className="flex items-center gap-2 flex-wrap">
              {category !== 'All' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
                  {category}
                  <button onClick={() => setCategory('All')} className="hover:text-brand-red transition-colors">
                    <X className="w-3 h-3" strokeWidth={2.5} />
                  </button>
                </span>
              )}
              {level !== 'All Levels' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-full">
                  {level}
                  <button onClick={() => setLevel('All Levels')} className="hover:text-brand-red transition-colors">
                    <X className="w-3 h-3" strokeWidth={2.5} />
                  </button>
                </span>
              )}
              {search && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full">
                  "{search}"
                  <button onClick={() => setSearch('')} className="hover:text-brand-red transition-colors">
                    <X className="w-3 h-3" strokeWidth={2.5} />
                  </button>
                </span>
              )}
              <button onClick={clearAll} className="text-xs font-semibold text-gray-400 hover:text-brand-red transition-colors">
                Clear all
              </button>
            </div>
          )}

          {/* Sort */}
          <SortDropdown value={sort} onChange={setSort} />

          {/* View toggle */}
          <div className="flex items-center gap-0.5 bg-white border border-gray-200 rounded-xl p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-150 ${viewMode === 'grid' ? 'bg-brand-navy text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" strokeWidth={viewMode === 'grid' ? 2 : 1.75} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-150 ${viewMode === 'list' ? 'bg-brand-navy text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              aria-label="List view"
            >
              <LayoutList className="w-4 h-4" strokeWidth={viewMode === 'list' ? 2 : 1.75} />
            </button>
          </div>
        </div>

        {/* ── Results count + label ─────────────────────────────────────── */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-400">
              Showing <span className="font-semibold text-brand-navy">{filtered.length}</span> course{filtered.length !== 1 ? 's' : ''}
              {category !== 'All' && <> in <span className="font-semibold text-brand-navy">{category}</span></>}
            </p>
            {sort === 'Most Popular' && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full">
                <Flame className="w-3 h-3" strokeWidth={2} />
                Sorted by popularity
              </div>
            )}
          </div>
        )}

        {/* ── Course Grid / List / Empty ────────────────────────────────── */}
        {filtered.length === 0 ? (
          <EmptyState onClear={clearAll} />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((course, i) => (
              <div
                key={course.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          /* List view */
          <div className="space-y-3">
            {filtered.map((course, i) => (
              <div
                key={course.id}
                className="animate-fade-up bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
              >
                <div className="flex gap-5 p-5">
                  {/* Thumbnail */}
                  <div className="relative flex-shrink-0 group/img">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-36 h-24 rounded-xl object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl opacity-0 group-hover/img:opacity-100 transition-opacity duration-200">
                      <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
                        <svg className="w-4 h-4 text-brand-navy fill-brand-navy ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                    {course.popular && (
                      <span className="absolute top-2 left-2 flex items-center gap-1 text-[10px] font-bold bg-brand-red text-white px-1.5 py-0.5 rounded-md">
                        <Flame className="w-2.5 h-2.5" strokeWidth={2} /> Hot
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wide text-brand-red bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                            {course.category}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium">{course.level}</span>
                        </div>
                        <h3 className="font-display font-bold text-brand-navy text-base leading-snug mb-1 line-clamp-1">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <img src={course.instructor.avatar} alt={course.instructor.name} className="w-5 h-5 rounded-full object-cover" />
                          <span className="text-xs text-gray-400 font-medium">{course.instructor.name}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="font-bold text-gray-700">{course.rating}</span>
                            <span>({course.reviewCount.toLocaleString()})</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" strokeWidth={1.75} />
                            {course.studentCount.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Price + CTA */}
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-baseline gap-1.5 justify-end mb-3">
                          <span className="font-display text-2xl font-bold text-brand-navy">${course.price}</span>
                          <span className="text-sm text-gray-300 line-through">${course.originalPrice}</span>
                        </div>
                        <Link
                          to={`/courses/${course.id}`}
                          className="inline-flex items-center gap-1.5 bg-brand-red hover:bg-red-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-red-200"
                        >
                          View Course
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Bottom CTA ───────────────────────────────────────────────── */}
        {filtered.length > 0 && (
          <div className="mt-14 bg-brand-navy rounded-3xl p-8 sm:p-10 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-brand-red/12 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <GraduationCap className="w-9 h-9 text-brand-red mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Not sure where to start?
              </h3>
              <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
                Take our free 2-minute quiz and we'll recommend the best learning path for your goals.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-600 text-white font-semibold px-7 py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-xl hover:shadow-red-900/30"
              >
                <Sparkles className="w-4 h-4" strokeWidth={2} />
                Get Personalised Recommendations
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}