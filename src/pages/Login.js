import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit() {
    signIn({ email, password });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          flex: 1,
          background:
            "radial-gradient(circle at center, #38bdf8 0%, #0f172a 70%)",
          display: "none",
        }}
        className="login-left"
      ></div>

      <div
        style={{
          flex: 1,
          maxWidth: 380,
          width: "100%",
        }}
      >
        <h1 style={{ color: "var(--text)", fontSize: 32, fontWeight: 700 }}>
          Welcome Back
        </h1>

        <p style={{ color: "var(--muted)", marginBottom: 32 }}>
          Log in to access your community.
        </p>

        <div style={{ display: "grid", gap: 20 }}>
          <div>
            <label style={{ color: "var(--text)", fontSize: 14 }}>
              Email or Username
            </label>
            <input
              className="input"
              placeholder="Enter your email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label style={{ color: "var(--text)", fontSize: 14 }}>
              Password
            </label>
            <input
              className="input"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn primary"
            style={{ width: "100%", padding: "12px 0", fontSize: 16 }}
            onClick={submit}
          >
            Log In
          </button>

          <p style={{ color: "var(--muted)", textAlign: "center" }}>
            Don’t have an account?{" "}
            <Link to="/register" style={{ color: "var(--primary)" }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
