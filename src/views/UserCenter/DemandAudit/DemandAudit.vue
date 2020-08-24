<template>
  <div class="Demand-page">
    <el-row class="filter-container" type="flex">
      <el-col :span="24">
        <Header @dataName="search" />
      </el-col>
    </el-row>
    <el-row class="filter-container" type="flex">
      <el-col :span="24">
        <ResourceItem  :ResourceItem="tableData"/>
      </el-col>
    </el-row>
    <el-footer>
      <el-pagination
        class="pagination"
        background
        small
        layout="prev, pager, next, total"
        :page-size="pagination.pageSize"
        @current-change="pageChange"
        :total="pagination.total">
      </el-pagination>
    </el-footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import ResourceItem from "./components/ResourceItem";
import { getUserName } from "@/utils/cookies.js";
import { queryDemandApi } from "@/api/DemandManage.js";
export default {
  name: "DemandAudit",
  components: {
    Header,
    ResourceItem
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      status:"",
      userName: '',
      demandName: '',
      pagination:{
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
    };
  },
  mounted(){
    this.queryDemand()
  },
  methods: {
    //搜索
    search(name){
        this.demandName = "";
        this.demandName = name;
        this.queryDemand();
    },
    // 翻页
    pageChange(page){
        this.pagination.currentPage = page;
        this.queryDemand();
    },
    // 拉取需求列表
    async queryDemand(){
      this.tableData = []
      var params = {
        "userUuid": '',
        "page":this.pagination.currentPage,
        "limit":this.pagination.pageSize,
        "name": this.demandName
      }
      const res = await queryDemandApi(JSON.stringify(params))
      this.pagination.total = res.totalCount;
      for (let i = 0; i < res.list.length; i++){
        const tableArray = []
        if ( res.list[i].type === '0'){
          res.list[i].type = "数据需求"
        } else if (res.list[i].type === '1'){
          res.list[i].type = "任务需求"
        }
        if ( res.list[i].feedbackStatus === '0'){
          res.list[i].feedbackStatus = "未反馈"
        } else if (res.list[i].feedbackStatus === '1'){
          res.list[i].feedbackStatus = "已反馈"
        }
        if ( res.list[i].answer === '0'){
          res.list[i].answer = "已开启"
        } else if (res.list[i].answer === '1'){
          res.list[i].answer = "未开启"
        }
        tableArray.push(res.list[i]);
        this.tableData.push(res.list[i])
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
}
.filter-container {
  padding-bottom: 10px;
}
.el-footer {
  background: #ffffff;
/deep/ .el-pager .active {
  border: 1px solid #efefef;
}
}
</style>
