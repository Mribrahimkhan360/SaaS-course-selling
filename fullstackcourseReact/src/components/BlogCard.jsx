import { Link } from 'react-router-dom'

const categoryColors = {
  Development: 'bg-blue-50 text-blue-700',
  Design: 'bg-purple-50 text-purple-700',
  Career: 'bg-green-50 text-green-700',
  'Data Science': 'bg-orange-50 text-orange-700',
  Cloud: 'bg-cyan-50 text-cyan-700',
  Marketing: 'bg-yellow-50 text-yellow-700',
}

export default function BlogCard({ blog, featured = false }) {
  const catColor = categoryColors[blog.category] || 'bg-gray-50 text-gray-700'

  return (
    <article className={`card overflow-hidden group flex flex-col ${featured ? 'lg:flex-row' : ''}`}>
      {/* Image */}
      <div className={`overflow-hidden relative ${featured ? 'lg:w-2/5 flex-shrink-0' : ''}`}>
        <img
          src={blog.image}
          alt={blog.title}
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            featured ? 'h-56 lg:h-full' : 'h-48'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className={`absolute top-3 left-3 badge font-semibold ${catColor}`}>
          {blog.category}
        </span>
      </div>

      {/* Content */}
      <div className={`p-5 flex flex-col flex-1 ${featured ? 'lg:p-7' : ''}`}>
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={blog.author.avatar}
            alt={blog.author.name}
            className="w-7 h-7 rounded-full object-cover"
          />
          <div>
            <p className="text-xs font-semibold text-gray-700">{blog.author.name}</p>
            <p className="text-xs text-gray-400">{blog.publishDate} · {blog.readTime}</p>
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-display font-bold text-brand-navy leading-snug mb-2 group-hover:text-brand-red transition-colors line-clamp-2 ${
          featured ? 'text-xl lg:text-2xl' : 'text-base'
        }`}>
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {blog.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {blog.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            to={`/blog/${blog.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:text-red-700 transition-colors group/link"
          >
            Read Full Article
            <svg
              className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
