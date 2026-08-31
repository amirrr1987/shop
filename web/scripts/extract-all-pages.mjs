import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const themeDir = path.join(root, 'theme')

const pageMap = {
  'index.html': 'index.vue',
  'index-2.html': 'home-2.vue',
  'index-3.html': 'home-3.vue',
  'index-4.html': 'home-4.vue',
  'about.html': 'about.vue',
  'cart.html': 'cart.vue',
  'checkout.html': 'checkout.vue',
  'compare.html': 'compare.vue',
  'login.html': 'login.vue',
  'my-account.html': 'my-account.vue',
  'wishlist.html': 'wishlist.vue',
  'thank-you-page.html': 'thank-you.vue',
  'contact.html': 'contact.vue',
  'shop-3-column.html': 'shop/3-column.vue',
  'shop-4-column.html': 'shop/4-column.vue',
  'shop-left-sidebar.html': 'shop/left-sidebar.vue',
  'shop-right-sidebar.html': 'shop/right-sidebar.vue',
  'shop-list.html': 'shop/list.vue',
  'shop-list-left-sidebar.html': 'shop/list-left-sidebar.vue',
  'shop-list-right-sidebar.html': 'shop/list-right-sidebar.vue',
  'single-product.html': 'product/index.vue',
  'single-product-variable.html': 'product/variable.vue',
  'single-product-affiliate.html': 'product/affiliate.vue',
  'single-product-group.html': 'product/group.vue',
  'single-product-tabstyle-2.html': 'product/tabstyle-2.vue',
  'single-product-tabstyle-3.html': 'product/tabstyle-3.vue',
  'single-product-slider.html': 'product/slider.vue',
  'single-product-gallery-left.html': 'product/gallery-left.vue',
  'single-product-gallery-right.html': 'product/gallery-right.vue',
  'single-product-sticky-left.html': 'product/sticky-left.vue',
  'single-product-sticky-right.html': 'product/sticky-right.vue',
  'blog-grid-left-sidebar.html': 'blog/grid-left-sidebar.vue',
  'blog-grid-right-sidebar.html': 'blog/grid-right-sidebar.vue',
  'blog-list-left-sidebar.html': 'blog/list-left-sidebar.vue',
  'blog-list-right-sidebar.html': 'blog/list-right-sidebar.vue',
  'blog-single-left-sidebar.html': 'blog/single-left-sidebar.vue',
  'blog-single-right-sidebar.html': 'blog/single-right-sidebar.vue',
}

const hrefMap = Object.fromEntries(
  Object.entries(pageMap).map(([html, vue]) => {
    const route = vue
      .replace(/\.vue$/, '')
      .replace(/\/index$/, '')
      .replace(/^index$/, '')
    return [html, `/${route}`.replace(/\/$/, '/') === '//' ? '/' : `/${route}`.replace(/\/$/, '') || '/']
  }),
)

// Normalize homepage route
hrefMap['index.html'] = '/'

function convertHtml(fragment) {
  let s = fragment
  s = s.replace(/(href|src)="assets\//g, '$1="/assets/')
  s = s.replace(/url\(assets\//g, 'url(/assets/')
  s = s.replace(/url\('assets\//g, "url('/assets/")
  s = s.replace(/url\("assets\//g, 'url("/assets/')

  for (const [from, to] of Object.entries(hrefMap)) {
    const re = new RegExp(`href="${from.replace(/\./g, '\\.')}"`, 'g')
    s = s.replace(re, `href="${to}"`)
  }

  return s
}

function wrapSfc(body) {
  return `<template>\n${body}\n</template>\n`
}

function extractMainContent(html) {
  const lines = html.split(/\r?\n/)

  let start = -1
  let end = -1

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (start === -1 && line.includes('offcanvas-overlay')) {
      // content starts after overlay line
      start = i + 1
    }
    if (line.includes('<!-- Footer Area Start -->') || line.includes('Footer Area Start')) {
      end = i
      break
    }
  }

  if (start === -1 || end === -1 || end <= start) {
    // fallback: between </header> and Footer
    for (let i = 0; i < lines.length; i++) {
      if (start === -1 && lines[i].includes('Header Section End')) start = i + 1
      if (lines[i].includes('Footer Area Start')) {
        end = i
        break
      }
    }
  }

  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Could not locate main content bounds')
  }

  // Skip leading blank / comment-only noise but keep breadcrumb etc.
  return lines.slice(start, end).join('\n').trim()
}

let ok = 0
let failed = 0

for (const [htmlFile, vueRel] of Object.entries(pageMap)) {
  const src = path.join(themeDir, htmlFile)
  if (!fs.existsSync(src)) {
    console.warn(`skip missing ${htmlFile}`)
    failed++
    continue
  }

  try {
    const html = fs.readFileSync(src, 'utf8')
    const main = convertHtml(extractMainContent(html))
    const out = path.join(root, 'app/pages', vueRel)
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, wrapSfc(main))
    console.log(`ok  ${htmlFile} -> app/pages/${vueRel} (${main.length} chars)`)
    ok++
  } catch (err) {
    console.error(`fail ${htmlFile}: ${err.message}`)
    failed++
  }
}

console.log(`\nDone. ok=${ok} failed=${failed}`)
