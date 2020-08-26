<template>
  <div class="home-page">
    <div class="top" :style="{height:bgHeight}">
      <h1>公共数据资源</h1>
      <p>
        <span ref="themeCount"></span>个主题、
        <span ref="departmentCount"></span>个部门、
        <span ref="datasetCount"></span>个数据集
      </p>
      <el-input placeholder="请输入内容" v-model="searchInput" class="search-input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="recommend">
      <h2>热门推荐</h2>
      <div>
        <div
          class="card-item"
          :style="{background: `url(${require('../../assets/home/datasearch.jpg')}) center no-repeat`}"
        >
          <h3>数据查询</h3>
          <p>数据查询详情detail，数据查询详情detail数据查询详情detail数据查询</p>
        </div>
        <div
          class="card-item"
          :style="{background: `url(${require('../../assets/home/modeling.jpg')}) center no-repeat`}"
        >
          <h3>联邦建模</h3>
          <p>联邦建模详情detail，联邦建模详情detail，联邦建模详情detail</p>
        </div>
        <div
          class="card-item"
          :style="{background: `url(${require('../../assets/home/case.jpg')}) center no-repeat`}"
        >
          <h3>案例展示</h3>
          <p>案例展示详情detail，案例展示详情detail，案例展示详情detail</p>
        </div>
      </div>
    </div>
    <div class="bgline">
      <img :src="require('../../assets/home/bgline.png')" />
      <div class="banner">
        <div>
          <span>主题</span>
          <img :src="require('../../assets/home/link.png')" />
          <span>部门</span>
          <img :src="require('../../assets/home/link.png')" />
          <span>行业</span>
        </div>
        <p>涵盖经济、医疗、教育等多个主题数据资源，多部门数据整合，应有尽有</p>
      </div>
    </div>
    <div class="entry">
      <div>
        <div class="item-box" :style="{height: entryHeight}">
          <div
            class="entry-item"
            @mouseenter="entryItemHover(item.name)"
            @mouseleave="entryItemLeave()"
            v-for="item in themes"
            :key="item.name"
          >
            <img
              :src="hoverFlag == item.name ? require(`../../assets/home/${item.icon}2.png`) :require(`../../assets/home/${item.icon}.png`)"
            />
            <div>
              <span>{{item.name}}</span>
              <img :src="require('../../assets/home/entry.png')" />
            </div>
          </div>
        </div>
        <div class="expand-btn" @click="expand()">
          <img :src="require('../../assets/home/expand.png')" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="new">
        <div class="title">
          <h3>最新数据</h3>
          <span>查看全部 ></span>
        </div>
        <div class="list-item" v-for="item in newData" :key="item.id">
          <div>
            <div class="list-title">
              <h3>{{item.title}}</h3>
              <span class="tag">{{item.tag}}</span>
            </div>
            <div class="list-detail">{{item.detail}}</div>
            <div class="list-desc">
              <span>{{item.org}}</span>
              <span>{{item.time}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rank">
        <div class="title">
          <h3>数据查询排行</h3>
          <span>查看全部 ></span>
        </div>
        <div class="rank-item" v-for="(item,index) in rankData" :key="item.id">
          <div
            class="rank-num"
            :style="{color: rankColor[index].color,backgroundColor:rankColor[index].bg}"
          >{{index+1}}</div>
          <div class="rank-detail">
            <h3>{{item.title.length>17 ? `${item.title.slice(0,17)}...` : item.title}}</h3>
            <div>
              <span>{{item.time}}</span>
              <span>{{item.count}}次查询</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import anime from "animejs";
export default {
  name: "Home",
  data() {
    return {
      bgHeight: document.body.clientWidth * (566 / 1920) + "px",
      entryHeight: "495px",
      count: {
        theme: 0,
        department: 0,
        dataset: 0
      },
      searchInput: "",
      themes: [
        { name: "信用服务", icon: "zt-xyfw" },
        { name: "医疗卫生", icon: "zt-ylws" },
        { name: "社保就业", icon: "zt-sbjy" },
        { name: "公共安全", icon: "zt-ggaq" },
        { name: "城建住房", icon: "zt-cjzf" },
        { name: "交通运输", icon: "zt-jtys" },
        { name: "教育文化", icon: "zt-jywh" },
        { name: "科技创新", icon: "zt-kjcx" },
        { name: "资源能源", icon: "zt-zyny" },
        { name: "生态环境", icon: "zt-sthj" },
        { name: "工业农业", icon: "zt-gyny" },
        { name: "商贸流通", icon: "zt-smlt" },
        { name: "财税金融", icon: "zt-csjr" },
        { name: "安全生产", icon: "zt-aqsc" },
        { name: "市场监管", icon: "zt-scjg" },
        { name: "社会救助", icon: "zt-shjz" },
        { name: "财税金融1", icon: "zt-csjr" },
        { name: "安全生产1", icon: "zt-aqsc" },
        { name: "市场监管1", icon: "zt-scjg" },
        { name: "社会救助1", icon: "zt-shjz" }
      ],
      hoverFlag: "",
      newData: [
        {
          id: 1,
          title: "2020年8月20日白云区四季美市场蔬菜批发价格",
          tag: "农业农村",
          detail: "8月20日白云区四季美市场蔬菜批发价格detail",
          org: "市农业委员会",
          time: "2020-08-19"
        },
        {
          id: 2,
          title: "2020年8月20日白云区四季美市场蔬菜批发价格",
          tag: "农业农村",
          detail: "8月20日白云区四季美市场蔬菜批发价格detail",
          org: "市农业委员会",
          time: "2020-08-19"
        },
        {
          id: 3,
          title: "2020年8月20日白云区四季美市场蔬菜批发价格",
          tag: "农业农村",
          detail: "8月20日白云区四季美市场蔬菜批发价格detail",
          org: "市农业委员会",
          time: "2020-08-19"
        }
      ],
      rankData: [
        {
          id: 1,
          title: "2020年8月20日白云区四季美市哈哈哈",
          time: "2020-08-19",
          count: 2884
        },
        {
          id: 2,
          title: "2020年8月20日白云区四季美市哈哈哈",
          time: "2020-08-19",
          count: 2884
        },
        {
          id: 3,
          title: "2020年8月20日白云区四季美市哈哈哈",
          time: "2020-08-19",
          count: 2884
        },
        {
          id: 4,
          title: "2020年8月20日白云区四季美市哈哈哈",
          time: "2020-08-19",
          count: 2884
        },
        {
          id: 5,
          title: "2020年8月20日白云区四季美市哈哈哈",
          time: "2020-08-19",
          count: 2884
        },
        {
          id: 6,
          title: "2020年8月20日白云区四季美市哈哈哈",
          time: "2020-08-19",
          count: 2884
        }
      ],
      rankColor: [
        { bg: "#fdf0ec", color: "#ee7651" },
        { bg: "#e7f8f2", color: "#17b67c" },
        { bg: "#e5f8ff", color: "#00baff" },
        { bg: "#e5f1ff", color: "#0078ff" },
        { bg: "#e5f1ff", color: "#0078ff" },
        { bg: "#e5f1ff", color: "#0078ff" }
      ]
    };
  },
  //判断路由来处,刷新页面
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === "login") {
        vm.$router.go(0);
      }
    });
  },
  methods: {
    // 主题、部门、行业 item hover
    entryItemHover: function(name) {
      this.hoverFlag = name;
    },
    // 主题、部门、行业 item 鼠标离开
    entryItemLeave: function() {
      this.hoverFlag = "";
    },
    // 主题、部门、行业超过4行，可进行展开操作
    expand: function() {
      let row = Math.ceil(this.themes.length / 4);
      if (row > 4) {
        if (this.entryHeight == "495px") {
          this.entryHeight = 120 * row + 15 + "px";
        } else {
          this.entryHeight = "495px";
        }
      }
    }
  },
  mounted() {
    // 统计数据初始化滚动
    let themeCountDom = this.$refs.themeCount;
    let departmentCountDom = this.$refs.departmentCount;
    let datasetCountDom = this.$refs.datasetCount;
    let count = JSON.parse(JSON.stringify(this.count));
    anime({
      targets: count,
      theme: 20,
      department: 50,
      dataset: 560,
      round: 1,
      duration: 2000,
      easing: "linear",
      update: function() {
        themeCountDom.innerHTML = count.theme;
        departmentCountDom.innerHTML = count.department;
        datasetCountDom.innerHTML = count.dataset;
      }
    });
    // 窗口大小变化监听，用以自适应背景图片
    window.onresize = () => {
      return (() => {
        this.bgHeight = document.body.clientWidth * (566 / 1920) + "px"
      })();
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./home.scss";
</style>
