import AppLink from './AppLink.jsx';
import BrandLogo from './BrandLogo.jsx';

export default function Footer({ footer, footerTagline, footerNav, footerContact, footerAddress, locale, nav, routes, onNavigate }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div>
                <BrandLogo className="brand-logo-footer" />
                <p className="footer-brand-text">{footerTagline}</p>
              </div>
            </div>
          </div>
          <div className="footer-links">
            <p className="footer-heading">{footerNav}</p>
            <AppLink href={routes.home} onNavigate={onNavigate}>{nav.home}</AppLink>
            <AppLink href={routes.about} onNavigate={onNavigate}>{nav.about}</AppLink>
            <AppLink href={routes.services} onNavigate={onNavigate}>{nav.services}</AppLink>
            <AppLink href={routes.contact} onNavigate={onNavigate}>{nav.contact}</AppLink>
          </div>
          <div className="footer-links">
            <p className="footer-heading">{footerContact}</p>
            <a href="mailto:hello@medvoiceai.sk">hello@medvoiceai.sk</a>
            <a href="tel:+421900123456">+421 900 123 456</a>
            <p>{footerAddress}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{footer}</p>
        </div>
      </div>
    </footer>
  );
}
