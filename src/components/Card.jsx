export default function Card({ title, text, tag, className = 'card' }) {
  return (
    <div className={className}>
      {tag ? <span className="card-tag">{tag}</span> : null}
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
