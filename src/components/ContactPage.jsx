export default function ContactPage({ pageContent }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="page-title">{pageContent.title}</h2>
        <p className="section-text centered-text">{pageContent.intro}</p>
        <div className="split-section contact-layout">
          <div className="content-box">
            <p><strong>{pageContent.addressLabel}:</strong> {pageContent.address}</p>
            <p><strong>{pageContent.phoneLabel}:</strong> {pageContent.phone}</p>
            <p><strong>{pageContent.emailLabel}:</strong> {pageContent.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
