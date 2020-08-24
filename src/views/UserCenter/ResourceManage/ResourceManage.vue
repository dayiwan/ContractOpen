<template>
    <el-container>
        <el-header style="height: 75px">
            <div class="left">资源审核</div>
            <div class="right">
            </div>
        </el-header>
        <el-main>
            <div class="resource_header">
                <div class="left_tab">
                    <div class="total">资源总量:
                        <span>{{info.total}}</span>
                    </div>
                    <div class="source">提供方:
                        <span>{{info.source}}</span>
                    </div>
                    <div class="use-total">资源使用总量:
                        <span>{{info.use_total}}</span>
                    </div>
                    <div class="reject">驳回数:
                        <span>{{info.reject}}</span>
                    </div>
                    <div class="search_type">
                        <el-select v-model="type" placeholder="请选择审核状态" @change="change">
                            <el-option label="送审中" value="1"></el-option>
                            <el-option label="送审成功" value="2"></el-option>
                            <el-option label="已驳回" value="3"></el-option>
                            <el-option label="全部" value=""></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="right_form">
                    <el-form ref="form" :model="form"  :inline="true">
                        <el-form-item label="">
                            <el-input v-model="form.resourceName" placeholder="资源名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="search">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="resource-list">
                <ResourceItem :ResourceItem="tableData" />
            </div>
            <el-footer>
                <el-pagination
                    class="pagination"
                    background
                    small
                    layout="prev, pager, next, total"
                    :page-size="pagination.pageSize"
                    @current-change="pageChange"
                    :total="pagination.total">
                </el-pagination>
            </el-footer>
        </el-main>
    </el-container>
</template>

<script>
import ResourceItem from "./components/ResourceItem.vue";
import { getResourceManageListApi, getResourceInfoApi } from "@/api/ResourceManage.js"
export default {
    name: "resourceManage",
    components: {
        ResourceItem
    },
    data() {
        return {
            tableData: [],
            form: {
                resourceName: ''
            },
            pagination:{
                currentPage: 1,
                pageSize: 10,
                total: 0
            },
            info: {
                total: '',
                source: '',
                use_total: '',
                reject: ''
            },
            type: '',
            checkStatusList:[],
            stateMap: new Map([[1, '送审中'], [2, '送审成功'], [3, '已驳回']])
        }
    },
    mounted(){
        this.getResourceManageList()
        this.getResourceInfo()
    },
    methods: {
        //筛选
        change(value){
            this.checkStatusList = []
            if (value === ''){
                this.checkStatusList = []
            } else {
                this.checkStatusList.push(value)
            }
            this.getResourceManageList()
        },
        // 翻页
        pageChange(page){
            this.pagination.currentPage = page;
            this.getResourceManageList();
        },
        //查询
        search: function(){
            this.getResourceManageList()
        },
        //获取统计信息
        async getResourceInfo(){
            const res = await getResourceInfoApi()
            this.info.total = res.resourceCount
            this.info.source = res.userCount
            this.info.use_total = res.resourceUseCount
            this.info.reject = res.resourceRejectCount
        },
        //获取资源列表
        async getResourceManageList(){
            var params = {
                "page": this.pagination.currentPage,
                "limit":this.pagination.pageSize,
                "sidx":"update_time",
                "isAsc":false,
                "themeUuidList":[],
                "industryUuidList": [],
                "checkStatusList": this.checkStatusList,
                "shareStatus": "",
                "isShare": "",
                "blockDataName": this.form.resourceName
            }
            const res = await getResourceManageListApi(JSON.stringify(params))
            this.pagination.total = res.totalCount;
            this.tableData = res.list
            for (let i = 0; i < this.tableData.length; i++){
                this.tableData[i].checkStatus = this.stateMap.get(this.tableData[i].checkStatus)
            }
        }
    }
}
</script>


<style lang="scss" scoped>
@import "./ResourceManage.scss"
</style>