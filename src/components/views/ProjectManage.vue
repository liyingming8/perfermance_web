<template>
    <div class="project">
        <el-button 
            type="primary" 
            round
            icon="el-icon-edit"
            style="margin:2rem 0 1rem 0;" 
            size="mini"
            @click="createProject">
                创建项目组
        </el-button>
        <el-input
            placeholder="请输入项目名进行搜索"
            clearable
            style="width:12rem;"
            size="mini"
            @keyup.enter.native="searchProjectData"
            prefix-icon="el-icon-search"
            v-model="keywords">
        </el-input>
        <el-table
            :data="projectGroupData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border
            :header-cell-style="{color:'#46a5fe'}"
            algin="center"
            fix
            v-if="this.projectGroupData.length!=0"
            size="mini"
            style="width: 100%;"
            >
            <el-table-column
                align="center"
                prop="featureGroupName"
                label="项目名">
            </el-table-column>
            <el-table-column
                align="center"
                prop="featureGroupSPDM"
                label="SPDM"
                width="180">
                <template slot-scope="scope">
                    <el-tooltip placement="right">
                        <div slot="content">
                            <template v-if="scope.row.featureGroupSPDM">
                                    <div>
                                        <el-tag size="mini">姓名:</el-tag>
                                        {{scope.row.featureGroupSPDM.userName}} 
                                    </div>
                                    <div>
                                        <el-tag size="mini">工号:</el-tag>
                                        {{scope.row.featureGroupSPDM.userId}}
                                    </div>
                            </template>
                        </div>
                        <el-tag>{{scope.row.featureGroupSPDM.userName?scope.row.featureGroupSPDM.userName:'暂未设置'}}</el-tag>
                    </el-tooltip>
                    <el-button
                        type="primary" 
                        icon="el-icon-edit" 
                        circle
                        size=mini
                        @click="changeSPDM(scope.$index,scope.row)"
                        >
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="featureGroupARC"
                label="ARC"
                width="180">
                <template slot-scope="scope">
                    <el-tooltip placement="right">
                        <div slot="content">
                            <template v-if="JSON.stringify(scope.row.featureGroupARC)!='{}'">
                                    <div>
                                        <el-tag size="mini">姓名:</el-tag>
                                        {{scope.row.featureGroupARC.userName}} 
                                    </div>
                                    <div>
                                        <el-tag size="mini">工号:</el-tag>
                                        {{scope.row.featureGroupARC.userId}}
                                    </div>
                            </template>
                        </div>
                        <el-tag>{{JSON.stringify(scope.row.featureGroupARC)!='{}'?scope.row.featureGroupARC.userName:'未设置'}}</el-tag>
                    </el-tooltip>
                    <el-button
                        type="primary" 
                        icon="el-icon-edit" 
                        circle
                        size=mini
                        @click="changeARC(scope.$index,scope.row)"
                        >
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="featureGroupLeader"
                label="FGL"
                width="180">
                <template slot-scope="scope">
                    <el-tooltip placement="right">
                        <div slot="content">
                            <template v-if="JSON.stringify(scope.row.featureGroupLeader)!='{}'">
                                    <div>
                                        <el-tag size="mini">姓名:</el-tag>
                                        {{scope.row.featureGroupLeader.userName}} 
                                    </div>
                                    <div>
                                        <el-tag size="mini">工号:</el-tag>
                                        {{scope.row.featureGroupLeader.userId}}
                                    </div>
                            </template>
                        </div>
                        <el-tag>{{JSON.stringify(scope.row.featureGroupLeader)!='{}'?scope.row.featureGroupLeader.userName:'未设置'}}</el-tag>
                    </el-tooltip>
                    <el-button
                        type="primary" 
                        icon="el-icon-edit" 
                        circle
                        size=mini
                        @click="changeFGL(scope.$index,scope.row)"
                        >
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="featureOwner"
                label="FO"
                width="180">
                <template slot-scope="scope">
                        <el-tooltip placement="right">
                            <div slot="content" style="width:10rem;max-height:25rem;overflow-y:scroll">
                                <template v-if="scope.row.featureOwner">
                                    <div v-for="(item,index) in scope.row.featureOwner" :key="index">
                                        <div>
                                            <el-tag size="mini">组员姓名</el-tag>
                                            {{item.userName}}
                                            <el-tag size="mini">组员工号</el-tag>
                                            {{item.userId}}
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <el-tag size="primary">{{scope.row.featureOwner.length==0?'未设置':'组员信息'}}</el-tag>          
                        </el-tooltip>
                        <el-button
                            type="primary" 
                            icon="el-icon-edit" 
                            circle 
                            size=mini
                            @click="changeFO(scope.$index,scope.row)"
                            >
                        </el-button>
                    </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="操作" width="188">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="deleteProject(scope.$index,scope.row)">删除项目组</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination" v-if="this.projectGroupData.length>7">
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
        <template>
            <el-button :plain="true" style="color:#20a0ff;margin-top:1rem;" @click="notes" size="small">操作前提醒</el-button>
        </template>
        <el-dialog
            :visible.sync="dialogCreateProject"
            center
            width="25rem">
            <span slot="title">
                <span style="color:#20a0ff;">新建项目组</span>
            </span>
            <el-form ref="createProjectForm" :model="createProjectForm" status-icon :label-position="labelPosition" :rules="rules" label-width="95px" size="mini">
                <el-form-item label="项目名" required prop="projectName" style="width:90%">
                    <el-input v-model="createProjectForm.projectName"></el-input>
                </el-form-item>
                <el-form-item required label="项目负责人" prop="spdmId">
                    <el-row class="demo-autocomplete">
                        <el-col :span="16">
                            <el-autocomplete
                                class="inline-input"
                                v-model="createProjectForm.spdmId"
                                :fetch-suggestions="querySearchSPDMmembers"
                                placeholder="请输入工号查找"
                            ></el-autocomplete>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item required label="功能组长" prop="leaderId">
                    <el-row class="demo-autocomplete">
                        <el-col :span="16">
                            <el-autocomplete
                                class="inline-input"
                                v-model="createProjectForm.leaderId"
                                :fetch-suggestions="querySearchleaderMembers"
                                placeholder="请输入工号查找"
                            ></el-autocomplete>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item style="text-align:right;margin:0px auto;">
                    <el-button type="primary" @click="submitCreateProject" size="mini">提交</el-button>
                    <el-button @click="concelCreateProject" size="mini">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            :visible.sync="dialogEditSPDM"
            center
            width="25rem">
            <span slot="title">
                <span style="color:#20a0ff;">修改项目负责人</span>
            </span>
            <el-form ref="editSPDMForm" :model="editSPDMForm" status-icon :label-position="labelPosition" :rules="rules" label-width="100px" size="mini">
                <el-form-item required label="项目负责人" style="width:90%" prop="spdmId">
                    <el-autocomplete
                        class="inline-input"
                        v-model="editSPDMForm.spdmId"
                        :fetch-suggestions="querySearchSPDMmembers"
                        placeholder="请输入工号查找"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item style="text-align:right;margin:0px auto;">
                    <el-button type="primary" @click="submitChangeSPDM" size="mini">提交</el-button>
                    <el-button @click="concelChangeSPDM" size="mini">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            :visible.sync="dialogEditARC"
            center
            width="25rem">
            <span slot="title">
                <span style="color:#20a0ff;">修改架构师</span>
            </span>
            <el-form ref="editARCForm" :model="editARCForm" :label-position="labelPosition" status-icon :rules="rules" label-width="100px" size="mini">
                <el-form-item label="项目架构师" required style="width:90%" prop="ARCId">
                    <el-autocomplete
                        class="inline-input"
                        v-model="editARCForm.ARCId"
                        :fetch-suggestions="querySearchARCMmembers"
                        placeholder="请输入工号查找"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item style="text-align:right;margin:0px auto;">
                    <el-button type="primary" @click="submitChangeARC" size="mini">提交</el-button>
                    <el-button @click="concelChangeARC" size="mini">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            :visible.sync="dialogEditFGL"
            center
            width="25rem">
            <span slot="title">
                <span style="color:#20a0ff;">修改功能组长</span>
            </span>
            <el-form ref="editFGLForm" :model="editFGLForm" :label-position="labelPosition" status-icon :rules="rules" label-width="100px" size="mini">
                <el-form-item label="功能组长" required style="width:90%" prop="leaderId">
                    <el-autocomplete
                        class="inline-input"
                        v-model="editFGLForm.leaderId"
                        :fetch-suggestions="querySearchleaderMembers"
                        placeholder="请输入工号查找"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item style="text-align:right;margin:0px auto;">
                    <el-button type="primary" @click="submitChangeFGL" size="mini">提交</el-button>
                    <el-button @click="concelChangeFGL" size="mini">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            :visible.sync="dialogEditFO"
            center
            width="35rem">
            <span slot="title">
                <span style="color:#20a0ff;">修改组员</span>
            </span>
            <el-table
                :data="existedMembers"
                border
                size="mini"
                :header-cell-style="{color:'#46a5fe'}"
                algin="center"
                fix
                v-if="this.existedMembers.length!=0"
                max-height="200"
                style="margin-bottom:1rem;">
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
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="deleteMember(scope.$index,scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-form ref="editFOForm" :model="editFOForm" :label-position="labelPosition" status-icon :rules="rules" label-width="100px" size="mini">   
                <el-form-item label="添加成员" style="width:90%" prop="featureOwnerId">
                    <el-select size="small" style="width:80%" v-model="editFOForm.featureOwnerId" multiple filterable placeholder="请选择(可输入姓名或工号查找)">
                        <el-option
                            v-for="item in foMembers"
                            :key="item.userId"
                            :label="'工号:'+item.userId+'=>姓名:'+item.userName"
                            :value="item.userId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="text-align:right;margin:0px auto;">
                    <el-button type="primary" @click="submitChangeFO" size="mini">提交</el-button>
                    <el-button @click="concelChangeFO" size="mini">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            :visible.sync="dialogDeleteProject"
            width="20rem">
            <span slot="title">
                <span style="color:#20a0ff;">删除项目</span>
            </span>
            <span style="color:#e6a23c;font-size:1.2rem;text-align:center">您确定要删除该项目吗？</span>
            <span slot="footer" style="text-align:right;margin:0px auto;">
                <el-button @click="dialogDeleteProject = false" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="confirmDeleteProject">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import {baseInfo} from '../../utils/service.js'
import {getCookie} from '../../utils/cookie.js'
export default {
    name:"ProjectManage",
    data(){
        return{
            labelPosition:"left",
            oldProjectGroupData:[],
            projectGroupData:[],
            dialogCreateProject:false,
            dialogEditSPDM:false,
            dialogEditARC:false,
            dialogEditFGL:false,
            dialogEditFO:false,
            dialogDeleteProject:false,
            //选择spmd/arc/fgl/fo成员数据
            leaderMembers:[],
            spdmMembers:[],
            arcMembers:[],
            foMembers:[],
            existedMembers:[],
            createProjectForm:{
                projectName:"",
                spdmId:"",
                leaderId:""
            },
            editSPDMForm:{
                projectName:"",
                spdmId:""
            },
            editARCForm:{
                projectName:"",
                ARCId:""
            },
            editFGLForm:{
                projectName:"",
                leaderId:""
            },
            editFOForm:{
                projectName:"",
                featureOwnerId:""
            },
            deleteProjectForm:"",
            //自定义表单验证
            rules: {
                projectName: [
                    { validator: (rule, value, callback)  => {
                        if (!value) {
                            return callback(new Error('项目名不能为空'));
                        }else{
                            for(let i=0; i<this.projectGroupData.length; i++){
                                if(value==this.projectGroupData[i].featureGroupName){
                                    return callback(new Error('项目名已存在'));
                                }
                            }
                            callback()
                        }
                    }, trigger: 'blur'}
                ],
                spdmId: [
                    { validator: (rule, value, callback)  => {
                        if (!value) {
                            return callback(new Error('请选择项目负责人'));
                        }else if(this.createProjectForm.leaderId===value){
                            return callback(new Error('项目负责人与功能组长不能相同'));
                        }else{
                            //检测是否为可选的工号
                            const arr=new Array()
                            for(let i=0; i<this.spdmMembers.length; i++){
                                arr.push(this.spdmMembers[i].userId)
                            }
                            if(arr.indexOf(value.split("=")[0])==-1){
                                    return callback(new Error('工号不正确'))
                                }
                        }
                        callback()
                    }, trigger: 'blur'}
                ],
                ARCId:[{
                    validator: (rule, value, callback)  => {
                        if (!value) {
                            return callback(new Error('请选择项目架构师'));
                        }else{
                            //检测是否为可选的工号
                            const arr=new Array()
                            for(let i=0; i<this.arcMembers.length; i++){
                                arr.push(this.arcMembers[i].userId)
                            }
                            if(arr.indexOf(value.split("=")[0])==-1){
                                    return callback(new Error('工号不正确'))
                                }
                        }
                        callback()
                    }, trigger: 'blur'}
                ],
                leaderId:[
                    { validator: (rule, value, callback)  => {
                        if (!value) {
                            return callback(new Error('请选择功能组长'));
                        }else if(this.createProjectForm.spdmId===value){
                            return callback(new Error('项目负责人与功能组长不能相同'));
                        }else{
                            //检测是否为可选的工号
                            const arr=new Array()
                            for(let i=0; i<this.leaderMembers.length; i++){
                                arr.push(this.leaderMembers[i].userId)
                            }
                            if(arr.indexOf(value.split("=")[0])==-1){
                                    return callback(new Error('工号不正确'))
                                }
                        }
                        callback()
                    }, trigger: 'blur'}
                ],
                featureOwnerId:[
                    { validator: (rule, value, callback)  => {
                            for(let i=0; i<this.existedMembers.length; i++){
                                for(let j=0; j<value.length; j++){
                                    if(value[j]==this.existedMembers[i].userId){
                                        return callback(new Error(this.existedMembers[i].userId+'已在组别中,请重新选择'));
                                    }
                                }
                            }
                            callback()
                    }, trigger: 'blur'}
                ]
            },
            keywords:'',
            //分页
            total:0,
            pageSize:7,
            currentPage:1
        }
    },
    mounted(){
        this.setProjectTable()
    },
    watch:{
        keywords: function(val, oldVal){
            this.projectGroupData = this.oldProjectGroupData.filter( item => (~item.featureGroupName.indexOf(val))); 
            this.total=this.projectGroupData.length
        }
    },
    computed: {
        searchProjectData(){
            if(this.keywords=""){
                this.projectGroupData=this.oldProjectGroupData
                this.total=this.groupData.length
            }
        }
    },  
    methods:{
        setProjectTable(){
            axios.get(baseInfo.baseURL+'/project/optional-user',{
                params:{
                    cookie:getCookie('byd_performance')
                }}).then((res)=>{
                    if(res.data.code==0){
                        this.spdmMembers=res.data.detail.spdmMembers
                        this.arcMembers=res.data.detail.arcMembers
                        this.leaderMembers=res.data.detail.leaderMembers
                        this.foMembers=res.data.detail.foMembers
                        // console.log(this.spdmMembers,this.leaderMembers,this.arcMembers)
                    }else{
                        this.$message.error(res.data.message)
                    }
                    }).catch(function (error) {
                        console.log(error)
                    })
            axios.get(baseInfo.baseURL+'/project/info',{
                params:{
                    cookie:getCookie('byd_performance')
                }}).then((res)=>{
                    if(res.data.code==0){
                        // console.log(res.data)
                        this.projectGroupData=res.data.detail.projectData
                        this.projectGroupData=res.data.detail.projectData
                        this.oldProjectGroupData=res.data.detail.projectData
                        this.total=res.data.detail.projectData.length
                    }else{
                        this.$message.error(res.data.message)
                    }
                    }).catch(function (error) {
                        console.log(error)
                    })
        },
        createProject(){
            this.dialogCreateProject=true
            this.setProjectTable()
        },
        //查询SPDM
        querySearchSPDMmembers(queryString,callback){
            const SPDMSelect=this.spdmMembers
            for(let i of SPDMSelect){
                i.value=i.userId+"=>"+i.userName;
            }
            var result=queryString?SPDMSelect.filter(this.createFilterSPDM(queryString)): SPDMSelect
            callback(result)
        },
        createFilterSPDM(queryString){
            return (SPDMSelect)=>{
                return (SPDMSelect.value.indexOf(queryString) === 0);
            }
        },
        //查询ARC
        querySearchARCMmembers(queryString,callback){
            const ARCSelect=this.arcMembers
            for(let i of ARCSelect){
                i.value=i.userId+"=>"+i.userName;
            }
            var result=queryString?ARCSelect.filter(this.createFilterARC(queryString)): ARCSelect
            callback(result)
        },
        createFilterARC(queryString){
            return (ARCSelect)=>{
                return (ARCSelect.value.indexOf(queryString) === 0);
            }
        },
        //查询FGL
        querySearchleaderMembers(queryString,callback){
            const leaderSelect=this.leaderMembers
            for(let i of leaderSelect){
                i.value=i.userId+"=>"+i.userName;
            }
            var result=queryString?leaderSelect.filter(this.createFilterFGL(queryString)): leaderSelect
            callback(result)
        },
        createFilterFGL(queryString){
            return (leaderSelect)=>{
                return (leaderSelect.value.indexOf(queryString) === 0);
            }
        },
        submitCreateProject(){
            this.$refs.createProjectForm.validate((valid) => {
                if (valid) {
                    //利用split方法分离ID并传到后台
                    axios.post(baseInfo.baseURL+'/project/create',qs.stringify({
                        cookie:getCookie('byd_performance'),
                        projectName:this.createProjectForm.projectName,
                        spdmId:this.createProjectForm.spdmId.split("=>")[0],
                        leaderId:this.createProjectForm.leaderId.split("=>")[0]
                        })).then((res)=>{
                            // console.log(res.data)
                            if(res.data.code==0){
                                this.setProjectTable();
                                this.$message({
                                message: '添加成功',
                                type: 'success'
                                });
                                this.$refs.createProjectForm.resetFields(); 
                                this.dialogCreateProject=false;

                            }else{
                                this.$message.error("添加失败")
                                this.setProjectTable(); 
                            }
                            }).catch(function (error) {
                                console.log(error)
                            })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        concelCreateProject(){
            if (this.$refs.createProjectForm!==undefined) {
                this.$refs.createProjectForm.resetFields(); 
                this.dialogCreateProject=false;
            }
        },
        changeSPDM(index,row){
            this.setProjectTable()
            this.dialogEditSPDM=true;
            this.editSPDMForm.projectName=row.featureGroupName
        },
        submitChangeSPDM(){
            this.$refs.editSPDMForm.validate((valid) => {
                if (valid) {
                   axios.post(baseInfo.baseURL+'/project/project-update-member',{
                        cookie:getCookie('byd_performance'),
                        projectName:this.editSPDMForm.projectName,
                        projectRole:"spdmMembers",
                        memberData:[{userId:this.editSPDMForm.spdmId.split("=>")[0]}]
                    }).then((res)=>{
                        // console.log(res.data)
                        if(res.data.code==0){
                            this.setProjectTable();
                            this.$message({
                            message: '修改成功',
                            type: 'success'
                            });
                            this.$refs.editSPDMForm.resetFields(); 
                            this.dialogEditSPDM=false;

                        }else{
                            this.setProjectTable(); 
                            this.$message.error(res.data.message)
                        }
                        }).catch(function (error) {
                            console.log(error)
                        })
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
                
        },
        concelChangeSPDM(){
            if (this.$refs.editSPDMForm!==undefined) {
            this.$refs.editSPDMForm.resetFields(); 
            this.dialogEditSPDM=false;
            }
        },
        changeARC(index,row){
            this.setProjectTable()
            this.dialogEditARC=true
            this.editARCForm.projectName=row.featureGroupName
        },
        submitChangeARC(){
            this.$refs.editARCForm.validate((valid) => {
                if (valid) {
                   axios.post(baseInfo.baseURL+'/project/project-update-member',{
                        cookie:getCookie('byd_performance'),
                        projectName:this.editARCForm.projectName,
                        projectRole:"arcMembers",
                        memberData:[{userId:this.editARCForm.ARCId.split("=>")[0]}]
                    }).then((res)=>{
                        // console.log(res.data)
                        if(res.data.code==0){
                            this.setProjectTable();
                            this.$message({
                            message: '修改成功',
                            type: 'success'
                            });
                            this.$refs.editARCForm.resetFields(); 
                            this.dialogEditARC=false;
                        }else{
                            this.setProjectTable(); 
                            this.$message.error(res.data.message)
                        }
                        }).catch(function (error) {
                            console.log(error)
                        })
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        concelChangeARC(){
            if (this.$refs.editARCForm!==undefined) {
            this.$refs.editARCForm.resetFields(); 
            this.dialogEditARC=false;
            }
        },
        changeFGL(index,row){
            this.setProjectTable()
            this.dialogEditFGL=true;
            this.editFGLForm.projectName=row.featureGroupName
        },
        submitChangeFGL(){
            this.$refs.editFGLForm.validate((valid) => {
                if (valid) {
                   axios.post(baseInfo.baseURL+'/project/project-update-member',{
                        cookie:getCookie('byd_performance'),
                        projectName:this.editFGLForm.projectName,
                        projectRole:"leaderMembers",
                        memberData:[{userId:this.editFGLForm.leaderId.split("=>")[0]}]
                    }).then((res)=>{
                        // console.log(res.data)
                        if(res.data.code==0){
                            this.setProjectTable();
                            this.$message({
                            message: '修改成功',
                            type: 'success'
                            });
                            this.$refs.editFGLForm.resetFields(); 
                            this.dialogEditFGL=false;
                        }else{
                            this.setProjectTable(); 
                            this.$message.error(res.data.message)
                        }
                        }).catch(function (error) {
                            console.log(error)
                        })
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        concelChangeFGL(){
            if (this.$refs.editFGLForm!==undefined) {
            this.$refs.editFGLForm.resetFields(); 
            this.dialogEditFGL=false;
            }
        },
        changeFO(index,row){
            this.setProjectTable()
            this.dialogEditFO=true
            this.editFOForm.projectName=row.featureGroupName
            this.existedMembers=row.featureOwner
        },
        submitChangeFO(){
            this.$refs.editFOForm.validate((valid) => {
                if (valid) {
                   //处理新成员与已有成员
                    const memberData=[];
                    for(let i=0; i<this.existedMembers.length; i++){
                        memberData.push({userId:this.existedMembers[i].userId})
                    }
                    for(let j=0; j<this.editFOForm.featureOwnerId.length; j++){
                        memberData.push({userId:this.editFOForm.featureOwnerId[j]})
                    }
                   axios.post(baseInfo.baseURL+'/project/project-update-member',{
                        cookie:getCookie('byd_performance'),
                        projectName:this.editFOForm.projectName,
                        projectRole:"foMembers",
                        memberData:memberData
                    }).then((res)=>{
                        // console.log(res.data)
                        if(res.data.code==0){
                            this.setProjectTable();
                            this.$message({
                            message: '修改成功',
                            type: 'success'
                            });
                            this.$refs.editFOForm.resetFields(); 
                            this.dialogEditFO=false;
                        }else{
                            this.setProjectTable(); 
                            this.$message.error(res.data.message)
                        }
                        }).catch(function (error) {
                            console.log(error)
                        })
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        concelChangeFO(){
            if (this.$refs.editFOForm!==undefined) {
            this.$refs.editFOForm.resetFields(); 
            this.dialogEditFO=false;
            }
        },
        deleteMember(index,row){
            // console.log(index,row)
            this.existedMembers.splice(index,1)
        },
        deleteProject(index,row){
            this.dialogDeleteProject=true
            this.deleteProjectForm=row.featureGroupName
        },
        confirmDeleteProject(){
            axios.post(baseInfo.baseURL+'/project/delete-project',qs.stringify({
                cookie:getCookie('byd_performance'),
                projectName:this.deleteProjectForm,
                })).then((res)=>{
                    // console.log(document.cookie)
                    // console.log(res.data)
                    if(res.data.code==0){
                        this.setProjectTable();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                            });
                        this.dialogDeleteProject=false;

                    }else{
                        this.setProjectTable(); 
                        this.$message.error(res.data.message)
                    }
                    }).catch(function (error) {
                        console.log(error)
                    })
        },
        //更改页码
        handlePageChange(currentPage) {
            this.currentPage = currentPage   
        },
        notes() {
            this.$message({
            showClose: true,
            message: '项目角色具有唯一性，每个人只能担任一种角色',
            type: 'warning'
            })
        }

    }
}

</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
    .pagination
        margin-top:10px;
        clearFix()
        .pageChange
            float:right  

</style>

