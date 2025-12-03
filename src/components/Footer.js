import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Footer() {
  const nav = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();

  const textColor = theme === "dark" ? "#ffffff" : "#0f172a";

  return (
    <footer
      style={{
        marginTop: 40,
        padding: "40px 20px",
        background:
          theme === "dark"
            ? "linear-gradient(to bottom, #0f172a, #0a0f1f)"
            : "linear-gradient(to bottom, #f8fafc, #ffffff)",
        borderTop: "1px solid var(--border)",
        color: textColor,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 8,
              color: textColor,
            }}
          >
            Knowledge Community
          </div>
          <div
            style={{
              fontSize: 14,
              color: textColor,
              opacity: 0.7,
            }}
          >
            A place to learn, share, and grow together.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            fontSize: 14,
            cursor: "pointer",
            color: textColor,
          }}
        >
          <div onClick={() => nav("/")}>Home</div>
          <div onClick={() => nav("/create")}>Create</div>
          {user ? (
            <div onClick={() => nav(`/profile/${user.id}`)}>Profile</div>
          ) : (
            <div onClick={() => nav("/login")}>Login</div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 14,
          }}
        >
          <svg
            onClick={() => window.open("https://github.com", "_blank")}
            width="22"
            height="22"
            fill={textColor}
            style={{
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            <path d="M12 .5A12 12 0 0 0 0 12.7C0 18.2 3.4 22.8 8.2 24.5c.6.1.8-.3.8-.6v-2c-3.4.8-4.2-1.7-4.2-1.7-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.6-.8 1.6-.8.4-1.2 1-1.5 1-1.5-2.7-.3-5.5-1.4-5.5-6 0-1.2.4-2.3 1.1-3.2-.1-.3-.5-1.6.1-3.3 0 0 .9-.3 3 1.2a10.2 10.2 0 0 1 5.5 0c2.1-1.5 3-1.2 3-1.2.6 1.7.2 3 .1 3.3.7.9 1.1 2 1.1 3.2 0 4.6-2.8 5.7-5.5 6 0 .2.5.7 1.1 1.7v2.6c0 .3.2.7.8.6A12 12 0 0 0 24 12.7 12 12 0 0 0 12 .5Z" />
          </svg>

          <svg
            onClick={() => window.open("https://twitter.com", "_blank")}
            width="22"
            height="22"
            fill={textColor}
            style={{
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.33 4.33 0 0 0 1.9-2.38 8.73 8.73 0 0 1-2.75 1.05A4.3 4.3 0 0 0 11.2 8.1c0 .34.03.67.1.99a12.2 12.2 0 0 1-8.84-4.5 4.32 4.32 0 0 0 1.33 5.75 4.26 4.26 0 0 1-1.95-.54v.06c0 2.1 1.48 3.86 3.45 4.26a4.3 4.3 0 0 1-1.94.07 4.32 4.32 0 0 0 4.03 3A8.7 8.7 0 0 1 2 19.13a12.26 12.26 0 0 0 6.64 1.95c7.96 0 12.3-6.77 12.3-12.63l-.01-.57A9.1 9.1 0 0 0 22.46 6Z" />
          </svg>
        </div>
      </div>

      <div
        style={{
          marginTop: 24,
          textAlign: "center",
          fontSize: 13,
          color: textColor,
          opacity: 0.8,
        }}
      >
        © {new Date().getFullYear()} Knowledge Community. All rights reserved.
      </div>
    </footer>
  );
}
