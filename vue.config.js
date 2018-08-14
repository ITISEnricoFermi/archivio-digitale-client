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
    proxy: [{
      context: ['/login', '/pics'],
      target: 'http://localhost:3000',
      changeOrigin: true
    }]
  },
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
