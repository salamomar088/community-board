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
        background: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          background: "transparent",
        }}
      >
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            textAlign: "center",
            color: "white",
          }}
        >
          Create Your Account
        </h1>

        <p style={{ textAlign: "center", color: "#94a3b8", marginBottom: 32 }}>
          Join our community to share and discover knowledge.
        </p>

        <div style={{ display: "grid", gap: 20 }}>
          <div>
            <label style={{ color: "white", fontSize: 14 }}>Username</label>
            <input
              className="input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label style={{ color: "white", fontSize: 14 }}>Email</label>
            <input
              className="input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label style={{ color: "white", fontSize: 14 }}>Password</label>
            <input
              className="input"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label style={{ color: "white", fontSize: 14 }}>
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

          <p style={{ color: "#94a3b8", textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#3b82f6" }}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
