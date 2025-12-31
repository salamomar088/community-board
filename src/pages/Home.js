import { useEffect, useMemo, useState } from "react";
import PostCard from "../components/PostCard";
import TagChip from "../components/TagChip";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [tagsAll, setTagsAll] = useState([]);

  // 🔄 Fetch posts from backend
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await api.get("/posts");
        const data = Array.isArray(res.data) ? res.data : [];

        // ✅ FIX: preserve backend tags (DO NOT ERASE THEM)
        const normalizedPosts = data.map((p) => ({
          ...p,
          votes: Number(p?.votes) || 0,
          tags: p?.tags ?? [], // 🔴 FIX IS HERE
        }));

        setPosts(normalizedPosts);

        // ✅ Extract unique tags safely
        const uniqueTags = Array.from(
          new Set(
            normalizedPosts.flatMap((p) =>
              Array.isArray(p.tags) ? p.tags : []
            )
          )
        );

        setTagsAll(uniqueTags);
      } catch (err) {
        toast.error(err.message || "Failed to load posts");
      }
    }

    fetchPosts();
  }, []);

  // 🔍 Filtering logic
  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    return posts.filter((p) => {
      if (!p) return false;

      const matchQuery =
        p.title?.toLowerCase().includes(q) ||
        p.content?.toLowerCase().includes(q);

      const matchTag =
        !activeTag || (Array.isArray(p.tags) && p.tags.includes(activeTag));

      return matchQuery && matchTag;
    });
  }, [posts, query, activeTag]);

  function toggleActiveTag(tag) {
    setActiveTag((prev) => (prev === tag ? null : tag));
  }

  return (
    <div className="grid-3">
      {/* Main Feed */}
      <div className="grid" style={{ alignSelf: "start" }}>
        <div className="card searchbar">
          <input
            className="input"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn">Search</button>
        </div>

        {filtered.length === 0 && (
          <div className="card empty">No posts found.</div>
        )}

        {filtered.map((p) => (
          <PostCard key={p.id} post={p} onTagClick={toggleActiveTag} />
        ))}
      </div>

      {/* Sidebar */}
      <aside className="grid" style={{ alignSelf: "start" }}>
        <div className="card">
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Trending Tags</div>

          <div className="tags">
            {tagsAll.length === 0 && (
              <div className="post-meta">No tags yet</div>
            )}

            {tagsAll.map((t) => (
              <TagChip
                key={t}
                label={t}
                active={activeTag === t}
                onClick={() => toggleActiveTag(t)}
              />
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Tips</div>
          <div className="post-meta">
            Use the search bar or tags to quickly filter community posts.
          </div>
        </div>
      </aside>
    </div>
  );
}
