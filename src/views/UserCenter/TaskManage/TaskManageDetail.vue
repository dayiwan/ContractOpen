<template>
    <el-container>
        <el-header style="height: 75px">
            <div class="left">任务详情</div>
            <div class="right" @click="comeback">
                返回上一页
            </div>
        </el-header>
        <el-main>
            <div class="one">
            <el-row>
                <el-col :span="14">
                    <div class="left">
                        <div class="title">
                            {{title}}
                        </div>
                        <div class="title_sub">
                            参与方信息
                        </div>
                        <el-table
                                :data="tableData"
                                style="width: 100%"
                                tooltip-effect="dark"
                                height="350">
                            <el-table-column
                                    prop="party_name"
                                    label="参与方">
                            </el-table-column>
                            <el-table-column
                                    prop="data_count"
                                    label="数据量">
                            </el-table-column>
                            <el-table-column
                                    prop="data_desc"
                                    label="数据描述">
                            </el-table-column>
                        </el-table>
                        <div class="footer_box">
                            <span>算法名称<span>{{algo}}</span></span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="right">
                        <div class="box">
                            <span>完成率</span>
                            <div class="time">
                                <span>工作时间</span>
                                <div class="workTime">
                                    {{time}}
                                </div>
                            </div>
                        </div>
                        <div class="process">
                            <el-progress type="circle" :percentage=percentage :stroke-width="18" :width="260"></el-progress>
                        </div>
                    </div>
                </el-col>
            </el-row>
            </div>
            <div class="two">
                <div class="title">任务进度 <span>{{progress}}/5</span></div>
                <el-steps :active=have_progress align-center>
                    <el-step title="达成契约"></el-step>
                    <el-step title="任务启动"></el-step>
                    <el-step title="样本对齐"></el-step>
                    <el-step title="模型训练"></el-step>
                    <el-step title="模型审核"></el-step>
                </el-steps>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import { getTaskDetailApi } from "@/api/MyTask.js"
export default {
    name: "TaskManageDetail",
    data() {
        return {
            tableData: [],
            title: '',
            algo: '',
            progress: '',
            percentage: null,
            time: ''
        }
    },
    computed: {
        have_progress: function(){
          return Number(this.progress) - 1;
        }
    },
    mounted(){
        this.getTaskDetail();
    },
    methods: {
        //返回上一页
        comeback(){
            this.$router.go(-1)
        },
        //获取详情
        async getTaskDetail(){
            var params = {
                "taskUuid": this.$route.query.id
            };
            const res = await getTaskDetailApi(JSON.stringify(params));
            if (res.id === null){
                this.$confirm('任务尚未开始', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    this.$router.go(-1)
                    }).catch(() => {
                });
            } else {
                this.title = res.taskDetailInfo.task_name;
                this.tableData = res.taskDetailInfo.parties;
                this.algo = res.taskDetailInfo.algo_name;
                this.progress = res.taskDetailInfo.task_progress;
                this.percentage = res.taskDetailInfo.completion_rate
                this.time = res.time
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .el-header {
        position: relative;
        line-height: 75px;
        background: #ffffff;
        font-size: 18px;
        font-weight: bolder;
        border: 1px #ebeef5 solid;
        padding-left: 30px;

        &:before {
            content: " ";
            display: block;
            height: 30px;
            width: 4px;
            position: absolute;
            left: 20px;
            top: 22px;
            background: #217eff;
        }

        .left {
            float: left;
            font-size: 22px;
            color: #4f5b72;
            margin-left: 15px;
        }

        .right {
            float: right;
            font-size: 14px;
            font-weight: normal;
            cursor: pointer;

            span {
                padding: 8px 10px;
                color: #4A91FE;
                cursor: pointer;
                box-sizing: border-box;
                background: #E8F2FE;
            }

            span:nth-child(1) {
                border-bottom-left-radius: 4px;
                border-top-left-radius: 4px;
                border: 1px #9ec7ff solid;
                border-right: none;
            }

            span:nth-child(2) {
                border-bottom-right-radius: 4px;
                border-top-right-radius: 4px;
                border: 1px #207EFF solid;
            }

            .active {
                background: #207EFF;
                color: #ffffff;
            }
        }
    }
.no_result {
    @include flex(column);
    width: 100%;
    margin: 25px 0;
    img {
        height: 180px;
        margin-top: 40px;
    }
}
    .el-main {background: #fff;border-top: none;padding: 0px}
    .el-main .one{border-bottom: 1px #ebeef5 solid;padding: 0 20px 0px 20px}
    .el-main .left{padding:4% 5% 2% 2%;border-right: 1px #ebeef5 solid;}
    .el-main .left .title{font-size: 20px;color: #4f5b72;text-align: left}
    .el-main .left .title_sub{font-size: 16px;color: #333;margin-top: 20px;font-weight: bold;text-align: left;margin-bottom: 10px}
    .el-main .left .footer_box{height: 60px;line-height: 60px;text-align: left;}
    .el-main .left .footer_box span{font-size: 14px;color: #8a979e}
    .el-main .left .footer_box span span{color: #333;margin-left: 20px}
    /deep/.el-table .warning-row {background: #f7faff;}
    /deep/.el-table th>.cell{font-weight: normal}
    .el-main .right{padding: 4%;}
    .el-main .right .box{text-align: left;display: flex;justify-content: space-between;}
    .el-main .right .box span{font-weight: bold;color: #333;text-align: left}
    .el-main .right .box .time{text-align: center}
    .el-main .right .box .time span{font-size: 14px;font-weight: normal;color: #3a404e}
    .el-main .right .box .time .workTime{background: url("../../../assets/usercenter/border-raduis.png") center center no-repeat;background-size: 100%;width: 150px;height: 60px;line-height: 60px;text-align: center;color: #217eff;font-size: 20px;font-weight: bold}
    .el-main .right .process{margin-top: 5%}
    .el-main .two{padding: 2% 3%;border-bottom: 1px #ebeef5 solid;margin-bottom: 20px;text-align: left}
    .el-main .two .title{font-weight: bold}
    .el-main .two .title span{margin-left: 2%;}
    .el-main .two .el-steps{margin-top: 30px}
    /deep/.el-main .two .el-step__head.is-process .el-step__icon{background: #217eff;color: #fff;border-color: #217eff}
    /deep/.el-main .two .el-step__title.is-process{color: #217eff}
    .el-main .three{padding: 2% 3% 0 3%;border-bottom: 1px #ebeef5 solid;text-align: left}
    .el-main .three .title{font-weight: bold}
    .el-main .three .box{margin-top: 30px}
</style>
