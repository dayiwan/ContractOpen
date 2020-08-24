<template>
  <el-container>
    <el-header style="height: 75px">
      <div class="left">我的任务</div>
      <div class="right">
        <span @click="btnNow()">进行中</span>
        <span class="active" @click="history()">已完成</span>
      </div>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" prop="taskName" show-overflow-tooltip label="任务名称"></el-table-column>
        <el-table-column align="center" prop="orderUuid" show-overflow-tooltip label="契约编号"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="发起时间" prop="startTime"></el-table-column>
        <el-table-column align="center" prop="endTime" show-overflow-tooltip label="完成时间"></el-table-column>
        <el-table-column align="center" prop="executionStatus" show-overflow-tooltip label="状态"></el-table-column>
        <el-table-column align="center" prop="payState" show-overflow-tooltip label="支付状态"></el-table-column>
        <el-table-column width="300px">
          <template slot-scope="scope">
            <div style="text-align: center" class="btn">
              <el-button
                type="primary"
                plain
                @click="btnPay(scope.row.orderUuid, scope.row.payState)"
              >支付</el-button>
              <el-button type="primary" plain @click="btnDownload(scope.row.resultUrl, scope.row.payState)">下载
              </el-button>
              <el-button type="primary" plain @click="btnDetail(scope.row.taskUuid)">详情</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <span slot="title">订单支付</span>
        <span>
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            center
          >
            <el-form-item label="支付密码">
              <el-input v-model="ruleForm.password" placeholder="请输入支付密码" type="password"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer">
          <div class="dialog-footer">
            <el-button style type="primary" @click="payOrder" v-if="!isPay">确认支付</el-button>
            <el-button style type="primary" disabled v-else>支付中...</el-button>
          </div>
        </span>
      </el-dialog>
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
import {
  getMyTaskApi,
  payTaskOrderApi,
  dowonloadTaskdApi
} from "@/api/MyTask.js";
export default {
  name: "MyTaskHistory",
  data() {
    return {
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      dialogVisible: false,
      payOrderId: '',
      ruleForm: {
          password: ''
      },
      isPay: false,
      stateMap: new Map([['0', '未开始'], ['1', '运行中'], ['2', '已取消'], ['3', '已完成']]),
      payMap: new Map([[0, '未支付'], [1, '已支付']])
    };
  },
  mounted() {
    this.getMyTaskHistory();
  },
  methods: {
    //下载任务
    btnDownload: function(id, state){
    if ( state !== "已支付") {
        this.$message({
            type: "error",
            message: "您尚未支付，请先支付再下载!"
        });
    } else {
        var url = 'http://' + id
        window.open(url)
    }
    },
    
    //支付订单
    async payOrder(){
        if (this.ruleForm.password !== '123456'){
            this.$message({
              type: "error",
              message: "密码错误，请重新输入!"
            });
        } else if (this.ruleForm.password === '123456'){
            this.isPay = true
            var params = {
              orderUuid: this.payOrderId
            };
            await payTaskOrderApi(JSON.stringify(params));
            this.dialogVisible = false
            this.payOrderId = ''
            this.$router.go(0);
            this.$message({
              type: "success",
              message: "支付成功!"
            });
        }
    },
    //订单支付判断
    btnPay: function(id, state) {
        this.payOrderId = ''
        if (state === "已支付") {
            this.$message({
            type: "success",
            message: "您已完成支付，无需再次支付。"
            });
        } else {
            this.payOrderId = id
            this.dialogVisible = true
            this.isPay = false
        }
    },
    //获取历史任务列表
    async getMyTaskHistory() {
      var params = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        taskStatus: "1"
      };
      const res = await getMyTaskApi(JSON.stringify(params));
      this.pagination.total = res.totalCount;
      this.tableData = res.list;
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].executionStatus = this.stateMap.get(this.tableData[i].executionStatus)
        this.tableData[i].payState = this.payMap.get(this.tableData[i].payState)
      }
    },
    //翻页
    pageChange(page) {
      this.pagination.currentPage = page;
      this.getMyTaskHistory();
    },
    history: function() {
      this.$router.push({ name: "MyTaskHistory" });
    },
    btnNow: function() {
      this.$router.push({ name: "task" });
    },
    btnDelete: function() {
      this.$confirm("此操作将永久删除该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    btnDetail: function(id) {
      this.$router.push({
        name: "MyTaskDetail",
        query: { id }
      });
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
  width: 62px;
  height: 35px;
  line-height: 35px;
  padding: 0px;
  background: #cce1ff;
  color: #2f7ae3;
  border: #2f7ae3 solid 1px;
}

.dialog-footer {
    text-align: center;
    padding-bottom: 20px;
    button {
      width: 150px;
    }
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
