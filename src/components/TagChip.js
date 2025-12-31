export default function TagChip({ label, active, onClick }) {
  return (
    <button
      className="tag"
      aria-pressed={active}
      onClick={onClick} // 🔑 no logic here
      style={{
        background: active ? "var(--primary)" : "var(--tag-bg)",
        color: active ? "white" : "var(--tag-text)",
        cursor: "pointer",
      }}
    >
      #{label}
    </button>
  );
}
