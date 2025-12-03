import { useParams } from "react-router-dom";
import { postsSeed } from "../data/mock";
import PostCard from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { userId } = useParams();
  const { user } = useAuth();

  const userPosts = postsSeed.filter((p) => p.author.id === userId);

  return (
    <div className="grid" style={{ maxWidth: 900, margin: "0 auto" }}>
      <div className="card">
        <div className="profile-header">
          <img src={`https://i.pravatar.cc/100?u=${userId}`} alt="user" />

          <div>
            <div className="profile-name">{user?.name || "User"}</div>

            <div className="post-meta">{userPosts.length} posts shared</div>
          </div>
        </div>
      </div>

      {userPosts.length === 0 && <div className="card empty">No Posts Yet</div>}

      {userPosts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
