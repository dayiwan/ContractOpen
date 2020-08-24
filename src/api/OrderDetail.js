import request from '@/utils/request';

//获取订单详情
export const getOrderDetailApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/orders/save',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}
