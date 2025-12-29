import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function Profile() {
  const { userId } = useParams();
  const { user } = useAuth();
  const nav = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Route protection
  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to view profile");
      nav("/login");
    }
  }, [user, nav]);

  // 🔄 Fetch posts
  useEffect(() => {
    if (user) {
      loadUserPosts();
    }
  }, [userId, user]);

  async function loadUserPosts() {
    try {
      const res = await fetch(`${API_URL}/posts`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load posts");
      }

      // filter posts belonging to profile user
      const userPosts = data.filter(
        (p) => String(p.user_id) === String(userId)
      );

      setPosts(userPosts);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!user) return null;

  return (
    <div className="grid" style={{ maxWidth: 900, margin: "0 auto" }}>
      <div className="card">
        <div
          className="profile-header"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          {/* avatar still mocked intentionally */}
          <img
            src={`https://i.pravatar.cc/100?u=${userId}`}
            alt=""
            style={{ width: 70, height: 70, borderRadius: "50%" }}
          />

          <div>
            <div className="profile-name">{user.fullname}</div>
            <div className="post-meta">{posts.length} posts shared</div>
          </div>
        </div>
      </div>

      {loading && <div className="card">Loading posts...</div>}

      {!loading && posts.length === 0 && (
        <div className="card empty">No Posts Yet</div>
      )}

      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
