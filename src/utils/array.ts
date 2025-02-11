export const treeToList = <T = any>(list: T[], children: string = 'children') => {
  const result: T[] = []
  const loop = (data: T[]) => {
    data.forEach((d: any) => {
      result.push(d)
      if (d?.[children]) {
        loop(d[children])
      }
    })
  }
  loop(list)
  return result
}
