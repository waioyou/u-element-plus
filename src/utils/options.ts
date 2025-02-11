export const getOptionText = (
  options: any[],
  value: any,
  optionMap: { labelKey?: string; valueKey?: string } = {},
): string => {
  const { labelKey = 'label', valueKey = 'value' } = optionMap
  if (value === undefined || value === null) return ''

  // 处理单个值或数组
  if (Array.isArray(value)) {
    return value
      .map((d: any) =>
        Array.isArray(d)
          ? d.map((sd: any) => getOptionText(options, sd, { labelKey, valueKey })).join('/')
          : getOptionText(options, d, { labelKey, valueKey }),
      )
      .join('、')
  }

  return options.find((item) => item[valueKey] === value)?.[labelKey] ?? value
}
