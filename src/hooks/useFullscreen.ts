import { ref, onUnmounted, computed } from 'vue'
import type { ComponentPublicInstance, Ref } from 'vue'

export const useFullscreen = <T = ComponentPublicInstance>(targetRef: Ref<T>) => {
  const isFullscreen = ref(false)

  const target = computed(() => {
    if (targetRef.value instanceof HTMLElement) {
      return targetRef.value
    }
    return (targetRef.value as any).$el
  })
  const enterFullscreen = () => {
    if (target.value) {
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
    }
  }

  const exitFullscreen = () => {
    if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        ;(document as any).webkitExitFullscreen() // 适配 Safari
      }
      isFullscreen.value = false
    }
  }

  const toggleFullscreen = () => {
    if (isFullscreen.value) {
      exitFullscreen()
    } else {
      enterFullscreen()
    }
  }

  const onFullscreenChange = () => {
    isFullscreen.value = !!(document.fullscreenElement || (document as any).webkitFullscreenElement)
  }

  document.addEventListener('fullscreenchange', onFullscreenChange)
  document.addEventListener('webkitfullscreenchange', onFullscreenChange) // 兼容 Safari

  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', onFullscreenChange)
    document.removeEventListener('webkitfullscreenchange', onFullscreenChange)
  })

  return { target, isFullscreen, enterFullscreen, exitFullscreen, toggleFullscreen }
}
