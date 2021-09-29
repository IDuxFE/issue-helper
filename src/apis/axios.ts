declare module 'axios' {
  export interface AxiosRequestConfig {
    // custom config props
    _retry?: boolean
  }
}

import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { AppError } from './error'
import {
  BusinessErrorCode,
  businessErrorMessage,
  defaultErrorMessage,
  HttpErrorCode,
  httpErrorMessage,
  netErrorMessage,
  timeoutMessage,
} from './errorMessages'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
})

instance.interceptors.request.use(handleConfig)

instance.interceptors.response.use(handleResponse, handleHttpError)

/**
 * 可以在这里处理 url, 或者其他的一些自定义配置
 */
function handleConfig(config: AxiosRequestConfig): AxiosRequestConfig {
  // do something
  return config
}

/**
 * 可以在这里对返回结果进行统一的处理
 */
function handleResponse(response: AxiosResponse): unknown | Promise<never> {
  // 通常情况下，我们会与后端约定好，请求成功统一返回 200, 然后根据不同的 code 去区分业务异常
  // 如果这里的 status 不等于 200, 或者返回结果中的 code 不存在, 就表示这是一个需要特殊处理的接口，直接返回即可
  if (response.status !== 200 || response.data.code === undefined) {
    return response
  }

  let { code, data, message = defaultErrorMessage } = response.data

  // code 为 0 表示业务正常，其他表示异常
  if (code === 0) {
    // 正常情况下，业务请求只需要关注 data
    return data
  } else {
    switch (code) {
      case 401:
      case 403:
      case 404:
        message = businessErrorMessage[code as BusinessErrorCode] ?? message
        // 在这里提示用户并跳转到相应页面
        // do something
        return Promise.reject()
      default:
        // 其他情况返回一个 AppError
        return Promise.reject(new AppError(code, 'Business', message))
    }
  }
}

/**
 * 可以在处理 http 错误，统一包装成 AppError
 */
function handleHttpError(error: AxiosError): Promise<never> {
  let { code, response, message } = error

  let name
  if (!window.navigator.onLine) {
    name = 'Offline'
    message = netErrorMessage
  } else if (message.includes('timeout')) {
    name = 'Timeout'
    message = timeoutMessage
  } else {
    name = 'Server'
    message = httpErrorMessage[response?.status as HttpErrorCode] ?? defaultErrorMessage
  }

  return Promise.reject(new AppError(response?.status ?? code, name, message))
}
