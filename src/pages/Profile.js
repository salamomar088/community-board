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
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Route protection
  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to view profile");
      nav("/login");
    }
  }, [user, nav]);

  // 🔄 Fetch profile user + posts
  useEffect(() => {
    if (user) {
      loadProfileUser();
      loadUserPosts();
    }
  }, [userId, user]);

  async function loadProfileUser() {
    try {
      const res = await fetch(`${API_URL}/profile/${userId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load profile");
      }

      setProfileUser(data);
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function loadUserPosts() {
    try {
      const res = await fetch(`${API_URL}/posts`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load posts");
      }

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
          {/* ✅ REAL PROFILE IMAGE */}
          <img
            src={profileUser?.profile_picture || "/avatar-placeholder.png"}
            alt=""
            style={{ width: 70, height: 70, borderRadius: "50%" }}
          />

          <div>
            <div className="profile-name">{profileUser?.fullname}</div>

            <div className="post-meta">{posts.length} posts shared</div>

            {/* ✅ Edit only if owner */}
            {user?.id === Number(userId) && (
              <button
                className="btn"
                style={{ marginTop: 8 }}
                onClick={() => nav("/profile/edit")}
              >
                Edit Profile
              </button>
            )}
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
