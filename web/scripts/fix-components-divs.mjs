import fs from 'node:fs'
import path from 'node:path'

function balanceDivs(html) {
  const lines = html.split(/\r?\n/)
  let open = 0
  const out = []

  for (const line of lines) {
    const opens = (line.match(/<div\b/g) || []).length
    const maxClose = open + opens
    let kept = 0
    const fixed = line.replace(/<\/div>/g, () => {
      if (kept < maxClose) {
        kept++
        return '</div>'
      }
      return ''
    })
    open += opens - kept
    out.push(fixed)
  }

  let htmlOut = out.join('\n').trim()
  if (open > 0) htmlOut += `\n${'</div>'.repeat(open)}`
  return htmlOut
}

function fixFile(file) {
  const raw = fs.readFileSync(file, 'utf8')
  const m = raw.match(/^<template>\r?\n?([\s\S]*?)\r?\n?<\/template>\s*$/)
  if (!m) return false

  let inner = m[1]
    .replace(/^\s*<div class="page-content">\s*/i, '')
    .replace(/\s*<\/div>\s*$/i, '')

  const balanced = balanceDivs(inner)
  const body = `<div class="page-content">\n${balanced}\n</div>`
  fs.writeFileSync(file, `<template>\n${body}\n</template>\n`)
  return true
}

const targets = [
  ...fs.readdirSync('app/components').filter(f => f.endsWith('.vue')).map(f => path.join('app/components', f)),
]

for (const file of targets) {
  fixFile(file)
  const s = fs.readFileSync(file, 'utf8')
  const body = s.replace(/^<template>\n?/, '').replace(/\n?<\/template>\s*$/, '')
  let open = 0
  for (const l of body.split(/\n/)) {
    open += (l.match(/<div\b/g) || []).length
    open -= (l.match(/<\/div>/g) || []).length
  }
  console.log(`${file} balance=${open}`)
}
