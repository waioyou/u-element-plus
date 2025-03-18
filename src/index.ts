import type { App } from 'vue'

import UContextMenu from './components/context-menu'
import UForm from './components/form'
import UTable from './components/table'
import UOperation from './components/operation'
import './styles/index.scss'

const components = [UForm, UTable, UContextMenu, UOperation]

const install = (app: App) => {
  components.forEach((components) => {
    app.component(components.name!, components)
  })
}

export { install, UContextMenu, UForm, UOperation, UTable }

export type * from './components/context-menu'
export type * from './components/form'
export type * from './components/table'
export type * from './components/operation'

export * from '@/hooks'

export default {
  install,
} as any
