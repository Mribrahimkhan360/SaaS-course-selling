import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Users,
  Star,
  Award,
  Zap,
  Trophy,
  Target,
  CheckCircle2,
  Play,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  BarChart3,
  Layers,
  MessageSquare,
  Download,
  HeadphonesIcon,
  Heart,
  Briefcase,
} from 'lucide-react'
import HeroSection from '../components/HeroSection'
import CourseCard from '../components/CourseCard'
import TestimonialCard from '../components/TestimonialCard'
import BlogCard from '../components/BlogCard'
import courses from '../data/courses.json'
import testimonials from '../data/testimonials.json'
import blogs from '../data/blogs.json'

const popularCourses = courses.filter((c) => c.popular).slice(0, 3)
const latestBlogs = blogs.slice(0, 3)

// ─── Static data ──────────────────────────────────────────────────────────────

const platformStats = [
  { value: '200K+', label: 'Active Students', Icon: Users },
  { value: '500+', label: 'Expert Courses', Icon: BookOpen },
  { value: '4.9', label: 'Average Rating', Icon: Star },
  { value: '150+', label: 'Instructors', Icon: Briefcase },
]

const whyItems = [
  {
    Icon: Target,
    title: 'Vetted Instructors',
    desc: 'Every instructor is a practising industry expert — engineers, designers and leaders from top-tier companies, not academics.',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    border: 'border-rose-100 hover:border-rose-200',
  },
  {
    Icon: Layers,
    title: 'Project-Based Learning',
    desc: 'Each course is built around real deliverables. You graduate with a portfolio, not just a certificate.',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    border: 'border-violet-100 hover:border-violet-200',
  },
  {
    Icon: Award,
    title: 'Lifetime Access',
    desc: 'Pay once, keep forever. Every update is included — when the industry shifts, your course shifts with it.',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    border: 'border-sky-100 hover:border-sky-200',
  },
  {
    Icon: Trophy,
    title: 'Recognised Certificates',
    desc: 'Earn shareable, verifiable certificates you can add directly to LinkedIn, your CV, or client proposals.',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    border: 'border-amber-100 hover:border-amber-200',
  },
]

const pricingPlans = [
  {
    tier: 'Starter',
    tagline: 'For curious learners',
    priceDisplay: 'Free',
    cta: 'Get Started Free',
    ctaVariant: 'outline',
    Icon: BookOpen,
    popular: false,
    guarantee: null,
    features: [
      'Access to 50 free courses',
      'Community forums & discussions',
      'Course previews & samples',
      'Mobile & desktop access',
    ],
  },
  {
    tier: 'Pro',
    tagline: 'For serious professionals',
    price: 29,
    originalPrice: 49,
    period: 'month',
    priceDisplay: null,
    cta: 'Start 7-Day Free Trial',
    ctaVariant: 'primary',
    popular: true,
    Icon: Zap,
    guarantee: '30-day money-back',
    features: [
      'All 500+ premium courses',
      'New courses added weekly',
      'Certificates of completion',
      'Offline downloads',
      'Priority instructor Q&A',
      'Dedicated support',
    ],
  },
  {
    tier: 'Lifetime',
    tagline: 'One payment, forever',
    price: 499,
    originalPrice: 999,
    period: null,
    priceDisplay: null,
    cta: 'Buy Lifetime Access',
    ctaVariant: 'dark',
    popular: false,
    Icon: Heart,
    guarantee: '60-day money-back',
    features: [
      'Everything in Pro — forever',
      'All future courses included',
      '1-on-1 mentorship sessions',
      'Career coaching (2 sessions)',
      'LinkedIn profile review',
      'Exclusive alumni network',
      'Early-access to new content',
    ],
  },
]

const outcomeStats = [
  { stat: '+40%', label: 'Average salary increase', Icon: TrendingUp },
  { stat: '3.2mo', label: 'Avg. time to first offer', Icon: Briefcase },
  { stat: '91%', label: 'Course completion rate', Icon: Trophy },
  { stat: '24h', label: 'Instructor response time', Icon: MessageSquare },
]

const trustedBy = ['Google', 'Meta', 'Stripe', 'Airbnb', 'Shopify', 'Netflix']

// ─── Micro-components ─────────────────────────────────────────────────────────

function SectionEyebrow({ children }) {
  return (
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-brand-red text-[11px] font-bold tracking-widest uppercase mb-5">
        <Sparkles className="w-3 h-3" />
        {children}
      </div>
  )
}

function DividerLine() {
  return <div className="h-px bg-gray-100 w-full" />
}

function PricingCard({ plan }) {
  const { tier, tagline, price, originalPrice, period, priceDisplay, cta, ctaVariant, popular, Icon, guarantee, features } = plan
  return (
      <div
          className={`relative flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${
              popular
                  ? 'bg-brand-navy text-white shadow-2xl shadow-brand-navy/20 scale-[1.02]'
                  : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'
          }`}
      >
        {/* Popular pill */}
        {popular && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1.5 bg-brand-red text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-red-300/40 whitespace-nowrap">
            <Star className="w-3 h-3 fill-current" />
            Most Popular
          </span>
            </div>
        )}

        {/* Tier header */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${popular ? 'bg-white/10' : 'bg-gray-50 border border-gray-100'}`}>
            <Icon className={`w-4.5 h-4.5 ${popular ? 'text-white' : 'text-brand-navy'}`} strokeWidth={1.75} />
          </div>
          <div>
            <p className={`font-display font-bold text-sm leading-none ${popular ? 'text-white' : 'text-brand-navy'}`}>{tier}</p>
            <p className={`text-xs mt-0.5 ${popular ? 'text-slate-400' : 'text-gray-400'}`}>{tagline}</p>
          </div>
        </div>

        {/* Price */}
        <div className={`pb-6 mb-6 border-b ${popular ? 'border-white/10' : 'border-gray-100'}`}>
          {priceDisplay ? (
              <p className={`font-display text-4xl font-bold leading-none ${popular ? 'text-white' : 'text-brand-navy'}`}>{priceDisplay}</p>
          ) : (
              <div className="flex items-end gap-2 flex-wrap">
                <span className={`font-display text-4xl font-bold leading-none ${popular ? 'text-white' : 'text-brand-navy'}`}>${price}</span>
                {period && <span className={`text-sm mb-0.5 ${popular ? 'text-slate-400' : 'text-gray-400'}`}>/ {period}</span>}
                {originalPrice && (
                    <span className={`text-sm mb-0.5 line-through ${popular ? 'text-slate-500' : 'text-gray-300'}`}>${originalPrice}</span>
                )}
              </div>
          )}
          {guarantee && (
              <p className={`flex items-center gap-1.5 text-xs mt-2.5 ${popular ? 'text-slate-400' : 'text-gray-400'}`}>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                {guarantee}
              </p>
          )}
        </div>

        {/* Feature list */}
        <ul className="space-y-2.5 flex-1 mb-7">
          {features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${popular ? 'text-brand-red' : 'text-emerald-500'}`} />
                <span className={`text-sm leading-snug ${popular ? 'text-slate-300' : 'text-gray-500'}`}>{feat}</span>
              </li>
          ))}
        </ul>

        {/* CTA button */}
        {ctaVariant === 'primary' && (
            <Link to="/signup" className="flex items-center justify-center gap-2 w-full bg-brand-red hover:bg-red-600 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25">
              {cta}<ArrowRight className="w-4 h-4" />
            </Link>
        )}
        {ctaVariant === 'outline' && (
            <Link to="/signup" className="flex items-center justify-center gap-2 w-full border border-gray-200 hover:border-brand-navy text-brand-navy font-semibold py-3 rounded-xl text-sm transition-all duration-200 hover:bg-gray-50">
              {cta}<ArrowRight className="w-4 h-4" />
            </Link>
        )}
        {ctaVariant === 'dark' && (
            <Link to="/signup" className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200">
              {cta}<ArrowRight className="w-4 h-4" />
            </Link>
        )}
      </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
      <div>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <HeroSection />

        {/* ── Platform Stats Bar ───────────────────────────────────────────── */}
        <section className="bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
              {platformStats.map(({ value, label, Icon }) => (
                  <div key={label} className="flex items-center gap-4 px-6 py-7 sm:px-8">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-brand-red" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="font-display text-2xl font-bold text-brand-navy leading-none">{value}</p>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trusted By ───────────────────────────────────────────────────── */}
        <section className="py-10 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-7">
              Learners from these companies trust LearnHub
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
              {trustedBy.map((co) => (
                  <span key={co} className="font-display text-lg font-bold text-gray-200 hover:text-gray-300 transition-colors duration-200 select-none cursor-default">
                {co}
              </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Popular Courses ──────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
              <div className="max-w-xl">
                <SectionEyebrow>Top Rated</SectionEyebrow>
                <h2 className="font-display text-4xl font-bold text-brand-navy leading-tight">
                  Courses built to get
                  <br />
                  <span className="text-brand-red">you hired</span>
                </h2>
                <p className="text-gray-400 mt-3 text-sm leading-relaxed max-w-sm">
                  Handpicked by our team based on student outcomes, instructor quality, and content depth.
                </p>
              </div>
              <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy border border-gray-200 hover:border-brand-navy px-5 py-2.5 rounded-xl transition-all duration-200 hover:bg-gray-50 self-start sm:self-auto flex-shrink-0"
              >
                View all courses <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        <DividerLine />

        {/* ── Why LearnHub ─────────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-14 items-start mb-14">
              <div className="lg:col-span-2">
                <SectionEyebrow>Why LearnHub</SectionEyebrow>
                <h2 className="font-display text-4xl font-bold text-brand-navy leading-tight">
                  An impossible
                  <br />standard for
                  <br />
                  <span className="text-brand-red">every course</span>
                </h2>
              </div>
              <div className="lg:col-span-3">
                <p className="text-gray-400 text-base leading-relaxed mb-6">
                  We built LearnHub out of frustration with bloated, outdated courses that don't move careers forward. Every course on this platform is practitioner-led, project-driven, and regularly reviewed — or it doesn't ship.
                </p>
                <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red hover:text-red-700 transition-colors">
                  See how we vet instructors <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {whyItems.map(({ Icon, title, desc, iconBg, iconColor, border }) => (
                  <div key={title} className={`group bg-white rounded-2xl p-6 border ${border} hover:shadow-md hover:-translate-y-1 transition-all duration-300`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${iconBg}`}>
                      <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display font-bold text-brand-navy text-sm mb-2 group-hover:text-brand-red transition-colors duration-200">
                      {title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Outcome Stats Banner ─────────────────────────────────────────── */}
        <section className="bg-brand-navy py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-brand-red text-[11px] font-bold tracking-widest uppercase mb-5">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Outcome Data
                </div>
                <h2 className="font-display text-3xl font-bold text-white leading-tight mb-4">
                  83% of students report a
                  <br />measurable career outcome
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  Tracked across 6 months post-completion — from job offers and salary increases to freelance contracts and promotions.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {outcomeStats.map(({ stat, label, Icon }) => (
                    <div key={label} className="bg-white/5 border border-white/8 rounded-2xl p-5 hover:bg-white/8 transition-colors duration-200">
                      <Icon className="w-5 h-5 text-brand-red mb-3" strokeWidth={1.75} />
                      <p className="font-display text-2xl font-bold text-white leading-none">{stat}</p>
                      <p className="text-slate-400 text-xs mt-1.5 leading-snug">{label}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────────────── */}
        <section className="py-24 bg-slate-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <SectionEyebrow>Student Reviews</SectionEyebrow>
              <h2 className="font-display text-4xl font-bold text-brand-navy leading-tight">
                Real people. Real outcomes.
              </h2>
              <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto leading-relaxed">
                Unedited reviews from students who landed jobs, promotions, and clients after completing our courses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map((t) => <TestimonialCard key={t.id} testimonial={t} />)}
            </div>

            {/* Rating summary */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12 pt-10 border-t border-gray-200">
              <div className="flex items-center gap-2.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4.5 h-4.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="font-display text-xl font-bold text-brand-navy">4.9 / 5</span>
              </div>
              <div className="h-5 w-px bg-gray-200 hidden sm:block" />
              <p className="text-gray-400 text-sm">
                Based on <span className="font-semibold text-brand-navy">24,000+ verified reviews</span>
              </p>
              <div className="h-5 w-px bg-gray-200 hidden sm:block" />
              <Link to="/courses" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:text-red-700 transition-colors">
                Browse courses <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Pricing ──────────────────────────────────────────────────────── */}
        <section id="pricing" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <SectionEyebrow>Pricing</SectionEyebrow>
              <h2 className="font-display text-4xl font-bold text-brand-navy leading-tight">
                Simple, transparent pricing
              </h2>
              <p className="text-gray-400 text-sm mt-3 max-w-xs mx-auto leading-relaxed">
                No hidden fees. No long-term contracts. Cancel anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
              {pricingPlans.map((plan) => (
                  <PricingCard key={plan.tier} plan={plan} />
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-8 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              All paid plans include a full money-back guarantee — no questions asked.
            </div>
          </div>
        </section>

        <DividerLine />

        {/* ── Latest Blog ──────────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
              <div className="max-w-xl">
                <SectionEyebrow>From the Blog</SectionEyebrow>
                <h2 className="font-display text-4xl font-bold text-brand-navy leading-tight">
                  Tutorials, guides &
                  <br />
                  <span className="text-brand-red">career resources</span>
                </h2>
              </div>
              <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy border border-gray-200 hover:border-brand-navy px-5 py-2.5 rounded-xl transition-all duration-200 hover:bg-gray-50 self-start sm:self-auto flex-shrink-0"
              >
                All articles <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────────── */}
        <section className="py-28 bg-brand-navy relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[560px] h-[560px] bg-brand-red/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[560px] h-[560px] bg-indigo-600/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />

          <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/10 text-white/60 text-[11px] font-semibold tracking-widest uppercase mb-8">
              <Play className="w-3 h-3 fill-current" />
              Start learning today
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5 leading-[1.1]">
              Your next career move
              <br />
              <span className="text-brand-red">starts here.</span>
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-md mx-auto">
              Join 200,000+ learners building in-demand skills. Free to start — upgrade only when you're ready.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-red-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-red-900/30 text-sm"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                  to="/courses"
                  className="inline-flex items-center justify-center gap-2 text-white border border-white/15 hover:border-white/30 hover:bg-white/5 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm"
              >
                <BookOpen className="w-4 h-4" />
                Browse Courses
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-10 border-t border-white/8">
              {[
                { Icon: ShieldCheck, text: 'No credit card required' },
                { Icon: Zap, text: 'Instant access' },
                { Icon: Users, text: '200K+ community' },
              ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                    <Icon className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.75} />
                    {text}
                  </div>
              ))}
            </div>
          </div>
        </section>
      </div>
  )
}