<template>
  <el-container>
    <el-header style="height: 75px">
      <div class="left">我的沙盒</div>
      <div class="right"></div>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" prop="sand_num" show-overflow-tooltip label="沙盒编号"></el-table-column>
        <el-table-column align="center" prop="data" show-overflow-tooltip label="数据名称"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="沙盒状态" prop="sta"></el-table-column>
        <el-table-column width="300px" label="操作" align="center">
          <template slot-scope="scope">
            <div style="text-align: center" class="btn">
              <el-button type="primary" @click="stop(scope.row.sand_num)" plain>暂停</el-button>
              <el-button type="primary" @click="watch(scope.row.sand_num)" plain>查看</el-button>
              <el-button type="danger" @click="del(scope.row.sand_num)" plain>删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="watchShow" width="60%">
        <div class="watch">
          <div class="title">基本环境</div>
          <div class="content">
            <div class="content-node">
              <span>沙盒编号:</span>
              <span>{{watchDetail.sand_num}}</span>
            </div>
            <div class="content-node">
              <span>操作系统:</span>
              <span>{{watchDetail.os}}</span>
            </div>
            <div class="content-node">
              <span>核数:</span>
              <span>{{watchDetail.cores}}</span>
            </div>
            <div class="content-node">
              <span>内存:</span>
              <span>{{watchDetail.mem / 1024}}G</span>
            </div>
            <div class="content-node">
              <span>沙盒状态:</span>
              <span>{{watchDetail.sta}}</span>
            </div>
            <div class="content-node">
              <span>沙盒数据:</span>
              <span>{{watchDetail.data}}</span>
            </div>
          </div>
        </div>
        <div class="watch">
          <div class="title">运行情况</div>
          <div class="message">
            <p v-for="(meg, index) in megList" :key="index">{{meg}}</p>
          </div>
        </div>
        <span slot="footer">
          <div class="dialog-footer">
            <el-button type="primary" @click="refuse">刷新</el-button>
          </div>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import { mySandboxApi } from "@/api/MySandbox.js";
export default {
  name: "mySandBox",
  data() {
    return {
      megList: [],
      watchShow: false,
      tableData: [],
      sandboxId: "",
      watchDetail: {},
      loading: false
    };
  },
  mounted() {
    this.getSandboxList();
  },
  methods: {
    //刷新
    refuse() {
      this.loading = true;
      this.getDetail();
      this.loading = false;
    },
    //查看详情
    async getDetail() {
      var params = {
        type: "mon",
        box_num: this.sandboxId
      };
      const res = await mySandboxApi(JSON.stringify(params));
      this.megList = res.list[0].concat(res.list[0]);
      for (var item in res.box_info) {
        if (Object.prototype.hasOwnProperty.call(res.box_info, item)) {
          res.box_info[item].sand_num = item;
          this.watchDetail= res.box_info[item];
        }
      }
      // this.watchDetail.mem = Number(this.watchDetail.mem) / 1024
    },
    //删除
    async del(id) {
      var params = {
        type: "kill",
        box_num: id
      };
      const res = await mySandboxApi(JSON.stringify(params)).then(() => {
        this.$router.go(0);
        this.$message({
          type: "success",
          message: "已删除!"
        });
      });
    },
    //暂停
    async stop(id) {
      var params = {
        type: "stop",
        box_num: id
      };
      const res = await mySandboxApi(JSON.stringify(params)).then(() => {
        this.$router.go(0);
        this.$message({
          type: "success",
          message: "已暂停!"
        });
      });
    },
    //拉取我的沙盒列表
    async getSandboxList() {
      var params = {};
      const res = await mySandboxApi(JSON.stringify(params));
      for (var item in res) {
        if (Object.prototype.hasOwnProperty.call(res, item)) {
          res[item].sand_num = item;
          this.tableData.push(res[item]);
        }
      }
    },
    // 打开查看弹框
    watch(id) {
      this.watchShow = true;
      this.sandboxId = id;
      this.getDetail();
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
  }
}
.el-main {
  padding: 0px 0 !important;
  border: 1px #ebeef5 solid;
  margin-top: 20px;
}
.watch {
  border: 1px solid #efefef;
  margin-bottom: 35px;
  .title {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 20px;
    margin-top: 15px;
  }
  .message {
    height: 230px;
    width: 100%;
    overflow-y: auto;
    margin-top: 20px;
    p {
      font-size: 16px;
      width: 80%;
      margin-left: 10%;
      text-align: left;
    }
  }
  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    &-node {
      width: 300px;
      margin-bottom: 30px;
      display: flex;
      span {
        font-size: 16px;
        margin-right: 15px;
        line-height: 18px;
      }
    }
  }
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
.dialog-footer {
  margin-top: -35px;
}

/deep/.el-table th > .cell {
  font-weight: normal;
}
</style>
