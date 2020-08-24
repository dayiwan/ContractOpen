<template>
  <div id="layout">
    <Header />
    <router-view id="container"></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
@import "./scss/Layout.scss";
</style>

