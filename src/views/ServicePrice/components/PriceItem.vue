<template>
  <div class="PriceItem">
    <p>{{taskItem.title}}</p>
    <div class="info">
      <div class="info_item">
        <span>积分</span>
        <span class="integral">{{taskItem.integral}}</span>
      </div>
      <div class="info_item">
        <span>描述</span>
        <span class="describe">{{taskItem.describe}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PriceItem",
    props:{
      taskItem:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .PriceItem {
    background-color: white;
    width: 380px;
    padding: 20px 18px 10px 18px;
    border: 1px solid #eff1f7;
    margin: 12px 0;
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
          display: flex;
          color: #898991;
          font-size: 8px;
          &:nth-child(1){
            margin-bottom: 12px;
          }
        }
        .integral {
          font-size: 20px;
          color: #3a6be2;
        }
        .describe{
          font-size: 12px;
          color: #444a59;
          overflow:hidden;
          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
        }
      }
    }

  }
</style>