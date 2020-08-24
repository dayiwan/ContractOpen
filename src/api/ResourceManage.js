import request from '@/utils/request'

//获取平台方管理资源列表
export const getResourceManageListApi = (params) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/blockData/query',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//获取平台方资源管理统计信息
export const getResourceInfoApi = () => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/blockData/queryResourceInfo',
            method: 'get',
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//通过资源审核
export const passResourceApi = (params) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/blockData/submitSuccess',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//驳回资源审核
export const refuseResourceApi = (params) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/blockData/submitFailed',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}