import type { App } from 'vue'
import TitleBar from './title-bar.vue'
import type { SFCWithInstall } from '@/types'

const _TitleBar = TitleBar as SFCWithInstall<typeof TitleBar>

_TitleBar.install = (app: App) => {
  app.component('UTitleBar', TitleBar)
}

export default _TitleBar
export * from './types'
