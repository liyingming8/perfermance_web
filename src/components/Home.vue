<template>
 <div class="home clearfix">
    <Header></Header>
    <Sidebar class="sidebar"></Sidebar>
    <div class="content-wrapper">
      <div class="content-box">
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
    <Footer></Footer>
 </div>
 
</template>

<script>
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import {setCookie,getCookie,delCookie} from '../utils/cookie.js'
export default {
  name: 'Home',
  components:{
    Header,
    Sidebar,
    Footer
  },
  data () {
    return {
      
    }
  }
}
</script>

<style>
  .home{
    height:auto;
    min-height: 100%;
    position: relative;
    background: #ecf0f5;
  }
  .content-wrapper{
    height:35.2rem;
    min-height: 100%;
    background-color: #ecf0f5;
    z-index: 800; 
    overflow-y:scroll;
  }
  .content-box{
    position: relative;
    background: #ecf0f5;
    margin-left:4rem;
    padding:0 1rem;
    z-index: 800;
    /* min-height: 10rem; */
    min-height: 100%;
  }

</style>
