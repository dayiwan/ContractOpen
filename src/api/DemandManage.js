import request from '@/utils/request';

//新增需求
export const addDemandApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/demand/addDemand',
            method: 'post',
            data:params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

// 查询全部需求和我的需求
export const queryDemandApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/demand/queryDemand',
            method: 'post',
            data:params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

// 查询我的反馈
export const getFddebackListApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/demandFeedback/queryFeedback',
            method: 'post',
            data:params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

// 查询反馈详情
export const getFeedbackDetailApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/demandFeedback/queryDemandFeedback',
            method: 'post',
            data:params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

// 查询反馈列表
export const getFeedbackListApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/demandFeedback/queryFeedback',
            method: 'post',
            data:params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

// 新增反馈
export const addFeedbackApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/demandFeedback/addDemandFeedback',
            method: 'post',
            data:params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

// 删除我的需求
export const delDemandApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/demand/delete',
            method: 'post',
            data:params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}