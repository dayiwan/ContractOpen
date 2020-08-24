<template>
    <div class="resource-page">
        <UserCenterHeader title="数据资源配置" :showOption="false" :canSearch="false" :comeBack="true"></UserCenterHeader>
        <div class="add_form">
            <el-form :model="ruleForm" label-width="170px" class="demo-ruleForm">
                <el-form-item label="数据资源名称">
                    <el-input v-model="ruleForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="数据时间范围">
                    <el-col :span="8">
                        <el-form-item>
                            <el-input v-model="ruleForm.dateStart" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1">-</el-col>
                    <el-col :span="8">
                        <el-form-item>
                            <el-input v-model="ruleForm.dateEnd" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="主题" prop="region">
                    <el-input v-model="ruleForm.theme" disabled></el-input>
                </el-form-item>
                <el-form-item label="行业">
                   <el-input v-model="ruleForm.industry" disabled></el-input>
                </el-form-item>
                <el-form-item label="授权使用有效期">
                    <el-input v-model="ruleForm.time" disabled></el-input>
                </el-form-item>
                <el-form-item label="授权方式">
                    <el-input v-model="ruleForm.right" disabled></el-input>
                </el-form-item>
                <el-form-item label="适用范围">
                    <el-input v-model="ruleForm.range" disabled></el-input>
                </el-form-item>
                <el-form-item label="积分" :inline="true">
                    <el-col :span="5" class="integral">
                        <div :inline="true">
                            <el-radio-group v-model="ruleForm.assess">
                                <el-radio-button label="自填"></el-radio-button>
                                <el-radio-button label="平台评估"></el-radio-button>
                            </el-radio-group>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <el-input v-model="ruleForm.price"  disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="数据质量自评">
                    <el-input v-model="ruleForm.qualityPrice" disabled></el-input>
                </el-form-item>
                <el-form-item label="数据资源描述" prop="type">
                    <el-input v-model="ruleForm.describe" disabled></el-input>
                </el-form-item>
                <el-form-item label="数据条数">
                    <el-input v-model="ruleForm.number" disabled></el-input>
                </el-form-item>
                <el-form-item label="数据格式">
                    <el-input v-model="ruleForm.type" disabled></el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="submitForm()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import UserCenterHeader from "../components/UserCenterHeader";
import { getMyResourceDetailApi} from "@/api/MyResource.js"
export default {
    name: "MyResourceDetail",
    components: {UserCenterHeader},
    data() {
        return {
            checked: true,
            ruleForm: {
                name: '',
                dateStart: '',
                dateEnd:'',
                theme: '',
                industry: '',
                time: '',
                right: '',
                range: '',
                examine: '',
                assess: '',
                price: '',
                quality: '',
                describe: '',
                number: '',
                type: '',
                qualityPrice:[],
                rightMap: new Map([[0, '部分授权'], [1, '全部授权']]),
                rangeMap: new Map([[0, '企业'], [1, '科研'], [2, '公共部门'], [3, '政府'], [4, '其他']]),
                assessMap: new Map([[0, '自填'], [1, '平台评估']]),
                typeMap: new Map([[0, 'csv'], [1, 'dat'], [2, 'json'], [3, 'excel'], [4, 'text']])
            },
        };
    },
    mounted(){
        this.getMyResourceDetail();
    },
    methods: {
        //查询现有详情
        async getMyResourceDetail(){
            const res = await getMyResourceDetailApi(this.$route.query.id);
            const tabledata = res.list[0];
            this.ruleForm.name = tabledata.blockDataName;
            this.ruleForm.dateStart = tabledata.dataTime.split("T")[0];
            this.ruleForm.dateEnd = tabledata.dataEndTime.split("T")[0];
            this.ruleForm.theme = tabledata.themeName;
            this.ruleForm.industry = tabledata.industryName;
            this.ruleForm.time = tabledata.validTime;
            this.ruleForm.price = tabledata.price;
            this.ruleForm.describe = tabledata.description;
            this.ruleForm.number = tabledata.dataCount;
            if ( tabledata.evaluationList !== null){
                this.ruleForm.qualityPrice = tabledata.evaluationList
            }
            this.ruleForm.right = this.rightMap.get(tabledata.isShare)
            this.ruleForm.range = this.rangeMap.get(tabledata.useRange)
            this.ruleForm.assess = this.assessMap.get(tabledata.priceStatus)
            this.ruleForm.type = this.typeMap.get(tabledata.dataFormat)
        },
        submitForm() {
            this.$router.go(-1)
        },
    }
}
</script>

<style lang="scss" scoped>
    .user-center-header {background: #fff}
    .title {background: #fff}
    .add_form {background: #fff;padding: 4% 5% 4% 2%}
    .add_form .el-select{display: block}
    .add_form .el-col-8{padding: 0!important;}
    .add_form .integral{padding: 0!important;text-align: left}
    /deep/label{font-size: 16px;color: #4f5b72}
    /deep/.add_form .el-checkbox__inner{margin-right: 10px;width: 16px;height: 16px;border-radius: 50%}
    /deep/.add_form .el-checkbox__inner:after{width: 5px}
    .add_form .btn button{width: 120px;font-size: 16px;border-radius: 6px}
</style>

