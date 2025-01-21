import boxen from 'boxen'
import chalk from 'chalk'

if (!process.env.npm_execpath.includes('pnpm')) {
  const message = `
${chalk.red.bold('请使用 pnpm！')}

${chalk.green('【安装方法】')}
  ${chalk.cyan('npm i -g pnpm')}

${chalk.green('【使用方法】')}
  ${chalk.cyan('pnpm install')}

${chalk.yellow('【为什么使用 pnpm】')}
  ${chalk.gray('• 节省磁盘空间')}
  ${chalk.gray('• 安装速度更快')}
  ${chalk.gray('• 更好的依赖管理')}
`

  console.log(
    boxen(message, {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'yellow',
      title: '包管理器检查',
      titleAlignment: 'center',
    }),
  )

  process.exit(1)
}
