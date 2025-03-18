import type { FormItemElement } from '@/types'
import type {
  TableProps as ElTableProps,
  FormItemRule,
  ElTable,
  ElForm,
  TableColumnCtx,
} from 'element-plus'
import type { Component, ComputedRef, Ref, VNode } from 'vue'

export interface TableProps<T = any> extends ElTableProps<T> {
  /** 表格列配置列表 */
  columns: TableColumns<T>
  /** 是否可编辑 */
  editable?: boolean
  /** 是否多选 */
  showSelection?: boolean
  /** 选择列的属性 */
  selectionProps?: SelectionProps<T>
  /** 是否显示序号 */
  showIndex?: boolean
  /** 序号列的属性 */
  indexProps?: IndexProps
  /** 是否显示展开 */
  showExpand?: boolean
  /** 展开列的属性 */
  expandProps?: ExpandProps
}

export interface TableEmits<T = any> {
  (e: 'click-operation', name: string, row: T, index: number): void
}

type ElFormInstance = InstanceType<typeof ElForm>

export type TableInstance = InstanceType<typeof ElTable> & {
  validate: ElFormInstance['validate']
  validateField: ElFormInstance['validateField']
  scrollToField: ElFormInstance['scrollToField']
  resetFields: ElFormInstance['resetFields']
  clearValidate: ElFormInstance['clearValidate']
  fields: ElFormInstance['fields']
}

export type TableColumns<T = any> = TableColumn<T>[]

export interface TableColumn<T = any> {
  // 扩展属性
  /** 是否渲染 对应v-if */
  rendered?: boolean | ComputedRef<boolean> | Ref<boolean>
  /** 多级表头 */
  children?: TableColumn<T>[]
  /** 动态组件 */
  component?: 'operation' | Component
  /** 表单元素 */
  element?: Exclude<FormItemElement, 'transfer'>
  /** 表单校验规则 */
  rules?: FormItemRule[]
  /** 是否必填 */
  required?: boolean
  /** 对应的表单元素属性或者动态组件属性 */
  attrs?: Record<string, any>
  /** 自定义过滤图标 */
  renderFilterIcon?: (slotProps: TableColumnFilterIconProps<T>) => VNode | string

  // 与element-plus的行为不一致的属性
  /** 自定义格式化 */
  formatter?: (slotProps: TableColumnDefaultProps<T>) => VNode | string
  /** 自定义表头 */
  renderHeader?: (slotProps: TableColumnHeaderProps<T>) => VNode | string

  /** 显示的标题 */
  label?: string
  /** column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件 */
  columnKey?: string
  /** 字段名称，也可以使用其别名：property */
  prop: string
  /** 对应列的宽度 */
  width?: string | number
  /** 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 */
  minWidth?: string | number
  /** 列是否固定在左侧或者右侧。true 表示固定在左侧 */
  fixed?: 'left' | 'right' | boolean

  /** 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 */
  sortable?: boolean | 'custom'
  /** 指定数据按照哪个属性进行排序，仅当 sortable 为 true 且没有设置 sort-method 的时候有效。如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推 */
  sortBy?: string | string[] | ((row: T, index: number) => string)
  /** 数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序 */
  sortOrders?: ('ascending' | 'descending' | null)[]
  /** 对数据进行排序的时候使用的方法，仅当 sortable 为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致 */
  sortMethod?: <T = any>(a: T, b: T) => number
  /** 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真） */
  resizable?: boolean
  /** 当内容过长被隐藏时显示 tooltip */
  showOverflowTooltip?: boolean | Record<string, any>
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'
  /** 表头对齐方式，若不设置该项，则使用表格的对齐方式 */
  headerAlign?: 'left' | 'center' | 'right'
  /** 列的 className */
  className?: string
  /** 当前列标题的自定义类名 */
  labelClassName?: string
  /** 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。 */
  filters?: Array<{ text: string; value: string }>
  /** 过滤弹出框的定位 */
  filterPlacement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
  /** 过滤弹出框的 className */
  filterClassName?: string
  /** 数据过滤的选项是否多选 */
  filterMultiple?: boolean
  /** 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。 */
  filterMethod?: (value: any, row: T, column: any) => boolean
  /** 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。 */
  filteredValue?: string[]
}

export interface TableColumnProps {
  item: TableColumn
  editable: boolean
}

export interface TableColumnDefaultProps<T = any> {
  $index: number
  cellIndex: number
  column: TableColumnCtx<T>
  expanded: boolean
  row: T
  store: any
  item: TableColumn<T>
}

export interface TableColumnHeaderProps<T = any> {
  $index: number
  column: TableColumnCtx<T>
  item: TableColumn<T>
  store: any
}

export interface TableColumnFilterIconProps<T = any> {
  filterOpened: boolean
  item: TableColumn<T>
}

export interface IndexProps<T = any> {
  label?: string
  width?: string | number
  minWidth?: string | number
  align?: 'left' | 'center' | 'right'
  /** 如果设置了 type=index，可以通过传递 index 属性来自定义索引 */
  index?: number | ((index: number) => number)
  /** 自定义格式化 */
  formatter?: (slotProps: Omit<TableColumnDefaultProps<T>, 'item'>) => VNode | string
  /** 自定义表头 */
  renderHeader?: (slotProps: {
    $index: number
    column: TableColumnCtx<T>
    store: any
  }) => VNode | string
  sortable?: TableColumn['sortable']
  sortMethod?: TableColumn['sortMethod']
  sortOrders?: TableColumn['sortOrders']
}

export interface SelectionProps<T = any> {
  width?: string | number
  minWidth?: string | number
  align?: 'left' | 'center' | 'right'
  /** 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 */
  selectable?: (row: T, index: number) => boolean
  /** 仅对 type=selection 的列有效，请注意，需指定 row-key 来让这个功能生效。 */
  reserveSelection?: boolean
}

export interface ExpandProps {
  width?: string | number
  minWidth?: string | number
  align?: 'left' | 'center' | 'right'
}
