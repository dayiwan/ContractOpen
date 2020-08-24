import request from '@/utils/request';
// 获取资源管理列表
export const getMyResourceApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/blockData/query',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}
//获取资源管理子页面授权审核列表
export const getExamineResourceApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/myBlockData/query',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}
//获取资源管理子页面详情
export const getMyResourceDetailApi = (id) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/blockData/query',
            method: 'post',
            data:JSON.stringify({
                uuid: id
            })
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}
//获取授权审核详情
export const getMyResourceExamineDetailApi = (id) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/myBlockData/query',
            method: 'post',
            data:JSON.stringify({
                uuid: id
            })
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}
//资源审核通过
export const passResourceApi = (id) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/myBlockData/shareStatusSuccess',
            method: 'post',
            data:JSON.stringify({
                uuid: id
            })
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}
//资源管理删除
export const delResourceApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/blockData/delete',
            method: 'post',
            data:params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//资源编辑
export const editResourceApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/blockData/update',
            method: 'post',
            data:params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}