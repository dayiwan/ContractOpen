<template>
  <div class="table">
    <el-table :data="ResourceItem">
      <el-table-column prop="name" show-overflow-tooltip label="需求名称" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center"></el-table-column>
      <el-table-column prop="feedbackStatus" label="反馈状态" align="center"></el-table-column>
      <el-table-column prop="answer" label="是否开启" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" @click="search(scope.row.demandUuid)" class="detail">详情</el-button>
            <el-button v-if="scope.row.answer == '未开启'" size="mini" @click="open(scope.row.demandUuid)" class="detail">开启</el-button>
            <el-button v-if="scope.row.answer == '已开启'" size="mini" @click="close(scope.row.demandUuid)" type="danger">关闭</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { closeDemandApi, openDemandApi } from "@/api/DemandAudit.js";
import { getUserName } from "@/utils/cookies.js";
export default {
  props: {
    ResourceItem: {
      type: Array
    },
  },
  methods: {
    // 开启需求
    open: function(id){
        this.$confirm('是否确定开启?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            var params = {
                "uuid": id
            }
            await openDemandApi(JSON.stringify(params))
            this.$message({
                type: 'success',
                message: '开启成功!'
            });
            this.$router.go(0)
        }).catch(() =>{
        });
    },
    // 关闭需求
    close: function(id){
        this.$confirm('是否确定关闭?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            var params = {
                "uuid": id
            }
            await closeDemandApi(JSON.stringify(params))
            this.$message({
                type: 'success',
                message: '关闭成功!'
            });
            this.$router.go(0)
        }).catch(() =>{
        });
    },
    //跳转详情
    search(id) {
    this.$router.push({ 
        name: "demandAuditDetail" ,
        query: {id}
    });
    },
  }
};
</script>

<style lang="scss" scoped>
.table {
  margin-bottom: 20px;
}

.el-table {
  margin-top: 20px;

  .el-table__row {
    height: 92px;
    font-size: 16px;
    /*border: 1px  #909399 dashed;*/
    td:nth-child(6) {
      border-right: 1px dashed #ebeef5;
    }

    td:nth-child(1) .cell {
      font-weight: bold;
      color: #000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .el-table td,
    .el-table th.is-leaf {
      border: 1px #ebeef5 dashed;
    }

    .el-table__header {
      border-bottom: 1px #ebeef5 dashed;
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
      content: "选择";
    }
  }

  .el-checkbox__inner {
    width: 18px;
    height: 18px;
  }

  .el-checkbox__inner::after {
    width: 5px;
  }
}

.date {
  text-align: right;
  color: #adb6ba;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  background: #ffffff;

  span {
    margin-right: 20px;
  }
}

.el-pagination--small .btn-next,
.el-pagination--small .btn-prev,
.el-pagination--small .el-pager li,
.el-pagination--small .el-pager li.btn-quicknext,
.el-pagination--small .el-pager li.btn-quickprev,
.el-pagination--small .el-pager li:last-child {
  width: 28px;
  height: 28px;
  min-width: 28px;
  font-size: 14px;
  line-height: 28px;
}

.el-pagination--small button,
.el-pagination--small span:not([class*="suffix"]) {
  height: 28px;
  line-height: 28px;
}

.el-table .cell {
  font-weight: normal;
}

.el-table .el-table__row .el-button-group .el-button {
  border-radius: 4px;
}

.el-table .el-table__row .el-button-group .edit {
  background: #cce1ff;
  border-color: #7da9e6;
  color: #2f7ae3;
}

.el-table .el-table__row .el-button-group .detail {
  background: #cce1ff;
  border-color: #7da9e6;
  color: #2f7ae3;
}

.el-table .el-table__row .el-button-group .delete {
  background: #ffebeb;
  border-color: #ed9c9b;
  color: #ea3e3c;
}
.dialog-footer {
  text-align: center;
  padding-bottom: 20px;
  button {
    width: 150px;
  }
}
/deep/.el-dialog__header {
  border-bottom: 1px solid #eee;
}
</style>
