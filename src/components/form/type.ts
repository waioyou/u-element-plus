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
import type { CSSProperties, VNode, Component } from 'vue'

/** 表单属性 */
export interface FormProps extends Omit<ElFormProps, 'model'> {
  /** 是否查看模式 */
  view?: boolean
  /** 表单配置项 */
  options: FormOptions
  /** 栅格间隔 */
  gutter?: number
}

/** 表单事件 */
export type FormEmits = {
  /** @todo 任一表单项被校验后触发 */
  validate: [field: string, isValid: boolean, message: string]
  /** 任一表单项值发生变化时触发 */
  change: [field: string, item: FormItemOption]
}

/** 表单实例 */
export interface FormInstance extends ElFormInstance {
  /** 获取表单数据 */
  getFormData: <T = any>(validate?: boolean) => Promise<T | false>
}

/** 表单配置 */
export type FormOptions = Record<string, FormItemOption>

/** 表单项配置 */
export type FormItemOption =
  | FormItemOptionWithAutoComplete
  | FormItemOptionWithCascader
  | FormItemOptionWithCheckboxGroup
  | FormItemOptionWithCheckbox
  | FormItemOptionWithColorPicker
  | FormItemOptionWithDatePicker
  | FormItemOptionWithInput
  | FormItemOptionWithInputNumber
  | FormItemOptionWithInputTag
  | FormItemOptionWithMention
  | FormItemOptionWithRadioGroup
  | FormItemOptionWithRadio
  | FormItemOptionWithRate
  | FormItemOptionWithSelect
  | FormItemOptionWithSelectV2
  | FormItemOptionWithSlider
  | FormItemOptionWithSwitch
  | FormItemOptionWithTimePicker
  | FormItemOptionWithTimeSelect
  | FormItemOptionWithTransfer
  | FormItemOptionWithTreeSelect
  | FormItemOptionWithUpload
  | FormItemOptionWithSectionHeader
  | BaseFormItemOption

export interface BaseFormItemOption extends Partial<TypeNoReadonly<Omit<ElFormItemProps, 'prop'>>> {
  /** 值 */
  value?: any
  /** 标签 */
  label?: string
  /** 元素 */
  element?: never
  /** 是否必填 */
  required?: boolean
  /** 校验规则 */
  rules?: FormItemRule[]
  /** 插槽 */
  slot?: FormItemSlot
  /** 是否查看模式 */
  view?: boolean
  /** 查看模式下格式化显示内容 */
  formatter?: (item: any) => VNode | string | number
  /** 是否渲染 */
  if?: boolean | ((options: FormOptions) => boolean)
  /** 是否展示 */
  show?: boolean | ((options: FormOptions) => boolean)
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
  attrs?: any
  tooltip?: string
}

export type FormItemSlot = {
  label?: ({ item, label }: { item: FormItemOption; label: string }) => VNode | string | number
  error?: ({ item, error }: { item: FormItemOption; error: string }) => VNode | string | number
  default?: ({ item, view }: { item: FormItemOption; view: boolean }) => VNode | string | number
}

export interface FormItemOptionWithAutoComplete extends Omit<BaseFormItemOption, 'element'> {
  element: 'autocomplete'
  attrs?: AutocompleteAttrs
}
export interface FormItemOptionWithCascader extends Omit<BaseFormItemOption, 'element'> {
  element: 'cascader'
  attrs?: CascaderAttrs
}
export interface FormItemOptionWithCheckboxGroup extends Omit<BaseFormItemOption, 'element'> {
  element: 'checkbox-group'
  attrs?: CheckboxGroupAttrs
}
export interface FormItemOptionWithCheckbox extends Omit<BaseFormItemOption, 'element'> {
  element: 'checkbox'
  attrs?: CheckboxAttrs
}
export interface FormItemOptionWithColorPicker extends Omit<BaseFormItemOption, 'element'> {
  element: 'color-picker'
  attrs?: ColorPickerAttrs
}
export interface FormItemOptionWithDatePicker extends Omit<BaseFormItemOption, 'element'> {
  element: 'date-picker'
  attrs?: DatePickerAttrs
}
export interface FormItemOptionWithInput extends Omit<BaseFormItemOption, 'element'> {
  element: 'input'
  attrs?: InputAttrs
}
export interface FormItemOptionWithInputNumber extends Omit<BaseFormItemOption, 'element'> {
  element: 'input-number'
  attrs?: InputNumberAttrs
}
export interface FormItemOptionWithInputTag extends Omit<BaseFormItemOption, 'element'> {
  element: 'input-tag'
  attrs?: InputTagAttrs
}
export interface FormItemOptionWithMention extends Omit<BaseFormItemOption, 'element'> {
  element: 'mention'
  attrs?: MentionAttrs
}
export interface FormItemOptionWithRadioGroup extends Omit<BaseFormItemOption, 'element'> {
  element: 'radio-group'
  attrs?: RadioGroupAttrs
}
export interface FormItemOptionWithRadio extends Omit<BaseFormItemOption, 'element'> {
  element: 'radio'
  attrs?: RadioAttrs
}
export interface FormItemOptionWithRate extends Omit<BaseFormItemOption, 'element'> {
  element: 'rate'
  attrs?: RateAttrs
}
export interface FormItemOptionWithSelect extends Omit<BaseFormItemOption, 'element'> {
  element: 'select'
  attrs?: SelectAttrs
}
export interface FormItemOptionWithSelectV2 extends Omit<BaseFormItemOption, 'element'> {
  element: 'select-v2'
  attrs?: SelectV2Attrs
}
export interface FormItemOptionWithSlider extends Omit<BaseFormItemOption, 'element'> {
  element: 'slider'
  attrs?: SliderAttrs
}
export interface FormItemOptionWithSwitch extends Omit<BaseFormItemOption, 'element'> {
  element: 'switch'
  attrs?: SwitchAttrs
}
export interface FormItemOptionWithTimePicker extends Omit<BaseFormItemOption, 'element'> {
  element: 'time-picker'
  attrs?: TimePickerAttrs
}
export interface FormItemOptionWithTimeSelect extends Omit<BaseFormItemOption, 'element'> {
  element: 'time-select'
  attrs?: TimeSelectAttrs
}
export interface FormItemOptionWithTransfer extends Omit<BaseFormItemOption, 'element'> {
  element: 'transfer'
  attrs?: TransferAttrs
}
export interface FormItemOptionWithTreeSelect extends Omit<BaseFormItemOption, 'element'> {
  element: 'tree-select'
  attrs?: TreeSelectAttrs
}

export interface FormItemOptionWithUpload extends Omit<BaseFormItemOption, 'element'> {
  element: 'upload'
  attrs?: UploadAttrs
}
export interface FormItemOptionWithSectionHeader extends Omit<BaseFormItemOption, 'element'> {
  element: 'section-header'
  attrs?: never
}
