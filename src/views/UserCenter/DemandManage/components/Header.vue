<template>
  <div id="Header">
    <div class="header">
      <div class="title-name">需求管理</div>
      <div class="my_input">
        <div class="search">
          <el-input size="small" v-model="name" placeholder="请输入需求名称关键字" class="title-search">
            <el-button size="small" slot="append" @click="search">搜索</el-button>
          </el-input>
        </div>
      </div>
    </div>
    <div class="operate">
      <div class="addDemand">
        <el-button class="addBtn" size="small" @click="addContent">新增需求</el-button>
      </div>
      <div class="switchStatus">
        <el-button
          class="switchBtn0"
          :class="{'switchBtnCl':type==0,'switchBtnCl1':type!==0}"
          size="small"
          v-on:click="change(0)"
        >全部需求</el-button>
        <el-button
          class="switchBtn"
          :class="{'switchBtnCl':type==1,'switchBtnCl1':type!==1}"
          size="small"
          v-on:click="change(1)"
        >我的需求</el-button>
        <el-button
          class="switchBtn1"
          :class="{'switchBtnCl':type==2,'switchBtnCl1':type!==2}"
          size="small"
          v-on:click="change(2)"
        >我的反馈</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="40%">
      <span slot="title">新增需求</span>
      <span>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" center>
          <el-form-item label="需求名称">
            <el-input v-model="ruleForm.name" placeholder="请输入需求名称"></el-input>
          </el-form-item>
          <el-form-item label="需求类型">
            <el-select v-model="ruleForm.type" placeholder="请选择" style="width: 100%;">
              <el-option label="数据需求" value="0"></el-option>
              <el-option label="任务需求" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="需求描述" >
            <el-input type="textarea" placeholder="请输入您的需求描述" v-model="ruleForm.describe"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer">
        <div class="dialog-footer">
          <el-button type="primary" @click="addDemand" >提交</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addDemandApi } from "@/api/DemandManage.js";
import { getUserName } from "@/utils/cookies.js";
export default {
  data() {
    return {
      name: "", //搜索名称
      type: 0,
      ruleForm: {
        name: '',
        type: '',
        describe: ''
      },
      dialogVisible: false
    };
  },
  methods: {
    //搜索
    search(){
      this.$emit("dataName", this.name)
    },
    //提交新增需求
    addDemand: function(){
      if (this.ruleForm.name === '' || this.ruleForm.region === '' || this.ruleForm.describe === ''){
        this.$message({
          type: 'error',
          message: '需求名称、类型、描述不能为空'
        });
        return
      }
      this.$confirm('是否确定提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        var params = {
          "userUuid": getUserName(),
          "name": this.ruleForm.name,
          "type": this.ruleForm.type,
          "description": this.ruleForm.describe
        };
        await addDemandApi(JSON.stringify(params));
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
        this.$router.go(0)
      }).catch(() =>{
      });
    },
    //选择我的需求、全部需求和需求反馈
    change(index) {
      if (index == 0) {
        this.$emit("status", index);
        this.type = 0;
      } else if (index == 1) {
        this.$emit("status", index);
        this.type = 1;
      } else if (index == 2) {
        this.$emit("status", index);
        this.type = 2;
      }
    },
    //新增需求
    addContent() {
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  padding: 20px;
  .title-name {
    text-align: left;
    border-left: 4px solid $color-main-blue;
    padding-left: 20px;
    font-size: 22px;
    font-weight: bolder;
  }
  .my_input {
    width: 60%;
  }
  /deep/.el-input__inner {
    border-radius: 40px;
    height: 35px;
    line-height: 35px;
  }
  /deep/.el-input__suffix {
    top: 4px;
  }
  /deep/.search .el-input__inner {
    border-radius: 40px 0 0 40px;
    margin-left: 20px;
  }
  /deep/.search .el-input-group__append {
    border: none;
    width: 75px;
    font-size: 15px;
    height: 35px;
    background: #217eff;
    border-radius: 0 40px 40px 0;
  }
  .search {
    text-align: right;
    .title-search {
      width: 300px;
      input {
        border-radius: 40px 0 0 40px;
      }
      .el-input-group__append,
      .el-button {
        border-radius: 0 40px 40px 0 !important;
        width: 75px;
        color: white;
      }
    }
  }
}
.operate {
  display: flex;
  background: #fff;
  padding: 20px;
  .addDemand {
    text-align: left;
    width: 50%;
    .addBtn {
      width: 120px;
      border: 1px solid $color-main-blue;
      font-size: 15px;
      border-radius: 50px;
      background-color: $color-main-blue;
      color: #fff;
    }
  }
  .switchStatus {
    text-align: right;
    width: 50%;
    .switchBtn0 {
      margin: 0;
      width: 110px;
      background: #3a8ee6;
      border-color: #3a8ee6;
      color: #fff;
      border-radius: 4px 0 0 4px;
    }
    .switchBtn {
      margin: 0;
      width: 110px;
      background: #3a8ee6;
      border-color: #3a8ee6;
      color: #fff;
      border-radius: 0;
    }
    .switchBtnCl {
      background: #3a8ee6 !important;
      border-color: #3a8ee6 !important;
      color: #fff !important;
    }
    .switchBtnCl1 {
      background: #c6e2ff !important;
      border-color: #3a8ee6 !important;
      color: #3a8ee6 !important;
    }
    .switchBtn1 {
      margin: 0;
      width: 110px;
      background: #c6e2ff;
      border-color: #3a8ee6;
      color: #3a8ee6;
      border-radius: 0 4px 4px 0;
    }
  }
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
