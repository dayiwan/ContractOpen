import request from '@/utils/request';

//平台方审核通过订单
export const passOrderApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/orders/platCheckToSuccess',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//平台方驳回订单
export const refuseOrderApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/orders/platCheckToFailed',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}
