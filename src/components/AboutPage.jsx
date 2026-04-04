export default function AboutPage({ pageContent }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="page-title">{pageContent.title}</h2>
        <div className="split-section">
          <div className="content-box">
            <h3 className="section-subtitle">{pageContent.introTitle}</h3>
            {pageContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="feature-list-box">
            <h3 className="section-subtitle">{pageContent.highlightsTitle}</h3>
            <ul className="feature-list">
              {pageContent.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
