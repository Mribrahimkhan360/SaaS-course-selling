// src/router/AppRouter.jsx
// ─────────────────────────────────────────────────────────────
// State-based router (no react-router-dom required for the
// single-file demo; swap out for <Routes> if preferred).
//
// Supported page keys:
//   dashboard | courses | addcourse | students |
//   orders    | blogs   | profile  | settings
// ─────────────────────────────────────────────────────────────

import Dashboard  from "../pages/admin/Dashboard";
import Courses    from "../pages/admin/Courses";
import AddCourse  from "../pages/admin/AddCourse";
import Students   from "../pages/admin/Students";
import Orders     from "../pages/admin/Orders";
import Blogs      from "../pages/admin/Blogs";
import Profile    from "../pages/admin/Profile";
import Settings   from "../pages/admin/Settings";

export default function AppRouter({ page, setPage, dark, toggleDark, showToast }) {
  const props = { dark, setPage, showToast };

  switch (page) {
    case "dashboard": return <Dashboard  {...props} />;
    case "courses":   return <Courses    {...props} />;
    case "addcourse": return <AddCourse  {...props} />;
    case "students":  return <Students   {...props} />;
    case "orders":    return <Orders     {...props} />;
    case "blogs":     return <Blogs      {...props} />;
    case "profile":   return <Profile    {...props} />;
    case "settings":  return <Settings   {...props} toggleDark={toggleDark} />;
    default:          return <Dashboard  {...props} />;
  }
}
