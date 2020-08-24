import request from '@/utils/request'

//获取用户列表
export const getUserListApi = (params) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-open-user/sys/user1/page',
            method: 'get',
            params: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//新增用户
export const addUserApi = (params) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-open-user/sys/user1',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//删除用户
export const delUserApi = (params) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-open-user/sys/user1/delete',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}