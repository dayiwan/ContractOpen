import request from '@/utils/request'

//购物车查询
export const initCartApi = (username) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/cart/select',
            method: 'post',
            data: JSON.stringify({username})
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//购物车新增
export const addGoodsApi = goods => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/cart/save',
            method: 'post',
            data: JSON.stringify(goods)
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e);
        })
    })
}

//删除购物车商品
export const delGoodsApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/cart/delete',
            method: 'post',
            data: JSON.stringify(params)
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e);
        })
    })
}