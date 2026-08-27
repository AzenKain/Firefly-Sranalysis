import { readFileSync, readdirSync } from "fs"
import path from "path"

type CacheItem = {
  buf: Uint8Array
  type: "json" | "br"
}

const cache = new Map<string, CacheItem>()

const dir = path.join(process.cwd(), "data")

for (const f of readdirSync(dir)) {
  const file = path.join(dir, f)

  if (f.endsWith(".json.br")) {
    const name = f.replace(".json.br", "")
    const buf = new Uint8Array(readFileSync(file))
    cache.set(name, {
      buf,
      type: "br"
    })
  }

  if (f.endsWith(".json")) {
    const name = f.replace(".json", "")
    const buf = new Uint8Array(readFileSync(file))

    cache.set(name, {
      buf,
      type: "json"
    })
  }
}

export function getDataCache(name: string) {
  return cache.get(name)
}