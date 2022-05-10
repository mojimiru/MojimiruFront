module.exports = {
  publicPath: '/MojimiruFront',
  outputDir: 'dist',

  pluginOptions: {
    vuetify: {},
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },

  transpileDependencies: [
    'quasar'
  ]
}
