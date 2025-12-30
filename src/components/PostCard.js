import { useNavigate } from "react-router-dom";
import { useState } from "react";
import VoteWidget from "./VoteWidget";
import TagChip from "./TagChip";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { toggleLike } from "../services/likeService";

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) {
      return `Posted ${count} ${i.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Posted just now";
}

export default function PostCard({ post }) {
  const nav = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [votes, setVotes] = useState(post.votes || 0);

  async function handleVote(e) {
    console.log("VOTE CLICKED", post.id);
    if (e) e.stopPropagation(); // ✅ SAFE

    if (!isAuthenticated) {
      return toast.error("Sign in to vote");
    }

    try {
      const result = await toggleLike(post.id, token);
      console.log("LIKE RESPONSE:", result);

      if (typeof result.likes === "number") {
        setVotes(result.likes);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  function goToProfile(e) {
    e.stopPropagation(); // prevent opening post
    nav(`/profile/${post.user_id}`);
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
      <VoteWidget
        votes={votes}
        onUp={(e) => handleVote(e)}
        onDown={(e) => handleVote(e)}
      />

      <div>
        {/* ✅ AUTHOR INFO */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
          }}
        >
          <img
            src={post.profile_image || "/avatar-placeholder.png"}
            alt=""
            onClick={goToProfile}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              onClick={goToProfile}
              style={{
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              @{post.username}
            </span>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>
              {post.created_at ? timeAgo(post.created_at) : ""}
            </span>
          </div>
        </div>

        {/* ✅ POST TITLE */}
        <div className="post-title">{post.title}</div>

        {/* ✅ TAGS */}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {post.tags.map((t) => (
              <TagChip key={t} tag={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
