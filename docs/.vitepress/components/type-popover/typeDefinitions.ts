export const typeDefinitions: Record<string, string> = {
  TableColumnElement: `'autocomplete' | 'cascader' | 'checkbox-group' | 'checkbox'
  | 'color-picker' | 'date-picker' | 'input' | 'input-number'
  | 'input-tag' | 'mention' | 'radio-group' | 'radio' | 'rate'
  | 'select' | 'select-v2' | 'slider' | 'switch' | 'time-picker'
  | 'time-select' | 'tree-select' | 'upload'`,
  TableColumnFormatter: `(slotProps: {
    $index: number
    cellIndex: number
    column: TableColumnCtx<T>
    expanded: boolean
  },item:TableColumn<T>) => VNode | string`,
  TableColumnRenderHeader: `(slotProps: {
    $index: number
    column: TableColumnCtx<T>
    store: any
    item: TableColumn<T>
  }) => VNode | string`,
  TableColumnRenderFilterIcon: `(slotProps: {
    $index: number
    column: TableColumnCtx<T>
    store: any
    item: TableColumn<T>
  }) => VNode | string`,
  SelectionProps: `{
    width?: string | number
    align?: 'left' | 'center' | 'right'
    selectable?: (row: T, index: number) => boolean
    reserveSelection?: boolean
  }`,
  IndexProps: `{
    label?: string
    width?: string | number
    align?: 'left' | 'center' | 'right'
    index?: number | ((index: number) => number)
    formatter?: (slotProps: {
      $index: number
      cellIndex: number
      column: TableColumnCtx<T>
      expanded: boolean
      row: T
      store: any
    }) => VNode | string
    renderHeader?: (slotProps: {
      $index: number
      column: TableColumnCtx<T>
      store: any
    }) => VNode | string
    sortable?: boolean | 'custom'
    sortMethod?: ('ascending' | 'descending' | null)[]
    sortOrders?: <T = any>(a: T, b: T) => number
  }`,
  ExpandProps: `{
    label?: string
    width?: string|number
    align?: 'left'|'center'|'right'
  }`,
  TableDefaultSlotProps: `{
    row: T
    column: TableColumnCtx<T>
    $index: number
    item: TableColumn<T>
  }`,
  FormItemElement: `'autocomplete' | 'cascader' | 'checkbox-group' | 'checkbox'
  | 'color-picker' | 'date-picker' | 'input' | 'input-number'
  | 'input-tag' | 'mention' | 'radio-group' | 'radio' | 'rate'
  | 'select' | 'select-v2' | 'slider' | 'switch' | 'time-picker'
  | 'time-select' | 'transfer' | 'tree-select' | 'upload' | 'title-bar'`,
}
