import type {
  AutocompleteAttrs,
  CascaderAttrs,
  CheckboxAttrs,
  CheckboxGroupAttrs,
  ColorPickerAttrs,
  DatePickerAttrs,
  InputAttrs,
  InputNumberAttrs,
  InputTagAttrs,
  MentionAttrs,
  RadioAttrs,
  RadioGroupAttrs,
  RateAttrs,
  SelectAttrs,
  SelectV2Attrs,
  SliderAttrs,
  SwitchAttrs,
  TimePickerAttrs,
  TimeSelectAttrs,
  TitleBarAttrs,
  TransferAttrs,
  TreeSelectAttrs,
  UploadAttrs,
} from '@/types/form'
import type { TypeNoReadonly } from '@/types'
import type {
  FormProps as ElFormProps,
  FormItemProps as ElFormItemProps,
  FormInstance as ElFormInstance,
  FormItemRule,
} from 'element-plus'
import type { CSSProperties, VNode, Component, ComputedRef, Ref } from 'vue'

/** 表单属性 */
export interface FormProps extends Partial<Omit<ElFormProps, 'model'>> {
  /** 是否查看模式 */
  view?: boolean
  /** 表单配置项 */
  columns: FormColumn[]
  /** 栅格间隔 */
  gutter?: number
}

/** 表单事件 */
export type FormEmits = {
  /** 任一表单项被校验后触发 */
  validate: [prop: string, isValid: boolean, message: string]
  /** 任一表单项被改变后触发 */
  change: [prop: string, item: FormColumn]
}

/** 表单实例 */
export type FormInstance = ElFormInstance

/** 表单项 */
export type FormColumns = FormColumn[]

export interface FormColumn extends Partial<TypeNoReadonly<Omit<ElFormItemProps, 'prop'>>> {
  prop: string
  /** 元素 */
  element?: keyof FormColumnElementAttrsMap
  /** 校验规则 */
  rules?: FormItemRule[]
  /** 渲染默认插槽 */
  render?: (slotProps: { item: FormColumn; view: boolean }) => VNode | string
  /** 渲染错误插槽 */
  renderError?: (slotProps: { item: FormColumn; error: string }) => VNode | string
  /** 渲染标签插槽 */
  renderLabel?: (slotProps: { item: FormColumn; label: string }) => VNode | string
  /** 是否查看模式 */
  view?: boolean | Ref<boolean> | ComputedRef<boolean>
  /** 查看模式下格式化显示内容 */
  formatter?: (item: FormColumn) => VNode | string | number
  /** 是否渲染 对应v-if */
  rendered?: boolean | Ref<boolean> | ComputedRef<boolean> | ((item: FormColumn) => boolean)
  /** 是否展示 对应v-show */
  display?: boolean | Ref<boolean> | ComputedRef<boolean> | ((item: FormColumn) => boolean)
  /** 动态组件 */
  component?: Component
  /** 样式 */
  style?: CSSProperties
  /** 类名 */
  class?: string
  /** 表单项宽度占一行比例
   * @example '1/2'
   */
  span?: string
  /** 对应表单元素属性或者动态组件的属性 */
  attrs?: Record<string, any>
  tooltip?: string
}

/** 表单元素属性查找表 */
export interface FormColumnElementAttrsMap {
  autocomplete: AutocompleteAttrs
  cascader: CascaderAttrs
  'checkbox-group': CheckboxGroupAttrs
  checkbox: CheckboxAttrs
  'color-picker': ColorPickerAttrs
  'date-picker': DatePickerAttrs
  input: InputAttrs
  'input-number': InputNumberAttrs
  'input-tag': InputTagAttrs
  mention: MentionAttrs
  'radio-group': RadioGroupAttrs
  radio: RadioAttrs
  rate: RateAttrs
  select: SelectAttrs
  'select-v2': SelectV2Attrs
  slider: SliderAttrs
  switch: SwitchAttrs
  'time-picker': TimePickerAttrs
  'time-select': TimeSelectAttrs
  transfer: TransferAttrs
  'tree-select': TreeSelectAttrs
  upload: UploadAttrs
  'title-bar': TitleBarAttrs
}
