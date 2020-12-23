'use strict'
const defaultSettings = require('./src/settings.js')

const titleHtml = defaultSettings.title || 'vue Element Admin' // page title

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  devServer: {
    open: true, // 配置自动启动浏览器
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true, // 开启代理服务器，
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = titleHtml
        return args
      })
  },
  configureWebpack: config => {
    config.entry.app = ['babel-polyfill', './src/main.js']
  }
}
