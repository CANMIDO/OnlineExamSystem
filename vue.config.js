const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //解决跨域问题
  devServer:{
    proxy:{
      '/api':{
        // target:'http://47.103.198.84:8776',//请求地址
        target:'http://192.168.52.125:5000',
        changeOrigin: true,
        pathRewrite: {'^/api': ''},
        ws:true
      }
    }
  }
})
