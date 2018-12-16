<template>
  <div class="beReview">
    <el-button 
      type="primary" 
      round
      style="margin:0.5rem 0 0 0" 
      size="mini"
      v-if="this.selfReivewData.length!=0">
        当月考核表
    </el-button>
    <el-table
      v-if="this.selfReivewData.length!=0"
      :data="selfReivewData"
      :header-cell-style="{color:'#46a5fe'}"
      algin="center"
      fix
      border
      style="width:100%;margin-top:10px;"
      size="mini">
      <el-table-column
          align="center"
          prop="assessMouth"
          label="考核月份">
      </el-table-column>
      <el-table-column
          align="center"
          prop="userId"
          label="工号">
      </el-table-column>
      <el-table-column
          align="center"
          prop="userName"
          label="姓名">
      </el-table-column>
      <el-table-column
          align="center"
          prop="project"
          label="项目名"
          width="200">
          <template slot-scope="scope">
            <!-- {{scope.row.projects}}} -->
            <div v-for="(item,index) in scope.row.project" :key="index">
              <p>{{item.projectName}}</p>
            </div>
          </template>
      </el-table-column>
      <el-table-column
          align="center"
          prop="project"
          label="项目角色">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.project" :key="index">
              <p>{{item.projectRole}}</p>
            </div>
          </template>
      </el-table-column>
      <el-table-column
          align="center"
          prop="project"
          label="工作内容"
          width="200">
          <template slot-scope="scope" >
            <div v-for="(item,index) in scope.row.project" :key="index" align="left" >
              <el-input type="textarea" size="mini" v-model="item.workContent" v-if="editSelfScore==false"></el-input>
              <p v-else>{{item.workContent}}</p>
            </div>
          </template>
      </el-table-column>
      <el-table-column
          align="center"
          prop="project"
          label="权重">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.project" :key="index">
              <p>{{item.weights}}</p>
            </div>
          </template>
      </el-table-column>
      <el-table-column
          align="center"
          prop="project"
          label="项目完成度(百分制)"
          width="150">
          <template slot-scope="scope">
            {{scope.row.project.score}}
            <div v-for="(item,index) in scope.row.project" :key="index" align="center">
              <el-input size="small" v-model="item.score" v-if="item.projectRole=='FO'&&editSelfScore==false"></el-input>
              <span v-else>{{item.score}}</span>
            </div>
          </template>
      </el-table-column>
    </el-table>
    <div class="submitButton">
      <el-button type="primary" round v-if="this.selfReivewData.length!=0" size="mini" @click="editSelfScore=false">填写</el-button>
      <el-button type="primary" round v-if="this.selfReivewData.length!=0" size="mini" @click="submitSelfScore">提交</el-button>
    </div>
    <el-button 
      type="primary" 
      round
      fit
      style="margin-bottom:0.7rem" 
      size="mini"
      v-if="this.groupData.length!=0">
        小组考核成绩
    </el-button>
    <el-table
      v-if="this.groupData.length!=0"
      :data="groupData"
      border
      :header-cell-style="{color:'#46a5fe'}"
      style="width: 100%;"
      size="mini">
      <el-table-column
          align="center"
          prop="time"
          label="考核月份">
      </el-table-column>
      <el-table-column
          align="center"
          prop="userId"
          label="工号">
      </el-table-column>
      <el-table-column
          align="center"
          prop="userName"
          label="姓名">
      </el-table-column>
      <el-table-column
          align="center"
          prop="isLeader"
          label="角色">
      </el-table-column>
      <el-table-column
          align="center"
          prop="groupName"
          label="小组名">
      </el-table-column>
      <el-table-column
          align="center"
          prop="workContent"
          label="工作内容"
          width="200">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.workContent" :key="index">
              <p align="left">{{item}}</p>
            </div>
          </template>
      </el-table-column>
      <el-table-column
          align="center"
          prop="myBoss"
          label="直系领导">
      </el-table-column>
      <el-table-column
          align="center"
          prop="scoreWeight"
          label="权重">
      </el-table-column>
      <el-table-column
          align="center"
          prop="scoreResult"
          label="考核分数">
      </el-table-column>
    </el-table>
    <el-button 
      type="primary" 
      round
      fit
      style="margin:0.5rem 0 0.5rem 0" 
      size="mini"
      v-if="this.projectData.length!=0">
        项目考核成绩
    </el-button>
    <el-table
      v-if="this.projectData.length!=0"
      :data="projectData"
      :header-cell-style="{color:'#46a5fe'}"
      border
      fit
      style="width: 100%;"
      size="mini">
      <el-table-column
          align="center"
          prop="time"
          label="考核月份">
      </el-table-column>
      <el-table-column
          align="center"
          prop="userId"
          label="工号">
      </el-table-column>
      <el-table-column
          align="center"
          prop="userName"
          label="姓名">
      </el-table-column>
      <el-table-column
          align="center"
          prop="projectRole"
          label="角色">
      </el-table-column>
      <el-table-column
          align="center"
          prop="projectName"
          label="项目组"
          width="200">
      </el-table-column>
      <el-table-column
          align="center"
          prop="workContent"
          label="工作内容"
          width="250%">
          <template slot-scope="scope">
              <p align="left">{{scope.row.workContent}}</p>
          </template>
      </el-table-column>
      <el-table-column
          align="center"
          prop="myBoss"
          label="项目leader">
      </el-table-column>
      <el-table-column
          align="center"
          prop="scoreWeight"
          label="权重">
      </el-table-column>
      <el-table-column
          prop="scoreResult"
          align="center"
          width="120%"
          label="考核分数">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import {baseInfo} from '../../utils/service.js'
import {getCookie} from '../../utils/cookie.js'
export default {
  name: 'BeReview',
  data () {
    return {
        groupData:[],
        projectData:[],
        selfReivewData:[],
        editSelfScore:true
    }    
  },
  mounted () {
    this.selfEdit()
    this.groupEdit()
    this.projectEdit()
  },
  computed: {
  },
  methods:{
    selfEdit(){
       axios.get(baseInfo.baseURL+'/yourself/information',{
            params:{
              cookie:getCookie('byd_performance')
            }
          }).then((res)=>{
            if(res.data.code==0&&res.data.detail.userInfo.length!==0){
              this.selfReivewData=res.data.detail.userInfo;
            }else if(res.data.code==0&&res.data.detail.userInfo.length==0) {
              this.$message.error('考核未开启')
            }else{
              this.$message.error(res.data.message) 
            }
          }).catch(function (error) {
              console.log(error)
            })
    },
    groupEdit(){
      axios.get(baseInfo.baseURL+'/member-scored/group-info',{
            params: {
                cookie:getCookie('byd_performance')
              }
          })
          .then((res)=>{
            if(res.data.code==0&&res.data.detail.groupData.length!==0){
              this.groupData=res.data.detail.groupData
            }
          }).catch(function (error) {
            console.log(error)
          })
    },
    projectEdit(){
      axios.get(baseInfo.baseURL+'/member-scored/project-info',{
            params: {
                cookie:getCookie('byd_performance')
              }
          })
          .then((res)=>{
            if(res.data.code==0&&res.data.detail.projectData.length!==0){
              this.projectData=res.data.detail.projectData
            }
            }).catch(function (error) {
              console.log(error)
            })
    },
    submitSelfScore(){
        axios.post(baseInfo.baseURL+'/yourself/submit',{
          cookie:getCookie('byd_performance'),
          userInfo:this.selfReivewData
        })
        .then((res)=> {
          if(res.data.code==0){
            this.$message({
              message: '提交成功',
              type: 'success'
              });
            this.editSelfScore=true;
          }else{
            this.$message.error(res.data.message)
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
  .beReview
    clearFix()
  .submitButton
    submitButton()
</style>
