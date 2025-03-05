<script setup lang="ts">
import { ref } from 'vue'
import { TableColumn } from 'u-element-plus'

type TableDataItem = {
  name: string
  gender: string
  age: number
  birthday: string
  country: string
  city: string
}
const tableData = ref<TableDataItem[]>([
  { name: '张三', gender: '男', age: 20, birthday: '2000-01-01', country: '中国', city: '北京市' },
  { name: '李四', gender: '女', age: 22, birthday: '1998-05-15', country: '中国', city: '上海市' },
  { name: '王五', gender: '男', age: 24, birthday: '1996-07-23', country: '中国', city: '广州市' },
  { name: '赵六', gender: '女', age: 26, birthday: '1994-11-30', country: '中国', city: '深圳市' },
  { name: '孙七', gender: '男', age: 28, birthday: '1992-03-17', country: '中国', city: '杭州市' },
])

const tableColumns = ref<TableColumn<TableDataItem>[]>([
  { prop: 'name', label: '姓名', minWidth: 120, align: 'center' },
  {
    prop: 'info',
    label: '个人信息',
    align: 'center',
    children: [
      { prop: 'gender', label: '性别', width: 80, align: 'center' },
      { prop: 'age', label: '年龄', minWidth: 80, align: 'center', sortable: true },
      { prop: 'birthday', label: '生日', minWidth: 120, align: 'center' },
      {
        prop: 'addressInfo',
        label: '地址信息',
        align: 'center',
        children: [
          { prop: 'country', label: '国家', minWidth: 120, align: 'center' },
          { prop: 'city', label: '城市', minWidth: 120, align: 'center' },
        ],
      },
    ],
  },
])
</script>

<template>
  <u-table class="vp-raw" :data="tableData" :columns="tableColumns">
    <template #name="slotProps">
      <el-text type="primary"> {{ slotProps.row.name }}</el-text>
    </template>
    <template #age="slotProps">
      <el-text type="primary"> {{ slotProps.row.age }}</el-text>
    </template>
  </u-table>
</template>

<style lang="scss" scoped></style>
