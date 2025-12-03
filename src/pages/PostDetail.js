import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { postsSeed } from "../data/mock";
import CommentBlock from "../components/CommentBlock";
import VoteWidget from "../components/VoteWidget";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PostDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const p = postsSeed.find((p) => p.id === id);
    setPost(p || null);
    setComments([
      {
        id: "c1",
        text: "Nice structure!",
        author: "Maya",
        createdAt: Date.now() - 400000,
        depth: 0,
      },
      {
        id: "c2",
        text: "Agree with folders per feature.",
        author: "Ali",
        createdAt: Date.now() - 300000,
        depth: 1,
      },
    ]);
  }, [id]);

  if (!post) return <div className="card empty">Post Not Found</div>;

  function vote(delta) {
    setPost((p) => ({ ...p, votes: p.votes + delta }));
  }

  function addComment() {
    if (!user) return toast.error("Please sign in to comment");
    if (!newComment.trim()) return toast.error("Write something first");

    setComments((cs) => [
      {
        id: Date.now().toString(),
        text: newComment,
        author: user.name,
        createdAt: Date.now(),
        depth: 0,
      },
      ...cs,
    ]);

    setNewComment("");
    toast.success("Comment added");
  }

  function deletePost() {
    const index = postsSeed.findIndex((p) => p.id === id);
    if (index !== -1) postsSeed.splice(index, 1);
    toast.success("Post deleted");
    nav("/");
  }

  return (
    <div className="grid" style={{ maxWidth: 900, margin: "0 auto" }}>
      <div
        className="card"
        style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 12 }}
      >
        <VoteWidget
          votes={post.votes}
          onUp={() => vote(+1)}
          onDown={() => vote(-1)}
        />

        <div>
          <div className="post-title" style={{ marginBottom: 6 }}>
            {post.title}
          </div>

          <div className="post-meta" style={{ marginBottom: 6 }}>
            by {post.author.name}
          </div>

          {user?.id === post.author.id && (
            <div className="flex" style={{ gap: 8, marginBottom: 12 }}>
              <button className="btn" onClick={() => nav(`/edit/${post.id}`)}>
                Edit
              </button>
              <button
                className="btn"
                style={{ color: "red" }}
                onClick={deletePost}
              >
                Delete
              </button>
            </div>
          )}

          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Add a Comment</div>
        <textarea
          className="textarea"
          rows="3"
          placeholder="Write a helpful comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex" style={{ justifyContent: "flex-end" }}>
          <button className="btn primary" onClick={addComment}>
            Comment
          </button>
        </div>
      </div>

      <div className="grid">
        {comments.map((c) => (
          <CommentBlock key={c.id} comment={c} />
        ))}
      </div>
    </div>
  );
}
