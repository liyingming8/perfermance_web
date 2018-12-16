import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Personal from '../components/views/Personal'
import LeaderReview from '../components/views/LeaderReview'
import ProjectReview from '../components/views/ProjectReview'
import BeReview from '../components/views/BeReview'
import GroupManage from '../components/views/GroupManage'
import ProjectManage from '../components/views/ProjectManage'
import PermissionManage from '../components/views/PermissionManage'
import TimeSetting from '../components/views/TimeSetting'
import UserManage from '../components/views/UserManage'
import Schedule from '../components/views/Schedule'
import ErrorPage from '../components/404.vue'
import Password from '../components/Password.vue'
// import ForgetPassword from '../components/ForgetPassword.vue'
import NoPermissionPage from '../components/403.vue'

Vue.use(Router)

//通用路由表
export const constantRouterMap = [
        {
          path: '/',
          name: 'Login',
          component: Login
        },
        {
          path: '/home',
          name: 'Home',
          component: Home,
          children:[]
        },
        {
          path: '/password',
          name: 'Password',
          component: Password,
        },
        // {
        //   path: '/forgetPassword',
        //   name: 'ForgetPassword',
        //   component: ForgetPassword,
        // },
        {
          //无权限页面
          path: '/403',
          name: 'NoPermissionPage',
          component: NoPermissionPage,
        }
]

// // //实例化vue的时候只挂载constantRouter
export default new Router({
  routes: constantRouterMap
});

// // //异步挂载的路由
// // //动态需要根据权限加载的路由表 
export const asyncRouterMap = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
        {
          path: '/personal',
          name: 'Personal',
          component: Personal,
          role:["100"],
          icon: 'el-icon-info',
          index: 'personal',
          title: '个人首页'    
        },
        {
          path: '/bereview',
          name: 'BeReview',
          component: BeReview,
          role:["200"],
          icon: 'el-icon-edit',
          index: 'bereview',
          title: '绩效填写'
          
        },
        {
          path: '/leaderReview',
          name: 'LeaderReview',
          component: LeaderReview,
          role:["300"],
          icon: 'el-icon-message',
          index: 'leaderReview',
          title: '小组考核'
        },
        {
          path: '/projectReview',
          name: 'ProjectReview',
          component: ProjectReview,
          role:["400"],
          icon: 'el-icon-edit-outline',
          index: 'projectReview',
          title: '项目考核'
        },
        {
          path: '/schedule',
          name: 'Schedule',
          component: Schedule,
          role:["901"],
          icon: 'el-icon-news',
          index: 'schedule',
          title: 'Schedule'
        },
        {
          path: '/groupManage',
          name: 'GroupManage',
          component: GroupManage,
          role:["500"],
          icon: 'el-icon-rank',
          index: 'GroupManage',
          title: '小组管理'
          
        },
        {
          path: '/projectManage',
          name: 'ProjectManage',
          component: ProjectManage,
          role:["600"],
          icon: 'el-icon-refresh',
          index: 'ProjectManage',
          title: '项目管理'
          
        },
        {
          path: '/UserManage',
          name: 'UserManage',
          component: UserManage,
          role:["700"],
          icon: 'el-icon-setting',
          index: 'UserManage',
          title: '用户管理'
        },
        {
          path: '/permissionManage',
          name: 'PermissionManage',
          component: PermissionManage,
          role:["800"],
          icon: 'el-icon-star-on',
          index: 'permissionManage',
          title: '权限管理'
        },
        {
          path: '/TimeSetting',
          name: 'TimeSetting',
          component: TimeSetting,
          role:["900"],
          icon: 'el-icon-time',
          index: 'TimeSetting',
          title: '考核控制'
        }
    ]
  },
  {
    //404页面
    path: '*',
    name: 'ErrorPage',
    component: ErrorPage,
  }
]

// const router = new Router({
//   // mode: 'history',
//   routes: [
//     {
//       path: '/',
//       name: 'Login',
//       component: Login
//     }, {
//       path: '/home',
//       name: 'Home',
//       component: Home,
//       meta:{
//         //登陆拦截
//         requireAuth: true
//       },
//       children:[
//         {
//           path: '/personal',
//           name: 'Personal',
//           component: Personal,
//           meta:{
//             requireAuth: true
//           },
//         },
//         {
//           path: '/bereview',
//           name: 'BeReview',
//           component: BeReview,
//           meta:{
//             requireAuth: true
//           },
//         },
//         {
//           path: '/leaderReview',
//           name: 'LeaderReview',
//           component: LeaderReview,
//           meta:{
//             requireAuth: true
//           },
//         },
//         {
//           path: '/projectReview',
//           name: 'ProjectReview',
//           component: ProjectReview,
//           meta:{
//             requireAuth: true
//           },
//         },
//         {
//           path: '/groupManage',
//           name: 'GroupManage',
//           component: GroupManage,
//           meta:{
//             requireAuth: true
//           },
//         },
//         {
//           path: '/projectManage',
//           name: 'ProjectManage',
//           component: ProjectManage,
//           meta:{
//             requireAuth: true
//           },
//         },
//         {
//           path: '/UserManage',
//           name: 'UserManage',
//           component: UserManage,
//           meta:{
//             requireAuth: true
//           },
//         },
//         {
//           path: '/roleManage',
//           name: 'RoleManage',
//           component: RoleManage,
//           meta:{
//             requireAuth: true
//           },
//         },
//         {
//           path: '/TimeSetting',
//           name: 'TimeSetting',
//           component: TimeSetting,
//           meta:{
//             requireAuth: true
//           },
//         }
//       ]
//     },
//     //404页面
//     {
//       path: '*',
//       name: 'Error',
//       component: Error,
//       meta:{
//         requireAuth: true
//       }
//     }]
  
//   })
//   // 登陆拦截,导航守卫                                                                                                                                                                                                                                                                                                                                                                   
// // routes.beforeEach((to, from, next) => {
// //     if (to.meta.requireAuth) {  
// //         if (getCookie('byd_performance')) {  
// //             next();
// //         }
// //         else {
// //             next({
// //                 path: '/', 
// //             }) 
// //             this.$message.error("Cookie已失效，请重新登陆")
// //         }
// //     }
// //     else {
// //         next();
// //     }
// // })

// export default router;