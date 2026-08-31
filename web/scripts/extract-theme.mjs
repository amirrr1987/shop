import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const html = fs.readFileSync(path.join(root, 'theme/index.html'), 'utf8')
const lines = html.split(/\r?\n/)

function sliceLines(start, end) {
  return lines.slice(start - 1, end).join('\n')
}

const pageMap = {
  'index.html': '/',
  'index-2.html': '/home-2',
  'index-3.html': '/home-3',
  'index-4.html': '/home-4',
  'about.html': '/about',
  'cart.html': '/cart',
  'checkout.html': '/checkout',
  'compare.html': '/compare',
  'login.html': '/login',
  'my-account.html': '/my-account',
  'wishlist.html': '/wishlist',
  'thank-you-page.html': '/thank-you',
  'contact.html': '/contact',
  'shop-3-column.html': '/shop/3-column',
  'shop-4-column.html': '/shop/4-column',
  'shop-left-sidebar.html': '/shop/left-sidebar',
  'shop-right-sidebar.html': '/shop/right-sidebar',
  'shop-list.html': '/shop/list',
  'shop-list-left-sidebar.html': '/shop/list-left-sidebar',
  'shop-list-right-sidebar.html': '/shop/list-right-sidebar',
  'single-product.html': '/product',
  'single-product-variable.html': '/product/variable',
  'single-product-affiliate.html': '/product/affiliate',
  'single-product-group.html': '/product/group',
  'single-product-tabstyle-2.html': '/product/tabstyle-2',
  'single-product-tabstyle-3.html': '/product/tabstyle-3',
  'single-product-slider.html': '/product/slider',
  'single-product-gallery-left.html': '/product/gallery-left',
  'single-product-gallery-right.html': '/product/gallery-right',
  'single-product-sticky-left.html': '/product/sticky-left',
  'single-product-sticky-right.html': '/product/sticky-right',
  'blog-grid-left-sidebar.html': '/blog/grid-left-sidebar',
  'blog-grid-right-sidebar.html': '/blog/grid-right-sidebar',
  'blog-list-left-sidebar.html': '/blog/list-left-sidebar',
  'blog-list-right-sidebar.html': '/blog/list-right-sidebar',
  'blog-single-left-sidebar.html': '/blog/single-left-sidebar',
  'blog-single-right-sidebar.html': '/blog/single-right-sidebar',
}

function convertHtml(fragment) {
  let s = fragment
  s = s.replace(/(href|src)="assets\//g, '$1="/assets/')
  s = s.replace(/url\(assets\//g, 'url(/assets/')
  s = s.replace(/url\('assets\//g, "url('/assets/")
  s = s.replace(/url\("assets\//g, 'url("/assets/')

  for (const [from, to] of Object.entries(pageMap)) {
    const re = new RegExp(`href="${from.replace(/\./g, '\\.')}"`, 'g')
    s = s.replace(re, `href="${to}"`)
  }

  return s
}

function wrapSfc(body) {
  return `<template>\n${body}\n</template>\n`
}

const header = convertHtml(`${sliceLines(42, 458)}\n${sliceLines(461, 1025)}`)
const home = convertHtml(sliceLines(1027, 7652))
const footer = convertHtml(sliceLines(7653, 7770))
const modal = convertHtml(sliceLines(7772, 7888))

const outs = {
  'app/components/AppHeader.vue': wrapSfc(header),
  'app/components/AppFooter.vue': wrapSfc(footer),
  'app/components/AppProductModal.vue': wrapSfc(modal),
  'app/pages/index.vue': wrapSfc(home),
}

for (const [rel, content] of Object.entries(outs)) {
  const full = path.join(root, rel)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, content)
  console.log(`wrote ${rel} (${content.length} chars)`)
}
