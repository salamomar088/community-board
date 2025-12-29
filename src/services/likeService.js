const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export async function toggleLike(postId, token) {
  const res = await fetch(`${API_URL}/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ postId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to toggle like");
  }

  return data;
}
