import request from '@/utils/request';

//关闭需求
export const closeDemandApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/demand/closeDemand',
            method: 'post',
            data:params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//开启需求
export const openDemandApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/demand/openDemand',
            method: 'post',
            data:params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}