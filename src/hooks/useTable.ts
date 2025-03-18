import { onMounted, ref, shallowRef } from 'vue'
import type { Ref } from 'vue'
import type { Operations } from '@/components/operation'
import type {
  TableColumn,
  TableInstance,
  IndexProps,
  SelectionProps,
  ExpandProps,
} from '@/components/table'
import { isNil } from '@/utils'

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
  const { auto = true, isShallow = false } = options

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

  /** 表格操作列按钮列表 */
  const tableOperations = ref<Operations>([])

  /** 表格序号列配置 */
  const indexProps = ref<IndexProps<T>>({
    label: '',
    width: 40,
    align: 'center',
  })

  /** 表格多选列配置 */
  const selectionProps = ref<SelectionProps<T>>({
    width: 40,
    align: 'center',
  })

  /** 表格展开列配置 */
  const expandProps = ref<ExpandProps>({
    width: 40,
    align: 'center',
  })

  /**
   * 切换表格列的渲染状态
   * @param prop prop或prop数组
   * @param rendered 不传则切换隐藏或显示，传则修改为传入的值
   */
  const toggleTableColumnRendered = (prop: string | string[], rendered?: boolean) => {
    tableColumns.value.forEach((column) => {
      if (prop.includes(column.prop)) {
        if (isNil(rendered)) {
          column.rendered = column.rendered === false ? true : false
        } else {
          column.rendered = rendered
        }
      }
      if (column.children) {
        column.children.forEach((item) => {
          toggleTableColumnRendered(item.prop, rendered)
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
    indexProps,
    selectionProps,
    expandProps,
    tableColumns,
    tableOperations,
    multipleSelection,
    handleSelectionChange,
    toggleTableColumnRendered,
    setTableColumns,
    setTableOperations,
    getTableData,
  }
}
