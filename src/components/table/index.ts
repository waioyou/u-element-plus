import type { App } from 'vue'
import Table from './table.vue'
import type { SFCWithInstall } from '@/types'

const _Table = Table as SFCWithInstall<typeof Table>

_Table.install = (app: App) => {
  app.component('UTable', Table)
}

export default _Table
export * from './type'
