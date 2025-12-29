import { useNavigate } from "react-router-dom";
import { useState } from "react";
import VoteWidget from "./VoteWidget";
import TagChip from "./TagChip";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { toggleLike } from "../services/likeService";

export default function PostCard({ post }) {
  const nav = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [votes, setVotes] = useState(post.votes || 0);

  async function handleVote() {
    if (!isAuthenticated) {
      return toast.error("Sign in to vote");
    }

    try {
      const result = await toggleLike(post.id, token);
      setVotes(result.totalLikes);
    } catch (err) {
      toast.error(err.message);
    }
  }

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
      <VoteWidget votes={votes} onUp={handleVote} onDown={handleVote} />

      <div>
        <div className="post-title">{post.title}</div>

        <div className="post-meta" style={{ marginBottom: 8 }}>
          {post.author?.name ?? "Unknown"} •{" "}
          {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {post.tags?.map((t) => (
            <TagChip key={t} tag={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
