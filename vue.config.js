// vue.config.js
module.exports = {
  // devServer: {
  //   proxy: {
  //     '/login': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true
  //     },
  //     '/pics': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true
  //     }
  //   }
  // },
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
      }
    }
  },
  // devServer: {
  //   proxy: 'http://localhost:3000'
  // },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        data: `@import "@/scss/main.scss";`
      }
    }
  },
  pwa: {
    name: 'Archivio Digitale',
    themeColor: '#1A8D4C',
    msTileColor: '#1A8D4C',
    appleMobileWebAppStatusBarStyle: 'black-translucent'
  }
}
