<script lang="ts" setup>
import { onMounted } from 'vue'
import { useForm } from 'u-element-plus'
import { dicts, getUserDetail } from '../../mock/user'

const { formData, formColumns, createFormColumnWithElement, setFormColumns } = useForm(async () => {
  const res = await getUserDetail(0)
  return res.data
})

onMounted(() => {
  setFormColumns([
    createFormColumnWithElement('title-bar', {
      prop: 'sec1',
      label: '基本信息',
      span: '1/1',
    }),
    createFormColumnWithElement('input', {
      prop: 'name',
      label: '姓名',
      span: '1/2',
      attrs: {
        placeholder: '请输入姓名',
        clearable: true,
      },
    }),
    createFormColumnWithElement('radio-group', {
      prop: 'gender',
      label: '性别',
      span: '1/2',
      attrs: {
        options: dicts.gender,
        clearable: true,
      },
    }),
    createFormColumnWithElement('date-picker', {
      prop: 'birthday',
      label: '生日',
      span: '1/2',
      attrs: {
        type: 'date',
        placeholder: '请选择生日',
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
        clearable: true,
      },
    }),
    createFormColumnWithElement('input', {
      prop: 'phone',
      label: '电话',
      span: '1/2',
      attrs: {
        type: 'number',
        placeholder: '请输入电话',
        clearable: true,
      },
    }),
    createFormColumnWithElement('select', {
      prop: 'degree',
      label: '学历',
      span: '1/2',
      attrs: {
        placeholder: '请选择学历',
        options: dicts.degree,
        clearable: true,
      },
    }),
    createFormColumnWithElement('autocomplete', {
      prop: 'schoolText',
      label: '毕业学校',
      span: '1/2',
      attrs: {
        placeholder: '请选择毕业学校',
        clearable: true,
        fetchSuggestions(queryString, cb) {
          cb(dicts.school.filter((item) => item.label.includes(queryString)))
        },
      },
    }),
    createFormColumnWithElement('input', {
      prop: 'remark',
      label: '地址',
      span: '1/1',
      attrs: {
        placeholder: '请选择地址',
        type: 'textarea',
        rows: 3,
        maxlength: 200,
        showWordLimit: true,
        clearable: true,
      },
    }),
  ])
})
</script>

<template>
  <u-form v-model="formData" :columns="formColumns" :gutter="40"></u-form>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>
