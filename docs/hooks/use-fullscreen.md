# useFullscreen

## 使用示例

`useFullscreen` 是一个用于管理全屏状态的钩子函数，它封装了进入全屏、退出全屏和切换全屏状态的功能。

<preview path="../demo/use-fullscreen/basic.vue"></preview>

## 是否全屏

```typescript
// 是否全屏
const { isFullscreen } = useFullscreen()
```

## 进入全屏

```typescript
const { enterFullscreen } = useFullscreen(targetRef)

// 调用方法进入全屏
enterFullscreen()
```

## 退出全屏

```typescript
const { exitFullscreen } = useFullscreen(targetRef)

// 调用方法退出全屏
exitFullscreen()
```

## 切换全屏

```typescript
const { toggleFullscreen } = useFullscreen(targetRef)

// 调用方法切换全屏状态
toggleFullscreen()
```

## API

### 完整参数

`useFullscreen` 接受一个可选参数：

1. `targetRef`: 需要进入全屏的目标元素的引用。如果未提供，则默认全屏整个文档。

### 返回值

`useFullscreen` 返回以下内容供您使用：

| 返回值           | 说明             | 默认值  |
| ---------------- | ---------------- | ------- |
| isFullscreen     | 是否全屏状态     | `false` |
| enterFullscreen  | 进入全屏方法     | -       |
| exitFullscreen   | 退出全屏方法     | -       |
| toggleFullscreen | 切换全屏状态方法 | -       |

## 最佳实践

1. **目标元素**：确保 `targetRef` 引用的是一个有效的 DOM 元素，只有该元素会进入全屏。

2. **全屏支持**：在调用全屏方法前，可以检查浏览器是否支持全屏功能，并根据需要提供用户提示。

3. **事件监听**：`useFullscreen` 内部已经处理了全屏状态的监听，确保 `isFullscreen` 状态的实时更新。

4. **用户体验**：在全屏状态下，提供一个明显的退出全屏按钮或提示，以便用户可以轻松退出全屏。
