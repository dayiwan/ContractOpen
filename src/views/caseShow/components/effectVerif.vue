<template>
  <div class="effectVerif">
    <div class="title">{{effectData.model_name}}</div>
    <div class="task">{{effectData.task_desc}}</div>
    <div class="label">参与方</div>
    <div class="parties">
      <div class="party" v-for="(item, index) in effectData.parties" :key="index">
        <span class="name">{{item.party_name}}</span>
        <span class="count">{{item.data_count}}</span>
      </div>
    </div>
    <div class="label">训练精度</div>
    <div class="lossPic">
      <div class="federal-train">
        <span class="train-title">联邦学习训练精度</span>
        <ve-gauge
          :data="effectData.federalData"
          :settings="dashChartSettings"
          :width="'100%'"
          :height="'100%'"
        ></ve-gauge>
      </div>
      <div class="label-train">
        <span class="train-title">有label方训练精度</span>
        <div class="labelContent">
          <div class="labelPic" v-for="(item, index) in effectData.labelData" :key="index">
            <ve-gauge
              :data="item.trainData"
              :settings="dashChartSettings"
              :width="'100%'"
              :height="'100%'"
            ></ve-gauge>
            <span class="partyName">{{item.party_name}}</span>
          </div>
        </div>
      </div>
      <div class="merage-train">
        <span class="train-title">数据聚合训练精度</span>
        <ve-gauge
          :data="effectData.mergeData"
          :settings="dashChartSettings"
          :width="'100%'"
          :height="'100%'"
        ></ve-gauge>
      </div>
    </div>
    <div class="label">收敛图</div>
    <div class="linePic">
      <ve-line :data="effectData.lossData" :settings="lineChartSettings"></ve-line>
    </div>
  </div>
</template>

<script>
export default {
  name: "effectVerif",
  props: {
    effectData: {
      type: Object,
    },
  },
  data() {
    //收敛图设置
    this.lineChartSettings = {
      area: true,
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
          detail: {
            offsetCenter: [0, "65%"],
            fontSize: 25,
            fontWeight: "bold",
          },
        },
      },
    };
    return {};
  },
};
</script>

<style lang="scss" scoped>
.effectVerif {
  width: 70%;
  height: 75%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: #f7f7f7;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.15);
  border: solid 1px rgba(23, 41, 76, 0.2);
  padding: 10px 20px;
  .title {
    font-size: 22px;
    color: #2f7ae3;
    font-weight: bold;
    display: flex;
  }
  .task {
    display: flex;
    font-size: 14px;
    color: #3a404e;
    margin-bottom: 15px;
  }
  .label {
    display: flex;
    font-size: 18px;
    color: #2f7ae3;
    font-weight: bold;
    margin: 15px 0 13px 0;
  }
}
.parties {
  display: flex;
  .party {
    width: 25%;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 7px;
    background: #f7f7f7;
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.15);
    border: solid 1px rgba(23, 41, 76, 0.2);
    padding: 20px;
    color: #3a404e;
    font-size: 18px;
    margin-top: 10px;
    font-weight: bold;
  }
}
.lossPic {
  display: flex;
  .federal-train,
  .label-train,
  .merage-train {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;
    background: #f7f7f7;
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.15);
    border: solid 1px rgba(23, 41, 76, 0.2);
    padding: 20px;
    font-size: 18px;
    color: #3a404e;
    font-weight: bold;
    height: 300px;
  }
  .label-train {
    width: 60%;
  }
  .labelContent {
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    margin-right: 35px;
    .labelPic {
      height: 100%;
      width: 25%;
      display: flex;
      flex-direction: column;
      line-height: 100%;
    }
  }
}
.count {
  font-size: 20px;
  color: #2f7ae3;
  margin-top: 10px;
}
.partyName {
    font-size: 14px;
    margin-top: -45px;
}
</style>