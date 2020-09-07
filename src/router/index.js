import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/Layout/Layout.vue';

Vue.use(VueRouter)
/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
};
const routes = [{
    path: '/',
    redirect: '/home',
    name: 'index',
    component: layout,
    children: [{
        path: '/home',
        name: 'home',
        component: () =>
            import('@/views/Home/Home.vue')
    }, {  //数据服务
        path: '/dataService',
        name: 'dataService',
        component: () =>
            import('@/views/dataService/dataService.vue'),
    }, {  //联邦建模
        path: '/dataModel',
        name: 'dataModel',
        component: () =>
            import('@/views/dataModel/dataModel.vue'),
    }, {  //数据沙盒
        path: '/dataBox',
        name: 'dataBox',
        component: () =>
            import('@/views/dataBox/dataBox.vue'),
    }, {  //数据查询
        path: '/dataSearch',
        name: 'dataSearch',
        component: () =>
            import('@/views/dataSearch/dataSearch.vue'),
    }, {  //演练中心
        path: '/caseShow',
        name: 'caseShow',
        component: () =>
            import('@/views/caseShow/caseShow.vue'),
    },
    {  //数据资源
        path: '/dataResource',
        name: 'dataResource',
        component: () =>
            import('@/views/DataResource/DataResource.vue'),
    }, {  //数据需求
        path: '/dataRequirement',
        name: 'dataRequirement',
        component: () =>
            import('@/views/DataRequirement/DataRequirement.vue'),
    }, {   //数据需求详情
        path: '/requirementDetail',
        name: 'requirementDetail',
        component: () =>
            import('@/views/RequirementDetail/RequirementDetail.vue'),
    }, {  //服务定价
        path: '/servicePrice',
        name: 'servicePrice',
        component: () =>
            import('@/views/ServicePrice/ServicePrice.vue'),
    }, {     //数据资源详情
        path: '/resourceDetail',
        name: 'dataResourceDetail',
        component: () =>
            import('@/views/dataResourceDetail/dataResourceDetail.vue')
    }, {    //购物车
        path: '/shopCart',
        name: 'shopCart',
        component: () =>
            import('@/views/ShopCart/ShopCart.vue')
    }, {
        path: '/my',
        name: 'my',
        component: () =>
            import('@/views/UserCenter/UserCenter.vue'),
        children: [{
            path: 'info',
            name: 'myInfo',
            component: () =>
                import('@/views/UserCenter/MyInfo/MyInfo.vue')
        }, {
            path: 'sandboxManage',
            name: 'snadboxManage',
            component: () =>
                import('@/views/UserCenter/SandboxManage/SandboxManage.vue')
        }, {
            path: 'sandBox',
            name: 'mySandBox',
            component: () =>
                import('@/views/UserCenter/MySandBox/MySandBox.vue')
        }, {
            path: 'order',
            name: 'myOrder',
            component: () =>
                import('@/views/UserCenter/MyOrder/MyOrder.vue')
        }, {
            path: 'resource',
            name: 'myResource',
            component: () =>
                import('@/views/UserCenter/MyResource/MyResource.vue'),
        }, {
            path: 'resourceAdd',
            name: 'resourceAdd',
            component: () =>
                import('@/views/UserCenter/MyResource/MyResourceAdd.vue')
        }, {
            path: 'resourceEdit',
            name: 'resourceEdit',
            component: () =>
                import('@/views/UserCenter/MyResource/MyResourceEdit.vue')
        }, {
            path: 'resourceDetail',
            name: 'resourceDetail',
            component: () =>
                import('@/views/UserCenter/MyResource/MyResourceDetail.vue')
        }, {
            path: 'resourceExamine',
            name: 'resourceExamine',
            component: () =>
                import('@/views/UserCenter/MyResource/MyResourceExamine.vue')
        }, {
            path: 'resourceExamineDetail',
            name: 'resourceExamineDetail',
            component: () =>
                import('@/views/UserCenter/MyResource/MyResourceExamineDetail.vue')
        }, {
            path: 'task',
            name: 'task',
            component: () =>
                import('@/views/UserCenter/MyTask/MyTask.vue')
        }, {
            path: 'MyTaskHistory',
            name: 'MyTaskHistory',
            component: () =>
                import('@/views/UserCenter/MyTask/MyTaskHistory.vue')
        }, {
            path: 'MyTaskDetail',
            name: 'MyTaskDetail',
            component: () =>
                import('@/views/UserCenter/MyTask/MyTaskDetail.vue')
        }, {
            path: 'contract',
            name: 'contract',
            component: () =>
                import('@/views/UserCenter/MyContract/MyContract.vue')
        }, {
            path: 'MyContractGet',
            name: 'MyContractGet',
            component: () =>
                import('@/views/UserCenter/MyContract/MyContractGet.vue')
        }, {
            path: 'MyContractDetail',
            name: 'MyContractDetail',
            component: () =>
                import('@/views/UserCenter/MyContract/MyContractDetail.vue')
        }, {
            path: 'MyContractGetDetail',
            name: 'MyContractGetDetail',
            component: () =>
                import('@/views/UserCenter/MyContract/MyContractGetDetail.vue')
        }, {
            path: 'contractManage',
            name: 'contractManage',
            component: () =>
                import('@/views/UserCenter/ContractManage/ContractManage.vue')
        }, {
            path: 'contractManageGet',
            name: 'contractManageGet',
            component: () =>
                import('@/views/UserCenter/ContractManage/ContractManageGet.vue')
        }, {
            path: 'contractManageDetail',
            name: 'contractManageDetail',
            component: () =>
                import('@/views/UserCenter/ContractManage/ContractManageDetail.vue')
        }, {
            path: 'contractManageGetDetail',
            name: 'contractManageGetDetail',
            component: () =>
                import('@/views/UserCenter/ContractManage/ContractManageGetDetail.vue')
        }, {
            path: 'demandManage',
            name: 'demandManage',
            component: () =>
                import('@/views/UserCenter/DemandManage/DemandManage.vue')
        }, {
            path: 'demandAudit',
            name: 'demandAudit',
            component: () =>
                import('@/views/UserCenter/DemandAudit/DemandAudit.vue')
        }, {
            path: 'demandAuditDetail',
            name: 'demandAuditDetail',
            component: () =>
                import('@/views/UserCenter/DemandAudit/DemandAuditDetail.vue')
        }, {
            path: 'feedbackDetail',
            name: 'feedbackDetail',
            component: () =>
                import('@/views/UserCenter/DemandManage/feedbackDetail.vue')
        }, {
            path: 'userManage',
            name: 'userManage',
            component: () =>
                import('@/views/UserCenter/UserManage/UserManage.vue')
        }, {
            path: 'resourceManage',
            name: 'resourceManage',
            component: () =>
                import('@/views/UserCenter/ResourceManage/ResourceManage.vue')
        }, {
            path: 'resourceManageDetail',
            name: 'resourceManageDetail',
            component: () =>
                import('@/views/UserCenter/ResourceManage/ResourceDetail.vue')
        }, {
            path: 'resourceManageEdit',
            name: 'resourceManageEdit',
            component: () =>
                import('@/views/UserCenter/ResourceManage/ResourceEdit.vue')
        }, {
            path: 'taskManage',
            name: 'taskManage',
            component: () =>
                import('@/views/UserCenter/TaskManage/TaskManage.vue')
        }, {
            path: 'taskHistoryManage',
            name: 'taskHistoryManage',
            component: () =>
                import('@/views/UserCenter/TaskManage/TaskHistoryManage.vue')
        }, {
            path: 'taskManageDetail',
            name: 'taskManageDetail',
            component: () =>
                import('@/views/UserCenter/TaskManage/TaskManageDetail.vue')
        }, {
            path: 'orderManage',
            name: 'orderManage',
            component: () =>
                import('@/views/UserCenter/OrderManage/OrderManage.vue')
        }, {
            path: 'orderAudit',
            name: 'orderAudit',
            component: () =>
                import('@/views/UserCenter/OrderAudit/OrderAudit.vue')
        }, {
            path: 'taskSchedule',
            name: 'taskSchedule',
            component: () =>
                import('@/views/UserCenter/TaskSchedule/TaskSchedule.vue')
        }, {
            path: 'chainAudit/:type/:orderId/:datasetId',
            name: 'chainAuditDetail',
            component: () =>
                import('@/views/UserCenter/ChainAudit/ChainAuditDetail/ChainAuditDetail.vue')
        }, {
            path: 'chainAudit',
            name: 'chainAudit',
            component: () =>
                import('@/views/UserCenter/ChainAudit/ChainAudit.vue')
        }, {
            path: 'addUser',
            name: 'addUser',
            component: () =>
                import('@/views/UserCenter/UserManage/AddUser.vue')
        }, {
            path: 'changeUser',
            name: 'changeUser',
            component: () =>
                import('@/views/UserCenter/UserManage/ChangeUser.vue')
        }]
    }]
}, {
    path: "/login",
    name: "login",
    component: () =>
        import('@/views/Login/Login.vue')
}];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
});

export default router
