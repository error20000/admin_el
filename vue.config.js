const webpack = require('webpack');

module.exports = {
    publicPath: '/admin',
    configureWebpack: {
        plugins: [
          // new webpack.ProvidePlugin({
          //     jquery: 'jquery',
          //     $: 'jquery'
          // })
        ]
    },
    devServer: {
        port: 8090,
        proxy: {
          '/api': {
            target: 'http://127.0.0.1:8085',
            ws: true,
            changeOrigin: true
          },
          '/upload': {
            target: 'http://127.0.0.1:8085',
            ws: true,
            changeOrigin: true
          }
        }
    }
    
}