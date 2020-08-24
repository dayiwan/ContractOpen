<template>
<div class="table">
    <el-table :data="TaskItem">
        <el-table-column prop="taskName" show-overflow-tooltip label="任务名称" align="center">
        </el-table-column>
        <el-table-column prop="orderUuid" show-overflow-tooltip label="契约号" align="center">
        </el-table-column>
        <el-table-column prop="userUuid" show-overflow-tooltip label="使用方" align="center">
        </el-table-column>
        <el-table-column prop="executionStatus" label="状态" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
            <template slot-scope="scope">
                <el-button-group>
                    <el-button type="primary" size="mini"  class="edit" @click="btnDetail(scope.row.taskUuid)">详情</el-button>
                    <el-button type="primary" size="mini"  class="start-end" @click="btnStart(scope.row.taskUuid)">启动</el-button>
                    <el-button type="danger" size="mini" class="delete">取消</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>
</div>

</template>

<script>
import { startTaskApi } from "@/api/MyTask.js"
export default {
    props: {
        TaskItem: {
            type: Array
        }
    },
    methods:{
        btnDetail:function (id) {
            this.$router.push(
                {
                    name:'taskManageDetail',
                    query: {id}
                }
            )
        },
        btnStart: function(id){
            this.$confirm('是否启动任务?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                var params = {
                    "operationMark": "0",
                    "taskUuid": id
                }
                await startTaskApi(JSON.stringify(params))
                this.$message({
                    type: 'success',
                    message: '启动成功!'
                });
                this.$router.go(0);
            }).catch(() => {
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.table {
    margin-bottom: 20px
}
.el-table {
    margin-top: 20px;

    .el-table__row {
        height: 92px;
        font-size: 16px;
        /*border: 1px  #909399 dashed;*/
        td:nth-child(6) {
            border-right: 1px dashed #EBEEF5;
        }

        td:nth-child(2) .cell {
            font-weight: bold;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .el-table td, .el-table th.is-leaf {
            border: 1px #EBEEF5 dashed;
        }

        .el-table__header {
            border-bottom: 1px #EBEEF5 dashed;
        }

        .el-button-group {
            .el-button {
                width: 60px;
                height: 32px;
                font-size: 14px;
                margin-right: 7px;
                border-radius: 10px;
            }
        }
    }

    .has-gutter tr th:first-child {
        .el-checkbox {
            display: none;
        }

        .cell {
            content: '选择';
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

.el-pagination--small .btn-next, .el-pagination--small .btn-prev, .el-pagination--small .el-pager li, .el-pagination--small .el-pager li.btn-quicknext, .el-pagination--small .el-pager li.btn-quickprev, .el-pagination--small .el-pager li:last-child {
    width: 28px;
    height: 28px;
    min-width: 28px;
    font-size: 14px;
    line-height: 28px
}

.el-pagination--small button, .el-pagination--small span:not([class*=suffix]) {
    height: 28px;
    line-height: 28px
}

.el-table .cell {
    font-weight: normal
}

.el-table .el-table__row .el-button-group .el-button {
    border-radius: 4px
}

.el-table .el-table__row .el-button-group .edit {
    background: #cce1ff;
    border-color: #7da9e6;
    color: #2f7ae3
}

.el-table .el-table__row .el-button-group .start-end {
    background: #cce1ff;
    border-color: #7da9e6;
    color: #2f7ae3;
}

.el-table .el-table__row .el-button-group .delete {
    background: #ffebeb;
    border-color: #ed9c9b;
    color: #ea3e3c
}
</style>