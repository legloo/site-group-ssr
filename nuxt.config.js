
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { hid: 'pple-mobile-web-app-capable-viewport', name: 'viewport', content: 'width=device-width,height=device-height,inital-scale=1.0,maximum-scale=1.0,user-scalable=no' },
      { hid: 'pple-mobile-web-app-capable', name: 'pple-mobile-web-app-capable',content:"yes" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/vant.js', {
    src: '~plugins/custom/rootFontSize.js', ssr: false
  }],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-sass-resources-loader'
  ],

  sassResources: ['~assets/sass/resources.scss'],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
