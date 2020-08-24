<template>
  <div class="resource-page">
    <UserCenterHeader title="数据使用契约" :showOption="false" :canSearch="false" :comeBack="true"></UserCenterHeader>
    <el-main>
      <div class="one">
        <el-row class="row">
          <el-col :span="14">
            <div class="left">
              <span>契约号</span>
              <span>{{tableData.contractNumber}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="right">
              <span>契约甲方</span>
              <span>平台运营方</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="14">
            <div class="left">
              <span>任务描述</span>
              <span class="describe">{{tableData.describe}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="right">
              <span>契约乙方</span>
              <span>{{tableData.userName}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="two">
        <el-row>
          <el-col :span="2">
            <div class="title">选定数据集</div>
          </el-col>
          <el-col :span="22">
            <el-tag v-for="(item, index) in tableData.dataSet" :key="index">{{item}}</el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="title">选定模型</div>
          </el-col>
          <el-col :span="22">
            <el-tag>{{tableData.model}}</el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="title">相关条款</div>
          </el-col>
          <el-col :span="22">
            <el-button type="primary" @click="agreementShow = true" plain class="btn">甲乙双方需遵守的约定条款</el-button>
          </el-col>
        </el-row>
      </div>
    </el-main>

    <div class="agreement" v-show="agreementShow" @click="agreementShow = false">
      <div class="agreement-div">
        <!-- <img src="@/assets/agreement1.png" alt />
        <img src="@/assets/agreement2.png" alt />
        <img src="@/assets/agreement3.png" alt />-->
        <contractText :data="tableData" />
      </div>
    </div>
  </div>
</template>

<script>
import UserCenterHeader from "../components/UserCenterHeader";
import { getUseContractDetailApi } from "@/api/MyContract.js";
import contractText from "../MyContract/components/contractText";
export default {
  name: "ContractManageDetail",
  components: { UserCenterHeader, contractText },
  data() {
    return {
      tableData: {
        contractNumber: "",
        describe: "",
        userName: "",
        dataSet: [],
        model: []
      },
      modelMap: new Map([["cb3e4fde-74b0-11ea-b44e-005056c00008", "神经网络(三层)"],["edc88174-74b0-11ea-b1f1-005056c00008", "逻辑回归1"],["0598a2d8-74b1-11ea-856d-005056c00008", "神经网络(五层)"], ["107c0cf6-74b1-11ea-b957-005056c00008", "逻辑回归2"]]),
      agreementShow: false
    };
  },
  mounted() {
    this.getUseContractDetail();
  },
  methods: {
    async getUseContractDetail() {
      var params = {
        page: 1,
        limit: 1,
        uuid: this.$route.query.id
      };
      const res = await getUseContractDetailApi(JSON.stringify(params));
      const data = res.list[0];
      this.tableData.contractNumber = data.uuid;
      this.tableData.describe = data.purpose;
      this.tableData.userName = data.username;
      this.tableData.dataSet = data.datas;
      this.tableData.dataSetList = data.datas.join(',')
      this.tableData.model = this.modelMap.get(data.modelName)
    }
  }
};
</script>

<style lang="scss" scoped>
.user-center-header {
  background: #fff;
}
.title {
  background: #fff;
}
.el-main {
  background: #fff;
  padding: 0px;
}
.el-main .one {
  border-bottom: 1px #ebeef5 solid;
  padding-bottom: 2%;
}
.el-main .row {
  display: flex;
  justify-content: space-between;
  padding: 2% 2% 0 2%;
  text-align: left;
}
.el-main .row span {
  display: block;
  color: #353535;
  font-size: 18px;
  line-height: 30px;
}
.el-main .row span:first-child {
  color: #8a979e;
  font-size: 14px;
}
.el-main .row .describe {
  color: #606266;
  font-size: 14px;
  line-height: 20px;
}
.el-main .two {
  padding: 2% 4%;
  text-align: left;
}
.el-main .two .title {
  font-size: 14px;
  color: #4f5b72;
  padding-left: 5px;
}
.el-main .two .el-row {
  height: 40px;
  line-height: 40px;
}
.el-main .two .el-row .el-tag {
  background: #f9f9f9;
  font-size: 14px;
  color: #333;
  border: none;
  margin-left: 10px;
  padding: 0 15px;
}
.el-main .two .el-row .content {
  font-size: 16px;
  color: #333;
  margin-left: 10px;
}
.el-main .two .title_sub {
  font-size: 14px;
  color: #333;
  padding-left: 5px;
  font-weight: bold;
  margin: 20px 0 10px 0;
}
.el-main .two .btn {
  background: #e8f2ff;
  border: 1px #9ec7ff solid;
  border-radius: 40px;
  height: 30px;
  line-height: 30px;
  padding: 0 20px;
  color: #1970ea;
}
.agreement {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba($color: #000000, $alpha: 0.3);

  &-div {
    width: 100%;
    height: 90%;
    margin: 2% 0;
    overflow-y: scroll;
  }
}
</style>
