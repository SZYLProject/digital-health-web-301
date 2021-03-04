'use strict'
const defaultSettings = require('./src/settings.js')

const titleHtml = defaultSettings.title || 'vue Element Admin' // page title
// const version = new Date().getTime()
// const timeStamp = new Date().getTime()

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  productionSourceMap: true,
  // outputDir: `dist/${version}`,
  // outputDir: 'dist/1.0.2',
  // filenameHashing: false, // 打包的时候不使用hash值.因为我们有时间戳来确定项目的唯一性了.

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
    // config.output = { // 输出重构 打包编译后的js文件名称,添加时间戳.
    //   filename: `js[nam].${timeStamp}.js`,
    //   chunkFilename: `js[nam].${timeStamp}.js`
    // }
  },
  css: {
    // extract: {
    //   filename: `css/[name].${timeStamp}.css`,
    //   chunkFilename: `css/[name].${timeStamp}.css`
    // }
  }
}
