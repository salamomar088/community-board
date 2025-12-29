import { useEffect, useMemo, useState } from "react";
import PostCard from "../components/PostCard";
import TagChip from "../components/TagChip";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [tagsAll, setTagsAll] = useState([]);

  // 🔄 Fetch posts from backend
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const res = await fetch(`${API_URL}/posts`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load posts");
      }

      /**
       * 🔁 Adapt backend posts → UI format
       * (keeps PostCard unchanged)
       */
      const adaptedPosts = data.map((p) => ({
        ...p,
        votes: p.votes ?? 0, // backend later
        tags: p.tags ?? ["general"], // temporary
      }));

      setPosts(adaptedPosts);

      // derive unique tags (temporary until backend supports tags)
      const uniqueTags = Array.from(
        new Set(adaptedPosts.flatMap((p) => p.tags))
      );
      setTagsAll(uniqueTags);
    } catch (err) {
      toast.error(err.message);
    }
  }

  // 🔍 Filtering logic (UNCHANGED)
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return posts.filter((p) => {
      const matchQuery =
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q);
      const matchTag = !activeTag || p.tags.includes(activeTag);
      return matchQuery && matchTag;
    });
  }, [posts, query, activeTag]);

  // ❤️ Vote logic (UI-only for now)
  function vote(id, delta) {
    setPosts((ps) =>
      ps.map((p) => (p.id === id ? { ...p, votes: p.votes + delta } : p))
    );
  }

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
          <button
            className="btn"
            onClick={() => toast.success("Search updated")}
          >
            Search
          </button>
        </div>

        {filtered.length === 0 && (
          <div className="card empty">No posts found.</div>
        )}

        {filtered.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            onUp={() => vote(p.id, +1)}
            onDown={() => vote(p.id, -1)}
            onTagClick={(t) => setActiveTag(t)}
          />
        ))}
      </div>

      {/* Sidebar */}
      <aside className="grid" style={{ alignSelf: "start" }}>
        <div className="card">
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Trending Tags</div>
          <div className="tags">
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
