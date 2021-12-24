/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type ErrorType =
  | 'Business' // 业务异常
  | 'Server' // 服务端错误
  | 'Offline' // 客户端离线
  | 'Timeout' // 请求超时
  | 'Unknown' // 其他错误，例如 js 运行时异常

export interface ErrorContext {
  /** 调用者 */
  caller: string
  /** 函数名称 */
  methodName: string
  /** 扩展信息 */
  extras: any
}

export class AppError extends Error {
  code: number | string | undefined
  context?: ErrorContext

  constructor(
    code: number | string | undefined,
    type: string,
    message: string,
    context?: ErrorContext,
  ) {
    super(message)

    Object.setPrototypeOf(this, AppError.prototype)

    this.code = code
    this.name = type
    this.context = context
  }

  setContext(caller: string, methodName: string, extras?: any): void {
    this.context = { caller, methodName, extras }
  }
}
