import request from '@/utils/request';

//获取数据使用契约列表
export const getLoginApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-open-user-auth/login',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}
