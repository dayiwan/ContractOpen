<template>
  <div class="resource-page">
    <HeaderItem  @filterStatus="filterStatus"  @dataName="search"/>
    <div class="resource-list">
      <ResourceItem v-for="(item,index) in tableData" :key="index" :ResourceItem="item"/>
    </div>
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
import HeaderItem from "./components/HeaderItem";
import ResourceItem from "./components/ResourceItem";
import { getMyResourceApi } from "@/api/MyResource.js";
import { getUserName } from "@/utils/cookies.js";
export default {
  name: "myResources",
  components: {
    HeaderItem,
    ResourceItem
    },
  data() {
    return {
      tableData: [],
      pagination:{
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      statusFilter: [],
      blockDataName: "",
      stateMap: new Map([[1, '送审中'], [2, '送审成功'], [3, '已驳回']])
    };
  },
  mounted(){
    this.getMyResourceList()
  },
  methods: {
    //通过审核状态筛选
    filterStatus(value){
      this.statusFilter = [];
      if (value === ""){
        this.statusFilter = [];
      } else {
        this.statusFilter.push(value);
      }
      this.getMyResourceList();
    },
    //搜索
    search(name){
      this.blockDataName = "";
      this.blockDataName = name;
      
      this.getMyResourceList();
    },
    // 翻页
    pageChange(page){
      this.pagination.currentPage = page;
      this.getMyResourceList();
    },
    // 拉取数据列表
    async getMyResourceList(){
      var params = {
        "page":this.pagination.currentPage,
        "limit":this.pagination.pageSize,
        "sidx":"update_time",
        "isAsc":"false",
        "themeUuidList":[],
        "industryUuidList":[],
        "checkStatusList": this.statusFilter,
        "username":getUserName(),
        "shareStatus":"",
        "isShare":"",
        "blockDataName": this.blockDataName
      }

      const res = await getMyResourceApi(JSON.stringify(params));
      const tableList = res.list;
      this.pagination.total = res.totalCount;
      let tableArray = [];
      for (let i = 0; i < tableList.length; i++){
        let order = [];
        const create = tableList[i].createTime;
        const update = tableList[i].updateTime;
        tableList[i].createTime = create.split("T")[0];
        tableList[i].updateTime = update.split("T")[0];
        tableList[i].checkStatus = this.stateMap.get(tableList[i].checkStatus);
        order.push(tableList[i]);
        tableArray.push(order);
      }
      this.tableData = tableArray;
    },
    add(){
      this.addDialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
  .header{width: 100%}
  .el-footer {
    background: #ffffff;
  /deep/ .el-pager .active {
    border: 1px solid #efefef;
  }
  }


</style>
