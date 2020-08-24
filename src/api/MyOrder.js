import request from '@/utils/request';

//获取订单列表
export const getOrderListApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/orders/list',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}
//支付订单
export const getPayOrderApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/orders/sucessPay',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}
//删除订单
export const getDelOrderApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/orders/delete',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

