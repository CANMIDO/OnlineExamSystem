import VueRouter from 'vue-router'
//引入各组组件用于单页面跳转
// import UserEnter from '../page/UserEnter'
import UserLogin from '../page/UserLogin'
import UserRegister from '../page/UserRegister'
import SideBar from '../page/SideBar'
import UserMessage from '../page/UserMessage'
import ExamCourse from '../page/ExamCourse'
import OnlineExam from '../page/OnlineExam'
import ExamResult from '../page/ExamResult'
import TeacherCourse from '../page/TeacherCourse'
import PaperRevice from '../page/PaperRevice'
import EmptyPage from '../page/EmptyPage'
// import FormTest from '../page/FormTest'
//创建并暴露一个路由器
const router = new VueRouter({

    routes:[
        // {
        //     path:'/test',
        //     component:FormTest
        // },
        {
            path:'/empty',
            component:EmptyPage
        },
        {
            path:'/',
            redirect:'/login'
        },
        {
            path:'/login',
            component:UserLogin
        },
        {
            path: "/register",
            component: UserRegister,
        },
        {
            path:"/enter",
            component:SideBar,
            children:[
                {
                    path:'edit',
                    component:UserMessage
                },
                {
                    path:'examindex',
                    component:ExamCourse
                },
                {
                    path:'result',
                    component:ExamResult
                },
                {
                    path:'courseList',
                    component:TeacherCourse
                },
                
            ]
        },
        {
            path:'/examing',
            component:OnlineExam,
            
        },
        {
            path:'/paperedit',
            component:PaperRevice
        }
    ]
})

//设置一个导航守卫，来判断用户是否登录
// router.beforeEach((to,from,next)=>{
//     if(to.path == '/login' || to.path == '/register'){
//         next();
//     }else{
//         let token = localStorage.getItem('token');

//         if(token === null || token === ''){
//             window.alert('您尚未登录/登录失效，请重新登录')
//             next('/login');
//         }else{
//             next();
//         }
//     }
// });

export default router