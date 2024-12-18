//引入vue
import Vue from 'vue'
//引入App组件
import App from './App.vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入UI库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入路由器
import router from './router'
import store from './store/index'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
//应用相关插件
Vue.use(VueRouter)
Vue.use(ElementUI)

// 添加一个请求拦截器，每次请求都会在请求头中携带token
axios.interceptors.request.use((config) => {
  if(localStorage.getItem('token')){
    config.headers['token'] = localStorage.getItem('token')
  }
  return config; },
  (error)=>{
    return Promise.reject(error);
})

//创建vm
new Vue({
  el:'#app',
  render: h => h(App),
  router:router,
  store
})
