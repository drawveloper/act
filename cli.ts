import { parse } from './deps.ts'

const { args } = Deno

console.dir(parse(args))
