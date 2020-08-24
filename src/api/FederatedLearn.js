import request from '@/utils/federatedRequest.js';

//效果验证
export const getEffectDataApi = () => {
    return new Promise((resolve, reject) => {
        request({
            url: '/effectData',
            method: 'get',
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//案例库
export const getCaseBaseApi = () => {
    return new Promise((resolve, reject) => {
        request({
            url: '/caseBase',
            method: 'get',
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//仿真数据
export const getSimulateDataApi = () => {
    return new Promise((resolve, reject) => {
        request({
            url: '/simulateData',
            method: 'get',
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

//模型库
export const getModelBaseApi = () => {
    return new Promise((resolve, reject) => {
        request({
            url: '/modelBase',
            method: 'get',
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}