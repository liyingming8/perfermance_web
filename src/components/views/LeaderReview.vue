<template>
  <div class="review">
    <el-button 
      type="primary" 
      round
      style="margin:1rem 0 1rem 0" 
      size="mini"
      v-if="this.groupData.length!=0">
        小组考核表
    </el-button>
    <el-table
      v-if="this.groupData.length!=0"
      :data="groupData"
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
            <!-- {{scope.row.workContent}} -->
            <div v-for="(item,index) in scope.row.workContent" :key="index">
              <p>{{item}}</p>
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
          label="考核分数(百分制)"
          width="150">
          <template slot-scope="scope">
            <el-input v-if="editLeaderScore==false" size="small" v-model="scope.row.scoreResult"></el-input>
            <p v-else>{{scope.row.scoreResult}}</p>
          </template>
      </el-table-column>
    </el-table>
    <div class="submitButton">
      <el-button type="primary" round v-if="this.groupData.length!=0" @click="editLeaderScore=false" size="mini">填写</el-button>
      <el-button type="primary" round v-if="this.groupData.length!=0" size="mini" @click="submitLeaderScore">提交</el-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {baseInfo} from '../../utils/service.js'
import {getCookie} from '../../utils/cookie.js'
export default {
  name: 'LeaderReview',
  data () {
    return {
        groupData:[],
        editLeaderScore:true,
    }
  },
  mounted () {
    this.leaderEdit()
  },
  methods:{
    leaderEdit(){
      axios.get(baseInfo.baseURL+'/leader-scoring/info',{
        params: {
            cookie:getCookie('byd_performance')
          }
      })
      .then((res)=>{
        //  console.log(res.data.detail.groupData)
        if(res.data.code==0&&res.data.detail.groupData.length!==0){
            this.groupData=res.data.detail.groupData
        }else if(res.data.code==0&&res.data.detail.groupData.length==0) {
                this.$message.error('考核未开启')
        }else{
          this.$message.error(res.data.message) 
        }
        // console.log(this.groupData)
       }).catch(function (error) {
          console.log(error)
        })
    },
    submitLeaderScore(){
        axios.post(baseInfo.baseURL+'/leader-scoring/group-score-submit',{
          cookie:getCookie('byd_performance'),
          groupData:this.groupData
          })
        .then((res)=> {
          if(res.data.code==0){
            this.$message({
              message: '提交成功',
              type: 'success'
              });
            this.editLeaderScore=true;
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
