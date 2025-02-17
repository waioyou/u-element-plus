import type {
  ComponentPropsWithoutValue,
  InstancePropsType,
  InstancePropsTypeOmitValue,
} from '@/utils'
import type {
  FormProps as ElFormProps,
  FormItemProps as ElFormItemProps,
  FormInstance as ElFormInstance,
  FormItemRule,
  InputProps,
  CascaderProps,
  AutocompleteProps,
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
  change: [name: string, item: FormOptionItem]
}

/** 表单实例 */
export interface FormInstance extends ElFormInstance {
  /** 获取表单数据 */
  getFormData: <T = any>(validate?: boolean) => Promise<T | false>
}

// export type FormSlotProps<T extends string> = T extends `label-${string}`
//   ? { item: FormOptionItem; label: string }
//   : T extends `error-${string}`
//     ? { item: FormOptionItem; error: string }
//     : { item: FormOptionItem }

// export type FormSlots =
//   | {
//       [K in `label-${string}`]: { item: FormOptionItem; label: string }
//     }
//   | {
//       [K in `error-${string}`]: { item: FormOptionItem; error: string }
//     }
//   | {
//       [K in string as K extends `label-${string}` | `error-${string}` ? never : K]: {
//         item: FormOptionItem
//       }
//     }

export type FormSlots = {
  [key: string]: {
    item: FormOptionItem
    label?: string
    error?: string
  }
}

/** 表单配置项 */
export type FormOptions<T = any> = {
  [K in keyof T & string]: FormOptionItem<T[K]>
}

export interface FormOptionItem<V = any> extends Partial<Omit<ElFormItemProps, 'prop' | 'rules'>> {
  /** 展示元素: 对应element-plus的表单组件、以及一些拓展组件 */
  element?: FormItemElement
  /** 值 */
  value?: V
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
  formatter?: (item: FormOptionItem) => VNode | string | number
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
  /** 属性 */
  attrs?: {
    /** 表单项的占位符 */
    placeholder?: string
    /** 是否禁用 */
    disabled?: boolean
    /** 选项列表 */
    options?: any[]
    /** 选择器的属性 */
    multiple?: boolean
    [key: string]: any
  }
}

type FormItemSlot = {
  label?: (item: FormOptionItem, label: string) => VNode | string | number
  error?: (item: FormOptionItem, error: string) => VNode | string | number
  default?: (item: FormOptionItem, view: boolean) => VNode | string | number
}

/** 表单项元素类型 */
export type FormItemElement =
  | 'autocomplete' /** 自动补全输入框 */
  | 'cascader' /** 级联选择器 */
  | 'checkbox-group' /** 多选框组 */
  | 'color-picker' /** 取色器 */
  | 'date-picker' /** 日期选择器 */
  | 'input' /** 输入框 */
  | 'input-number' /** 数字输入框 */
  | 'input-tag' /** 标签输入框 @since ElementPlus 2.9.0 */
  | 'mention' /** 提及 */
  | 'radio-group' /** 单选框组 */
  | 'rate' /** 评分 */
  | 'select' /** 选择器 */
  | 'select-v2' /** 虚拟化选择器 */
  | 'slider' /** 滑块 */
  | 'switch' /** 开关 */
  | 'time-picker' /** 时间选择器 */
  | 'time-select' /** 时间选择 */
  | 'transfer' /** 穿梭框 */
  | 'tree-select' /** 树形选择 */
  | 'input-group' /** 输入框组 */
  | 'upload' /** 上传 */
  /** 以下是拓展组件 */
  | 'title' /** 标题 */

type ElAutocompleteAttrs = ComponentPropsWithoutValue<AutocompleteProps>
type ElCascaderAttrs = ComponentPropsWithoutValue<CascaderProps>
type ElCheckboxGroupAttrs = ComponentPropsWithoutValue<CheckboxGroupProps>
type ElColorPickerAttrs = ComponentPropsWithoutValue<ColorPickerProps>
type ElDatePickerAttrs = ComponentPropsWithoutValue<DatePickerProps>
type ElInputAttrs = ComponentPropsWithoutValue<InputProps>
type ElInputNumberAttrs = ComponentPropsWithoutValue<InputNumberProps>
type ElInputTagAttrs = ComponentPropsWithoutValue<InputTagProps>
type ElMentionAttrs = ComponentPropsWithoutValue<MentionProps>
type ElRadioGroupAttrs = ComponentPropsWithoutValue<RadioGroupProps>
type ElRateAttrs = ComponentPropsWithoutValue<RateProps>
type ElSelectAttrs = InstancePropsTypeOmitValue<typeof ElSelect>
type ElSelectV2Attrs = InstancePropsTypeOmitValue<typeof ElSelectV2>
type ElSliderAttrs = ComponentPropsWithoutValue<SliderProps>
type ElSwitchAttrs = ComponentPropsWithoutValue<SwitchProps>
type ElTimePickerAttrs = ComponentPropsWithoutValue<TimePickerDefaultProps>
type ElTimeSelectAttrs = ComponentPropsWithoutValue<TimeSelectProps>
type ElTransferAttrs = ComponentPropsWithoutValue<TransferProps>
type ElTreeSelectAttrs = InstancePropsType<typeof ElTreeSelect>
type ElInputGroupAttrs = ComponentPropsWithoutValue<any>
type ElUploadAttrs = ComponentPropsWithoutValue<UploadProps>

// 定义查找表类型
type ElementAttrsMap = {
  autocomplete: ElAutocompleteAttrs
  cascader: ElCascaderAttrs
  'checkbox-group': ElCheckboxGroupAttrs
  'color-picker': ElColorPickerAttrs
  'date-picker': ElDatePickerAttrs
  input: ElInputAttrs
  'input-number': ElInputNumberAttrs
  'input-tag': ElInputTagAttrs
  mention: ElMentionAttrs
  'radio-group': ElRadioGroupAttrs
  rate: ElRateAttrs
  select: ElSelectAttrs
  'select-v2': ElSelectV2Attrs
  slider: ElSliderAttrs
  switch: ElSwitchAttrs
  'time-picker': ElTimePickerAttrs
  'time-select': ElTimeSelectAttrs
  transfer: ElTransferAttrs
  'tree-select': ElTreeSelectAttrs
  'input-group': ElInputGroupAttrs
  upload: ElUploadAttrs
}

// 定义每个表单元素对应的属性类型
export type FormItemElementAttrs<T extends FormItemElement> = T extends keyof ElementAttrsMap
  ? ElementAttrsMap[T]
  : undefined
