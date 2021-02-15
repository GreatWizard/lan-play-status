const SitemapPlugin = require("sitemap-webpack-plugin").default;

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new SitemapPlugin({
        base: "http://www.lan-play.com",
        paths: [
          {
            path: "/",
            priority: 1.0,
          },
          {
            path: "/lobbies",
          },
          {
            path: "/games",
          },
          {
            path: "/download",
          },
          {
            path: "/install",
            priority: 1.0,
          },
          {
            path: "/about",
          },
        ],
        options: {
          filename: "sitemap.xml",
          lastmod: new Date().toISOString().slice(0, 10),
          priority: 0.8,
          changefreq: "hourly",
        },
      }),
    ],
  },
};
