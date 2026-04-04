import { useEffect, useState } from 'react';
import AppLink from './AppLink.jsx';
import BrandLogo from './BrandLogo.jsx';

export default function Header({ locale, nav, routes, switcher, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuLabel = locale === 'sk' ? 'Menu' : 'Menu';
  const closeLabel = locale === 'sk' ? 'Zavrieť menu' : 'Close menu';

  useEffect(() => {
    setIsMenuOpen(false);
  }, [locale, routes.home, routes.about, routes.services, routes.contact, routes.appointment]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  function handleNavigate(href) {
    setIsMenuOpen(false);
    onNavigate(href);
  }

  return (
    <header role="banner">
      <div className="container">
        <div className="floating-header">
          <nav aria-label={locale === 'sk' ? 'Hlavná navigácia' : 'Main navigation'}>
            <h1>
              <AppLink className="brand" href={routes.home} onNavigate={handleNavigate}>
                <BrandLogo />
              </AppLink>
            </h1>

            <button
              type="button"
              className={`menu-toggle ${isMenuOpen ? 'is-open' : ''}`}
              aria-expanded={isMenuOpen}
              aria-controls="site-navigation"
              aria-label={isMenuOpen ? closeLabel : menuLabel}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>

            <div className={`nav-right ${isMenuOpen ? 'is-open' : ''}`} id="site-navigation" role="menu">
              <ul>
                <li><AppLink href={routes.home} onNavigate={handleNavigate}>{nav.home}</AppLink></li>
                <li><AppLink href={routes.about} onNavigate={handleNavigate}>{nav.about}</AppLink></li>
                <li><AppLink href={routes.services} onNavigate={handleNavigate}>{nav.services}</AppLink></li>
                <li><AppLink href={routes.contact} onNavigate={handleNavigate}>{nav.contact}</AppLink></li>
                <li><AppLink href={routes.appointment} className="nav-cta" onNavigate={handleNavigate}>{nav.appointment}</AppLink></li>
              </ul>
              <div className="language-switcher" role="group" aria-label={locale === 'sk' ? 'Výber jazyka' : 'Language switcher'}>
                <AppLink href={switcher.sk} className={locale === 'sk' ? 'active' : ''} onNavigate={handleNavigate} aria-current={locale === 'sk' ? 'true' : undefined}>🇸🇰 <span>SK</span></AppLink>
                <AppLink href={switcher.en} className={locale === 'en' ? 'active' : ''} onNavigate={handleNavigate} aria-current={locale === 'en' ? 'true' : undefined}>🇬🇧 <span>EN</span></AppLink>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
