import { computed, ref, watch } from 'vue'
import type { TableColumn, TableColumns, TableEmits, TableProps } from './type'
import { cloneDeep, isEmpty, isNil } from '@/utils'
import type { ElTree } from 'element-plus'
import { useFullscreen } from '@/hooks/useFullscreen'

export const useTableTitle = <T>(props: TableProps<T>, emit: TableEmits<T>) => {
  const treeRef = ref<InstanceType<typeof ElTree>>()
  const _columns = ref<TableColumns<T>>([])
  const isInit = ref(false)
  const backupColumns = ref<TableColumns<T>>([])

  const showToolbar = computed(() => {
    if (Array.isArray(props.toolbar)) {
      return props.toolbar.length > 0
    }
    return props.toolbar
  })
  const showRefresh = computed(() => {
    if (Array.isArray(props.toolbar)) {
      return props.toolbar.includes('refresh')
    }
    return props.toolbar === true
  })
  const showFullscreen = computed(() => {
    if (Array.isArray(props.toolbar)) {
      return props.toolbar.includes('fullscreen')
    }
    return props.toolbar === true
  })
  const showSetting = computed(() => {
    if (Array.isArray(props.toolbar)) {
      return props.toolbar.includes('setting')
    }
    return props.toolbar === true
  })

  // 刷新表格数据
  const handleRefresh = () => {
    emit('refresh')
  }

  // #region 全屏相关功能
  const uTableRef = ref<HTMLDivElement>()
  const { isFullscreen, toggleFullscreen } = useFullscreen(uTableRef)
  // #endregion

  // #region 表格列设置

  // 表格列数量（包括子级）
  const columnCount = computed(() => {
    let count = 0
    const getCount = (columns: TableColumns<T>) => {
      columns.forEach((column) => {
        count++
        if (!isEmpty(column.children)) {
          getCount(column.children!)
        }
      })
    }
    getCount(_columns.value)
    return count
  })

  /** 获取需要选中的列 */
  const getCheckedProps = (result: string[], columns: TableColumns<T>, checked?: boolean) => {
    columns.forEach((column) => {
      if (!isNil(checked)) {
        column.show = checked
      }
      const { rendered = true, show = true } = column
      if (typeof rendered === 'function') {
        if (rendered(column) && show) {
          result.push(column.prop)
        }
      } else {
        if (rendered && show) {
          result.push(column.prop)
        }
      }
      if (column.children) {
        getCheckedProps(result, column.children, checked)
      }
    })
    return result
  }

  // 设置默认选中
  const setCheckedKeys = (checked?: boolean) => {
    const checkedKeys = getCheckedProps([], _columns.value, checked)
    treeRef.value?.setCheckedKeys(checkedKeys)
  }
  // 选中状态改变时，修改表格列显示状态
  const handleCheckChange = (data: TableColumn<T>, checked: boolean, indeterminate: boolean) => {
    if (!isEmpty(data.children) && indeterminate) {
      data.show = true
    } else {
      data.show = checked
    }
    const checkedCount = treeRef.value!.getCheckedNodes().length || 0
    checkedIndeterminate.value = checkedCount < columnCount.value && checkedCount !== 0
    checkedAll.value = checkedCount === columnCount.value
  }

  // 全选
  const checkedAll = ref(true)
  const checkedIndeterminate = ref(false)
  const handleChangeCheckedAll = () => {
    setCheckedKeys(checkedAll.value)
  }

  /**
   * 控制节点是否可以被放置
   * @param draggingNode 被拖拽的节点
   * @param dropNode 目标节点
   * @param type 放置类型：'prev'、'inner'、'next'
   * @returns 是否允许放置
   */
  const allowDrop = (draggingNode: any, dropNode: any, type: string) => {
    // 不允许放置到内部（成为子节点）
    if (type === 'inner') {
      return false
    }

    // 检查是否在同一父级下
    const draggingParent = draggingNode.parent
    const dropParent = dropNode.parent

    // 如果两个节点的父节点不同，则不允许拖拽
    if (draggingParent !== dropParent) {
      return false
    }

    // 允许在同一级别内的前后拖拽
    return true
  }

  const handleResetColumns = () => {
    _columns.value = cloneDeep(backupColumns.value)
  }
  // #endregion

  watch(
    () => props.columns,
    (newVal) => {
      if (!isEmpty(newVal)) {
        backupColumns.value = cloneDeep(newVal)
        isInit.value = true
      }
      _columns.value = newVal
    },
    { immediate: true },
  )

  return {
    _columns,
    showToolbar,
    showRefresh,
    showFullscreen,
    showSetting,
    uTableRef,
    handleRefresh,
    isFullscreen,
    toggleFullscreen,
    treeRef,
    setCheckedKeys,
    checkedAll,
    checkedIndeterminate,
    handleChangeCheckedAll,
    handleResetColumns,
    handleCheckChange,
    allowDrop,
  }
}
