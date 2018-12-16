import axios from 'axios'
import {baseInfo} from '@/utils/service.js'
import {getCookie} from '@/utils/cookie.js'


const reviewController = {
  state: {
    reviewController: false
  },

  mutations: {
    SET_CONTROLLER: (state, reviewController) => {
      state.reviewController = reviewController
    }
  },
  actions: {
    // 获取考核状态
    GetReviewController({ commit }) {
      return new Promise((resolve, reject) => {
          axios.get(baseInfo.baseURL+'/scored-mode/scored-state-turn-on',{
            params:{
                cookie:getCookie('byd_performance')
            }
        }).then((res)=> {
            if(res.data.code==0&&res.data.detail.scored_turn_on.state==true){
              commit('SET_CONTROLLER', true)
            }else{
              commit('SET_CONTROLLER', false)
            }
            resolve(res)
        }).catch(function (error) {
          reject(error)
        })
      })
    }
  }
}

export default reviewController

