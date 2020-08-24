<template>
    <div class="table">
        <el-table :data="ResourceItem">
            <el-table-column prop="blockDataName" show-overflow-tooltip label="资源名称" align="center">
            </el-table-column>
            <el-table-column prop="price" label="积分" align="center">
            </el-table-column>
            <el-table-column prop="buyerName" label="使用方" align="center">
            </el-table-column>
            <el-table-column prop="shareStatus" label="审核状态" align="center">
            </el-table-column>
            <el-table-column prop="description" show-overflow-tooltip label="用途" align="center">
            </el-table-column>
            <el-table-column label=" " align="center">
            </el-table-column>
        </el-table>
        <div class="table_footer">
            <span>下单时间:{{ResourceItem[0].createTime}}</span>
            <span>订单号:{{ResourceItem[0].blockDataUuid}}</span>
            <div class="btn">
                <el-button type="primary" size="mini" @click="detail(ResourceItem[0].uuid)" class="detail">查看详情</el-button>
                <el-button type="primary" size="mini" @click="pass(ResourceItem[0].uuid)" class="pass">通过</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { passResourceApi } from "@/api/MyResource.js";
export default {
    name: "examineTable",
    props: {
        ResourceItem: {
            type: Array
        }
    },
    methods: {
        detail(id){
            this.$router.push({
                name: 'resourceExamineDetail',
                query: {id}
            });
        },
        async pass(id) {
            // this.$confirm('是否确定通过?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     this.$message({
            //         type: 'success',
            //         message: '通过成功!'
            //     });
            // }).catch(() => {
            //     this.$message({
            //         type: 'info',
            //         message: '取消操作!'
            //     });
            // })
            const res = await passResourceApi(id);
            this.$router.go(0);
        },
        // noPass:function () {
        //     this.$confirm('是否确定驳回?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {
        //         this.$message({
        //             type: 'success',
        //             message: '驳回成功!'
        //         });
        //     }).catch(() => {
        //         this.$message({
        //             type: 'info',
        //             message: '取消操作!'
        //         });
        //     });
        // }
    }
}
</script>

<style lang="scss" scoped>
    .table {
        margin-bottom: 20px;
        background: #fff;
    }

    .el-table {
        width: 95%;
        margin: 20px auto auto auto;
        .el-table__row {
            height: 92px;
            font-size: 16px;
            .el-table td, .el-table th.is-leaf {
                border: 1px #EBEEF5 dashed;
            }

            .el-table__header {
                border-bottom: 1px #EBEEF5 dashed;
            }

            .el-button-group {
                .el-button {
                    width: 65px;
                    height: 32px;
                    font-size: 14px;
                    margin-right: 7px;
                    border-radius: 10px;
                }
            }
        }

        .el-checkbox__inner {
            width: 18px;
            height: 18px
        }

        .el-checkbox__inner::after {
            width: 5px
        }
    }

    .table_footer {
        margin: auto;
        width: 95%;
        text-align: left;
        color: #ADB6BA;
        font-size: 14px;
        height: 60px;
        line-height: 60px;
        background: #ffffff;
        display: flex;
        justify-content: space-between;
        span {
            margin-right: 20px;
        }
    }
    .table_footer button{width: 100px;margin: 0 10px;height: 35px;font-size: 14px;border-radius: 5px}


    /deep/.el-table .cell {
        font-weight: normal
    }

    .el-table .el-table__row .el-button-group .el-button {
        border-radius: 4px
    }

    .imgUrl {
        width: 50px;
        height: 50px;
        border: 1px solid #efefef
    }

</style>
