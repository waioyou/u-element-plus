import type { FormItemElement } from '@/types'
import type {
  TableProps as ElTableProps,
  TableColumnCtx as ElTableColumnCtx,
  FormItemRule,
} from 'element-plus'
import type { Component, ComputedRef, Ref, VNode } from 'vue'

export interface TableProps<T = any> extends ElTableProps<T> {
  /** 表格列配置列表 */
  columns: TableColumn<T>[]
  /** 是否可编辑 */
  editable?: boolean
}

type OmitElTableColumnKeys =
  | 'id'
  | 'realWidth'
  | 'rawColumnKey'
  | 'renderHeader'
  | 'renderCell'
  | 'colSpan'
  | 'rowSpan'
  | 'children'
  | 'level'
  | 'filterable'
  | 'order'
  | 'isColumnGroup'
  | 'isSubColumn'
  | 'columns'
  | 'getColumnIndex'
  | 'no'
  | 'filterOpened'
  | 'type'
  | 'prop'
  | 'formatter'

export interface TableColumn<T = any>
  extends Partial<Omit<ElTableColumnCtx<T>, OmitElTableColumnKeys>> {
  prop: string
  /** 对应列的类型。 */
  type?: 'default' | 'selection' | 'index' | 'expand'
  /** 自定义表头 */
  renderHeader?: (data: {
    $index: number
    column: any
    store: any
    item: TableColumn<T>
  }) => VNode | string
  /** 自定义过滤图标 */
  renderFilterIcon?: (data: { filterOpened: boolean }) => VNode | string
  /** 自定义格式化 */
  formatter?: (data: {
    row: T
    column: any
    cellValue: any
    index: number
    item: TableColumn<T>
  }) => VNode | string
  /** 是否渲染 */
  if?: boolean | ComputedRef<boolean> | Ref<boolean>
  /** 多级表头 */
  children?: TableColumn<T>[]
  /** 动态组件 */
  component?: Component
  /** 是否可编辑 */
  editable?: boolean
  /** 表单元素 */
  element?: Exclude<FormItemElement, 'transfer'>
  /** 表单校验规则 */
  rules?: FormItemRule[]
  /** 对应的表单元素属性或者动态组件属性 */
  attrs?: Record<string, any>
}
