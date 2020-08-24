<template>
  <div class="shopcrat-page">
    <div class="container">
      <div class="cart-table">
        <div class="data-list">
          <div class="data-list-title">
            <span>数据清单</span>
          </div>
          <div class="data-list-content">
            <dataListTable :tableData="goods_arr" @dataArr="getShopDetail" :status="status" />
          </div>
        </div>
      </div>
      <div class="model-list">
        <div class="model-list-name">
          <span>业务清单</span>
          <modelListTable @integral="getModelTable" />
        </div>
        <div class="model-list-purpose">
          <span>任务名称</span>
          <div class="content">
            <el-input type="textarea" :rows="5" placeholder="请输入任务名称" v-model="taskName" clearable></el-input>
          </div>
        </div>
        <div class="model-list-purpose">
          <span>任务描述</span>
          <div class="content">
            <el-input type="textarea" :rows="5" placeholder="请输入任务描述" v-model="purpose" clearable></el-input>
          </div>
        </div>
      </div>
      <div class="settlement">
        <div class="check">
          <el-button type="primary" style="width: 100px" @click="delGoods">删除</el-button>
        </div>
        <div class="add-order">
          <el-button type="primary" style="width: 200px" @click="goOrderDetail">提交订单</el-button>
        </div>
        <div class="all-money">
          <h5 style="color:#909399;margin: 0">总计</h5>
          <span style="font-size: 20px;color: #4698ff">{{ totalPirce }}</span>
        </div>
        <div class="all-data">
          <h6 style="color:#909399;margin: 0">订单结算</h6>
          <span style="font-size: 10px">{{number}}件商品</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataListTable from "./components/dataListTable";
import modelListTable from "./components/modelListTable";
import { getOrderDetailApi } from "@/api/OrderDetail.js";
import { mapGetters } from "vuex";
import { delGoodsApi, initCartApi } from "@/api/ShopCart.js";
import { getUserName } from "@/utils/cookies.js";
export default {
  name: "ShopCart",
  components: {
    dataListTable,
    modelListTable
  },
  computed: {
    totalPirce: function() {
      return Number(this.modelPrice) + this.price;
    },
  },
  mounted() {
    this.getShopGoodsList();
  },
  data() {
    return {
      number: 0,
      price: 0,
      price1: 0,
      purpose: "",
      taskName: "",
      dataTable: [],
      options: [],
      modelPrice: null,
      modelName: null,
      checked: false,
      selectedOrderList: [],
      modelCode: null,
      status: "1",
      cartUuidList: [],
      goods_arr: []
    };
  },

  methods: {
    // 获取购物车列表
    async getShopGoodsList() {
      var username = getUserName();
      this.goods_arr = await initCartApi(username);
    },
    //删除购物车商品
    delGoods: function() {
      if (this.cartUuidList.length === 0) {
        this.$message({
          type: "error",
          message: "请选择要删除的数据"
        });
        return;
      } else {
        this.$confirm("是否删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            var params = {
              cartsUuidList: this.cartUuidList
            };
            await delGoodsApi(params);
            this.$router.go(0);
          })
          .catch(() => {});
      }
    },
    //获取所选数据列表
    getShopDetail(data) {
      this.selectedOrderList = [];
      this.cartUuidList = [];
      this.number = data.length;
      this.price = 0;
      for (let i = 0; i < data.length; i++) {
        this.price += Number(data[i].price);
        this.cartUuidList.push(data[i].cartUuid);
        this.selectedOrderList.push({
          count: -1,
          dataName: data[i].name,
          dataUuid: data[i].dataUuid,
          sellerName: data[i].sellerName,
          price: data[i].price,
          type: data[i].type
        });
      }
    },
    //获取所选模型列表
    getModelTable(data) {
      this.modelName = data.name;
      this.modelPrice = data.price;
      if (this.modelName == "神经网络(三层)") {
        this.modelCode = "cb3e4fde-74b0-11ea-b44e-005056c00008";
      } else if (this.modelName == "逻辑回归1") {
        this.modelCode = "edc88174-74b0-11ea-b1f1-005056c00008";
      } else if (this.modelName == "神经网络(五层)") {
        this.modelCode = "0598a2d8-74b1-11ea-856d-005056c00008";
      } else if (this.modelName == "逻辑回归2") {
        this.modelCode = "107c0cf6-74b1-11ea-b957-005056c00008";
      } else {
        this.modelCode = "";
      }
    },
    //提交订单
    goOrderDetail: function() {
      if (this.modelCode === "") {
        this.$message({
          type: "error",
          message: "请选择模型"
        });
        return;
      }
      if (this.purpose === "" || this.taskName === "") {
        this.$message({
          type: "error",
          message: "请输入任务名或任务描述"
        });
        return;
      }
      if (this.taskName.length > 32) {
        this.$message({
          type: "error",
          message: "任务名长度不应超过32个字符"
        });
        return;
      }
      this.$confirm("是否确定提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          var params = {
            orderItemEntity: this.selectedOrderList,
            payState: 0,
            totalAmount: this.totalPirce,
            username: getUserName(),
            model: this.modelCode,
            modelPrice: this.modelPrice,
            purpose: this.purpose,
            taskName: this.taskName
          };
          await getOrderDetailApi(JSON.stringify(params));
          var delparams = { cartsUuidList: this.cartUuidList };
          await delGoodsApi(delparams);
          this.$router.push("/my/order");
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./ShopCart.scss";
</style>
