import axios, { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'

// 创建一个axios实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_WEB_URL, // 请求的地址，这里的地址应该跟反向代理地址一致
  timeout: 10000, //  设置超时时间
  headers: {
    // 携带的请求头
    'Content-Type': 'application/json;charset=utf-8',
    platform: '5',
  },
})

// 设置请求拦截
service.interceptors.request.use(
  (config: any) => {
    config.headers.Authorization = localStorage.getItem('Authorization')

    return config
  },
  (error) => {
    ElMessage.error('请求超时！')
    return Promise.reject(error)
  }
)

// 设置响应拦截
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log('err错误判断', error.response)

    return Promise.reject(error)
  }
)

export default service
