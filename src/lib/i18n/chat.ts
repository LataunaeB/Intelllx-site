/**
 * Chat Widget Internationalization
 * 
 * Lightweight i18n for chat widget UI strings.
 * Supported languages: en, es, fr, de, pt, it
 */

export type QuickReply = {
  label: string;
  message: string;
};

export const CHAT_I18N = {
  en: {
    title: 'Intelllx Chat',
    welcome: 'Hi! How can we help today?',
    inputPlaceholder: 'Type your message…',
    bookCall: 'Book a discovery call',
    send: 'Send',
    close: 'Close',
    minimize: 'Minimize',
    maximize: 'Maximize',
    language: 'Language',
    awayMessage: 'Thanks for reaching out! We\'re currently away. Our business hours are Monday-Friday, 9 AM - 6 PM PT. Please leave your message and we\'ll get back to you!',
    downloadTranscript: 'Download transcript',
    timeoutMessage: 'Request timed out. Would you like to book a quick discovery call to get immediate help?',
    quickReplies: [
      { label: '💰 Pricing', message: 'Can you walk me through your pricing options?' },
      { label: '📈 ROI', message: 'How fast can I expect ROI from Intelllx?' },
      { label: '🛠️ How it works', message: 'How does the Intelllx chatbot work from start to finish?' },
      { label: '🤝 Integrations', message: 'Which integrations and calendars do you support?' }
    ],
  },
  es: {
    title: 'Chat Intelllx',
    welcome: '¡Hola! ¿Cómo podemos ayudar hoy?',
    inputPlaceholder: 'Escribe tu mensaje…',
    bookCall: 'Reservar una llamada',
    send: 'Enviar',
    close: 'Cerrar',
    minimize: 'Minimizar',
    maximize: 'Maximizar',
    language: 'Idioma',
    awayMessage: '¡Gracias por comunicarte! Actualmente no estamos disponibles. Nuestro horario es lunes a viernes, 9 AM - 6 PM PT. ¡Déjanos tu mensaje y te responderemos!',
    downloadTranscript: 'Descargar transcripción',
    timeoutMessage: 'La solicitud tardó demasiado. ¿Quieres programar una llamada de descubrimiento para obtener ayuda inmediata?',
    quickReplies: [
      { label: '💰 Precios', message: '¿Puedes explicarme las opciones de precios?' },
      { label: '📈 ROI', message: '¿Qué tan rápido puedo obtener ROI con Intelllx?' },
      { label: '🛠️ Cómo funciona', message: '¿Cómo funciona el chatbot de Intelllx de principio a fin?' },
      { label: '🤝 Integraciones', message: '¿Qué integraciones y calendarios son compatibles?' }
    ],
  },
  fr: {
    title: 'Chat Intelllx',
    welcome: 'Bonjour! Comment pouvons-nous vous aider aujourd\'hui?',
    inputPlaceholder: 'Tapez votre message…',
    bookCall: 'Réserver un appel',
    send: 'Envoyer',
    close: 'Fermer',
    minimize: 'Réduire',
    maximize: 'Agrandir',
    language: 'Langue',
    awayMessage: 'Merci de nous contacter! Nous sommes actuellement absents. Nos heures d\'ouverture sont du lundi au vendredi, 9h - 18h PT. Veuillez laisser votre message!',
    downloadTranscript: 'Télécharger la transcription',
    timeoutMessage: 'La demande a expiré. Souhaitez-vous réserver un appel découverte pour obtenir de l\'aide immédiatement ?',
    quickReplies: [
      { label: '💰 Tarifs', message: 'Pouvez-vous me détailler vos options de tarification ?' },
      { label: '📈 ROI', message: 'À quelle vitesse puis-je obtenir un retour sur investissement avec Intelllx ?' },
      { label: '🛠️ Fonctionnement', message: 'Comment fonctionne le chatbot Intelllx du début à la fin ?' },
      { label: '🤝 Intégrations', message: 'Quelles intégrations et quels calendriers supportez-vous ?' }
    ],
  },
  de: {
    title: 'Intelllx Chat',
    welcome: 'Hallo! Wie können wir Ihnen heute helfen?',
    inputPlaceholder: 'Geben Sie Ihre Nachricht ein…',
    bookCall: 'Anruf buchen',
    send: 'Senden',
    close: 'Schließen',
    minimize: 'Minimieren',
    maximize: 'Maximieren',
    language: 'Sprache',
    awayMessage: 'Danke für Ihre Nachricht! Wir sind derzeit nicht verfügbar. Unsere Geschäftszeiten sind Montag bis Freitag, 9-18 Uhr PT. Bitte hinterlassen Sie Ihre Nachricht!',
    downloadTranscript: 'Transkript herunterladen',
    timeoutMessage: 'Die Anfrage hat zu lange gedauert. Möchten Sie einen Discovery-Call buchen, um sofort Hilfe zu erhalten?',
    quickReplies: [
      { label: '💰 Preise', message: 'Können Sie mir Ihre Preisoptionen erklären?' },
      { label: '📈 ROI', message: 'Wie schnell kann ich mit Intelllx eine Rendite erzielen?' },
      { label: '🛠️ Funktionsweise', message: 'Wie funktioniert der Intelllx-Chatbot von Anfang bis Ende?' },
      { label: '🤝 Integrationen', message: 'Welche Integrationen und Kalender werden unterstützt?' }
    ],
  },
  pt: {
    title: 'Chat Intelllx',
    welcome: 'Olá! Como podemos ajudar hoje?',
    inputPlaceholder: 'Digite sua mensagem…',
    bookCall: 'Agendar uma chamada',
    send: 'Enviar',
    close: 'Fechar',
    minimize: 'Minimizar',
    maximize: 'Maximizar',
    language: 'Idioma',
    awayMessage: 'Obrigado por entrar em contato! Estamos ausentes no momento. Nosso horário é segunda a sexta, 9h - 18h PT. Deixe sua mensagem!',
    downloadTranscript: 'Baixar transcrição',
    timeoutMessage: 'A solicitação expirou. Gostaria de agendar uma chamada de descoberta para obter ajuda imediata?',
    quickReplies: [
      { label: '💰 Preços', message: 'Você pode me explicar as opções de preços?' },
      { label: '📈 ROI', message: 'Quão rápido posso obter ROI com a Intelllx?' },
      { label: '🛠️ Como funciona', message: 'Como funciona o chatbot da Intelllx do início ao fim?' },
      { label: '🤝 Integrações', message: 'Quais integrações e calendários vocês suportam?' }
    ],
  },
  it: {
    title: 'Chat Intelllx',
    welcome: 'Ciao! Come possiamo aiutarti oggi?',
    inputPlaceholder: 'Scrivi il tuo messaggio…',
    bookCall: 'Prenota una chiamata',
    send: 'Invia',
    close: 'Chiudi',
    minimize: 'Riduci',
    maximize: 'Ingrandisci',
    language: 'Lingua',
    awayMessage: 'Grazie per averci contattato! Siamo attualmente assenti. Il nostro orario è lunedì-venerdì, 9-18 PT. Lascia il tuo messaggio!',
    downloadTranscript: 'Scarica trascrizione',
    timeoutMessage: 'La richiesta è scaduta. Vuoi prenotare una discovery call per ricevere assistenza immediata?',
    quickReplies: [
      { label: '💰 Prezzi', message: 'Puoi spiegarmi le opzioni di prezzo?' },
      { label: '📈 ROI', message: 'Quanto velocemente posso ottenere ROI con Intelllx?' },
      { label: '🛠️ Come funziona', message: 'Come funziona il chatbot Intelllx dall’inizio alla fine?' },
      { label: '🤝 Integrazioni', message: 'Quali integrazioni e calendari supportate?' }
    ],
  },
} as const;

export type SupportedLanguage = keyof typeof CHAT_I18N;
export type ChatTranslations = {
  title: string;
  welcome: string;
  inputPlaceholder: string;
  bookCall: string;
  send: string;
  close: string;
  minimize: string;
  maximize: string;
  language: string;
  awayMessage: string;
  downloadTranscript: string;
  timeoutMessage: string;
  quickReplies: QuickReply[];
};

export const SUPPORTED_LANGUAGES: { code: SupportedLanguage; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

const STORAGE_KEY = 'chat_lang';

/**
 * Get translations for a specific language
 */
export function getTranslations(lang: SupportedLanguage): ChatTranslations {
  return CHAT_I18N[lang] as ChatTranslations || CHAT_I18N.en as ChatTranslations;
}

/**
 * Get saved language from localStorage
 */
export function getSavedLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved in CHAT_I18N) {
      return saved as SupportedLanguage;
    }
  } catch (error) {
    console.warn('[i18n] Failed to read saved language:', error);
  }
  
  return 'en';
}

/**
 * Save language to localStorage
 */
export function saveLanguage(lang: SupportedLanguage): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (error) {
    console.warn('[i18n] Failed to save language:', error);
  }
}

