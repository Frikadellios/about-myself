import { defaultLang, ui } from './ui'

export const LANGUAGES = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  ru: 'Русский',
  uk: 'Українська',
  de: 'German',
  pl: 'Polski'
}

export type UiType = keyof typeof ui
export type LANGUAGES = keyof typeof ui
export type Locale = 'en' | 'de' | 'es' | 'fr' | 'ru' | 'uk' | 'pl' | string

interface Fallback {
  [key: string]: string
}

export const LANGUAGES_ARRAY = Object.keys(LANGUAGES)
export const defaultLocale = 'en'
export const currentLocale = Object.keys(LANGUAGES)[0]

export const fallback: Fallback = {
  currentLocale: defaultLocale
}

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/')
  if (lang in ui) return lang as keyof typeof ui
  return defaultLang
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key]
  }
}

export function getRouteFromUrl(url: URL): string | undefined {
  const [, lang] = url.pathname.split('/')
  if (lang in ui) return lang as keyof typeof ui
}

export function changeLangFromUrl(url: URL, lang: string) {
  const newLang = lang in ui ? lang : defaultLang
  const splitUrl = url.pathname.split('/')
  splitUrl[1] = newLang
  return splitUrl.join('/').substring(1)
}
export function pathNameIsInLanguage(pathname: string, lang: UiType) {
  return pathname.startsWith(`/${lang}`) || (lang === defaultLang && !pathNameStartsWithLanguage(pathname))
}

function pathNameStartsWithLanguage(pathname: string) {
  let startsWithLanguage = false
  const languages = Object.keys(LANGUAGES)

  for (let i = 0; i < languages.length; i++) {
    const lang = languages[i]
    if (pathname.startsWith(`/${lang}`)) {
      startsWithLanguage = true
      break
    }
  }

  return startsWithLanguage
}

export function getLocalizedPathname(pathname: string, lang: UiType) {
  if (pathNameStartsWithLanguage(pathname)) {
    const availableLanguages = Object.keys(LANGUAGES).join('|')
    const regex = new RegExp(`^\/(${availableLanguages})`)
    return pathname.replace(regex, `/${lang}`)
  }
  return `/${lang}${pathname}`
}

export { ui }
