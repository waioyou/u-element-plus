<script setup lang="ts">
import { computed, nextTick, onBeforeMount, onMounted, ref } from 'vue'
import type { CSSProperties } from 'vue'
import type {
  ContextMenuEmits,
  ContextMenuInstance,
  ContextMenuProps,
  ContextMenuSlots,
  ContextMenuItem,
} from './types'

defineOptions({ name: 'UContextMenu' })
const props = withDefaults(defineProps<ContextMenuProps>(), {
  afterClickHide: true,
  offsetX: 0,
  offsetY: 0,
  manual: false,
  items: () => [],
})

const emits = defineEmits<ContextMenuEmits>()

defineSlots<ContextMenuSlots>()

const contextMenuRef = ref<HTMLDivElement>()
// 是否显示右键菜单
const visible = ref(false)

// 右键菜单位置
const position = ref({ top: 100, left: 100 })
const contextMenuStyle = computed<CSSProperties>(() => ({
  top: `${position.value.top}px`,
  left: `${position.value.left}px`,
  visibility: visible.value ? 'visible' : 'hidden',
}))

const calculatePosition = (event: MouseEvent) => {
  const { pageX, pageY, clientX, clientY } = event
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  const menuElement = contextMenuRef.value

  if (!menuElement) return { top: 0, left: 0 }

  const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menuElement

  const left =
    clientX + menuWidth > windowWidth ? pageX - menuWidth + props.offsetX : pageX + props.offsetX

  const top =
    clientY + menuHeight > windowHeight ? pageY - menuHeight + props.offsetY : pageY + props.offsetY

  return { top, left }
}

/**
 * @description 显示右键菜单
 * @param event 鼠标事件对象
 */
const showMenu = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target) {
    console.warn('无效的事件目标')
    return
  }
  // 判断目标节点的祖先节点是否包含目标选择器
  const hasSelectors = !props.triggerSelectors || target.closest(props.triggerSelectors) !== null
  if (!hasSelectors) return
  event.preventDefault()
  position.value = calculatePosition(event)
  visible.value = true
  emits('show')
  document.addEventListener('click', hideMenu)
}

/**
 * @description 隐藏右键菜单
 * @param event 鼠标事件对象
 */
const hideMenu = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!props.afterClickHide && target.closest('.u-context-menu')) {
    return
  }
  visible.value = false
  emits('hide')
  document.removeEventListener('click', hideMenu)
}

const handleClick = (item: ContextMenuItem) => {
  emits('select', item)
}

onMounted(() => {
  if (!props.manual) {
    nextTick(() => {
      document.addEventListener('contextmenu', showMenu)
    })
  }
})
onBeforeMount(() => {
  document.removeEventListener('contextmenu', showMenu)
  document.removeEventListener('click', hideMenu)
})

defineExpose<ContextMenuInstance>({
  showMenu,
  hideMenu,
})
</script>

<template>
  <teleport to="body">
    <transition name="u-context-menu">
      <div ref="contextMenuRef" v-show="visible" class="u-context-menu" :style="contextMenuStyle">
        <slot>
          <ul class="u-context-menu__list">
            <li
              v-for="item in items"
              :key="item.name"
              class="u-context-menu-item"
              @click="handleClick(item)"
            >
              <el-icon v-if="item.icon" class="u-context-menu-item__icon">
                <component :is="item.icon" />
              </el-icon>
              <i v-if="item.iconClass" class="u-context-menu-item__icon" :class="item.iconClass">
              </i>
              <span class="u-context-menu-item__label">{{ item.label }}</span>
            </li>
          </ul>
        </slot>
      </div>
    </transition>
  </teleport>
</template>
