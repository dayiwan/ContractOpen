<template>
  <div class="caseDetail">
    <div class="title">{{detailData.task_name}}</div>
    <div class="algo">
      <span class="name">应用算法</span>
      <el-radio-group v-model="algorithm">
        <el-radio-button
          style="margin:0 5px 10px 10px;"
          v-for="(item, index) in detailData.algo"
          :label="item.algo_name"
          :key="index"
        >{{item.algo_name}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="member">
      <span class="name">参与方</span>
      <el-checkbox-group v-model="member">
        <el-checkbox-button
          style="margin:0 5px 10px 10px;"
          v-for="(item, index) in detailData.parties"
          :label="item.party_name"
          :key="index"
        >{{item.party_name}}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div class="butn">
      <el-button size="medium" type="primary" round @click.native="submit">确 定</el-button>
      <el-button size="medium" round @click.native="cancle">取 消</el-button>
    </div>
  </div>
</template>


<script>
export default {
  name: "caseDetail",
  props: {
    detailData: {
      type: Object,
    },
  },
  data() {
    return {
      algorithm: [],
      member: [],
    };
  },
  methods: {
    //取消
    cancle() {
      this.$emit("canCase");
    },
    //确定
    submit: function () {
      if (this.algorithm.length < 1) {
        this.$alert("请选择模型", "提示", {
          confirmButtonText: "确定",
        });
      } else if (this.member.length < 2) {
        this.$alert("请选择两位以上参与方", "提示", {
          confirmButtonText: "确定",
        });
      } else {
        const data = [this.algorithm, this.member];
        this.$emit("subCase", data);
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.caseDetail {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: #f7f7f7;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.15);
  border: solid 1px rgba(23, 41, 76, 0.2);
  padding: 20px;
  height: 75%;
  width: 50%;
  .title {
    display: flex;
    font-size: 18px;
    line-height: 2;
    font-weight: bold;
    color: #217eff;
    margin-bottom: 10px;
  }
  .name {
    display: flex;
    width: 80px;
    font-size: 16px;
    color: #3a404e;
    font-weight: bold;
  }
  .member,
  .algo, .butn {
    display: flex;
    margin: 15px 0;
    line-height: 40px;
  }
}
.el-checkbox-group,
.el-radio-group {
  display: flex;
  flex-wrap: wrap;
}
.el-checkbox-button:first-child,
.el-radio-button:first-child {
  border-left: 0px;
}
.el-checkbox-button,
.el-radio-button {
  border-left: 1px solid #dcdfe6;
}
.el-button {
    margin: 0 20px;
}
</style>