<template>
  <div class="require-page">
    <div class="top_bar">
      <div class="class">分类</div>
      <el-radio-group v-model="isCollapse" @change="change" text-color="#fff" size="small">
        <el-radio-button :label=false>数据需求</el-radio-button>
        <el-radio-button :label=true>任务需求</el-radio-button>
      </el-radio-group>
    </div>
    <div class="content">
      <RequireItem v-for="(item, index) in tableData" :key="index" :itemInfo="item"></RequireItem>
    </div>
    <!-- <div class="content" v-else>
      <RequireItem v-for="(item, index) in task" :key="index" :itemInfo="item"></RequireItem>
    </div> -->
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
import RequireItem from "./components/RequireItem";
import { queryDemandApi } from "@/api/DemandManage.js";
export default {
  name: "DataRequiurement",
  components: {RequireItem},
  data(){
    return {
      isCollapse:false,
      tableData: [],
      pagination:{
        currentPage: 1,
        pageSize: 12,
        total: 0
      },
    }
  },
  mounted(){
      this.ListDataRequirement();
  },
  methods: {
    // 翻页
    pageChange(page){
      this.pagination.currentPage = page;
      this.ListDataRequirement();
    },
    change(){
      this.ListDataRequirement()
    },
    //拉取列表
    async ListDataRequirement(){
      this.tableData = []
      var params = {}
      if ( this.isCollapse === false) {
        params = {
          "page":this.pagination.currentPage,
          "limit":this.pagination.pageSize,
          "type": '0'
        }
      } else if ( this.isCollapse === true ) {
          params = {
            "page":this.pagination.currentPage,
            "limit":this.pagination.pageSize,
            "type": '1'
          }
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
}
</script>

<style lang="scss" scoped>
@import "./DataRequirement.scss";
</style>