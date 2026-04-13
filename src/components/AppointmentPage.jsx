import { useEffect, useState } from 'react';

export default function AppointmentPage({ pageContent, locale, contactContent }) {
  const rawFormspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  const formspreeEndpoint = rawFormspreeEndpoint?.trim().replace(/^['\"]|['\"]$/g, '');
  const isDevelopment = import.meta.env.DEV;
  const hasFormspreeEndpoint = Boolean(
    formspreeEndpoint &&
    !formspreeEndpoint.includes('your-form-id') &&
    !formspreeEndpoint.includes('vas-form-id')
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  useEffect(() => {
    setSubmitted(false);
    setSubmitError('');
  }, [locale]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(false);
    setSubmitError('');

    if (!hasFormspreeEndpoint) {
      setSubmitError(pageContent.missingEndpoint);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          locale,
          source: 'MedVoiceAI demo form'
        })
      });

      if (!response.ok) {
        throw new Error('Formspree request failed');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        message: ''
      });
    } catch (error) {
      setSubmitError(pageContent.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="page-title">{pageContent.title}</h2>
        <p className="section-text centered-text">{pageContent.intro}</p>

        {submitted ? (
          <div className="success-message">{pageContent.success}</div>
        ) : null}

        {submitError ? (
          <div className="error-message">{submitError}</div>
        ) : null}

        {!hasFormspreeEndpoint ? (
          <>
            <div className="error-message">
              {isDevelopment ? pageContent.setupHint : pageContent.missingEndpoint}
            </div>
            {!isDevelopment ? (
              <div className="content-box appointment-fallback">
                <p>
                  <strong>{contactContent.emailLabel}:</strong>{' '}
                  <a href={`mailto:${contactContent.email}`}>{contactContent.email}</a>
                </p>
                <p>
                  <strong>{contactContent.phoneLabel}:</strong>{' '}
                  <a href={`tel:${contactContent.phone.replace(/\s+/g, '')}`}>{contactContent.phone}</a>
                </p>
              </div>
            ) : null}
          </>
        ) : null}

        <div className="split-section appointment-layout">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">{pageContent.labels.name}</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} />

            <label htmlFor="email">{pageContent.labels.email}</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} />

            <label htmlFor="phone">{pageContent.labels.phone}</label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required disabled={isSubmitting} />

            <label htmlFor="date">{pageContent.labels.date}</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required disabled={isSubmitting} />

            <label htmlFor="message">{pageContent.labels.message}</label>
            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} disabled={isSubmitting} />

            <button type="submit" disabled={isSubmitting || !hasFormspreeEndpoint}>
              {isSubmitting ? pageContent.sending : pageContent.submit}
            </button>
          </form>

          <div className="feature-list-box">
            <h3 className="section-subtitle">{contactContent?.boxTitle || pageContent.asideTitle}</h3>
            <ul className="feature-list">
              {(contactContent?.topics || pageContent.asideItems).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
