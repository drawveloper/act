import { App } from '../../std/app.ts'
import { SemVer } from '../../std/deps.ts'

export type WordMap = {
  a: string[],
  c: string[],
  t: string[],
}

export type ServiceState = {
  wordmap: WordMap
}

export default new App({
  version: new SemVer('1.2.3'),
  repo: new URL('firstdoit/act-logo-generator'),
  configures: {
    router: (async () => {
      return 'test'
    })()
  }
})
