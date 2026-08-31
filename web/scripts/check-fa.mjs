import fs from 'node:fs'

const s = fs.readFileSync('theme/index.html', 'utf8')
console.log('html tag:', (s.match(/<html[^>]*>/) || [])[0])
console.log('has persian:', /[\u0600-\u06FF]/.test(s))
console.log('sample:', (s.match(/[\u0600-\u06FF][^<\n]{0,50}/) || [])[0])
console.log('rtl mentions:', [...s.matchAll(/rtl|direction\s*:\s*rtl|dir=/gi)].slice(0, 10).map(m => m[0]))

const css = fs.readFileSync('theme/assets/css/style.min.css', 'utf8')
console.log('css rtl:', /direction\s*:\s*rtl|\[dir=rtl\]|\.rtl/i.test(css))
console.log('css persian font:', /Vazir|IRANSans|Yekan|Shabnam|Dana/i.test(css))

const header = fs.readFileSync('app/components/AppHeader.vue', 'utf8')
console.log('header sample:', (header.match(/[\u0600-\u06FF][^<\n]{0,50}/) || [])[0])
