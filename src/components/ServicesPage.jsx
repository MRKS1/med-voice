import { useState } from 'react';
import Card from './Card.jsx';

export default function ServicesPage({ pageContent }) {
  const [isPaidOpen, setIsPaidOpen] = useState(false);

  const paidFeatures = pageContent.paidFeatures;

  return (
    <section className="section">
      <div className="container">
        <div className="cards services-cards" aria-label="Funkcie systému">
          {pageContent.items.map((item) => (
            <Card
              key={item.title}
              title={item.title}
              text={item.text}
              tag={item.tag}
              className="card service-card"
            />
          ))}
          {paidFeatures ? (
            <button
              type="button"
              className="card service-card paid-service-card"
              onClick={() => setIsPaidOpen(true)}
              aria-haspopup="dialog"
              aria-controls="paid-features-modal"
            >
              <h3>{paidFeatures.title}</h3>
              <p>{paidFeatures.teaser}</p>
            </button>
          ) : null}
        </div>
      </div>

      {isPaidOpen && paidFeatures ? (
        <div
          className="paid-modal-backdrop"
          onClick={() => setIsPaidOpen(false)}
          role="presentation"
        >
          <div
            id="paid-features-modal"
            className="paid-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="paid-features-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="paid-modal-header">
              <h3 id="paid-features-title">{paidFeatures.title}</h3>
              <button
                type="button"
                className="paid-modal-close"
                onClick={() => setIsPaidOpen(false)}
                aria-label="Zavrieť okno"
              >
                ×
              </button>
            </div>
            <p className="paid-modal-intro">{paidFeatures.description}</p>
            <div className="paid-features-grid">
              {paidFeatures.features.map((feature) => (
                <div key={feature.title} className="paid-feature-bubble">
                  <h4>{feature.title}</h4>
                  <p>{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
