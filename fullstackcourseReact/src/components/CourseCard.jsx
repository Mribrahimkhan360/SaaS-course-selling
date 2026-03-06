import { Link } from 'react-router-dom'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs font-semibold text-gray-700 ml-0.5">{rating}</span>
      <span className="text-xs text-gray-400">({(rating > 0 ? Math.round(rating * 1000) : 0).toLocaleString()})</span>
    </div>
  )
}

const categoryColors = {
  Development: 'bg-blue-50 text-blue-700',
  Design: 'bg-purple-50 text-purple-700',
  'Data Science': 'bg-green-50 text-green-700',
  Marketing: 'bg-orange-50 text-orange-700',
  Cloud: 'bg-cyan-50 text-cyan-700',
  Business: 'bg-yellow-50 text-yellow-700',
}

export default function CourseCard({ course, featured = false }) {
  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
  const categoryColor = categoryColors[course.category] || 'bg-gray-50 text-gray-700'

  return (
    <div className={`card overflow-hidden group flex flex-col ${featured ? 'lg:flex-row' : ''}`}>
      {/* Thumbnail */}
      <div className={`relative overflow-hidden ${featured ? 'lg:w-2/5 lg:flex-shrink-0' : ''}`}>
        <img
          src={course.thumbnail}
          alt={course.title}
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            featured ? 'h-56 lg:h-full' : 'h-48'
          }`}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/courses/${course.id}`}
            className="bg-white text-brand-navy font-bold text-sm px-5 py-2.5 rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            View Course
          </Link>
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {course.popular && (
            <span className="badge bg-brand-red text-white shadow-sm">🔥 Popular</span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className="badge bg-brand-amber text-white shadow-sm">-{discount}%</span>
        </div>
      </div>

      {/* Content */}
      <div className={`p-5 flex flex-col flex-1 ${featured ? 'lg:p-7' : ''}`}>
        {/* Category + Level */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`badge ${categoryColor} font-semibold`}>{course.category}</span>
          <span className="text-xs text-gray-400 font-medium">{course.level}</span>
        </div>

        {/* Title */}
        <h3 className={`font-display font-bold text-brand-navy leading-snug mb-2 group-hover:text-brand-red transition-colors line-clamp-2 ${
          featured ? 'text-xl lg:text-2xl' : 'text-base'
        }`}>
          {course.title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-xs text-gray-500 font-medium">{course.instructor.name}</span>
        </div>

        {/* Rating */}
        <StarRating rating={course.rating} />

        {/* Meta */}
        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            {course.studentCount.toLocaleString()} students
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className={`font-display font-bold text-brand-navy ${featured ? 'text-2xl' : 'text-xl'}`}>
              ${course.price}
            </span>
            <span className="text-sm text-gray-400 line-through">${course.originalPrice}</span>
          </div>
          <Link
            to={`/courses/${course.id}`}
            className="btn-primary text-xs py-2 px-4"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
