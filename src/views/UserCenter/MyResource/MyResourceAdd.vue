<template>
    <div class="resource-page">
        <UserCenterHeader title="资源新增" :showOption="false" :canSearch="false"></UserCenterHeader>
        <div class="add_form">
            <el-form :model="ruleForm" label-width="170px" class="demo-ruleForm">
                <el-form-item label="数据资源名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入资源名称"></el-input>
                </el-form-item>
                <el-form-item label="数据时间范围" required>
                    <el-col :span="8">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="起始时间" v-model="ruleForm.dateStart"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1">-</el-col>
                    <el-col :span="8">
                        <el-form-item prop="date2">
                            <el-date-picker type="date" placeholder="截止时间" v-model="ruleForm.dateEnd"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="主题" prop="theme">
                    <el-select v-model="ruleForm.theme" placeholder="所属主题">
                        <el-option v-for="item in themeList" :key="item.id" :label=item.name :value=item.uuid></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="行业" prop="industry">
                    <el-select v-model="ruleForm.industry" placeholder="所属行业">
                        <el-option v-for="item in industryList" :key="item.id" :label=item.name :value=item.uuid></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="授权使用有效期">
                    <el-input v-model="ruleForm.time"  placeholder="请输入整数月"></el-input>
                </el-form-item>
                <el-form-item label="授权方式">
                    <el-select v-model="ruleForm.right" placeholder="部分授权/完全授权">
                        <el-option label="部分授权" value="0"></el-option>
                        <el-option label="完全授权" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="适用范围">
                    <el-select v-model="ruleForm.range" placeholder="企业/科研/公共部门/政用/其他">
                        <el-option label="企业" value="0"></el-option>
                        <el-option label="科研" value="1"></el-option>
                        <el-option label="公共部门" value="2"></el-option>
                        <el-option label="政用" value="3"></el-option>
                        <el-option label="其他" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="积分" :inline="true">
                    <el-col :span="5" class="integral">
                        <div :inline="true">
                            <el-radio-group v-model="ruleForm.assess" >
                                <el-radio-button label="自填"></el-radio-button>
                                <el-radio-button label="平台评估"></el-radio-button>
                            </el-radio-group>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <el-input v-model="price"  placeholder="请输入" v-if="!qualityPriceFlag"></el-input>
                        <el-input v-model="ruleForm.price"  placeholder="请输入" v-else></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="数据质量自评">
                    <el-select v-model="ruleForm.qualityPrice" multiple placeholder="请选择" :disabled="qualityPriceFlag">
                        <el-option
                        v-for="(value, key, index) in options"
                        :key="index"
                        :label="key"
                        :value="key"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据资源描述">
                    <el-input v-model="ruleForm.describe" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="数据条数">
                    <el-input v-model="ruleForm.number" placeholder="1000条以下50积分，1000~10000条100积分，10000条以上150积分"></el-input>
                </el-form-item>
                <el-form-item label="数据格式">
                    <el-select v-model="ruleForm.type" placeholder="csv/dat/json/excel/text">
                        <el-option label="csv" value="0"></el-option>
                        <el-option label="dat" value="1"></el-option>
                        <el-option label="json" value="2"></el-option>
                        <el-option label="excel" value="3"></el-option>
                        <el-option label="text" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="checkbox">
                    <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意平台《协议条款》
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="submitForm">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import UserCenterHeader from "../components/UserCenterHeader";
import { getCatalogApi, addDataSourceApi } from "@/api/DataResourceAdd.js";
import { getUserName } from "@/utils/cookies.js";
export default {
    name: "MyResourceAdd",
    components: {UserCenterHeader},
    data() {
        return {
            themeList: null,
            industryList: null,
            checked: true,
            options: {
                "时效性": 5,
                "稀缺性": 10,
                "准确性": 10,
                "完整性": 15
            },
            ruleForm: {
                name: '',
                dateStart: '',
                dateEnd: '',
                theme: '',
                industry: '',
                time: '',
                right: '',
                range: '',
                assess: '自填',
                price: '',
                qualityPrice: [],
                describe: '',
                number: '',
                type: '',
                dimension: '',
            },
        };
    },
    mounted(){
        this.getThemeList(),
        this.getIndustryList()
    },
    computed:{
        qualityPriceFlag: function() {
            return this.ruleForm.assess === '自填'?true:false
        },
        price: function() {
            var total_price = 0;
            var numberPrice = 0;
            for (var i = 0; i < this.ruleForm.qualityPrice.length; i++ ){
                total_price += this.options[this.ruleForm.qualityPrice[i]];
            }
            if ( 0 < Number(this.ruleForm.number) && Number(this.ruleForm.number) <= 1000 ){
                numberPrice = 50
            } else if ( 1000 < Number(this.ruleForm.number) && Number(this.ruleForm.number) <= 10000 ){
                numberPrice = 100
            }else if ( 10000 < Number(this.ruleForm.number)){
                numberPrice = 150
            }
            return total_price + numberPrice ;
        }
       
    },
    methods: {

        // 拉取主题
        async getThemeList(){
            var catalogDirectoryUuid= '68a3b9a3fc484e03aeb16937379f00c1'
            const res = await getCatalogApi(catalogDirectoryUuid)
            this.themeList = res[0].children
        },
        // 拉取行业
        async getIndustryList(){
            var catalogDirectoryUuid= '3810ec3889c44a5b81a4a4ee8a1f3a24'
            const res = await getCatalogApi(catalogDirectoryUuid)
            this.industryList = res[0].children
        },
        // 保存
        submitForm:function() {
            this.$confirm('是否保存?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                if (this.ruleForm.assess === '自填'){
                    var paramsSelf = {
                        "username":getUserName(),
                        "blockDataName":this.ruleForm.name,
                        "themeUuid":this.ruleForm.theme,
                        "industryUuid":this.ruleForm.industry,
                        "priceStatus":"0",
                        "price":this.ruleForm.price,
                        "description":this.ruleForm.describe,
                        "isShare":this.ruleForm.right,
                        "dataTime":this.ruleForm.dateStart,
                        "dataEndTime": this.ruleForm.dateEnd,
                        "validTime":this.ruleForm.time,
                        "useRange":this.ruleForm.range,
                        "dataCount":this.ruleForm.number,
                        "dataFormat":this.ruleForm.type,
                        "evaluationList": []
                    }
                    await addDataSourceApi(JSON.stringify(paramsSelf))
                } else {
                    var paramsPlatform = {
                        "username":getUserName(),
                        "blockDataName":this.ruleForm.name,
                        "themeUuid":this.ruleForm.theme,
                        "industryUuid":this.ruleForm.industry,
                        "priceStatus":"1",
                        "price":this.price,
                        "description":this.ruleForm.describe,
                        "isShare":this.ruleForm.right,
                        "dataTime":this.ruleForm.dateStart,
                        "dataEndTime": this.ruleForm.dateEnd,
                        "validTime":this.ruleForm.time,
                        "useRange":this.ruleForm.range,
                        "dataCount":this.ruleForm.number,
                        "dataFormat":this.ruleForm.type,
                        "evaluationList": this.ruleForm.qualityPrice
                    }
                    await addDataSourceApi(JSON.stringify(paramsPlatform))
                }
                // 信息提示
                this.$message({
                    type: 'success',
                    message: '保存成功!'
                });
                this.$router.push({name:'myResource'})
            }).catch(() => {
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
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
