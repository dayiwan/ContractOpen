<template>
    <el-container>
        <el-header style="height: 75px">
            <div class="left">订单管理</div>
            <div class="right"></div>
        </el-header>
        <el-main>
            <div class="order_header">
                <div class="left_tab">
                    <el-button type="primary" @click="allOrder">全部订单</el-button>
                    <el-button type="primary" @click="noCheck">待审核</el-button>
                </div>
                <div class="right_form">
                    <el-form ref="form" :model="form"  :inline="true">
                        <el-form-item label="订单号">
                            <el-input v-model="form.orderNumber" placeholder="订单号"></el-input>
                        </el-form-item>
                        <el-form-item label="下单时间">
                            <el-date-picker
                                    v-model="form.orderDateStart"
                                    type="date"
                                    placeholder="起始日期">
                            </el-date-picker>
                            <el-date-picker
                                    v-model="form.orderDateEnd"
                                    type="date"
                                    placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="search">订单搜索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="order_list" v-for="(item, index) in tableData" :key="index">
                <el-table
                        :data="item.orderItemsInfo"
                        :span-method="objectSpanMethod"
                        style="width: 100%">
                    <el-table-column
                            prop="dataName"
                            label="数据名称">
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="积分">
                    </el-table-column>
                    <el-table-column
                            prop="shareStatus"
                            label="卖方意见">
                    </el-table-column>
                    <el-table-column
                            prop="platformCheck"
                            label="审核状态">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            align="center">
                        <template slot-scope="scope">
                            <div style="text-align: center" class="btn">
                                <el-button type="primary" @click="btnUrge(scope.row.orderUuid)" >催办</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label=""
                            align="right">
                        <template slot-scope="scope">
                            <div style="text-align: center" class="btn">
                                <el-button type="primary" @click="btnPass(scope.row.orderUuid)" >通过</el-button>
                                <span class="btnDelete" @click="btnRefuse(scope.row.orderUuid)">驳回</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="footer_box">
                    <span>订单号：{{item.uuid}}</span>
                    <span>订单方：{{item.username}}</span>
                    <span>下单时间：{{item.modifyTime}}</span>
                </div>
            </div>
        </el-main>
        <el-footer>
            <el-pagination
            class="pagination"
            background
            layout="prev, pager, next, total"
            :page-size="pagination.pageSize"
            @current-change="pageChange"
            :total="pagination.total">
            </el-pagination>
        </el-footer>
    </el-container>
</template>

<script>
import { getOrderListApi } from "@/api/MyOrder.js";
import { passOrderApi, refuseOrderApi } from "@/api/OrderAudit.js"
import { stampToTime } from "@/utils/toolkit.js";
export default {
    name: 'orderManage',
    data() {
        return {
            paySate: '',
            tableData: [],
            form: {
                orderNumber: '',
                orderDateStart: '',
                orderDateEnd: ''
            },
            pagination:{
                currentPage: 1,
                pageSize: 3,
                total: 0
            },
            orderState: null
        }
    },
    mounted(){
        this.ListOrderInfo();
    },
    methods:{
        //表格合并
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            var mergeNum = 0;
            if (columnIndex === 5) {
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
        //驳回订单审核
        btnRefuse: function(id){
            this.$confirm('是否驳回?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                var params = {
                    "uuid": id
                }
                await refuseOrderApi(JSON.stringify(params))
                this.$message({
                    type: 'success',
                    message: '驳回成功!'
                });
                this.$router.go(0);
            }).catch(() => {
            });
        },
        //通过订单审核
        btnPass: function(id){
            this.$confirm('是否通过?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                var params = {
                    "uuid": id
                }
                await passOrderApi(JSON.stringify(params))
                this.$message({
                    type: 'success',
                    message: '通过成功!'
                });
                this.$router.go(0);
            }).catch(() => {
            });
        },
        //查询全部订单
        allOrder(){
            this.orderState = null
            this.ListOrderInfo();
        },
        // 查询待付款订单
        noCheck(){
            this.orderState = '0'
            this.ListOrderInfo();
        },
        // 搜索
        search(){
            this.ListOrderInfo();
        },
        //查询订单列表
        async ListOrderInfo(){
             if (this.form.orderDateStart == null){
                this.form.orderDateStart = ''
            }
            if (this.form.orderDateEnd == null){
                this.form.orderDateEnd = ''
            }
            var params = {
                currPage:this.pagination.currentPage,
                limit: this.pagination.pageSize,
                uuid: this.form.orderNumber,
                createTime: this.form.orderDateStart,
                stopTime: this.form.orderDateEnd,
                superviseCheck: this.orderState
            };
            var res = await getOrderListApi(JSON.stringify(params))
            this.pagination.total = res.totalCount
            for (let i = 0; i < res.list.length; i++){
                if (res.list[i].superviseCheck == 1){
                    for (let j = 0; j < res.list[i].orderItemsInfo.length; j++){
                        res.list[i].orderItemsInfo[j].platformCheck = '审核通过'
                    }
                }  else {
                    for (let j = 0; j < res.list[i].orderItemsInfo.length; j++){
                        res.list[i].orderItemsInfo[j].platformCheck = '审核中'
                    }
                }
                res.list[i]["modifyTime"] = stampToTime(res.list[i].modifyTime);
                for (let j = 0; j < res.list[i].orderItemsInfo.length; j++) {
                    if (res.list[i].orderItemsInfo[j].shareStatus === 0) {
                        res.list[i].orderItemsInfo[j].shareStatus = "未同意"
                    } else if (res.list[i].orderItemsInfo[j].shareStatus === 1) {
                        res.list[i].orderItemsInfo[j].shareStatus = "已同意"
                    }
                }
            }
            this.tableData = res.list;
        },
        // //翻页
        pageChange(page){
            this.pagination.currentPage = page;
            this.ListOrderInfo();
        },

    }
}
</script>
<style lang="scss" scoped>
@import "./OrderAudit.scss";
</style>
