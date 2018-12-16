import router from './router'
import store from './store'
import { getCookie } from './utils/cookie'      // cookie验证

// 权限判断
// function hasPermission(roles, permissionRoles) {
//   console.log(roles,permissionRoles)
//   if (!permissionRoles) return true
//   else{
//     return roles.some(role => permissionRoles.indexOf(role) >= 0)
//   }
// }

const whiteList = ['/','/forgetPassword']                  // 不重定向白名单

router.beforeEach((to, from, next) => {
  if (getCookie('byd_performance')) {  
    if (to.path === '/') {                                 // 还要访问登陆页面
      next({ path: '/personal' })                                       // 就去个人页面
    } else {                                                 
      if (store.getters.addRouters.length === 0) {   // 初始化时判断是否拉取user_info
        store.dispatch('GetUserInfo')  //拉取用户信息
          .then(res=>{
            // console.log(res)
            //本地模拟
            // const roles=res.data.roles;
            //API接口
            const roles=res.data.detail.role;
            store.dispatch('GenerateRoutes', roles ).then(() => { // 生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          }).catch(err => {                                              // 没获取权限则强制登出
              console.error(err)
          })
      } else {
          // 动态改变权限有bug
          // console.log(store.getters.roles,to.path.role)
          // if (hasPermission(store.getters.roles, to.role)) {
          //   next()
          // } else {
          //   next( '/403')
          // }
          //默认
          next()
      }
    }
  } else {                                    
    whiteList.includes(to.path)                     // 如果不在不重定向白名单里就去登陆页面
      ? next()
      : next('/')
  }
})

