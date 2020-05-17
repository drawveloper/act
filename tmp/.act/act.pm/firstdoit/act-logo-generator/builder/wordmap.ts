import { assert } from "https://deno.land/std/testing/asserts.ts";
import { WordMap } from "../app.ts"

export async function build (wordmap: WordMap) {
  assert(wordmap.a.length + wordmap.c.length + wordmap.t.length > 0, "Must export at least one word")
  assert(
    Object.keys(wordmap).every((k: string) =>
      wordmap[k as keyof WordMap].every(w => w.startsWith(k))
    ),
    "Each word should start with letter in key"
  )
  return wordmap
}
