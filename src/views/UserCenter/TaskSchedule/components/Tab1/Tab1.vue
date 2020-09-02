<template>
  <div class="tab1-page">
    <div class="operation">
      <img
        :src="require('../../../../../assets/usercenter/taskschedule/insert-top.png')"
        @click="insertRow('top')"
      />
      <img
        :src="require('../../../../../assets/usercenter/taskschedule/insert-bottom.png')"
        @click="insertRow('bottom')"
      />
      <img
        :src="require('../../../../../assets/usercenter/taskschedule/delete.png')"
        @click="deleteRow"
      />
      <img
        :src="currentIndex == 0 ? 
          require('../../../../../assets/usercenter/taskschedule/arrow-dark.png') : 
          require('../../../../../assets/usercenter/taskschedule/arrow-light.png')"
        @click="up"
        :style="{transform: currentIndex != 0 ? 'rotate(180deg)' : 'rotate(0deg)'}"
      />
      <img
        :src="currentIndex < tableData.length - 1 ? 
          require('../../../../../assets/usercenter/taskschedule/arrow-light.png') : 
          require('../../../../../assets/usercenter/taskschedule/arrow-dark.png')"
        @click="down"
        :style="{transform: currentIndex < tableData.length - 1 ? 'rotate(0deg)' : 'rotate(180deg)'}"
      />
      <div>建模参数文件配置</div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @row-click="cellBlur"
      highlight-current-row
      @current-change="currentRowChange"
      ref="prepareTable"
      header-row-class-name="table-header"
      row-class-name="table-row"
    >
      <el-table-column label="Column 1" align="center">
        <template slot-scope="scope">
          <el-input
            placeholder="请输入内容"
            v-show="showCell.row && showCell.row.id == scope.row.id && showCell.column == 1"
            v-model="scope.row.value1"
            :ref="`${scope.row.id}-1`"
          ></el-input>
          <span
            v-show="!showCell.row || (showCell.row && showCell.row.id != scope.row.id) || (showCell.row && showCell.column != 1)"
            @click.stop="cellFocus(scope.row,1)"
          >{{scope.row.value1 || '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Column 2" align="center">
        <template slot-scope="scope">
          <el-input
            placeholder="请输入内容"
            v-show="showCell.row && showCell.row.id == scope.row.id && showCell.column == 2"
            v-model="scope.row.value2"
            :ref="`${scope.row.id}-2`"
          ></el-input>
          <span
            v-show="!showCell.row || (showCell.row && showCell.row.id != scope.row.id) || (showCell.row && showCell.column != 2)"
            @click.stop="cellFocus(scope.row,2)"
          >{{scope.row.value2 || '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Column 3" align="center">
        <template slot-scope="scope">
          <el-input
            placeholder="请输入内容"
            v-show="showCell.row && showCell.row.id == scope.row.id && showCell.column == 3"
            v-model="scope.row.value3"
            :ref="`${scope.row.id}-3`"
          ></el-input>
          <span
            v-show="!showCell.row || (showCell.row && showCell.row.id != scope.row.id) || (showCell.row && showCell.column != 3)"
            @click.stop="cellFocus(scope.row,3)"
          >{{scope.row.value3 || '-'}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "tab1",
  components: {},
  mounted() {
    this.$refs.prepareTable.setCurrentRow(this.tableData[0]);
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          value1: "2016-05-03",
          value2: "王小虎",
          value3: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          value1: "2016-05-02",
          value2: "王小虎",
          value3: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 3,
          value1: "2016-05-04",
          value2: "王小虎",
          value3: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 4,
          value1: "2016-05-01",
          value2: "王小虎",
          value3: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 5,
          value1: "2016-05-08",
          value2: "王小虎",
          value3: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 6,
          value1: "2016-05-06",
          value2: "王小虎",
          value3: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 7,
          value1: "2016-05-07",
          value2: "王小虎",
          value3: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      showCell: {
        row: null,
        column: 0
      },
      currentRow: null,
      currentIndex: 0,
      rowIncreaseId: 0
    };
  },
  methods: {
    cellFocus: function(row, index) {
      this.showCell = {
        row,
        column: index
      };
      let _this = this;
      setTimeout(function() {
        _this.$refs[`${row.id}-${index}`].focus();
      }, 1);
    },
    cellBlur: function() {
      this.showCell = {
        row: null,
        column: 0
      };
    },
    currentRowChange: function(val) {
      this.currentRow = val;
      let currentIndex = this.tableData.findIndex(d => {
        return d.id == val.id;
      });
      if (currentIndex > -1) {
        this.currentIndex = currentIndex;
      }
    },
    down: function() {
      if (this.currentIndex < this.tableData.length - 1) {
        this.$refs.prepareTable.setCurrentRow(
          this.tableData[this.currentIndex + 1]
        );
      }
    },
    up: function() {
      if (this.currentIndex > 0) {
        this.$refs.prepareTable.setCurrentRow(
          this.tableData[this.currentIndex - 1]
        );
      }
    },
    deleteRow: function() {
      if (this.tableData && this.tableData.length > 0) {
        this.tableData.splice(this.currentIndex, 1);
        let currentRow = null;
        if (this.currentIndex > this.tableData.length - 1) {
          currentRow = this.tableData[this.currentIndex - 1];
        } else {
          currentRow = this.tableData[this.currentIndex];
        }
        this.$refs.prepareTable.setCurrentRow(currentRow);
      }
    },
    insertRow: function(type) {
      let item = {
        id: `new-${this.rowIncreaseId}`,
        value1: "",
        value2: "",
        value3: ""
      };
      if (type == "top") {
        this.tableData.splice(this.currentIndex, 0, item);
        this.currentIndex = this.currentIndex + 1;
      } else {
        this.tableData.splice(this.currentIndex + 1, 0, item);
      }
      this.rowIncreaseId = this.rowIncreaseId + 1;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "./Tab1.scss";
</style>