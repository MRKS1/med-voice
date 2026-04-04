import { useEffect, useMemo, useState } from 'react';
import { content, routePaths } from './content.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './components/HomePage.jsx';
import AboutPage from './components/AboutPage.jsx';
import ServicesPage from './components/ServicesPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import AppointmentPage from './components/AppointmentPage.jsx';

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
        onNavigate={navigate}
      />
      <main id="main-content">
        {renderPage()}
      </main>
      <Footer
        footer={localeContent.footer}
        footerTagline={localeContent.footerTagline}
        locale={routeState.locale}
        nav={localeContent.nav}
        routes={routes}
        onNavigate={navigate}
      />
    </>
  );
}
