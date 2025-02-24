import type {
  PropsWithoutValue,
  InstancePropsType,
  InstancePropsTypeOmitValue,
  TypeNoReadonly,
} from '@/utils'
import type {
  FormProps as ElFormProps,
  FormItemProps as ElFormItemProps,
  FormInstance as ElFormInstance,
  FormItemRule,
  InputProps,
  CheckboxGroupProps,
  ColorPickerProps,
  DatePickerProps,
  InputNumberProps,
  InputTagProps,
  MentionProps,
  RadioGroupProps,
  RateProps,
  TimeSelectProps,
  SliderProps,
  SwitchProps,
  TimePickerDefaultProps,
  TransferProps,
  UploadProps,
  ElTreeSelect,
  ElSelect,
  ElSelectV2,
  ElCascader,
} from 'element-plus'
import type { CSSProperties, VNode, Component } from 'vue'

/** 表单属性 */
export interface FormProps extends Omit<ElFormProps, 'model' | 'inline'> {
  /** 是否查看模式 */
  view?: boolean
  /** 表单配置项 */
  options: FormOptions
}

/** 表单事件 */
export type FormEmits = {
  /** @todo 任一表单项被校验后触发 */
  validate: any
  /** 任一表单项值发生变化时触发 */
  change: [name: string, item: FormItemOption]
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
  | FormItemOptionWithColorPicker
  | FormItemOptionWithDatePicker
  | FormItemOptionWithInput
  | FormItemOptionWithInputNumber
  | FormItemOptionWithInputTag
  | FormItemOptionWithMention
  | FormItemOptionWithRadioGroup
  | FormItemOptionWithRate
  | FormItemOptionWithSelect
  | FormItemOptionWithSelectV2
  | FormItemOptionWithSlider
  | FormItemOptionWithSwitch
  | FormItemOptionWithTimePicker
  | FormItemOptionWithTimeSelect
  | FormItemOptionWithTransfer
  | FormItemOptionWithTreeSelect
  | FormItemOptionWithInputGroup
  | FormItemOptionWithUpload
  | FormItemOptionWithTitle

export interface BaseFormItemOption extends Partial<TypeNoReadonly<Omit<ElFormItemProps, 'prop'>>> {
  /** 值 */
  value?: any
  /** 标签 */
  label?: string
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
  label?: (item: FormItemOption, label: string) => VNode | string | number
  error?: (item: FormItemOption, error: string) => VNode | string | number
  default?: (item: FormItemOption, view: boolean) => VNode | string | number
}

export interface FormItemOptionWithAutoComplete extends BaseFormItemOption {
  element: 'autocomplete'
  attrs?: AutocompleteAttrs
}
export interface FormItemOptionWithCascader extends BaseFormItemOption {
  element: 'cascader'
  attrs?: CascaderAttrs
}
export interface FormItemOptionWithCheckboxGroup extends BaseFormItemOption {
  element: 'checkbox-group'
  attrs?: CheckboxGroupAttrs
}
export interface FormItemOptionWithColorPicker extends BaseFormItemOption {
  element: 'color-picker'
  attrs?: ColorPickerAttrs
}
export interface FormItemOptionWithDatePicker extends BaseFormItemOption {
  element: 'date-picker'
  attrs?: DatePickerAttrs
}
export interface FormItemOptionWithInput extends BaseFormItemOption {
  element: 'input'
  attrs?: InputAttrs
}
export interface FormItemOptionWithInputNumber extends BaseFormItemOption {
  element: 'input-number'
  attrs?: InputNumberAttrs
}
export interface FormItemOptionWithInputTag extends BaseFormItemOption {
  element: 'input-tag'
  attrs?: InputTagAttrs
}
export interface FormItemOptionWithMention extends BaseFormItemOption {
  element: 'mention'
  attrs?: MentionAttrs
}
export interface FormItemOptionWithRadioGroup extends BaseFormItemOption {
  element: 'radio-group'
  attrs?: RadioGroupAttrs
}
export interface FormItemOptionWithRate extends BaseFormItemOption {
  element: 'rate'
  attrs?: RateAttrs
}
export interface FormItemOptionWithSelect extends BaseFormItemOption {
  element: 'select'
  attrs?: SelectAttrs
}
export interface FormItemOptionWithSelectV2 extends BaseFormItemOption {
  element: 'select-v2'
  attrs?: SelectV2Attrs
}
export interface FormItemOptionWithSlider extends BaseFormItemOption {
  element: 'slider'
  attrs?: SliderAttrs
}
export interface FormItemOptionWithSwitch extends BaseFormItemOption {
  element: 'switch'
  attrs?: SwitchAttrs
}
export interface FormItemOptionWithTimePicker extends BaseFormItemOption {
  element: 'time-picker'
  attrs?: TimePickerAttrs
}
export interface FormItemOptionWithTimeSelect extends BaseFormItemOption {
  element: 'time-select'
  attrs?: TimeSelectAttrs
}
export interface FormItemOptionWithTransfer extends BaseFormItemOption {
  element: 'transfer'
  attrs?: TransferAttrs
}
export interface FormItemOptionWithTreeSelect extends BaseFormItemOption {
  element: 'tree-select'
  attrs?: TreeSelectAttrs
}
export interface FormItemOptionWithInputGroup extends BaseFormItemOption {
  element: 'input-group'
  attrs?: InputGroupAttrs
}
export interface FormItemOptionWithUpload extends BaseFormItemOption {
  element: 'upload'
  attrs?: UploadAttrs
}
export interface FormItemOptionWithTitle extends BaseFormItemOption {
  element: 'title'
  attrs?: never
}

export type AutocompleteAttrs = {
  /** 输入框占位文本 */
  placeholder?: string
  /** 是否可清空	 */
  clearable?: boolean
  /** 自动补全组件是否被禁用 */
  disabled?: boolean
  /** 输入建议对象中用于显示的键名 */
  valueKey?: string
  /** 获取输入建议的防抖延时，单位为毫秒 */
  debounce?: number
  /** 菜单弹出位置 */
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
  /**获取输入建议的方法， 仅当你的输入建议数据 resolve 时，通过调用 callback(data:[])  来返回它 */
  fetchSuggestions?: (queryString: string, callback: (data: any[]) => void) => void
  /** 是否在输入框 focus 时显示建议列表 */
  triggerOnFocus?: boolean
  /** 在输入没有任何匹配建议的情况下，按下回车是否触发 select 事件 */
  selectWhenUnmatched?: boolean
  /** 原生输入框 name 属性 */
  name?: string
  /** @since 2.7.2 原生 aria-label属性 */
  ariaLabel?: string
  /** 是否隐藏远程加载时的加载图标 */
  hideLoading?: boolean
  /** 自定下拉列表的类名 */
  popperClass?: string
  /** teleported	是否将下拉列表元素插入 append-to 指向的元素下 */
  teleported?: boolean
  /** 指定插入元素 */
  appendTo?: string
  /** 是否突出显示查询字串 */
  highlightFirstItem?: boolean
  fitInputWidth?: boolean
  /** @deprecated 是否将下拉列表插入至 body 元素。 在下拉列表的定位出现问题时，可将该属性设置为 false	 */
  popperAppendToBody?: boolean
  /** 在输入框失去焦点时触发 */
  onBlur?: (event: FocusEvent) => void
  /** 在输入框获得焦点时触发 */
  onFocus?: (event: FocusEvent) => void
  /** 输入时触发 */
  onInput?: (value: any) => void
  /** 在输入框清空时触发 */
  onClear?: () => void
  /** 选中建议项时触发 */
  onSelect?: (item: any) => void
  /** 在 Input 值改变时触发	 */
  onChange?: (value: any) => void
  [key: string]: any
}

// 各个组件的属性类型定义
export type CascaderAttrs = InstancePropsTypeOmitValue<typeof ElCascader>
export type CheckboxGroupAttrs = PropsWithoutValue<CheckboxGroupProps> & {
  options: { label: string; value: any }[]
}
export type ColorPickerAttrs = PropsWithoutValue<ColorPickerProps>
export type DatePickerAttrs = PropsWithoutValue<DatePickerProps>
export type InputAttrs = PropsWithoutValue<InputProps>
export type InputNumberAttrs = PropsWithoutValue<InputNumberProps>
export type InputTagAttrs = PropsWithoutValue<InputTagProps>
export type MentionAttrs = PropsWithoutValue<MentionProps>
export type RadioGroupAttrs = PropsWithoutValue<RadioGroupProps> & {
  options: { label: string; value: any }[]
}
export type RateAttrs = PropsWithoutValue<RateProps>
export type SelectAttrs = InstancePropsTypeOmitValue<typeof ElSelect> & {
  options: { label: string; value: any }[]
}
export type SelectV2Attrs = InstancePropsTypeOmitValue<typeof ElSelectV2>
export type SliderAttrs = PropsWithoutValue<SliderProps>
export type SwitchAttrs = PropsWithoutValue<SwitchProps>
export type TimePickerAttrs = PropsWithoutValue<TimePickerDefaultProps>
export type TimeSelectAttrs = PropsWithoutValue<TimeSelectProps>
export type TransferAttrs = PropsWithoutValue<TransferProps>
export type TreeSelectAttrs = InstancePropsType<typeof ElTreeSelect>
export type InputGroupAttrs = PropsWithoutValue<any>
export type UploadAttrs = PropsWithoutValue<UploadProps>
