import api from "./api";

/**
 * Get all comments for a post
 */
export async function getComments(postId) {
  try {
    const res = await api.get(`/comments/${postId}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to load comments");
  }
}

/**
 * Add a new comment
 */
export async function addComment({ postId, content }) {
  try {
    const res = await api.post("/comments", {
      postId,
      content,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to add comment");
  }
}

/**
 * Delete a comment (owner only)
 * (optional but professional)
 */
export async function deleteComment(commentId) {
  try {
    const res = await api.delete(`/comments/${commentId}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to delete comment");
  }
}
