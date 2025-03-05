<script setup lang="tsx">
import { h, ref } from 'vue'
import { ElText } from 'element-plus'

const tableData = ref([
  {
    date: '2024-03-05',
    name: '张三',
    address: '浙江省杭州市',
  },
  {
    date: '2024-03-05',
    name: '李四',
    address: '浙江省杭州市',
  },
  {
    date: '2024-03-05',
    name: '王五',
    address: '浙江省杭州市',
  },
  {
    date: '2024-03-05',
    name: '赵六',
    address: '浙江省杭州市',
  },
])

const columns = ref([
  {
    prop: 'date',
    label: '日期',
    width: 180,
  },
  {
    prop: 'name',
    label: '姓名',
    width: 180,
  },
  {
    prop: 'address',
    label: '地址',
  },
])

const indexProps = {
  width: 60,
  label: '序号',
  align: 'center',
  formatter: (data: { $index: number }) => {
    const index = data.$index + 1
    if (index === 1) {
      return h(ElText, { type: 'danger' }, () => index)
    } else if (index === 2) {
      return h(ElText, { type: 'warning' }, () => index)
    } else if (index === 3) {
      return h(ElText, { type: 'success' }, () => index)
    } else {
      return h(ElText, {}, () => index)
    }
  },
  renderHeader: (data: { $index: number }) => {
    return h(ElText, { type: 'primary' }, () => '序号')
  },
}
</script>

<template>
  <u-table class="vp-raw" :data="tableData" :columns="columns" show-index :index-props="indexProps">
  </u-table>
</template>
