<template>
    <div class="controller">
        <el-button 
            type="primary" 
            round
            style="margin:1rem 0 0 0" 
            size="mini">
                考核时间设置
        </el-button>
        <div class="block">
            <span class="demonstration">选择考核月份:</span>
            <el-date-picker
                v-model="monthData"
                type="month"
                size="mini"
                :disabled="pickerSwicth"
                placeholder="请选择月份"
                value-format="yyyy-MM-dd"
                :picker-options="monthPickerOptions">
            </el-date-picker>
            <span class="demonstration">是否开启考核:</span>
            <el-switch
                v-model="openSwitch"
                active-text="开启考核"
                inactive-text="关闭考核"
                @change="reviewController">
            </el-switch>
        </div>
        <div>
            <el-button 
                v-if="this.FoWeightData.length!=0"
                type="primary" 
                round
                style="margin:1rem 0" 
                size="mini">
                    FO权重设置
            </el-button>
            <el-table
                v-if="this.FoWeightData.length!=0"
                :header-cell-style="{color:'#46a5fe'}"
                algin="center"
                fix
                border
                size="mini"
                :data="FoWeightData"
                style="width:100%;">
                <el-table-column align="center" label="RTL评分权重">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" style="width:50%" size="small" v-model.number="scope.row.RTL_SCORING_FO" type="number"></el-input>
                        </template>
                        <span v-else>{{ scope.row.RTL_SCORING_FO}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="FGL评分权重">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input style="width:50%" class="edit-input" size="small" v-model.number="scope.row.FGL_SCORING_FO" type="number"></el-input>
                        </template>
                        <span v-else>{{ scope.row.FGL_SCORING_FO}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="个人项目完成度">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" style="width:50%" size="small" v-model.number="scope.row.FO_SCORING_MYSELF" type="number"></el-input>
                        </template>
                        <span v-else>{{ scope.row.FO_SCORING_MYSELF}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.edit" @click="confirmEditFO(scope.row)" type="success" size="small" icon="el-icon-circle-check-outline">提交</el-button>
                        <el-button v-else @click='scope.row.edit=!scope.row.edit' size="small" type="primary" icon="el-icon-edit">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button 
                v-if="this.FGLWeightData.length!=0"
                type="primary" 
                round
                style="margin:1rem 0" 
                size="mini">
                    FGL权重设置
            </el-button>
            <el-table
                v-if="this.FGLWeightData.length!=0"
                :header-cell-style="{color:'#46a5fe'}"
                algin="center"
                fix
                border
                size="mini"
                :data="FGLWeightData"
                style="width:100%;">
                <el-table-column align="center" label="RTL评分权重">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="small" style="width:50%" v-model.number="scope.row.RTL_SCORING_FGL" type="number"></el-input>
                        </template>
                        <span v-else>{{ scope.row.RTL_SCORING_FGL}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="SPDM评分权重">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="small" style="width:50%" v-model.number="scope.row.SPDM_SCORING_FGL" type="number"></el-input>
                        </template>
                        <span v-else>{{scope.row.SPDM_SCORING_FGL}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="个人项目完成度">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="small" style="width:50%" v-model.number="scope.row.FGL_SCORING_MYSELF" type="number"></el-input>
                        </template>
                        <span v-else>{{ scope.row.FGL_SCORING_MYSELF}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.edit" @click="confirmEditFGL(scope.row)" type="success" size="small" icon="el-icon-circle-check-outline">提交</el-button>
                        <el-button v-else @click='scope.row.edit=!scope.row.edit' size="small" type="primary" icon="el-icon-edit">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button 
                v-if="this.SPDM_ARCWeightData.length!=0"
                type="primary" 
                round
                style="margin:1rem 0" 
                size="mini">
                    SPDM/ARC权重设置
            </el-button>
            <el-table
                v-if="this.SPDM_ARCWeightData.length!=0"
                :header-cell-style="{color:'#46a5fe'}"
                algin="center"
                fix
                border
                size="mini"
                :data="SPDM_ARCWeightData"
                style="width:100%;">
                <el-table-column align="center" label="RTL评分权重">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="small" style="width:50%" v-model.number="scope.row.RTL_SCORING_SPDM_OR_ARC" type="number"></el-input>
                        </template>
                        <span v-else>{{ scope.row.RTL_SCORING_SPDM_OR_ARC}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="总项目完成度">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="small" style="width:50%" v-model.number="scope.row.SPDM_OR_ARC_SCORING_MYSELF" type="number"></el-input>
                        </template>
                        <span v-else>{{ scope.row.SPDM_OR_ARC_SCORING_MYSELF}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.edit" @click="confirmEditSPDM(scope.row)" type="success" size="small" icon="el-icon-circle-check-outline">提交</el-button>
                        <el-button v-else @click='scope.row.edit=!scope.row.edit' size="small" type="primary" icon="el-icon-edit">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button
                v-if="this.RTLWeightData.length!=0" 
                type="primary" 
                round
                style="margin:1rem 0" 
                size="mini">
                    RTL权重设置
            </el-button>
            <el-table
                v-if="this.RTLWeightData.length!=0" 
                :header-cell-style="{color:'#46a5fe'}"
                algin="center"
                fix
                border
                size="mini"
                :data="RTLWeightData"
                style="width:100%;bottom:1rem;">
                <el-table-column align="center" label="BOSS评分权重">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="small" style="width:50%" v-model.number="scope.row.BOSS_SCORING_RTL" type="number"></el-input>
                        </template>
                        <span v-else>{{ scope.row.BOSS_SCORING_RTL}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label=" Team项目平均完成度">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="small" style="width:50%" v-model.number="scope.row.GROUP_MEMBER_AVG" type="number"></el-input>
                        </template>
                        <span v-else>{{ scope.row.GROUP_MEMBER_AVG}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.edit" @click="confirmEditRTL(scope.row)" type="success" size="small" icon="el-icon-circle-check-outline">提交</el-button>
                        <el-button v-else @click='scope.row.edit=!scope.row.edit' size="small" type="primary" icon="el-icon-edit">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import {baseInfo} from '../../utils/service.js'
import {getCookie} from '../../utils/cookie.js'
export default {
    name:"TimeSetting",
    data(){
        return{
            value1:"",
            monthData:"",
            openSwitch:false,
            pickerSwicth:false,
            monthPickerOptions:{
                disabledDate(time) {
                    return time.getTime() > Date.now()-3600 * 1000 * 24*30;
                },
                shortcuts: [{
                    text: '本月',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '上月',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24*30);
                    picker.$emit('pick', date);
                    }
                }]
            },
            FoWeightData:[],
            FGLWeightData:[],
            SPDM_ARCWeightData:[],
            RTLWeightData:[]
        }
    },
    mounted(){
        this.updateState()
        this.setWeightTable()
    },
    methods:{
        reviewController(){
             if(this.monthData){
                this.$router.go(0)
                axios.post(baseInfo.baseURL+'/scored-mode/setting',qs.stringify({
                        cookie:getCookie('byd_performance'),
                        scoreTime:this.monthData.substring(0,7),
                        state:this.openSwitch
                    })).then((res)=> {  
                        // console.log(res.data)
                        if(res.data.code==0){
                            this.pickerSwicth=!this.pickerSwicth
                            this.$message({
                                message: "操作成功",
                                type: 'success'
                                })
                        }else{
                            this.$message.error(res.data.message)
                        }
                    }).catch(function (error) {
                        console.log(error)
                    })
             }else{
                this.openSwitch=false
                this.$message.error("未选择考核开启月份")
             }     
        },
        //获取最新的开启和关闭状态
        updateState(){
            axios.get(baseInfo.baseURL+'/scored-mode/scored-state-turn-on',{
                params:{
                    cookie:getCookie('byd_performance')
                }
            }).then((res)=> {
                // console.log(res.data)
                 if(JSON.stringify(res.data.detail.scored_turn_on)!="{}"){
                    //  console.log(res.data.detail)
                    this.monthData=res.data.detail.scored_turn_on.scoredTime
                    this.pickerSwicth=true
                    this.openSwitch=true
                    this.$message({
                        message: this.monthData.substring(0,7)+'考核已开启',
                        type: 'success'
                        });   
                 }else{
                     this.pickerSwicth=false
                     this.monthData=""
                     this.openSwitch=false
                 }
            }).catch(function (error) {
                console.log(error)
            })
        },
        //权重模块
        setWeightTable(){
            //baseInfo.baseURL+'/score-weight/all'
            axios.get(baseInfo.baseURL+'/score-weight/all',{
                params:{
                    cookie:getCookie('byd_performance')
                }}).then((res)=>{
                    // console.log(res.data)
                    if(res.data.code==0){
                        const items=res.data.detail.weightDetail
                        items.map(vProperty => {
                            //设置可编辑属性
                            this.$set(vProperty, 'edit', false) 
                            return vProperty
                        })
                        // console.log(items)
                        this.FoWeightData=[]
                        this.FGLWeightData=[]
                        this.SPDM_ARCWeightData=[]
                        this.RTLWeightData=[]
                        this.FoWeightData.push(items[0])
                        this.FGLWeightData.push(items[1])
                        this.SPDM_ARCWeightData.push(items[2])
                        this.RTLWeightData.push(items[3])
                    }else{
                        this.$message.error(res.data.message) 
                    }
                    }).catch(function (error) {
                        console.log(error)
                    })
        },
        confirmEditFO(row){
            if(row.FGL_SCORING_FO+row.FO_SCORING_MYSELF+row.RTL_SCORING_FO==100){
                axios.post(baseInfo.baseURL+'/score-weight/update-weight1',qs.stringify({
                cookie:getCookie('byd_performance'),
                RTL_SCORING_FO:row.RTL_SCORING_FO,
                FGL_SCORING_FO:row.FGL_SCORING_FO,
                FO_SCORING_MYSELF:row.FO_SCORING_MYSELF
                })).then((res)=>{
                    // console.log(res.data)
                    if(res.data.code==0){
                        this.FoWeightData[0].edit=false
                        this.setWeightTable()
                        this.$message({
                        message: '修改成功',
                        type: 'success'
                        })
                    }else{
                        this.FoWeightData[0].edit=true
                        this.setWeightTable()
                        this.$message.error(res.data.message)
                    }
                    }).catch(function (error) {
                        console.log(error)
                    })
            }else{
                this.$message.error('总权重不等于100，请重新修改')
                this.FoWeightData[0].edit=true
            }   
        },
        confirmEditFGL(row){
            if(row.RTL_SCORING_FGL+row.SPDM_SCORING_FGL+row.FGL_SCORING_MYSELF==100){
                axios.post(baseInfo.baseURL+'/score-weight/update-weight2',qs.stringify({
                cookie:getCookie('byd_performance'),
                RTL_SCORING_FGL:row.RTL_SCORING_FGL,
                SPDM_SCORING_FGL:row.SPDM_SCORING_FGL,
                FGL_SCORING_MYSELF:row.FGL_SCORING_MYSELF
            })).then((res)=>{
                // console.log(res.data)
                if(res.data.code==0){
                    this.FGLWeightData[0].edit=false
                    this.setWeightTable()
                    this.$message({
                    message: '修改成功',
                    type: 'success'
                    })
                }else{
                    this.FGLWeightData[0].edit=true
                    this.setWeightTable()
                    this.$message.error(res.data.message)
                }
                }).catch(function (error) {
                    console.log(error)
                })
            }else{
                this.$message.error('总权重不等于100，请重新修改')
                this.FGLWeightData.edit=true
            }
            
        },
        confirmEditSPDM(row){
            if(row.RTL_SCORING_SPDM_OR_ARC+row.SPDM_OR_ARC_SCORING_MYSELF==100){
                axios.post(baseInfo.baseURL+'/score-weight/update-weight3',qs.stringify({
                cookie:getCookie('byd_performance'),
                RTL_SCORING_SPDM_OR_ARC:row.RTL_SCORING_SPDM_OR_ARC,    
                SPDM_OR_ARC_SCORING_MYSELF:row.SPDM_OR_ARC_SCORING_MYSELF
            })).then((res)=>{
                // console.log(res.data)
                if(res.data.code==0){
                    this.SPDM_ARCWeightData[0].edit=false
                    this.setWeightTable()
                    this.$message({
                    message: '修改成功',
                    type: 'success'
                    })
                }else{
                    this.SPDM_ARCWeightData[0].edit=true
                    this.setWeightTable()
                    this.$message.error(res.data.message)
                }
                }).catch(function (error) {
                    console.log(error)
                })
            }else{
                this.$message.error('总权重不等于100，请重新修改')
                this.SPDM_ARCWeightData.edit=true
            }
        },
        confirmEditRTL(row){
            if(row.BOSS_SCORING_RTL+row.GROUP_MEMBER_AVG==100){
                axios.post(baseInfo.baseURL+'/score-weight/update-weight4',qs.stringify({
                cookie:getCookie('byd_performance'),
                BOSS_SCORING_RTL:row.BOSS_SCORING_RTL,
                GROUP_MEMBER_AVG:row.GROUP_MEMBER_AVG
            })).then((res)=>{
                // console.log(res.data)
                if(res.data.code==0){
                    this.RTLWeightData[0].edit=false
                    this.setWeightTable()
                    this.$message({
                    message: '修改成功',
                    type: 'success'
                    })
                }else{
                    this.RTLWeightData[0].edit=true
                    this.setWeightTable()
                    this.$message.error(res.data.message)
                }
                }).catch(function (error) {
                    console.log(error)
                })
            }else{
                this.$message.error('总权重不等于100，请重新修改')
                this.RTLWeightData.edit=true
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
    .block
        margin:1rem auto;
    .demonstration
        margin-left:100px
        color:#46a5fe
        font-size:16px
</style>
