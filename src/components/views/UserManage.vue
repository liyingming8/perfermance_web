<template>
    <div class="user-control">   
        <el-upload
            style="margin-top:2rem;margin-bottom:0.5rem;"
            ref="upload"
            :data="getCookie()"
            :action="uploadUrl()"
            :on-remove="handleRemove"
            :on-success="handleSucces"
            :auto-upload="false">
            <el-button slot="trigger" size="mini" type="primary">批量上传用户</el-button>
            <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload">确认上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传xls/xlsx类型的excel文档</div> -->
            <!-- <a class="downLoad" :href="downLoadURL">模板下载</a> -->
            <div class="upload-template">
                  <a class="link" :href="downLoadURL">Downlaod Template</a>
            </div>
        </el-upload>
        <el-button 
            type="primary" 
            round
            style="margin:1rem 0 1rem 0" 
            size="mini">
                用户列表
            </el-button>
        <el-input
            placeholder="输入工号或者姓名进行搜索"
            clearable
            style="width:14rem;"
            size="mini"
            @keyup.enter.native="searchUserData"
            prefix-icon="el-icon-search"
            v-model="keywords">
        </el-input>
        <el-table
            v-if="this.userInfo.length!=0"
            :data="userInfo.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            size="mini"
            border
            fix
            :header-cell-style="{color:'#46a5fe'}"
            style="width: 100%;"
            @selection-change="handleSelectionChange"
            max-height="400">
            <el-table-column
                type="selection"
                width="30">
            </el-table-column>
            <el-table-column
                align="center"
                prop="userId"
                label="工号"
                 width="120">
            </el-table-column>
            <el-table-column
                align="center"
                prop="userName"
                label="姓名"
                 width="120">
            </el-table-column>
            <el-table-column
                align="center"
                prop="groupName"
                label="小组名"
                width="150">
            </el-table-column>
            <el-table-column
                align="center"
                prop="groupRole"
                label="小组角色"
                width="150">
            </el-table-column>
            <el-table-column
                align="center"
                prop="projectInfo"
                label="项目角色"
                >
                <template slot-scope="scope">
                        <el-tag v-if="scope.row.projectInfo.length!=0"
                            v-for="(item,index) in scope.row.projectInfo" 
                            :key="index" size="mini">
                            {{item.projectName+":"+item.projectRole}}
                        </el-tag>          
                </template>
            </el-table-column>
            <el-table-column align="center" label="重置密码" width="120">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="resetPassword(scope.$index,scope.row)">重置</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <div class="footer">
            <el-button  v-if="this.userInfo.length!=0" class="userDelete" type="primary" size="mini" @click="deleteVolumeUser()">批量删除</el-button>
            <div class="pagination" v-if="this.userInfo.length>7">
                <el-pagination
                    class="pageChange"
                    :page-size="pageSize"
                    :page-count="10"
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="handlePageChange" 
                    :current-page="currentPage">
                </el-pagination>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import {baseInfo} from '../../utils/service.js'
import {getCookie} from '../../utils/cookie.js'

export default {
    name:"UserManage",
    data(){
        return{
            fileList: [],
            downLoadURL:baseInfo.baseURL+'/static/image/template.xlsx',
            oldUserInfo:[],
            userInfo:[],
            keywords:'',
            //table选择框数据
            selectData:[],
            //分页
            total:0,
            pageSize:7,
            currentPage:1
        }
    },
    mounted(){
        this.setUserInfo()
    },
    watch:{
        keywords: function(val, oldVal){
            this.userInfo = this.oldUserInfo.filter( item => (~item.userName.indexOf(val)||~item.userId.indexOf(val)));
            this.total=this.userInfo.length
        }
    },
    computed: {
        searchUserData:function(){
            if(this.keywords=""){
                this.userInfo=this.oldUserInfo
                this.total=this.userInfo.length
            }
        }
    },
    methods: {
        uploadUrl(){
            return baseInfo.baseURL+'/userManagement/excelParse'
        },
        getCookie(){
            return {
                    cookie:getCookie('byd_performance')
                }
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            // console.log(file, fileList);
        },
        handleSucces(res, file, fileList){
            // console.log(res)
            if(res.code==0){
                this.userInfo=res.detail.allUserInfo
                this.total=res.detail.allUserInfo.length
                this.$message({
                            message: '成员添加成功',
                            type: 'success'
                            });
            }else{
                this.$message.error(res.message)
            }
        }, 
        setUserInfo(){
            axios.get(baseInfo.baseURL+'/userManagement/query',{
                params:{
                    cookie:getCookie('byd_performance')
                }}).then((res)=>{
                        // console.log(res.data)
                    if(res.data.code==0){
                        // console.log(res.data.detail.allUserInfo)
                        this.userInfo=res.data.detail.allUserInfo
                        this.oldUserInfo=res.data.detail.allUserInfo
                        this.total=res.data.detail.allUserInfo.length 
                    }else{
                        this.$message.error(res.data.message)
                    }
                }).catch(function (error) {
                    console.log(error)
                    })
        },
        //页码切换
        handlePageChange(currentPage) {
            this.currentPage = currentPage   
        },
        deleteVolumeUser(){
                const groupData=[]
                for(let i=0; i<this.selectData.length; i++){
                    groupData.push({userId:this.selectData.map((v,i)=>{return v.userId})[i]})
                }   
            axios.post(baseInfo.baseURL+'/userManagement/deleteUser',{
                cookie:getCookie('byd_performance'),
                groupData:groupData,
                }).then((res)=>{
                    // console.log(res.data)
                    if(res.data.code==0){
                        this.setUserInfo()
                        this.$message({
                        message: '删除成功',
                        type: 'success'
                        });
                    }else{
                        this.$message.error(res.data.message)
                        this.setUserInfo()
                    }
                    }).catch(function (error) {
                        console.log(error)
                    })
        },
        handleSelectionChange(val){
            this.selectData =val;
        },
        resetPassword(index,row){
            axios.post(baseInfo.baseURL+'/login/resetPassword',qs.stringify({
                cookie:getCookie('byd_performance'),
                userId:row.userId,
                })).then((res)=>{
                    // console.log(res.data)
                    if(res.data.code==0){
                        this.setUserInfo()
                        this.$message({
                        message: '重置成功',
                        type: 'success'
                        });
                    }else{
                        this.$message.error(res.data.message)
                        this.setUserInfo()
                    }
                    }).catch(function (error) {
                        console.log(error)
                    })
        }

    }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
.user-control
    clearFix()
    .upload-template
        float:right;
        position: relative;
        display: table;
        border-collapse: separate;
        box-sizing: border-box;
        color: #444;
        .link
            text-decoration: none; 
            text-decoration: none; 
            text-decoration: none;  
            text-decoration:none; 
    .footer
        clearFix()
        box-sizing:border-box;
        background:#ecf0f5;
        padding-top:1rem;
        .userDelete
            float:left;
        .pagination
            float:right;

</style>
