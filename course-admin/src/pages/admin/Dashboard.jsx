// src/pages/admin/Dashboard.jsx
// ─────────────────────────────────────────────────────────────
// Main analytics dashboard:
//   • 4 stats cards
//   • Revenue area chart + Category donut chart
//   • Recent enrollments table
// ─────────────────────────────────────────────────────────────

import { BookOpen, Users, DollarSign, ShoppingCart } from "lucide-react";
import StatsCard        from "../../components/ui/StatsCard";
import RevenueChart     from "../../components/charts/RevenueChart";
import CategoryPieChart from "../../components/charts/CategoryPieChart";
import EnrollmentsTable from "../../components/tables/EnrollmentsTable";
import analytics        from "../../data/analytics.json";

export default function Dashboard({ dark }) {
  const { revenueData, categoryData, recentEnrollments } = analytics;

  return (
    <div className="space-y-6">

      {/* ── Stats cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={BookOpen}     value="42"      label="Total Courses"   growth={12}  color="amber"   dark={dark} />
        <StatsCard icon={Users}        value="1,280"   label="Total Students"  growth={8}   color="blue"    dark={dark} />
        <StatsCard icon={DollarSign}   value="$12,430" label="Monthly Revenue" growth={23}  color="emerald" dark={dark} />
        <StatsCard icon={ShoppingCart} value="356"     label="Total Orders"    growth={-3}  color="violet"  dark={dark} />
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} dark={dark} />
        </div>
        <CategoryPieChart data={categoryData} dark={dark} />
      </div>

      {/* ── Recent enrollments ── */}
      <EnrollmentsTable rows={recentEnrollments} dark={dark} />
    </div>
  );
}
