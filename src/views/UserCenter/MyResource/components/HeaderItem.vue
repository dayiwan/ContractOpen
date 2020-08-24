<template>
    <div class="header">
        <div class="title">
            <div class="title-name">资源管理</div>
            <div class="my_input">
            <div class="search_type">
                <el-select v-model="type" placeholder="请选择审核状态" @change="change">
                    <el-option label="送审中" value="1"></el-option>
                    <el-option label="送审成功" value="2"></el-option>
                    <el-option label="已驳回" value="3"></el-option>
                     <el-option label="全部" value=""></el-option>
                </el-select>
            </div>
            <div class="search">
                <el-input size="small" v-model="name" placeholder="请输入资源名称关键字" class="title-search" >
                    <el-button size="small" style="border-radius: 0 40px 40px 0;" slot="append" @click="search">搜索</el-button>
                </el-input>
            </div>
            </div>
            <div class="option">
                <div class="option-btn add" @click="add()">资源新增</div>
                <div class="option-btn " @click="examine()">授权审核</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name:'',
                type:"",
            }
        },
        methods:{
            change(value){
                this.$emit("filterStatus", value)
            },
            search(){
                this.$emit("dataName", this.name)
            },
            add:function(){
                this.$router.push({name:'resourceAdd'})
            },
            examine:function () {
                this.$router.push({name:'resourceExamine'})
            }
        }
    }
</script>
<style lang="scss" scoped>
    .title {
        .header{border: 1px #eee solid}
        width: 100%;
        @include border-common;
        padding: 20px;
        @include flex();
        text-align: left;
        border: none;
        &-name {
            border-left: 4px solid $color-main-blue;
            padding-left: 20px;
            flex: 1;
            font-size: 22px;
            font-weight: bolder;
            background-color: white;
            color: #4f5b72;
        }
        .search{
            .title-search {
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
        }
        .option {
            @include flex(row, flex-end);
            width: 300px;
            .option-btn {
                height: 35px;
                line-height: 35px;
                width: 120px;
                text-align: center;
                border: 1px solid $color-main-blue;
                font-size: 15px;
                cursor: pointer;
                border-radius: 50px;
                background-color: $color-main-blue;
                color: white;
                &.add {
                    margin-right: 20px;
                }
                &.active{background: transparent;border:1px $color-main-blue solid;color: $color-main-blue}
            }
        }
        .my_input{display: flex;width: 60%}
        /deep/.el-input__inner {border-radius: 40px;height: 35px;line-height: 35px;}
        /deep/.el-input__suffix{top: 4px}
        /deep/.search .el-input__inner{border-radius: 40px 0 0 40px;margin-left: 20px}
        /deep/.search .el-input-group__append{border: none;width: 75px;font-size: 15px;height: 35px;    background: #217eff;border-radius: 0 40px 40px 0;}
    }
</style>
