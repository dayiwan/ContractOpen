<template>
  <div class="simulatData">
    <div class="party-bar">
      <div class="party-bar-header">
        <span class="party-bar-title">数据拥有方</span>
        <span class="party-bar-num">{{simulatDataData.parties_count}}</span>
      </div>
      <div class="part-bar-content">
        <div class="part-bar-item" :class="{'is-active': isPosition === 'all'}" @click="allData">全部</div>
        <div
          class="part-bar-item"
          :class="{'is-active': isPosition === item.party_name}"
          v-for="(item, index) in simulatDataData.parties"
          :key="index"
          @click="chooseParty(item.party_name)"
        >{{item.party_name}}</div>
      </div>
    </div>
    <div class="data-bar">
      <div class="data-bar-header">
        <div class="data-bar-title">
          <span class="data-bar-name">{{dataBarTitle}}</span>
          <span class="data-bar-num">{{dataBarData.length}}</span>
        </div>
        <el-input placeholder="请输入内容" v-model="searchModel">
          <el-button slot="append">搜索</el-button>
        </el-input>
      </div>
      <div class="data-bar-content">
        <div
          class="data-bar-item"
          :class="{'active': position === index}"
          v-for="(item, index) in dataBarData"
          :key="index"
          @click="chooseData(index)"
        >
          <span class="dataSetName">{{item.data_name}}</span>
          <span class="updateTime">更新时间:{{item.update_time}}</span>
          <div style="border-top:1px dashed #3a404e;height: 1px;overflow:hidden;margin: 5px 0;"></div>
        </div>
      </div>
    </div>
    <div class="data-info">
      <div class="data-info-header">
        <div class="data-info-title">
          <span class="dataName">{{dataInfoData.data_name}}</span>
          <el-button type="primary" @click="dataDetail">数据详情</el-button>
        </div>
        <span class="abstract">{{dataInfoData.abstract}}</span>
      </div>
      <el-table :data="dataInfoData.data_describle" border style="width:100%" max-height="600px">
        <el-table-column
          v-for="( item, index ) in tableHeader"
          :key="index"
          align="center"
          :label="item"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{ scope.row[item] }}</template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 数据详情 -->
    <el-dialog title="数据详情" :visible.sync="showDataDetail" :modal-append-to-body="false">
        <el-table :data="dataInfoData.data_introduction" border style="width:100%" max-height="500px">
            <el-table-column label="变量名称" prop="var_name"></el-table-column>
            <el-table-column label="含义描述" prop="var_meaning"></el-table-column>
            <el-table-column label="类型" prop="var_type"></el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>

<script>
import deepcopy from "deepcopy";
export default {
  name: "simulatData",
  props: {
    simulatDataData: {
      type: Object,
    },
  },
  data() {
    return {
      dataBarData: [],
      dataBarTitle: null,
      dataInfoData: {},
      searchModel: "",
      tableHeader: [],
      position: "0",
      isPosition: "all",
      showDataDetail: false,
    };
  },
  mounted() {
    this.allData();
  },
  methods: {
      //打开数据详情
      dataDetail() {
          this.showDataDetail = true;
      },
    //选择数据集
    chooseData(val) {
      this.position = val;
      this.dataInfoData = {};
      this.tableHeader = [];
      this.dataInfoData = deepcopy(this.dataBarData[val]);
      for (var key in this.dataInfoData.data_describle[0]) {
        this.tableHeader.push(key);
      }
    },
    //点击全部数据拥有方
    allData() {
      this.isPosition = "all";
      this.position = "0";
      this.dataBarTitle = "全部";
      this.dataBarData = [];
      const data = deepcopy(this.simulatDataData.parties);
      for (let item of data) {
        for (let partyData of item.party_data) {
          this.dataBarData.push(partyData);
        }
      }
      this.chooseData(0);
    },
    //选择特定数据拥有方
    chooseParty(val) {
      this.isPosition = val;
      this.position = "0";
      this.dataBarTitle = val;
      this.dataBarData = [];
      const data = deepcopy(this.simulatDataData.parties);
      for (let item of data) {
        if (item.party_name === val) {
          for (let partyData of item.party_data) {
            this.dataBarData.push(partyData);
          }
        }
      }
      this.chooseData(0);
    },
  },
};
</script>


<style lang="scss" scoped>
.simulatData {
  display: flex;
  flex-direction: row;
  width: 70%;
  height: 75%;
}
.party-bar {
  width: 17%;
  background: #f7f7f7;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.15);
  border: solid 1px rgba(23, 41, 76, 0.2);
  display: flex;
  flex-direction: column;
  padding: 10px;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  overflow-y: auto;
  &-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 20px;
    margin-bottom: 25px;
    .party-bar-title,
    .party-bar-num {
      font-size: 18px;
      color: rgb(33, 126, 255);
      font-weight: bold;
    }
    .party-bar-num {
      color: rgb(58, 64, 78);
    }
  }
}
.data-bar {
  flex-shrink: 0;
  width: 23%;
  margin-left: 10px;
  background: #f7f7f7;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.15);
  border: solid 1px rgba(23, 41, 76, 0.2);
  padding: 15px;
  overflow-y: auto;
  &-header {
    .dataNum {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      font-size: 18px;
      color: rgb(58, 64, 78);
      font-weight: bold;
    }
  }
}
.data-info {
  width: 60%;
  flex-direction: column;
  margin-left: 10px;
  background: #f7f7f7;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.15);
  border: solid 1px rgba(23, 41, 76, 0.2);
  padding: 15px;
  display: flex;
  position: relative;
  .abstract {
    display: flex;
    margin-bottom: 15px;
    flex-wrap: wrap;
    font-size: 14px;
    color: rgb(58, 64, 78);
  }
  &-title {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-bottom: 10px;
    .dataName {
      font-size: 18px;
      color: rgb(33, 126, 255);
      font-weight: bold;
    }
  }
}
.data-bar-title {
  display: flex;
  justify-content: space-between;
  line-height: 20px;
  margin-bottom: 17.5px;
  .data-bar-name,
  .data-bar-num {
    font-size: 18px;
    color: rgb(33, 126, 255);
    font-weight: bold;
  }
  .data-bar-num {
    color: rgb(58, 64, 78);
  }
}
.data-bar-item {
  display: flex;
  flex-direction: column;
  height: 50px;
  margin-bottom: 20px;
  cursor: pointer;
  .dataSetName,
  .updateTime {
    display: flex;
  }
  .updateTime {
    font-size: 12px;
    color: #3a404e;
    margin: 5px 0;
  }
  .dataSetName {
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
  }
}
.active {
  color: rgb(33, 126, 255);
}
.part-bar-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.part-bar-item {
  margin-top: 15px;
  width: 140px;
  height: 36px;
  line-height: 36px;
  background: #cce1ff;
  border-color: #7da9e6;
  color: #2f7ae3;
  border-radius: 3px;
  cursor: pointer;
}
.is-active {
  background-color: rgb(47, 122, 227);
  color: rgb(255, 255, 255);
}
</style>