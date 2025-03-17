<script setup lang="ts">
import { ref } from 'vue'
import UTable from '@/components/table/table.vue'
import type { TableColumn } from './components/table/type'

const tableData = ref([
  {
    name: '张三',
    age: 18,
    address: '北京',
    status: 'active',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    name: '李四',
    age: 20,
    address: '上海',
    status: 'inactive',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    name: '王五',
    age: 22,
    address: '广州',
    status: 'active',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
])

const tableColumns = ref<TableColumn[]>([
  {
    prop: 'name',
    label: '姓名',
    align: 'left',
    minWidth: 100,
    renderHeader: () => {
      return '姓名1'
    },
  },
  {
    prop: 'age',
    label: '年龄',
    align: 'center',
    minWidth: 100,
  },
  {
    prop: 'address',
    label: '地址',
    align: 'left',
    minWidth: 100,
  },
  {
    prop: 'status',
    label: '状态',
    align: 'center',
    width: 100,
    filters: [
      { text: 'inactive', value: 'inactive' },
      { text: 'active', value: 'active' },
    ],
    filterMethod: (value: any, row: any, column: any) => {
      const property = column['property']
      return row[property] === value
    },
  },
  {
    prop: 'createdAt',
    label: '创建时间',
    align: 'left',
    width: 100,
  },
  {
    prop: 'updatedAt',
    label: '更新时间',
    align: 'left',
    minWidth: 100,
  },
])
const handleClick = (slotProps: any) => {
  console.log(slotProps)
}
</script>

<template>
  <div style="width: 100%; height: 100vh">
    <UTable :data="tableData" :columns="tableColumns">
      <template #age="slotProps">
        <span @click="handleClick(slotProps)">{{ slotProps.row.age }}</span>
      </template>
      <template #header-age="slotProps">
        <span @click="handleClick(slotProps)">年龄</span>
      </template>
    </UTable>

    <!-- <el-table :data="tableData">
      <el-table-column prop="name" label="姓名">
        <template #header="slotProps">
          <span @click="handleClick(slotProps)">姓名</span>
        </template>
        <template #default="slotProps">
          <span @click="handleClick(slotProps)">{{ slotProps.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="createdAt" label="创建时间" />
      <el-table-column prop="updatedAt" label="更新时间" />
    </el-table> -->
  </div>
</template>

<style lang="scss" scoped>
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
.p-4 {
  padding: 16px;
}
.m-4 {
  margin: 16px;
}
</style>
