<template>
  <el-table :data="modelTable" tooltip-effect="dark" style="border:1px solid #F1F3F9;">
    <el-table-column label="训练业务" align="center">
      <template slot-scope="scope">
        <el-select v-model="values" placeholder="请选择" @change="change">
          <el-option
            v-for="item in scope.row.model"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="查询业务" align="center">
      <template>
        <el-select placeholder="请选择" disabled></el-select>
      </template>
    </el-table-column>
    <el-table-column label="统计业务" align="center">
      <template>
        <el-select placeholder="请选择" disabled></el-select>
      </template>
    </el-table-column>
    <el-table-column prop="integral" label="积分" align="center">{{integral}}</el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      modelTable: [
        { model: [
            { value: "神经网络(三层)" , integral: "50"}, 
            { value: "逻辑回归1",   integral: "60"}, 
            { value: "神经网络(五层)", integral: "70" },
            { value: "逻辑回归2", integral: "80"}
          ]  
        }
      ],
      values: "",
      integral: 0
    };
  },
  mounted() {
    this.getModelTable();
  },
  methods: {
    change(val) {
      for (let i = 0; i < this.modelTable[0].model.length; i++) {
        if (val == this.modelTable[0].model[i].value) {
          this.integral = this.modelTable[0].model[i].integral;
        }
      }
      this.getModelTable();
    },
    getModelTable() {
      var params = new Object()
      params.name = this.values;
      params.price = this.integral;
      this.$emit("integral", params);
    }
  }
};
</script>