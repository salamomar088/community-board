export default function VoteWidget({ votes, onUp, onDown }) {
  return (
    <div className="vote" onClick={(e) => e.stopPropagation()}>
      <button className="up" onClick={onUp}>
        ▲
      </button>
      <div style={{ fontWeight: 600 }}>{votes}</div>
      <button className="down" onClick={onDown}>
        ▼
      </button>
    </div>
  );
}
