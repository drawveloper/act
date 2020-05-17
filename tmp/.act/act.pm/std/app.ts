import { SemVer } from './deps.ts'
import { Builder } from './builder.ts'

export type AppFields = {
  repo: URL
  version: SemVer
  configures: Record<string, Promise<any>>
}

export class App {
  public repo: URL
  public version: SemVer

  constructor(fields: AppFields) {
    this.repo = fields.repo
    this.version = fields.version
  }
}
