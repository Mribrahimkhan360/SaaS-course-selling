# 🎓 LearnHub — Modern EdTech Course Selling Platform

A production-quality course selling platform frontend built with **React (Vite)**, **Tailwind CSS**, and **React Router DOM**.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open your browser
# http://localhost:5173
```

### Build for production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
learnhub/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Fixed top navigation with scroll effect
│   │   ├── Footer.jsx       # Site footer with links and newsletter
│   │   ├── HeroSection.jsx  # Landing page hero with animations
│   │   ├── CourseCard.jsx   # Course card with hover effects
│   │   ├── TestimonialCard.jsx  # Student review cards
│   │   ├── BlogCard.jsx     # Blog post cards
│   │   ├── PricingCard.jsx  # Pricing plan cards
│   │   └── ProgressBar.jsx  # Animated progress indicator
│   │
│   ├── pages/               # Route-level page components
│   │   ├── Home.jsx         # Landing page (hero, courses, testimonials, pricing, blog)
│   │   ├── Courses.jsx      # Course catalog with search & filter
│   │   ├── CourseDetail.jsx # Individual course page with curriculum
│   │   ├── Blog.jsx         # Blog listing with category filters
│   │   ├── BlogDetail.jsx   # Full blog article view
│   │   ├── Login.jsx        # Login form with validation
│   │   ├── Signup.jsx       # Registration with password strength
│   │   └── Dashboard.jsx    # Student learning dashboard
│   │
│   ├── data/                # Dummy JSON data files
│   │   ├── courses.json     # 6 complete course objects
│   │   ├── testimonials.json # 6 student reviews
│   │   └── blogs.json       # 6 blog articles with full content
│   │
│   ├── App.jsx              # Router setup & layout wrapper
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind + custom CSS layer
│
├── index.html               # HTML entry (Google Fonts loaded here)
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🗺️ Routes

| Route | Page |
|-------|------|
| `/` | Home / Landing Page |
| `/courses` | All Courses (with search & filter) |
| `/courses/:id` | Course Detail |
| `/blog` | Blog Listing |
| `/blog/:id` | Blog Article |
| `/login` | Login Page |
| `/signup` | Sign Up Page |
| `/dashboard` | Student Dashboard |

---

## 🎨 Design System

### Color Palette
| Name | Hex | Usage |
|------|-----|-------|
| Brand Red | `#E5373A` | Primary CTA, accents |
| Brand Navy | `#0C1445` | Headings, dark sections |
| Amber | `#F59E0B` | Star ratings, warnings |
| Cream | `#FAFAF7` | Page backgrounds |
| Indigo | `#4F46E5` | Secondary accents |

### Typography
- **Display**: Syne (headings, logo, titles)
- **Body**: Plus Jakarta Sans (paragraphs, UI text)

### Key Components
```
btn-primary    → Red CTA button with hover effects
btn-secondary  → Navy button
btn-outline    → Bordered button
card           → White card with hover lift
section-label  → Small red category badge
section-title  → Large Syne font heading
input-field    → Styled form input
```

---

## ⚡ Features

### Home Page
- Animated hero with floating cards and social proof
- Popular courses grid
- "Why LearnHub" feature highlights
- Student testimonials (6 cards)
- 3-tier pricing section
- Latest blog posts
- Call-to-action banner

### Courses Page
- Real-time search (title, instructor, tags)
- Category filter tabs
- Level filter (Beginner / Intermediate / Advanced)
- Sort options (Popular, Rating, Price)
- Empty state with clear filters

### Course Detail
- Full course banner with meta info
- "What You'll Learn" checklist
- Expandable curriculum modules
- Instructor bio card
- Sticky pricing widget (desktop)
- Enroll button with state change

### Blog
- Featured article (first post)
- Category filtering
- Full article content rendering
- Related articles sidebar
- Author bio card

### Auth Pages
- Google & GitHub OAuth buttons (UI only)
- Client-side form validation
- Password strength indicator
- Loading states with spinner
- Split-panel layout (info + form)

### Dashboard
- 4 stat cards (in-progress, completed, hours, streak)
- Course progress cards with ProgressBar
- Tabbed content (Courses / Certificates / Achievements)
- Weekly goal circular progress
- Upcoming live events
- Personalized recommendations sidebar

---

## 📦 Tech Stack

| Tech | Version | Purpose |
|------|---------|---------|
| React | 18.2 | UI library |
| Vite | 5.0 | Build tool |
| React Router DOM | 6.20 | Client-side routing |
| Tailwind CSS | 3.3 | Utility-first styling |
| PostCSS + Autoprefixer | latest | CSS processing |

---

## 🔧 Customization

### Adding a new course
Edit `src/data/courses.json` — add an object following the existing schema with all required fields.

### Changing brand colors
Edit `tailwind.config.js` under `theme.extend.colors.brand`.

### Adding a new page
1. Create `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Add nav link in `src/components/Navbar.jsx`

---

## 🚀 Deployment

```bash
# Build
npm run build

# Deploy the dist/ folder to:
# - Vercel: vercel deploy
# - Netlify: netlify deploy --dir=dist
# - GitHub Pages: configure vite.config.js base path
```

---

Built with ❤️ using LearnHub design system.
