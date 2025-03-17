import type { App } from 'vue'
import Operation from './operation.vue'
import type { SFCWithInstall } from '@/types'
const _Operation = Operation as SFCWithInstall<typeof Operation>

_Operation.install = (app: App) => {
  app.component('UOperation', Operation)
}

export default _Operation
export * from './types'
