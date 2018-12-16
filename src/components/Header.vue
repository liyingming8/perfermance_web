<template>
 <div class="header">
   <div class="header-logo">
    <img class="img-logo" src="../assets/img/logo.png">
    <span>绩效考核系统</span>
    <div class="user-info">
      <!-- <span class="welcome">{{userName}}欢迎你</span> -->
     <img src="../assets/img/user.png">
     <el-dropdown>
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="modifyPassword">修改密码</el-dropdown-item>
        <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
     </el-dropdown>
    </div>
   </div>
 </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import {baseInfo} from '../utils/service.js'
import {getCookie,delCookie} from '../utils/cookie.js'
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  mounted: function () {

  },
  methods:{
    loginOut(){
      const _this=this
      this.$store.dispatch('LogOut',_this).then(() => {
      location.reload()// 重置vue-router避免bug
      })
    },
    modifyPassword(){
      this.$router.push('/password')
    }
  }
}
</script>

<style>
  .header{
    position: relative;
    background:#515255;
    height:2.2rem;
    max-height: 2.2rem;
    z-index: 1030;
  }
  .header-logo{
    line-height:2rem;
    font-size:1rem;
    color:antiquewhite;
  }
  .header-logo > span{
    vertical-align: top;
  }
  .img-logo{
    width:3.6rem;
    height:2rem;
  }
  .user-info{
    float:right;
    position: relative;
    top:0.3rem;
    right:1.875rem; 
    cursor: pointer;
    
  }
  .user-info > img{
    width:1.2rem;
  }
  .el-icon-arrow-down{
    color:antiquewhite;
    position: relative;
  }
</style>
