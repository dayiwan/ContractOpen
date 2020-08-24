<template>
    <el-container>
        <el-header style="height: 75px">
            <div class="left">用户管理</div>
            <div class="right"></div>
        </el-header>
        <el-main>
            <div class="user_header">
                <div class="left_tab">
                    <el-button type="primary" @click="addUser">新增</el-button>
                    <el-button type="danger" @click="delUsers">删除</el-button>
                </div>
                <div class="right_form">
                    <el-form ref="form" :model="form"  :inline="true">
                        <el-form-item label="">
                            <el-input v-model="form.userName" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="search">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="user-list">
                <el-table
                    ref="multipleTable"
                    tooltip-effect="dark"
                    :data="tableData"
                    style="width: 100%"
                    @selection-change="select">
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column
                            prop="username"
                            label="单位名称">
                    </el-table-column>
                    <el-table-column
                            prop="realName"
                            label="联系人">
                    </el-table-column>
                    <el-table-column
                            prop="email"
                            label="邮箱">
                    </el-table-column>
                    <el-table-column
                            prop="mobile"
                            label="手机号">
                    </el-table-column>
                    <el-table-column
                            prop="createDate"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="250">
                        <template slot-scope="scope">
                            <el-button-group>
                                <el-button type="primary" size="mini" @click="change(scope.row.id)" class="edit">修改</el-button>
                                <el-button type="danger" size="mini" @click="btnDelete(scope.row.id)" class="delete">删除</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
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
import { getUserListApi, delUserApi } from "@/api/UserManage.js"
export default {
    name: "usermanage",
    data(){
        return {
            form: {
                userName: ''
            },
            tableData: [],
            userIdList: [],
            pagination:{
                currentPage: 1,
                pageSize: 10,
                total: 0
            },
        }
    },
    mounted(){
        this.getUserList()
    },
    methods: {
        //查询
        search: function(){
            this.getUserList()
        },
        //翻页
        pageChange(page){
            this.pagination.currentPage = page;
            this.getUserList();
        },
        //获取用户列表
        async getUserList(){
            var params = {
                "page": this.pagination.currentPage,
                "limit":this.pagination.pageSize,
                "username": this.form.userName
            }
            const res = await getUserListApi(params)
            this.tableData = res.list
            this.pagination.total = res.total;
        },
        //跳转新增页面
        addUser: function() {
            this.$router.push({name:'addUser'})
        },
        //跳转修改页面
        change: function(id){
            this.$router.push({
                name:'changeUser',
                query: {id}
            })
        },
        //获取选中用户id列表
        select: function(selection) {
            this.userIdList = []
            for (let i = 0; i < selection.length; i++){
                this.userIdList.push(selection[i].id)
            }
            return this.userIdList
        },
        //批量删除用户
        delUsers: function(){
            if (this.userIdList.length == 0){
                this.$message({
                    type: 'error',
                    message: '请至少选择一位用户!'
                });
            } else {
                this.$confirm('是否确认删除?', '提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'waring'
                }).then(async () => {
                    var params = {
                        "deleteIds" : this.userIdList
                    }
                    await delUserApi(JSON.stringify(params))
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$router.go(0)
                }).catch(() => {
                });
            }
        },
        //删除单用户
        btnDelete: function(id) {
            this.$confirm('是否确认删除?', '提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'waring'
            }).then(async () => {
                const userId = [];
                userId.push(id);
                var params = {
                    "deleteIds": userId
                };
                await delUserApi(JSON.stringify(params))
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.$router.go(0)
            }).catch(() => {
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./UserManage.scss"
</style>