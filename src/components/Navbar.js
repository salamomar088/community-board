import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { theme, toggle } = useTheme();
  const nav = useNavigate();
  const location = useLocation();

  function active(path) {
    return location.pathname === path;
  }

  return (
    <nav className="nav flex-between" style={{ padding: "0 28px" }}>
      <div style={{ fontSize: 20, fontWeight: 700 }}>Knowledge Community</div>

      <div className="flex" style={{ gap: 16 }}>
        <button
          className="btn nav-btn"
          style={{
            fontWeight: active("/") ? 600 : 400,
            background: active("/") ? "var(--border)" : "var(--card)",
          }}
          onClick={() => nav("/")}
        >
          Home
        </button>

        <button
          className="btn nav-btn"
          style={{
            fontWeight: active("/create") ? 600 : 400,
            background: active("/create") ? "var(--border)" : "var(--card)",
          }}
          onClick={() => nav("/create")}
        >
          + New Post
        </button>

        {!user && (
          <button
            className="btn nav-btn"
            style={{
              fontWeight: active("/login") ? 600 : 400,
              background: active("/login") ? "var(--border)" : "var(--card)",
            }}
            onClick={() => nav("/login")}
          >
            Log In
          </button>
        )}

        {user && (
          <button className="btn nav-btn" onClick={signOut}>
            Logout
          </button>
        )}
      </div>

      <div className="flex" style={{ gap: 14 }}>
        {user && (
          <div
            className="profile-tag"
            onClick={() => nav(`/profile/${user.id}`)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 10px",
              borderRadius: 10,
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            <img
              src={user.avatar}
              alt="user avatar"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                fontSize: 14,
                fontWeight: active(`/profile/${user.id}`) ? 600 : 400,
                color: theme === "dark" ? "white" : "var(--text)",
              }}
            >
              {user.name}
            </div>
          </div>
        )}

        <button className="btn ghost" style={{ fontSize: 16 }} onClick={toggle}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
