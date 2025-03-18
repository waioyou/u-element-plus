import { onMounted, ref, shallowRef } from 'vue'
import type { Ref } from 'vue'
import type { Operations } from '@/components/operation'
import type { TableColumn, TableInstance } from '@/components/table'

// 定义选项接口
interface UseTableOptions {
  /** 是否在挂载时自动获取数据 */
  auto?: boolean
  /** 是否使用浅层响应式 */
  isShallow?: boolean
}

export const useTable = <T = any>(
  callback?: () => Promise<T[]> | T[],
  options: UseTableOptions = {},
) => {
  const { auto = true, isShallow = true } = options

  const loading = ref(false)
  const tableRef = ref<TableInstance>()
  const tableData = isShallow ? shallowRef<T[]>([]) : ref<T[]>([])
  const tableColumns: Ref<TableColumn<T>[]> = ref([])

  /** 多选数据 */
  const multipleSelection = ref<T[]>([]) as Ref<T[]>
  /** 当表格选择项发生变化时   */
  const handleSelectionChange = (rows: T[]) => {
    multipleSelection.value = rows
  }

  const tableOperations = ref<Operations>([])

  /**
   * 隐藏表格列
   * @param prop prop或prop数组
   */
  const hideTableColumn = (prop: string | string[]) => {
    tableColumns.value.forEach((column) => {
      if (prop.includes(column.prop)) {
        column.if = false
      }
      if (column.children) {
        column.children.forEach((item) => {
          hideTableColumn(item.prop)
        })
      }
    })
  }

  /**
   * 设置表格列
   * @param columns 表格列
   */
  const setTableColumns = (columns: TableColumn<T>[]) => {
    tableColumns.value = columns
  }

  /**
   * 设置表格操作列
   * @param operations 操作列
   */
  const setTableOperations = (operations: Operations) => {
    tableOperations.value = operations
  }

  /**
   * 获取表格数据
   */
  const getTableData = async () => {
    if (callback) {
      try {
        loading.value = true
        const res = await callback()
        tableData.value = res
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    }
  }
  if (auto) {
    onMounted(() => {
      getTableData()
    })
  }

  return {
    loading,
    tableRef,
    tableData,
    tableColumns,
    tableOperations,
    multipleSelection,
    handleSelectionChange,
    hideTableColumn,
    setTableColumns,
    setTableOperations,
    getTableData,
  }
}
