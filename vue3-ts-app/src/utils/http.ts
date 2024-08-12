import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import stores, { type StateAll } from '@/stores'
import { ElMessage } from 'element-plus'
import router from "@/router";

const instance = axios.create({
  baseURL: 'http://api.h5ke.top',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    if (config.headers) {
      config.headers.authorization = (stores.state as StateAll).users.token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    if (response.data.errmsg === 'token error') {
      ElMessage.error('token error')
      stores.commit('users/clearToken')
      setTimeout(() => {
        window.location.replace('/login')
      }, 1000)
    } else if(response.data.errmsg === 'error') {
      router.push('/500')
    }
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

interface Data {
  [index: string]: unknown
}

interface Http {
  get: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  post: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  put: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  patch: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  delete: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
}

const http: Http = {
  get(url, data, config) {
    return instance.get(url, {
      params: data,
      ...config
    })
  },
  post(url, data, config) {
    return instance.post(url, data, config)
  },
  put(url, data, config) {
    return instance.put(url, data, config)
  },
  patch(url, data, config) {
    return instance.patch(url, data, config)
  },
  delete(url, data, config) {
    return instance.delete(url, { data, ...config })
  }
}

export default http
