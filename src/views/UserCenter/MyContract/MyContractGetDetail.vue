<template>
  <div class="resource-page">
    <UserCenterHeader title="数据提供契约" :showOption="false" :canSearch="false" :comeBack="true"></UserCenterHeader>
    <el-main>
      <div class="one">
        <el-row class="row">
          <el-col :span="12">
            <div class="left">
              <span>契约号</span>
              <span>{{contractNumber}}</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="right">
              <span>契约甲方</span>
              <span>平台运营方</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="right">
              <span>契约乙方</span>
              <span>{{userName}}</span>
            </div>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </div>
      <div class="content">
        <div class="content-row">
          <div class="content-row-key">数据资源名称</div>
          <div class="content-row-value">{{name}}</div>
        </div>
        <div class="content-row">
          <div class="content-row-key">数据产生时间</div>
          <div class="content-row-value">{{dataTime}}</div>
        </div>
        <div class="content-row">
          <div class="content-row-key">主题</div>
          <div class="content-row-value">{{theme}}</div>
        </div>
        <div class="content-row">
          <div class="content-row-key">行业</div>
          <div class="content-row-value">{{industry}}</div>
        </div>
        <div class="content-row">
          <div class="content-row-key">授权使用有效期</div>
          <div class="content-row-value">{{validTime}}</div>
        </div>
        <div class="content-row">
          <div class="content-row-key">授权方式</div>
          <div class="content-row-value">{{isShare}}</div>
        </div>
        <div class="content-row">
          <div class="content-row-key">适用范围</div>
          <div class="content-row-value">{{userRange}}</div>
        </div>
        <div class="content-row">
          <div class="content-row-key">数据资源描述</div>
          <div class="content-row-value">{{description}}</div>
        </div>
        <div class="content-row">
          <div class="content-row-key">数据条数</div>
          <div class="content-row-value">{{dataCount}}</div>
        </div>
        <div class="content-row">
          <div class="content-row-key">数据格式</div>
          <div class="content-row-value">{{dataFormat}}</div>
        </div>
        <div class="content-row">
          <div class="content-row-key">数据质量自评</div>
          <div class="content-row-value">{{evaluation}}</div>
        </div>
        <div class="content-row">
          <div class="content-row-key">相关条款</div>
          <div class="content-row-value">
            <el-button type="primary" @click="agreementShow = true" plain class="btn">甲乙双方需遵守的约定条款</el-button>
          </div>
        </div>
      </div>
    </el-main>

    <div class="agreement" v-show="agreementShow" @click="agreementShow = false">
      <div class="agreement-div">
        <contractText :data="contractContent" />
      </div>
    </div>
  </div>
</template>

<script>
import UserCenterHeader from "../components/UserCenterHeader";
import { getGetContractDetailApi } from "@/api/MyContract.js";
import contractText from "./components/contractText";
export default {
  name: "MyContractGetDetail",
  components: { UserCenterHeader, contractText },
  data() {
    return {
      name: "",
      dataTime: "",
      theme: "",
      industry: "",
      validTime: "",
      isShare: "",
      userRange: "",
      description: "",
      dataCount: "",
      dataFormat: "",
      evaluation: "",
      contractNumber: "",
      userName: "",
      agreementShow: false,
      contractContent: {
        contractNumber: "",
        userName: "",
        dataSetList: ""
      },
      rightMap: new Map([[0, '部分授权'], [1, '完全授权']]),
      rangeMap: new Map([[0, '商用'], [1, '科研'], [2, '民生'], [3, '政用'], [4, '其他']]),
      typeMap: new Map([[0, 'csv'], [1, 'dat'], [2, 'json'], [3, 'excel'], [4, 'text']])
    };
  },
  mounted() {
    this.getGetContractDetail();
  },
  methods: {
    async getGetContractDetail() {
      var params = {
        uuid: this.$route.query.id,
        page: 1,
        limit: 1
      };
      const res = await getGetContractDetailApi(JSON.stringify(params));
      const data = res.list[0];
      this.contractNumber = data.uuid;
      this.userName = data.username;
      this.name = data.blockDataName;
      this.dataTime = data.dataTime.split("T")[0];
      this.theme = data.themeUuid;
      this.industry = data.industryUuid;
      this.validTime = data.validTime + "个月";
      this.description = data.description;
      this.dataCount = data.dataCount + "条";
      if (data.evaluationList) {
        this.evaluation = data.evaluationList.join(",");
      }
      this.contractContent.contractNumber = data.uuid;
      this.contractContent.userName = data.username;
      this.contractContent.dataSetList = data.blockDataName;
      this.isShare = this.rightMap.get(data.isShare);
      this.userRange = this.rangeMap.get(data.useRange);
      this.dataFormat = this.typeMap.get(data.dataFormat);
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
.content {
  display: flex;
  flex-direction: column;
  &-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 20px 50px 20px 10px;
    &-key {
      display: flex;
      justify-content: flex-end;
      margin-right: 30px;
      width: 150px;
      color: #4f5b72;
      font-size: 16px;
    }
    &-value {
      white-space: pre-wrap;
      text-align: justify;
      width: 1000px;
      color: #353535;
      font-size: 18px;
      .btn {
        text-align: left;
        background: #e8f2ff;
        border: 1px #9ec7ff solid;
        border-radius: 40px;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        color: #1970ea;
      }
    }
  }
}
.el-main .one {
  border-bottom: 1px #ebeef5 solid;
  padding-bottom: 2%;
}
.el-main .row {
  display: flex;
  justify-content: space-between;
  padding: 2% 4% 0 4%;
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
/deep/.el-main label {
  font-size: 16px;
  color: #4f5b72;
}
/deep/.el-input__inner {
  border: none;
  font-size: 16px;
  color: #333;
  font-weight: bold;
}
/deep/.el-textarea__inner {
  border: none;
  font-size: 16px;
  color: #333;
  font-weight: bold;
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
