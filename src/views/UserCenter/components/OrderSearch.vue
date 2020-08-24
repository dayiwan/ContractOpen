<template>
    <div class="order-search">
        <div class="button-filter active">
            全部订单
        </div>
        <div class="button-filter">
            待付款 
        </div>
    </div>
</template>

<style lang="scss" scoped>
.order-search {
    @include flex(row, flex-start);
    margin-top: 20px;
    .button-filter {
        padding: 5px 15px;
        cursor: pointer;
        &.active {
            border-radius: 20px;
            background-color: #dfebfc;
            color: $color-main-blue;
        }
    }
}
</style>