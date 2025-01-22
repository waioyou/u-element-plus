import type { Fn } from './types'

/**
 * 节流函数
 * @param fn 需要节流的函数
 * @param wait 等待时间
 * @param options 配置选项
 */
export function throttle<T extends Fn>(
  fn: T,
  wait = 300,
  options: {
    leading?: boolean
    trailing?: boolean
  } = {},
): T & { cancel: () => void } {
  let timer: NodeJS.Timeout | null = null
  let lastArgs: Parameters<T> | null = null
  let lastTime = 0

  function throttled(this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this
    const now = Date.now()

    if (!lastTime && options.leading === false) {
      lastTime = now
    }

    const remaining = wait - (now - lastTime)

    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      lastTime = now
      fn.apply(context, args)
    } else if (!timer && options.trailing !== false) {
      lastArgs = args
      timer = setTimeout(() => {
        lastTime = options.leading === false ? 0 : Date.now()
        timer = null
        if (lastArgs) fn.apply(context, lastArgs)
        lastArgs = null
      }, remaining)
    }
  }

  throttled.cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
      lastArgs = null
    }
    lastTime = 0
  }

  return throttled as T & { cancel: () => void }
}
