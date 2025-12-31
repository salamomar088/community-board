import api from "../api/axios";

export async function toggleLike(postId) {
  try {
    const res = await api.post("/likes", { postId });

    return res.data;
    // expected:
    // { status: "success", liked: true/false, likes: number }
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to toggle like");
  }
}
