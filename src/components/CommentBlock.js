import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export default function CommentBlock({ comment, comments, setComments }) {
  const { user } = useAuth();
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  function addReply() {
    if (!user) return toast.error("Please sign in to reply");
    if (!replyText.trim()) return toast.error("Write something first");

    const newReply = {
      id: Date.now().toString(),
      parentId: comment.id,
      text: replyText,
      author: user.name,
      createdAt: Date.now(),
      depth: comment.depth + 1,
    };

    setComments((prev) => [newReply, ...prev]);
    setReplyText("");
    setReplyOpen(false);
    toast.success("Reply added");
  }

  const replies = (comments || []).filter((c) => c.parentId === comment.id);

  return (
    <div
      className="card"
      style={{ marginLeft: comment.depth * 20, marginTop: 8 }}
    >
      <div className="post-meta">
        by {comment.author} · {new Date(comment.createdAt).toLocaleString()}
      </div>
      <div style={{ marginTop: 6 }}>{comment.text}</div>

      <div className="flex" style={{ marginTop: 6 }}>
        <button className="btn" onClick={() => setReplyOpen((r) => !r)}>
          {replyOpen ? "Cancel" : "Reply"}
        </button>
      </div>

      {replyOpen && (
        <div style={{ marginTop: 8 }}>
          <textarea
            className="textarea"
            rows="2"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div
            className="flex"
            style={{ justifyContent: "flex-end", marginTop: 6 }}
          >
            <button className="btn primary" onClick={addReply}>
              Add Reply
            </button>
          </div>
        </div>
      )}

      {replies.length > 0 && (
        <div className="grid">
          {replies.map((r) => (
            <CommentBlock
              key={r.id}
              comment={r}
              comments={comments}
              setComments={setComments}
            />
          ))}
        </div>
      )}
    </div>
  );
}
