<script lang="ts" setup>
import { ref, h } from 'vue'
import UForm from '../../../src/components/form'
import type { FormOptions } from '../../../src/components/form'
import { ElTag } from 'element-plus'

const isView = ref(false)
const formOptions = ref<FormOptions>({
  sec1: {
    label: '服务满意度评价',
    element: 'section-header',
    span: '1/1',
  },
  name: {
    label: '您的姓名',
    element: 'input',
    value: '张三',
    attrs: {
      placeholder: '请输入姓名',
      clearable: true,
      maxlength: 10,
    },
    span: '1/2',
    view: false,
  },
  tel: {
    label: '您的联系方式',
    element: 'input',
    value: '18888888888',
    span: '1/2',
    view: false,
  },
  date: {
    label: '接受服务的日期',
    element: 'date-picker',
    value: '2024-01-01',
    attrs: {
      type: 'date',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    span: '1/2',
    view: false,
  },
  type: {
    label: '服务类型',
    element: 'select',
    value: '1',
    attrs: {
      options: [
        { label: '普通陪诊', value: '1' },
        { label: '代取报告 ', value: '2' },
        { label: '其他服务', value: '3' },
      ],
    },
    span: '1/2',
    view: false,
  },
  satisfaction: {
    label: '整体评价',
    element: 'rate',
    value: 3,
    span: '1/2',
    attrs: {
      texts: ['非常不满意', '不满意', '一般', '满意', '非常满意'],
      showText: true,
    },
    view: false,
    formatter: (item) => {
      return h(
        ElTag,
        { type: item.value > 3 ? 'success' : 'danger' },
        () => item.attrs.texts[item.value - 1],
      )
    },
  },
})
const handleSetNameIsView = () => {
  formOptions.value.name.view = !formOptions.value.name.view
}
</script>

<template>
  <div class="form-data">
    <u-form :view="isView" v-model:options="formOptions"></u-form>
    <div class="btn">
      <el-button type="primary" @click="isView = !isView">
        {{ isView ? '编辑模式' : '查看模式' }}
      </el-button>
      <el-button type="primary" @click="handleSetNameIsView">
        {{ formOptions.name.view ? '设置姓名为编辑模式' : '设置姓名为查看模式' }}
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>
