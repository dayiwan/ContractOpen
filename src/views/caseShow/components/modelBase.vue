<template>
  <div class="modelBase">
    <div class="model-header">
      <span class="model-title">我的模型</span>
      <span class="num">{{modelData.model_count}}</span>
    </div>
    <el-input placeholder="请输入内容" v-model="searchModel">
      <el-button slot="append">搜索</el-button>
    </el-input>
    <el-table :data="modelData.models" border style="width:100%" max-height="560px">
      <el-table-column prop="create_time" label="时间"></el-table-column>
      <el-table-column prop="model_name" label="模型名称"></el-table-column>
      <el-table-column prop="case_name" label="案例名称"></el-table-column>
      <el-table-column prop="algorithm" label="应用算法"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="modelDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 模型参数详情 -->
    <el-dialog title="模型参数" :visible.sync="showModelDetail" :modal-append-to-body="false">
      <modelDetail :modelDetailData="modelDetailData" />
    </el-dialog>
  </div>
</template>

<script>
import modelDetail from "./modelDetail";
import deepcopy from "deepcopy";
export default {
  name: "modelBase",
  components: { modelDetail },
  props: {
    modelData: {
      type: Object,
    },
  },
  data() {
    return {
      searchModel: null,
      showModelDetail: false,
      modelDetailData: {
        lineChartData: null,
        model_name: null,
        parmater: null,
        parties: null,
      },
    };
  },
  methods: {
    modelDetail(data) {
      const modelData = {
        columns: ['num','loss_curve'],
        rows: [],
      };
      const picData = deepcopy(data)
      picData.loss = JSON.parse(picData.loss);
      picData.parmater = JSON.parse(picData.parmater);
      picData.parties = JSON.parse(picData.parties);
      for (let i = 0; i < picData.loss.loss_curve.length; i++) {
        const row = {};
        row['num'] = i;
        row['loss_curve'] = picData.loss.loss_curve[i];
        modelData.rows.push(row)
      }
      const parties_data = []
      for (let j = 0; j < picData.parties.party_name.length; j ++) {
        const party = {}
        party['party_name'] = picData.parties.party_name[j]
        party['data_name'] = picData.parties.data_name[j]
        party['data_count'] = picData.parties.data_count[j]
        party['rate'] = picData.parties.rate[j]
        parties_data.push(party)
      }
      this.modelDetailData.lineChartData = modelData;
      this.modelDetailData.model_name = picData.model_name;
      this.modelDetailData.parmater = picData.parmater;
      this.modelDetailData.parties = parties_data;
      this.showModelDetail = true;
    },
  },
};
</script>

<style lang="scss">
.modelBase {
  width: 60%;
  height: 75%;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.15);
  border: solid 1px rgba(23, 41, 76, 0.2);
  padding: 20px;
}
.model-header {
  width: 100%;
  background: #f7f7f7;
  line-height: 18px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.model-title {
  font-size: 18px;
  color: rgb(47, 122, 227);
  font-weight: bold;
}
.num {
  font-size: 18px;
  color: rgb(58, 64, 78);
  font-weight: bold;
}
.el-input {
  margin-bottom: 20px;
}
.el-input-group__append button.el-button {
  background-color: #2f7ae3;
  color: #ffffff;
}
.el-dialog__title {
  line-height: 24px;
  font-size: 18px;
  color: #2f7ae3;
  display: flex;
}
</style>