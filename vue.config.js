// vue.config.js
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  pages: {
    index: {
      entry: './src/pages/index/index.js',
      template: './public/index.html',
      filename: 'index.html',
      title: 'Archivio Digitale | ITIS Enrico Fermi',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    home: {
      entry: './src/pages/home/home.js',
      template: './public/index.html',
      filename: 'home/index.html',
      title: 'Archivio Digitale | ITIS Enrico Fermi',
      chunks: ['chunk-vendors', 'chunk-common', 'home']
    }
  },
  chainWebpack (config) {
    // config
    //   .plugin('html')
    //   .tap(args => {
    //     console.log(args)
    //     args[0].title = 'Archivio Digitale | ITIS Enrico Fermi'
    //     return args
    //   })
    // config.plugins.delete('prefetch');
    config.plugin('compression').use(CompressionWebpackPlugin)
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/scss/main.scss";'
      }
    }
  },
  pwa: {
    name: 'Archivio Digitale',
    themeColor: '#282828',
    msTileColor: '#13AA52',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/service-worker.js'
    }
  }
}
