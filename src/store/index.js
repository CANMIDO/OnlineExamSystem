import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const actions = {}
const mutations = {
    setInfo(state,data){
        state.token = data.tokem,
        state.courses = data.user.courses,
        state.type = data.user.type,
        state.id=data.user.id,
        state.state = data.state,
        state.user = data.user,
        localStorage.setItem('token',data.token)
        localStorage.setItem('id',data.user.id),
        localStorage.setItem('state',data.state),
        localStorage.setItem('user',JSON.stringify(data.user)),
        localStorage.setItem('type',data.user.type),
        localStorage.setItem('courses',JSON.stringify(data.user.courses))
    },
    //登出操作
    LogOut(state,data){
        //重新修改
        state.token = data,
        state.courses = data,
        state.user = data,
        state.id = data,
        state.type = data,
        state.state = data,
        localStorage.setItem('token',data)
        localStorage.setItem('user',data),
        localStorage.setItem('type',data),
        localStorage.setItem('id',data),
        localStorage.setItem('state',data),
        localStorage.setItem('courses',data)
    }
}
const state = {
    token:localStorage.getItem('token') ? localStorage.getItem('token') : '',
    courses:JSON.parse(localStorage.getItem('courses')) ? JSON.parse(localStorage.getItem('courses')) : '',
    type:localStorage.getItem('type') ? localStorage.getItem('type') :'',
    //获取用户id,localStorage中存储的均为字符串
    id:localStorage.getItem('id') ? localStorage.getItem('id') : '',
    //保存用户的登录状态
    state:localStorage.getItem('state') ? localStorage.getItem('state') : '',
    //保存用户所有的登录信息
    user:JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : '',    
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
})