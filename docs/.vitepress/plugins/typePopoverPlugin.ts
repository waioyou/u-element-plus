import type { PluginSimple } from 'markdown-it'
import markdownItContainer from 'markdown-it-container'

const markdownPopover: PluginSimple = (md) => {
  md.use(markdownItContainer, 'popover', {
    render(tokens: any, idx: any) {
      if (tokens[idx].nesting === 1) {
        // 解析 :::popover enum 里的 'enum'
        const typeName = tokens[idx].info.trim().slice(7).trim() || 'typeName'
        return `<TypePopover  typeName="${typeName}">\n`
      } else {
        return '</TypePopover>\n'
      }
    },
  })
}

export default markdownPopover
