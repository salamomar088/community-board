import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postsSeed } from "../data/mock";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export default function EditPost() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();

  const post = postsSeed.find((p) => p.id === id);

  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");

  function save() {
    if (!post) return;
    post.title = title;
    post.content = content;
    toast.success("Post updated");
    nav(`/post/${id}`);
  }

  if (!post) {
    return <div className="card empty">Post Not Found</div>;
  }

  if (user?.id !== post.author.id) {
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
