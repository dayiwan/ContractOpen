<template>
  <div class="dataService">
    <div class="introduce">
      <div class="introduce-title">数据服务</div>
      <div
        class="introduce-detail"
      >数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务数据服务</div>
    </div>
    <div class="item">
      <serviceItem v-for="(item, index) in itemData" :key="index" :data="item" @click.native="chooseCate(item)" />
    </div>
  </div>
</template>


<script>
import serviceItem from "./components/serviceItem";
export default {
  name: "dataService",
  components: { serviceItem },
  data() {
    return {
      itemData: [
        {
          title: "联邦建模",
          img: "dataModel.png",
          introduction:
            "联邦建模包括联邦和建模两个部分，利用联邦系统对数据进行建模",
          url: "dataModel",
        },
        {
          title: "数据沙盒",
          img: "dataBox.png",
          introduction: "数据沙盒就是把数据放在一个装满沙子的盒子里",
          url: "dataBox",
        },
        {
          title: "数据查询",
          img: "dataSearch.png",
          introduction: "数据查询业务可以查询到有的人是否有公积金等信息",
          url: "dataSearch",
        },
      ],
    };
  },
  methods: {
      chooseCate(item) {
          console.log(item.url)
          this.$router.push({name: item.url})
      }
  }
};
</script>


<style lang="scss" scoped>
.dataService {
  background-image: url("../../assets/dataService/backimg.png");
}
.introduce {
  margin-top: 5%;
  color: #333333;
  &-title {
    font-size: 28px;
  }
  &-detail {
    line-height: 25px;
    padding: 25px 22%;
    font-size: 16px;
    text-align: justify;
    text-indent: 2em;
  }
}
.item {
  display: flex;
  justify-content: center;
}
</style>