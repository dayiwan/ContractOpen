<template>
  <div class="RequireItem">
    <p>{{itemInfo.name | ellipsis}}</p>
    <div class="info">
      <div class="info_item">
        <span>需求方</span>
        <span>{{itemInfo.userUuid}}</span>
      </div>
      <div class="info_item">
        <span>创建时间</span>
        <span>{{itemInfo.createTime}}</span>
      </div>
      <div class="info_item">
        <span>当前状态</span>
        <span>{{itemInfo.feedbackStatus}}</span>
      </div>
    </div>
    <el-button class="btn" @click="check(itemInfo.demandUuid)">查看详情</el-button>
  </div>
</template>

<script>
export default {
  name: "RequireItem",
  props: {
    itemInfo: {
      type: Object
    }
  },
  //标题过长省略显示
  filters: {
    ellipsis(value) {
      if (!value) {
        return "";
      } else if (value.length > 15) {
        return value.slice(0, 15) + "...";
      } else {
        return value;
      }
    }
  },
  methods: {
    check(id) {
      this.$router.push({
        path: "/requirementDetail",
        query: { id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.RequireItem {
  width: 350px;
  background-color: white;
  padding: 15px 10px 10px 18px;
  border: 1px solid #eff1f7;
  margin: 12px 8px;
  color: #444a59;
  p {
    font-size: 16px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .info {
    display: flex;
    margin: 20px 0;
    .info_item {
      display: flex;
      flex-direction: column;
      margin-right: 12px;
      span {
        color: #898991;
        font-size: 8px;
        width: 100px;
        padding-right: 25px;
        &:nth-child(2) {
          color: #444a59;
          font-size: 12px;
          margin-top: 8px;
        }
      }
    }
  }
}
.btn {
  width: 60%;
  margin: 10px auto;
  background: #cce1ff;
  border-color: #7da9e6;
  color: #2f7ae3;
}

.RequireItem:hover {
  transform: scale(1.01);
}
</style>