<template>
    <div class="group">
        <el-button 
            type="primary" 
            round
            icon="el-icon-edit"
            style="margin:2rem 0 1rem 0;" 
            size="mini"
            @click="addGroup">
                创建小组
        </el-button>
        <el-input
            placeholder="请输入组名进行搜索"
            clearable
            style="width:12rem;"
            size="mini"
            @keyup.enter.native="searchGroupData"
            prefix-icon="el-icon-search"
            v-model="keywords">
        </el-input>
        <el-table
            :data="groupData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border
            :header-cell-style="{color:'#46a5fe'}"
            algin="center"
            fix
            v-if="this.groupData.length!=0"
            style="width: 100%;"
            size="mini">
            <el-table-column
                align="center"
                prop="groupName"
                label="组名">
            </el-table-column>
            <el-table-column
                align="center"
                label="组长"
                >
                <template slot-scope="scope">
                    <el-tooltip placement="right">
                        <div slot="content">
                            <template v-if="scope.row.groupLeader">
                                <div>
                                    <el-tag size="mini">组长姓名</el-tag>
                                    {{scope.row.groupLeader.leaderName}}
                                </div>
                                <div>
                                    <el-tag size="mini">组长工号</el-tag>
                                    {{scope.row.groupLeader.idNumber}}
                                </div>
                            </template>
                        </div>
                        <el-tag size="primary">{{scope.row.groupLeader?scope.row.groupLeader.leaderName:'未设置'}}</el-tag>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="组员">
                <template slot-scope="scope">
                    <el-tooltip placement="right">
                        <div slot="content" style="width:10rem;max-height:25rem;overflow-y:scroll">
                            <template v-if="scope.row.groupMembers">
                                <div v-for="(item,index) in scope.row.groupMembers" :key="index">
                                    <div>
                                        <el-tag size="mini">组员姓名</el-tag>
                                        {{item.memberName}}
                                        <el-tag size="mini">组员工号</el-tag>
                                        {{item.idNumber}}
                                    </div>
                                </div>
                            </template>
                        </div>
                        <el-tag size="primary">{{scope.row.groupMembers.length==0?'未设置':'组员信息'}}</el-tag>        
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column align="center" width="200" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="editGroup(scope.$index,scope.row)" size="mini">修改</el-button>
                    <el-button type="primary" @click="removeGroup(scope.$index,scope.row)" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination" v-if="this.groupData.length>7">
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
            <el-button :plain="true" style="color:#20a0ff;" @click="notes" size="small">操作前提醒</el-button>
        </template>
        <el-dialog
            :visible.sync="dialogAddVisible"
            center
            width="25rem">
            <span slot="title">
                <span style="color:#20a0ff;">新建小组</span>
            </span>
            <el-form ref="newGroupForm" :model="newGroupForm" :rules="group" status-icon label-width="80px" size="mini">
                <el-form-item label="小组名" prop="groupName" required style="width:90%">
                    <el-input v-model="newGroupForm.groupName"></el-input>
                </el-form-item>
                <el-form-item label="小组组长" style="width:90%" required prop="groupLeader">
                    <el-autocomplete
                        class="inline-input"
                        v-model="newGroupForm.groupLeader"
                        :fetch-suggestions="querySearchLeader"
                        placeholder="请输入工号查找"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item style="text-align:right;margin:0px auto;">
                    <el-button type="primary" @click="submitForm" size="mini">提交</el-button>
                    <el-button @click="concelForm" size="mini">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            :visible.sync="dialogEditGroup"
            width="30rem"
            center>
            <span slot="title">
                <span style="color:#20a0ff;">修改小组信息</span>
            </span>
            <el-table
                border
                size="mini"
                max-height="200"
                style="margin-bottom:20px;"
                v-if="this.existedRowData.groupMembers!=0"
                :data="existedRowData.groupMembers"
                :header-cell-style="{color:'#46a5fe'}"
                algin="center"
                fix>
                <el-table-column
                    align="center"
                    prop="memberName"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="idNumber"
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
            <el-form ref="editGroupForm" :model="editGroupForm" :rules="rules" status-icon label-width="70px" size="mini">
                <el-form-item label="修改组长" prop="groupLeader">
                    <el-select size="small" style="width:60%" v-model="editGroupForm.groupLeader" filterable clearable placeholder="请选择(可输入姓名或工号查找)">
                        <el-option
                            v-for="item in leaderSelectData"
                            :key="item.leaderId"
                            :label="'工号:'+item.leaderId+'=>姓名:'+item.leader"
                            :value="item.leaderId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="新增组员" prop="groupMembers">
                    <el-select size="small" style="width:80%" v-model="editGroupForm.groupMembers" multiple filterable placeholder="请选择(可输入姓名或工号查找)">
                        <el-option
                            v-for="item in memberSelectData"
                            :key="item.memberId"
                            :label="'工号:'+item.memberId+'=>姓名:'+item.member"
                            :value="item.memberId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="text-align:right;margin:0px auto;">
                    <el-button type="primary" @click="submitEditForm" size="mini">提交</el-button>
                    <el-button @click="concelEditForm" size="mini">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            :visible.sync="dialogDeleteGroup"
            width="20rem">
            <span slot="title">
                <span style="color:#20a0ff;">删除小组</span>
            </span>
            <span style="color:#e6a23c;font-size:1.2rem;text-align:center">您确定要删除该小组吗？</span>
            <span slot="footer" style="text-align:right;margin:0px auto;">
                <el-button @click="dialogDeleteGroup = false" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="confirmDeleteGroup">确 定</el-button>
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
    name:"GroupManage",
    data(){
        return{
            //已有组信息
            oldGroupData:[],
            groupData:[],
            oldGroupData:[],
            dialogAddVisible:false,
            dialogEditGroup:false,
            dialogDeleteGroup:false,
            //新建组提交的表单数据
            newGroupForm: {
                groupName: '',
                groupLeader:'',
            
            },
            //编辑小组表单
            editGroupForm:{
                groupName:'',
                groupLeader:'',
                groupMembers:[],
            },
            leaderSelectData:[],
            memberSelectData:[],
            //修改信息
            memberLength:"",
            existedRowData:[],
            deleteGroup:"",
            //校验规则
            group:{
                groupName:[
                    { validator: (rule, value, callback)  => {
                        if (!value) {
                            return callback(new Error('小组名不能为空'));
                        }else{
                            for(let i=0; i<this.groupData.length; i++){
                                if(value==this.groupData[i].groupName){
                                    return callback(new Error('该小组名已存在'));
                                }
                            }
                            callback()
                        }
                    }, trigger: 'blur'}
                ],
                groupLeader:[
                     { validator: (rule, value, callback)  => {
                        if (!value) {
                            return callback(new Error('组长不能为空'));
                        }else{
                            // console.log(value.split("=")[0])
                            //检测是否为可选的工号
                            const arr=new Array()
                            for(let i=0; i<this.leaderSelectData.length; i++){
                                arr.push(this.leaderSelectData[i].leaderId)
                            }
                            if(arr.indexOf(value.split("=")[0])==-1){
                                    return callback(new Error('工号不正确'))
                                }
                        }
                        callback()
                    }, trigger: 'blur'}
                ],
            },
            rules:{
                groupLeader:[
                     { validator: (rule, value, callback)  => {
                        if (!value&&this.editGroupForm.groupMembers.length==0) {
                            if(this.memberLength==this.existedRowData.groupMembers.length){
                                return callback(new Error('未作任何更改，请勿提交'));
                            }
                            callback()
                        }else if(value){
                            for(let i=0; i<this.groupData.length; i++){
                                //防止删除人员删除了组长导致idNumber取不到
                                if(this.groupData[i].groupLeader){
                                    if(value==this.groupData[i].groupLeader.idNumber){
                                        return callback(new Error(this.groupData[i].groupLeader.idNumber+'已经是组长，请重新选择'));
                                    }
                                }
                                callback()
                            }
                        }
                        callback()
                    }, trigger: 'blur'}
                ],
                groupMembers:[
                    { validator: (rule, value, callback)  => {
                        if (value.length==0&&!this.editGroupForm.groupLeader) {
                            if(this.memberLength==this.existedRowData.groupMembers.length){
                                return callback(new Error('未作任何更改，请勿提交'));
                            }
                            callback()
                        }else if(value.length!==0){
                            for(let i=0; i<value.length; i++){
                                if(value[i]==this.editGroupForm.groupLeader){
                                    return callback(new Error('组长和组员不可是同一人，请重新选择'));
                                }
                                callback()
                            }
                        }
                        callback()
                    }, trigger: 'blur'}
                ]
            },
            keywords:"",
            //分页
            total:0,
            pageSize:7,
            currentPage:1
            
        }
    },
    mounted(){
        this.setGroupTable()
    },
    watch:{
        keywords: function(val, oldVal){
            this.groupData = this.oldGroupData.filter( item => (~item.groupName.indexOf(val))); 
             this.total=this.groupData.length
        }
    },
    computed: {
        searchGroupData(){
            if(this.keywords=""){
                this.groupData=this.oldGroupData
                this.total=this.groupData.length
            }
        }
    },
    methods:{
        setGroupTable(){
            axios.get(baseInfo.baseURL+'/group/optional-user',{
                params:{
                    cookie:getCookie('byd_performance')
                }}).then((res)=>{
                    if(res.data.code==0){
                        // console.log(res)
                        this.leaderSelectData=res.data.detail.leaderSelectData
                        this.memberSelectData=res.data.detail.MemberSelectData
                        // console.log(this.leaderSelectData,this.memberSelectData)
                    }else{
                        this.$message.error(res.data.message)
                    }
                    }).catch(function (error) {
                        console.log(error)
                    })
            axios.get(baseInfo.baseURL+'/group/info',{
                params:{
                    cookie:getCookie('byd_performance')
                }}).then((res)=>{
                    // console.log(res.data)
                    if(res.data.code==0){
                        // console.log(res.data.detail)
                    this.groupData=res.data.detail.groupData
                    this.oldGroupData=res.data.detail.groupData
                    this.total=res.data.detail.groupData.length
                    }else{
                        this.$message.error(res.data.message)
                    }
                    }).catch(function (error) {
                        console.log(error)
                    })
        },
        handlePageChange(currentPage) {
            this.currentPage = currentPage   
        },
        addGroup(){
            this.dialogAddVisible=true
            this.setGroupTable()
        },
        //leader查询
        querySearchLeader(queryString,callback){
            const leaderSelect=this.leaderSelectData
            for(let i of leaderSelect){
                i.value=i.leaderId+"=>"+i.leader;
            }
            var result=queryString?leaderSelect.filter(this.createFilterLeader(queryString)):leaderSelect
            callback(result)
        },
        createFilterLeader(queryString){
            return (leaderSelect)=>{
                return (leaderSelect.value.indexOf(queryString) === 0);
            }
        },
        //member查询
        querySearchMember(queryString,callback){
            const memberSelect=this.memberSelectData
            for(let i of memberSelect){
                i.value=i.memberId+"=>"+i.member;
            }
            var result=queryString?memberSelect.filter(this.createFilterMember(queryString)):memberSelect
            callback(result)
        },
        createFilterMember(queryString){
            return (memberSelect)=>{
                return (memberSelect.value.indexOf(queryString) === 0);
            }
        },
        //创建提交
        submitForm(newGroupForm) {
            //表单验证
            this.$refs.newGroupForm.validate((valid) => {
            if (valid) {
                axios.post(baseInfo.baseURL+'/group/create',qs.stringify({
                    cookie:getCookie('byd_performance'),
                    groupName:this.newGroupForm.groupName,
                    leaderId:this.newGroupForm.groupLeader.split("=>")[0],
                    })).then((res)=>{
                        // console.log(res.data)
                        if(res.data.code==0){
                            this.setGroupTable();
                            this.$message({
                            message: '创建成功',
                            type: 'success'
                            });
                            this.$refs.newGroupForm.resetFields(); 
                            this.dialogAddVisible=false;
                        }else{
                            this.$message.error(res.data.message)
                            this.setGroupTable(); 
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
        concelForm(newGroupForm) {
            if (this.$refs.newGroupForm!==undefined) {
            this.$refs.newGroupForm.resetFields(); 
            this.dialogAddVisible=false;
            }
         },
        //编辑小组
        editGroup(index,row){
            this.dialogEditGroup=true
            this.existedRowData=row
            this.memberLength=this.existedRowData.groupMembers.length
            this.setGroupTable()
        },
        deleteMember(index,row){
            this.existedRowData.groupMembers.splice(index,1)
        },
        submitEditForm(){
            this.$refs.editGroupForm.validate((valid) => {
                if (valid) {
                    //处理返回信息
                    for(let i=0; i<this.existedRowData.groupMembers.length; i++){
                        this.editGroupForm.groupMembers.push(this.existedRowData.groupMembers[i].idNumber)
                    }
                    //成员去重
                    const memberList=Array.from(new Set(this.editGroupForm.groupMembers));
                    axios.post(baseInfo.baseURL+'/group/group-update-member',{
                        cookie:getCookie('byd_performance'),
                        groupName:this.existedRowData.groupName,
                        groupLeader:this.editGroupForm.groupLeader,
                        groupMembers:memberList
                    }).then((res)=>{
                        // console.log(res.data)
                        if(res.data.code==0){
                            this.setGroupTable();
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$refs.editGroupForm.resetFields(); 
                            this.dialogEditGroup=false;
                        }else{
                            this.setGroupTable(); 
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
        concelEditForm(){
            if (this.$refs.editGroupForm!==undefined) {
            this.$refs.editGroupForm.resetFields(); 
            this.dialogEditGroup=false;
            }
        },
        //删除小组
        removeGroup(index,row){
            this.deleteGroup=row.groupName;
            this.dialogDeleteGroup=true;
        },
        confirmDeleteGroup(){
            axios.post(baseInfo.baseURL+'/group/delete-group',qs.stringify({
                cookie:getCookie('byd_performance'),
                groupName:this.deleteGroup,
                })).then((res)=>{
                    if(res.data.code==0){
                        this.setGroupTable();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                            });
                        this.dialogDeleteGroup=false;
                    }else{
                        this.setGroupTable(); 
                        this.$message.error(res.data.message)
                    }
                    }).catch(function (error) {
                        console.log(error)
                    })
        },
        notes() {
            this.$message({
            showClose: true,
            message: '组员和组长不能由同一人担任哦',
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
