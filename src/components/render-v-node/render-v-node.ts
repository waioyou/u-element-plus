import { defineComponent } from 'vue'
import type { PropType, VNode } from 'vue'

const RenderVNode = defineComponent({
  props: {
    vNode: {
      type: [String, Number, Object] as PropType<VNode | string | number>,
      required: true,
    },
  },
  setup(props) {
    return () => props.vNode
  },
})

export default RenderVNode
