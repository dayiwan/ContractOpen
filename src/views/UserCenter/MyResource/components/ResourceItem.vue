<template>
    <div class="table">
        <el-table :data="ResourceItem">
            <el-table-column prop="blockDataName" show-overflow-tooltip label="资源名称" align="center">
            </el-table-column>
            <el-table-column prop="themeName" show-overflow-tooltip label="主题" align="center">
            </el-table-column>
            <el-table-column prop="industryName" show-overflow-tooltip label="行业" align="center">
            </el-table-column>
            <el-table-column prop="price" label="积分" align="center">
            </el-table-column>
            <el-table-column prop="sales" label="使用量" align="center">
            </el-table-column>
            <el-table-column prop="checkStatus" label="状态" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center" width="250">
                <template>
                    <el-button-group>
                        <el-button type="primary" size="mini" @click="edit(ResourceItem[0].uuid)" class="edit">编辑</el-button>
                        <el-button size="mini" @click="detail(ResourceItem[0].uuid)" class="detail">详情</el-button>
                        <el-button type="danger" size="mini" @click="btnDelete(ResourceItem[0].uuid)" class="delete">删除</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <div class="date">
            <span>创建时间：{{ResourceItem[0].createTime}}</span>
            <span>更新时间：{{ResourceItem[0].updateTime}}</span>
        </div>
    </div>
</template>


<script>
import { delResourceApi } from "@/api/MyResource.js"
export default {
    props: {
        ResourceItem: {
            type: Array
        }
    },
    methods: {
        edit(id) {
            this.$router.push({
                name: 'resourceEdit',
                query: {id}
            });
        },
        detail(id) {
            this.$router.push({
                name: 'resourceDetail',
                query: {id}
            });
        },
        // 删除资源
        btnDelete: function(id) {
            this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let uuid = []
                    uuid.push(id)
                    var params = {
                        "uuids": uuid
                    }
                    await delResourceApi(JSON.stringify(params))
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
                width: 65px;
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

.date {
    text-align: right;
    color: #ADB6BA;
    font-size: 14px;
    height: 50px;
    line-height: 50px;
    background: #ffffff;

    span {
        margin-right: 20px;
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

.el-table .el-table__row .el-button-group .detail {
    background: #cce1ff;
    border-color: #7da9e6;
    color: #2f7ae3
}

.el-table .el-table__row .el-button-group .delete {
    background: #ffebeb;
    border-color: #ed9c9b;
    color: #ea3e3c
}
</style>
