export default {
  // 继承 @commitlint/config-conventional 的配置
  extends: ['@commitlint/config-conventional'],
  // 自定义校验规则
  rules: {
    // type-enum: commit 消息类型限制
    // 2 表示必须遵守，always 表示始终检查，数组内容为允许的 commit 消息类型
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复bug
        'docs', // 文档更新
        'style', // 代码格式（不影响功能，例如空格、分号等格式修正）
        'refactor', // 代码重构（不包括 bug 修复、功能新增）
        'perf', // 性能优化
        'test', // 添加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回滚到上一个版本
        'build', // 构建系统或外部依赖项的更改
        'ci', // CI配置
      ],
    ],
    'type-case': [0], // commit 类型大小写不做校验
    'type-empty': [0], // commit 类型不能为空
    'scope-empty': [0], // commit 范围可以为空
    'scope-case': [0], // commit 范围大小写不做校验
    'subject-full-stop': [0, 'never'], // commit 消息结尾不加句号
    'subject-case': [0, 'never'], // commit 消息大小写不做校验
    'header-max-length': [0, 'always', 72], // commit 消息头部长度不做限制
  },
}
