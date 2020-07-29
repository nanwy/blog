
const path = require('path')
/* eslint-disable */
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '南浮宫魅影',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: "google-site-verification", content: "IiL8m_unrgDOgOM5wmoTgCHZA-UDLh_PKnFCKWOZQw4" }
    ],
    link: [
      { rel: 'icon1', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', href: '//at.alicdn.com/t/font_1751579_ggf3023k8fw.css' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#53a8ff' },
  /*
  ** Global CSS
  */
  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/index.css',
    '~assets/css/main.css',
    '~assets/css/animate.compat.css',
    '~assets/css/icon/iconfont.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '@/plugins/TweenLite.min',
    '~/plugins/vue-lazyload.js',
    {
      src: '~/plugins/element-ui', ssr: true,

    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  server: {
    port: 3000, // default: 3000
  },
  axios: {
    proxy: true,
  },
  proxy: {
    '/api': {
      // target: 'http://59.110.124.156:8000',
      target: 'http://59.110.124.156:8000',
      pathRewrite: {
        '^/api': 'api'
      }
    },
    '/music': {
      target: 'http://59.110.124.156:3000',
      pathRewrite: {
        '^/music': ''
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push()
      }
      config.resolve.alias['@'] = path.resolve(__dirname, 'components')

    },
    analyze: true,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    },
    babel: {
      plugins: [
        ["component", { "libraryName": "element-ui", "styleLibraryName": "theme-chalk" }]
      ]
    },
    extractCSS: { allChunks: true }
  }
}
