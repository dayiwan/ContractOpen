<template>
  <div class="serviceItem">
    <img :src="require(`@/assets/dataService/${data.img}`)" alt />
    <div class="introduction">
      <div class="title">{{data.title}}</div>
      <div class="detail">{{data.introduction}}</div>
    </div>
    <span class="first-title">{{data.title}}</span>
  </div>
</template>

<script>
export default {
  name: "serviceItem",
  props: {
    data: {
      type: Object,
    },
    introShow: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.serviceItem {
  width: 300px;
  height: 380px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 0 60px;
  cursor: pointer;
  .introduction {
    display: none;
  }
  span {
    margin-top: -17%;
    font-size: 24px;
    line-height: 23px;
    color: #333333;
  }
}
.serviceItem:hover {
  transform: scale(1.01);
  .introduction {
    display: initial;
  }
  .first-title {
    display: none;
  }
}
.introduction {
  background-color: rgba($color: #000000, $alpha: 0.05);
  margin-top: -128%;
  color: #ffffff;
  width: 296px;
  height: 379px;
  border-radius: 10px;
  height: 100%;
  .title {
    font-size: 24px;
    font-weight: bold;
    margin: 55px 0 5px 0;
  }
  .detail {
    padding: 0 10px;
    text-align: justify;
    text-indent: 2em;
    display: flex;
    justify-content: center;
  }
}
</style>