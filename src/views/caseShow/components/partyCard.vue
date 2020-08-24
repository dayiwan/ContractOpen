<template>
  <div class="partyCard">
    <div class="title">{{partyData.party_name}}</div>
    <div class="data">数据</div>
    <div class="data_name">文件:{{partyData.data_name}}</div>
    <div class="data_num">数据量:{{partyData.data_count}}</div>
    <div class="rate">
      贡献率:
      <span class="rateVal">{{partyData.rate}}%</span>
    </div>
  </div>
</template>


<script>
export default {
  name: "partyCard",
  props: {
    partyData: {
      type: Object,
    },
  },
};
</script>


<style lang="scss" scoped>
.partyCard {
  width: calc((100% - 40px) / 4);
  height: 150px;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.15);
  border: solid 1px rgba(23, 41, 76, 0.2);
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.title {
  font-weight: bold;
  font-size: 18px;
}
.title,
.data,
.data_name,
.data_num,
.rate {
  display: flex;
  line-height: 25px;
  color: #3a404e;
}
.data {
  font-size: 16px;
}
.data_name,
.data_num,
.rate {
  font-size: 14px;
}
.rateVal {
  font-size: 20px;
  color: #2f7ae3;
}
</style>