import type { Component, CSSProperties, VNode } from 'vue'
import type { InstancePropsType, TypeNoReadonly } from './common'

import type {
  AutocompleteProps,
  CascaderNode,
  CheckboxGroupProps,
  CheckboxProps,
  DatePickerProps,
  InputNumberProps,
  InputProps,
  InputTagProps,
  MentionOption,
  MentionProps,
  RadioGroupProps,
  RadioProps,
  RateProps,
  ColorPickerProps,
  ElSelectV2,
  SliderProps,
  SwitchProps,
  TimePickerDefaultProps,
  TimeSelectProps,
  TransferProps,
  ElTreeSelect,
  UploadProps,
  TransferKey,
  CascaderProps,
} from 'element-plus'
import type { TitleBarProps } from '@/components/title-bar'
import type { FormItemOption } from '@/components/form'

// import type { ColorPickerProps } from 'element-plus/lib/components/index.js'

export type FormElementAttrsPlugin<T> = Partial<TypeNoReadonly<Omit<T, 'value' | 'modelValue'>>> & {
  style?: CSSProperties
  class?: string
  [key: string]: any
}

/** 自动补全输入框 */
export type AutocompleteAttrs = FormElementAttrsPlugin<AutocompleteProps> & {
  placeholder?: string
  /** 当选择器的输入框失去焦点时触发 */
  onBlur?: (event: FocusEvent) => void
  /** 当选择器的输入框获得焦点时触发 */
  onFocus?: (event: FocusEvent) => void
  /** 在 Input 值改变时触发 */
  onInput?: (value: string | number) => void
  /** 在点击由 clearable 属性生成的清空按钮时触发 */
  onClear?: () => void
  /** 点击选中建议项时触发 */
  onSelect?: (item: any) => void
}

/** 级联选择器属性
 * 对应属性不全，因此进行补充
 */
export type CascaderAttrs = FormElementAttrsPlugin<any> & {
  style?: CSSProperties
  class?: string
  /** 选项的数据源 */
  options?: any[]
  /** 配置选项 */
  props?: CascaderProps
  /** 尺寸 */
  size?: 'large' | 'default' | 'small'
  /** 输入框占位文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否支持清空选项 */
  clearable?: boolean
  /** 输入框中是否显示选中值的完整路径 */
  showAllLevels?: boolean
  /** 多选模式下是否折叠Tag */
  collapseTags?: boolean
  /** 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签 */
  collapseTagsTooltip?: boolean
  /** 用于分隔选项的字符 */
  separator?: string
  /** 该选项是否可以被搜索 */
  filterable?: boolean
  /** 自定义搜索逻辑 */
  filterMethod?: (node: CascaderNode, keyword: string) => boolean
  /** 搜索关键词输入的去抖延迟，单位毫秒 */
  debounce?: number
  /** 过滤函数调用前的钩子函数 */
  beforeFilter?: (value: string) => boolean | Promise<any>
  /** 弹出内容的自定义类名 */
  popperClass?: string
  /** 弹层是否使用 teleport */
  teleported?: boolean
  /** 标签类型 */
  tagType?: 'success' | 'info' | 'warning' | 'danger'
  /** 标签效果 @version 2.7.8 */
  tagEffect?: 'dark' | 'light' | 'plain'
  /** 输入时是否触发表单的校验 */
  validateEvent?: boolean
  /** 需要显示的 Tag 的最大数量 @version 2.3.10 */
  maxCollapseTags?: number
  /** 组件的空值配置 @version 2.7.0 */
  emptyValues?: any[]
  /** 清空选项的值 @version 2.7.0 */
  valueOnClear?: string | number | boolean | (() => any)
  /** 当下拉框未被激活时是否保留下拉框 @version 2.7.8 */
  persistent?: boolean
  /** Tooltip 可用的 positions @version 2.8.1 */
  fallbackPlacements?: string[]
  /** 下拉框出现的位置 @version 2.8.1 */
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'

  /** 当绑定值变化时触发的事件 */
  onChange?: (value: any) => void
  /** 当展开节点发生变化时触发 */
  onExpandChange?: (value: any) => void
  /** 当失去焦点时触发 */
  onBlur?: (event: FocusEvent) => void
  /** 当获得焦点时触发 */
  onFocus?: (event: FocusEvent) => void
  /** 可清空的单选模式下用户点击清空按钮时触发 */
  onClear?: () => void
  /** 下拉框出现/隐藏时触发 */
  onVisibleChange?: (value: boolean) => void
  /** 在多选模式下，移除Tag时触发 */
  onRemoveTag?: (value: any) => void
}

/** 多选框组属性 */
export type CheckboxGroupAttrs = FormElementAttrsPlugin<CheckboxGroupProps> & {
  options: { label: string; value: any }[]
}

/** 多选框属性 */
export type CheckboxAttrs = FormElementAttrsPlugin<CheckboxProps>

/** 输入框 */
export type InputAttrs = FormElementAttrsPlugin<InputProps> & {
  /** 当选择器的输入框失去焦点时触发 */
  onBlur?: (event: FocusEvent) => void
  /** 当选择器的输入框获得焦点时触发 */
  onFocus?: (event: FocusEvent) => void
  /** 在 Input 值改变时触发 */
  onInput?: (value: string | number) => void
  /** 在点击由 clearable 属性生成的清空按钮时触发 */
  onClear?: () => void
}

/** 颜色选择器属性 */
export type ColorPickerAttrs = FormElementAttrsPlugin<ColorPickerProps> & {
  /** 面板中当前显示的颜色发生改变时触发 */
  onActiveChange?: (value: string) => void
  /** 当获得焦点时触发 */
  onFocus?: (event: FocusEvent) => void
  /** 当失去焦点时触发 */
  onBlur?: (event: FocusEvent) => void
}

/** 日期选择器属性 */
export type DatePickerAttrs = FormElementAttrsPlugin<DatePickerProps> & {
  /** 在组件 Input 失去焦点时触发 */
  onBlur?: (event: FocusEvent) => void
  /** 在组件 Input 获得焦点时触发 */
  onFocus?: (event: FocusEvent) => void
  /** 可清空的模式下用户点击清空按钮时触发 @version 2.7.7 */
  onClear?: () => void
  /** 在日历所选日期更改时触发 */
  onCalendarChange?: () => void
  /** 当日期面板改变时触发。 */
  onPanelChange?: () => void
  /** 当 DatePicker 的下拉列表出现/消失时触发 */
  onVisibleChange?: (value: boolean) => void
}

/** 数字输入框属性 */
export type InputNumberAttrs = FormElementAttrsPlugin<InputNumberProps> & {
  /** 在组件 Input 失去焦点时触发 */
  onBlur?: (event: FocusEvent) => void
  /** 在组件 Input 获得焦点时触发 */
  onFocus?: (event: FocusEvent) => void
}

/** 标签输入框属性 */
export type InputTagAttrs = FormElementAttrsPlugin<InputTagProps> & {
  /** 在 Input 值改变时触发 */
  onInput?: (value: string) => void
  /** tag 被添加时触发 */
  onAddTag?: (value: string) => void
  /** tag 被移除时触发 */
  onRemoveTag?: (value: string) => void
  /** 在 Input 获得焦点时触发 */
  onFocus?: (event: FocusEvent) => void
  /** 在 Input 失去焦点时触发 */
  onBlur?: (event: FocusEvent) => void
  /** 点击清除图标时触发 */
  onClear?: () => void
}

/** 提及输入框属性 */
export type MentionAttrs = FormElementAttrsPlugin<MentionProps> & {
  /** 按下触发字段时触发 */
  onSearch?: (pattern: string, prefix: string) => boolean
  /** 当用户选择选项时触发 */
  onSelect?: (option: MentionOption, prefix: string) => boolean
  /** 获得焦点时触发 */
  onFocus?: (evt: FocusEvent) => boolean
  /** 失去焦点时触发 */
  onBlur?: (evt: FocusEvent) => boolean
}

/** 单选框组属性 */
export type RadioGroupAttrs = FormElementAttrsPlugin<RadioGroupProps> & {
  options: { label: string; value: any }[]
}

/** 单选框属性 */
export type RadioAttrs = FormElementAttrsPlugin<RadioProps>

/** 评分属性 */
export type RateAttrs = FormElementAttrsPlugin<RateProps>

/** 选择器属性*/
export type SelectAttrs = FormElementAttrsPlugin<any> & {
  style?: CSSProperties
  class?: string
  /** 选项列表 */
  options: { label: string; value: any }[]
  /** 是否多选 */
  multiple?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 作为 value 唯一标识的键名，绑定值为对象类型时必填 */
  valueKey?: string
  /** 输入框尺寸 */
  size?: 'large' | 'default' | 'small'
  /** 是否可以清空选项 */
  clearable?: boolean
  /** 多选时是否将选中值按文字的形式展示 */
  collapseTags?: boolean
  /** 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 @version 2.3.0 */
  collapseTagsTooltip?: boolean
  /** multiple 为 true 时，用户最多可以选择的项目数，为 0 则不限制 */
  multipleLimit?: number
  /** Select 输入框的原生 name 属性 */
  name?: string
  /** tooltip 主题 */
  effect?: 'dark' | 'light' | string
  /** Select 输入框的原生 autocomplete 属性 */
  autocomplete?: string
  /** 占位符 */
  placeholder?: string
  /** Select 组件是否可筛选 */
  filterable?: boolean
  /** 是否允许用户创建新条目 */
  allowCreate?: boolean
  /** 自定义筛选方法 */
  filterMethod?: (query: string) => void
  /** 其中的选项是否从服务器远程加载 */
  remote?: boolean
  /** 自定义远程搜索方法 */
  remoteMethod?: (query: string) => void
  /** 远程搜索方法显示后缀图标 */
  remoteShowSuffix?: boolean
  /** 是否正在从远程获取数据 */
  loading?: boolean
  /** 从服务器加载数据时显示的文本 */
  loadingText?: string
  /** 搜索条件无匹配时显示的文字 */
  noMatchText?: string
  /** 无选项时显示的文字 */
  noDataText?: string
  /** 选择器下拉菜单的自定义类名 */
  popperClass?: string
  /** 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 */
  reserveKeyword?: boolean
  /** 是否在输入框按下回车时选择第一个匹配项 */
  defaultFirstOption?: boolean
  /** 是否使用 teleport */
  teleported?: boolean
  /** 下拉框挂载到哪个 DOM 元素 */
  appendTo?: string
  /** 当下拉选择器未被激活时是否保留下拉框 */
  persistent?: boolean
  /** 是否在输入框获得焦点后自动弹出选项菜单 */
  automaticDropdown?: boolean
  /** 自定义清除图标 */
  clearIcon?: string | Component
  /** 下拉框的宽度是否与输入框相同 */
  fitInputWidth?: boolean
  /** 自定义后缀图标组件 */
  suffixIcon?: string | Component
  /** 标签类型 */
  tagType?: 'success' | 'info' | 'warning' | 'danger'
  /** 标签效果 @version 2.7.7 */
  tagEffect?: 'dark' | 'light' | 'plain'
  /** 是否触发表单验证 */
  validateEvent?: boolean
  /** 下拉面板偏移量 @version 2.8.8 */
  offset?: number
  /** 下拉菜单的内容是否有箭头 @version 2.8.8 */
  showArrow?: boolean
  /** 下拉框出现的位置 @version 2.2.17 */
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
  /** 可用的弹出位置 @version 2.5.6 */
  fallbackPlacements?: string[]
  /** 需要显示的 Tag 的最大数量 @version 2.3.0 */
  maxCollapseTags?: number
  /** popper.js 参数 */
  popperOptions?: Record<string, any>
  /** 原生 aria-label 属性 */
  'aria-label'?: string
  /** 组件的空值配置 @version 2.7.0 */
  emptyValues?: any[]
  /** 清空选项的值 @version 2.7.0 */
  valueOnClear?: string | number | boolean | (() => any)
  /** input 的 tabindex @version 2.9.0 */
  tabindex?: string | number
  /** 下拉框出现/隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void
  /** 多选模式下移除tag时触发 */
  onRemoveTag?: (value: any) => void
  /** 可清空的单选模式下用户点击清空按钮时触发 */
  onClear?: () => void
  /** 当选择器的输入框失去焦点时触发 */
  onBlur?: (event: FocusEvent) => void
  /** 当选择器的输入框获得焦点时触发 */
  onFocus?: (event: FocusEvent) => void
  /** 下拉滚动时触发 */
  onPopupScroll?: (data: { scrollTop: number; scrollLeft: number }) => void
}

/** 虚拟化选择器属性 */
export type SelectV2Attrs = FormElementAttrsPlugin<InstancePropsType<typeof ElSelectV2>> & {
  /** 当下拉菜单出现/消失时触发器, 当它出现时, 参数将是 true, 否则将是 false */
  onVisibleChange?: (visible: boolean) => void
  /** 当一个标签在多个模式下被移除时触发，参数将被移除标签值 */
  onRemoveTag?: (tagValue: any) => void
  /** 可清空的单选模式下用户点击清空按钮时触发 */
  onClear?: () => void
  /** 当选择器的输入框失去焦点时触发 */
  onBlur?: (event: FocusEvent) => void
  /** 当选择器的输入框获得焦点时触发 */
  onFocus?: (event: FocusEvent) => void
}

/** 滑块属性 */
export type SliderAttrs = FormElementAttrsPlugin<SliderProps> & {
  /** 数据改变时触发（使用鼠标拖曳时，活动过程实时触发） */
  onInput?: (value: number | number[]) => void
}
/** 开关属性 */
export type SwitchAttrs = FormElementAttrsPlugin<SwitchProps>

/** 时间选择器属性 */
export type TimePickerAttrs = FormElementAttrsPlugin<TimePickerDefaultProps> & {
  /** 在组件 Input 失去焦点时触发 */
  onBlur?: (event: FocusEvent) => void
  /** 在组件 Input 获得焦点时触发 */
  onFocus?: (event: FocusEvent) => void
  /** 可清空的模式下用户点击清空按钮时触发 */
  onClear?: () => void
  /** 当 TimePicker 的下拉列表出现/消失时触发 */
  onVisibleChange?: (visible: boolean) => void
}

/** 时间选择属性 */
export type TimeSelectAttrs = FormElementAttrsPlugin<TimeSelectProps> & {
  /** 在组件 Input 失去焦点时触发 */
  onBlur?: (event: FocusEvent) => void
  /** 在组件 Input 获得焦点时触发 */
  onFocus?: (event: FocusEvent) => void
}

/** 穿梭框属性 */
export type TransferAttrs = FormElementAttrsPlugin<TransferProps> & {
  /** 左侧列表元素被用户选中 / 取消选中时触发 */
  onLeftCheckChange?: (value: TransferKey[], movedKeys?: TransferKey[]) => void
  /** 右侧列表元素被用户选中 / 取消选中时触发 */
  onRightCheckChange?: (value: TransferKey[], movedKeys?: TransferKey[]) => void
}

/** 树选择器属性 */
export type TreeSelectAttrs = FormElementAttrsPlugin<InstancePropsType<typeof ElTreeSelect>>

/** 上传属性 */
export type UploadAttrs = FormElementAttrsPlugin<UploadProps>

/** 标题栏属性 */
export type TitleBarAttrs = TitleBarProps & {
  render?: (slotProps: { item: FormItemOption; view: boolean }) => VNode | string
  renderIcon?: (slotProps: { item: FormItemOption; view: boolean }) => VNode | string
  renderToolbar?: (slotProps: { item: FormItemOption; view: boolean }) => VNode | string
}
