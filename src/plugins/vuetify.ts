import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
//import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify)

export default (ctx) => {
  const vuetify = new Vuetify({
    icons: {
      iconfont: 'mdi', // default - only for display purposes
    },
    theme: {
      options: {
        minifyTheme: css => {
          return process.env.NODE_ENV === 'production'
            ? css.replace(/[\r\n|\r|\n]/g, '')
            : css
        },
      },
      themes: {
        light: {
          primary: '#ce1f28',
          secondary: '#514d6a',
          accent: '#e3bcbe',
          anchor: '#ce1f28',
          error: colors.blue.accent1,
          info: colors.shades.black,
          success: colors.red.accent3,
          warning: colors.red.accent3
        }
      }
    }
  })

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
