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
            priority: 1.0
          },
          {
            path: "/lobbies"
          },
          {
            path: "/games-switch"
          },
          {
            path: "/games-ps4"
          },
          {
            path: "/download"
          },
          {
            path: "/install-switch",
            priority: 1.0
          },
          {
            path: "/install-ps4"
          },
          {
            path: "/about"
          }
        ],
        options: {
          filename: "sitemap.xml",
          lastmod: new Date().toISOString().slice(0, 10),
          priority: 0.8,
          changefreq: "hourly"
        }
      })
    ]
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  }
};
