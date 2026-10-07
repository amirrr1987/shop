/** Minimal Markdown → safe HTML (escape first, then allowlisted tags). */
export function renderMarkdown(source: string | null | undefined): string {
  const text = String(source ?? '')
    .replace(/\r\n/g, '\n')
    .trim()
  if (!text) return ''

  const blocks = text.split(/\n{2,}/)
  const html = blocks.map((block) => renderBlock(block.trim())).join('\n')
  return html
}

function renderBlock(block: string): string {
  if (/^###\s+/.test(block)) {
    return `<h3>${inline(block.replace(/^###\s+/, ''))}</h3>`
  }
  if (/^##\s+/.test(block)) {
    return `<h2>${inline(block.replace(/^##\s+/, ''))}</h2>`
  }
  if (/^#\s+/.test(block)) {
    return `<h1>${inline(block.replace(/^#\s+/, ''))}</h1>`
  }

  const lines = block.split('\n')
  if (lines.every((line) => /^[-*]\s+/.test(line))) {
    const items = lines
      .map((line) => `<li>${inline(line.replace(/^[-*]\s+/, ''))}</li>`)
      .join('')
    return `<ul>${items}</ul>`
  }

  if (lines.every((line) => /^\d+\.\s+/.test(line))) {
    const items = lines
      .map((line) => `<li>${inline(line.replace(/^\d+\.\s+/, ''))}</li>`)
      .join('')
    return `<ol>${items}</ol>`
  }

  if (lines.every((line) => /^>\s?/.test(line))) {
    const body = lines.map((line) => inline(line.replace(/^>\s?/, ''))).join('<br>')
    return `<blockquote>${body}</blockquote>`
  }

  return `<p>${lines.map((line) => inline(line)).join('<br>')}</p>`
}

function inline(value: string): string {
  let out = escapeHtml(value)
  out = out.replace(
    /`([^`]+)`/g,
    (_m, code: string) => `<code>${code}</code>`,
  )
  out = out.replace(
    /\*\*([^*]+)\*\*/g,
    (_m, inner: string) => `<strong>${inner}</strong>`,
  )
  out = out.replace(
    /\*([^*]+)\*/g,
    (_m, inner: string) => `<em>${inner}</em>`,
  )
  out = out.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
    (_m, label: string, href: string) =>
      `<a href="${href}" rel="noopener noreferrer" target="_blank">${label}</a>`,
  )
  return out
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
