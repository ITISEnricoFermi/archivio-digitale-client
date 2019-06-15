// vue.config.js
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  pages: {
    index: {
      entry: './src/pages/index/index.js',
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    home: {
      entry: './src/pages/home/home.js',
      template: './public/index.html',
      filename: 'home/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'home']
    }
  },
  devServer: {
    // https: true,
    proxy: {
      '/static/*': {
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
    themeColor: '#282828',
    msTileColor: '#13AA52',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {

    }
  }
}
