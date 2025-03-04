import { postcssIsolateStyles } from 'vitepress'

export default {
  plugins: [
    postcssIsolateStyles({
      prefix: ':not(:where(.vp-raw *))',
      includeFiles: [/vp-doc\.css/] // 默认为 /base\.css/
    })
    // 'postcss-prefix-selector': {
    //   prefix: ':not(:where(.vp-raw *))',
    //   includeFiles: [/vp-doc\.css/],
    //   transform(prefix, _selector) {
    //     const [selector, pseudo = ''] = _selector.split(/(:\S*)$/)
    //     return selector + prefix + pseudo
    //   }
    // }
  ]
}
