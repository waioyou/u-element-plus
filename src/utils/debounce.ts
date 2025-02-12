import type { Fn } from './types'

/**
 * @deprecated
 * 防抖函数
 * @param fn 需要防抖的函数
 * @param wait 等待时间
 * @param options 配置选项
 * @returns 防抖后的函数
 */
export function debounce<T extends Fn>(
  fn: T,
  wait = 300,
  options: {
    immediate?: boolean
  } = {},
): T & { cancel: () => void } {
  let timer: NodeJS.Timeout | null = null
  let lastArgs: any[] | null = null

  function debounced(this: any, ...args: any[]) {
    lastArgs = args

    if (timer) clearTimeout(timer)

    if (options.immediate && !timer) {
      fn.apply(this, args)
    }

    timer = setTimeout(() => {
      if (lastArgs) fn.apply(this, lastArgs)
      timer = null
      lastArgs = null
    }, wait)
  }

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
      lastArgs = null
    }
  }

  return debounced as T & { cancel: () => void }
}
