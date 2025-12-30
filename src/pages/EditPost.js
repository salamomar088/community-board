import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function EditPost() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔄 Load post (Axios + ESLint-safe)
  useEffect(() => {
    async function loadPost() {
      try {
        const res = await api.get(`/posts/${id}`);
        const data = res.data;

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

    loadPost();
  }, [id, nav]);

  // 💾 Save changes
  async function save() {
    if (!title.trim() || !content.trim()) {
      return toast.error("Title and content cannot be empty");
    }

    try {
      await api.put(`/posts/${id}`, {
        title,
        content,
      });

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
