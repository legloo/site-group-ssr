
const absbygoogle = '(adsbygoogle=window.adsbygoogle||[]).push({google_ad_client:"ca-pub-6538951207768377",enable_page_level_ads:true});';
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
      { hid: 'pple-mobile-web-app-capable', name: 'pple-mobile-web-app-capable', content: "yes" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      // 这里引入谷歌广告的JS文件，async要为true
      {src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', async: 'true'},
      // 把上面的JS代码变量引用到这里
      {innerHTML: absbygoogle, type: 'text/javascript', charset: 'utf-8'}
    ],
    // 禁止对JS转义，这一句一定要加上
    __dangerouslyDisableSanitizers: ['script']
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
  plugins: [
    '~/plugins/vant.js',
    {
      src: '~plugins/custom/rootFontSize.js',
      ssr: false
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
    'nuxt-sass-resources-loader',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
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
  },
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true, // 表示开启代理
    prefix: '/apis', // 表示给请求url加个前缀 /api
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/apis': {
      target: 'http://www.ddnews.top/apis/', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/apis': '', // 把 /api 替换成‘’
      }
    }
  },
  watchQuery: true
}
