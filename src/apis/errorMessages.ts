export const defaultErrorMessage = '服务出现了异常，给您带来的不便敬请谅解。'
export const timeoutMessage = '网络请求超时，请稍后重试。'
export const netErrorMessage = '您的网络已断开连接，请检查您的网络。'

export type HttpErrorCode = 400 | 401 | 403 | 404 | 406 | 410 | 413 | 422 | 500 | 502 | 503 | 504

export const httpErrorMessage: Record<HttpErrorCode, string> = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户没有权限，访问被被禁止。',
  404: '您访问的页面或请求的接口不存在，请检查网址或请求地址是否正确',
  406: '请求的格式不正确。',
  410: '请求的资源被永久删除，且不会再得到。',
  413: '文件太大了，请更换文件再上传',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务出现了异常。',
  502: '网关异常。',
  503: '服务正在维护中。',
  504: '网关超时。',
}

export type BusinessErrorCode = 401 | 403 | 404

export const businessErrorMessage: Record<BusinessErrorCode, string> = {
  401: '您尚未登录或登录已失效，请重新登录。',
  403: '您没有权限进行该操作，请与管理员联系。',
  404: '您访问的页面或请求的接口不存在，请检查网址或请求地址是否正确',
}
