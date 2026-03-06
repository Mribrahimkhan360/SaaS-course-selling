import { useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  X,
  Sparkles,
  BookOpen,
  Code2,
  Palette,
  Briefcase,
  BarChart3,
  Cloud,
  ArrowRight,
  Clock,
  Calendar,
  ChevronRight,
  TrendingUp,
  Users,
  FileText,
  Rss,
  Star,
  Eye,
  BookMarked,
  Newspaper,
  PenLine,
  Filter,
} from 'lucide-react'
import blogs from '../data/blogs.json'

// ─── Config ──────────────────────────────────────────────────────────────────

const categories = [
  { label: 'All',          Icon: Sparkles,  color: 'text-slate-500' },
  { label: 'Development',  Icon: Code2,     color: 'text-blue-600'   },
  { label: 'Design',       Icon: Palette,   color: 'text-violet-600' },
  { label: 'Career',       Icon: Briefcase, color: 'text-emerald-600'},
  { label: 'Data Science', Icon: BarChart3, color: 'text-orange-600' },
  { label: 'Cloud',        Icon: Cloud,     color: 'text-sky-600'    },
]

const categoryBadgeColors = {
  Development:  'bg-blue-50 text-blue-700 border-blue-100',
  Design:       'bg-violet-50 text-violet-700 border-violet-100',
  Career:       'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Data Science':'bg-orange-50 text-orange-700 border-orange-100',
  Cloud:        'bg-sky-50 text-sky-700 border-sky-100',
  Marketing:    'bg-amber-50 text-amber-700 border-amber-100',
}

const heroStats = [
  { value: `${blogs.length}+`,  label: 'Articles',     Icon: FileText  },
  { value: '12',                label: 'Instructors',  Icon: PenLine   },
  { value: '50K+',              label: 'Readers/mo',   Icon: Users     },
  { value: '4.8',               label: 'Avg Rating',   Icon: Star      },
]

// ─── Featured Card ────────────────────────────────────────────────────────────

function FeaturedBlogCard({ blog }) {
  const badgeColor = categoryBadgeColors[blog.category] || 'bg-gray-50 text-gray-600 border-gray-100'

  return (
    <Link
      to={`/blog/${blog.id}`}
      className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 overflow-hidden flex flex-col lg:flex-row"
    >
      {/* Image */}
      <div className="relative lg:w-[52%] flex-shrink-0 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-60 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent lg:bg-gradient-to-r" />

        {/* Featured pill */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 bg-brand-red text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg">
            <Star className="w-2.5 h-2.5 fill-current" />
            Editor's Pick
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-8 lg:p-10 flex-1">
        <div>
          {/* Category + read time */}
          <div className="flex items-center gap-2.5 mb-5">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${badgeColor}`}>
              {blog.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <Clock className="w-3 h-3" strokeWidth={1.75} />
              {blog.readTime}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-navy leading-tight mb-4 group-hover:text-brand-red transition-colors duration-200">
            {blog.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
            {blog.excerpt}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-gray-100"
            />
            <div>
              <p className="text-xs font-bold text-brand-navy leading-none">{blog.author.name}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <Calendar className="w-3 h-3 text-gray-400" strokeWidth={1.75} />
                <p className="text-[11px] text-gray-400">{blog.publishDate}</p>
              </div>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red group-hover:gap-3 transition-all duration-200">
            Read article
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Compact Blog Card ────────────────────────────────────────────────────────

function BlogListCard({ blog, index }) {
  const badgeColor = categoryBadgeColors[blog.category] || 'bg-gray-50 text-gray-600 border-gray-100'

  return (
    <Link
      to={`/blog/${blog.id}`}
      className="group flex gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-4 overflow-hidden animate-fade-up"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 overflow-hidden rounded-xl w-24 h-20 sm:w-28 sm:h-22">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10 rounded-xl" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
            {blog.category}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-gray-400">
            <Clock className="w-2.5 h-2.5" strokeWidth={2} />
            {blog.readTime}
          </span>
        </div>

        <h3 className="font-display font-bold text-brand-navy text-sm leading-snug line-clamp-2 group-hover:text-brand-red transition-colors duration-200 mb-1.5">
          {blog.title}
        </h3>

        <div className="flex items-center gap-2">
          <img src={blog.author.avatar} alt={blog.author.name} className="w-4 h-4 rounded-full object-cover" />
          <span className="text-[11px] text-gray-400 font-medium">{blog.author.name}</span>
          <span className="text-gray-200">·</span>
          <span className="text-[11px] text-gray-400">{blog.publishDate}</span>
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-red flex-shrink-0 self-center transition-colors duration-200 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
    </Link>
  )
}

// ─── Standard Grid Card ────────────────────────────────────────────────────────

function BlogGridCard({ blog, index }) {
  const badgeColor = categoryBadgeColors[blog.category] || 'bg-gray-50 text-gray-600 border-gray-100'

  return (
    <Link
      to={`/blog/${blog.id}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col animate-fade-up"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 flex-shrink-0">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm bg-white/90 ${badgeColor}`}>
          {blog.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <img src={blog.author.avatar} alt={blog.author.name} className="w-7 h-7 rounded-lg object-cover flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-gray-700 leading-none">{blog.author.name}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{blog.publishDate}</p>
          </div>
          <span className="ml-auto flex items-center gap-1 text-[11px] text-gray-400 font-medium">
            <Clock className="w-3 h-3" strokeWidth={1.75} />
            {blog.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-brand-navy text-base leading-snug mb-2 group-hover:text-brand-red transition-colors duration-200 line-clamp-2 flex-1">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
          {blog.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {blog.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] font-medium text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Read more */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-red group-hover:gap-2.5 transition-all duration-200">
            Read article
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <Eye className="w-3.5 h-3.5 text-gray-300" strokeWidth={1.75} />
        </div>
      </div>
    </Link>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center">
          <Newspaper className="w-10 h-10 text-gray-300" strokeWidth={1.25} />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center">
          <X className="w-4 h-4 text-brand-red" strokeWidth={2.5} />
        </div>
      </div>
      <h3 className="font-display text-xl font-bold text-brand-navy mb-2">No articles found</h3>
      <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-7">
        We couldn't find any articles matching your current search or filters.
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

export default function Blog() {
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('All')
  const searchRef = useRef(null)

  const filtered = useMemo(() => {
    let result = [...blogs]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        b =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    if (category !== 'All') result = result.filter(b => b.category === category)
    return result
  }, [search, category])

  const showFeatured = !search && category === 'All' && filtered.length > 0
  const featured     = showFeatured ? filtered[0] : null
  const grid         = showFeatured ? filtered.slice(1) : filtered

  const clearAll = () => { setSearch(''); setCategory('All') }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">

      {/* ── Hero Header ──────────────────────────────────────────────────── */}
      <div className="bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-red/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-red/15 border border-brand-red/20 text-brand-red text-[11px] font-bold tracking-widest uppercase mb-5">
            <Rss className="w-3 h-3" strokeWidth={2} />
            The LearnHub Blog
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-[1.05] mb-4">
                Tutorials, guides &
                <br />
                <span className="text-brand-red">career resources</span>
              </h1>
              <p className="text-slate-400 text-base leading-relaxed max-w-md">
                Actionable deep-dives written by practising industry experts. No filler, no fluff — just insights that move careers forward.
              </p>
            </div>

            {/* Stat pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {heroStats.map(({ value, label, Icon }) => (
                <div key={label} className="bg-white/5 border border-white/8 rounded-2xl px-4 py-3 hover:bg-white/8 transition-colors duration-200">
                  <Icon className="w-4 h-4 text-brand-red mb-2" strokeWidth={1.75} />
                  <p className="font-display text-xl font-bold text-white leading-none">{value}</p>
                  <p className="text-slate-500 text-[11px] mt-1 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inline search */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-red transition-colors duration-200"
                strokeWidth={2}
              />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search articles, topics, or authors…"
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
              Search Articles
            </button>
          </div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Category Tab Bar ─────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-1.5 mb-6 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {categories.map(({ label, Icon, color }) => {
              const active = category === label
              const count  = label === 'All' ? blogs.length : blogs.filter(b => b.category === label).length
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
                  <Icon
                    className={`w-3.5 h-3.5 ${active ? 'text-white' : color}`}
                    strokeWidth={active ? 2 : 1.75}
                  />
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

        {/* ── Active filter chips + count ──────────────────────────────── */}
        <div className="flex items-center justify-between gap-4 mb-7">
          <div className="flex items-center gap-2.5 flex-wrap">
            {category !== 'All' && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
                {category}
                <button onClick={() => setCategory('All')} className="hover:text-brand-red transition-colors">
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
            {(category !== 'All' || search) && (
              <button onClick={clearAll} className="text-xs font-semibold text-gray-400 hover:text-brand-red transition-colors">
                Clear all
              </button>
            )}
          </div>

          {filtered.length > 0 && (
            <p className="text-sm text-gray-400 flex-shrink-0">
              <span className="font-semibold text-brand-navy">{filtered.length}</span> article{filtered.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* ── Results ──────────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <EmptyState onClear={clearAll} />
        ) : (
          <div className="space-y-10">

            {/* Featured article */}
            {featured && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-3.5 h-3.5 text-brand-red fill-brand-red" />
                  <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400">Featured Article</span>
                </div>
                <FeaturedBlogCard blog={featured} />
              </div>
            )}

            {/* "Latest" header for grid */}
            {grid.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-brand-red" strokeWidth={2} />
                    <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400">
                      {featured ? 'Latest Articles' : 'All Articles'}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{grid.length} article{grid.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Two-column layout: main grid + sidebar list */}
                {!search && category === 'All' && grid.length >= 4 ? (
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main 2-col grid */}
                    <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
                      {grid.slice(0, 4).map((blog, i) => (
                        <BlogGridCard key={blog.id} blog={blog} index={i} />
                      ))}
                    </div>

                    {/* Sidebar: list view of remaining */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4">
                        More to Read
                      </p>
                      {grid.slice(4).map((blog, i) => (
                        <BlogListCard key={blog.id} blog={blog} index={i} />
                      ))}

                      {/* Newsletter CTA */}
                      <div className="bg-brand-navy rounded-2xl p-5 relative overflow-hidden mt-5">
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-red/15 rounded-full blur-2xl" />
                        <div className="relative">
                          <Rss className="w-6 h-6 text-brand-red mb-3" strokeWidth={1.75} />
                          <p className="font-display font-bold text-white text-sm mb-1.5">
                            Weekly digest
                          </p>
                          <p className="text-slate-400 text-xs leading-relaxed mb-4">
                            Get the best articles delivered to your inbox every week.
                          </p>
                          <div className="flex gap-2">
                            <input
                              type="email"
                              placeholder="your@email.com"
                              className="flex-1 min-w-0 bg-white/8 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 outline-none focus:border-brand-red/50 transition-colors"
                            />
                            <button className="flex-shrink-0 bg-brand-red hover:bg-red-600 text-white px-3 py-2 rounded-xl text-xs font-bold transition-colors">
                              Join
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Simple grid when filtered/searching */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {grid.map((blog, i) => (
                      <BlogGridCard key={blog.id} blog={blog} index={i} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Bottom CTA ───────────────────────────────────────────────── */}
        {filtered.length > 0 && (
          <div className="mt-14 bg-brand-navy rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-brand-red/12 rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <BookMarked className="w-8 h-8 text-brand-red mb-3" strokeWidth={1.5} />
                <h3 className="font-display text-xl font-bold text-white mb-1.5">
                  Ready to put this into practice?
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  Every article links to a course taught by the same author — go from reading to building in minutes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-red-900/30 whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4" strokeWidth={2} />
                  Browse Courses
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 text-white border border-white/15 hover:border-white/30 hover:bg-white/5 font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 whitespace-nowrap"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}