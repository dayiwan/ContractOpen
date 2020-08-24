<template>
  <el-header class="header" @mouseleave.native="halfName">
    <div class="title">
      <img src="@/assets/logo.png" class="logo" />
      <li>
        <router-link to="/home" class="sysname">公共数据资源开发利用平台</router-link>
      </li>
    </div>
    <ul class="header-menu">
      <li :class="{active: ['home'].indexOf($route.name) > -1}">
        <router-link to="/home">首页</router-link>
      </li>
      <li :class="{active: ['dataService'].indexOf($route.name) > -1}">
        <router-link to="/dataService">数据服务</router-link>
      </li>
      <li :class="{active: ['dataRequirement', 'requirementDetail'].indexOf($route.name) > -1}">
        <router-link to="/dataRequirement">资源需求</router-link>
      </li>
      <li :class="{active: ['caseShow'].indexOf($route.name) > -1}">
        <router-link to="/caseShow">演练中心</router-link>
      </li>
    </ul>
    <ul class="header-right">
      <li v-show="userName !== '平台方' && userName !== '监管方'" @mousemove="halfName" :class="{active: ['shopCart'].indexOf($route.name) > -1}" class="shop">
        <router-link to="/shopCart" class="shopping-cart">
          <el-badge :value="goods_arr.length" class="item" type="primary">
            <img :src="require('@/assets/header/shopping-icon.png')" />
          </el-badge>
          <div class="shop">购物车</div>
        </router-link>
      </li>
      <li>
        <el-divider direction="vertical"></el-divider>
      </li>
      <li
        :class="{active: userPath.indexOf($route.path) > -1}"
        class="usercenter"
      >
        <router-link to="/my/info">个人中心</router-link>
        <span @mousemove="fullName" v-if="!fullname">({{userName | ellipsis}})</span>
        <span v-else>({{userName}})</span>
      </li>
      <!-- <li class="userName">
        <div v-if="userName !== ''">{{userName}}</div>
        <div v-else>未登录</div>
      </li>-->
    </ul>
    <!-- <div class="pop-item" v-show="fullname">{{userName}}</div> -->
  </el-header>
</template>

<style lang="scss">
@import "./scss/Header.scss";
</style>

<script>
import { getUserName } from "@/utils/cookies.js";
import { mapGetters } from "vuex";
export default {
  name: "Header",
  data: function() {
    return {
      popmenu: false,
      userName: "",
      fullname: false,
      userPath:['/my/info','/my/resource', '/my/resourceAdd', '/my/resourceExamine','/my/resourceExamineDetail', '/my/resourceEdit', '/my/resourceDetail','/my/order','/my/task', '/my/MyTaskHistory', '/my/MyTaskDetail','/my/contract', '/my/MyContractGet', '/my/MyContractDetail','/my/MyContractGetDetail','/my/demandManage', '/my/feedbackDetail','/my/userManage', '/my/addUser','/my/changeUser','/my/resourceManage', '/my/resourceManageDetail','/my/resourceManageEdit','/my/orderManage','/my/taskManage', '/my/taskHistoryManage','/my/taskManageDetail','/my/contractManage','/my/contractManageGet','/my/contractManageDetail','/my/contractManageGetDetail','/my/demandAudit', '/my/demandAuditDetail','/my/orderAudit','/my/sandBox','/my/sandBoxManage']
    };
  },
  computed: {
    ...mapGetters(["goods_arr"])
  },
  mounted() {
    this.init();
    this.getName();
  },
  filters: {
    ellipsis(value) {
      if (!value) {
        return "";
      } else if (value.length > 4) {
        return value.slice(0, 4) + "...";
      } else {
        return value;
      }
    }
  },
  methods: {
    //显示省略名
    halfName(){
      this.fullname = false
    },
    //显示全名
    fullName(){
      this.fullname = true

    },
    getName() {
      this.userName = getUserName();
    },
    async init() {
      this.$store.dispatch("initCart", { username: getUserName(), type: 0 });
    },
  }
};
</script>
