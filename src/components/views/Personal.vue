<template>
  <div class="personal">
    <span class="img-title">头像</span>
    <a href="#"><img class="personal-img" :src="userImg" alt=""></a>
    <h3 class="personal-title">个人信息 </h3>
    <el-table 
      :data="userInfo"
      border
      fit
      :header-cell-style="{color:'#46a5fe'}"
      style="width:100%;margin:0 auto"
      size="mini"
      max-height="140">
      <el-table-column
          align="center"
          prop="userName"
          label="姓名">
      </el-table-column>
      <el-table-column
          align="center"
          prop="userId"
          label="工号">
      </el-table-column>
      <el-table-column
          align="center"
          prop="groupName"
          label="组别">
      </el-table-column>
      <el-table-column
          align="center"
          prop="isLeader"
          label="小组角色">
      </el-table-column>
      <el-table-column
          align="center"
          prop="projects"
          label="项目组">
          <template slot-scope="scope">
            <!-- {{scope.row.projects}}} -->
            <div v-for="(item,index) in scope.row.projects" :key="index">
              <p>{{item.projectName}}</p>
            </div>
          </template>
      </el-table-column>
      <el-table-column
          align="center"
          prop="projects"
          label="项目角色">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.projects" :key="index">
              <p>{{item.projectRole}}</p>
            </div>
          </template>
      </el-table-column>
    </el-table>
    <div class="history">
      <h3 class="history-title">历史考核记录</h3>
      <el-table
        :data="historyData"
        border
        fit
        :header-cell-style="{color:'#46a5fe'}"
        style="width: 100%"
        size="mini"
        max-height="180"
        v-if="this.historyData.length!=0">
        <el-table-column
            fixed
            align="center"
            prop="scoreTime"
            label="考核月份">
        </el-table-column>
        <el-table-column
            align="center"
            prop="userName"
            label="姓名">
        </el-table-column>
        <el-table-column
            align="center"
            prop="userId"
            label="工号">
        </el-table-column>
        <el-table-column
            align="center"
            prop="groupData"
            label="小组考核">
            <el-table-column
              align="center"
              prop="groupData.groupName"
              label="组名"
              width="100">
            </el-table-column>
            <el-table-column
              align="center"
              prop="groupData.groupLeader"
              label="考核者">
            </el-table-column>
            <el-table-column
              align="center"
              prop="groupWeight"
              label="权重">
            </el-table-column>
            <el-table-column
              align="center"
              prop="groupData.groupScore"
              label="分数">
            </el-table-column>
        </el-table-column>
        <el-table-column
            align="center"
            label="项目考核">
            <el-table-column
              align="center"
              label="项目名" width="200">
              <template slot-scope="scope" v-if="scope.row.projectData.length">
                <div v-for="(item,index) in scope.row.projectData" :key="index">
                  <p>{{item.projectName}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="考核者">
              <template slot-scope="scope" v-if="scope.row.projectData.length">
                <div v-for="(item,index) in scope.row.projectData" :key="index">
                  <p>{{item.projectLeader}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="projectWeight"
              label="权重">
            </el-table-column>
            <el-table-column
              align="center"
              label="分数">
              <template slot-scope="scope" v-if="scope.row.projectData.length">
                <div v-for="(item,index) in scope.row.projectData" :key="index">
                  <p>{{item.projectScore}}</p>
                </div>
              </template>
            </el-table-column>
        </el-table-column>
        <!-- <el-table-column
            align="center"
            label="项目成员项目完成度">
            <el-table-column
              align="center"
              label="项目名" width="200">
              <template slot-scope="scope" v-if="scope.row.allMemberScoreData.length">
                <div v-for="(item,index) in scope.row.allMemberScoreData" :key="index">
                  <p>{{item.projectName}}</p>
                </div>
              </template>
            </el-table-column> 
            <el-table-column
              align="center"
              label="详细信息"
              width="400">
                <template slot-scope="scope" v-if="scope.row.allMemberScoreData.length">
                  <div v-for="(item,index) in scope.row.allMemberScoreData" :key="index">
                    <el-table
                      :data="item.memberMessage"
                      border
                      style="width:100%"
                      size="mini">
                      <el-table-column
                          align="center"
                          prop="memberName"
                          label="姓名">
                      </el-table-column>
                      <el-table-column
                          align="center"
                          prop="memberId"
                          label="工号">
                      </el-table-column>
                      <el-table-column
                          align="center"
                          prop="memberScore"
                          label="评分">
                      </el-table-column>
                  </el-table>
                  </div>
                </template>
            </el-table-column>
        </el-table-column> -->
        <el-table-column
            align="center"
            label="项目完成度">
            <el-table-column
              align="center"
              label="项目名" width="200">
              <template slot-scope="scope" v-if="scope.row.ownScoreData.length">
                <div v-for="(item,index) in scope.row.ownScoreData" :key="index">
                  <p>{{item.projectName}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="ownWeight"
              label="权重">
            </el-table-column>
            <el-table-column
              align="center"
              label="分数">
              <template slot-scope="scope" v-if="scope.row.ownScoreData.length">
                <div v-for="(item,index) in scope.row.ownScoreData" :key="index">
                  <p>{{item.ownScore}}</p>
                </div>
              </template>
            </el-table-column>
        </el-table-column>
        <el-table-column
            fixed="right"
            align="center"
            prop="totalScore"
            label="总分">
        </el-table-column>
      </el-table>
      <div class="pagination" v-if="this.historyData.length>=3">
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
import {baseInfo} from '../../utils/service.js'
import {getCookie} from '../../utils/cookie.js'
export default {
  name: 'Personal',
  data () {
    return {
      userInfo:[],
      userImg:'',
      historyData:[],
      //分页
      total:0,
      pageSize:6,
      currentPage:1
    }
  },
  mounted(){
    this.setPerTable()
    this.historyTable()
  },
  methods:{
    setPerTable(){
      axios.get(baseInfo.baseURL+'/personal/info',{
        params: {
            cookie:getCookie('byd_performance')
          }
      })
      .then((res)=>{
        // console.log(res.data)
        if(res.data.code==0){
          this.userInfo=res.data.detail.userInfo
          this.userImg=baseInfo.baseURL+res.data.detail.userAvatar  
        }else{
          this.$message.error(res.data.code)
        }
       }).catch(function (error) {
          console.log(error)
        })
    },
    historyTable(){
      axios.get(baseInfo.baseURL+'/score-history/person-info',{
        params: {
            cookie:getCookie('byd_performance')
          }
      }).then((res)=>{
        // console.log(res.data)
        if(res.data.code==0){
          this.historyData=res.data.detail.historyData
        }else{
          this.$message.error(res.data.message)
        }
       }).catch(function (error) {
          console.log(error)
        })
    },
    //分页
    handlePageChange(currentPage) {
      this.currentPage = currentPage   
    },
  }
}
</script>
<style lang="stylus" scoped>
  @import '~styles/mixins.styl' 
  .personal
    .personal-title
      side-title()
    .img-title
      color:#ecf0f5
      font-size: 1rem
      font-family: 'Source Sans Pro',sans-serif;
    .personal-img
      display:block
      width:6rem
      margin:0 auto;
      border-radius: 50%
    .history-title
      side-title()

</style>

