<template>
  <div class="user-center">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="sidebar_left">
          <div class="my-money">
            <div class="head_title">我的积分</div>
            <div style="display: flex">
              <div style="flex: 1;">￥{{ start ? money : '******' }}</div>
              <!-- <div style="flex: 1;">￥{{ start ? 1000 : '******' }}</div> -->
              <div style="cursor: pointer" @click="start = !start">
                <img v-if="!start"  src="@/assets/usercenter/cipher_icon.png">
                <img v-if="start"  src="@/assets/usercenter/show_icon.png">
              </div>
            </div>
          </div>
          <el-menu
                  :default-active="path"
                  class="user-center-tab"
                  active-text-color="white"
                  router>
            <el-menu-item index="/my/info">
              <span slot="title">我的信息</span>
            </el-menu-item>
            <el-menu-item index="/my/resource" v-if="this.menuList.includes('资源管理')">
              <span slot="title">资源管理</span>
            </el-menu-item>
            <el-menu-item index="/my/order" v-if="this.menuList.includes('我的订单')">
              <span slot="title">我的订单</span>
            </el-menu-item>
            <el-menu-item index="/my/task" v-if="this.menuList.includes('我的任务')">
              <span slot="title">我的任务</span>
            </el-menu-item>
            <el-menu-item index="/my/contract" v-if="this.menuList.includes('我的契约')">
              <span slot="title">我的契约</span>
            </el-menu-item>
            <el-menu-item index="/my/userManage" v-if="this.menuList.includes('用户管理')">
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="/my/resourceManage" v-if="this.menuList.includes('资源审核')">
              <span slot="title">资源审核</span>
            </el-menu-item>
            <el-menu-item index="/my/orderManage" v-if="this.menuList.includes('订单管理（平台）')">
              <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="/my/taskManage" v-if="this.menuList.includes('任务管理')">
              <span slot="title">任务管理</span>
            </el-menu-item>
            <el-menu-item index="/my/contractManage" v-if="this.menuList.includes('契约管理')">
              <span slot="title">契约管理</span>
            </el-menu-item>
            <el-menu-item index="/my/demandManage" v-if="this.menuList.includes('需求管理')">
              <span slot="title">需求管理</span>
            </el-menu-item>
            <el-menu-item index="/my/demandAudit" v-if="this.menuList.includes('需求审核')">
              <span slot="title">需求审核</span>
            </el-menu-item>
            <el-menu-item index="/my/orderAudit" v-if="this.menuList.includes('订单管理（监管）')">
              <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="/my/sandBox" v-if="this.menuList.includes('我的沙盒')">
              <span slot="title">我的沙盒</span>
            </el-menu-item>
            <el-menu-item index="/my/sandBoxManage" v-if="this.menuList.includes('沙盒管理')">
              <span slot="title">沙盒管理</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="20">
        <router-view class="user-center-content"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserCenterApi, getUserMoneyApi } from "@/api/UserCenter";
import { getUserName } from "@/utils/cookies.js"
export default {
  name: "userCenter",
  data() {
    return {
      res: [],
      menuList: [],
      start: true,
      downIcon:false,
      show: true,
      money: null,
    };
  },
  mounted() {
    this.objectUserCenter();
    this.getUserMoney();
  },
  computed:{
    path: function(){
      if (this.$route.path === '/my/info'){
        return '/my/info'
      } else if (['/my/resource', '/my/resourceAdd', '/my/resourceExamine','/my/resourceExamineDetail', '/my/resourceEdit', '/my/resourceDetail'].indexOf(this.$route.path) > -1) {
        return '/my/resource'
      }else if (this.$route.path === '/my/order'){
        return '/my/order'
      } else if(['/my/task', '/my/MyTaskHistory', '/my/MyTaskDetail'].indexOf(this.$route.path) > -1){
        return '/my/task'
      } else if (['/my/contract', '/my/MyContractGet', '/my/MyContractDetail','/my/MyContractGetDetail'].indexOf(this.$route.path) > -1){
        return '/my/contract'
      } else if (['/my/demandManage', '/my/feedbackDetail'].indexOf(this.$route.path) > -1) {
        return '/my/demandManage'
      }else if (['/my/userManage', '/my/addUser','/my/changeUser'].indexOf(this.$route.path) > -1) {
        return '/my/userManage'
      }else if (['/my/resourceManage', '/my/resourceManageDetail','/my/resourceManageEdit'].indexOf(this.$route.path) > -1) {
        return '/my/resourceManage'
      } else if(this.$route.path === '/my/orderManage'){
        return '/my/orderManage'
      }else if (['/my/taskManage', '/my/taskHistoryManage','/my/taskManageDetail'].indexOf(this.$route.path) > -1) {
        return '/my/taskManage'
      } else if (['/my/contractManage','/my/contractManageGet','/my/contractManageDetail','/my/contractManageGetDetail'].indexOf(this.$route.path) > -1){
        return '/my/contractManage'
      } else if (['/my/demandAudit', '/my/demandAuditDetail'].indexOf(this.$route.path) > -1) {
        return '/my/demandAudit'
      } else if (this.$route.path === '/my/orderAudit') {
        return '/my/orderAudit'
      } else if (this.$route.path === '/my/sandBox') {
        return '/my/sandBox'
      } else if (this.$route.path === '/my/sandBoxManage') {
        return '/my/sandBoxManage'
      } else {
        return ''
      }
    }
  },
  methods: {
    // 获取用户余额
    async getUserMoney(){
      var params = {
        "username": getUserName()
      }
      this.money = await getUserMoneyApi(params)
    },
    //获取不同用户侧边栏信息
    async objectUserCenter() {
      this.res = await getUserCenterApi();
      this.menuList = [];
      for (let i = 0; i < this.res.length; i++){
        if (this.res[i].name === "契约式开放平台") {
          const contractOpenList = this.res[i].children
          for (let j = 0; j < contractOpenList.length; j++){
            if (contractOpenList[j].name === "个人中心") {
              const userCenterList = contractOpenList[j].children
              for (let item = 0; item < userCenterList.length; item++){
                this.menuList.push(userCenterList[item].name)
              }
            }
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .el-row{width: 100%}
  .my-money{
    padding: 10px 20px;
    box-sizing: border-box;
    font-size: 16px;
    color: #969899;
    background: #ffffff;
    border-bottom: solid 1px #e6e6e6;
    text-align: left;
  }
.user-center {
  @include flex(row, flex-start, flex-start);
  padding: 1% 10%;
  .el-menu-item {
    font-weight: 100;
    text-align: left;
  }
  .el-menu-item.is-active{
    background: $color-main-blue !important;
  }
  &-content {
    flex: 1;
  }
  .el-menu{border-right: none}
  .sidebar_left{border: 1px #ebeef5 solid}
}

</style>
