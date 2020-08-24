<template>
  <div class="resource-page">
    <div class="top_nav">
      <div class="content">
        <div class="radio_bar">
          <div class="top">
            <el-radio-group v-model="isChoose" text-color="#fff" size="small" style="">
              <el-radio-button :label="false">按主题</el-radio-button>
              <el-radio-button :label="true">按行业</el-radio-button>
            </el-radio-group>
          </div>
          <div class="bottom" v-if="!isChoose">
            <span v-for="(item,index) in ThemeItem" :key="index" @click="bottomClick(index)" :class="{active:index===bottomIndex}">{{item}}</span>
          </div>
          <div class="bottom" v-else>
            <span v-for="(item,index) in IndustryItem" :key="index" @click="bottomClick(index)" :class="{active:index===bottomIndex}">{{item}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="search">
      <div class="button">
        <el-button @click="sortClick('date')">时间<i class="el-icon-top"></i><i class="el-icon-bottom"></i></el-button>
        <el-button @click="sortClick('usage')">使用量<i class="el-icon-top"></i><i class="el-icon-bottom"></i></el-button>
        <el-button @click="sortClick('integral')">积分<i class="el-icon-top"></i><i class="el-icon-bottom"></i></el-button>
      </div>
      <div class="input">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="name"
        >
         <el-button size="small" style="border-radius: 0 40px 40px 0;" slot="append" @click="search">搜索</el-button>
        </el-input>
      </div>
    </div>
    <div class="container">
      <dataSetItem v-for="item in recordData" :key="item.uuid" :dataSet="item"  :isChoose="isChoose"  @click.native="goResourceDetail(item.uuid)"></dataSetItem>
    </div>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :page-size="pagination.pageSize"
      @current-change="pageChange"
      :total="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
  import dataSetItem from "./components/dataSetItem";
  import { getDataResourceApi } from "@/api/DataResource.js";
  export default {
    name: "DataResource",
    components: {dataSetItem},
    data() {
      return {
        filter: {
          date: false,
          usage: false,
          integral: false,
        },
        isAsc: 'false',
        ascMethod: 'update_time',
        bottomIndex: null,
        isChoose: false,
        ThemeItem: ["全部分类","综合政务", "经济管理", "国土资源、能源", "工业、交通、邮政", "信息产业", "城乡建设、环境保护", "农业、水利", "财政", "商业、贸易", "旅游、服务业", "气象、水文、测绘、地震", "对外事务", "政法、监察", "科技、教育", "文化、卫生、体育", "军事、国防", "劳动、人事", "民政、社区", "文秘、行政", "综合党团"],
        IndustryItem: ['全部分类', '农、林、牧、渔业', '采矿业', '制造业', '电力、热力、燃气及水生产和供应业', '建筑业', '批发和零售', '交通运输、仓储和邮政业', '住宿和餐饮业', '信息传输、软件和信息技术服务业', '金融业', '房地产业', '租赁和商务服务业', '科学研究和技术服务业', '水利、环境和公共设施管理业', '居民服务、修理和其他服务业', '教育业', '卫生和社会工作','文化、体育和娱乐业', '公共管理、社会保障和社会组织','国际组织'],
        themeUuidList: ['','a4cf252232d34fb28daf3e3e53363855','0368c876d53f4f718d32b32656bd2238','31f8005079b1452a9f700230aeea5506', 'cd546ae6243f4ce3a0939b5be22ce3c1','b84dbbfd986b41b2b52d89380c09958f','593023d2d4d4487fbbfccc1d5ba77410','f24f759c8baa4a678d1bb04ec1611270','f032e0ae77df4d869a599728e0ef843b','b0b6ca972d0e4a7e981ea92f26985360','a02bc8bf8cd34b9db31001b8c1ea0b85','e51122e7c87140f18927bdd2eb7c186a',
        'a34f65fa77984c4184cf9d22c2427b49','ce9b0bd3ebbb4c79a934c58562e90fdb','b5cee1d416a54ccea14e3577a1347a26','d9d1570efd774b988efa8df800ee052f','23481a56ec7a408791f862a78638f6ca','b7312821da1e466d8b990ba159748f7d','c02efb30527d466daf7e11d0d7406d2a','03c0f91d314b43809a9b450d74464019','3bad014f252643f88260d189df4e69cd'],
        industryUuidList: ['', '655c08ef491b4bd38979b66e3bfd7413','4957a87c679345df9e6edfc9f92cc4de','c3f28252652a441a9c8ac8c5a501a31b','49d934602b494a509515db471fa0feea','7fb50e9b6fbd47f194c03560c957dab5','68260701dae94fae9b051a22e2e6e547','3929a87b4d294dbc94d1d27702263773','b170dbd1662e498b92ae8f7482f5f278','5a91c9b02c9b4209868d6003d3ca1873','ce198c35507a49029a937f8653125db5','a6b3afd994f940a8ae5e3e71c56c3d4f',
        '654d08ce04ac4bf896f52160158f454b','76d284045bc241099c93ce3233cf454c','2b06262e6e184b0fa42cb4b4791538e1','9657f4a20c574831ab1570f409bbf128','48db94c1a02343bd8ef74070802893d7','c1f3c81113cc4783b55f995b6989e771','47ba34ecbb1a43d5b74ca6c3b9c93c0d','6e9817160ddb4672a2ce2e174cba24c4','b629ed9b657d4295a50dbaa06dbbbf21'],
        themeUuid: '',
        industryUuid: '',
        sort:1,
        recordData:[],
        pagination:{
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        name: ''
      }
    },
    mounted() {
      this.getDataResourceList()
    },
    methods: {
      //搜索
      search(){
        this.getDataResourceList()
      },
      sortClick(value){
        if(value == "date"){
          this.filter.date = !this.filter.date;
          this.isAsc = this.filter.date
          this.ascMethod = 'update_time'
        } else if (value == "usage"){
          this.filter.usage = !this.filter.usage;
          this.isAsc = this.filter.usage
          this.ascMethod = 'sales'
        } else{
          this.filter.integral = !this.filter.integral;
          this.isAsc = this.filter.integral
          this.ascMethod = 'price'
        }
        this.getDataResourceList();

      },
      //按行业或主题筛选
      bottomClick(index) {
        this.bottomIndex = index
        if (this.isChoose) {
          this.industryUuid = this.industryUuidList[index]
          this.themeUuid = ''
        }
        else {
          this.themeUuid = this.themeUuidList[index]
          this.industryUuid = ''
        }
        this.getDataResourceList()
      },
        //获取数据列表
      async getDataResourceList(){
        var params = {
          "page":this.pagination.currentPage,
          "limit":this.pagination.pageSize,
          "sidx":this.ascMethod,
          "isAsc":this.isAsc,
          "themeUuid":this.themeUuid,
          "industryUuid":this.industryUuid,
          "checkStatusList":['2'],
          "shareStatus":"",
          "isShare":"",
          "blockDataName": this.name
        };
        const res = await getDataResourceApi(JSON.stringify(params));
        this.recordData = res.list;
        this.pagination.total = res.totalCount;
      },
      //跳转至详情
      goResourceDetail(id){
      this.$router.push({
        path: '/resourceDetail',
        query: {
          id
        }
      })
    },
      // 翻页
      pageChange(page){
        this.pagination.currentPage = page;
        this.getDataResourceList();
      },

    }
  }
</script>

<style lang="scss" scoped>
@import "./resource.scss";
</style>