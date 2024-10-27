import type { SupportedLocale } from '@/config'

export const supportedLanguages = ['en', 'zh', 'de', 'es', 'fr', 'pl', 'ru', 'uk']

export const languageNames: Record<string, string> = {
  en: 'English',
  zh: '中文',
  uk: 'Українська',
  ru: 'Русский',
  fr: 'Français',
  es: 'Español',
  de: 'German',
  pl: 'Polski'
}

export function getCurrentLocale(pathname: string): SupportedLocale {
  const segments = pathname.split('/').filter(Boolean)
  const locale = segments[0] as SupportedLocale
  const supportedLocales: SupportedLocale[] = ['en', 'zh', 'de', 'es', 'fr', 'pl', 'ru', 'uk']
  return supportedLocales.includes(locale) ? locale : 'en'
}

export function getBrandName(lang: SupportedLocale): string {
  const brandNames: Record<SupportedLocale, string> = {
    en: 'Devopsick',
    zh: 'Devopsick',
    ru: 'Devopsick',
    uk: 'Devopsick',
    de: 'Devopsick',
    es: 'Devopsick',
    fr: 'Devopsick',
    pl: 'Devopsick'
  }
  return brandNames[lang]
}

export function getSupportedLanguages(): string[] {
  return supportedLanguages
}

export function getLanguageNames(): Record<string, string> {
  return languageNames
}
