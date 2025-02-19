export const getOptionText = (
  options: any[],
  value: any,
  optionMap: { label?: string; value?: string } = {},
): string => {
  // const { labelKey = 'label', valueKey = 'value' } = optionMap
  if (value === undefined || value === null) return ''

  // 处理单个值或数组
  if (Array.isArray(value)) {
    return value
      .map((d: any) =>
        Array.isArray(d)
          ? d.map((sd: any) => getOptionText(options, sd, optionMap)).join('/')
          : getOptionText(options, d, optionMap),
      )
      .join('、')
  }
  const labelKey = optionMap.label || 'label'
  const valueKey = optionMap.value || 'value'
  return options.find((item) => item[valueKey] === value)?.[labelKey] ?? value
}
