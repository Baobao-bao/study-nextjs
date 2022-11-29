import i18n from 'i18next';
// import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next';
// use(LanguageDetector)
i18n.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en: {
      translations: {
        'Room name': '房间名',
        'Make it public': '公开房间',
        Search: '搜索',
      },
    },
  },
  fallbackLng: 'en',
  debug: true,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
