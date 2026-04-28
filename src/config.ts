export const SITE = {
  website: "https://www.xavierjortiz.com", // replace this with your deployed domain
  author: "Xavier J. Ortiz",
  profile: "https://www.xavierjortiz.com",
  desc: "Portfolio with blog about Programming, Linux, Projects, and space warfare gaming",
  title: "Xavier J. Ortiz",
  ogImage: "og-image.jpg",
  lightAndDarkMode: true,
  postPerIndex: 10,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/Xavier-J-Ortiz/xavierjortiz-blog-site/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "America/New_York", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
