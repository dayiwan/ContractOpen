<template>
  <div class="home-page">
    <el-carousel trigger="click" :height="imgHeight + 'px'">
      <el-carousel-item v-for="(item, index) in imgurl" :key="index">
        <img ref="image" style="width:100%; height:100%;" :src="item" alt="img" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>


<script>
// import { getHomeImageApi} from '@/api/HomeImage'
export default {
  name: "Home",
  data() {
    return {
      imgurl: [
        require(`@/assets/home/carousel_img1.jpg`),
        require(`@/assets/home/carousel_img2.jpg`),
        require(`@/assets/home/carousel_img3.jpg`)
      ],
      imgHeight: "",
    };
  },
  //判断路由来处,刷新页面
  beforeRouteEnter (to, from, next){
    next(vm => {
      if (from.name === 'login'){
        vm.$router.go(0)
      }
    })
  },
  methods: {
    imgLoad() {
      this.$nextTick(function() {
        this.imgHeight = document.body.clientHeight - 140;
      });
    },
    // refuse(){
    //   console.log(vm.fromname,'dddd')
    //   // if (this.fromname === 'login'){
    //   //   this.$router.go(0)
    //   // }
    // }
    // async getImgUrl(){
    //   this.imgurl = await getHomeImageApi()
    //   this.imgLoad()
    //   console.log(this.imgurl)
    // }
  },
  mounted() {
    this.imgLoad();
    // this.getImgUrl();
  }
};
</script>

<style lang="scss" scoped>
</style>
