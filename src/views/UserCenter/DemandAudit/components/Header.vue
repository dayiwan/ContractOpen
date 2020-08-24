<template>
  <div id="Header">
    <div class="header">
      <div class="title-name">需求审核</div>
      <div class="my_input">
        <div class="search">
          <el-input size="small" v-model="name" placeholder="请输入需求名称关键字" class="title-search">
            <el-button size="small" slot="append" @click="search">搜索</el-button>
          </el-input>
        </div>
      </div>
    </div>
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
</style>
