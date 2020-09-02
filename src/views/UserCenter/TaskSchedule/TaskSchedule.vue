<template>
  <el-tabs type="border-card" class="task-schedule-page">
    <el-tab-pane label="建模准备任务">
      <Tab1 />
    </el-tab-pane>
    <el-tab-pane label="离线建模任务">
      <Tab2 />
    </el-tab-pane>
    <el-tab-pane label="在线推理任务">
      <Tab3 />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Tab1 from "./components/Tab1/Tab1.vue";
import Tab2 from "./components/Tab2/Tab2.vue";
import Tab3 from "./components/Tab3/Tab3.vue";
export default {
  name: "taskSchedule",
  components: {
    Tab1,
    Tab2,
    Tab3
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {}
};
</script>


<style lang="scss" scoped>
@import "./TaskSchedule.scss";
</style>