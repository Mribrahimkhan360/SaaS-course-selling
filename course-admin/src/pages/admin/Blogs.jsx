// src/pages/admin/Blogs.jsx
// ─────────────────────────────────────────────────────────────
// Blog management: create button, table with edit/publish/delete.
// ─────────────────────────────────────────────────────────────

import { useState }  from "react";
import { Plus }      from "lucide-react";
import BlogTable     from "../../components/tables/BlogTable";
import Button        from "../../components/ui/Button";
import initialBlogs  from "../../data/blogs.json";

export default function Blogs({ dark, showToast }) {
  const [posts, setPosts] = useState(initialBlogs);

  const handleEdit    = (b) => showToast(`Opening editor for "${b.title}"`, "info");
  const handlePublish = (b) => {
    setPosts((prev) => prev.map((p) => p.id === b.id ? { ...p, status: "Published" } : p));
    showToast(`"${b.title}" published!`, "success");
  };
  const handleDelete  = (b) => {
    setPosts((prev) => prev.filter((p) => p.id !== b.id));
    showToast("Blog post deleted", "success");
  };

  return (
    <div className="space-y-5">

      {/* ── Toolbar ── */}
      <div className="flex justify-between items-center">
        <p className={`text-sm ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
        <Button icon={Plus} onClick={() => showToast("Blog editor opened", "info")}>
          Create Blog Post
        </Button>
      </div>

      {/* ── Table ── */}
      <BlogTable
        posts={posts}
        dark={dark}
        onEdit={handleEdit}
        onPublish={handlePublish}
        onDelete={handleDelete}
      />
    </div>
  );
}
