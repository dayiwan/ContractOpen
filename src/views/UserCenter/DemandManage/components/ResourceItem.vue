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
            <el-button v-if="Status == 0" size="mini" @click="feedback(scope.row.demandUuid)" class="detail">反馈</el-button>
            <el-button v-if="Status == 1" size="mini" type="danger" @click="deldemand(scope.row.demandUuid)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div class="feedback">
      <el-dialog :visible.sync="dialogVisible" width="40%">
        <span slot="title">新增反馈</span>
        <span>
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" center>
            <el-form-item label="需求名称">
              <el-input v-model="ruleForm.name" disabled placeholder="请输入需求名称"></el-input>
            </el-form-item>
            <el-form-item label="需求类型">
              <el-input v-model="ruleForm.type" disabled placeholder="请输入需求类型"></el-input>
            </el-form-item>
            <el-form-item label="需求描述" >
              <el-input type="textarea" disabled placeholder="请输入您的需求描述" v-model="ruleForm.description"></el-input>
            </el-form-item>
            <el-form-item label="反馈描述" >
              <el-input type="textarea" placeholder="请输入您的反馈描述" v-model="ruleForm.describe"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer">
          <div class="dialog-footer">
            <el-button type="primary" @click="addFeedback" >提交</el-button>
          </div>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { queryDemandApi,  addFeedbackApi, delDemandApi} from "@/api/DemandManage.js";
import { getUserName } from "@/utils/cookies.js";
export default {
  props: {
    ResourceItem: {
      type: Array
    },
    Status: {
      type: Number
    }
  },
  data(){
    return {
      dialogVisible: false,
      ruleForm: {
        name: '',
        type: '',
        describe: '',
        description: ''
      },
      demandUuid: '',
      userUuid: '',
      answer: ''
    }
  },
  methods: {
    //删除我的需求
    deldemand: function(id){
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        var idList = []
        idList.push(id)
        var params = {
            "uuids": idList
        }
        await delDemandApi(JSON.stringify(params))
        this.$message({
            type: 'success',
            message: '删除成功!'
        });
        this.$router.go(0);
      }).catch(() => {
      });
    },
    //跳转详情
    search(id) {
      this.$router.push({ 
        name: "feedbackDetail" ,
        query: {id}
      });
    },
    //新增反馈
    async feedback(id){
      var params = {
        "demandUuid": id
      }
      var infoDetail = {}
      const res = await queryDemandApi(JSON.stringify(params))
      infoDetail = res.list[0]
      if (infoDetail.type === '0') {
        infoDetail.type = "数据需求"
      } else if (infoDetail.type === '1') {
        infoDetail.type = "任务需求"
      }
      this.ruleForm.name = infoDetail.name
      this.ruleForm.type = infoDetail.type
      this.ruleForm.description = infoDetail.description
      this.ruleForm.describe = ''
      this.demandUuid = infoDetail.demandUuid
      this.userUuid = infoDetail.userUuid
      this.answer = infoDetail.answer
      if (this.userUuid === getUserName()){
        this.$message({
          type: 'error',
          message: '您只能反馈他人的需求'
        });
        return
      }
      if (this.answer === '1'){
        this.$message({
          type: 'error',
          message: '该需求尚未开启反馈'
        });
        return
      }
      this.dialogVisible = true;
    },
    //提交反馈
    addFeedback: function(){
      if (this.ruleForm.describe === ''){
        this.$message({
          type: 'error',
          message: '反馈描述不能为空'
        });
        return
      }
      this.$confirm('是否确定提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        var params = {
          "userUuid": this.userUuid,
          "demandUuid": this.demandUuid,
          "feedbackUuid": getUserName(),
          "description": this.ruleForm.describe
        };
        await addFeedbackApi(JSON.stringify(params));
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
        this.$router.go(0)
      }).catch(() =>{
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
