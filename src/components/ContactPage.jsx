export default function ContactPage({ pageContent }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="page-title">{pageContent.title}</h2>
        <p className="section-text centered-text">{pageContent.intro}</p>
        <div className="split-section">
          <div className="content-box">
            <p><strong>{pageContent.addressLabel}:</strong> {pageContent.address}</p>
            <p><strong>{pageContent.phoneLabel}:</strong> {pageContent.phone}</p>
            <p><strong>{pageContent.emailLabel}:</strong> {pageContent.email}</p>
            <p><strong>{pageContent.hoursLabel}:</strong> {pageContent.hours}</p>
          </div>
          <div className="feature-list-box">
            <h3 className="section-subtitle">{pageContent.boxTitle}</h3>
            <ul className="feature-list">
              {pageContent.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
