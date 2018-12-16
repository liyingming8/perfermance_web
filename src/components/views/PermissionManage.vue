<template>
    <div class="role">
        <el-button
            type="primary"
            round
            style="margin:2rem 0 1rem 0;"
            size="mini">
                BOSS设置
        </el-button>
        <el-table
            :data="bossData"
            style="width:100%;"
            size="mini"
            border
            :header-cell-style="{color:'#46a5fe'}"
            algin="center"
            fix>
            <el-table-column
                align="center"
                prop="bossId"
                label="工号">
            </el-table-column>
            <el-table-column
                align="center"
                prop="bossName"
                label="姓名">
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="editBoss(scope.$index,scope.row)" size="mini">设置</el-button>
                    <!-- <el-button type="primary" @click="deleteBoss(scope.$index,scope.row)" size="mini">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="修改BOSS"
            :visible.sync="dialogEditBoss"
            center
            width="25rem">
            <span slot="title">
                <span style="color:#20a0ff;">BOSS设置</span>
            </span>
            <el-form ref="editBossForm" :model="editBossForm" :rules="rules" status-icon label-width="90px" size="mini">
                <el-form-item label="修改Boss" prop="bossId">
                    <el-select size="mini" style="width:90%" v-model="editBossForm.bossId" filterable clearable placeholder="请选择(可输入姓名或工号查找)">
                        <el-option
                            v-for="item in bossSelectData"
                            :key="item.leaderId"
                            :label="'工号:'+item.leaderId+'=>姓名:'+item.leader"
                            :value="item.leaderId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="text-align:right;margin:0px auto;">
                    <el-button type="primary" @click="submitBossForm" size="mini">提交</el-button>
                    <el-button @click="concelBossForm" size="mini">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- <el-dialog
            :visible.sync="dialogDeleteBoss"
             width="20rem">
            <span slot="title">
                <span style="color:#20a0ff;">删除BOSS</span>
            </span>
            <span style="color:#e6a23c;font-size:1.2rem;text-align:center">您确定要删除BOSS吗？</span>
            <span slot="footer" style="text-align:right;margin:0px auto;">
                <el-button @click="dialogDeleteBoss = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="confirmDeleteBoss" size="mini">确 定</el-button>
            </span>
        </el-dialog> -->
        <div>
            <el-button
                type="primary"
                round
                style="margin:1rem 0 0 0;"
                size="mini">
                    角色权限设置
            </el-button>
            <div class="tab-container">
                <el-tabs style='margin:1rem;' v-model="activeName" type="border-card">
                    <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key">
                        <!-- <keep-alive> -->
                            <el-table
                                :data="rolePermissionData"
                                border
                                fit
                                style="width:100%"
                                size="mini">
                                <el-table-column
                                    align="center"
                                    label="个人页面">
                                    <template slot-scope="scope">
                                        <el-switch
                                            disabled
                                            v-if="scope.$index==0"
                                            v-model="scope.row.PersonalPage"
                                            active-value="100"
                                            :inactive-value="null"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                        <el-switch
                                            disabled
                                            v-if="scope.$index==1"
                                            v-model="scope.row.PersonalPage"
                                            :active-value="1"
                                            :inactive-value="0"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    label="绩效填写">
                                    <template slot-scope="scope">
                                        <el-switch
                                            v-if="scope.$index==0"
                                            v-model="scope.row.BeReviewedPage"
                                            active-value="200"
                                            :inactive-value="null"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                        <el-switch
                                            v-if="scope.$index==1"
                                            v-model="scope.row.BeReviewedPage"
                                            :active-value="1"
                                            :inactive-value="0"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    label="小组考核">
                                    <template slot-scope="scope">
                                        <el-switch
                                            v-if="scope.$index==0"
                                            v-model="scope.row.LeaderReviewPage"
                                            active-value="300"
                                            :inactive-value="null"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                        <el-switch
                                            v-if="scope.$index==1"
                                            v-model="scope.row.LeaderReviewPage"
                                            :active-value="1"
                                            :inactive-value="0"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    label="项目考核">
                                    <template slot-scope="scope">
                                        <el-switch
                                            v-if="scope.$index==0"
                                            v-model="scope.row.ProjectReviewPage"
                                            active-value="400"
                                            :inactive-value="null"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                        <el-switch
                                            v-if="scope.$index==1"
                                            v-model="scope.row.ProjectReviewPage"
                                            :active-value="1"
                                            :inactive-value="0"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    label="项目Schedule"
                                    width="110">
                                    <template slot-scope="scope">
                                        <el-switch
                                            v-if="scope.$index==0"
                                            v-model="scope.row.ProjectSchedulePage"
                                            active-value="901"
                                            :inactive-value="null"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                        <el-switch
                                            v-if="scope.$index==1"
                                            v-model="scope.row.ProjectSchedulePage"
                                            :active-value="1"
                                            :inactive-value="0"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    label="小组管理">
                                    <template slot-scope="scope">
                                        <el-switch
                                            v-if="scope.$index==0"
                                            v-model="scope.row.GroupManagePage"
                                            active-value="500"
                                            :inactive-value="null"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                        <el-switch
                                            v-if="scope.$index==1"
                                            v-model="scope.row.GroupManagePage"
                                            :active-value="1"
                                            :inactive-value="0"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    label="项目管理">
                                    <template slot-scope="scope">
                                        <el-switch
                                            v-if="scope.$index==0"
                                            v-model="scope.row.ProjectManagePage"
                                            active-value="600"
                                            :inactive-value="null"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                        <el-switch
                                            v-if="scope.$index==1"
                                            v-model="scope.row.ProjectManagePage"
                                            :active-value="1"
                                            :inactive-value="0"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    label="用户管理">
                                    <template slot-scope="scope">
                                        <el-switch
                                            v-if="scope.$index==0"
                                            v-model="scope.row.UserManagePage"
                                            active-value="700"
                                            :inactive-value="null"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                        <el-switch
                                            v-if="scope.$index==1"
                                            v-model="scope.row.UserManagePage"
                                            :active-value="1"
                                            :inactive-value="0"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    label="权限管理">
                                    <template slot-scope="scope">
                                        <el-switch
                                            v-if="scope.$index==0"
                                            v-model="scope.row.PermissionManagePage"
                                            active-value="800"
                                            :inactive-value="null"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                        <el-switch
                                            v-if="scope.$index==1"
                                            v-model="scope.row.PermissionManagePage"
                                            :active-value="1"
                                            :inactive-value="0"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    label="考核控制">
                                    <template slot-scope="scope">
                                        <el-switch
                                            v-if="scope.$index==0"
                                            v-model="scope.row.TimeSettingPage"
                                            active-value="900"
                                            :inactive-value="null"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                        <el-switch
                                            v-if="scope.$index==1"
                                            v-model="scope.row.TimeSettingPage"
                                            :active-value="1"
                                            :inactive-value="0"
                                            active-color="#13ce66"
                                            inactive-color="#eaecf0">
                                        </el-switch>
                                        <!-- <span v-if="scope.row.TimeSettingPage==900||scope.row.TimeSettingPage==1" style="color:green;font-size:18px;">√</span>
                                        <span v-else style="color:red;font-size:18px;">X</span> -->
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    label="修改权限">
                                    <template slot-scope="scope">
                                        <el-button v-if="scope.$index==0" size="mini" type="primary" @click="modifyPermission">页面权限</el-button>
                                        <el-button v-if="scope.$index==1" size="mini" type="primary" @click="modifyPermission">操作权限</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        <template>
                            <el-button :plain="true" style="color:#20a0ff;margin-top:1rem;" @click="notes" size="small">操作前提醒</el-button>
                        </template>
                    </el-tab-pane>
                </el-tabs>
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
        name:"PermissionManage",
        data(){
            return{
                bossData:[],
                // dialogDeleteBoss:false,
                dialogEditBoss:false,
                // deletBossId:'',
                editBossForm:{
                    bossId:''
                },
                bossSelectData:[],
                //校检规则
                rules:{
                    bossId:[
                        { validator: (rule, value, callback)  => {
                            if (!value) {
                                return callback(new Error('未选择boss'));
                            }else{
                                for(let i=0; i<this.bossData.length; i++){
                                    if(value==this.bossData[i].bossId){
                                        return callback(new Error('该成员已经是boss'));
                                    }
                                }
                                callback()
                            }
                        }, trigger: 'blur'}
                    ]
                },
                tabMapOptions: [
                    { label: '管理员', key: 'Admin' },
                    { label: 'Boss', key: 'Boss' },
                    { label: '小组组长', key: 'RTL' },
                    { label: '架构师', key: 'ARC' },
                    { label: '项目负责人', key: 'SPDM' },
                    { label: '功能组长', key: 'FGL' },
                    { label: '项目成员', key: 'FO' },
                    { label: '游客', key: 'Guest' }
                ],
                activeName: 'Admin',
                rolePermissionAllData:[],
                rolePermissionData:[],
            }
        },
        mounted(){
            this.setBossTable()
            this.setRolePermission()
        },
        watch : {
            'activeName':function(val) { //监听切换状态
                switch (val)
                {
                case "Admin":
                    this.rolePermissionData=this.rolePermissionAllData.Admin;
                break;
                case "Boss":
                    this.rolePermissionData=this.rolePermissionAllData.Boss;
                break;
                case "ARC":
                    this.rolePermissionData=this.rolePermissionAllData.ARC;
                break;
                case "SPDM":
                    this.rolePermissionData=this.rolePermissionAllData.SPDM;
                break;
                case "FGL":
                    this.rolePermissionData=this.rolePermissionAllData.FGL;
                break;
                case "RTL":
                    this.rolePermissionData=this.rolePermissionAllData.RTL;
                break;
                case "FO":
                    this.rolePermissionData=this.rolePermissionAllData.FO;
                break;
                case "Guest":
                    this.rolePermissionData=this.rolePermissionAllData.Guest;
                break;
                default:
                    this.$message.error("返回权限code错误")
                }
            }
        },
        methods:{
            setBossTable(){
                axios.get(baseInfo.baseURL+'/boss/info',{
                    params:{
                        cookie:getCookie('byd_performance')
                    }}).then((res)=>{
                        if(res.data.code==0){
                            this.bossData=[]
                            // console.log(res.data.detail)
                            this.bossData.push(res.data.detail.bossData)
                        }else{
                            this.$message.error(res.data.message)
                        }
                        }).catch(function (error) {
                            console.log(error)
                        })
            },
            editBoss(index,row){
                this.dialogEditBoss=true
                axios.get(baseInfo.baseURL+'/group/optional-user',{
                params:{
                    cookie:getCookie('byd_performance')
                }}).then((res)=>{
                    if(res.data.code==0){
                        this.bossSelectData=res.data.detail.leaderSelectData

                    }else{
                        this.$message.error(res.data.message)
                    } // console.log(this.bossSelectData)
                    }).catch(function (error) {
                        console.log(error)
                    })
            },
            submitBossForm(){
                //表单验证
                this.$refs.editBossForm.validate((valid) => {
                if (valid) {
                    axios.post(baseInfo.baseURL+'/boss/update',{
                        cookie:getCookie('byd_performance'),
                        bossId:this.editBossForm.bossId
                        }).then((res)=>{
                            // console.log(res.data)
                            if(res.data.code==0){
                                this.setBossTable();
                                this.$message({
                                message: '修改成功',
                                type: 'success'
                                });
                                this.$refs.editBossForm.resetFields();
                                this.dialogEditBoss=false;
                            }else{
                                this.$message.error(res.data.message)
                                 this.setBossTable();
                            }
                            }).catch(function (error) {
                                console.log(error)
                            })

                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            concelBossForm(){
                if (this.$refs.editBossForm!==undefined) {
                this.$refs.editBossForm.resetFields();
                this.dialogEditBoss=false
                }
            },
            // deleteBoss(index,row){
            //     this.dialogDeleteBoss=true
            //     this.deletBossId=row.bossId
            // },
            // confirmDeleteBoss(){
            //     axios.post(baseInfo.baseURL+'/boss/delete',qs.stringify({
            //         cookie:getCookie('byd_performance'),
            //         bossId:this.deletBossId,
            //     })).then((res)=>{
            //         if(res.data.code==0){
            //             this.setBossTable();
            //             this.$message({
            //                 message: '删除成功',
            //                 type: 'success'
            //                 });
            //             this.dialogDeleteBoss=false;
            //         }else{
            //             this.setBossTable();
            //             this.$message.error(res.date.message);
            //         }
            //         }).catch(function (error) {
            //             console.log(error)
            //         })
            // },
            setRolePermission(){
                //'static/mock/rolePermission.json'
                //baseInfo.baseURL+'/Validation/Setting'
                axios.get(baseInfo.baseURL+'/Validation/Setting',{
                    params: {
                        cookie:getCookie('byd_performance')
                    }
                }).then((res)=>{
                    // console.log(res)
                    if(res.data.code==0){
                        this.activeName="Admin"
                        this.rolePermissionAllData=res.data.detail
                        this.rolePermissionData=this.rolePermissionAllData.Admin
                    }else{
                        this.$message.error(res.data.message)
                    }
                    }).catch(function (error) {
                        console.log(error)
                    })
            },
            modifyPermission(){
                // console.log(this.activeName)
                // console.log(this.rolePermissionData)
                axios.post(baseInfo.baseURL+'/Validation/updateSetting',{
                cookie:getCookie('byd_performance'),
                roleName:this.activeName,
                rolePermission:this.rolePermissionData
                }).then((res)=>{
                    // console.log(res.data)
                    if(res.data.code==0){
                        this.setRolePermission();
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                            });
                    }else{
                        this.setRolePermission();
                        this.$message.error(res.data.message)
                    }
                    }).catch(function (error) {
                        console.log(error)
                    })
            },
            notes() {
                this.$message({
                showClose: true,
                message: '更改权限后需用右边按钮提交方可生效哦',
                type: 'warning'
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'

</style>
