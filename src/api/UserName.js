import request from '@/utils/request'

//获取用户信息
export const getUserNameApi = () => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/sys/user1/info',
            method: 'get',
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}