import type { Socials } from '@/types'

export const SITE = 'https://about-myself.pages.dev'
export const SITEMAP = 'https://www.about-myself.pages.dev/sitemap-0.xml'
export const HOST = 'about-myself.pages.dev'

export const baseLocale = 'en'

export const Locales = ['de', 'en', 'es', 'zh', 'fr', 'pl', 'ru', 'uk']

export type SupportedLocale = 'en' | 'ru' | 'uk' | 'zh' | 'de' | 'es' | 'fr' | 'pl'

export interface LanguageConstants {
  BrandName: string
  SITE_TITLE: string
  SITE_DESCRIPTION: string
  TAGS_TITLE: string
  TAGS_DESCRIPTION: string
  SEARCH_PAGE_TITLE: string
  SEARCH_PAGE_DESCRIPTION: string
  GO_TO_HOMEPAGE: string
  ERROR_404_SUBMESSAGE: string
  ERROR_404_MESSAGE: string
  ERROR_404_DESCRIPTION: string
  ERROR_404_TITLE: string
  UPDATED_ON: string
  PUBLISHED_ON: string
  TAGS_HEADING: string
  FOOTER_ABOUT: string
  FOOTER_BUILD: string
  FOOTER_INVEST: string
  FOOTER_LIFE: string
}

const zhConstants: LanguageConstants = {
  BrandName: 'Devopsick',
  SITE_TITLE: 'Devopsick',
  SITE_DESCRIPTION: '一款用于视觉叙事的Astro主题。',
  TAGS_TITLE: '所有标签',
  TAGS_DESCRIPTION: '一款用于视觉叙事的Astro主题。',
  SEARCH_PAGE_TITLE: '站内搜索',
  SEARCH_PAGE_DESCRIPTION: '搜索Astroverse全站内容',
  GO_TO_HOMEPAGE: '返回首页',
  ERROR_404_SUBMESSAGE: '您查找的页面不存在或已被移动。',
  ERROR_404_MESSAGE: '页面未找到',
  ERROR_404_DESCRIPTION: '404 - 页面未找到',
  ERROR_404_TITLE: '404 - 页面未找到',
  UPDATED_ON: '更新于',
  PUBLISHED_ON: '发布于',
  TAGS_HEADING: '标签',
  FOOTER_ABOUT: '关于我们',
  FOOTER_BUILD: '五行',
  FOOTER_INVEST: '地支',
  FOOTER_LIFE: '天干'
}

const enConstants: LanguageConstants = {
  BrandName: 'Devopsick',
  SITE_TITLE: 'Devopsick',
  SITE_DESCRIPTION: 'An Astro Theme for Visual Storytelling',
  TAGS_TITLE: 'All Tags',
  TAGS_DESCRIPTION: 'An Astro Theme for Visual Storytelling',
  SEARCH_PAGE_TITLE: 'Site Search',
  SEARCH_PAGE_DESCRIPTION: 'Search all content on Astroverse',
  GO_TO_HOMEPAGE: 'Go to Homepage',
  ERROR_404_SUBMESSAGE: "The page you're looking for doesn't exist or has been moved.",
  ERROR_404_MESSAGE: 'Page not found',
  ERROR_404_DESCRIPTION: '404 - Page not found',
  ERROR_404_TITLE: '404 - Page Not Found',
  UPDATED_ON: 'Updated on',
  PUBLISHED_ON: 'Published on',
  TAGS_HEADING: 'Tags',
  FOOTER_ABOUT: 'About Us',
  FOOTER_BUILD: 'Build',
  FOOTER_INVEST: 'Invest',
  FOOTER_LIFE: 'Life'
}

export function getConstants(lang: SupportedLocale): LanguageConstants {
  switch (lang) {
    case 'zh':
      return zhConstants
    default:
      return enConstants
  }
}

export function getTagMetadata(tag: string, lang: SupportedLocale) {
  const constants = getConstants(lang)
  return {
    title: `${constants.SITE_TITLE} - ${tag}`,
    description: `${constants.TAGS_DESCRIPTION} ${tag}.`
  }
}

export function getCategoryMetadata(category: string, lang: SupportedLocale) {
  const constants = getConstants(lang)
  return {
    title: `${constants.SITE_TITLE} - ${category}`,
    description: `${constants.SITE_DESCRIPTION} ${category}.`
  }
}

export const SOCIALS: Socials = [
  {
    NAME: 'Email',
    ICON: 'email',
    TEXT: 'devopsick@pm.me',
    HREF: 'mailto:devopsick@pm.me'
  },
  {
    NAME: 'Github',
    ICON: 'github',
    TEXT: 'GitHub',
    HREF: 'https://github.com/Frikadellios'
  },
  {
    NAME: 'Linkedin',
    ICON: 'linkedin',
    TEXT: 'Linkedin',
    HREF: 'https://linkedin.com'
  },

  {
    NAME: 'Twitter',
    ICON: 'twitter-x',
    TEXT: 'DevOpSick',
    HREF: 'https://twitter.com/devopsick'
  }
]
