<template>
  <div style="width:20%;margin-left:40%;margin-top:100px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="工号" prop="userId"> 
                    <el-input v-model.number="ruleForm.userId" placeholder="请输入工号" type="text"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="userName">
                <el-input v-model="ruleForm.userName" placeholder="请输入新密码" type="text"></el-input>
            </el-form-item>
        </el-form>
        <div style="margin-left:75%">
        <el-button type="primary">提交</el-button>
        </div>
  </div>
</template>

<script>
export default {
    name:"ForgetPassword",
    data() {
        return {
            ruleForm:{
                userId:'',
                userName:''
            },
            rules:{
                userId: [ { required: true, type: 'number', message: '工号必须为数字'} ],
                userName: [ { required: true, message: "请输入正确姓名" }]
            }
        }
    }
}
</script>


<style lang="stylus" scoped>

</style>
