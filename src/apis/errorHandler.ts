import { AppError } from './error'

let inited = false

export function initErrorHandler(): void {
  if (inited) return

  // 监听所有没有被 catch 的 Promise.reject
  window.addEventListener('unhandledrejection', evt => {
    const { reason } = evt
    if (reason instanceof AppError) {
      handleAppError(reason)
      evt.preventDefault()
    }
  })

  // 监听所有没有被 catch 的 error
  window.addEventListener('error', evt => {
    if (evt instanceof AppError) {
      handleAppError(evt)
      evt.preventDefault()
    }
  })

  inited = true
}

/** 在这里对不同的错误类型进行相应的处理 */
function handleAppError(error: AppError): void {
  switch (error.name) {
    case 'Business':
      // do something
      break
    case 'Offline':
      // do something
      break
    case 'Timeout':
      // do something
      break
    case 'Server':
      // do something
      break
    default:
      // do something
      break
  }
  // 在这里可以记录日志，以及错误上报
  console.error('[handleAppError]', error)
}
