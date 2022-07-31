/**
 * @author MaZiXiao
 * @date 2022-07-31 15:25
 */
import axios from 'axios'
import {message} from "antd";
import {getToken, clearToken} from "@/utils/getToken";
import {history} from "@/utils/history";

const instance = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 6000
})
// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {

        config.headers.Authorization = `Bearer ${getToken()}`
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)
// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么

        return response.data.data
    },
    function (error) {
        // 对响应错误做点什么
        console.log(error, 'error')
        const msg = error.toString()
        if (msg.includes('NetWork')) {
            message.error('网络错误，请检查您的网络！')
        }
        if (msg.includes('Timeout')) {
            message.error('请求超时，请检查您的网络！')
        }
        const {status} = error.response
        const msgError = error.response.data.message || '发送未知错误！'
        switch (status) {
            case 401:
                message.error('Token超时,请重新登录！')
                clearToken()
                history.push('/login')
                break;
            case 404:
                message.error('访问接口地址不正确！')
                break
            case 500:
                message.error('服务器发生错误！')
                break
            case 503:
                message.error('服务暂时不可用！')
                break
            case 408:
                message.error('客户端请求超时!')
                break;
            default:
                message.error(msgError)
        }
        return Promise.reject(error)
    }
)

export default instance
