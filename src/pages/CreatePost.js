import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { tagsAll, postsSeed } from "../data/mock";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [preview, setPreview] = useState(false);
  const { user } = useAuth();
  const nav = useNavigate();

  function toggleTag(tag) {
    setSelectedTags((ts) =>
      ts.includes(tag) ? ts.filter((t) => t !== tag) : [...ts, tag]
    );
  }

  function create() {
    if (!user) return toast.error("Sign in to create a post");
    if (!title.trim() || !content.trim())
      return toast.error("Please fill Title & Content");

    const newPost = {
      id: uuid(),
      title,
      content,
      author: { id: user.id, name: user.name, avatar: user.avatar },
      tags: selectedTags,
      votes: 0,
      commentsCount: 0,
      createdAt: Date.now(),
    };

    postsSeed.unshift(newPost);
    toast.success("Post created");
    nav(`/post/${newPost.id}`);
  }

  const tagBadges = useMemo(
    () => (
      <div className="tags" style={{ margin: "8px 0" }}>
        {tagsAll.map((t) => (
          <button
            key={t}
            className="tag"
            onClick={() => toggleTag(t)}
            aria-pressed={selectedTags.includes(t)}
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
          position: "relative",
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
              <button className="btn" onClick={() => setPreview((p) => !p)}>
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
