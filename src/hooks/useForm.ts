import { markRaw, onMounted, ref } from 'vue'
import { set, cloneDeep } from '@/utils'

import type { Component, Ref } from 'vue'
import type {
  FormInstance,
  FormColumns,
  FormColumnElementAttrsMap,
  FormColumn,
} from '@/components/form'

export const useForm = <F = any>(callback?: () => Promise<F> | F, auto = true) => {
  const loading = ref(false)
  const formRef = ref<FormInstance>()
  const formData = ref<F>({} as F) as Ref<F>
  const formColumns = ref<FormColumns>([]) as Ref<FormColumns>
  const _formData = ref<F>({} as F) as Ref<F>

  /**
   * 更新表单项配置
   * @param prop 表单项的prop
   * @param path 对象路径
   * @param value 表单项的值
   * @example
   * updateFormItem('name', 'label', '姓名')
   * updateFormItem('name', 'attrs.placeholder', '请输入姓名')
   * updateFormItem('name', 'rules.0.required', true)
   */
  const updateFormColumn = (prop: string, path: string | string[], value: any) => {
    const formItem = formColumns.value.find((item) => item.prop === prop)
    if (formItem) {
      set(formItem, path, value)
    }
  }

  /**
   * 设置表单配置
   * @param options 表单配置
   */
  const setFormColumns = (columns: FormColumns) => {
    formColumns.value = columns
  }

  /**
   * 获取表单数据
   */
  const getFormData = async () => {
    if (callback) {
      loading.value = true
      try {
        const res = await callback()
        formData.value = res
        _formData.value = cloneDeep(res)
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    }
  }

  const resetFormData = () => {
    formData.value = cloneDeep(_formData.value)
  }

  /**
   * 创建表单配置项 通过element创建表单配置项
   * @param element 表单元素
   * @param column 表单配置项
   * @returns 表单配置
   * @example
   * createFormColumnWithElement('input', {
   *   prop: 'name',
   *   label: '姓名',
   *   attrs: {
   *     placeholder: '请输入姓名',
   *   },
   * })
   */
  const createFormColumnWithElement = <E extends keyof FormColumnElementAttrsMap>(
    element: E,
    column: Omit<FormColumn, 'attrs' | 'prop' | 'element'> & {
      prop: keyof F | (string & {})
      attrs?: FormColumnElementAttrsMap[E]
    },
  ) => ({
    ...column,
    element,
  })

  /**
   * 创建表单配置项 通过组件创建表单配置项
   * @param component 组件
   * @param column 表单配置项
   * @returns 表单配置项
   * @example
   * createFormColumnWithComponent<TitleBarProps>(UTitleBar, {
   *   prop: 'education',
   *   label: '教育经历',
   *   attrs: {
   *     iconClass: 'iconfont icon-education',
   *   },
   * })
   */
  const createFormColumnWithComponent = <C = Record<string, any>>(
    component: Component,
    column: Omit<FormColumn, 'element' | 'component'> & {
      attrs?: C
    },
  ) => ({
    ...column,
    component: typeof component === 'string' ? component : markRaw(component),
  })

  onMounted(() => {
    if (auto) {
      getFormData()
    }
  })

  return {
    loading,
    formRef,
    formData,
    formColumns,
    createFormColumnWithElement,
    createFormColumnWithComponent,
    setFormColumns,
    updateFormColumn,
    getFormData,
    resetFormData,
  }
}
