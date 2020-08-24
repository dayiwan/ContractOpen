<template>
    <el-container>
        <el-header style="height: 75px">
            <div class="left">契约管理</div>
            <div class="right">
                <span class="active" @click="btnUse()">数据使用契约</span>
                <span @click="btnGet()">数据提供契约</span>
            </div>
        </el-header>
        <el-main>
            <ContractTable v-for="(item,index) in tableData" :key="index" :ResourceItem="item"></ContractTable>
        </el-main>
        <el-footer>
            <el-pagination
            class="pagination"
            background
            layout="prev, pager, next, total"
            :page-size="pagination.pageSize"
            @current-change="pageChange"
            :total="pagination.total">
            </el-pagination>
        </el-footer>
    </el-container>
</template>

<script>
import ContractTable from "./components/contractTable";
import { getUseContractListApi } from "@/api/ContractManage.js";
import { getUserName } from "@/utils/cookies.js";
export default {
    name: "contractManage",
    components: {ContractTable},
    data() {
        return {
            tableData: [],
            pagination:{
                currentPage: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    mounted(){
        this.getUseContractList()
    },
    methods: {
        //获取数据使用契约列表
        async getUseContractList(){
            var params = {
                "page": this.pagination.currentPage,
                "limit": this.pagination.pageSize,
            }
            const res = await getUseContractListApi(JSON.stringify(params))
            this.pagination.total = res.totalCount;
            const tableList = res.list 
            let tableArray = []
            for (let i = 0; i < tableList.length; i++){
                let contract = []
                const create = tableList[i].createTime
                tableList[i].createTime = create.split("T")[0];
                contract.push(tableList[i])
                tableArray.push(contract)
                this.tableData = tableArray
            }
        },
        //翻页
        pageChange(page){
            this.pagination.currentPage = page;
            this.getUseContractList();
        },
        btnUse: function () {
            this.$router.push({name:"contractManage"})
        },
        btnGet: function () {
            this.$router.push({name:"contractManageGet"})
        }
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
                border: 1px #207eff solid;
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
    /deep/ .el-main {
        padding: 0
    }
    .el-footer{
        margin-top: 40px;
        background: #ffffff;
        /deep/ .el-pager .active{
            border: 1px solid #efefef;
        }
        border: 1px #ebeef5 solid;
    }
</style>
