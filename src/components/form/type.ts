import type {
  FormProps as ElFormProps,
  FormItemProps as ElFormItemProps,
  FormInstance as ElFormInstance,
  FormItemRule,
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
  slot?: FormOptionItemSlot | FormOptionItemSlot[]
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
  /** 表单项宽度占一行比例：[numerator, denominator]，默认[1,1] */
  ratio?: [number, number]
  /** 属性 */
  attrs?: Record<string, any>
}

/** 表单项元素类型枚举 */
export const enum FormItemElementEnum {
  /** 自动补全输入框 */
  AutoComplete = 'el-autocomplete',
  /** 级联选择器 */
  Cascader = 'el-cascader',
  /** 多选框组 */
  CheckboxGroup = 'el-checkbox-group',
  /** 取色器 */
  ColorPicker = 'el-color-picker',
  /** 日期选择器 */
  DatePicker = 'el-date-picker',
  /** 输入框 */
  Input = 'el-input',
  /** 数字输入框 */
  InputNumber = 'el-input-number',
  /**
   * 标签输入框
   * @since ElementPlus 2.9.0
   */
  InputTag = 'el-input-tag',
  /** 提及 */
  Mention = 'el-mention',
  /** 单选框组 */
  RadioGroup = 'el-radio-group',
  /** 评分 */
  Rate = 'el-rate',
  /** 选择器 */
  Select = 'el-select',
  /** 虚拟化选择器 */
  SelectV2 = 'el-select-v2',
  /** 滑块 */
  Slider = 'el-slider',
  /** 开关 */
  Switch = 'el-switch',
  /** 时间选择器 */
  TimePicker = 'el-time-picker',
  /** 时间选择 */
  TimeSelect = 'el-time-select',
  /** 穿梭框 */
  Transfer = 'el-transfer',
  /** 树形选择 */
  TreeSelect = 'el-tree-select',
  /** 输入框组 */
  InputGroup = 'el-input-group',
}

/** 表单项元素类型 */
export type FormItemElement =
  | 'el-autocomplete' /** 自动补全输入框 */
  | 'el-cascader' /** 级联选择器 */
  | 'el-checkbox-group' /** 多选框组 */
  | 'el-color-picker' /** 取色器 */
  | 'el-date-picker' /** 日期选择器 */
  | 'el-input' /** 输入框 */
  | 'el-input-number' /** 数字输入框 */
  | 'el-input-tag' /** 标签输入框 @since ElementPlus 2.9.0 */
  | 'el-mention' /** 提及 */
  | 'el-radio-group' /** 单选框组 */
  | 'el-rate' /** 评分 */
  | 'el-select' /** 选择器 */
  | 'el-select-v2' /** 虚拟化选择器 */
  | 'el-slider' /** 滑块 */
  | 'el-switch' /** 开关 */
  | 'el-time-picker' /** 时间选择器 */
  | 'el-time-select' /** 时间选择 */
  | 'el-transfer' /** 穿梭框 */
  | 'el-tree-select' /** 树形选择 */
  | 'el-input-group' /** 输入框组 */

type FormOptionItemSlot = 'default' | 'label' | 'error'
