<template>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    height="350"
    @selection-change="change"
  >
    <el-table-column type="selection" width="55" align="center"></el-table-column>
    <el-table-column label="数据名称" align="center">
      <template slot-scope="scope">
        <span>{{scope.row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column label="积分" prop="price" align="center"></el-table-column>
    <el-table-column label="操作" show-overflow-tooltip align="center">
      <template slot-scope="scope">
        <span class="link-type" @click="delGoods(scope.row.cartUuid)">删除</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { delGoodsApi } from "@/api/ShopCart.js"
export default {
  props: {
    status: {
      type: String
    },
    tableData: {
      type: Array
    },
  },

  methods: {
    //删除商品
    delGoods: function(id) {
        this.$confirm('是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
              const cartUuidList = [];
              cartUuidList.push(id)
              var params = {
                "cartsUuidList": cartUuidList
              }
              await delGoodsApi(params)
              this.$router.go(0);
            }).catch(() => {
          });
      },
    change(selection) {
      this.$emit("dataArr", selection);
    },
    getCheck(val) {
      if (val == 1) {
        this.$refs.multipleTable.clearSelection();
      } else {
        this.$refs.multipleTable.clearSelection();
        this.tableData.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.link-type {
  color: #2f7ae3;
  cursor: pointer;
}
.iconMoney {
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
  width: 40px;
  height: 40px;
  border: 1px solid #eee;
  img {
    margin-top: 5px;
    width: 30px;
    height: 30px;
  }
}
</style>
