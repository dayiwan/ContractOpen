<template>
  <div class="user-center-header">
    <div class="title">
      <div class="title-name">{{ title }}</div>
      <el-input size="small" placeholder="请输入资源名称关键字" class="title-search" v-show="canSearch">
        <el-button size="small" style="border-radius: 0 40px 40px 0;" slot="append">搜索</el-button>
      </el-input>
      <div class="option" v-show="showOption">
          <div class="option-btn add">
            新增
          </div>
          <div class="option-btn">
            批量删除
          </div>
      </div>
      <div @click="comeback" class="comeback" v-show="comeBack">返回上一页</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String },
    canSearch: { type: Boolean, default: true },
    showOption: { type: Boolean, default: true },
    comeBack: { type: Boolean, default: false}
  },
  methods: {
    comeback(){
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
.user-center-header {
  .title {
    @include border-common;
    padding: 20px;
    @include flex();
    text-align: left;
    &-name {
      border-left: 4px solid $color-main-blue;
      padding-left: 20px;
      flex: 1;
      font-size: 22px;
      font-weight: bolder;
        color: #4f5b72;
    }
    &-search {
      width: 300px;
      input {
          border-radius: 40px 0 0 40px;
      }
      .el-input-group__append,.el-button {
          border-radius: 0 40px 40px 0;
          background-color: $color-main-blue;
          color: white;
      }
    }
    .comeback{
      cursor: pointer;
    }
    .option {
        @include flex(row, flex-end);
        width: 300px;
        .option-btn {
            padding: 5px 0;
            border-radius: 20px;
            width: 100px;
            text-align: center;
            border: 1px solid $color-main-blue;
            color: $color-main-blue;
            font-size: 12px;
            margin-left: 15px;
            cursor: pointer;
            &.add {
                background-color: $color-main-blue;
                color: white;
            }
        }
    }
  }
}
</style>
