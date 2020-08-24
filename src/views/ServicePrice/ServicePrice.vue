<template>
    <el-container>
        <el-header style="height: 75px">
            <div class="left">服务定价</div>
            <div class="right">
            </div>
        </el-header>
        <el-main>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        prop="taskName"
                        show-overflow-tooltip
                        label="定价维度">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="orderUuid"
                        show-overflow-tooltip
                        label="描述">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        align="center"
                        label="创建时间"
                        prop="createTime">
                </el-table-column>
                <!-- <el-table-column width="300px" align="center" label="操作">
                    <template>
                        <div style="text-align: center" class="btn">
                            <el-button type="primary" plain>详情</el-button>
                        </div>
                    </template>
                </el-table-column> -->
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination
            class="pagination"
            background
            layout="prev, pager, next, total"
            :total="12">
            </el-pagination>
        </el-footer>
    </el-container>
</template>

<script>
// import { getMyTaskApi, payTaskOrderApi, delTaskApi } from "@/api/MyTask.js"
export default {
    name: 'myTask',
    data() {
        return {
            tableData: [{
                taskName: "数据完整性",
                orderUuid: "数据信息是否存在缺失",
                createTime:"2020-02-13"
            },{
                taskName: "数据规范性",
                orderUuid: "数据符合数据标准、数据模型、元数据等标准规范",
                createTime:"2020-03-01"
            },{
                taskName: "数据时效性",
                orderUuid: "数据更新的时间跨度",
                createTime:"2020-03-11"
            },{
                taskName: "数据一致性",
                orderUuid: "数据符合数据标准、数据模型、元数据等标准规范",
                createTime:"2020-03-11"
            },{
                taskName: "数据可访问性",
                orderUuid: "数据能被访问的程度",
                createTime:"2020-03-13"
            },{
                taskName: "数据稀缺性",
                orderUuid: "数据能被获取拥有的难易程度",
                createTime:"2020-03-13"
            },{
                taskName: "数据敏感度",
                orderUuid: "数据是否涉及个人隐私、企业商业机密和国家秘密",
                createTime:"2020-03-14"
            },{
                taskName: "数据应用范围",
                orderUuid: "数据应用范围的边界",
                createTime:"2020-03-14"
            },{
                taskName: "数据使用期限和使用次数",
                orderUuid: "数据授权的期限和规定的使用次数",
                createTime:"2020-03-16"
            },{
                taskName: "数据历史成交价格",
                orderUuid: "提供相应数据或数据服务的历史成交价格",
                createTime:"2020-02-11"
            },{
                taskName: "数据被使用频率",
                orderUuid: "数据被成功调用的次数",
                createTime:"2020-01-28"
            }],
        }
    },
}
</script>
<style lang="scss" scoped>
.el-header{
    margin-top: 20px;
    margin-left: 12%;
    width: 76%;
    position: relative;
    line-height: 75px;
    background: #ffffff;
    font-size: 18px;
    font-weight: bolder;
    border: 1px #ebeef5 solid;
    padding-left: 30px;
    &:before{
        content: " ";
        display:block;
        height:30px;
        width: 4px;
        position: absolute;
        left: 20px;
        top: 22px;
        background: #217eff;
    }
    .left{
        float: left;
        font-size: 22px;
        color: #4f5b72;
        margin-left:15px;
    }
    .right{
        float: right;
        font-size: 14px;
        font-weight: normal;
    }
}
.el-main{
    width: 76%;
    margin-left: 12%;
    padding: 0px 0 !important;
    border: 1px #ebeef5 solid;
    margin-top: 20px;
}
.el-table .btn button{width: 80px;height: 35px;line-height: 35px;padding: 0px;background: #cce1ff;color: #2f7ae3;border: #2f7ae3 solid 1px }
.el-footer{
    width: 76%;
    margin-left: 12%;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #ffffff;
    /deep/ .el-pager .active{
        border: 1px solid #efefef;
    }
    border: 1px #ebeef5 solid;
}
</style>
