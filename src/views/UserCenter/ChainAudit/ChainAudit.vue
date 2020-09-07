<template>
  <div class="chain-audit-page">
    <div class="statistic">
      <h3>链上审计</h3>
      <div>
        <div
          class="card-item"
          v-for="(item,index) in statistic"
          :key="index"
          :style="{backgroundImage: `linear-gradient(45deg,${colorArr[index][0]} 0%,${colorArr[index][1]} 100%)`}"
        >
          <div class="num">{{item.num || 0}}</div>
          <div class="desc">{{item.name|| '-'}}</div>
        </div>
      </div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="建模业务审计">
        <el-form
          :model="searchForm1"
          ref="ruleForm"
          label-width="100px"
          class="search-form"
          :inline="true"
          size="medium"
        >
          <el-form-item label="使用方名称:" prop="party" required>
            <el-select v-model="searchForm1.party" placeholder="请选择" filterable>
              <el-option label="贵阳银行" value="guiyang"></el-option>
              <el-option label="贵州银行" value="guizhou"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据集名称:" prop="dataset">
            <el-select v-model="searchForm1.dataset" placeholder="请选择">
              <el-option label="全部" value="dataset"></el-option>
              <el-option label="数据集一" value="dataset1"></el-option>
              <el-option label="数据集二" value="dataset2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易时间段:" prop="date1">
            <el-date-picker
              v-model="searchForm1.date"
              type="daterange"
              range-separator
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="list">
          <el-card class="list-item" shadow="hover" v-for="item in modelList" :key="item.orderId">
            <div slot="header" class="item-header">
              <span class="item-label">
                订单号：
                <span class="item-desc">{{item.orderId}}</span>
              </span>
              <span class="item-label">
                使用方：
                <span class="item-desc">{{item.party}}</span>
              </span>
              <span class="item-label">
                任务名称：
                <span class="item-desc">{{item.name}}</span>
              </span>
              <span class="item-label">
                交易时间：
                <span class="item-desc">{{item.time}}</span>
              </span>
            </div>
            <el-table :data="item.detail" style="width: 100%">
              <el-table-column prop="name" label="数据集名称"></el-table-column>
              <el-table-column prop="points" label="积分"></el-table-column>
              <el-table-column prop="provider" label="数据提供方"></el-table-column>
              <el-table-column label="操作" width="100px">
                <template slot-scope="scope">
                  <div @click="toDetail(scope.row,item,'model')">
                    <div class="icon-img"></div>
                    <el-button type="text" size="small">详情</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-pagination
            :current-page="1"
            :page-sizes="[10, 20, 30, 40, 50 ]"
            layout="sizes, prev, pager, next, jumper"
            :total="50"
            background
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="查询业务审计">
        <el-form
          :model="searchForm2"
          ref="ruleForm"
          label-width="100px"
          class="search-form"
          :inline="true"
          size="medium"
        >
          <el-form-item label="使用方名称:" prop="party" required>
            <el-select v-model="searchForm2.party" placeholder="请选择" filterable>
              <el-option label="贵阳银行" value="guiyang"></el-option>
              <el-option label="贵州银行" value="guizhou"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易时间段:" prop="date1">
            <el-date-picker
              v-model="searchForm2.date"
              type="daterange"
              range-separator
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="list">
          <el-card class="list-item" shadow="hover" v-for="item in queryList" :key="item.orderId">
            <div slot="header" class="item-header">
              <span class="item-label">
                订单号：
                <span class="item-desc">{{item.orderId}}</span>
              </span>
              <span class="item-label">
                使用方：
                <span class="item-desc">{{item.party}}</span>
              </span>
              <span class="item-label">
                交易时间：
                <span class="item-desc">{{item.time}}</span>
              </span>
            </div>
            <el-table :data="item.detail" style="width: 100%">
              <el-table-column prop="name" label="数据集名称"></el-table-column>
              <el-table-column prop="provider" label="数据提供方"></el-table-column>
              <el-table-column prop="dataType" label="数据类型">
                <template slot-scope="scope">
                  <span>{{ scope.row.dataType && scope.row.dataType.length>0 ? scope.row.dataType.join('、').length > 9 ? scope.row.dataType.join('、').slice(0,9) + '...' : scope.row.dataType.join('、') : '-'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="queryList" label="查询名单">
                <template slot-scope="scope">
                  <span>{{ scope.row.queryList && scope.row.queryList.length > 0 ? `[${scope.row.queryList[0].name}-${scope.row.queryList[0].id}]...` : '-'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="desc" label="用途描述"></el-table-column>
              <el-table-column label="操作" width="100px">
                <template slot-scope="scope">
                  <div @click="toDetail(scope.row,item,'query')">
                    <div class="icon-img"></div>
                    <el-button type="text" size="small">详情</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-pagination
            :current-page="1"
            :page-sizes="[10, 20, 30, 40, 50 ]"
            layout="sizes, prev, pager, next, jumper"
            :total="50"
            background
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import anime from "animejs";
export default {
  name: "chainAudit",
  components: {},
  mounted() {},
  data() {
    return {
      statistic: [
        { name: "节点数", num: 12 },
        { name: "已部署合约数量", num: 123 },
        { name: "区块总数", num: 35647 },
        { name: "交易总数", num: 5647 }
      ],
      colorArr: [
        ["#6066ff", "#a666ff"],
        ["#fe6969", "#ffcb66"],
        ["#2dcb96", "#97cc67"],
        ["#3499ff", "#6565ff"]
      ],
      searchForm1: {
        party: "",
        dataset: "dataset",
        date: ""
      },
      searchForm2: {
        party: "",
        date: ""
      },
      modelList: [
        {
          orderId: "1245564781",
          party: "1245564781",
          name: "小微企业信用贷款评估模型训练1",
          time: "2020-08-25  14:44:41",
          detail: [
            {
              id: 1,
              name: "贵阳市公积金数据",
              points: 100,
              provider: "贵阳市公积金中心"
            },
            {
              id: 2,
              name: "贵阳市社保数据",
              points: 50,
              provider: "贵阳市社保中心"
            }
          ]
        },
        {
          orderId: "1245564782",
          party: "1245564782",
          name: "小微企业信用贷款评估模型训练2",
          time: "2020-08-25  14:44:42",
          detail: [
            {
              id: 1,
              name: "贵阳市公积金数据",
              points: 100,
              provider: "贵阳市公积金中心"
            },
            {
              id: 2,
              name: "贵阳市社保数据",
              points: 50,
              provider: "贵阳市社保中心"
            }
          ]
        }
      ],
      queryList: [
        {
          orderId: "1245564781",
          party: "1245564781",
          time: "2020-08-25  14:44:41",
          detail: [
            {
              id: 1,
              name: "贵阳市公积金数据",
              provider: "贵阳市公积金中心",
              dataType: [
                "个人信息",
                "贷款信息",
                "公积金缴存明细",
                "公积金存缴证明"
              ],
              queryList: [{ name: "张三", id: "5232323434" }],
              desc: "用于个人信用贷款评估"
            },
            {
              id: 2,
              name: "贵阳市公积金数据",
              provider: "贵阳市公积金中心",
              dataType: [
                "个人信息",
                "贷款信息",
                "公积金缴存明细",
                "公积金存缴证明"
              ],
              queryList: [],
              desc: "用于个人信用贷款评估"
            }
          ]
        }
      ]
    };
  },
  methods: {
    toDetail: function(row, item, type) {
      this.$router.push({
        name: "chainAuditDetail",
        params: {
          type: type,
          orderId: item.orderId,
          datasetId: row.id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./ChainAudit.scss";
</style>