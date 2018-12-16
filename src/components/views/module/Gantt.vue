<template>
  <div ref="gantt"></div>
</template>
<script>
import 'dhtmlx-gantt'
import axios from 'axios'
import qs from 'qs'
import {baseInfo} from '../../../utils/service.js'
import {getCookie} from '../../../utils/cookie.js'
export default {
  name: 'gantt',
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [],projectName:''}
      }
    }
  },
  //通过计算属性获取data值
  // computed: {
  //   taskChange:function () {
  //     return this.$props.tasks
  //   }
  // },
  //深度监听tasks的变化,并更新子组件data
  watch: {
    tasks:{
        handler (val) {
          // console.log(val)
          //清除数据
          // gantt.clearAll(this.$refs.gantt)
          // //重新初始化gantt数据这个会有bug无法更新progress状态
          // this.$_initGanttEvents()
          // gantt.init(this.$refs.gantt)
          //重新赋值,使用延时功能刷新修复progress刷新bug
          // gantt.parse(this.$props.tasks) 
          // console.log(val)
          setTimeout(()=>{
            gantt.clearAll(this.$refs.gantt)
            gantt.parse(this.$props.tasks) 
          },2000)
        },
        deep:true
      }
  },
  methods: {
    $_initGanttEvents: function () {
      if(gantt.$_eventsInitialized)
        return;
      gantt.attachEvent('onTaskSelected', (id) => {
        let task = gantt.getTask(id)
        this.$emit('task-selected', task)
      })

      gantt.attachEvent('onAfterTaskAdd', (id, task) => {
        task.progress = task.progress || 0
        this.$emit('task-updated', id, 'inserted', task)
        if(gantt.getSelectedId() == id) {
          this.$emit('task-selected', task)
        }
      })

      gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
        task.progress = task.progress || 0
        this.$emit('task-updated', id, 'updated', task)
        if(gantt.getSelectedId() == id) {
          this.$emit('task-selected', task)
        }
      })
      gantt.attachEvent('onAfterTaskDelete', (id) => {
        this.$emit('task-updated', id, 'deleted')
        if(!gantt.getSelectedId()) {
          this.$emit('task-selected', null)
        }
      })
      // gantt.attachEvent('onAfterLinkAdd', (id, link) => {
      //   this.$emit('link-updated', id, 'inserted', link)
      // })

      // gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
      //   this.$emit('link-updated', id, 'updated', link)
      // })

      // gantt.attachEvent('onAfterLinkDelete', (id, link) => {
      //   this.$emit('link-updated', id, 'deleted')
      // })
      gantt.$_eventsInitialized = true;
    }
  },

  mounted () {
    this.$_initGanttEvents();
    // gantt.config.autofit = true;
    // gantt.config.autosize = "xy";
    // gantt.config.calendar_property = "assign";
    gantt.init(this.$refs.gantt)

    gantt.parse(this.$props.tasks)
  }
}
</script>

<style>
  @import "../../../../node_modules/dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
