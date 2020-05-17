import { App } from '../../std/app.ts'
import { SemVer } from '../../std/deps.ts'
import { build as wordmap } from '../act-logo-generator/builder/wordmap.ts'

export default new App({
  version: new SemVer('0.0.0'),
  repo: new URL('firstdoit/act-logo-words-culture'),
  configures: {
    wordmap: wordmap({
      a: [
        'autonomy',
        'alignment',
      ],
      c: [
        'creates',
        'causes',
      ],
      t: [
        'transformation',
        'trust',
      ],
    }),
  },
})
