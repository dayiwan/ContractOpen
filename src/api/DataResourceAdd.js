import request from '@/utils/request'
export const getCatalogApi = (id) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-open-classify/catalogue/catalogdirectory/listCatalogDirectoryTree',
            method: 'get',
            params: {
                catalogDirectoryUuid: id
            }
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}


export const addDataSourceApi = params => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/blockData/add',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}