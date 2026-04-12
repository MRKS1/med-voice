export default function AboutPage({ pageContent }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="page-title">{pageContent.title}</h2>
        <div className="split-section about-layout">
          <div className="content-box">
            <h3 className="section-subtitle">{pageContent.introTitle}</h3>
            {pageContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
