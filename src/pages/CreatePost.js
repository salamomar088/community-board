import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

// Available tags (backend-driven storage, no pre-definition needed)
const TAGS = ["general", "help", "discussion", "news", "random"];

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [preview, setPreview] = useState(false);

  const { user } = useAuth();
  const nav = useNavigate();

  function toggleTag(tag) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  // 🚀 CREATE POST
  async function create() {
    if (!user) return toast.error("Sign in to create a post");
    if (!title.trim() || !content.trim()) {
      return toast.error("Please fill Title & Content");
    }

    if (selectedTags.length === 0) {
      return toast.error("Please select at least one tag");
    }

    try {
      await api.post("/posts", {
        title: title.trim(),
        content: content.trim(),
        tags: selectedTags, // ✅ GUARANTEED NON-EMPTY ARRAY
      });

      toast.success("Post created");
      nav("/");
    } catch (err) {
      toast.error(err.message);
    }
  }

  const tagBadges = useMemo(
    () => (
      <div className="tags" style={{ margin: "8px 0" }}>
        {TAGS.map((t) => (
          <button
            key={t}
            className="tag"
            aria-pressed={selectedTags.includes(t)}
            onClick={() => toggleTag(t)}
          >
            #{t}
            {selectedTags.includes(t) ? " ✓" : ""}
          </button>
        ))}
      </div>
    ),
    [selectedTags]
  );

  function closeModal() {
    nav("/");
  }

  return (
    <div
      onClick={closeModal}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        zIndex: 200,
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: 800,
          maxHeight: "88vh",
          overflowY: "auto",
          borderRadius: 16,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-between">
          <div style={{ fontWeight: 600 }}>Create Post</div>
          <button className="btn" onClick={closeModal}>
            Back
          </button>
        </div>

        <hr />

        {!preview ? (
          <div className="grid">
            <input
              className="input"
              placeholder="Write a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="textarea"
              rows="10"
              placeholder="Write in Markdown..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div>
              <div className="post-meta" style={{ marginBottom: 6 }}>
                Tags
              </div>
              {tagBadges}
            </div>

            <div className="flex" style={{ justifyContent: "space-between" }}>
              <button className="btn" onClick={() => setPreview(true)}>
                Preview
              </button>

              <button className="btn primary" onClick={create}>
                Publish
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="post-title" style={{ marginBottom: 6 }}>
              {title || "Untitled"}
            </div>

            <div className="tags" style={{ margin: "8px 0" }}>
              {selectedTags.map((t) => (
                <span className="tag" key={t}>
                  #{t}
                </span>
              ))}
            </div>

            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || "_Nothing yet..._"}
            </ReactMarkdown>

            <div
              className="flex"
              style={{ justifyContent: "flex-end", marginTop: 20 }}
            >
              <button className="btn" onClick={() => setPreview(false)}>
                Back to Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
