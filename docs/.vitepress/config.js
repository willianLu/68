export default {
  base: "/68/",
  title: "68号星球", //站点标题
  description: "这人间多美好，你怎能虚度年华，岁月不待人，行且珍惜，砥砺前行！", //mate标签description，多用于搜索引擎抓取摘要
  themeConfig: {
    siteTitle: "68号星球",
    logo: "/logo.png",
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "GuideTest", link: "/guide/test" },
      { text: "gitee", link: "https://gitee.com/geeksdidi" },
      {
        text: "Drop Menu",
        items: [
          {
            items: [
              { text: "Item A1", link: "/item-A1" },
              { text: "Item A2", link: "/item-A2" },
            ],
          },
          {
            items: [
              { text: "Item B1", link: "/item-B1" },
              { text: "Item B2", link: "/item-B2" },
            ],
          },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://gitee.com/geeksdidi" },
      { icon: "twitter", link: "..." },
      // You can also add custom icons by passing SVG as string:
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="SVG namespace"><title>Dribbble</title><path d="M12...6.38z"/></svg>',
        },
        link: "...",
      },
    ],
    sidebar: [
      {
        text: "前端技术",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "HTTP跨域",
            link: "/blogs/HTTP跨域",
          },
        ],
      },
    ],
  },
  dest: "public",
};
