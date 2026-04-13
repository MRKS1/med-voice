import { useEffect, useState } from 'react';
import AppLink from './AppLink.jsx';

export default function StickyCtaBar({ label, href, onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const revealOffset = Math.min(420, Math.max(220, window.innerHeight * 0.45));
      setIsVisible(window.scrollY > revealOffset);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className={`sticky-cta-bar ${isVisible ? 'is-visible' : ''}`}>
      <div className="container sticky-cta-inner">
        <AppLink href={href} className="btn sticky-cta-btn" onNavigate={onNavigate}>
          {label}
        </AppLink>
      </div>
    </div>
  );
}
