import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'
import { ElMessage } from 'element-plus'
const BASE_URL: string = import.meta.env.VITE_APP_WEB_URL

// // 设置请求头和请求路径
// axios.defaults.baseURL = '/api'
// axios.defaults.timeout = 10000
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 创建一个axios实例
const service: AxiosInstance = axios.create({
  baseURL: BASE_URL, // 请求的地址，这里的地址应该跟反向代理地址一致
  timeout: 10000, //  设置超时时间
  headers: {
    // 携带的请求头
    'Content-Type': 'application/json;charset=utf-8',
    platform: '5',
  },
})

service.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    // const token = window.sessionStorage.getItem('token')
    // if (token) {
    //   // @ts-ignore
    //   config.headers.token = token
    // }

    // @ts-ignore
    config.headers.Authorization = localStorage.getItem('Authorization')
    return config
  },
  (error) => {
    ElMessage.error('请求超时！')
    return error
  }
)
// 响应拦截
service.interceptors.response.use((res) => {
  if (res.data.code !== 0) {
    localStorage.setItem('Authorization', '')
    // token过期操作
  }
  return res
})

interface ResType<T> {
  code: number
  data?: T
  msg: string
  err?: string
}
interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>
  post<T>(url: string, params?: unknown): Promise<ResType<T>>
  upload<T>(url: string, params: unknown): Promise<ResType<T>>
  download(url: string): void
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .get(url, { params })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  download(url) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  },
}
export default http
