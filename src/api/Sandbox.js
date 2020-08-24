import request from '@/utils/sandboxRequest';

// 沙盒管理
export const sandboxManageApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/platform',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}
