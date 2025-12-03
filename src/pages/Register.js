import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Register() {
  const { signUp } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function submit() {
    if (password !== confirm) return alert("Passwords do not match");
    signUp({ name: username, email, password });
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
      <div style={{ maxWidth: 480, width: "100%" }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, textAlign: "center" }}>
          Create Your Account
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "var(--muted)",
            marginBottom: 32,
          }}
        >
          Join our community to share and discover knowledge.
        </p>

        <div style={{ display: "grid", gap: 20 }}>
          <div>
            <label style={{ color: "var(--text)", fontSize: 14 }}>
              Username
            </label>
            <input
              className="input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label style={{ color: "var(--text)", fontSize: 14 }}>Email</label>
            <input
              className="input"
              placeholder="Enter your email address"
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

          <div>
            <label style={{ color: "var(--text)", fontSize: 14 }}>
              Confirm Password
            </label>
            <input
              className="input"
              placeholder="Confirm your password"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button
            className="btn primary"
            style={{
              width: "100%",
              marginTop: 12,
              padding: "12px 0",
              fontSize: 16,
            }}
            onClick={submit}
          >
            Create Account
          </button>

          <p style={{ color: "var(--muted)", textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--primary)" }}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
