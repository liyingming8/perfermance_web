import axios from 'axios'
import {baseInfo} from '@/utils/service.js'
import {getCookie,delCookie} from '@/utils/cookie.js'


const user = {
  state: {
    // userId: '',
    roles: []
  },

  mutations: {
    // SET_NAME: (state, userId) => {
    //   state.userId = userId
    // },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        //本地模拟
        // axios.get("/static/mock/permission.json",{
        //   params: {
        //       cookie:getCookie('byd_performance')
        //     }
        //   }).then(res=> {
        //   // console.log(res.data)
        //   const data = res.data
        //   if (data.code==0&&data.roles.length>0) { // 验证返回的roles是否正确
        //     commit('SET_ROLES', data.roles)
        //   } else {
        //     reject('getInfo: roles must be a non-null array !')
        //   }
        //   // commit('SET_NAME', data.name)
        //   resolve(res)
        // }).catch(error => {
        //   reject(error)
        // })
        //API接口
        axios.get(baseInfo.baseURL+'/Validation/roleInfo',{
          params: {
              cookie:getCookie('byd_performance')
            }
          }).then(res=> {
          // console.log(res)
          const data = res.data
          if (data.code==0&&data.detail.role.length>0) { // 验证返回的roles是否正确
            commit('SET_ROLES', data.detail.role)
          }else if(data.detail.role.length==0){
            reject('getInfo: role must be a non-null array !')
          }else{
            alert(res.data.message)
          }
          // commit('SET_NAME', data.name)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //登出
    LogOut({commit},_this) {
      return new Promise((resolve, reject) => {
        axios.get(baseInfo.baseURL+'/login/logout',{
          params: {
            cookie:getCookie('byd_performance')
          }
        }).then((res)=>{
          // console.log(res)
          if(res.data.code==0){
            commit('SET_ROLES', [])
            delCookie("byd_performance")
            _this.$router.push('/')
          }else{
            alert(res.data.message)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    
  }
}

export default user

