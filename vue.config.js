// vue.config.js
module.exports = {
  // devServer: {
  //   // proxy: [{
  //   //   context: ['/api', '/users', '/logout', '/pics', '/admin', '/documents', '/collections', '/public'],
  //   //   target: 'http://localhost:3000',
  //   //   changeOrigin: true
  //   // }, {
  //   //   context: ['/login', '/signup'],
  //   //   target: 'http://localhost:3000',
  //   //   changeOrigin: true,
  //   //   bypass: function (req, res, proxyOptions) {
  //   //     if (req.method === 'GET') {
  //   //       return '/'
  //   //     }
  //   //   }
  //   // }]
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
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        data: `@import "@/scss/main.scss";`
      }
    }
  }
}
