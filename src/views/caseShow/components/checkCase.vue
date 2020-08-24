<template>
  <div class="checkCase">
    <el-steps direction="vertical" :active="1">
      <el-step title="状态检查"></el-step>
      <el-step title="训练"></el-step>
      <el-step title="测试"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
    name: "checkCase"
}
</script>

<style lang="scss" scoped>
.checkCase {
    height: 300px;
}
</style>