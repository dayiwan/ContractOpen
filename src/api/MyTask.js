import request from '@/utils/request';

//拉取我的任务列表信息
export const getMyTaskApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/myTask/query',
            method: 'post',
            data:params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//支付订单
export const payTaskOrderApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/orders/confirmPay',
            method: 'post',
            data:params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//查看任务详情
export const getTaskDetailApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/myTask/queryTaskDetail',
            method: 'post',
            data:params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//删除任务
export const delTaskApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/myTask/delete',
            method: 'post',
            data:params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//启动任务
export const startTaskApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/myTask/taskOperation',
            method: 'post',
            data:params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//下载任务
export const dowonloadTaskdApi = (url) => {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: 'get',
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}