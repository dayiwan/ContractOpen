import axios from 'axios';
import { Message } from 'element-ui';
import { getToken } from "@/utils/cookies.js";

const service = axios.create({
    baseURL: 'http://172.16.111.14:8080',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Accept-Language": "zh-CN"
    },
    withCredentials: true
})

service.interceptors.request.use(function (config){
    config.headers['token'] = getToken()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})


service.interceptors.response.use(
    response => {
        // return response.data;
        // console.log(typeof(response))
        if (response.data.code == 10000 || response.data.code == 0) {
            if ( "data" in response.data){
                return Promise.resolve(response.data.data)
            }else{
                return Promise.resolve(response.data.result)
            }
        } else {
            Message.error({
                message: response.data.msg,
                duration: 1000
            })
            // console.log('ERROR ' + response) // for debug
            return Promise.reject(response)
            
        }
    },
    error => {
        Message.error({
            message: error,
            duration: 1000
        })
        // console.log('err ' + error) // for debug
        return Promise.reject(error)
    }
)

export default service