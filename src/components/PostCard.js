import { Link } from "react-router-dom";
import VoteWidget from "./VoteWidget";

export default function PostCard({ post, onUp, onDown, onTagClick }) {
  return (
    <div
      className="card"
      style={{
        display: "grid",
        gridTemplateColumns: "40px 1fr",
        gap: 16,
      }}
    >
      <VoteWidget votes={post.votes} onUp={onUp} onDown={onDown} />

      <div>
        <Link to={`/post/${post.id}`}>
          <div className="post-title">{post.title}</div>
        </Link>

        <div className="post-meta" style={{ marginBottom: 6 }}>
          by {post.author.name}
        </div>

        <div className="tags">
          {post.tags.map((t) => (
            <button
              className="tag"
              key={t}
              onClick={() => onTagClick && onTagClick(t)}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
