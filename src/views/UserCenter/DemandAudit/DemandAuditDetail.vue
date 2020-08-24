<template>
  <div id="herder">
    <div class="header">
      <div class="title-name">需求反馈详情</div>
      <div class="comeback" @click="comeBack">返回上一页</div>
    </div>
    <div class="container">
      <div class="list">
        <span>需求名称</span>
        <span>{{name}}</span>
      </div>
      <div class="list">
        <span>类型</span>
        <span>{{type}}</span>
      </div>
      <div class="list">
        <span>需求提出时间</span>
        <span>{{time}}</span>
      </div>
      <div class="list">
        <span>需求描述</span>
        <span>{{description}}</span>
      </div>
    </div>
    <div class="feedback">
      <div class="title">
        <span>反馈清单</span>
      </div>
      <el-table
        :data="feedBackList"
        style="width: 100%"
        tooltip-effect="dark"
        height="350">
        <el-table-column
                prop="feedbackUuid"
                label="反馈方">
        </el-table-column>
        <el-table-column
                prop="createTime"
                label="反馈时间">
        </el-table-column>
        <el-table-column
                prop="description"
                label="反馈描述">
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="feedback">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="反馈1" name="1">
          <div class="list">
            <span>反馈方</span>
            <span>{{name}}</span>
          </div>
          <div class="list">
            <span>反馈时间</span>
            <span>{{time}}</span>
          </div>
          <div class="list">
            <span>反馈描述</span>
            <span>{{description}}</span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="反馈2" name="2"></el-tab-pane>
        <el-tab-pane label="反馈3" name="3"></el-tab-pane>
      </el-tabs>
    </div> -->
  </div>
</template>

<script>
import { queryDemandApi,  getFeedbackDetailApi} from "@/api/DemandManage.js";
export default {
  data() {
    return {
      name: '',
      type: '',
      time: "",
      description: "",
      activeName: "1",
      feedBackList: []
    };
  },
  mounted(){
    this.getFddebackDetail()
  },
  methods: {
    //返回上一页
    comeBack(){
      this.$router.go(-1)
    },
    async getFddebackDetail(){
      //获取反馈基本信息
      var params = {
        "demandUuid": this.$route.query.id
      }
      var infoDetail = {}
      const res = await queryDemandApi(JSON.stringify(params))
      infoDetail = res.list[0]
      if (infoDetail.type === '0') {
        infoDetail.type = "数据需求"
      } else if (infoDetail.type === '1') {
        infoDetail.type = "任务需求"
      }
      this.name = infoDetail.name
      this.type = infoDetail.type
      this.time = infoDetail.createTime
      this.description = infoDetail.description
      //获取具体反馈详情
      const feedBack = await getFeedbackDetailApi(JSON.stringify(params))
      this.feedBackList = feedBack.list
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
  .comeback{
    cursor: pointer;
  }
}
.container {
  padding: 30px 20px;
  text-align: left;
  background: #fff;
  .list {
    padding: 20px 0;
    span:nth-of-type(1) {
      display: inline-block;
      width: 120px;
      text-align: right;
    }
    span:nth-of-type(2) {
      display: inline-block;
      margin-left: 30px;
    }
  }
}
.feedback {
  padding: 0 5px 5px 30px;
  text-align: left;
  background: #fff;
  .title {
    width: 100%;
    height: 35px;
    border: 1px solid #f1f3f9;
    position: relative;
    background: #f7f9ff;
    span {
      line-height: 30px;
      float: left;
      font-size: 20px;
      color: #b1b4bb;
      font-weight: bold;
    }
  }
}
</style>
