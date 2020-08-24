<template>
  <div class="list-item">
    <img
      :src="require(`@/assets/dataSource/${isCollapse?dataSet.industryIcon:dataSet.themeIcon}`)"
      alt
    />
    <el-divider></el-divider>
    <div class="desc">
      <h3>{{dataSet.blockDataName | ellipsis}}</h3>
      <div>
        <span>
          ￥
          <span>{{dataSet.price}}</span>
        </span>
        <span>
          销量：
          <span>{{dataSet.sales}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataSet: { type: Object },
    isCollapse: { type: Boolean }
  },
  //标题过长省略显示
  filters: {
    ellipsis(value) {
      if (!value) {
        return "";
      } else if (value.length > 25) {
        return value.slice(0, 25) + "...";
      } else {
        return value;
      }
    }
  }
};
</script>

.<style lang="scss" scoped>
.list-item {
  cursor: pointer;
  margin: 15px;
  width: 250px;
  height: 250px;
  padding: 0 21px 24px 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  border: solid 1px #ebeef5;
  transition: all 0.2s;
  img {
    margin-top: 40px;
  }
  .desc {
    width: 100%;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > span:first-child {
        font-size: 14px;
        color: #2f7ae3;
        > span {
          font-size: 20px;
          color: #2f7ae3;
        }
      }
      > span:last-child {
        font-size: 12px;
        color: #aaaaaa;
      }
    }
  }
  h3 {
    margin: 0;
    padding: 0;
    font-size: 16px;
    color: #3a404e;
    margin-bottom: 18px;
  }
}
.list-item:hover {
  transform: scale(1.01);
}
</style>