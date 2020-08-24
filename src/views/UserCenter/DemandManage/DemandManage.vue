<template>
  <div class="Demand-page">
    <el-row class="filter-container" type="flex">
      <el-col :span="24">
        <Header @status="getStatus" @dataName="search" />
      </el-col>
    </el-row>
    <el-row class="filter-container" type="flex">
      <el-col :span="24">
        <ResourceItem  :ResourceItem="tableData" :Status="status" />
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
import { queryDemandApi, getFddebackListApi, getFeedbackListApi } from "@/api/DemandManage.js";
export default {
  name: "DemandManage",
  components: {
    Header,
    ResourceItem
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      status:0,
      userName: '',
      demandName: '',
      pagination:{
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      typeMap: new Map([[0, '数据需求'], [1, '任务需求']]),
      feedbackMap: new Map([[0, '未反馈'], [1, '已反馈']]),
      answerMap: new Map([[0, '已开启'], [1, '未开启']])
    };
  },
  mounted(){
    this.queryDemand()
  },
  methods: {
    // 拉取我的反馈列表
    async getFeedbackList(){
      this.tableData = []
      var params = {
        "feedbackUuid": this.userName,
        "name": this.demandName
      }
      const res = await getFddebackListApi(JSON.stringify(params))
      this.pagination.total = res.totalCount;
      for (let i = 0; i < res.list.length; i++){
        const tableArray = []
        res.list[i].type = this.typeMap.get(res.list[i].type)
        res.list[i].feedbackStatus = this.feedbackMap.get(res.list[i].feedbackStatus)
        res.list[i].answer = this.answerMap.get(res.list[i].answer)
        tableArray.push(res.list[i]);
        this.tableData.push(res.list[i])
      }
    },
    //搜索
    search(name){
      this.demandName = "";
      this.demandName = name;
      if (this.status === 0 || this.status === 1){
        this.queryDemand();
      } else if ( this.status === 2){
        this.getFeedbackList()
      }
    },
    // 翻页
    pageChange(page){
      this.pagination.currentPage = page;
      if (this.status === 0 || this.status === 1){
        this.queryDemand();
      } else if ( this.status === 2 ){
        this.getFeedbackList()
      }
      
    },
    // 拉取需求列表
    async queryDemand(){
      this.tableData = []
      var params = {
        "userUuid": this.userName,
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
    //状态为0，查询全部需求，将用户名置为空；状态为1，查询我的需求；状态为2，查询我的反馈
    getStatus(data){
      this.status=data
      if (this.status === 0){
        this.userName = ''
        this.queryDemand()
      } else if ( this.status === 1){
        this.userName = getUserName()
        this.queryDemand()
      } else if ( this.status === 2){
        this.userName = getUserName()
        this.getFeedbackList()
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
