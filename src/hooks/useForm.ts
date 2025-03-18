import { onMounted, ref } from 'vue'
import { set } from '@/utils'

import type { Ref } from 'vue'
import type { FormInstance, FormOptions } from '@/components/form'

export const useForm = <F = any>(callback?: () => Promise<F> | F, auto = true) => {
  const loading = ref(false)
  const formRef = ref<FormInstance>()
  const formData = ref<F>({} as F) as Ref<F>
  const formOptions = ref<FormOptions>([]) as Ref<FormOptions>

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
  const updateFormItemOption = (prop: string, path: string | string[], value: any) => {
    const formItem = formOptions.value.find((item) => item.prop === prop)
    if (formItem) {
      set(formItem, path, value)
    }
  }

  /**
   * 设置表单配置
   * @param options 表单配置
   */
  const setFormOptions = (options: FormOptions) => {
    formOptions.value = options
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
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    }
  }

  onMounted(() => {
    if (auto) {
      getFormData()
    }
  })

  return {
    loading,
    formRef,
    formData,
    formOptions,
    setFormOptions,
    updateFormItemOption,
    getFormData,
  }
}
