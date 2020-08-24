<template>
  <div class="modelDetail">
    <div class="pic">
      <div class="dashBoard">
        <span class="picName">训练进度</span>
        <ve-gauge
          :data="dashChartData"
          :settings="dashChartSettings"
          :width="lineWidth"
          :height="'100%'"
        ></ve-gauge>
      </div>
      <div class="lineChart">
        <span class="picName">收敛图</span>
        <ve-line
          :data="modelDetailData.lineChartData"
          :settings="lineChartSettings"
          :legend-visible="false"
          :width="lineWidth"
          :height="lineHeight"
        ></ve-line>
      </div>
    </div>
    <div class="info">
      <div class="content">
        <span class="name">模型:</span>
        <span class="val">{{modelDetailData.model_name}}</span>
      </div>
      <div class="content">
        <span class="name">hiden_size:</span>
        <span class="val">{{modelDetailData.parmater.name}}</span>
      </div>
      <div class="content">
        <span class="name">learning_rate:</span>
        <span class="val">{{modelDetailData.parmater.lr}}</span>
      </div>
    </div>
    <div class="party">
      <partyCard v-for="(item, index) in modelDetailData.parties" :key="index" :partyData="item" />
    </div>
  </div>
</template>

<script>
import partyCard from "./partyCard";
export default {
  name: "modelDetail",
  components: { partyCard },
  props: {
    modelDetailData: {
      type: Object,
    },
  },
  data() {
    //收敛图设置
    this.lineChartSettings = {
      area: true, //是否显示为面积图
    };
    //仪表盘设置
    this.dashChartSettings = {
      dataType: {
        训练精度: "percent",
      },
      seriesMap: {
        训练精度: {
          min: 0,
          max: 1,
          splitNumber: 4,
          radius: '100%',
          detail:{
              offsetCenter: [0, '75%'],
              fontSize: 25,
              fontWeight: 'bold'
          }
        },
      },
    };
    return {
      lineWidth: "100%", //宽度
      lineHeight: "260px", //高度
      dashChartData: {
        columns: ["type", "value"],
        rows: [
          {
            type: "训练精度",
            value: 1,
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.pic {
  display: flex;
  .dashBoard {
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 250px;
    margin-right: 10px;
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.15);
    border: solid 1px rgba(23, 41, 76, 0.2);
    padding: 10px;
  }
  .lineChart {
    display: flex;
    flex-direction: column;
    width: 70%;
    height: 250px;
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.15);
    border: solid 1px rgba(23, 41, 76, 0.2);
    padding: 10px;
    margin-right: 10px;
  }
  .picName {
    display: flex;
    font-size: 18px;
    color: rgb(47, 122, 227);
  }
}
.party {
  display: flex;
  flex-wrap: wrap;
}
.info {
  height: 60px;
  margin: 10px 10px 10px 0;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.15);
  border: solid 1px rgba(23, 41, 76, 0.2);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .content {
    width: calc((100% - 40px) / 4);
    margin-right: 10px;
    .name {
      font-size: 16px;
      color: rgb(58, 64, 78);
      line-height: 3;
      margin-right: 10px;
    }
    .val {
      font-size: 18px;
      color: rgb(47, 122, 227);
      line-height: 3;
    }
  }
}
</style>