import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from "i18next";
import enUsTrans from "./en-us.json";
import zhCnTrans from "./zh-cn.json";
import {
  initReactI18next
} from 'react-i18next';

i18n.use(LanguageDetector)
.use(initReactI18next)
.init({
  resources: {
    en: {
      translation: enUsTrans,
    },
    zh: {
      translation: zhCnTrans,
    },
  },
  lng : localStorage.getItem("i18nextLng")||'en',
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false, 
  },
})

export default i18n;