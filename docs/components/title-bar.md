# Title Bar 标题栏

标题栏组件用于显示区域标题，支持自定义图标和工具栏，为页面内容提供清晰的视觉分隔。

## 基础用法

通过设置标题和图标来创建一个基础的标题栏。

<preview path="../demo/title-bar/basic.vue"></preview>

## 自定义图标

可以通过`icon`属性设置内置图标，或通过`iconClass`属性设置自定义CSS类图标。

通过设置`showIcon`属性为`false`来隐藏默认图标。

<preview path="../demo/title-bar/icon.vue"></preview>

## 自定义内容

通过`icon`插槽可以完全自定义图标区域内容。

通过`default`插槽可以自定义标题栏的标题内容。

通过`toolbar`插槽可以在标题栏右侧添加工具栏，例如按钮、图标等。

<preview path="../demo/title-bar/slot.vue"></preview>

## API

### Props

| 名称      | 说明                | 类型                  | 默认值 |
| --------- | ------------------- | --------------------- | ------ |
| title     | 标题内容            | `string`              | `''`   |
| icon      | 图标组件或图标名称  | `Component \| string` | `''`   |
| iconClass | 自定义图标的CSS类名 | `string`              | -      |
| showIcon  | 是否显示图标        | `boolean`             | `true` |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义标题内容 |
| icon    | 自定义图标     |
| toolbar | 工具栏内容     |

### CSS变量

| 变量名                      | 说明     | 默认值                         |
| --------------------------- | -------- | ------------------------------ |
| --u-title-bar-border-radius | 边框圆角 | var(--el-font-size-medium)     |
| --u-title-bar-font-size     | 字体大小 | var(--el-font-size-large)      |
| --u-title-bar-font-weight   | 字体粗细 | var(--el-font-weight-primary)  |
| --u-title-bar-color         | 主题色   | var(--el-color-primary-dark-2) |
