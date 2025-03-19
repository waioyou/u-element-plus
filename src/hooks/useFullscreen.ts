import { ElMessage } from 'element-plus'
import { ref, onUnmounted, computed, type Ref } from 'vue'

export const useFullscreen = <T = any>(targetRef?: Ref<T>) => {
  /** 是否全屏 */
  const isFullscreen = ref(false)
  /** 文档对象 */
  const doc = document as any

  const target = computed(() => {
    if (!targetRef) {
      return document.documentElement
    }
    if (targetRef.value instanceof HTMLElement) {
      return targetRef.value
    }
    return (targetRef.value as any).$el
  })

  /**
   * 进入全屏
   */
  const enterFullscreen = () => {
    if (
      doc.fullscreenEnabled ||
      doc.webkitFullscreenEnabled ||
      doc.mozFullScreenEnabled ||
      doc.msFullscreenEnabled
    ) {
      const el = target.value as any
      if (el.requestFullscreen) {
        el.requestFullscreen()
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen() // Safari 适配
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen() // Firefox 适配
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen() // IE11 适配
      }
      isFullscreen.value = true
    } else {
      ElMessage.warning('当前浏览器不支持全屏')
    }
  }

  /**
   * 退出全屏
   */
  const exitFullscreen = () => {
    if (doc.exitFullscreen) {
      doc.exitFullscreen()
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen() // Safari 适配
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen() // Firefox 适配
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen() // IE11 适配
    }
  }

  /**
   * 切换全屏
   */
  const toggleFullscreen = () => {
    if (isFullscreen.value) {
      exitFullscreen()
    } else {
      enterFullscreen()
    }
  }

  /**
   * 监听全屏状态变化
   */
  const onFullscreenChange = () => {
    isFullscreen.value = !!(doc.fullscreenElement || doc.webkitFullscreenElement)
  }

  document.addEventListener('fullscreenchange', onFullscreenChange)
  document.addEventListener('webkitfullscreenchange', onFullscreenChange) // 兼容 Safari
  document.addEventListener('mozfullscreenchange', onFullscreenChange) // 兼容 Firefox
  document.addEventListener('MSFullscreenChange', onFullscreenChange) // 兼容 IE11

  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', onFullscreenChange)
    document.removeEventListener('webkitfullscreenchange', onFullscreenChange)
    document.removeEventListener('mozfullscreenchange', onFullscreenChange)
    document.removeEventListener('MSFullscreenChange', onFullscreenChange)
  })

  return { isFullscreen, enterFullscreen, exitFullscreen, toggleFullscreen }
}
