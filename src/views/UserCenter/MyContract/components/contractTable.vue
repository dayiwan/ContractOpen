<template>
    <div class="table">
        <el-table :data="ResourceItem" style="width: 100%">
            <!-- <el-table-column  prop="id" width="60" label="编号" align="center">
            </el-table-column> -->
            <el-table-column prop="taskName" label="任务名称" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column prop="uuid" label="契约号" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column prop="purpose" label="任务描述" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column  label="" align="center">
            </el-table-column>
        </el-table>
        <div class="table_footer">
            <span>下单时间:{{ResourceItem[0].createTime}}</span>
            <span>订单号：{{ResourceItem[0].uuid}}</span>
            <div class="btn">
                <el-button type="primary" size="mini" @click="btnDetail(ResourceItem[0].uuid)" class="detail">查看详情</el-button>
                <el-button type="primary" size="mini" @click="btnDownload(row)" class="download">凭证下载</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "contractTable",
    props: {
        ResourceItem: {
            type: Array
        }
    },
    methods: {
        btnDetail(id){
            this.$router.push({
                name: 'MyContractDetail',
                query: {id}
            });
        },
        btnDownload:function () {
            this.$confirm('是否确定下载凭证?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '下载成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消操作!'
                });
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .table {
        margin-bottom: 20px;
        background: #fff;
    }

    .el-table {
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
