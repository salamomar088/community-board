import { useTheme } from "../contexts/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "#ffffff" : "#0f172a";

  return (
    <footer
      style={{
        marginTop: 40,
        padding: "50px 20px",
        background:
          theme === "dark"
            ? "linear-gradient(to bottom, #0f172a, #0a0f1f)"
            : "linear-gradient(to bottom, #f8fafc, #ffffff)",
        borderTop: "1px solid var(--border)",
        color: textColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="footer-glow"></div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 10,
            color: textColor,
          }}
        >
          Knowledge Community
        </div>

        <div
          style={{
            fontSize: 14,
            opacity: 0.7,
            marginBottom: 20,
            color: textColor,
          }}
        >
          A place to learn, share, and grow together.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            marginBottom: 20,
          }}
        >
          <svg
            onClick={() =>
              window.open(
                "https://github.com/salamomar088/community-board",
                "_blank"
              )
            }
            width="28"
            height="28"
            fill={textColor}
            className="footer-icon"
          >
            <path d="M12 .5A12 12 0 0 0 0 12.7C0 18.2 3.4 22.8 8.2 24.5c.6.1.8-.3.8-.6v-2c-3.4.8-4.2-1.7-4.2-1.7-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.6-.8 1.6-.8.4-1.2 1-1.5 1-1.5-2.7-.3-5.5-1.4-5.5-6 0-1.2.4-2.3 1.1-3.2-.1-.3-.5-1.6.1-3.3 0 0 .9-.3 3 1.2a10.2 10.2 0 0 1 5.5 0c2.1-1.5 3-1.2 3-1.2.6 1.7.2 3 .1 3.3.7.9 1.1 2 1.1 3.2 0 4.6-2.8 5.7-5.5 6 0 .2.5.7 1.1 1.7v2.6c0 .3.2.7.8.6A12 12 0 0 0 24 12.7 12 12 0 0 0 12 .5Z" />
          </svg>
        </div>

        <div
          style={{
            fontSize: 13,
            opacity: 0.8,
            color: textColor,
          }}
        >
          © {new Date().getFullYear()} Knowledge Community. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
