import { useEffect, useMemo, useState } from 'react';
import { content, routePaths } from './content.js';

function getRouteState(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const locale = normalized === '/en' || normalized.startsWith('/en/') ? 'en' : 'sk';
  const pageMap = routePaths[locale];
  const matchedPage = Object.entries(pageMap).find(([, path]) => path === normalized)?.[0];

  return {
    locale,
    page: matchedPage || 'home'
  };
}

function isModifiedEvent(event) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

function AppLink({ href, className, children, onNavigate }) {
  function handleClick(event) {
    if (
      event.defaultPrevented ||
      isModifiedEvent(event) ||
      event.button !== 0 ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      return;
    }

    event.preventDefault();
    onNavigate(href);
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}

function Header({ locale, nav, routes, switcher, siteName, brandTagline, onNavigate }) {
  return (
    <header>
      <div className="container">
        <div className="floating-header">
          <nav>
            <h1>
              <AppLink className="brand" href={routes.home} onNavigate={onNavigate}>
                <span className="brand-mark" aria-hidden="true">MV</span>
                <span className="brand-copy">
                  <span className="brand-name">{siteName}</span>
                  <span className="brand-tagline">{brandTagline}</span>
                </span>
              </AppLink>
            </h1>
            <div className="nav-right">
              <ul>
                <li><AppLink href={routes.home} onNavigate={onNavigate}>{nav.home}</AppLink></li>
                <li><AppLink href={routes.about} onNavigate={onNavigate}>{nav.about}</AppLink></li>
                <li><AppLink href={routes.services} onNavigate={onNavigate}>{nav.services}</AppLink></li>
                <li><AppLink href={routes.contact} onNavigate={onNavigate}>{nav.contact}</AppLink></li>
                <li><AppLink href={routes.appointment} className="nav-cta" onNavigate={onNavigate}>{nav.appointment}</AppLink></li>
              </ul>
              <div className="language-switcher" aria-label="Language switcher">
                <AppLink href={switcher.sk} className={locale === 'sk' ? 'active' : ''} onNavigate={onNavigate}>🇸🇰 <span>SK</span></AppLink>
                <AppLink href={switcher.en} className={locale === 'en' ? 'active' : ''} onNavigate={onNavigate}>🇬🇧 <span>EN</span></AppLink>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer({ footer, footerTagline, locale, nav, routes, siteName, onNavigate }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="brand-mark" aria-hidden="true">MV</span>
              <div>
                <p className="footer-brand-name">{siteName}</p>
                <p className="footer-brand-text">{footerTagline}</p>
              </div>
            </div>
          </div>
          <div className="footer-links">
            <p className="footer-heading">{locale === 'sk' ? 'Navigácia' : 'Navigation'}</p>
            <AppLink href={routes.home} onNavigate={onNavigate}>{nav.home}</AppLink>
            <AppLink href={routes.about} onNavigate={onNavigate}>{nav.about}</AppLink>
            <AppLink href={routes.services} onNavigate={onNavigate}>{nav.services}</AppLink>
            <AppLink href={routes.contact} onNavigate={onNavigate}>{nav.contact}</AppLink>
          </div>
          <div className="footer-links">
            <p className="footer-heading">{locale === 'sk' ? 'Kontakt' : 'Contact'}</p>
            <a href="mailto:hello@medvoiceai.sk">hello@medvoiceai.sk</a>
            <a href="tel:+421900123456">+421 900 123 456</a>
            <p>{locale === 'sk' ? 'Bratislava, Slovensko' : 'Bratislava, Slovakia'}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{footer}</p>
        </div>
      </div>
    </footer>
  );
}

function HomePage({ home, nav, routes, siteName, onNavigate }) {
  return (
    <>
      <section className="hero hero-merge">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <h2>{home.heroTitle}</h2>
              <p className="hero-lead">{home.heroText}</p>
              <div className="hero-actions">
                <AppLink href={routes.contact} className="btn" onNavigate={onNavigate}>{home.heroButton}</AppLink>
                <AppLink href={`${routes.home}#features`} className="btn btn-secondary" onNavigate={onNavigate}>{home.heroSecondaryButton}</AppLink>
              </div>
              <div className="trust-badges">
                {home.trustBadges.map((badge) => (
                  <span key={badge}>{badge}</span>
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

      <section className="section" id="features">
        <div className="container">
          <h2 className="page-title">{home.benefitsTitle}</h2>
          <div className="cards">
            {home.benefits.map((benefit) => (
              <div className="card" key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
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

      <section className="section">
        <div className="container">
          <h2 className="page-title">{home.stepsTitle}</h2>
          <div className="steps-grid">
            {home.steps.map((step) => (
              <div className="step-card" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>{home.ctaTitle}</h2>
            <p>{home.ctaText}</p>
            <AppLink href={routes.contact} className="btn" onNavigate={onNavigate}>{nav.contact}</AppLink>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage({ pageContent }) {
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

function ServicesPage({ pageContent }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="page-title">{pageContent.title}</h2>
        <p className="section-text centered-text">{pageContent.intro}</p>
        <div className="cards">
          {pageContent.items.map((item) => (
            <div className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
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

function ContactPage({ pageContent }) {
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

function AppointmentPage({ pageContent, locale }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  useEffect(() => {
    setSubmitted(false);
  }, [locale]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      message: ''
    });
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="page-title">{pageContent.title}</h2>
        <p className="section-text centered-text">{pageContent.intro}</p>

        {submitted ? (
          <div className="success-message">{pageContent.success}</div>
        ) : null}

        <div className="split-section appointment-layout">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">{pageContent.labels.name}</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

            <label htmlFor="email">{pageContent.labels.email}</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="phone">{pageContent.labels.phone}</label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

            <label htmlFor="date">{pageContent.labels.date}</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />

            <label htmlFor="message">{pageContent.labels.message}</label>
            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} />

            <button type="submit">{pageContent.submit}</button>
          </form>

          <div className="feature-list-box">
            <h3 className="section-subtitle">{pageContent.asideTitle}</h3>
            <ul className="feature-list">
              {pageContent.asideItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [locationState, setLocationState] = useState(() => window.location.pathname + window.location.hash);

  useEffect(() => {
    function handlePopState() {
      setLocationState(window.location.pathname + window.location.hash);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const routeState = getRouteState(pathname);
  const localeContent = content[routeState.locale];
  const routes = routePaths[routeState.locale];
  const currentPageContent = localeContent[routeState.page];

  const switcher = useMemo(() => {
    const page = routeState.page;
    return {
      sk: routePaths.sk[page],
      en: routePaths.en[page]
    };
  }, [routeState.page]);

  useEffect(() => {
    document.documentElement.lang = routeState.locale;
    document.title = currentPageContent?.title || localeContent.siteName;
  }, [routeState.locale, currentPageContent, localeContent.siteName]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [locationState]);

  function navigate(nextHref) {
    const targetUrl = new URL(nextHref, window.location.origin);
    const nextPath = targetUrl.pathname + targetUrl.hash;
    if (nextPath === window.location.pathname + window.location.hash) {
      return;
    }

    window.history.pushState({}, '', nextPath);
    setLocationState(nextPath);
  }

  function renderPage() {
    switch (routeState.page) {
      case 'about':
        return <AboutPage pageContent={currentPageContent} />;
      case 'services':
        return <ServicesPage pageContent={currentPageContent} />;
      case 'contact':
        return <ContactPage pageContent={currentPageContent} />;
      case 'appointment':
        return <AppointmentPage pageContent={currentPageContent} locale={routeState.locale} />;
      default:
        return (
          <HomePage
            home={localeContent.home}
            nav={localeContent.nav}
            routes={routes}
            siteName={localeContent.siteName}
            onNavigate={navigate}
          />
        );
    }
  }

  return (
    <>
      <Header
        locale={routeState.locale}
        nav={localeContent.nav}
        routes={routes}
        switcher={switcher}
        siteName={localeContent.siteName}
        brandTagline={localeContent.brandTagline}
        onNavigate={navigate}
      />
      {renderPage()}
      <Footer
        footer={localeContent.footer}
        footerTagline={localeContent.footerTagline}
        locale={routeState.locale}
        nav={localeContent.nav}
        routes={routes}
        siteName={localeContent.siteName}
        onNavigate={navigate}
      />
    </>
  );
}
