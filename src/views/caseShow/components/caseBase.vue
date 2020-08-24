<template>
  <div class="caseBase">
    <div class="item-card" v-for="(item, index) in caseData" :key="index" @click="chooseCase(item)">
      <div class="title">{{item.task_name}}</div>
      <div class="member">
        <span class="name">参与方:</span>
        <span
          class="content"
          v-for="(members, index) in item.parties"
          :key="index"
        >{{members.party_name}}</span>
      </div>
      <div class="algorithm">
        <span class="name">示例算法:</span>
        <span class="content" v-for="(algos, index) in item.algo" :key="index">{{algos.algo_name}}</span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "caseBase",
  props: {
    caseData: {
      type: Array,
    },
  },
  methods: {
    //点击案例事件
    chooseCase(data) {
      this.$emit("openCase", data);
    },
  },
};
</script>


<style lang="scss" scoped>
.caseBase {
  width: 400px;
}
.item-card {
  background: #f7f7f7;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.15);
  border: solid 1px rgba(23, 41, 76, 0.2);
  padding: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  .member,
  .algorithm,
  .title {
    display: flex;
    flex-wrap: wrap;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #217eff;
    margin-bottom: 15px;
  }
  .name {
    font-size: 14px;
    color: #3a404e;
    font-weight: bold;
  }
  .content {
    margin-left: 10px;
    margin-bottom: 10px;
    text-align: center;
    color: #8a979e;
    font-size: 14px;
  }
}
</style>