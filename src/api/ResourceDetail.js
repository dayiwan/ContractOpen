import request from '@/utils/request'
export const getResourceDetailApi = (id) => {
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

