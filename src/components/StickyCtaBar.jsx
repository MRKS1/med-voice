import { useEffect, useState } from 'react';
import AppLink from './AppLink.jsx';

export default function StickyCtaBar({ label, href, onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 600);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`sticky-cta-bar ${isVisible ? 'is-visible' : ''}`}>
      <div className="container sticky-cta-inner">
        <span className="sticky-cta-text">MedVoiceAI</span>
        <AppLink href={href} className="btn sticky-cta-btn" onNavigate={onNavigate}>
          {label}
        </AppLink>
      </div>
    </div>
  );
}
