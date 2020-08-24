<template>
  <div class="dataSearch">
    <div class="breadCrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">数据服务</el-breadcrumb-item>
        <el-breadcrumb-item>数据查询</el-breadcrumb-item>
        <el-breadcrumb-item>选择数据类型</el-breadcrumb-item>
        <el-breadcrumb-item>信息录入</el-breadcrumb-item>
        <el-breadcrumb-item>确认订单</el-breadcrumb-item>
        <el-breadcrumb-item>查询结果</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "dataSearch",
};
</script>

<style lang="scss" scoped>
.breadCrumb {
  background-color: #ffffff;
  height: 48px;
  box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  .el-breadcrumb {
      line-height: 4;
  }
}
</style>