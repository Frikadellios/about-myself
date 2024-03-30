interface SiteConfig {
    author: string
    title: string
    description: string
    lang: string
    ogLocale: string
    shareMessage: string
    paginationSize: number
  }
  
  export const siteConfig: SiteConfig = {
    author: "Hrihorii Ilin <devopsick@pm.me>", // Site author
    paginationSize: 6, // Number of posts per page
  }