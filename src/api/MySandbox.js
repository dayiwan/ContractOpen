import request from '@/utils/mySandboxRequest';

// 我的沙盒
export const mySandboxApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/user',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}