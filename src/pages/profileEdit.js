import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function ProfileEdit() {
  const { user } = useAuth();
  const nav = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 Protect page
  if (!user) {
    nav("/login");
    return null;
  }

  function onImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function uploadImage() {
    if (!image) return toast.error("Please select an image");

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);

      await api.put("/profile/image", formData);

      toast.success("Profile image updated");
      nav(`/profile/${user.id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid" style={{ maxWidth: 900, margin: "0 auto" }}>
      <div className="card">
        <h2 style={{ marginBottom: 12 }}>Edit Profile</h2>

        {/* Image preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: 12,
            }}
          />
        )}

        {/* File input */}
        <input type="file" accept="image/*" onChange={onImageChange} />

        <div className="flex" style={{ gap: 8, marginTop: 12 }}>
          <button
            className="btn primary"
            onClick={uploadImage}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Save"}
          </button>

          <button className="btn" onClick={() => nav(-1)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
