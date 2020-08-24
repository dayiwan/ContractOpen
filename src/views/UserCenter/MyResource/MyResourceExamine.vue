<template>
    <div class="resource-page">
        <HeaderExamineItem @dataName="search"></HeaderExamineItem>
        <ExamineTable v-for="(item,index) in tableData" :key="index" :ResourceItem="item"></ExamineTable>
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
    </div>
</template>

<script>
import HeaderExamineItem from "./components/HeaderExamineItem";
import ExamineTable from "./components/examineTable";
import { getExamineResourceApi } from "@/api/MyResource.js";
import { getUserName } from "@/utils/cookies.js";
export default {
    name: "MyResourceExamine",
    components: {
        ExamineTable, 
        HeaderExamineItem
    },
    data(){
        return {
            tableData: [],
            pagination:{
                currentPage: 1,
                pageSize: 10,
                total: 0
            },
            blockDataName: "",
            stateMap: new Map([[0, '未通过'], [1, '已通过']])
        }
    },
    mounted(){
        this.getExamineResouseList()
    },
    methods: {
        //搜索
        search(name){
            this.blockDataName = "";
            this.blockDataName = name;
            this.getExamineResouseList();
        },
        // 翻页
        pageChange(page){
            this.pagination.currentPage = page;
            this.getExamineResouseList();
        },
        // 拉取数据列表
        async getExamineResouseList(){
            var params = {
                "sellerName":getUserName(),
                "isShare":"0",
                "page":this.pagination.currentPage,
                "limit":this.pagination.pageSize,
                "blockDataName": this.blockDataName
            }
            const res = await getExamineResourceApi(JSON.stringify(params));
            const tableList = res.list;
            this.pagination.total = res.totalCount;
            let tableArray = []
            for (let i = 0; i < tableList.length; i++){
                let order = []
                const create = tableList[i].createTime
                const update = tableList[i].updateTime
                tableList[i].createTime = create.split("T")[0]
                tableList[i].updateTime = update.split("T")[0]
                tableList[i].shareStatus = this.stateMap.get(tableList[i].shareStatus)
                order.push(tableList[i])
                tableArray.push(order)
                this.tableData = tableArray
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .header {
        width: 100%
    }
    .el-footer {
        background: #ffffff;
        /deep/ .el-pager .active {
            border: 1px solid #efefef;
        }
    }
    /deep/.el-pagination--small .btn-next, .el-pagination--small .btn-prev, .el-pagination--small .el-pager li, .el-pagination--small .el-pager li.btn-quicknext, .el-pagination--small .el-pager li.btn-quickprev, .el-pagination--small .el-pager li:last-child{min-width: 32px;width: 32px;line-height: 32px;font-size: 14px}
</style>
