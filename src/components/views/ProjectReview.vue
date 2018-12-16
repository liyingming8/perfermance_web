<template>
  <div class="review">
    <el-button 
      type="primary" 
      round
      style="margin:1rem 0 1rem 0" 
      size="mini"
      v-if="this.projectData.length!=0">
        项目考核表
    </el-button>
    <el-table
      v-if="this.projectData.length!=0"
      :data="projectData"
      border
      fix
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
          prop="projectRole"
          label="角色">
      </el-table-column>
      <el-table-column
          align="center"
          prop="projectName"
          label="项目组">
      </el-table-column>
      <el-table-column
          align="center"
          prop="workContent"
          label="工作内容"
          width="200">
      </el-table-column>
      <el-table-column
          align="center"
          prop="myBoss"
          label="项目领导">
      </el-table-column>
      <el-table-column
          align="center"
          prop="scoreWeight"
          label="权重">
      </el-table-column>
      <el-table-column
          align="center"
          prop="scoreResult"
          width="150"
          label="考核分数(百分制)">
          <template slot-scope="scope">
            <el-input v-if="editProScore==false" size="small" v-model="scope.row.scoreResult"></el-input>
            <p v-else>{{scope.row.scoreResult}}</p>
          </template>
      </el-table-column>
    </el-table>
    <div class="submitButton">
      <el-button type="primary" round v-if="this.projectData.length!=0" @click="editProScore=false" size="mini">填写</el-button>
      <el-button type="primary" round v-if="this.projectData.length!=0" size="mini" @click="submitProjectScore">提交</el-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
// import qs from 'qs'
import {baseInfo} from '../../utils/service.js'
import {getCookie} from '../../utils/cookie.js'
export default {
  name: 'ProjectReview',
  data () {
    return {
        projectData:[],
        editProScore:true
    }
  },
  mounted () {
    this.projectEdit()
  },
  methods:{
    projectEdit(){
        axios.get(baseInfo.baseURL+'/leader-scoring/info',{
        params: {
             cookie:getCookie('byd_performance')
          }
      })
      .then((res)=>{
        if(res.data.code==0&&res.data.detail.projectData.length!==0){
          this.projectData=res.data.detail.projectData
        }else if(res.data.code==0&&res.data.detail.projectData.length==0) {
                this.$message.error('考核未开启')
        }else{
          this.$message.error(res.data.message) 
        }
       }).catch(function (error) {
          console.log(error)
        })
    },
    submitProjectScore(){
      axios.post(baseInfo.baseURL+'/leader-scoring/project-score-submit',{
        cookie:getCookie('byd_performance'),
        projectData:this.projectData
        })
        .then((res)=> {
          if(res.data.code==0){
            this.$message({
              message: '提交成功',
              type: 'success'
              });
            this.editProScore=true;
            //重新渲染表格数据
            this.projectEdit()
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
  .submitButton
    submitButton()

</style>
