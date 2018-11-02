// vue.config.js
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  devServer: {
  // https : true,
    proxy: {
      '/pics': {
        target: {
          protocol: 'http:',
          host: 'localhost',
          port: 3000
        },
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/public': {
        target: {
          protocol: 'http:',
          host: 'localhost',
          port: 3000
        },
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin()
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/scss/main.scss";`
      }
    }
  },
  pwa: {
    name: 'Archivio Digitale',
    themeColor: '#1A8D4C',
    msTileColor: '#1A8D4C',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    start_url: '/dashboard'
  }
}
