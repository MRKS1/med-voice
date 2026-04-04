import Card from './Card.jsx';

export default function ServicesPage({ pageContent }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="page-title">{pageContent.title}</h2>
        <p className="section-text centered-text">{pageContent.intro}</p>
        <div className="cards">
          {pageContent.items.map((item) => (
            <Card key={item.title} title={item.title} text={item.text} />
          ))}
        </div>
        <div className="content-box outro-box">
          <h3 className="section-subtitle">{pageContent.outroTitle}</h3>
          <p>{pageContent.outroText}</p>
        </div>
      </div>
    </section>
  );
}
