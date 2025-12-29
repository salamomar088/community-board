import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function EditPost() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user, token } = useAuth();

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔄 Load post
  useEffect(() => {
    loadPost();
  }, [id]);

  async function loadPost() {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Post not found");
      }

      setPost(data);
      setTitle(data.title);
      setContent(data.content);
    } catch (err) {
      toast.error(err.message);
      nav("/");
    } finally {
      setLoading(false);
    }
  }

  // 💾 Save changes
  async function save() {
    if (!title.trim() || !content.trim()) {
      return toast.error("Title and content cannot be empty");
    }

    try {
      const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        throw new Error("Failed to update post");
      }

      toast.success("Post updated");
      nav(`/post/${id}`);
    } catch (err) {
      toast.error(err.message);
    }
  }

  if (loading) {
    return <div className="card">Loading...</div>;
  }

  if (!post) {
    return <div className="card empty">Post Not Found</div>;
  }

  // 🔐 Owner-only access
  if (!user || user.id !== post.user_id) {
    return <div className="card empty">Not allowed to edit this post</div>;
  }

  return (
    <div className="grid" style={{ maxWidth: 900, margin: "0 auto" }}>
      <div className="card">
        <div className="post-title" style={{ marginBottom: 12 }}>
          Edit Post
        </div>

        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Edit title"
        />

        <textarea
          className="textarea"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Edit content"
        />

        <div className="flex" style={{ justifyContent: "flex-end" }}>
          <button className="btn primary" onClick={save}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
