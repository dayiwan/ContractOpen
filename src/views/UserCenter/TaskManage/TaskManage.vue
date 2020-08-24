<template>
    <el-container>
        <el-header style="height: 75px">
            <div class="left">任务管理</div>
            <div class="right">
                <span class="active" @click="btnNow()">进行中</span>
                <span @click="history()">已完成</span>
            </div>
        </el-header>
        <el-main>
            <div class="resource_header">
                <div class="left_tab">
                    <div class="total">任务总量:
                        <span>{{info.total}}</span>
                    </div>
                    <div class="source">当前任务量:
                        <span>{{info.now}}</span>
                    </div>
                    <div class="use-total">历史任务量:
                        <span>{{info.history}}</span>
                    </div>
                </div>
            </div>
            <div class="resource-list">
                <TaskItem :TaskItem="tableData" />
            </div>
            <el-footer>
                <el-pagination
                    class="pagination"
                    background
                    small
                    layout="prev, pager, next, total"
                    :page-size="pagination.pageSize"
                    @current-change="pageChange"
                    :total="pagination.total">
                </el-pagination>
            </el-footer>
        </el-main>
    </el-container>
</template>

<script>
import TaskItem from "./components/TaskItem.vue"
import { getMyTaskApi } from "@/api/MyTask.js"
import { getTaskInfoApi } from "@/api/TaskManage.js"
export default {
    name: "taskManage",
    components: {
        TaskItem
    },
    mounted(){
        this.getTaskList(),
        this.getTaskInfo()
    },
    data() {
        return {
            tableData: [],
            pagination:{
                currentPage: 1,
                pageSize: 10,
                total: 0
            },
            info: {
                total: '',
                now: '',
                history: ''
            },
            stateMap: new Map([['0', '未开始'], ['1', '运行中'], ['2', '已取消'], ['3', '已结束']])
        }
    },
    methods: {
        //获取任务统计信息
        async getTaskInfo(){
            const res = await getTaskInfoApi()
            this.info.total = res.taskCount
            this.info.now = res.taskNotStartCount
            this.info.history = res.taskEndCount
        },
        //获取当前任务列表
        async getTaskList(){
            var params = {
                "page":this.pagination.currentPage,
                "limit":this.pagination.pageSize,
                "taskStatus": "0"
            };
            const res = await getMyTaskApi(JSON.stringify(params))
            this.pagination.total = res.totalCount
            this.tableData = res.list
            for (let i = 0; i < this.tableData.length; i++){
                this.tableData[i].executionStatus = this.stateMap.get(this.tableData[i].executionStatus)
            }
        },
        //翻页
        pageChange(page){
            this.pagination.currentPage = page;
            this.getTaskList();
        },
        history:function () {
            this.$router.push({name:'taskHistoryManage'})
        },
        btnNow:function () {
            this.$router.push({name:'taskManage'})
        },
    }
}
</script>


<style lang="scss" scoped>
@import "./TaskManage.scss"
</style>