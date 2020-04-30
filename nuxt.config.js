
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: `Za vzděláním!`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyByTicvCNAamYAoCS96ebLnFJIKXXcDmCI&libraries=places", async: true, defer: true }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],

  router: {
    linkActiveClass: 'link--active'
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/amplify.js',
    { src: '@/plugins/unicons.js', mode: 'client' },
    { src: '@/plugins/vuelidate.js', mode: 'client' },
    { src: '@/plugins/youtube.js', mode: 'client' },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/moment',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  moment: {
    locales: ['cs']
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
  ],

  toast: {
    position: 'bottom-right',
    duration: 5000
  },
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
