<template>
  <div style="width:20%;margin-left:40%;margin-top:50px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="原密码" prop="pass"> 
                    <el-input v-model="ruleForm.pass" placeholder="请输入原密码" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpass">
                <el-input v-model="ruleForm.newpass" placeholder="请输入新密码" type="password"></el-input>
            </el-form-item>
            <el-form-item label="重复新密码" prop="checknewpass">
                <el-input v-model="ruleForm.checknewpass" placeholder="请再次输入新密码" type="password"></el-input>
            </el-form-item>
        </el-form>
        <div style="margin-left:75%">
        <el-button type="primary" @click="submitPassword">提交</el-button>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import {baseInfo} from '../utils/service.js'
import {getCookie,delCookie} from '../utils/cookie.js'
export default {
    name:"Password",
    data() {
        var validatePass2 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.ruleForm.newpass) {
                callback(new Error("两次输入密码不一致!"));
                    } else {
                    callback();
                }
            }
        return {
            ruleForm:{
                pass:'',
                newpass:'',
                checknewpass:''

            },
            rules:{
            pass: [ { required: true, message: "请输入密码" } ],
            newpass: [ { required: true, message: "请输入新密码" } ],
            checknewpass: [ { required: true, validator: validatePass2, trigger: "blur" } ]
            }
        }
    },
    methods:{
        submitPassword(ruleForm) {
            this.$refs.ruleForm.validate(valid => {
            if (valid) {
                axios.post(baseInfo.baseURL+'/login/changePassword',qs.stringify({
                    cookie:getCookie('byd_performance'),
                    oldPassword:this.ruleForm.pass,
                    newPassword:this.ruleForm.newpass
                })).then( (res)=>{
                    if(res.data.code==0){
                        this.$message({
                        message: '密码修改成功',
                        type: 'success'
                        })
                        this.$router.push('/personal')
                    }else{
                        this.$message.error(res.data.message)
                        this.ruleForm.pass=""
                        this.ruleForm.newpass=""
                        this.ruleForm.checknewpass=""
                    }
                }).catch(function (error) {
                    console.log(error)
                })
            }else{
                console.log('error submit!!')
                return false
            }
            })
        }
    }
}
</script>


<style lang="stylus" scoped>

</style>
