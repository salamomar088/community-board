import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentBlock from "../components/CommentBlock";
import VoteWidget from "../components/VoteWidget";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../api/axios";

export default function PostDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔄 Load post + comments (Axios + ESLint-safe)
  useEffect(() => {
    async function loadData() {
      try {
        const [postRes, commentsRes] = await Promise.all([
          api.get(`/posts/${id}`),
          api.get(`/comments/${id}`),
        ]);

        const postData = postRes.data;

        setPost({
          ...postData,
          votes: postData.votes ?? 0,
        });

        setComments(commentsRes.data);
      } catch (err) {
        toast.error(err.message);
        nav("/");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, nav]);

  // ❤️ Vote (backend)
  async function vote() {
    if (!user) return toast.error("Sign in to vote");

    try {
      const res = await api.post("/likes", { postId: id });

      setPost((p) => ({
        ...p,
        votes: res.data.likes,
      }));
    } catch (err) {
      toast.error(err.message);
    }
  }

  // 💬 Add comment
  async function addComment() {
    if (!user) return toast.error("Please sign in to comment");
    if (!newComment.trim()) return toast.error("Write something first");

    try {
      await api.post("/comments", {
        postId: id,
        content: newComment,
      });

      setNewComment("");

      // reload comments
      const res = await api.get(`/comments/${id}`);
      setComments(res.data);

      toast.success("Comment added");
    } catch (err) {
      toast.error(err.message);
    }
  }

  // 🗑 Delete post (owner only)
  async function deletePost() {
    if (!user) return;

    try {
      await api.delete(`/posts/${id}`);

      toast.success("Post deleted");
      nav("/");
    } catch (err) {
      toast.error(err.message);
    }
  }

  if (!post) return <div className="card empty">Post Not Found</div>;

  return (
    <div className="grid" style={{ maxWidth: 900, margin: "0 auto" }}>
      <div
        className="card"
        style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 12 }}
      >
        <VoteWidget votes={post.votes} onUp={vote} onDown={vote} />

        <div>
          <div className="post-title" style={{ marginBottom: 6 }}>
            {post.title}
          </div>

          <div className="post-meta" style={{ marginBottom: 6 }}>
            by {post.fullname}
          </div>

          {user?.id === post.user_id && (
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
        {loading && <div>Loading comments...</div>}

        {!loading && comments.length === 0 && (
          <div className="card empty">No comments yet</div>
        )}

        {comments.map((c) => (
          <CommentBlock
            key={c.id}
            comment={{
              ...c,
              text: c.content,
              author: c.fullname,
              createdAt: c.created_at,
              depth: c.depth ?? 0,
            }}
            comments={comments}
            setComments={setComments}
          />
        ))}
      </div>
    </div>
  );
}
