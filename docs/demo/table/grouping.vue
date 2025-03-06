<script setup lang="ts">
import {  ref } from 'vue'
import { ElTag } from 'element-plus'
import type { TableColumn } from 'u-element-plus'

interface TableDataItem {
  id: string
  name: string
  gender: 1 | 2
  age: number
  birthday: string
  education: {
    degree: string
    school: string
    major: string
    graduationYear: number
  }
  work: {
    company: string
    department: string
    position: string
    salary: number
    performance: 'A' | 'B' | 'C'
    status: 1|2
  }
  contact: {
    phone: string
    email: string
    address: {
      province: string
      city: string
      district: string
    }
  }
}


const tableData = ref<TableDataItem[]>([
  {
    id: 'EP001',
    name: '张三',
    gender: 1,
    age: 28,
    birthday: '1996-01-15',
    education: {
      degree: '本科',
      school: '浙江大学',
      major: '计算机科学',
      graduationYear: 2018,
    },
    work: {
      company: '阿里巴巴',
      department: '研发部',
      position: '高级前端工程师',
      salary: 25000,
      performance: 'A',
      status: 1,
    },
    contact: {
      phone: '13800138000',
      email: 'zhangsan@example.com',
      address: {
        province: '浙江省',
        city: '杭州市',
        district: '西湖区',
      },
    },
  },
  {
    id: 'EP002',
    name: '李四',
    gender: 2,
    age: 32,
    birthday: '1992-03-20',
    education: {
      degree: '硕士',
      school: '复旦大学',
      major: '软件工程',
      graduationYear: 2016,
    },
    work: {
      company: '腾讯',
      department: '产品部',
      position: '产品经理',
      salary: 30000,
      performance: 'A',
      status: 2,
    },
    contact: {
      phone: '13800138001',
      email: 'lisi@example.com',
      address: {
        province: '广东省',
        city: '深圳市',
        district: '南山区',
      },
    },
  },
  {
    id: 'EP003',
    name: '王五',
    gender: 1,
    age: 25,
    birthday: '1999-07-08',
    education: {
      degree: '本科',
      school: '武汉大学',
      major: '设计学',
      graduationYear: 2021,
    },
    work: {
      company: '字节跳动',
      department: '设计部',
      position: 'UI设计师',
      salary: 18000,
      performance: 'B',
      status: 1,
    },
    contact: {
      phone: '13800138002',
      email: 'wangwu@example.com',
      address: {
        province: '北京市',
        city: '北京市',
        district: '海淀区',
      },
    },
  },
  {
    id: 'EP004',
    name: '赵六',
    gender: 2,
    age: 35,
    birthday: '1989-12-01',
    education: {
      degree: '博士',
      school: '清华大学',
      major: '人工智能',
      graduationYear: 2015,
    },
    work: {
      company: '百度',
      department: '算法部',
      position: '算法专家',
      salary: 50000,
      performance: 'A',
      status: 2,
    },
    contact: {
      phone: '13800138003',
      email: 'zhaoliu@example.com',
      address: {
        province: '北京市',
        city: '北京市',
        district: '朝阳区',
      },
    },
  },
])

const tableColumns = ref<TableColumn<TableDataItem>[]>([
  {
    prop: 'id',
    label: '工号',
    width: 100,
    align: 'center',
    fixed: 'left',
  },
  {
    prop: 'basic',
    label: '基本信息',
    align: 'center',
    children: [
      {
        prop: 'name',
        label: '姓名',
        width: 80,
        align: 'center',
      },
      {
        prop: 'gender',
        label: '性别',
        width: 60,
        align: 'center',
        formatter: ({ row }) => {
          return row.gender === 1 ? '男' : '女'
        },
      },
      {
        prop: 'age',
        label: '年龄',
        width: 80,
        align: 'center',
        sortable: true,
      },
      {
        prop: 'birthday',
        label: '生日',
        width: 110,
        align: 'center',
      },
    ],
  },
  {
    prop: 'education',
    label: '教育背景',
    align: 'center',
    children: [
      {
        prop: 'education.degree',
        label: '学历',
        width: 60,
        align: 'center',
      },
      {
        prop: 'education.school',
        label: '学校',
        width: 100,
        align: 'center',
      },
      {
        prop: 'education.major',
        label: '专业',
        width: 120,
        align: 'center',
      },
      {
        prop: 'education.graduationYear',
        label: '毕业年份',
        width: 110,
        align: 'center',
        sortable: true,
      },
    ],
  },
  {
    prop: 'work',
    label: '工作信息',
    align: 'center',
    children: [
      {
        prop: 'work.company',
        label: '公司',
        width: 120,
        align: 'center',
      },
      {
        prop: 'work.department',
        label: '部门',
        width: 90,
        align: 'center',
      },
      {
        prop: 'work.position',
        label: '职位',
        width: 120,
        align: 'center',
      },
      {
        prop: 'work.salary',
        label: '薪资',
        width: 110,
        align: 'center',
        sortable: true,
        formatter: ({ row }) => {
          return row.work.salary.toLocaleString('zh-CN', {
            style: 'currency',
            currency: 'CNY',
          })
        },
      },
      {
        prop: 'work.performance',
        label: '绩效',
        width: 100,
        align: 'center',
        sortable: true,
      },
      {
        prop: 'work.status',
        label: '状态',
        width: 100,
        align: 'center',
      },
    ],
  },
  {
    prop: 'contact',
    label: '联系方式',
    align: 'center',
    children: [
      {
        prop: 'contact.phone',
        label: '电话',
        width: 130,
        align: 'center',
      },
      {
        prop: 'contact.email',
        label: '邮箱',
        width: 200,
        align: 'center',
        showOverflowTooltip: true,
      },
      {
        prop: 'contact.address',
        label: '地址',
        align: 'center',
        children: [
          {
            prop: 'contact.address.province',
            label: '省份',
            width: 120,
            align: 'center',
          },
          {
            prop: 'contact.address.city',
            label: '城市',
            width: 120,
            align: 'center',
          },
          {
            prop: 'contact.address.district',
            label: '区县',
            width: 120,
            align: 'center',
          },
        ],
      },
    ],
  },
])
</script>

<template>
  <u-table class="vp-raw" :data="tableData" :columns="tableColumns" border stripe :max-height="500">
    <!-- ID列自定义 -->
    <template #id="{ row }">
      <el-tag size="small" effect="dark">{{ row.id }}</el-tag>
    </template>

    <!-- 状态列自定义 -->
    <template #['work.status']="{ row }">
      <el-tag v-if="row.work.status === 1" type="success" size="small">
        在职
      </el-tag>
      <el-tag v-else-if="row.work.status === 2" type="info" size="small">
        离职
      </el-tag>
    </template>
  </u-table>
</template>

<style lang="scss" scoped>
.vp-raw {
  .el-table {
    // 可以添加自定义样式
    .cell {
      white-space: nowrap;
    }
  }
}
</style>
