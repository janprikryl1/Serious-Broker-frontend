import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationCzech from "./utils/translations/czech/translation.json";
import translationEnglish from "./utils/translations/english/translation.json";

const resources = {
    cs: {
        translation: translationCzech
    },
    en: {
        translation: translationEnglish
    },
}

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({resources})
