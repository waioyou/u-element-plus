import type { App } from 'vue'

import UContextMenu from './components/context-menu'
// import type { ContextMenuProps, ContextMenuInstance } from './components/context-menu'
import UForm from './components/form'
// import type { FormOptions, FormItemOption, FormInstance } from './components/form'

import './styles/index.scss'

const components = [UForm, UContextMenu]

const install = (app: App) => {
  components.forEach((components) => {
    app.component(components.name!, components)
  })
}

export { install, UContextMenu, UForm }

export type * from './components/context-menu'
export type * from './components/form'
export default {
  install,
}
