import AppLink from './AppLink.jsx';
import Card from './Card.jsx';
import StickyCtaBar from './StickyCtaBar.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';

export default function HomePage({ home, nav, routes, siteName, onNavigate }) {
  const benefitsRef = useScrollReveal();
  const stepsRef = useScrollReveal();
  const complianceRef = useScrollReveal();
  const testimonialsRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <>
      <section className="hero hero-merge">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{home.heroEyebrow}</p>
              <h2>{home.heroTitle}</h2>
              <p className="hero-lead">{home.heroText}</p>
              <div className="hero-actions">
                <AppLink href={routes.appointment} className="btn" onNavigate={onNavigate}>{home.heroButton}</AppLink>
                <AppLink href={`${routes.home}#features`} className="btn btn-secondary" onNavigate={onNavigate}>{home.heroSecondaryButton}</AppLink>
              </div>
              <div className="trust-badges">
                {home.trustBadges.map((badge) => (
                  <span key={badge.label}>
                    <span className="trust-badge-icon">{badge.icon}</span>
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="hero-panel">
              <div className="panel-card">
                <p className="panel-label">AI</p>
                <h3>{siteName}</h3>
                <p className="panel-text">{home.spotlightText}</p>
                <ul className="panel-list">
                  {home.spotlightPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="features" ref={benefitsRef}>
        <div className="container">
          <h2 className="page-title">{home.benefitsTitle}</h2>
          <div className="cards">
            {home.benefits.map((benefit, index) => (
              <div className="reveal-item" key={benefit.title} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card title={benefit.title} text={benefit.text} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt section-lazy reveal-item" ref={complianceRef}>
        <div className="container">
          <div className="split-section">
            <div>
              <h2 className="section-title">{home.complianceTitle}</h2>
              <p className="section-text">{home.complianceText}</p>
            </div>
            <div className="compliance-box">
              <p className="compliance-kicker">GDPR</p>
              <h3>{home.complianceCardTitle}</h3>
              <p>{home.complianceCardText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-lazy" ref={stepsRef}>
        <div className="container">
          <h2 className="page-title">{home.stepsTitle}</h2>
          <div className="steps-grid">
            {home.steps.map((step, index) => (
              <div className="reveal-item" key={step.title} style={{ transitionDelay: `${index * 120}ms` }}>
                <Card title={step.title} text={step.text} className="step-card" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt section-lazy" ref={testimonialsRef}>
        <div className="container">
          <h2 className="page-title">{home.testimonialsTitle}</h2>
          <div className="testimonials-grid">
            {home.testimonials.map((t, index) => (
              <div className="testimonial-card reveal-item" key={t.author} style={{ transitionDelay: `${index * 120}ms` }}>
                <blockquote className="testimonial-quote">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="testimonial-author">
                  <p className="testimonial-name">{t.author}</p>
                  <p className="testimonial-role">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-lazy cta-section reveal-item" ref={ctaRef}>
        <div className="container">
          <div className="cta-box">
            <h2>{home.ctaTitle}</h2>
            <p>{home.ctaText}</p>
            <AppLink href={routes.contact} className="btn cta-box-btn" onNavigate={onNavigate}>{nav.contact}</AppLink>
          </div>
        </div>
      </section>

      <StickyCtaBar
        label={home.stickyCtaText}
        href={routes.appointment}
        onNavigate={onNavigate}
      />
    </>
  );
}
