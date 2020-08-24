<template>
  <el-container>
    <el-header style="height: 75px">
      <div class="left">我的订单</div>
      <div class="right"></div>
    </el-header>
    <el-main>
      <div class="order_header">
        <div class="left_tab">
          <el-button type="primary" @click="allOrder">全部订单</el-button>
          <el-button type="primary" @click="noPay">待付款</el-button>
          <!-- <span class="active">全部订单</span>&nbsp;&nbsp;
          <span class="active">待付款</span>-->
        </div>
        <div class="right_form">
          <el-form ref="form" :model="form" :inline="true">
            <el-form-item label="订单号">
              <el-input v-model="form.orderNumber" placeholder="数据名称/订单号"></el-input>
            </el-form-item>
            <el-form-item label="下单时间">
              <el-date-picker v-model="form.orderDateStart" type="date" placeholder="开始日期"></el-date-picker>
              <el-date-picker v-model="form.orderDateEnd" type="date" placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">订单搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="order_list">
        <ul>
          <li v-for="(item, index) in tableData" :key="index">
            <div class="one" v-if="item.payState == 0">
              <el-table
                :data="item.orderItemsInfo"
                :span-method="objectSpanMethod"
                style="width: 100%"
              >
                <el-table-column prop="dataName" label="数据名称"></el-table-column>
                <el-table-column prop="price" label="积分"></el-table-column>
                <el-table-column prop="platformCheck" label="审核状态"></el-table-column>
                <!-- <el-table-column
                                    prop="superviseCheck"
                                    label="监管方审核状态"
                                    :formatter="formatterSuperviseCheck">
                </el-table-column>-->
                <el-table-column label="待支付" align="right">
                  <template slot-scope="scope">
                    <div style="text-align: center" class="btn">
                      <el-button
                        type="primary"
                        @click="btnPay(scope.row.orderUuid, scope.row.platformCheck)"
                      >立即预支付</el-button>
                      <span class="btnDelete" @click="btnDelete(scope.row.orderUuid)">删除</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="footer_box">
                <span>订单号：{{item.uuid}}</span>
                <span>下单时间：{{item.modifyTime}}</span>
              </div>
            </div>
            <div class="two" v-if="item.payState == 1">
              <el-table
                :data="item.orderItemsInfo"
                :span-method="objectSpanMethod"
                style="width: 100%"
              >
                <el-table-column prop="dataName" label="数据名称"></el-table-column>
                <el-table-column prop="price" label="积分"></el-table-column>
                <el-table-column prop="platformCheck" label="审核状态"></el-table-column>
                <!-- <el-table-column
                                        prop="superviseCheck"
                                        label="监管方审核状态"
                                        :formatter="formatterSuperviseCheck">
                </el-table-column>-->
                <el-table-column label="已预支付" align="right">
                  <template>
                    <div style="text-align: center" class="btn">
                      <el-button type="primary" @click="myTask()">我的任务</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="footer_box">
                <span>订单号：{{item.uuid}}</span>
                <span>下单时间：{{item.modifyTime}}</span>
              </div>
            </div>
            <div class="three" v-if="item.payState == 2">
              <el-table
                :data="item.orderItemsInfo"
                :span-method="objectSpanMethod"
                style="width: 100%"
              >
                <el-table-column prop="dataName" label="数据名称"></el-table-column>
                <el-table-column prop="price" label="积分"></el-table-column>
                <el-table-column prop="platformCheck" label="审核状态"></el-table-column>
                <el-table-column label="已完成支付" align="right">
                  <template>
                    <div style="text-align: center" class="btn">
                      <el-button type="primary" @click="myTask()">我的任务</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="footer_box">
                <span>订单号：{{item.uuid}}</span>
                <span>下单时间：{{item.modifyTime}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <span slot="title">订单预支付</span>
        <span>
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            center
          >
            <el-form-item label="支付密码">
              <el-input v-model="ruleForm.password" placeholder="请输入支付密码" type="password"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer">
          <div class="dialog-footer">
            <el-button style="" type="primary" @click="payOrder" v-if="!isPay">确认支付</el-button>
            <el-button style="" type="primary" disabled v-else>支付中...</el-button>
          </div>
        </span>
      </el-dialog>
    </el-main>
    <el-footer>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next, total"
        :page-size="pagination.pageSize"
        @current-change="pageChange"
        :total="pagination.total"
      ></el-pagination>
    </el-footer>
  </el-container>
</template>
<script>
import {
  getOrderListApi,
  getPayOrderApi,
  getDelOrderApi
} from "@/api/MyOrder.js";
import { stampToTime } from "@/utils/toolkit.js";
import { getUserName } from "@/utils/cookies.js";
export default {
  name: "myOrder",
  data() {
    return {
      paySate: "",
      tableData: [],
      form: {
        orderNumber: "",
        orderDateStart: "",
        orderDateEnd: ""
      },
      pagination: {
        currentPage: 1,
        pageSize: 3,
        total: 0
      },
      dialogVisible: false,
      ruleForm: {
          password: ''
      },
      payOrderId : '',
      isPay: false,
      fromeName: '1'
    };
  },

    //判断路由来处,刷新页面
  beforeRouteEnter (to, from, next){
    next(vm => {
      vm.fromeName = from.name
      
      if (from.name === 'shopCart'){
        vm.$router.go(0)
      }
    })
  },
  mounted() {
    this.ListOrderInfo();
  },
  methods: {
    //预支付
    async payOrder(){
        if (this.ruleForm.password !== '123456'){
            this.$message({
              type: "error",
              message: "密码错误，请重新输入!"
            });
        } else if (this.ruleForm.password === '123456'){
            this.isPay = true
            var params = {
              orderUuid: this.payOrderId
            };
            await getPayOrderApi(JSON.stringify(params));
            this.dialogVisible = false
            this.payOrderId = ''
            this.$router.go(0);
            this.$message({
              type: "success",
              message: "支付成功!"
            });
        }
    },
    //表格合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 3) {
        if (rowIndex % 2 == 0) {
          return {
            rowspan: 1000,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    //查询全部订单
    allOrder() {
      this.paySate = "";
      this.ListOrderInfo();
    },
    // 查询待付款订单
    noPay() {
      this.paySate = "0";
      this.ListOrderInfo();
    },
    // 搜索
    search() {
      this.ListOrderInfo();
    },
    // 拉取我的订单列表
    async ListOrderInfo() {
      if (this.form.orderDateStart == null) {
        this.form.orderDateStart = "";
      }
      if (this.form.orderDateEnd == null) {
        this.form.orderDateEnd = "";
      }
      var params = {
        currPage: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        uuid: this.form.orderNumber,
        username: getUserName(),
        createTime: this.form.orderDateStart,
        stopTime: this.form.orderDateEnd,
        payState: this.paySate
      };
      var res = await getOrderListApi(JSON.stringify(params));

      this.pagination.total = res.totalCount;
      for (let i = 0; i < res.list.length; i++) {
        if (res.list[i].platformCheck == 1 && res.list[i].superviseCheck == 1) {
          for (let j = 0; j < res.list[i].orderItemsInfo.length; j++) {
            res.list[i].orderItemsInfo[j].platformCheck = "审核通过";
          }
        } else {
          for (let j = 0; j < res.list[i].orderItemsInfo.length; j++) {
            res.list[i].orderItemsInfo[j].platformCheck = "审核中";
          }
        }
        res.list[i]["modifyTime"] = stampToTime(res.list[i].modifyTime);
      }
      this.tableData = res.list;
    },
    //翻页
    pageChange(page) {
      this.pagination.currentPage = page;
      this.ListOrderInfo();
    },

    //删除订单
    btnDelete: function(id) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let orderUuid = [];
          orderUuid.push(id);
          var params = {
            orderUuid: orderUuid
          };
          await getDelOrderApi(JSON.stringify(params));
          this.$router.go(0);
        })
        .catch(() => {});
    },
    //跳转到我的任务
    myTask: function() {
      this.$router.push({ name: "task" });
    },
    //预支付判断
    btnPay: function(id, state) {
        this.payOrderId = ''
        if (state === "审核中") {
            this.$confirm("订单正在审核，暂不能支付", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "error"
            });
            return;
        } else {
            this.dialogVisible = true
            this.isPay = false
            this.payOrderId = id
        }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./MyOrder.scss";
</style>
