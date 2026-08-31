import fs from 'node:fs'
import path from 'node:path'

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (entry.name.endsWith('.vue')) out.push(full)
  }
  return out
}

function balanceDivs(html) {
  const lines = html.split(/\r?\n/)
  let open = 0
  const out = []

  for (const line of lines) {
    const opens = (line.match(/<div\b/g) || []).length
    let closes = (line.match(/<\/div>/g) || []).length
    const maxClose = open + opens

    let keptCloses = 0
    const fixed = line.replace(/<\/div>/g, () => {
      if (keptCloses < maxClose) {
        keptCloses++
        return '</div>'
      }
      return ''
    })

    open += opens - keptCloses
    out.push(fixed)
  }

  // Drop trailing empty lines created by removed tags
  return { html: out.join('\n'), balance: open }
}

const pagesDir = path.join(process.cwd(), 'app/pages')
const files = walk(pagesDir)

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8')
  const m = raw.match(/^<template>\r?\n?([\s\S]*?)\r?\n?<\/template>\s*$/)
  if (!m) {
    console.warn(`skip ${file}`)
    continue
  }

  let inner = m[1]
  // unwrap previous page-content if re-run
  inner = inner.replace(/^\s*<div class="page-content">\s*/i, '').replace(/\s*<\/div>\s*$/i, '')

  const { html, balance } = balanceDivs(inner)
  const body = `<div class="page-content">\n${html.trim()}\n</div>`
  const next = `<template>\n${body}\n</template>\n`
  fs.writeFileSync(file, next)

  const check = balanceDivs(body)
  console.log(
    `${check.balance === 0 ? 'ok' : 'WARN'} ${path.relative(process.cwd(), file)} balance=${check.balance} (beforeWrap=${balance})`,
  )
}
