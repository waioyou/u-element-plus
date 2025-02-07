import type {
  FormProps as ElFormProps,
  FormItemProps as ElFormItemProps,
  FormItemRule,
} from 'element-plus'
import type { CSSProperties, VNode, Component } from 'vue'
/** 表单属性 */
export interface FormProps extends Omit<ElFormProps, 'model'> {
  /** 是否查看模式 */
  view?: boolean
}

/** 表单事件 */
export type FormEmits = {
  /** @todo 任一表单项被校验后触发 */
  validate: any
  /** 任一表单项值发生变化时触发 */
  change: [name: string, item: FormOptionItem]
}
export type FormOptions<T = any> = {
  [K in keyof T]: FormOptionItem<T[K]>
}
/** 表单配置项 */

export interface FormOptionItem<V = any> extends Partial<Omit<ElFormItemProps, 'prop'>> {
  /** 类型: 对应element-plus的表单组件、以及一些拓展组件 */
  type?: FormItemType
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
  formatter?: (item: FormOptionItem) => VNode
  /** 是否渲染 */
  if?: boolean
  /** 是否展示 */
  show?: boolean
  /** 动态组件 */
  component?: Component
  /** 样式 */
  style?: CSSProperties
  /** 类名 */
  class?: string
  /** 属性 */
  attrs?: Record<string, any>
}

/** 表单项元素类型枚举 */
export enum FormItemType {
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
  /** 上传 */
  Upload = 'el-upload',
}

type FormOptionItemSlot = 'default' | 'label' | 'error'
