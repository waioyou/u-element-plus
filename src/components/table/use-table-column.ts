import { omit } from '@/utils'
import { computed } from 'vue'
import type { TableColumn, TableColumnProps } from './type'

export const useTableColumn = (props: TableColumnProps) => {
  const getElTableColumnAttrs = computed<any>(() => {
    return omit(props.item, [
      'children',
      'formatter',
      'render',
      'component',
      'rendered',
      'element',
      'rules',
      'attrs',
      'renderHeader',
    ])
  })

  const getFormItemRules = (item: TableColumn) => {
    if (item.required) {
      return [{ required: true, message: '请输入' }]
    }
    if (!item.rules) return []

    return item.rules.map((rule) => ({
      message: '请输入',
      ...rule,
    }))
  }
  return {
    getElTableColumnAttrs,
    getFormItemRules,
  }
}
