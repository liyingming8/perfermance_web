<template>
  <div class="login">
    <el-form :rules="login" ref="loginForm" class="login-container" :model="loginForm" label-position="left"
            label-width="0px" v-loading="loading">
      <h3 class="login-title">绩效考核系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="loginForm.account" @keyup.enter.native="submitClick" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.passwd" @keyup.enter.native="submitClick" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <!-- <el-checkbox class="login-remember" v-model="checked" label-position="left">记住密码</el-checkbox> -->
      <!-- <router-link to="forgetPassword" style="margin-left:83%;font-size:14px;color:blue;">忘记密码</router-link> -->
      <el-form-item style="width: 100%;margin-top:10px;">
        <el-button type="primary" @click="submitClick" style="width: 100%">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template> 
<script>  

import axios from 'axios'
//qs模块解决post请求发送到后端的数据格式问题
import qs from 'qs'
// axios.defaults.withCredentials = true; //让ajax携带cookie
import {baseInfo} from '../utils/service.js'
import {setCookie,getCookie,delCookie} from '../utils/cookie.js'
  export default{
    name:'Login',
    data(){
      return {
        login: {
          account: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          passwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
        checked: false,
        loginForm: {
          account: '',
          passwd: ''
        },
        loading: false,
        redirect: undefined
      }
    },
    //监听路由
    // watch: {
    //   $route: {
    //     handler: function(route) {
    //       this.redirect = route.query && route.query.redirect
    //     },
    //     immediate: true
    //   }
    // },
    methods: {
      submitClick (loginForm) {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            const _this=this;
            this.loading = true
            axios.post(baseInfo.baseURL+'/login/account',qs.stringify({
              account:this.loginForm.account,
              passwd:this.loginForm.passwd
              })).then( (res)=>{
                // console.log(res)
                var cookie=res.data.detail.cookie
                if(cookie!==''){
                  if(res.data.code==0){
                    if(getCookie("byd_performance")){
                      delCookie("byd_performance")
                      setCookie(cookie.name,cookie.value,1000*60*60*24)
                      this.$store.dispatch('GetUserInfo')
                      this.loading = false
                      this.$router.push('/personal')
                      this.loginForm.account=""
                      this.loginForm.passwd=""
                    }else{
                      setCookie(cookie.name,cookie.value,1000*60*60)
                      this.$store.dispatch('GetUserInfo')
                      this.loading = false
                      this.$router.push('/personal')
                      this.loginForm.account=""
                      this.loginForm.passwd=""
                    }
                  }else{
                    this.$message.error(res.data.message)
                    this.loading = false
                    this.loginForm.account=""
                    this.loginForm.passwd=""
                  }
                }
                //有个bug，当用户名和密码不存在时也会返回0，会导致cookie为undefined
                
              }).catch(function (error) {
                console.log(error)
              })
          }else{
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
   .login-container
    border-radius: 15px;
    background-clip: padding-box;
    margin: 110px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6; 
    .login-title
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;

  /* .login-remember {
    margin: 0px 0px 35px 0px;
    text-align: center;
  } */
</style>
