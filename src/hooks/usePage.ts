import { onMounted, ref } from 'vue'
import { useForm } from './useForm'
import { useTable } from './useTable'

interface UsePageOptions<F> {
  auto?: boolean
  isShallow?: boolean
  defaultFormData?: F
  defaultPageSize?: number
}

type SearchParams<F> = F & { pageNum: number; pageSize: number }

type ResponseData<T> = {
  rows: T[]
  total: number
}

export const usePage = <F = Record<string, any>, T = Record<string, any>>(
  callback: (params: SearchParams<F>) => Promise<ResponseData<T> | ResponseData<T>>,
  options: UsePageOptions<F> = {},
) => {
  const { auto = true, isShallow = true, defaultFormData = {} as F, defaultPageSize = 10 } = options

  const loading = ref(false)

  const pagerParams = ref({
    pageNum: 1,
    pageSize: defaultPageSize,
    total: 0,
  })
  // 查询表单相关
  const { formRef, formData, formOptions, setFormOptions, updateFormItemOption, getFormData } =
    useForm<F>(() => defaultFormData, false)
  getFormData()

  // 表格相关
  const {
    tableRef,
    tableData,
    tableColumns,
    tableOperations,
    multipleSelection,
    handleSelectionChange,
    toggleTableColumnRendered,
    setTableColumns,
    setTableOperations,
  } = useTable<T>(() => [], {
    auto: false,
    isShallow,
  })

  /**
   * 获取数据
   */
  const fetchData = async () => {
    loading.value = true
    const params = {
      ...formData.value,
      pageNum: pagerParams.value.pageNum,
      pageSize: pagerParams.value.pageSize,
    }
    const res = await callback(params)
    tableData.value = res.rows
    pagerParams.value.total = res.total
  }

  /**
   * 查询
   * @param params 查询表单参数, 会与formData合并，优先于formData
   */
  const query = async (params?: F) => {
    pagerParams.value.pageNum = 1
    formData.value = { ...formData.value, ...params }
    await fetchData()
  }

  /**
   * 重置
   * @param params 查询表单参数 会与默认表单参数合并，优先于默认表单参数
   */
  const reset = async (params?: F) => {
    pagerParams.value.pageNum = 1
    formData.value = { ...defaultFormData, ...params }
    await fetchData()
  }

  onMounted(() => {
    if (auto) {
      fetchData()
    }
  })

  return {
    loading,

    formRef,
    formData,
    formOptions,
    setFormOptions,
    updateFormItemOption,

    tableRef,
    tableData,
    tableColumns,
    tableOperations,
    multipleSelection,
    handleSelectionChange,
    toggleTableColumnRendered,
    setTableColumns,
    setTableOperations,

    pagerParams,
    fetchData,
    query,
    reset,
  }
}
