<template>
  <div class="detail-page">
    <div>
      <div>
        <div class="comeback" @click="comeback">返回上一页</div>
        <div class="product-top">
          <div class="left">
            <div class="pic">
              <img :src="imgSrc" alt />
            </div>
            <div class="add-goods">
              <el-button type="primary" @click="addGoodsToCart">加入购物车</el-button>
            </div>
          </div>
          <div class="brief">
            <h3>{{detail.blockDataName}}</h3>
            <div>
              <div class="level-one-desc">
                <div class="label">所需积分</div>
                <div class="blue">{{detail.price}}</div>
              </div>
              <div class="level-one-desc">
                <div class="label">使用范围</div>
                <div class="blue">{{detail.useRange}}</div>
              </div>
              <div class="level-one-desc">
                <div class="label">使用次数</div>
                <div class="darker">{{detail.sales}}</div>
              </div>
              <div class="level-one-desc">
                <div>
                  <span class="label hasmargin">更新时间</span>
                  <span>{{detail.updateTime}}</span>
                </div>
                <div>
                  <span class="label hasmargin">创建时间</span>
                  <span>{{detail.createTime}}</span>
                </div>
              </div>
            </div>
            <div class="level-two-desc row1">
              <span class="label">提供者</span>
              <span>{{detail.username}}</span>
            </div>
            <div class="level-two-desc">
              <span class="label">授权方式</span>
              <span>{{detail.isShare}}</span>
            </div>
            <div class="level-two-desc">
              <span class="label">主题</span>
              <span class="tag">{{detail.themeName}}</span>
            </div>
            <div class="level-two-desc">
              <span class="label">行业</span>
              <span class="tag">{{detail.industryName}}</span>
            </div>
            <div class="rate">
              <span class="demonstration">
                数据格式
                <span>{{detail.dataFormat}}</span>
              </span>
              <span class="demonstration">
                数据条数
                <span>{{detail.dataCount}}</span>
              </span>
              <span class="demonstration">
                评分
                <span>{{detail.star}}</span>
              </span>
              <el-rate v-model="detail.star" disabled></el-rate>
            </div>
          </div>
        </div>
        <div class="detailInfo">
          <div class="title">
            <span>数据详情</span>
          </div>
          <div class="cont">
            <p>{{this.detail.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getResourceDetailApi } from "@/api/ResourceDetail.js";
import { getUserName } from "@/utils/cookies.js";
export default {
  data() {
    return {
      detail: {
        blockDataName: "",
        price: null,
        sales: null,
        updateTime: "",
        createTime: "",
        username: "",
        themeName: "",
        industryName: "",
        dataTime: "",
        dataCount: "",
        star: null,
        description: "",
        useRange: null,
        dataFormat: "",
        isShare: null
      },
      aaa: "",
      imgSrc: null,
      userName: ""
    };
  },
  mounted() {
    this.getResourceDetail();
    this.getName();
  },
  methods: {
    //获取用户名
    getName() {
      this.userName = getUserName();
    },
    //返回上一页
    comeback() {
      this.$router.go(-1);
    },
    //获取数据详情，传入参数为数据uuid
    async getResourceDetail() {
      const res = await getResourceDetailApi(this.$route.query.id);
      this.detail = res.list[0];
      const share = res.list[0].isShare;
      const range = res.list[0].useRange;
      const format = res.list[0].dataFormat;
      const create = res.list[0].createTime;
      const update = res.list[0].updateTime;
      this.detail.createTime = create.split("T")[0];
      this.detail.updateTime = update.split("T")[0];
      this.imgSrc = require(`@/assets/dataSource/${res.list[0].themeIcon}`);
      if (share == 0) {
        this.detail.isShare = "部分授权";
      } else {
        this.detail.isShare = "完全授权";
      }
      if (range == 0) {
        this.detail.useRange = "商用";
      } else if (range == 1) {
        this.detail.useRange = "公共服务";
      } else {
        this.detail.useRange = "其他";
      }
      if (format == 0) {
        this.detail.dataFormat = "csv";
      } else if (format == 1) {
        this.detail.dataFormat = "dat";
      } else if (format == 2) {
        this.detail.dataFormat = "json";
      } else if (format == 3) {
        this.detail.dataFormat = "excel";
      } else {
        this.detail.dataFormat = "text";
      }
    },
    // 加入购物车
    async addGoodsToCart() {
      if (this.userName === "平台方" || this.userName === "监管方") {
        this.$message({
          type: "success",
          message: "您暂时不能购买该资源",
          duration: 1000

        });
        return;
      } else {
        await this.$store.dispatch("addGoods", {
          dataUuid: this.detail.uuid,
          type: 0,
          username: this.userName,
          name: this.detail.blockDataName,
          price: this.detail.price,
          sellerName: this.detail.sellerName
        });
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./dataResourceDetail.scss";
</style>