import { fakerZH_CN } from '@faker-js/faker'
import { onMounted, ref } from 'vue'

export interface TableDataItem {
  /** 主键 */
  id: string

  // 基本信息
  /** 姓名 */
  name: string
  /** 性别 */
  gender: string
  /** 年龄 */
  age: number
  /** 生日 */
  birthday: string

  // 教育背景
  /** 学历 */
  degree: string
  /** 毕业学校 */
  school: string
  /** 专业 */
  major: string
  /** 毕业年份 */
  graduationYear: number

  // 联系方式
  /** 电话 */
  phone: string
  /** 邮箱 */
  email: string
  /** 省份 */
  province: string
  /** 城市 */
  city: string
  /** 区县 */
  district: string
  /** 地址 */
  address: string

  // 其他
  /** 个人评分 */
  score: number
  /** 更新日期 */
  updateTime: string
  /** 状态 */
  status: string
  /** 备注 */
  remark: string
}
export interface TableDataGroupItem {
  id: string
  basic: {
    name: string
    gender: string
    birthday: string
  }
  education: {
    degree: string
    school: string
    major: string
    graduationYear: number
  }
  contact: {
    phone: string
    email: string
    address: {
      province: string
      city: string
      district: string
      addressDetail: string
    }
  }
  other: {
    score: number
    updateTime: string
    status: string
    remark: string
  }
}

type OptionItem = {
  label: string
  value: any
  type?: string
}

export const useTableData = (limit = 10, useValue = false) => {
  const tableData = ref<TableDataItem[]>([])
  const tableDataGroup = ref<TableDataGroupItem[]>([])

  const genderOptions: OptionItem[] = [
    { label: '男', value: '1', type: 'primary' },
    { label: '女', value: '0', type: 'warning' },
  ]
  const schoolOptions: OptionItem[] = [
    { label: '清华大学', value: '清华大学' },
    { label: '北京大学', value: '北京大学' },
    { label: '浙江大学', value: '浙江大学' },
    { label: '武汉大学', value: '武汉大学' },
    { label: '厦门大学', value: '厦门大学' },
    { label: '杭州电子科技大学', value: '杭州电子科技大学' },
    { label: '浙江工业大学', value: '浙江工业大学' },
    { label: '浙江师范大学', value: '浙江师范大学' },
    { label: '浙江工商大学', value: '浙江工商大学' },
    { label: '浙江理工大学', value: '浙江理工大学' },
    { label: '浙江农林大学', value: '浙江农林大学' },
    { label: '浙江中医药大学', value: '浙江中医药大学' },
  ]
  const majorOptions: OptionItem[] = [
    { label: '计算机科学与技术', value: '计算机科学与技术' },
    { label: '软件工程', value: '软件工程' },
    { label: '电子信息工程', value: '电子信息工程' },
    { label: '通信工程', value: '通信工程' },
    { label: '自动化', value: '自动化' },
  ]
  const degreeOptions: OptionItem[] = [
    { label: '专科', value: '专科' },
    { label: '本科', value: '本科' },
    { label: '硕士', value: '硕士' },
    { label: '博士', value: '博士' },
  ]
  const statusOptions: OptionItem[] = [
    { label: '正常', value: '1', type: 'success' },
    { label: '停用', value: '0', type: 'danger' },
  ]
  const scoreOptions: OptionItem[] = [
    { label: '非常满意', value: 5 },
    { label: '满意', value: 4 },
    { label: '一般', value: 3 },
    { label: '不满意', value: 2 },
    { label: '非常不满意', value: 1 },
  ]

  const getArrayElement = (options: OptionItem[]) => {
    return options.map((d) => (useValue ? d.value : d.label))
  }

  const startIndex = ref(10000)
  const addFakerData = () => {
    const id = `EP${(startIndex.value++).toString().padStart(5, '0')}`
    const name = fakerZH_CN.person.fullName()
    const gender = fakerZH_CN.helpers.arrayElement(getArrayElement(genderOptions))
    const age = fakerZH_CN.number.int({ min: 18, max: 60 })
    const birthday = fakerZH_CN.date
      .birthdate({ min: 18, max: 60, mode: 'age' })
      .toISOString()
      .split('T')[0]

    const degree = fakerZH_CN.helpers.arrayElement(getArrayElement(degreeOptions))
    const school = fakerZH_CN.helpers.arrayElement(getArrayElement(schoolOptions))
    const major = fakerZH_CN.helpers.arrayElement(getArrayElement(majorOptions))
    const graduationYear = fakerZH_CN.number.int({ min: 2000, max: 2024 })

    const phone = `1${fakerZH_CN.string.numeric(10)}`
    const email = fakerZH_CN.internet.email()
    const province = '浙江省'
    const city = '杭州市'
    const district = fakerZH_CN.helpers.arrayElement([
      '西湖区',
      '上城区',
      '滨江区',
      '萧山区',
      '余杭区',
    ])
    const address = fakerZH_CN.location.streetAddress()

    const updateTime = fakerZH_CN.date.recent().toISOString()
    const score = fakerZH_CN.number.int({ min: 1, max: 5 })
    const status = fakerZH_CN.helpers.arrayElement(getArrayElement(statusOptions))
    const remark = fakerZH_CN.lorem.sentence({ min: 3, max: 10 })
    return {
      id,
      name,
      gender,
      age,
      birthday,
      degree,
      school,
      major,
      graduationYear,
      phone,
      email,
      province,
      city,
      district,
      address,
      score,
      updateTime,
      status,
      remark,
    }
  }

  const generateTableData = () => {
    tableData.value = Array.from({ length: limit }, (): TableDataItem => addFakerData())
  }

  onMounted(() => {
    generateTableData()
    tableDataGroup.value = tableData.value.map((item) => {
      return {
        id: item.id,
        basic: {
          name: item.name,
          gender: item.gender,
          birthday: item.birthday,
        },
        education: {
          degree: item.degree,
          school: item.school,
          major: item.major,
          graduationYear: item.graduationYear,
        },
        contact: {
          phone: item.phone,
          email: item.email,
          address: {
            province: item.province,
            city: item.city,
            district: item.district,
            addressDetail: item.address,
          },
        },
        other: {
          score: item.score,
          updateTime: item.updateTime,
          status: item.status,
          remark: item.remark,
        },
      }
    })
  })

  return {
    tableData,
    tableDataGroup,
    addFakerData,
    generateTableData,
    genderOptions,
    schoolOptions,
    majorOptions,
    degreeOptions,
    statusOptions,
    scoreOptions,
  }
}
