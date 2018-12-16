<template>
    <div class="sidebar">
        <el-menu :collapse="isCollapse" class="sidebar-el-menu" background-color="#324157" default-active
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in permission_routers[0].children">
                <el-menu-item :index="item.index" :key="item.name" style="margin:-0.3rem 0;">
                    <i :class="item.icon"></i><span slot="title">{{ item.title}}</span>
                </el-menu-item>
            </template>
        </el-menu>
        <!-- <a class="showTab" href="#"><i class="el-icon-arrow-left"></i></a> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
            isCollapse: true
            }
        },
        computed: {
            ...mapGetters([
            'permission_routers',
            ]),
        },
        methods:{
            // tabSwitch(){
            //     this.isCollapse=!this.isCollapse;
                
            // }
        }
    }
</script>

<style lang="stylus" scoped>
.sidebar
    width:4rem;
    padding-top:2rem;
    overflow:hidden;
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    algin:center;
    background:#324157;
    z-index: 810;
// .active
//     width:4rem;
//     .showTab
//         display:inline-block;
//         color:#fff;
//         font-size:1.4rem;
</style>
