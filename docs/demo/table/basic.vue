<script setup lang="ts">
import { ref } from 'vue'
import type { TableColumns } from 'u-element-plus'

interface TableDataItem {
  date: string
  name: string
  age: number
  gender: string
  department: string
  position: string
  status: '在职' | '离职' | '请假'
  salary: number
  performance: 'A' | 'B' | 'C'
  attendance: number
  projects: number
  score: number
  address: string
  email: string
  phone: string
}

const tableData = ref<TableDataItem[]>([
  {
    date: '2024-03-05',
    name: '张三',
    age: 25,
    gender: '男',
    department: '研发部',
    position: '前端工程师',
    status: '在职',
    salary: 15000,
    performance: 'A',
    attendance: 22,
    projects: 3,
    score: 98,
    address: '浙江省杭州市西湖区',
    email: 'zhangsan@example.com',
    phone: '13800138000',
  },
  {
    date: '2024-03-06',
    name: '李四',
    age: 28,
    gender: '女',
    department: '产品部',
    position: '产品经理',
    status: '在职',
    salary: 18000,
    performance: 'B',
    attendance: 21,
    projects: 2,
    score: 85,
    address: '浙江省杭州市滨江区',
    email: 'lisi@example.com',
    phone: '13800138001',
  },
  {
    date: '2024-03-07',
    name: '王五',
    age: 32,
    gender: '男',
    department: '设计部',
    position: 'UI设计师',
    status: '离职',
    salary: 16000,
    performance: 'B',
    attendance: 18,
    projects: 4,
    score: 75,
    address: '浙江省杭州市上城区',
    email: 'wangwu@example.com',
    phone: '13800138002',
  },
  {
    date: '2024-03-08',
    name: '赵六',
    age: 22,
    gender: '女',
    department: '测试部',
    position: '测试工程师',
    status: '请假',
    salary: 12000,
    performance: 'C',
    attendance: 20,
    projects: 2,
    score: 59,
    address: '浙江省杭州市拱墅区',
    email: 'zhaoliu@example.com',
    phone: '13800138003',
  },
])

const columns = ref<TableColumns>([
  {
    prop: 'date',
    label: '入职日期',
    width: 120,
    sortable: true,
  },
  {
    prop: 'name',
    label: '姓名',
    width: 80,
    align: 'left',
  },
  {
    prop: 'age',
    label: '年龄',
    width: 80,
    align: 'center',
    sortable: true,
  },
  {
    prop: 'gender',
    label: '性别',
    width: 60,
    align: 'center',
  },
  {
    prop: 'department',
    label: '部门',
    width: 100,
    align: 'center',
  },
  {
    prop: 'position',
    label: '职位',
    width: 120,
    align: 'left',
  },
  {
    prop: 'status',
    label: '状态',
    width: 80,
    align: 'center',
  },
  {
    prop: 'salary',
    label: '薪资',
    width: 80,
    align: 'left',
    sortable: true,
  },
  {
    prop: 'performance',
    label: '绩效',
    width: 80,
    align: 'center',
    sortable: true,
  },
  {
    prop: 'attendance',
    label: '出勤天数',
    width: 80,
    align: 'center',
  },
  {
    prop: 'projects',
    label: '项目数',
    width: 70,
    align: 'center',
  },
  {
    prop: 'score',
    label: '评分',
    width: 80,
    align: 'center',
    sortable: true,
  },
  {
    prop: 'address',
    label: '地址',
    minWidth: 140,
    showOverflowTooltip: true,
  },
])
</script>

<template>
  <u-table class="vp-raw" :data="tableData" :columns="columns" stripe></u-table>
</template>
