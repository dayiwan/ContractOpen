import request from '@/utils/request'

//查询任务管理统计信息
export const getTaskInfoApi = () => {
    return new Promise((resolve, reject) => {
        request({
            url: '/api/service-transaction/transaction/myTask/queryTaskInfo',
            method: 'get',
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}