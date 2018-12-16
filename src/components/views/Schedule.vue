<template>
  <div>
    <div class="projectList">
      <el-button
            v-for="item in schedule"
            :key="item.index"
            type="primary"
            round
            style="margin:1rem 1rem 1rem 0;"
            size="mini"
            @click="initTaskData(item)">
               {{item.projectName}}
      </el-button>
    </div>
    <div class="container">
      <div class="right-container" v-if="tasks.data!=[]">
        <div class="gantt-selected-info" style="padding-left:1rem;">
          <div v-if="selectedTask">
            <h3>{{selectedTask.text}}</h3>
            <span><b>任务ID: </b>{{selectedTask.id}}</span><br/>
            <span><b>进度: </b>{{selectedTask.progress|toPercent}}%</span><br/>
            <span><b>开始时间: </b>{{selectedTask.start_date|niceDate}}</span><br/>
            <span><b>结束时间: </b>{{selectedTask.end_date|niceDate}}</span><br/>
          </div>
          <div v-else class="select-task-prompt">
            <h4 style="color:#a6a6a6;">点击项目组和任务栏显示详情</h4>
          </div>
        </div>
        <!-- <ul class="gantt-messages">
          <li class="gantt-message" v-for="message in messages" :key="message.index">{{message}}</li>
        </ul> -->
      </div>
      <gantt v-if="tasks.data!=[]" class="left-container" :tasks="tasks" @task-updated="logTaskUpdate" @link-updated="logLinkUpdate" @task-selected="selectTask"></gantt>
    </div>
    <el-button :plain="true" style="color:#20a0ff;" @click="notes" size="small">操作前提醒</el-button>
  </div>

</template>

<script>
import axios from 'axios'
import qs from 'qs'
import {baseInfo} from '../../utils/service.js'
import {getCookie} from '../../utils/cookie.js'
import Gantt from './module/Gantt.vue'
import '../../../node_modules/dhtmlx-gantt/codebase/locale/locale_cn.js'
export default {
  name: 'Schedule',
  components: {Gantt},
  data () {
    return {
      schedule:[],
      tasks: {
        data: [],
        projectName:''
        // links: [
        //   {id: 1, source: 1, target: 2, type: '0'}
        // ]
      },
      taskState:false,
    selectedTask: null,
      // messages: []
    }
  },
  filters: {
    toPercent (val) {
      if(!val) return '0'
      return Math.round((+val) * 100)
    },
    niceDate (obj){
      return `${obj.getFullYear()} / ${obj.getMonth() + 1} / ${obj.getDate()}`
    }
  },
  mounted(){
    this.initSchedule()
  },
  methods: {
    selectTask (task) {
      this.selectedTask = task
    },
    // addMessage (message) {
    //   this.messages.unshift(message)
    //   if(this.messages.length > 40) {
    //     this.messages.pop()
    //   }
    // },
    logTaskUpdate (id, mode,task) {
      if(mode=='updated'||mode=='inserted'){
      axios.post(baseInfo.baseURL+'/schedule/save',qs.stringify({
        cookie:getCookie('byd_performance'),
        projectName:this.tasks.projectName,
        id:task.id,
        text:task.text,
        start_date:task.start_date.getDate()+'-'+(task.start_date.getMonth()+1)+'-'+task.start_date.getFullYear(),
        duration:task.duration,
        progress:task.progress,
      })).then((res)=>{
          // console.log(res.data)
          if(res.data.code==0){
              this.initSchedule()
              this.$message({
                  message: '更新成功',
                  type: 'success'
              })
          }else{
              this.$message.error(res.data.message)
          }
          }).catch(function (error) {
              console.log(error)
          })
      }else if(mode=='deleted'){
        axios.post(baseInfo.baseURL+'/schedule/delete',qs.stringify({
        cookie:getCookie('byd_performance'),
        id:id
      })).then((res)=>{
          // console.log(res.data)
          if(res.data.code==0){
              this.initSchedule()
              this.$message({
                  message: '删除成功',
                  type: 'success'
              })
          }else{
              this.$message.error(res.data.message)
          }
          }).catch(function (error) {
              console.log(error)
          })
      }
      // let message = `Task ${mode}: ${id} ${text}`
      // this.addMessage(message)
      // console.log(message)
    },
    logLinkUpdate (id, mode, link) {
      // let message = `Link ${mode}: ${id}`
      // if(link){
      //   message += ` ( source: ${link.source}, target: ${link.target} )`
      // }
      // this.addMessage(message)
    },
    initSchedule(){
      axios.get(baseInfo.baseURL+'/schedule/info',{
        params: {
            cookie:getCookie('byd_performance')
          }
        }).then(res=> {
          if(res.data.code==0){
            // console.log(res)
            this.schedule=res.data.detail.schedule
          }else{
            this.$message.error(res.data.message)
          }
        }).catch(function (error) {
            console.log(error)
        })
    },
    initTaskData(item){
      this.tasks.data=item.tasks
      this.tasks.projectName=item.projectName
      // this.taskState=true;   
      // console.log(this.tasks.data)
    },
    notes() {
            this.$message({
            showClose: true,
            message: '请点击切换到对应项目进行任务的创建/更新/删除，任务更改后会弹出提示，如无提示请刷新页面重试',
            type: 'warning'
            })
        }
  }
}
</script>

<style>
  .container {
    height: 100%;
    width: 100%;
    background:#ecf0f5;
  }

  .left-container {
    overflow: hidden;
    position: relative;
    height: 100%;
    height:29.3rem;
  }

  .right-container {
    border-right: 1px solid #cecece;
    float: right;
    width: 15rem;
    margin-left:0.5rem;
    /* box-shadow: 0 0 0.3rem 0.1rem #aaa; */
    position: relative;
    z-index:2;
  }

  /* .gantt-messages {
    list-style-type: none;
    height:18.8rem;
    margin: 0;
    padding-left: 0.3rem;
  }

  .gantt-messages > .gantt-message {
    background-color: #f4f4f4;
    box-shadow:inset 0.3rem 0 #d69000;
    font-family: Geneva, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    margin: 0.3rem 0;
    padding: 0.5rem 0 0.5rem 0.6rem;
  }

  .gantt-selected-info {
    border-bottom: 1px solid #cecece;
    box-sizing: border-box;
    font-size: 1rem;
    font-family: Geneva, Arial, Helvetica, sans-serif;
    height: 50%;
    line-height: 2rem;
    padding: 0.8rem;
  }*/
  .gantt-selected-info {
   height:29.3rem;
   color:burlywood;
   background:#fff;
   overflow:hidden;
  }
  .gantt-selected-info h4 {
    border-bottom: 1px solid #cecece;
  }
  .select-task-prompt h4{
    color: #d9d9d9;
  }
</style>
