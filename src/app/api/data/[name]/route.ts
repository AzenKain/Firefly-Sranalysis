import { getDataCache } from "@/lib/cache/cache"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params

  const item = getDataCache(name)

  if (!item) {
    return new Response("Not found", { status: 404 })
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=3600"
  }

  if (item.type === "br") {
    headers["Content-Encoding"] = "br"
  }

  return new Response(new Uint8Array(item.buf), { headers })
}