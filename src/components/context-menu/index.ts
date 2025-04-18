import type { App } from 'vue'
import type { SFCWithInstall } from '@/types'
import ContextMenu from './context-menu.vue'
const _ContextMenu = ContextMenu as SFCWithInstall<typeof ContextMenu>

_ContextMenu.install = (app: App) => {
  app.component('UContextMenu', ContextMenu)
}

export default _ContextMenu
export * from './types'
