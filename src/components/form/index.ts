import type { App } from 'vue'
import Form from './form.vue'
import type { SFCWithInstall } from '@/utils'
import type { FormInstance, FormOptions, FormOptionItem, FormItemElementAttrs } from './type'
const _Form = Form as SFCWithInstall<typeof Form>

_Form.install = (app: App) => {
  app.component('UForm', Form)
}

export default _Form
export type { FormInstance, FormOptions, FormOptionItem, FormItemElementAttrs }
