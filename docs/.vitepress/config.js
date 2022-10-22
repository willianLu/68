export default {
  base: "/68/",
  title: "技术星球", //站点标题
  description: "技术星球，面向未来的技术！", // mate标签description，多用于搜索引擎抓取摘要
  themeConfig: {
    siteTitle: "技术星球",
    logo: "/logo.png",
    nav: [{ text: "web前端", link: "/web/" }],
    socialLinks: [{ icon: "github", link: "https://github.com/willianLu/68" }],
    sidebar: [
      {
        text: "前端技术",
        collapsible: true,
        // collapsed:true,
        items: [
          {
            text: "前言",
            link: "/web/",
          },
          {
            text: "HTTP跨域",
            link: "/web/HTTP跨域",
          },
        ],
      },
    ],
  },
  dest: "public",
};
