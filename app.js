const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const content = {
  sk: {
    locale: 'sk',
    siteName: 'MedVoiceAI',
    nav: {
      home: 'Domov',
      about: 'O nás',
      services: 'Služby',
      contact: 'Kontakt',
      appointment: 'Objednanie'
    },
    langSwitch: {
      sk: 'SK',
      en: 'EN'
    },
    footer: '© 2026 MedVoiceAI. Všetky práva vyhradené.',
    home: {
      title: 'MedVoiceAI',
      eyebrow: '',
      heroTitle: 'AI asistent, ktorý Vám pomôže s manažmentom pacienta.',
      heroText: 'MedVoiceAI je inteligentný systém, ktorý znižuje administratívnu vyťaženosť personálu.',
      heroButton: 'Dohodnúť ukážku',
      heroSecondaryButton: 'Pozrieť funkcie',
      trustBadges: ['24/7 dostupnosť', 'GDPR compliant', 'Menej administratívy'],
      benefitsTitle: 'Čo MedVoiceAI zvládne',
      benefits: [
        {
          title: 'Automatické objednávanie',
          text: 'Systém prijme hovor, zistí požiadavku pacienta a zapíše termín bez zásahu recepcie.'
        },
        {
          title: 'Upozornenie, keď je pacient na rade',
          text: 'Pacient dostane jasnú informáciu o poradí alebo upozornenie, že sa jeho termín blíži.'
        },
        {
          title: 'Menej administratívnej záťaže',
          text: 'Sestry a recepcia sa môžu venovať pacientom namiesto neustáleho dvíhania telefónov.'
        },
        {
          title: 'Prehľadná komunikácia',
          text: 'Jednotné odpovede, konzistentné informácie a profesionálny kontakt s pacientmi.'
        }
      ],
      spotlightTitle: 'Navrhnuté pre reálnu prevádzku ambulancií',
      spotlightText: 'MedVoiceAI pomáha zvládnuť špičku počas ordinačných hodín, výpadky recepcie aj opakované telefonáty. Výsledkom je plynulejšia prevádzka a viac času pre zdravotnícky personál.',
      spotlightPoints: [
        'vybavovanie opakujúcich sa otázok pacientov',
        'automatizované objednávanie a presúvanie termínov',
        'informovanie pacienta o poradí a stave čakania'
      ],
      complianceTitle: 'Bezpečnosť a GDPR compliance',
      complianceText: 'Systém je navrhnutý s dôrazom na ochranu osobných údajov a procesy kompatibilné s GDPR, aby ambulancia vedela zavádzať automatizáciu bezpečne a dôveryhodne.',
      complianceCardTitle: 'Compliance-first',
      complianceCardText: 'Spojenie automatizácie, dôvery a ochrany údajov pre citlivé zdravotnícke prostredie.',
      stepsTitle: 'Ako to funguje',
      steps: [
        {
          title: '1. Pacient zavolá',
          text: 'AI recepcia prijme hovor okamžite, aj keď je ambulancia práve vyťažená.'
        },
        {
          title: '2. AI vybaví požiadavku',
          text: 'Objedná termín, poskytne základné informácie alebo zaznamená dôležitý odkaz.'
        },
        {
          title: '3. Pacient dostane upozornenie',
          text: 'Systém vie pacienta informovať, kedy prichádza na rad alebo že sa termín blíži.'
        }
      ],
      ctaTitle: 'Chceš ukázať ambulanciám modernejší spôsob objednávania?',
      ctaText: 'MedVoiceAI prináša rýchlejšiu komunikáciu s pacientmi, menej prerušení pre personál a profesionálnejší chod ambulancie.'
    },
    about: {
      title: 'O MedVoiceAI',
      introTitle: 'AI recepcia navrhnutá pre ambulancie',
      paragraphs: [
        'MedVoiceAI je hlasový AI systém, ktorý pomáha ambulanciám zvládať telefonickú komunikáciu s pacientmi bez zbytočného preťaženia recepcie alebo sestier.',
        'Naším cieľom je znížiť administratívnu vyťaženosť, zrýchliť objednávanie pacientov a priniesť ambulanciám modernejší spôsob organizácie prevádzky.',
        'Systém je navrhnutý tak, aby bol praktický pre každodennú prevádzku a zároveň podporoval bezpečné spracovanie údajov v súlade s GDPR.'
      ],
      highlightsTitle: 'Hlavné prínosy',
      highlights: [
        'automatické prijímanie telefonátov',
        'objednávanie a presúvanie termínov',
        'upozornenie pacienta, kedy je na rade',
        'konzistentná a profesionálna komunikácia'
      ]
    },
    services: {
      title: 'Funkcie systému',
      intro: 'MedVoiceAI je praktický nástroj pre každodenný chod ambulancie, ktorý zlepšuje dostupnosť, komunikáciu aj organizáciu.',
      items: [
        {
          title: 'AI telefonická recepcia',
          text: 'Prijíma hovory automaticky a komunikuje s pacientom prirodzeným spôsobom aj počas špičky.'
        },
        {
          title: 'Objednávanie pacientov',
          text: 'Zaznamenáva požiadavky, navrhuje termíny a pomáha znižovať počet nevybavených telefonátov.'
        },
        {
          title: 'Notifikácia o poradí',
          text: 'Vie pacienta upozorniť, kedy sa jeho termín blíži alebo že je už takmer na rade.'
        },
        {
          title: 'Odľahčenie personálu',
          text: 'Sestry a administratíva sa môžu viac venovať pacientom a menej opakovaným hovorom.'
        },
        {
          title: 'GDPR-oriented procesy',
          text: 'Systém je navrhnutý s dôrazom na ochranu osobných údajov a bezpečné fungovanie v zdravotníckom prostredí.'
        },
        {
          title: 'Škálovateľnosť pre viac ambulancií',
          text: 'Riešenie sa dá prispôsobiť menším ambulanciám aj väčším zdravotníckym prevádzkam.'
        }
      ],
      outroTitle: 'Výsledok pre ambulanciu',
      outroText: 'Menej zmeškaných hovorov, menej ručnej administratívy a profesionálnejší pacientsky zážitok od prvého kontaktu.'
    },
    contact: {
      title: 'Kontakt a ukážka riešenia',
      intro: 'Ak chceš zistiť, ako by MedVoiceAI fungoval v konkrétnej ambulancii, ozvi sa nám. Radi pripravíme krátku ukážku použitia aj základný návrh nasadenia.',
      addressLabel: 'Sídlo',
      address: 'Bratislava, Slovensko',
      phoneLabel: 'Telefonický kontakt',
      phone: '+421 900 123 456',
      emailLabel: 'Email',
      email: 'hello@medvoiceai.sk',
      hoursLabel: 'Dostupnosť',
      hours: 'Po - Pia: 9:00 - 17:00',
      boxTitle: 'Čo vieme prejsť na úvodnom hovore',
      topics: [
        'ako automatizovať telefonické objednávanie pacientov',
        'ako znížiť administratívnu vyťaženosť ambulancie',
        'ako informovať pacienta o poradí a stave čakania',
        'aké sú možnosti nasadenia a GDPR compliance'
      ]
    },
    appointment: {
      title: 'Požiadať o ukážku',
      success: 'Vaša žiadosť o ukážku bola úspešne odoslaná.',
      formAction: '/appointment',
      labels: {
        name: 'Meno a priezvisko',
        email: 'Email',
        phone: 'Telefón',
        date: 'Preferovaný termín hovoru',
        message: 'Poznámka o ambulancii alebo požiadavke'
      },
      submit: 'Odoslať žiadosť',
      intro: 'Vyplň krátky formulár a ozveme sa ti s ukážkou, ako môže MedVoiceAI fungovať v tvojej ambulancii.',
      asideTitle: 'Ukážka môže obsahovať',
      asideItems: [
        'scenár prijatia telefonátu pacientom',
        'ukážku objednávania a presunu termínu',
        'notifikáciu pacienta o poradí',
        'prehľad možností nasadenia'
      ]
    }
  },
  en: {
    locale: 'en',
    siteName: 'MedVoiceAI',
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      contact: 'Contact',
      appointment: 'Book Appointment'
    },
    langSwitch: {
      sk: 'SK',
      en: 'EN'
    },
    footer: '© 2026 MedVoiceAI. All rights reserved.',
    home: {
      title: 'MedVoiceAI',
      eyebrow: 'AI receptionist for clinics',
      heroTitle: 'An AI assistant that helps you manage the patient journey.',
      heroText: 'MedVoiceAI is an intelligent system that reduces the administrative workload of staff.',
      heroButton: 'Book a Demo',
      heroSecondaryButton: 'Explore Features',
      trustBadges: ['24/7 availability', 'GDPR compliant', 'Less admin work'],
      benefitsTitle: 'What MedVoiceAI Handles',
      benefits: [
        {
          title: 'Automatic appointment booking',
          text: 'The system answers calls, understands the patient request, and books appointments without manual reception work.'
        },
        {
          title: 'Queue and turn notifications',
          text: 'Patients receive clear updates about their place in line or when their appointment is approaching.'
        },
        {
          title: 'Reduced administrative burden',
          text: 'Nurses and front-desk staff can focus on care instead of constantly answering phones.'
        },
        {
          title: 'Consistent patient communication',
          text: 'Reliable responses, professional communication, and a smoother experience for every caller.'
        }
      ],
      spotlightTitle: 'Built for real outpatient operations',
      spotlightText: 'MedVoiceAI helps clinics manage peak call times, front-desk overload, and repetitive patient requests. The result is smoother operations and more time for medical staff.',
      spotlightPoints: [
        'handling repetitive patient questions',
        'automated booking and rescheduling',
        'informing patients about queue status and wait flow'
      ],
      complianceTitle: 'Security and GDPR compliance',
      complianceText: 'The system is designed with personal data protection in mind and supports GDPR-compliant processes, helping clinics adopt automation safely and responsibly.',
      complianceCardTitle: 'Compliance-first',
      complianceCardText: 'A combination of automation, trust, and data protection for sensitive healthcare environments.',
      stepsTitle: 'How it works',
      steps: [
        {
          title: '1. A patient calls',
          text: 'The AI receptionist answers instantly, even when the clinic staff is busy.'
        },
        {
          title: '2. The AI handles the request',
          text: 'It books an appointment, provides key information, or records an important message.'
        },
        {
          title: '3. The patient gets notified',
          text: 'The system can let the patient know when their turn is coming or when the appointment is near.'
        }
      ],
      ctaTitle: 'Ready to present a smarter front desk for clinics?',
      ctaText: 'MedVoiceAI brings faster patient communication, fewer interruptions for staff, and a more modern clinic workflow.'
    },
    about: {
      title: 'About MedVoiceAI',
      introTitle: 'An AI receptionist built for clinics',
      paragraphs: [
        'MedVoiceAI is a voice-based AI system that helps clinics manage patient phone communication without overloading front-desk staff or nurses.',
        'Our goal is to reduce administrative pressure, speed up appointment scheduling, and give clinics a more modern way to handle daily operations.',
        'The system is designed for real outpatient workflows while supporting safe data handling and GDPR-compliant processes.'
      ],
      highlightsTitle: 'Key benefits',
      highlights: [
        'automatic call handling',
        'booking and rescheduling appointments',
        'notifying patients when their turn is coming',
        'consistent and professional communication'
      ]
    },
    services: {
      title: 'System Features',
      intro: 'MedVoiceAI is a practical workflow tool for clinics that improves availability, communication, and day-to-day operations.',
      items: [
        {
          title: 'AI phone receptionist',
          text: 'Answers calls automatically and communicates with patients naturally, even during busy periods.'
        },
        {
          title: 'Patient scheduling',
          text: 'Captures requests, suggests appointment times, and helps reduce missed calls.'
        },
        {
          title: 'Queue notifications',
          text: 'Can notify patients when their turn is approaching or when they are nearly next.'
        },
        {
          title: 'Staff relief',
          text: 'Allows nurses and administrative staff to focus more on care and less on repetitive calls.'
        },
        {
          title: 'GDPR-oriented processes',
          text: 'Designed with personal data protection and safe healthcare operations in mind.'
        },
        {
          title: 'Scalable for multiple clinics',
          text: 'The solution can be adapted for smaller practices and larger healthcare operations.'
        }
      ],
      outroTitle: 'What clinics gain',
      outroText: 'Fewer missed calls, less manual administration, and a more professional patient experience from the very first interaction.'
    },
    contact: {
      title: 'Contact and Demo',
      intro: 'If you want to see how MedVoiceAI could work in a specific clinic, get in touch. We can prepare a short demo and an initial implementation overview.',
      addressLabel: 'Location',
      address: 'Bratislava, Slovakia',
      phoneLabel: 'Phone',
      phone: '+421 900 123 456',
      emailLabel: 'Email',
      email: 'hello@medvoiceai.sk',
      hoursLabel: 'Availability',
      hours: 'Mon - Fri: 9:00 AM - 5:00 PM',
      boxTitle: 'What we can cover on an intro call',
      topics: [
        'how to automate patient phone booking',
        'how to reduce administrative overload in a clinic',
        'how to notify patients about queue status',
        'deployment options and GDPR compliance'
      ]
    },
    appointment: {
      title: 'Request a Demo',
      success: 'Your demo request has been sent successfully.',
      formAction: '/en/appointment',
      labels: {
        name: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        date: 'Preferred Call Date',
        message: 'Note about your clinic or request'
      },
      submit: 'Send Request',
      intro: 'Fill in the short form and we will get back to you with a demo of how MedVoiceAI could work for your clinic.',
      asideTitle: 'A demo can include',
      asideItems: [
        'a sample incoming patient call flow',
        'booking and rescheduling examples',
        'patient turn notification flow',
        'an overview of deployment options'
      ]
    }
  }
};

function buildViewModel(locale, page, extras = {}) {
  const localeContent = content[locale] || content.sk;
  const isEnglish = locale === 'en';
  const prefix = isEnglish ? '/en' : '';

  const routes = {
    home: `${prefix}/` || '/',
    about: `${prefix}/about`,
    services: `${prefix}/services`,
    contact: `${prefix}/contact`,
    appointment: `${prefix}/appointment`
  };

  return {
    locale,
    isEnglish,
    siteName: localeContent.siteName,
    page,
    title: localeContent[page]?.title || localeContent.siteName,
    nav: localeContent.nav,
    footer: localeContent.footer,
    routes,
    switcher: {
      sk: page === 'home' ? '/' : `/${page}`,
      en: page === 'home' ? '/en' : `/en/${page}`
    },
    langSwitch: localeContent.langSwitch,
    content: localeContent[page],
    ...extras
  };
}

function renderPage(page, locale = 'sk', extras = {}) {
  return (req, res) => {
    const template = page === 'home' ? 'index' : page;
    res.render(template, buildViewModel(locale, page, extras));
  };
}

app.get('/', renderPage('home', 'sk'));
app.get('/about', renderPage('about', 'sk'));
app.get('/services', renderPage('services', 'sk'));
app.get('/contact', renderPage('contact', 'sk'));
app.get('/appointment', renderPage('appointment', 'sk', { message: null }));

app.get('/en', renderPage('home', 'en'));
app.get('/en/about', renderPage('about', 'en'));
app.get('/en/services', renderPage('services', 'en'));
app.get('/en/contact', renderPage('contact', 'en'));
app.get('/en/appointment', renderPage('appointment', 'en', { message: null }));

function handleAppointment(locale) {
  return (req, res) => {
    const { name, email, phone, date, message: formMessage } = req.body;

    console.log(`Nová objednávka (${locale}):`);
    console.log({
      name,
      email,
      phone,
      date,
      message: formMessage
    });

    res.render('appointment', buildViewModel(locale, 'appointment', {
      message: content[locale].appointment.success
    }));
  };
}

app.post('/appointment', handleAppointment('sk'));
app.post('/en/appointment', handleAppointment('en'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server beží na adrese http://localhost:${PORT}`);
});
