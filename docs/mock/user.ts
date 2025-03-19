import { fakerZH_CN } from '@faker-js/faker'
import { BaseResponse, DictItem, User, UserGroup } from './types'

const genderDict: DictItem[] = [
  { label: '男', value: '1', type: 'primary' },
  { label: '女', value: '0', type: 'danger' },
]
const schoolDict: DictItem[] = [
  { label: '清华大学', value: '清华大学' },
  { label: '北京大学', value: '北京大学' },
  { label: '浙江大学', value: '浙江大学' },
  { label: '武汉大学', value: '武汉大学' },
  { label: '厦门大学', value: '厦门大学' },
  { label: '浙江工业大学', value: '浙江工业大学' },
  { label: '浙江师范大学', value: '浙江师范大学' },
  { label: '浙江工商大学', value: '浙江工商大学' },
  { label: '浙江理工大学', value: '浙江理工大学' },
  { label: '浙江农林大学', value: '浙江农林大学' },
]
const majorDict: DictItem[] = [
  { label: '计算机科学与技术', value: '计算机科学与技术' },
  { label: '软件工程', value: '软件工程' },
  { label: '电子信息工程', value: '电子信息工程' },
  { label: '通信工程', value: '通信工程' },
  { label: '自动化', value: '自动化' },
]
const degreeDict: DictItem[] = [
  { label: '专科', value: '专科' },
  { label: '本科', value: '本科' },
  { label: '硕士', value: '硕士' },
  { label: '博士', value: '博士' },
]
const statusDict: DictItem[] = [
  { label: '正常', value: '1', type: 'success' },
  { label: '停用', value: '0', type: 'danger' },
]
const scoreDict: DictItem[] = [
  { label: '非常满意', value: 5, type: 'success' },
  { label: '满意', value: 4, type: 'success' },
  { label: '一般', value: 3, type: 'warning' },
  { label: '不满意', value: 2, type: 'danger' },
  { label: '非常不满意', value: 1, type: 'danger' },
]

export const dicts = {
  gender: genderDict,
  school: schoolDict,
  major: majorDict,
  degree: degreeDict,
  status: statusDict,
  score: scoreDict,
}

let startIndex = 1

const getArrayElement = (dict: DictItem[]) => {
  return dict.map((d) => d.value)
}

export const getDictText = (dict: DictItem[], value: any) => {
  return dict.find((d) => d.value === value)?.label ?? ''
}
export const getDictType = (dict: DictItem[], value: any) => {
  return dict.find((d) => d.value === value)?.type ?? 'primary'
}

let userList: User[] = []

const addUser = () => {
  const id = `EP${(startIndex++).toString().padStart(5, '0')}`
  const name = fakerZH_CN.person.fullName()
  const gender = fakerZH_CN.helpers.arrayElement(getArrayElement(dicts.gender))
  const genderText = getDictText(dicts.gender, gender)
  const age = fakerZH_CN.number.int({ min: 18, max: 60 })
  const birthday = fakerZH_CN.date
    .birthdate({ min: 18, max: 60, mode: 'age' })
    .toISOString()
    .split('T')[0]

  const degree = fakerZH_CN.helpers.arrayElement(getArrayElement(dicts.degree))
  const degreeText = getDictText(dicts.degree, degree)
  const school = fakerZH_CN.helpers.arrayElement(getArrayElement(dicts.school))
  const schoolText = getDictText(dicts.school, school)
  const major = fakerZH_CN.helpers.arrayElement(getArrayElement(dicts.major))
  const majorText = getDictText(dicts.major, major)
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
  const status = fakerZH_CN.helpers.arrayElement(getArrayElement(dicts.status))
  const statusText = getDictText(dicts.status, status)
  const remark = fakerZH_CN.lorem.sentence({ min: 3, max: 10 })
  return {
    id,
    name,
    gender,
    genderText,
    age,
    birthday,
    degree,
    degreeText,
    school,
    schoolText,
    major,
    majorText,
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
    statusText,
    remark,
  }
}

export const generateUserList = (limit = 1000) => {
  userList = Array.from({ length: limit }, () => addUser())
}

/** 获取用户列表 */
export const getUserList = (limit = 10) => {
  const res: BaseResponse<User[]> = {
    code: 200,
    data: userList.slice(0, limit),
    msg: '查询成功',
  }
  return Promise.resolve(res)
}

/** 获取用户分组信息 */
export const getUserGroupList = (limit = 10) => {
  const userGroupList = userList.slice(0, limit).map((item) => {
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

  const res: BaseResponse<UserGroup[]> = {
    code: 200,
    data: userGroupList,
    msg: '查询成功',
  }
  return Promise.resolve(res)
}

/** 新增用户 */
export const createUser = () => {
  const user = addUser()
  userList.unshift(user)
  const res: BaseResponse<User> = {
    code: 200,
    data: user,
    msg: '新增成功',
  }
  return Promise.resolve(res)
}
