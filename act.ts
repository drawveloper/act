import { cac } from './deps.ts'

const cli = cac('act')
cli.version('0.0.0')

cli
  .command('install [...apps]', 'Install apps')
  .action((apps: any, options: any) => {
    console.log('Wow! Deno cli!', apps, options)
  })

cli.help()

const parsed = cli.parse()
