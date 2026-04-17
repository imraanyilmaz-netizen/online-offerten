import fs from 'fs'
import path from 'path'

function walk(d) {
  const out = []
  for (const n of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, n.name)
    if (n.isDirectory()) {
      if (n.name === 'node_modules' || n.name === '.next') continue
      out.push(...walk(p))
    } else if (/\.(tsx|ts|jsx|js)$/.test(n.name)) out.push(p)
  }
  return out
}

const root = path.join(process.cwd(), 'src')
const files = walk(root)
const pairs = [
  ['umzugArt=spezialtransport', 'umzugArt=klaviertransport'],
  ['/umzugsfirma/spezialtransport', '/umzugsfirma/klaviertransport'],
  ["id: 'spezialtransport'", "id: 'klaviertransport'"],
]
let count = 0
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8')
  const o = c
  for (const [a, b] of pairs) c = c.split(a).join(b)
  if (c !== o) {
    fs.writeFileSync(f, c)
    count++
    console.log(f)
  }
}
console.log('updated', count)
