import { pricing } from '@/config/pricing';
import { CHAT_I18N, type SupportedLanguage } from '@/lib/i18n/chat';

type LanguageMap = Record<SupportedLanguage, string>;
type LanguageArrayMap = Record<SupportedLanguage, string[]>;

const priceValues = {
  websiteLaunch: pricing.products.website.launch.priceDisplay,
  websiteProfessional: pricing.products.website.professional.priceDisplay,
  websiteAdvanced: pricing.products.website.advanced.priceDisplay,
  chatbotEssentialSetup: pricing.products.chatbot.essential.priceDisplay,
  chatbotEssentialMonthly: pricing.products.chatbot.essential.monthlyService.priceDisplay,
  chatbotProSetup: pricing.products.chatbot.pro.priceDisplay,
  chatbotProMonthly: pricing.products.chatbot.pro.monthlyService.priceDisplay,
};

const fallbackTemplates: Record<
  | 'websitePricing'
  | 'chatbotPricing'
  | 'generalPricing'
  | 'howItWorks'
  | 'features'
  | 'roi'
  | 'businessTypes'
  | 'booking'
  | 'integration'
  | 'support'
  | 'setup',
  LanguageMap
> = {
  websitePricing: {
    en: `Website Development pricing:

• Launch: {{websiteLaunch}} (1–3 pages, template)
• Professional: {{websiteProfessional}} (4–6 pages, light customization)
• Advanced: {{websiteAdvanced}} (7–12 pages or special features)

Would you like to book a discovery call to discuss which option fits your needs?`,
    es: `Precios de desarrollo web:

• Launch: {{websiteLaunch}} (1–3 páginas, plantilla)
• Professional: {{websiteProfessional}} (4–6 páginas, personalización ligera)
• Advanced: {{websiteAdvanced}} (7–12 páginas o funciones especiales)

¿Quieres programar una llamada de descubrimiento para elegir la mejor opción?`,
    fr: `Tarification du développement web :

• Launch : {{websiteLaunch}} (1 à 3 pages, modèle)
• Professional : {{websiteProfessional}} (4 à 6 pages, personnalisation légère)
• Advanced : {{websiteAdvanced}} (7 à 12 pages ou fonctionnalités spéciales)

Souhaitez-vous réserver un appel découverte pour choisir l’option la plus adaptée ?`,
    de: `Website-Entwicklungspreise:

• Launch: {{websiteLaunch}} (1–3 Seiten, Template)
• Professional: {{websiteProfessional}} (4–6 Seiten, leichte Anpassung)
• Advanced: {{websiteAdvanced}} (7–12 Seiten oder spezielle Funktionen)

Möchten Sie einen Discovery-Call buchen, um die beste Option zu besprechen?`,
    pt: `Preços de desenvolvimento de sites:

• Launch: {{websiteLaunch}} (1–3 páginas, modelo)
• Professional: {{websiteProfessional}} (4–6 páginas, customização leve)
• Advanced: {{websiteAdvanced}} (7–12 páginas ou recursos especiais)

Gostaria de agendar uma chamada de descoberta para escolher a melhor opção?`,
    it: `Prezzi per lo sviluppo del sito:

• Launch: {{websiteLaunch}} (1–3 pagine, template)
• Professional: {{websiteProfessional}} (4–6 pagine, personalizzazione leggera)
• Advanced: {{websiteAdvanced}} (7–12 pagine o funzionalità speciali)

Vuoi prenotare una discovery call per scegliere l’opzione migliore per te?`,
  },
  chatbotPricing: {
    en: `LeadFlow Chatbot pricing:

• Essential: {{chatbotEssentialSetup}} setup + {{chatbotEssentialMonthly}}/mo
• Pro: {{chatbotProSetup}} setup + {{chatbotProMonthly}}/mo

Most clients see ROI within 30 days! Would you like to book a discovery call?`,
    es: `Precios del chatbot LeadFlow:

• Essential: {{chatbotEssentialSetup}} de configuración + {{chatbotEssentialMonthly}}/mes
• Pro: {{chatbotProSetup}} de configuración + {{chatbotProMonthly}}/mes

La mayoría de los clientes ven ROI en 30 días. ¿Quieres agendar una llamada de descubrimiento?`,
    fr: `Tarifs du chatbot LeadFlow :

• Essential : configuration à {{chatbotEssentialSetup}} + {{chatbotEssentialMonthly}}/mois
• Pro : configuration à {{chatbotProSetup}} + {{chatbotProMonthly}}/mois

La plupart des clients voient un ROI en 30 jours ! Souhaitez-vous réserver un appel découverte ?`,
    de: `LeadFlow-Chatbot-Preise:

• Essential: {{chatbotEssentialSetup}} Einrichtung + {{chatbotEssentialMonthly}}/Monat
• Pro: {{chatbotProSetup}} Einrichtung + {{chatbotProMonthly}}/Monat

Die meisten Kunden sehen innerhalb von 30 Tagen einen ROI! Möchten Sie einen Discovery-Call buchen?`,
    pt: `Preços do chatbot LeadFlow:

• Essential: {{chatbotEssentialSetup}} de configuração + {{chatbotEssentialMonthly}}/mês
• Pro: {{chatbotProSetup}} de configuração + {{chatbotProMonthly}}/mês

A maioria dos clientes vê ROI em 30 dias! Quer agendar uma chamada de descoberta?`,
    it: `Prezzi del chatbot LeadFlow:

• Essential: configurazione {{chatbotEssentialSetup}} + {{chatbotEssentialMonthly}}/mese
• Pro: configurazione {{chatbotProSetup}} + {{chatbotProMonthly}}/mese

La maggior parte dei clienti vede ROI entro 30 giorni! Vuoi prenotare una discovery call?`,
  },
  generalPricing: {
    en: `Intelllx offers two services:

LeadFlow Chatbot:
• Essential: {{chatbotEssentialSetup}} setup + {{chatbotEssentialMonthly}}/mo
• Pro: {{chatbotProSetup}} setup + {{chatbotProMonthly}}/mo

Website Development:
• Launch: {{websiteLaunch}}
• Professional: {{websiteProfessional}}
• Advanced: {{websiteAdvanced}}

Most chatbot clients see ROI within 30 days! Would you like to book a discovery call to discuss which option fits your needs?`,
    es: `Intelllx ofrece dos servicios:

Chatbot LeadFlow:
• Essential: {{chatbotEssentialSetup}} de configuración + {{chatbotEssentialMonthly}}/mes
• Pro: {{chatbotProSetup}} de configuración + {{chatbotProMonthly}}/mes

Desarrollo web:
• Launch: {{websiteLaunch}}
• Professional: {{websiteProfessional}}
• Advanced: {{websiteAdvanced}}

La mayoría de los clientes ven ROI en 30 días. ¿Quieres reservar una llamada de descubrimiento para elegir la mejor opción?`,
    fr: `Intelllx propose deux services :

Chatbot LeadFlow :
• Essential : configuration à {{chatbotEssentialSetup}} + {{chatbotEssentialMonthly}}/mois
• Pro : configuration à {{chatbotProSetup}} + {{chatbotProMonthly}}/mois

Développement de site web :
• Launch : {{websiteLaunch}}
• Professional : {{websiteProfessional}}
• Advanced : {{websiteAdvanced}}

La plupart des clients obtiennent un ROI en 30 jours. Souhaitez-vous réserver un appel découverte pour choisir la meilleure option ?`,
    de: `Intelllx bietet zwei Services:

LeadFlow Chatbot:
• Essential: {{chatbotEssentialSetup}} Einrichtung + {{chatbotEssentialMonthly}}/Monat
• Pro: {{chatbotProSetup}} Einrichtung + {{chatbotProMonthly}}/Monat

Website-Entwicklung:
• Launch: {{websiteLaunch}}
• Professional: {{websiteProfessional}}
• Advanced: {{websiteAdvanced}}

Die meisten Chatbot-Kunden sehen innerhalb von 30 Tagen einen ROI! Möchten Sie einen Discovery-Call buchen, um die passende Option zu besprechen?`,
    pt: `A Intelllx oferece dois serviços:

Chatbot LeadFlow:
• Essential: {{chatbotEssentialSetup}} de configuração + {{chatbotEssentialMonthly}}/mês
• Pro: {{chatbotProSetup}} de configuração + {{chatbotProMonthly}}/mês

Desenvolvimento de sites:
• Launch: {{websiteLaunch}}
• Professional: {{websiteProfessional}}
• Advanced: {{websiteAdvanced}}

A maioria dos clientes de chatbot vê ROI em 30 dias! Quer marcar uma chamada de descoberta para escolher a melhor opção?`,
    it: `Intelllx offre due servizi:

Chatbot LeadFlow:
• Essential: configurazione {{chatbotEssentialSetup}} + {{chatbotEssentialMonthly}}/mese
• Pro: configurazione {{chatbotProSetup}} + {{chatbotProMonthly}}/mese

Sviluppo web:
• Launch: {{websiteLaunch}}
• Professional: {{websiteProfessional}}
• Advanced: {{websiteAdvanced}}

La maggior parte dei clienti del chatbot vede ROI in 30 giorni! Vuoi prenotare una discovery call per capire quale opzione fa per te?`,
  },
  howItWorks: {
    en: 'LeadFlow works 24/7 to capture leads and book appointments. It qualifies prospects, answers questions, collects contact info, and integrates with your CRM and calendar. We handle all the setup and optimization!',
    es: 'LeadFlow funciona 24/7 para captar leads y agendar citas. Califica prospectos, responde preguntas, reúne datos de contacto y se integra con tu CRM y calendario. Nosotros configuramos y optimizamos todo.',
    fr: 'LeadFlow fonctionne 24h/24 pour capter des leads et réserver des rendez-vous. Il qualifie les prospects, répond aux questions, collecte les informations et s’intègre à votre CRM et calendrier. Nous gérons toute la configuration et l’optimisation.',
    de: 'LeadFlow arbeitet rund um die Uhr, um Leads zu gewinnen und Termine zu buchen. Es qualifiziert Interessenten, beantwortet Fragen, sammelt Kontaktdaten und integriert sich in Ihr CRM und Ihren Kalender. Wir übernehmen die gesamte Einrichtung und Optimierung.',
    pt: 'O LeadFlow trabalha 24/7 captando leads e agendando reuniões. Ele qualifica prospects, responde perguntas, coleta dados e integra tudo ao seu CRM e calendário. Cuidamos de toda a configuração e otimização.',
    it: 'LeadFlow lavora 24/7 per acquisire lead e prenotare appuntamenti. Qualifica i prospect, risponde alle domande, raccoglie i contatti e si integra con il tuo CRM e calendario. Pensiamo noi a tutta la configurazione e ottimizzazione.',
  },
  features: {
    en: 'Key features: 24/7 availability, automatic lead qualification, appointment booking, CRM integrations, calendar sync, advanced analytics, multi-language support, and weekly optimization reports.',
    es: 'Funciones clave: disponibilidad 24/7, calificación automática de leads, agendamiento de citas, integraciones CRM, sincronización de calendarios, analíticas avanzadas, soporte multi-idioma y reportes semanales.',
    fr: 'Fonctionnalités clés : disponibilité 24/7, qualification automatique des leads, prise de rendez-vous, intégrations CRM, synchronisation des calendriers, analyses avancées, support multilingue et rapports hebdomadaires.',
    de: 'Hauptfunktionen: 24/7-Verfügbarkeit, automatische Lead-Qualifizierung, Terminbuchung, CRM-Integrationen, Kalendersynchronisation, erweiterte Analysen, Mehrsprachigkeit und wöchentliche Optimierungsberichte.',
    pt: 'Recursos principais: disponibilidade 24/7, qualificação automática de leads, agendamento de reuniões, integrações com CRM, sincronização de calendário, análises avançadas, suporte multilíngue e relatórios semanais.',
    it: 'Funzionalità principali: disponibilità 24/7, qualificazione automatica dei lead, prenotazione appuntamenti, integrazioni CRM, sincronizzazione calendario, analisi avanzate, supporto multilingue e report ottimizzati settimanali.',
  },
  roi: {
    en: `Our goal is to help you see ROI within 30 days. Typical results: 3-5x more qualified leads, 25-40% increase in conversions, 40-60% reduction in missed opportunities. The {{chatbotProMonthly}}/month pays for itself with just 1-2 additional customers!`,
    es: `Nuestro objetivo es que veas ROI en 30 días. Resultados típicos: 3-5x más leads calificados, 25-40% más conversiones y 40-60% menos oportunidades perdidas. El plan de {{chatbotProMonthly}}/mes se paga solo con 1-2 clientes adicionales.`,
    fr: `Notre objectif est que vous obteniez un ROI sous 30 jours. Résultats typiques : 3 à 5 fois plus de leads qualifiés, 25-40 % d’augmentation des conversions et 40-60 % de réduction des opportunités manquées. L’abonnement à {{chatbotProMonthly}}/mois est rentabilisé avec 1 à 2 clients supplémentaires.`,
    de: `Unser Ziel ist ein ROI innerhalb von 30 Tagen. Typische Ergebnisse: 3–5x mehr qualifizierte Leads, 25–40 % mehr Conversions und 40–60 % weniger verpasste Chancen. Der Tarif von {{chatbotProMonthly}}/Monat amortisiert sich mit nur 1–2 zusätzlichen Kunden.`,
    pt: `Nosso objetivo é gerar ROI em até 30 dias. Resultados típicos: 3-5x mais leads qualificados, 25-40% mais conversões e 40-60% menos oportunidades perdidas. O plano de {{chatbotProMonthly}}/mês se paga com apenas 1-2 clientes extras.`,
    it: `Il nostro obiettivo è ottenere ROI entro 30 giorni. Risultati tipici: 3-5 volte più lead qualificati, +25-40% conversioni e -40-60% opportunità perse. Il piano da {{chatbotProMonthly}}/mese si ripaga con appena 1-2 clienti in più.`,
  },
  businessTypes: {
    en: 'LeadFlow works for ANY business: e-commerce, SaaS, real estate, healthcare, legal, fitness, restaurants, and more. Each chatbot is customized to your specific industry and business needs.',
    es: 'LeadFlow funciona para cualquier tipo de negocio: e-commerce, SaaS, bienes raíces, salud, legal, fitness, restaurantes y más. Cada chatbot se personaliza para tu industria y necesidades.',
    fr: 'LeadFlow fonctionne pour tous les secteurs : e-commerce, SaaS, immobilier, santé, juridique, fitness, restauration, etc. Chaque chatbot est personnalisé selon votre industrie et vos besoins.',
    de: 'LeadFlow funktioniert für jedes Unternehmen: E-Commerce, SaaS, Immobilien, Gesundheitswesen, Recht, Fitness, Gastronomie und mehr. Jeder Chatbot wird auf Ihre Branche und Bedürfnisse zugeschnitten.',
    pt: 'O LeadFlow funciona para qualquer negócio: e-commerce, SaaS, imobiliário, saúde, jurídico, fitness, restaurantes e muito mais. Cada chatbot é personalizado para o seu segmento.',
    it: 'LeadFlow funziona per qualsiasi business: e-commerce, SaaS, immobiliare, sanitario, legale, fitness, ristorazione e altro. Ogni chatbot è personalizzato sulla tua industria e sulle tue esigenze.',
  },
  booking: {
    en: 'Great! Click the "Book a discovery call" button below to schedule a time. We\'ll discuss your needs and create a custom plan. Looking forward to speaking with you!',
    es: '¡Perfecto! Haz clic en “Reservar una llamada de descubrimiento” para elegir horario. Hablaremos de tus objetivos y crearemos un plan a medida. ¡Será un gusto conversar contigo!',
    fr: 'Super ! Cliquez sur « Réserver un appel découverte » pour choisir un créneau. Nous discuterons de vos besoins et bâtirons un plan sur mesure. Au plaisir d’échanger avec vous !',
    de: 'Perfekt! Klicken Sie auf „Discovery-Call buchen“, um einen Termin auszuwählen. Wir besprechen Ihre Ziele und erstellen einen maßgeschneiderten Plan. Ich freue mich auf das Gespräch!',
    pt: 'Perfeito! Clique em “Agendar uma chamada de descoberta” para escolher um horário. Vamos entender suas necessidades e montar um plano sob medida. Será um prazer falar com você!',
    it: 'Ottimo! Clicca su “Prenota una discovery call” per scegliere l’orario. Parleremo dei tuoi obiettivi e creeremo un piano su misura. Non vedo l’ora di sentirti!',
  },
  integration: {
    en: 'LeadFlow integrates with: Calendly, Google Calendar, Outlook, HubSpot, Salesforce, Pipedrive, Mailchimp, Zapier, and most CRM systems. We handle all technical setup for you!',
    es: 'LeadFlow se integra con: Calendly, Google Calendar, Outlook, HubSpot, Salesforce, Pipedrive, Mailchimp, Zapier y la mayoría de los CRMs. Nosotros configuramos todo por ti.',
    fr: 'LeadFlow s’intègre à : Calendly, Google Calendar, Outlook, HubSpot, Salesforce, Pipedrive, Mailchimp, Zapier et la plupart des CRM. Nous nous occupons de toute la configuration technique.',
    de: 'LeadFlow integriert sich mit: Calendly, Google Calendar, Outlook, HubSpot, Salesforce, Pipedrive, Mailchimp, Zapier und den meisten CRM-Systemen. Wir übernehmen die gesamte technische Einrichtung.',
    pt: 'O LeadFlow integra com: Calendly, Google Calendar, Outlook, HubSpot, Salesforce, Pipedrive, Mailchimp, Zapier e a maioria dos CRMs. Nós cuidamos de toda a configuração técnica.',
    it: 'LeadFlow si integra con: Calendly, Google Calendar, Outlook, HubSpot, Salesforce, Pipedrive, Mailchimp, Zapier e la maggior parte dei CRM. Gestiamo noi tutta la configurazione tecnica.',
  },
  support: {
    en: 'We provide excellent support! You get 7 hours of expert support per month, plus we handle all maintenance, optimization, and updates. Available via email, phone, or video call.',
    es: '¡Ofrecemos un soporte excelente! Incluye 7 horas de asistencia experta al mes y nos encargamos de todo el mantenimiento, optimización y actualizaciones. Disponible por email, teléfono o videollamada.',
    fr: 'Nous offrons un excellent support ! Vous bénéficiez de 7 heures d’accompagnement expert par mois et nous gérons toute la maintenance, l’optimisation et les mises à jour. Disponibles par e-mail, téléphone ou visioconférence.',
    de: 'Wir bieten hervorragenden Support! Sie erhalten 7 Stunden Experten-Support pro Monat, und wir übernehmen Wartung, Optimierung und Updates. Erreichbar per E-Mail, Telefon oder Videocall.',
    pt: 'Oferecemos suporte premium! Você tem 7 horas de atendimento especializado por mês, além de toda a manutenção, otimização e atualizações por nossa conta. Disponível por e-mail, telefone ou videochamada.',
    it: 'Offriamo un supporto eccellente! Hai 7 ore di assistenza esperta al mese e ci occupiamo noi di manutenzione, ottimizzazione e aggiornamenti. Disponibili via email, telefono o videochiamata.',
  },
  setup: {
    en: 'Setup takes 1-2 weeks: discovery, conversation design, CRM/calendar integration, launch, and optimization. We handle every step for you!',
    es: 'La implementación tarda 1-2 semanas: descubrimiento, diseño de conversaciones, integración con CRM/calendario, lanzamiento y optimización. Nosotros gestionamos cada paso.',
    fr: 'La mise en place prend 1 à 2 semaines : découverte, conception des conversations, intégration CRM/calendrier, lancement et optimisation. Nous gérons chaque étape pour vous.',
    de: 'Die Einrichtung dauert 1–2 Wochen: Discovery, Konversationsdesign, CRM-/Kalender-Integration, Launch und Optimierung. Wir übernehmen jeden Schritt für Sie!',
    pt: 'A configuração leva de 1 a 2 semanas: descoberta, design das conversas, integração com CRM/calendário, lançamento e otimização. Cuidamos de todas as etapas.',
    it: 'L’implementazione richiede 1-2 settimane: discovery, design delle conversazioni, integrazione CRM/calendario, lancio e ottimizzazione. Ci occupiamo noi di ogni fase.',
  },
};

const defaultResponses: LanguageArrayMap = {
  en: [
    `I'm here to help with Intelllx! You can ask me about chatbot pricing (Essential → {{chatbotEssentialSetup}} or Pro → {{chatbotProSetup}}), website pricing (Launch → {{websiteLaunch}}, Professional → {{websiteProfessional}}, Advanced → {{websiteAdvanced}}), features, how it works, ROI, or click below to book a discovery call!`,
    'Great question! Intelllx offers LeadFlow Chatbots and Website Development. Ask me about pricing, features, integrations, or book a call to learn more!',
    'Excited to help! Intelllx provides custom AI chatbots and websites that convert visitors into customers. Ask about pricing, how it works, or book a discovery call below!',
  ],
  es: [
    `Estoy aquí para ayudarte con Intelllx. Pregunta sobre precios del chatbot (Essential → {{chatbotEssentialSetup}} o Pro → {{chatbotProSetup}}), precios del sitio web (Launch → {{websiteLaunch}}, Professional → {{websiteProfessional}}, Advanced → {{websiteAdvanced}}), funciones o ROI. También puedes reservar una llamada de descubrimiento.`,
    '¡Gran pregunta! Intelllx ofrece chatbots LeadFlow y desarrollo web que convierten visitas en clientes. Pregunta por precios, funciones o integraciones, o agenda una llamada.',
    'Encantado de ayudarte. Intelllx crea experiencias de IA personalizadas para captar leads y cerrar clientes. Pregunta cómo funciona, precios o reserva una llamada de descubrimiento.',
  ],
  fr: [
    `Je suis là pour vous aider avec Intelllx ! Demandez-moi les tarifs du chatbot (Essential → {{chatbotEssentialSetup}}, Pro → {{chatbotProSetup}}), les prix du site web (Launch → {{websiteLaunch}}, Professional → {{websiteProfessional}}, Advanced → {{websiteAdvanced}}), les fonctionnalités ou le ROI. Vous pouvez aussi réserver un appel découverte.`,
    'Excellente question ! Intelllx propose des chatbots LeadFlow et du développement web pour convertir vos visiteurs. Parlez-moi tarifs, fonctionnalités, intégrations ou réservez un appel.',
    'Ravi de vous aider ! Intelllx crée des expériences IA personnalisées qui transforment les prospects en clients. Demandez le fonctionnement, les tarifs ou réservez un appel découverte.',
  ],
  de: [
    `Ich helfe Ihnen gern mit Intelllx! Fragen Sie nach Chatbot-Preisen (Essential → {{chatbotEssentialSetup}}, Pro → {{chatbotProSetup}}), Website-Preisen (Launch → {{websiteLaunch}}, Professional → {{websiteProfessional}}, Advanced → {{websiteAdvanced}}), Funktionen oder ROI. Sie können auch direkt einen Discovery-Call buchen.`,
    'Tolle Frage! Intelllx bietet LeadFlow-Chatbots und Webentwicklung, um Besucher zu Kunden zu machen. Fragen Sie nach Preisen, Funktionen, Integrationen oder buchen Sie einen Call.',
    'Ich freue mich zu helfen! Intelllx liefert individuelle KI-Erlebnisse, die Leads gewinnen und Kunden abschließen. Fragen Sie nach Funktionsweise, Preisen oder buchen Sie einen Discovery-Call.',
  ],
  pt: [
    `Estou aqui para ajudar com a Intelllx! Pergunte sobre preços do chatbot (Essential → {{chatbotEssentialSetup}}, Pro → {{chatbotProSetup}}), preços do site (Launch → {{websiteLaunch}}, Professional → {{websiteProfessional}}, Advanced → {{websiteAdvanced}}), recursos ou ROI. Você também pode agendar uma chamada de descoberta.`,
    'Ótima pergunta! A Intelllx oferece chatbots LeadFlow e desenvolvimento de sites que convertem visitantes em clientes. Pergunte sobre preços, recursos ou integrações, ou marque uma chamada.',
    'Feliz em ajudar! A Intelllx cria experiências de IA personalizadas para captar leads e fechar clientes. Pergunte como funciona, veja os preços ou agende uma chamada de descoberta.',
  ],
  it: [
    `Sono qui per aiutarti con Intelllx! Chiedimi i prezzi del chatbot (Essential → {{chatbotEssentialSetup}}, Pro → {{chatbotProSetup}}), i prezzi del sito web (Launch → {{websiteLaunch}}, Professional → {{websiteProfessional}}, Advanced → {{websiteAdvanced}}), le funzionalità o il ROI. Puoi anche prenotare una discovery call.`,
    'Ottima domanda! Intelllx offre chatbot LeadFlow e sviluppo web per trasformare i visitatori in clienti. Chiedi di prezzi, funzionalità, integrazioni o prenota una call.',
    'Felice di aiutarti! Intelllx crea esperienze di IA su misura che generano lead e clienti. Scopri come funziona, i prezzi o prenota una discovery call.',
  ],
};

function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key as keyof typeof values] ?? '');
}

function translate(key: keyof typeof fallbackTemplates, language: SupportedLanguage): string {
  const map = fallbackTemplates[key];
  return map[language] ?? map.en;
}

function getDefaultResponse(language: SupportedLanguage): string {
  const responses = defaultResponses[language] ?? defaultResponses.en;
  const template = responses[Math.floor(Math.random() * responses.length)];
  return fillTemplate(template, priceValues);
}

function includesAny(text: string, terms: string[]): boolean {
  return terms.some(term => text.includes(term));
}

function includesAll(text: string, terms: string[]): boolean {
  return terms.every(term => text.includes(term));
}

export function getLocalizedFallbackResponse(language: SupportedLanguage, input: string): string {
  const lower = input.toLowerCase();

  if (
    includesAny(lower, ['website', 'site', 'web', 'pagina', 'página', 'page']) &&
    includesAny(lower, ['price', 'pricing', 'cost', 'kosten', 'precio', 'precios', 'prix', 'preço', 'prezzi', 'how much'])
  ) {
    const template = translate('websitePricing', language);
    return fillTemplate(template, priceValues);
  }

  if (
    includesAny(lower, ['chatbot', 'chat-bot', 'leadflow', 'bot']) &&
    includesAny(lower, ['price', 'pricing', 'cost', 'kosten', 'precio', 'precios', 'prix', 'preço', 'prezzi', 'how much'])
  ) {
    const template = translate('chatbotPricing', language);
    return fillTemplate(template, priceValues);
  }

  if (
    includesAny(lower, ['price', 'pricing', 'cost', 'kosten', 'precio', 'precios', 'prix', 'preço', 'prezzi', 'how much'])
  ) {
    const template = translate('generalPricing', language);
    return fillTemplate(template, priceValues);
  }

  if (includesAll(lower, ['how', 'work']) || includesAny(lower, ['cómo funciona', 'como funciona', 'comment ça fonctionne', 'funziona', 'funktionsweise'])) {
    return translate('howItWorks', language);
  }

  if (includesAny(lower, ['feature', 'característica', 'fonctionnalité', 'funktion', 'recurso', 'caratteristica', 'capabilities', 'what can'])) {
    return translate('features', language);
  }

  if (includesAny(lower, ['roi', 'retorno', 'rendite', 'return on investment'])) {
    const template = translate('roi', language);
    return fillTemplate(template, priceValues);
  }

  if (includesAny(lower, ['business', 'industry', 'industria', 'branche', 'settore'])) {
    return translate('businessTypes', language);
  }

  if (includesAny(lower, ['book', 'call', 'demo', 'schedule', 'reservar', 'agendar', 'réserver', 'termin', 'prenotare'])) {
    return translate('booking', language);
  }

  if (includesAny(lower, ['integrate', 'integration', 'integración', 'intégration', 'integrationen', 'integração', 'integrazione', 'crm', 'calendar'])) {
    return translate('integration', language);
  }

  if (includesAny(lower, ['support', 'maintenance', 'soporte', 'assistance', 'supporto', 'suporte'])) {
    return translate('support', language);
  }

  if (includesAny(lower, ['setup', 'implement', 'instal', 'implementación', 'déploiement', 'implementazione'])) {
    return translate('setup', language);
  }

  return getDefaultResponse(language);
}

export function getTimeoutMessage(language: SupportedLanguage): string {
  const entry = CHAT_I18N[language] ?? CHAT_I18N.en;
  return entry.timeoutMessage;
}







