<template>
  <div class="tab">
    <el-menu default-active="1" mode="horizontal">
      <el-menu-item index="1" @click="caseIndex">案例展示</el-menu-item>
      <el-menu-item index="2" @click="caseBase">案例库</el-menu-item>
      <el-menu-item index="3" @click="simulatData">仿真数据</el-menu-item>
      <el-menu-item index="4" @click="modelBase">模型库</el-menu-item>
      <el-menu-item index="5" @click="effectVerif">效果验证</el-menu-item>
    </el-menu>
  </div>
</template>


<script>
export default {
  name: "caseTab",
  methods: {
    //案例展示
    caseIndex() {
      this.$emit("showCaseIndex");
    },
    //打开案例库
    caseBase() {
      this.$emit("showCaseBase");
    },
    //打开仿真数据
    simulatData() {
      this.$emit("showSimulatData");
    },
    //打开模型库
    modelBase() {
        this.$emit("showModelBase")
    },
    //打开效果验证
    effectVerif(){
        this.$emit("showEffectVerif")
    }
  },
};
</script>


<style lang="scss" scoped>
.tab {
  border-top: solid 1px #f2f3f8;
  position: fixed;
  right: 0;
  width: 100%;
}
.el-menu {
  display: flex;
  justify-content: flex-end;
  height: 50px;
}
.el-menu-item {
    height: 50px;
    line-height: 50px;
    border-bottom: 0;
    font-size: 16px;
}
.el-menu-item:last-child {
  margin-right: 50px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  color: #409eff;
}
</style>