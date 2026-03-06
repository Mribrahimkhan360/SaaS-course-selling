import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  BookOpen, GraduationCap, Newspaper, ArrowRight,
  LogIn, Menu, X, Sparkles, ChevronRight
} from 'lucide-react'

/* ─── Inject styles once ─── */
const CSS = `
@keyframes nav-down {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes mob-in {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes underline-in {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
.nav-item-underline {
  position: relative;
}
.nav-item-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0; right: 0;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .22s cubic-bezier(.4,0,.2,1);
}
.nav-item-underline:hover::after,
.nav-item-underline.active::after {
  transform: scaleX(1);
}
.nav-logo-glow:hover .logo-icon {
  box-shadow: 0 0 0 6px rgba(239,68,68,.15);
}
`
function injectCSS() {
  if (typeof document !== 'undefined' && !document.getElementById('nav-css')) {
    const s = document.createElement('style')
    s.id = 'nav-css'
    s.textContent = CSS
    document.head.appendChild(s)
  }
}

/* ─── Nav items config ─── */
const NAV_ITEMS = [
  { label: 'Courses', to: '/courses', icon: GraduationCap },
  { label: 'Blog',    to: '/blog',    icon: Newspaper     },
]

/* ─── Desktop NavLink ─── */
function DesktopLink({ item }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `nav-item-underline flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 py-1 ${
          isActive ? 'text-red-600 active' : 'text-gray-500 hover:text-gray-900'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <item.icon
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`}
          />
          {item.label}
        </>
      )}
    </NavLink>
  )
}

/* ─── Mobile NavLink ─── */
function MobileLink({ item, onClick }) {
  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      style={{ animation: 'mob-in .3s ease both' }}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-150 group ${
          isActive
            ? 'bg-red-50 text-red-600'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
            isActive ? 'bg-red-100' : 'bg-gray-100 group-hover:bg-gray-200'
          }`}>
            <item.icon className="w-4 h-4" />
          </span>
          <span className="flex-1">{item.label}</span>
          <ChevronRight className={`w-3.5 h-3.5 transition-all duration-150 ${isActive ? 'text-red-400' : 'text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5'}`} />
        </>
      )}
    </NavLink>
  )
}

/* ─── Hamburger icon ─── */
function Hamburger({ open }) {
  return (
    <div className="w-5 h-5 relative flex items-center justify-center">
      <span className={`absolute block w-5 h-0.5 bg-current rounded-full transition-all duration-250 ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
      <span className={`absolute block w-5 h-0.5 bg-current rounded-full transition-all duration-250 ${open ? 'opacity-0 scale-x-0' : ''}`} />
      <span className={`absolute block w-5 h-0.5 bg-current rounded-full transition-all duration-250 ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
    </div>
  )
}

/* ─── Main Component ─── */
export default function Navbar() {
  injectCSS()

  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [scrollDir,   setScrollDir]   = useState('up')
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrollDir(y > lastY.current ? 'down' : 'up')
      setScrolled(y > 24)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* close mobile on resize to md+ */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const hidden = scrollDir === 'down' && scrolled && !mobileOpen

  return (
    <header
      style={{ animation: 'nav-down .4s cubic-bezier(.4,0,.2,1) both' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled || mobileOpen
          ? 'bg-white/96 backdrop-blur-xl shadow-[0_1px_24px_-4px_rgba(0,0,0,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="nav-logo-glow flex items-center gap-2.5 group flex-shrink-0"
          >
            <div className="logo-icon w-9 h-9 bg-gray-900 rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:bg-red-600 group-hover:rotate-6">
              <BookOpen className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className={`text-[1.15rem] font-black tracking-tight transition-colors duration-200 ${scrolled || mobileOpen ? 'text-gray-900' : 'text-gray-900'}`}>
              Learn<span className="text-red-600">Hub</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map(item => (
              <DesktopLink key={item.to} item={item} />
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors duration-200 px-3 py-2 rounded-xl hover:bg-gray-100"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </Link>

            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 bg-gray-900 hover:bg-red-600 text-white text-sm font-bold px-4 py-2.5 rounded-2xl shadow-[0_2px_12px_-2px_rgba(0,0,0,0.25)] hover:shadow-[0_4px_18px_-2px_rgba(239,68,68,.4)] transition-all duration-250 hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-12" />
              Get Started Free
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className={`md:hidden p-2.5 rounded-2xl text-gray-600 transition-all duration-200 ${
              mobileOpen ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'
            }`}
          >
            <Hamburger open={mobileOpen} />
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-2 pb-5 space-y-1">
            {NAV_ITEMS.map((item, i) => (
              <div key={item.to} style={{ animationDelay: `${i * 60}ms` }}>
                <MobileLink item={item} onClick={() => setMobileOpen(false)} />
              </div>
            ))}

            {/* Mobile auth buttons */}
            <div
              className="grid grid-cols-2 gap-2.5 pt-4 mt-2"
              style={{ animation: 'mob-in .35s .12s ease both' }}
            >
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 py-3 rounded-2xl transition-all duration-150"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 text-sm font-bold text-white bg-gray-900 hover:bg-red-600 py-3 rounded-2xl shadow-md transition-all duration-200"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Get Started
              </Link>
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}