import type { App } from 'vue'

import '@idux/components/style/core/default_css'

import { createGlobalConfig } from '@idux/components/config'
import { IDUX_ICON_DEPENDENCIES, addIconDefinitions } from '@idux/components/icon'

// 静态加载: `IDUX_ICON_DEPENDENCIES` 是 `@idux` 的部分组件默认所使用到图标，建议在此时静态引入。
addIconDefinitions(IDUX_ICON_DEPENDENCIES)

// 动态加载：不会被打包，可以减小包体积，需要加载的时候时候 http 请求加载
const loadIconDynamically = (iconName: string) => {
  return fetch(`/inline-icons/${iconName}.svg`).then(res => res.text())
}

const globalConfig = createGlobalConfig({
  icon: { loadIconDynamically },
})

const install = (app: App): void => {
  app.use(globalConfig)
}

export default { install }
