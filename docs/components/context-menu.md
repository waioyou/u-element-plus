# Context Menu 自定义右键菜单

用于自定义右键菜单功能。

## 基础用法

通过默认插槽设置菜单内容。

<preview path="../demo/context-menu/basic.vue"></preview>

<!-- ## 指定触发区域

通过 `trigger-selectors` 属性指定触发右键菜单的元素选择器。

<preview path="../demo/context-menu/trigger.vue"></preview>

## 手动控制

通过 `manual` 属性和实例方法手动控制菜单的显示和隐藏。

<preview path="../demo/context-menu/manual.vue"></preview> -->

## API

### Props

| 名称              | 类型    | 默认值 | 说明                         |
| ----------------- | ------- | ------ | ---------------------------- |
| manual            | boolean | false  | 是否手动控制菜单的显示和隐藏 |
| trigger-selectors | string  | -      | 触发右键菜单的元素选择器     |
| after-click-hide  | boolean | true   | 点击菜单项后是否自动隐藏菜单 |
| offset-x          | number  | 0      | 菜单水平方向偏移量           |
| offset-y          | number  | 0      | 菜单垂直方向偏移量           |

### Events

| 事件名 | 说明           | 参数 |
| ------ | -------------- | ---- |
| show   | 菜单显示时触发 | -    |
| hide   | 菜单隐藏时触发 | -    |

### Methods

| 方法名   | 说明     | 参数                |
| -------- | -------- | ------------------- |
| showMenu | 显示菜单 | (event: MouseEvent) |
| hideMenu | 隐藏菜单 | (event: MouseEvent) |

### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 菜单内容 |

## 注意事项

::: info

1. 组件默认将菜单内容通过 `teleport` 传送到 `body` 元素下，以避免因父元素样式影响菜单定位。
2. 当菜单超出视口边界时，会自动调整位置以确保完整显示。
3. 在手动模式下，需要通过组件实例的方法来控制菜单的显示和隐藏。
   :::
