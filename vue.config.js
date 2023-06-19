const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // 反向代理
  devServer: {
    proxy: {
      '/myajax': {
        target: 'https://i.maoyan.com',
        changeOrigin: true,
        pathRewrite: {
          '^/myajax': ''
        }
      }
    }
  }
})
