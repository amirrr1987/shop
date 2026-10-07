/** Best-effort embed URL for YouTube / Aparat / direct video. */
export function toEmbedUrl(raw: string | null | undefined): string | null {
  const url = raw?.trim()
  if (!url) return null

  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      return id ? `https://www.youtube.com/embed/${id}` : null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsed.pathname.startsWith('/embed/')) return url
      const id = parsed.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}`
      const parts = parsed.pathname.split('/').filter(Boolean)
      if (parts[0] === 'shorts' && parts[1]) {
        return `https://www.youtube.com/embed/${parts[1]}`
      }
    }

    if (host === 'aparat.com') {
      const parts = parsed.pathname.split('/').filter(Boolean)
      const vIndex = parts.indexOf('v')
      if (vIndex >= 0 && parts[vIndex + 1]) {
        return `https://www.aparat.com/video/video/embed/videohash/${parts[vIndex + 1]}/vt/frame`
      }
    }

    if (/\.(mp4|webm|ogg)(\?|$)/i.test(parsed.pathname)) {
      return url
    }

    return url
  } catch {
    return null
  }
}

export function isDirectVideo(url: string | null | undefined): boolean {
  if (!url) return false
  try {
    return /\.(mp4|webm|ogg)(\?|$)/i.test(new URL(url).pathname)
  } catch {
    return false
  }
}
