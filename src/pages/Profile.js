import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import api from "../api/axios";

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

  // 🔄 Fetch profile user + posts (Axios + ESLint-safe)
  useEffect(() => {
    if (!user) return;

    async function loadProfileData() {
      try {
        const [profileRes, postsRes] = await Promise.all([
          api.get(`/profile/${userId}`),
          api.get("/posts"),
        ]);

        setProfileUser(profileRes.data);

        const userPosts = postsRes.data.filter(
          (p) => String(p.user_id) === String(userId)
        );

        setPosts(userPosts);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfileData();
  }, [userId, user]);

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
