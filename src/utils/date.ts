// 时间日期相关

import { dayjs } from 'element-plus'

/**
 * 格式化日期
 * @param value 日期字符串
 * @param format 格式化后的格式
 * @returns 格式化后的日期字符串
 * @description 如果是合法的日期，则返回格式化后的结果，否则返回原值
 */
export const formatterDate = (value: string, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).isValid() ? dayjs(value).format(format) : value
}

/** 根据 type 获取日期格式 */
export const getDateTypeFormat = (
  type:
    | 'year'
    | 'years'
    | 'month'
    | 'months'
    | 'date'
    | 'dates'
    | 'datetime'
    | 'week'
    | 'datetimerange'
    | 'daterange'
    | 'monthrange'
    | 'yearrange',
) => {
  const map = {
    year: 'YYYY',
    years: 'YYYY',
    month: 'YYYY-MM',
    months: 'YYYY-MM',
    date: 'YYYY-MM-DD',
    dates: 'YYYY-MM-DD',
    datetime: 'YYYY-MM-DD HH:mm:ss',
    week: 'YYYY-MM-DD',
    datetimerange: 'YYYY-MM-DD HH:mm:ss',
    daterange: 'YYYY-MM-DD',
    monthrange: 'YYYY-MM',
    yearrange: 'YYYY',
  }
  return map[type] ?? 'YYYY-MM-DD'
}
