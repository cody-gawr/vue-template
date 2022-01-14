const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const remove = require('lodash/remove')

export default {
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  css: [
    '~/assets/style/app.sass',
    '~/assets/style/custom.css',
    '~/static/fonts/flaticon.css',
    '~/static/fonts/paymentfont.css'
  ],
  head: {
    title: "Addubby",
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' }
    ]
  },
  router: {
    middleware: 'i18n'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vuetify',
    '~/plugins/i18n',
    '~/plugins/global-components.ts',
    '~/plugins/axios.ts',
    { src: '~/plugins/vue-apexchart.ts', ssr: false },
    { src: '~/plugins/slider.ts', ssr: false }
  ],
  modules: [
    ['@nuxtjs/router', { fileName: 'router.ts', keepDefaultRouter: true }],
    '@nuxtjs/axios'
  ],
  srcDir: 'src/',
  /**
   * Build configuration
   */
  build: {
    loaders: {
      // we want to use sass instead of node-sass
      sass: {
        import: ['~assets/style/variables.sass'],
        implementation: require('sass'),
        //fiber: require('fibers'),
        indentedSyntax: true // optional
      }
    },
    plugins: [new VuetifyLoaderPlugin()],
    transpile: ['vuetify/lib'],
    typescript: {
      typeCheck: false
    }
  }
}
