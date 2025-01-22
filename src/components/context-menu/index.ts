import type { App } from 'vue'
import type { ContextMenuProps, ContextMenuInstance } from './types'
import type { SFCWithInstall } from '@/utils'
import ContextMenu from './context-menu.vue'
const _ContextMenu = ContextMenu as SFCWithInstall<typeof ContextMenu>

_ContextMenu.install = (app: App) => {
  app.component('UContextMenu', ContextMenu)
}

export default _ContextMenu
export type { ContextMenuProps, ContextMenuInstance }
