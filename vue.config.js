// vue.config.js
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
  // pages: {
  //   index: {
  //     // entry for the page
  //     entry: 'src/pages/index/main.js',
  //     // the source template
  //     template: 'public/index.html',
  //     // output as dist/index.html
  //     filename: 'index.html'
  //     // when using title option,
  //     // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
  //     // title: 'Index Page',
  //     // chunks to include on this page, by default includes
  //     // extracted common chunks and vendor chunks.
  //     // chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   },
  //   home: {
  //     // entry for the page
  //     entry: 'src/pages/home/main.js',
  //     // the source template
  //     template: 'public/index.html',
  //     // output as dist/index.html
  //     filename: 'home.html'
  //   }
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
