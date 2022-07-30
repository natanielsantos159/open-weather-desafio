// Source: https://github.com/navapbc/template-application-nextjs/commit/cd06ba6f38993453bf1f293494144169c5094ad8
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ptBR from "../public/locales/pt/common.json";
import enUS from "../public/locales/en/common.json";
import es from "../public/locales/es/common.json";

const resources = {
  "pt-BR": { common: ptBR },
  "en-US": { common: enUS },
  es: { common: es },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: "pt-BR",
    supportedLngs: ["pt-BR", "en-US", "es"],
    resources,
    interpolation: {
      escapeValue: false,
    },
    defaultNS: "common",
    ns: ["common"],
  });

export default i18n;
