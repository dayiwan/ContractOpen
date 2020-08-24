import request from '@/utils/request';

//获取用户id
export const getUserIdApi = () => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-open-user/sys/user1/info',
            method: 'get',
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

// 获取用户信息
export const getUserInfoApi = (id) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-open-user/sys/user1/' + id,
            method: 'get',
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

// 修改用户信息
export const changeUserInfoApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-open-user/sys/user1',
            method: 'put',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}
