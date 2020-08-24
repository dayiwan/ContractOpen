import request from '@/utils/request'

//获取不同用户显示侧边栏信息
export const getUserCenterApi = () => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-open-user/sys/menu/nav1',
            method: 'get',
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//获取用户余额
export const getUserMoneyApi = (params) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/orders/selectUserBalance',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}