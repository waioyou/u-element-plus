<script setup lang="tsx">
import { onMounted } from 'vue'
import { useForm } from 'u-element-plus'
import type { FormColumnElementAttrsMap } from 'u-element-plus'
import { dicts, getUserDetail, updateUser } from '../../mock/user'
import { ElButton, ElCascader, ElMessage } from 'element-plus'
import { User } from '@docs/mock/types'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
interface UserWithArea extends User {
  area?: string[]
}
const {
  loading,
  formRef,
  formData,
  formColumns,
  createFormColumnWithElement,
  createFormColumnWithComponent,
  setFormColumns,
  getFormData,
  resetFormData,
} = useForm<UserWithArea>(async () => {
  await sleep(500)
  const res = await getUserDetail(20)
  const result: UserWithArea = { ...res.data }
  result.area = [result.province, result.city, result.district]
  return result
})

// 模拟专业选项列表是接口异步获取的
const getMajorOptions = async () => {
  await sleep(200)
  formColumns.value.major.attrs!.options = dicts.major
}

// 区域级联数据
const getAreaOptions = async () => {
  await sleep(200)
  formColumns.value.area.attrs!.options = dicts.area
}

const handleSave = async () => {
  await formRef.value!.validate().catch((err) => {
    ElMessage.error('请检查表单内容')
    console.error(err)
  })
  const res = await updateUser(formData.value)
  if (res.code === 200) {
    await getFormData()
    ElMessage.success('更新成功')
  } else {
    ElMessage.error('更新失败')
  }
}

const handleReset = () => {
  // 为什么不使用 formRef.value.resetFields()
  // 为了保证formData是对象，所以会赋初始值{};因此需要使用resetFormData
  resetFormData()
  formRef.value?.clearValidate()
}

onMounted(() => {
  setFormColumns({
    sec1: createFormColumnWithElement('title-bar', {
      label: '基本信息',
    }),
    name: createFormColumnWithElement('input', {
      label: '姓名',
      span: '1/2',
      rules: [{ required: true, message: '请输入姓名' }],
      attrs: {
        placeholder: '请输入姓名',
      },
    }),
    email: createFormColumnWithElement('input', {
      label: '邮箱',
      span: '1/2',
      rules: [{ required: true, message: '请输入邮箱' }],
      attrs: {
        placeholder: '请输入邮箱',
      },
    }),
    age: createFormColumnWithElement('input-number', {
      label: '年龄',
      span: '1/2',
      rules: [{ required: true, message: '请输入年龄' }],
      attrs: {
        placeholder: '请输入年龄',
        min: 0,
        max: 120,
      },
    }),
    degree: createFormColumnWithElement('radio-group', {
      label: '学历',
      span: '1/2',
      rules: [{ required: true, message: '请输入学历' }],
      attrs: {
        options: dicts.degree,
      },
    }),
    major: createFormColumnWithElement('select', {
      label: '专业',
      span: '1/2',
      attrs: {
        placeholder: '请输入专业',
        options: [],
      },
      rules: [{ required: true, message: '请输入专业' }],
    }),
    graduationYear: createFormColumnWithElement('date-picker', {
      label: '毕业年份',
      span: '1/2',
      attrs: {
        type: 'year',
        format: 'YYYY',
        valueFormat: 'YYYY',
        placeholder: '请输入毕业年份',
      },
    }),
    status: createFormColumnWithElement('switch', {
      label: '状态',
      span: '1/2',
      attrs: {
        placeholder: '请输入状态',
        activeValue: '1',
        inactiveValue: '0',
        activeText: '启用',
        inactiveText: '禁用',
      },
      rules: [{ required: true, message: '请输入状态' }],
    }),
    score: createFormColumnWithElement('rate', {
      label: '评分',
      span: '1/2',
      attrs: {
        placeholder: '请输入评分',
        showText: true,
        texts: dicts.score.map((item) => item.label),
      },
    }),
    // 假设el-cascader是自己封装的组件
    area: createFormColumnWithComponent<FormColumnElementAttrsMap['cascader']>(ElCascader, {
      label: '区域',
      span: '1/2',
      rules: [{ required: true, message: '请选择区域' }],
      attrs: {
        clearable: true,
        options: [],
      },
    }),
    remark: createFormColumnWithElement('input', {
      label: '备注',
      span: '1/1',
      attrs: {
        placeholder: '请输入备注',
        type: 'textarea',
        rows: 4,
        maxlength: 200,
        showPassword: true,
      },
    }),
  })
  getMajorOptions()
  getAreaOptions()
})
</script>

<template>
  <div v-loading="loading">
    <u-form ref="formRef" v-model="formData" :columns="formColumns"> </u-form>
    <div class="flex justify-center">
      <el-button type="primary" @click="handleSave()">保存</el-button>
      <el-button @click="handleReset">重置</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
