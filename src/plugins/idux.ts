import type { App, Directive, Plugin } from 'vue'
import axios from 'axios'

// #region i18n
import { useLocale, zh_CN } from '@idux/components/i18n'
useLocale(zh_CN)
// #endregion

// #region directives
import { clickOutside } from '@idux/cdk/click-outside'
import { IxTypography } from '@idux/components/typography'
import '@idux/components/typography/style'

const directives: Record<string, Directive> = {
  clickOutside,
  typography: IxTypography,
}
// #endregion

// #region plugins
import { createGlobalConfig } from '@idux/components/config'

// 动态加载：不会被打包，可以减小包体积，需要加载的时候时候 http 请求加载
// 建议：将 svg 图标部署到 cdn 上
const loadIconDynamically = (iconName: string) => {
  return axios.get(`/icon-svg/${iconName}.svg`).then(res => res.data)
}

const globalConfig = createGlobalConfig({
  icon: { loadIconDynamically },
})

const plugins: Plugin[] = [globalConfig]
// #endregion

const install = (app: App): void => {
  Object.keys(directives).forEach(key => {
    app.directive(key, directives[key])
  })

  plugins.forEach(plugin => {
    app.use(plugin)
  })
}

export const idux = { install }
