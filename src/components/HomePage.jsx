import { useState, useEffect } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import AppLink from './AppLink.jsx';
import Card from './Card.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';

const CALL_DURATION_SECONDS = 60;

export default function HomePage({ home, nav, routes, siteName, onNavigate }) {
  const benefitsRef = useScrollReveal();
  const stepsRef = useScrollReveal();
  const complianceRef = useScrollReveal();
  const testimonialsRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  const [isCallActive, setIsCallActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(CALL_DURATION_SECONDS);
  const [callObject, setCallObject] = useState(null);
  const [error, setError] = useState('');

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (callObject) {
        try {
          callObject.stopCall();
        } catch (e) {
          console.error('Error stopping call on unmount:', e);
        }
      }
    };
  }, [callObject]);

  // Handle countdown timer and auto-end
  useEffect(() => {
    if (!isCallActive) return;

    if (timeLeft <= 0) {
      handleEndCall();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isCallActive, timeLeft]);

  const handleStartCall = async () => {
    try {
      setError('');
      setTimeLeft(CALL_DURATION_SECONDS);

      // Call your backend endpoint to create a web call
      const apiBaseUrl = import.meta.env.VITE_RETELL_API_BASE_URL;
      if (!apiBaseUrl) {
        throw new Error('VITE_RETELL_API_BASE_URL is not configured');
      }
      const response = await fetch(`${apiBaseUrl}/create-call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to create call');
      }

      const data = await response.json();

      if (!data.access_token || !data.call_id) {
        throw new Error('Invalid response from backend');
      }

      // Initialize Retell Web Client
      const retellClient = new RetellWebClient();

      retellClient.on('call_started', () => {
        setIsCallActive(true);
      });

      retellClient.on('call_ended', () => {
        handleEndCall();
      });

      retellClient.on('error', (error) => {
        console.error('Retell error:', error);
        setError(home.virtualAssistantError);
        setIsCallActive(false);
      });

      // Start the call
      await retellClient.startCall({
        accessToken: data.access_token,
        callId: data.call_id,
      });

      setCallObject(retellClient);
    } catch (err) {
      console.error('Error starting call:', err);
      setError(home.virtualAssistantError);
      setIsCallActive(false);
    }
  };

  const handleEndCall = () => {
    try {
      if (callObject) {
        callObject.stopCall();
      }
    } catch (err) {
      console.error('Error stopping call:', err);
    } finally {
      setIsCallActive(false);
      setTimeLeft(CALL_DURATION_SECONDS);
      setCallObject(null);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
              <div className="virtual-assistant-box hero-call-card">
                <h2 className="page-title">{home.virtualAssistantTitle}</h2>
                <p className="virtual-assistant-description">{home.virtualAssistantDescription}</p>

                {error && (
                  <div className="virtual-assistant-error">
                    {error}
                  </div>
                )}

                <div className="virtual-assistant-controls">
                  {!isCallActive ? (
                    <button
                      onClick={handleStartCall}
                      className="btn virtual-assistant-btn-start"
                    >
                      {home.virtualAssistantButtonStart}
                    </button>
                  ) : (
                    <div className="virtual-assistant-active">
                      <div className="call-status">
                        <span className="call-indicator"></span>
                        <span className="call-status-text">{home.virtualAssistantActive}</span>
                      </div>
                      <div className="call-timer">
                        {formatTime(timeLeft)}
                      </div>
                      <button
                        onClick={handleEndCall}
                        className="btn btn-danger virtual-assistant-btn-end"
                      >
                        {home.virtualAssistantButtonEnd}
                      </button>
                    </div>
                  )}
                </div>
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
    </>
  );
}
