import { useEffect, useMemo, useState } from "react";
import PostCard from "../components/PostCard";
import TagChip from "../components/TagChip";
import { postsSeed, tagsAll } from "../data/mock";
import toast from "react-hot-toast";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  useEffect(() => {
    setPosts(postsSeed);
  }, []);

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
