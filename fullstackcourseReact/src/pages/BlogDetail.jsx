import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  User,
  Tag,
  Share2,
  Twitter,
  Linkedin,
  Link2,
  CheckCheck,
  BookOpen,
  ChevronRight,
  Eye,
  TrendingUp,
  Star,
  Rss,
  GraduationCap,
  Code2,
  Terminal,
  Circle,
  Quote,
  Hash,
} from 'lucide-react'
import blogs from '../data/blogs.json'

// ─── Category badge colours ───────────────────────────────────────────────────

const categoryColors = {
  Development:   'bg-blue-50 text-blue-700 border-blue-100',
  Design:        'bg-violet-50 text-violet-700 border-violet-100',
  Career:        'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Data Science':'bg-orange-50 text-orange-700 border-orange-100',
  Cloud:         'bg-sky-50 text-sky-700 border-sky-100',
  Marketing:     'bg-amber-50 text-amber-700 border-amber-100',
}

// ─── Reading progress bar ─────────────────────────────────────────────────────

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el   = document.documentElement
      const top  = el.scrollTop  || document.body.scrollTop
      const h    = el.scrollHeight - el.clientHeight
      setProgress(h > 0 ? (top / h) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-transparent z-[60]">
      <div
        className="h-full bg-gradient-to-r from-brand-red to-orange-500 transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// ─── Share button with copy-link ─────────────────────────────────────────────

function ShareBar({ title }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (_) {}
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mr-1">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-sky-100 hover:text-sky-600 flex items-center justify-center text-gray-400 transition-all duration-200"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-3.5 h-3.5" strokeWidth={2} />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center text-gray-400 transition-all duration-200"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5" strokeWidth={2} />
      </a>
      <button
        onClick={copy}
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
          copied ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-400'
        }`}
        aria-label="Copy link"
      >
        {copied
          ? <CheckCheck className="w-3.5 h-3.5" strokeWidth={2.5} />
          : <Link2 className="w-3.5 h-3.5" strokeWidth={2} />
        }
      </button>
    </div>
  )
}

// ─── Content renderer ─────────────────────────────────────────────────────────

function renderContent(text) {
  return text.split('\n\n').map((para, i) => {
    // Bold-only heading
    if (para.startsWith('**') && para.endsWith('**')) {
      return (
        <h3 key={i} className="font-display text-xl font-bold text-brand-navy mt-10 mb-4 flex items-center gap-2.5">
          <span className="w-1 h-5 bg-brand-red rounded-full flex-shrink-0 inline-block" />
          {para.replace(/\*\*/g, '')}
        </h3>
      )
    }

    // Inline bold
    if (para.includes('**')) {
      const parts = para.split(/\*\*(.*?)\*\*/g)
      return (
        <p key={i} className="text-gray-500 leading-[1.85] mb-5 text-[15px]">
          {parts.map((part, j) =>
            j % 2 === 1
              ? <strong key={j} className="font-bold text-brand-navy">{part}</strong>
              : part
          )}
        </p>
      )
    }

    // Code block
    if (para.startsWith('```')) {
      const code = para.replace(/```\w*\n?/, '').replace(/```$/, '').trim()
      return (
        <div key={i} className="my-6 rounded-2xl overflow-hidden border border-slate-700/50 shadow-lg shadow-slate-900/10">
          {/* Terminal header */}
          <div className="flex items-center gap-2 bg-slate-800 px-4 py-3 border-b border-slate-700/50">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <Terminal className="w-3.5 h-3.5 text-slate-500 ml-2" strokeWidth={1.75} />
            <span className="text-slate-500 text-xs font-mono ml-1">code</span>
          </div>
          <pre className="bg-slate-900 text-emerald-300 p-5 overflow-x-auto text-sm font-mono leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>
      )
    }

    // Bullet list
    if (para.startsWith('- ')) {
      const items = para.split('\n').filter(l => l.startsWith('- '))
      return (
        <ul key={i} className="space-y-2.5 mb-6">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-gray-500 text-[15px] leading-relaxed">
              <span className="w-1.5 h-1.5 bg-brand-red rounded-full mt-2.5 flex-shrink-0" />
              {item.replace('- ', '')}
            </li>
          ))}
        </ul>
      )
    }

    return para.trim() ? (
      <p key={i} className="text-gray-500 leading-[1.85] mb-5 text-[15px]">{para}</p>
    ) : null
  })
}

// ─── Related article card ─────────────────────────────────────────────────────

function RelatedCard({ blog }) {
  const badgeColor = categoryColors[blog.category] || 'bg-gray-50 text-gray-600 border-gray-100'

  return (
    <Link
      to={`/blog/${blog.id}`}
      className="group flex gap-3.5 bg-white rounded-2xl border border-gray-100 p-3.5 hover:border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="relative flex-shrink-0 overflow-hidden rounded-xl w-20 h-16">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mb-1.5 ${badgeColor}`}>
          {blog.category}
        </span>
        <p className="text-xs font-semibold text-brand-navy group-hover:text-brand-red transition-colors leading-snug line-clamp-2 mb-1">
          {blog.title}
        </p>
        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          <Clock className="w-2.5 h-2.5" strokeWidth={2} />
          {blog.readTime}
        </div>
      </div>
      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-brand-red self-center flex-shrink-0 transition-colors group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
    </Link>
  )
}

// ─── Not found ────────────────────────────────────────────────────────────────

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
      <div className="text-center max-w-sm mx-auto px-4">
        <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-9 h-9 text-gray-300" strokeWidth={1.25} />
        </div>
        <h2 className="font-display text-2xl font-bold text-brand-navy mb-2">Article not found</h2>
        <p className="text-gray-400 text-sm mb-7 leading-relaxed">
          This article may have been moved or removed. Head back to the blog to find what you're looking for.
        </p>
        <Link to="/blog" className="inline-flex items-center gap-2 bg-brand-navy hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200">
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          Back to Blog
        </Link>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogDetail() {
  const { id } = useParams()
  const blog = blogs.find(b => b.id === id)
  const related = blog
    ? blogs.filter(b => b.id !== id && b.category === blog.category).slice(0, 3)
    : []
  const otherBlogs = blogs.filter(b => b.id !== id).slice(0, 4)

  if (!blog) return <NotFound />

  const badgeColor = categoryColors[blog.category] || 'bg-gray-50 text-gray-600 border-gray-100'

  return (
    <>
      <ReadingProgress />

      <div className="min-h-screen bg-slate-50 pt-20">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <div className="relative h-80 sm:h-[460px] overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover scale-105"
            style={{ animation: 'subtleZoom 8s ease-out forwards' }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/65 to-brand-navy/15" />

          {/* Hero content */}
          <div className="absolute inset-0 flex flex-col justify-end pb-10">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
              {/* Back link */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition-colors mb-6 group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" strokeWidth={2.5} />
                Back to Blog
              </Link>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full border backdrop-blur-sm bg-white/90 ${badgeColor}`}>
                  {blog.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
                  <Clock className="w-3 h-3" strokeWidth={2} />
                  {blog.readTime}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
                  <Calendar className="w-3 h-3" strokeWidth={2} />
                  {blog.publishDate}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] max-w-3xl">
                {blog.title}
              </h1>
            </div>
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── Article ──────────────────────────────────────────────── */}
            <article className="lg:col-span-2 min-w-0">

              {/* Author + share bar */}
              <div className="flex items-center justify-between gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 mb-8">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="w-11 h-11 rounded-xl object-cover ring-2 ring-gray-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-brand-navy text-sm leading-none">{blog.author.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{blog.author.role}</p>
                  </div>
                </div>
                <ShareBar title={blog.title} />
              </div>

              {/* Pull quote (excerpt) */}
              <div className="relative bg-white rounded-2xl border-l-4 border-brand-red pl-6 pr-6 py-5 mb-8 shadow-sm">
                <Quote className="absolute top-4 right-5 w-8 h-8 text-red-100" strokeWidth={1} />
                <p className="text-gray-600 text-base leading-relaxed font-medium italic">
                  {blog.excerpt}
                </p>
              </div>

              {/* Article body */}
              <div className="prose-article">
                {renderContent(blog.content)}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-2 mr-1">
                  <Hash className="w-4 h-4 text-gray-300" strokeWidth={2} />
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Tags</span>
                </div>
                {blog.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full hover:bg-red-50 hover:text-brand-red hover:border-red-100 transition-all duration-200 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Bottom share bar */}
              <div className="flex items-center justify-between gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 mt-8">
                <p className="text-sm font-semibold text-brand-navy">Found this helpful? Share it.</p>
                <ShareBar title={blog.title} />
              </div>

              {/* Author bio card */}
              <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Top accent */}
                <div className="h-1 bg-gradient-to-r from-brand-red to-orange-500" />
                <div className="p-6 flex items-start gap-5">
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 ring-4 ring-red-50"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3 h-3" strokeWidth={2} />
                      Written by
                    </p>
                    <h4 className="font-display font-bold text-brand-navy text-lg leading-none mb-0.5">{blog.author.name}</h4>
                    <p className="text-xs font-semibold text-brand-red mb-3">{blog.author.role}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Expert instructor at LearnHub, sharing practical knowledge earned from years of real-world industry experience.
                    </p>
                    <Link
                      to="/courses"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy hover:text-brand-red transition-colors mt-3"
                    >
                      View courses by {blog.author.name.split(' ')[0]}
                      <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* ── Sidebar ───────────────────────────────────────────────── */}
            <aside className="space-y-6">

              {/* Sticky wrapper */}
              <div className="lg:sticky lg:top-24 space-y-5">

                {/* Course CTA */}
                <div className="bg-brand-navy rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-brand-red/15 rounded-full blur-2xl pointer-events-none" />
                  <div className="relative p-6">
                    <GraduationCap className="w-7 h-7 text-brand-red mb-3" strokeWidth={1.5} />
                    <p className="font-display font-bold text-white text-base mb-1.5 leading-snug">
                      Ready to go deeper?
                    </p>
                    <p className="text-slate-400 text-xs leading-relaxed mb-5">
                      This article has a companion course taught by the same expert. Go from reading to building.
                    </p>
                    <Link
                      to="/courses"
                      className="flex items-center justify-center gap-2 w-full bg-brand-red hover:bg-red-600 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25"
                    >
                      <BookOpen className="w-4 h-4" strokeWidth={2} />
                      Browse Courses
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center justify-center gap-2 w-full border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-medium py-2.5 rounded-xl text-xs transition-all duration-200 mt-2"
                    >
                      Create Free Account
                    </Link>
                  </div>
                </div>

                {/* Related articles */}
                {related.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-brand-red" strokeWidth={2} />
                      <h3 className="font-display font-bold text-brand-navy text-sm">Related Articles</h3>
                    </div>
                    <div className="space-y-3">
                      {related.map(b => <RelatedCard key={b.id} blog={b} />)}
                    </div>
                  </div>
                )}

                {/* Newsletter */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <Rss className="w-5 h-5 text-brand-red mb-3" strokeWidth={1.75} />
                  <p className="font-display font-bold text-brand-navy text-sm mb-1">Weekly digest</p>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    Get the best articles and tutorials delivered to your inbox every week.
                  </p>
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full border border-gray-200 focus:border-brand-red/50 focus:ring-2 focus:ring-brand-red/10 rounded-xl px-3.5 py-2.5 text-xs text-brand-navy placeholder:text-gray-400 outline-none transition-all duration-200"
                    />
                    <button className="w-full bg-brand-navy hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl text-xs transition-all duration-200">
                      Subscribe — it's free
                    </button>
                  </div>
                </div>

                {/* Back link */}
                <Link
                  to="/blog"
                  className="flex items-center justify-center gap-2 w-full border border-gray-200 hover:border-gray-300 text-sm font-semibold text-gray-500 hover:text-brand-navy py-3 rounded-xl transition-all duration-200 hover:bg-gray-50"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                  All Articles
                </Link>
              </div>
            </aside>
          </div>

          {/* ── More articles strip ────────────────────────────────────── */}
          {otherBlogs.length > 0 && (
            <div className="mt-16 pt-10 border-t border-gray-200">
              <div className="flex items-center justify-between mb-7">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-brand-red fill-brand-red" strokeWidth={1.5} />
                  <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400">More to Read</span>
                </div>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-red hover:text-red-700 transition-colors"
                >
                  All articles
                  <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {otherBlogs.map((b, i) => {
                  const bc = categoryColors[b.category] || 'bg-gray-50 text-gray-600 border-gray-100'
                  return (
                    <Link
                      key={b.id}
                      to={`/blog/${b.id}`}
                      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 animate-fade-up"
                      style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                    >
                      <div className="relative overflow-hidden h-36">
                        <img
                          src={b.image}
                          alt={b.title}
                          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                        />
                        <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full border backdrop-blur-sm bg-white/90 ${bc}`}>
                          {b.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <p className="font-display font-bold text-brand-navy text-sm leading-snug line-clamp-2 group-hover:text-brand-red transition-colors mb-2">
                          {b.title}
                        </p>
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                          <Clock className="w-3 h-3" strokeWidth={1.75} />
                          {b.readTime}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hero zoom keyframe */}
      <style>{`
        @keyframes subtleZoom {
          from { transform: scale(1.05); }
          to   { transform: scale(1);   }
        }
      `}</style>
    </>
  )
}