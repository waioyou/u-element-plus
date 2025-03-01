import type { App } from 'vue'
import Form from './form.vue'
import type { SFCWithInstall } from '@/types'
const _Form = Form as SFCWithInstall<typeof Form>

_Form.install = (app: App) => {
  app.component('UForm', Form)
}

export default _Form
export * from './type'
