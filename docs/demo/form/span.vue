<script lang="ts" setup>
import { onMounted } from 'vue'
import { useForm } from 'u-element-plus'
import { dicts, getUserDetail } from '../../mock/user'

const { formData, formColumns, createFormColumnWithElement, setFormColumns } = useForm(async () => {
  const res = await getUserDetail(0)
  return res.data
})

onMounted(() => {
  setFormColumns({
    sec1: createFormColumnWithElement('title-bar', {
      label: '基本信息',
      span: '1/1',
    }),
    name: createFormColumnWithElement('input', {
      label: '姓名',
      span: '1/2',
      attrs: {
        placeholder: '请输入姓名',
        clearable: true,
      },
    }),
    gender: createFormColumnWithElement('radio-group', {
      label: '性别',
      span: '1/2',
      attrs: {
        options: dicts.gender,
        clearable: true,
      },
    }),
    birthday: createFormColumnWithElement('date-picker', {
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
    phone: createFormColumnWithElement('input', {
      label: '电话',
      span: '1/2',
      attrs: {
        type: 'number',
        placeholder: '请输入电话',
        clearable: true,
      },
    }),
    degree: createFormColumnWithElement('select', {
      label: '学历',
      span: '1/2',
      attrs: {
        placeholder: '请选择学历',
        options: dicts.degree,
        clearable: true,
      },
    }),
    schoolText: createFormColumnWithElement('autocomplete', {
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
    remark: createFormColumnWithElement('input', {
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
  })
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
