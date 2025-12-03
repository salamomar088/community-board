import { useNavigate } from "react-router-dom";
import VoteWidget from "./VoteWidget";
import TagChip from "./TagChip";

export default function PostCard({ post }) {
  const nav = useNavigate();

  return (
    <div
      className="card"
      style={{
        display: "grid",
        gridTemplateColumns: "32px 1fr",
        gap: 12,
        cursor: "pointer",
      }}
      onClick={() => nav(`/post/${post.id}`)}
    >
      <VoteWidget votes={post.votes} />

      <div>
        <div className="post-title">{post.title}</div>

        <div className="post-meta" style={{ marginBottom: 8 }}>
          {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {post.tags.map((t) => (
            <TagChip key={t} tag={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
