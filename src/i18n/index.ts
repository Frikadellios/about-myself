import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
// import Backend from "i18next-http-backend"
import { initReactI18next } from 'react-i18next'

import de from '@/locales/de.json'
import en from '@/locales/en.json'
import es from '@/locales/es.json'
import fr from '@/locales/fr.json'
import pl from '@/locales/pl.json'
import ru from '@/locales/ru.json'
import uk from '@/locales/uk.json'
import zh from '@/locales/zh.json'

const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  },
  fr: {
    translation: fr
  },
  ru: {
    translation: ru
  },
  de: {
    translation: de
  },
  uk: {
    translation: uk
  },
  pl: {
    translation: pl
  },
  zh: {
    translation: zh
  }
}
export const languages = [
  {
    value: 'en',
    label: 'English',
    icon: '🇬🇧'
  },
  {
    value: 'zh',
    label: '中文',
    icon: '🇨🇳'
  },
  {
    value: 'ru',
    label: 'English',
    icon: '🇬🇧'
  },
  {
    value: 'uk',
    label: '中文',
    icon: '🇨🇳'
  },
  {
    value: 'es',
    label: 'English',
    icon: '🇬🇧'
  },
  {
    value: 'fr',
    label: '中文',
    icon: '🇨🇳'
  },
  {
    value: 'de',
    label: 'English',
    icon: '🇬🇧'
  },
  {
    value: 'pl',
    label: '中文',
    icon: '🇨🇳'
  }
]
i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  })

export { default as i18n } from 'i18next'
