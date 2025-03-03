<script lang="ts" setup>
import { ref, h } from 'vue'
import UForm from '../../../src/components/form'
import type { FormOptions } from '../../../src/components/form'
import { ElTag } from 'element-plus'

const isView = ref(false)
const nameIsView = ref(false)

const formData = ref({
  name: '张三',
  tel: '18888888888',
  date: '2024-01-01',
  type: '1',
  satisfaction: 3,
})

const formOptions = ref<FormOptions>([
  {
    prop: 'sec1',
    label: '服务满意度评价',
    element: 'section-header',
    span: '1/1',
  },
  {
    prop: 'name',
    label: '您的姓名',
    element: 'input',
    attrs: {
      placeholder: '请输入姓名',
      clearable: true,
      maxlength: 10,
    },
    span: '1/2',
    view: nameIsView,
  },
  {
    prop: 'tel',
    label: '您的联系方式',
    element: 'input',
    span: '1/2',
    view: false,
  },
  {
    prop: 'date',
    label: '接受服务的日期',
    element: 'date-picker',
    attrs: {
      type: 'date',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    span: '1/2',
    view: false,
  },
  {
    prop: 'type',
    label: '服务类型',
    element: 'select',
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
  {
    prop: 'satisfaction',
    label: '整体评价',
    element: 'rate',
    span: '1/2',
    attrs: {
      texts: ['非常不满意', '不满意', '一般', '满意', '非常满意'],
      showText: true,
    },
    view: false,
    formatter: (item) => {
      return h(
        ElTag,
        { type: formData.value.satisfaction > 3 ? 'success' : 'danger' },
        () => item.attrs!.texts[formData.value.satisfaction - 1],
      )
    },
  },
])
</script>

<template>
  <div class="form-data">
    <u-form v-model="formData" :options="formOptions" :view="isView"></u-form>
    <div class="btn">
      <el-button type="primary" @click="isView = !isView">
        {{ isView ? '编辑模式' : '查看模式' }}
      </el-button>
      <el-button type="primary" @click="nameIsView = !nameIsView">
        {{ nameIsView ? '设置姓名为编辑模式' : '设置姓名为查看模式' }}
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
