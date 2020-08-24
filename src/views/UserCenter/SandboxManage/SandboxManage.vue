<template>
  <el-container>
    <el-header style="height: 75px">
      <div class="left">沙盒管理</div>
      <div class="right"></div>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" prop="box_num" show-overflow-tooltip label="沙盒编号"></el-table-column>
        <el-table-column align="center" prop="box_location" show-overflow-tooltip label="沙盒落点"></el-table-column>
        <el-table-column align="center" prop="box_ip" show-overflow-tooltip label="沙盒地址"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="沙盒状态" prop="box_sta"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="使用数据" prop="box_data"></el-table-column>
        <el-table-column width="300px" label="操作" align="center">
          <template slot-scope="scope">
            <div style="text-align: center" class="btn">
              <el-button type="primary" @click="generate(scope.row.box_num)" plain>生成</el-button>
              <el-button type="primary" @click="start(scope.row.box_num)" plain>启动</el-button>
              <el-button type="primary" @click="watch(scope.row.box_num)" plain>监管</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="generateShow" width="60%">
        <div class="enivement">
          <div class="title">基本环境</div>
          <el-form label-width="100px" :inline="true" :model="baseForm" center>
            <el-form-item label="操作系统">
              <el-select v-model="baseForm.system" placeholder="请选择操作系统">
                <el-option label="ubuntu-GPU" value="ubuntu_gpu"></el-option>
                <el-option label="ubuntu-CPU" value="ubuntu_cpu"></el-option>
                <el-option label="CentOS-GPU" value="centos_gpu"></el-option>
                <el-option label="CentOS-CPU" value="centos_cpu"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="核数">
              <el-select v-model="baseForm.cpu" placeholder="请选择核数">
                <el-option label="1核" value="1"></el-option>
                <el-option label="2核" value="2"></el-option>
                <el-option label="4核" value="4"></el-option>
                <el-option label="8核" value="8"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="内存">
              <el-select v-model="baseForm.memory" placeholder="请选择内存">
                <el-option label="1G" value="1"></el-option>
                <el-option label="2G" value="2"></el-option>
                <el-option label="4G" value="4"></el-option>
                <el-option label="8G" value="8"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="enivement">
          <div class="title">软件环境</div>
          <el-form :model="softForm" center>
            <el-form-item>
              <el-checkbox-group v-model="softForm.type">
                <el-checkbox v-for="item in softList" :key="item" :label="item" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer">
          <div class="dialog-footer" style="text-align: center;">
            <el-button type="primary" @click="creatSandbox">生成沙盒</el-button>
          </div>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="watchShow" width="60%">
        <div class="watch">
          <div class="title">基本环境</div>
          <div class="content">
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
              <span>{{watchDetail.mem}}G</span>
            </div>
            <div class="content-node">
              <span>沙盒落点:</span>
              <span>{{watchDetail.location}}</span>
            </div>
            <div class="content-node">
              <span>沙盒地址:</span>
              <span>{{watchDetail.add}}</span>
            </div>
            <div class="content-node">
              <span>沙盒数据:</span>
              <span>{{watchDetail.data}}</span>
            </div>
          </div>
        </div>
        <div class="watch">
          <div class="title">进程监控</div>
          <div class="message" ref="msg">
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

    <el-footer>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next, total"
        :page-size="10"
        :total="10"
      ></el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import { sandboxManageApi } from "@/api/Sandbox.js";
export default {
  name: "mySandBox",
  data() {
    return {
      softList: [
        "numpy",
        "sklearn",
        "Pandas",
        "SciPy",
        "LightGBM",
        "tensorflow",
        "Keras",
        "Theano",
        "pytorch",
        "SymPy",
        "Statsmodels",
        "Seaborn"
      ],
      megList: [],
      softForm: {
        type: []
      },
      baseForm: {
        system: "",
        cpu: "",
        memory: ""
      },
      sandboxId: "",
      generateShow: false,
      watchShow: false,
      tableData: [],
      sandboxInfo: {},
      watchDetail: {}
    };
  },
  mounted() {
    this.getSandboxList();
  },
  methods: {
    //刷新
    refuse() {
      this.getWatchDetail();
    },
    //打开生成弹框
    generate(id) {
      this.sandboxId = "";
      this.generateShow = true;
      this.sandboxId = id;
    },
    //拉取沙盒监管详情
    async getWatchDetail() {
      var params = {
        type: "mon",
        box_num: this.sandboxId
      };
      const res = await sandboxManageApi(JSON.stringify(params));
      this.megList = res.list[0].concat(res.list[0]);
      this.watchDetail = res.box_info;
      this.watchDetail.mem = Number(this.watchDetail.mem) / 1024;
      let _self = this;
      setTimeout(function() {
        _self.$refs.msg.scrollTo({
          top: _self.$refs.msg.scrollHeight,
          behavior: "smooth"
        });
      }, 30);
    },
    //沙盒监管
    watch(id) {
      this.sandboxId = "";
      this.watchShow = true;
      this.sandboxId = id;
      this.getWatchDetail();
    },
    //启动沙盒
    async start(id) {
      var params = {
        box_num: id,
        type: "init"
      };
      const res = await sandboxManageApi(JSON.stringify(params)).then(() => {
        this.$message({
          type: "success",
          message: "启动成功!"
        });
        this.$router.go(0);
      });
    },
    //拉取沙盒管理列表
    async getSandboxList() {
      var params = {};
      const res = await sandboxManageApi(JSON.stringify(params));
      this.tableData = res.list;
    },
    //生成沙盒
    async creatSandbox() {
      this.sandboxInfo = {
        os: this.baseForm.system,
        cores: this.baseForm.cpu,
        mem: this.baseForm.memory,
        soft: this.softForm.type
      };
      var data = {
        type: "gen",
        box_num: this.sandboxId,
        params: this.sandboxInfo
      };
      const res = await sandboxManageApi(JSON.stringify(data)).then(() => {
        this.generateShow = false;
        this.$message({
          type: "success",
          message: "生成成功!"
        });
        this.$router.go(0);
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
.enivement {
  border: 1px solid #efefef;
  margin-bottom: 35px;
  .title {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 20px;
    margin-top: 15px;
  }
  .el-checkbox {
    text-align: left;
    margin-right: 100px;
    margin-left: 0px;
    width: 150px;
  }
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
.dialog-footer {
  margin-top: -35px;
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
