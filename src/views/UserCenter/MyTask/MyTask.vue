<template>
  <el-container>
    <el-header style="height: 75px">
      <div class="left">我的任务</div>
      <div class="right">
        <span class="active" @click="btnNow()">进行中</span>
        <span @click="history()">已完成</span>
      </div>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" prop="taskName" show-overflow-tooltip label="任务名称"></el-table-column>
        <el-table-column align="center" prop="orderUuid" show-overflow-tooltip label="契约编号"></el-table-column>
        <el-table-column align="center" prop="executionStatus" show-overflow-tooltip label="状态"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="创建时间" prop="createTime"></el-table-column>
        <el-table-column width="300px">
          <template slot-scope="scope">
            <div style="text-align: center" class="btn">
              <el-button
                type="primary"
                plain
                @click="btnDetail(scope.row.taskUuid, scope.row.executionStatus)"
              >详情</el-button>
              <el-button type="danger" @click="btnDel(scope.row.taskUuid)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next, total"
        :page-size="pagination.pageSize"
        @current-change="pageChange"
        :total="pagination.total"
      ></el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import { getMyTaskApi, payTaskOrderApi, delTaskApi } from "@/api/MyTask.js";
export default {
  name: "myTask",
  data() {
    return {
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      stateMap: new Map([['0', '未开始'], ['1', '运行中'], ['2', '已取消'], ['3', '已完成']])
    };
  },
  mounted() {
    this.getMyTaskList();
  },
  methods: {
    //删除任务
    btnDel: function(id) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          var params = {
            taskUuid: id
          };
          await delTaskApi(JSON.stringify(params));
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$router.go(0);
        })
        .catch(() => {});
    },
    //完成订单支付
    goPay: function(id) {
      this.$confirm("是否确认支付?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          var params = {
            orderUuid: id
          };
          await payTaskOrderApi(JSON.stringify(params));
          this.$message({
            type: "success",
            message: "支付成功!"
          });
          this.$router.go(0);
        })
        .catch(() => {});
    },
    //获取当前任务列表
    async getMyTaskList() {
      var params = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        taskStatus: "0"
      };
      const res = await getMyTaskApi(JSON.stringify(params));
      this.pagination.total = res.totalCount;
      this.tableData = res.list;
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].executionStatus = this.stateMap.get(this.tableData[i].executionStatus)
      }
    },
    //翻页
    pageChange(page) {
      this.pagination.currentPage = page;
      this.getMyTaskList();
    },
    //跳转至已完成任务
    history: function() {
      this.$router.push({ name: "MyTaskHistory" });
    },
    //进行中的任务
    btnNow: function() {
      this.$router.push({ name: "task" });
    },
    //删除任务
    btnCancel: function() {
      this.$confirm("是否确定删除任务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "取消成功!"
          });
        })
        .catch(() => {});
    },
    //跳转至任务详情
    btnDetail: function(id, state) {
        this.$router.push({
          name: "MyTaskDetail",
          query: { id }
        });
    //   if (state === "未开始") {
    //     this.$message({
    //       type: "error",
    //       message: "任务尚未开始，无法查看详情"
    //     });
    //     return;
    //   } else {
    //     this.$router.push({
    //       name: "MyTaskDetail",
    //       query: { id }
    //     });
    //   }
    }
  }
};
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
      color: #4a91fe;
      cursor: pointer;
      box-sizing: border-box;
      background: #e8f2fe;
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
      border: 1px #207eff solid;
    }
    .active {
      background: #207eff;
      color: #ffffff;
    }
  }
}
.el-main {
  padding: 0px 0 !important;
  border: 1px #ebeef5 solid;
  margin-top: 20px;
}
.el-table {
  margin-top: 0px;
}
/deep/.el-table .el-table__row td:nth-child(2) .cell {
  font-weight: normal;
}
.el-table .btn button {
  width: 80px;
  height: 35px;
  line-height: 35px;
  padding: 0px;
  background: #cce1ff;
  color: #2f7ae3;
  border: #2f7ae3 solid 1px;
}
.el-table .btn button:last-child {
  background: #ffebeb;
  border: #ed9c9b solid 1px;
  color: #ea3e3c;
}
.el-footer {
  margin-top: 40px;
  background: #ffffff;
  /deep/ .el-pager .active {
    border: 1px solid #efefef;
  }
  border: 1px #ebeef5 solid;
}
/deep/.el-table th > .cell {
  font-weight: normal;
}
</style>
