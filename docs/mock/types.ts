export interface BaseResponse<T = any> {
  code: number
  data: T
  msg?: string
}

export interface PageResponse<T = any> extends Omit<BaseResponse<T>, 'data'> {
  data: {
    rows: T[]
    total: number
  }
}

export type DictItem = {
  label: string
  value: any
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

export interface User {
  /** 主键 */
  id: string

  // 基本信息
  /** 姓名 */
  name: string
  /** 性别 */
  gender: string
  genderText: string
  /** 年龄 */
  age: number
  /** 生日 */
  birthday: string

  // 教育背景
  /** 学历 */
  degree: string
  degreeText: string
  /** 毕业学校 */
  school: string
  schoolText: string
  /** 专业 */
  major: string
  majorText: string
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
  statusText: string
  /** 备注 */
  remark: string
}

export interface UserGroup {
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
