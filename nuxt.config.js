require('dotenv').config()

const path = require('path')
const CKEditorWebpackPlugin = require("@ckeditor/ckeditor5-dev-webpack-plugin")
const CKEditorStyles = require("@ckeditor/ckeditor5-dev-utils").styles

export default {
  mode: 'spa',
  ssr: false,

  /*
   ** Headers of the page
   */
  head: {
    title: 'Dashboard',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/app.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/element-ui',
    '~/plugins/components',
    '~/plugins/axios',
    '~/plugins/ckeditor'
  ],
  purgeCSS: {
    whitelist: ['html', 'body', 'ul', 'ol'],
    whitelistPatternsChildren: [/^el-/, /^el-/, /^mdi-/, /__layout/]
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.NODE_ENV === 'development' ? process.env.BASE_URI : 'https://admin.test/admin/',
    credentials: true,
    headers: {
      common: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json, text/plain, */*'
      },
      ...(process.env.NODE_ENV === 'development'
        ? { 'X-Acting-As': 'astrolv' }
        : {})
    }
  },
  publicRuntimeConfig: {
    environments: [
      {
        name: "🚧 测试环境",
        baseUri: "/admin/",
        appBaseUri: "https://dev.admin.test"
      },
      {
        name: "🚨 正式环境",
        baseUri: "/admin/",
        appBaseUri: "https://admin.test"
      }
    ],
    menus: [
      {
        label: '首页',
        icon: 'home',
        path: '/',
        permission: 'home',
      },
      {
        label: '用户',
        icon: 'account-supervisor',
        path: '/users',
        permission: 'users.index',
      },
    ],
  },

  /*
   ** Build configuration
   */
  build: {
    vendor: ['vuex'],
    plugins: [
      new CKEditorWebpackPlugin({
        language: 'en',
        additionalLanguages: ['fr'],
        addMainLanguageTranslationsToAllAssets: true
      })
    ],

    extend(config, ctx) {

      config.module.rules.find(r => r.test.test('.css')).exclude = [
        /\.module\.[a-z]+$/,
        /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/,
      ]

      const filesRuleIndex = config.module.rules.findIndex(item => {
        return item.test.test('.svg')
      })

      if (filesRuleIndex !== -1) {
        config.module.rules[filesRuleIndex].test = /\.(png|jpe?g|gif|webp)$/
        const svgRule = { ...config.module.rules[filesRuleIndex] }
        svgRule.test = /\.svg/
        svgRule.exclude = svgRule.exclude || []
        svgRule.exclude.push(path.join(__dirname, 'node_modules', '@ckeditor'))
        config.module.rules.push(svgRule)
      }

      config.module.rules.push({
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ["raw-loader"]
      })

      config.module.rules.push({
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
              attributes: {
                'data-cke': true
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: CKEditorStyles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
              },
              minify: true
            })
          }
        ]
      })
    },
  },
  render: {
    fallback: false
  },
  router: {
    stringifyQuery: (query) => {
      query = require('qs').stringify(query)
      return query.length > 0 ? `?${query}` : ''
    },
    parseQuery: (query) => require('qs').parse(query)
  }
}
