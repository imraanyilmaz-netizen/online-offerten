const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════════════
// Windows-1252 Mojibake Fixer
// Fixes double-encoded AND triple-encoded UTF-8 text
// that was corrupted by reading UTF-8 bytes as Windows-1252
// ═══════════════════════════════════════════════════════════════

const SKIP = new Set(['node_modules', '.next', '.git', 'dist', 'out', 'public', '.vercel']);
const EXTS = new Set(['.js', '.jsx', '.ts', '.tsx', '.json']);

// Windows-1252 byte → Unicode code point (bytes 0x80-0x9F)
const WIN1252 = {
  0x80: 0x20AC, 0x82: 0x201A, 0x83: 0x0192, 0x84: 0x201E,
  0x85: 0x2026, 0x86: 0x2020, 0x87: 0x2021, 0x88: 0x02C6,
  0x89: 0x2030, 0x8A: 0x0160, 0x8B: 0x2039, 0x8C: 0x0152,
  0x8E: 0x017D, 0x91: 0x2018, 0x92: 0x2019, 0x93: 0x201C,
  0x94: 0x201D, 0x95: 0x2022, 0x96: 0x2013, 0x97: 0x2014,
  0x98: 0x02DC, 0x99: 0x2122, 0x9A: 0x0161, 0x9B: 0x203A,
  0x9C: 0x0153, 0x9E: 0x017E, 0x9F: 0x0178,
};

function byteToUnicode(b) {
  return (b in WIN1252) ? WIN1252[b] : b;
}

// Simulate mojibake: UTF-8 string → read bytes as Win1252 → new string
function mojibake(str) {
  const buf = Buffer.from(str, 'utf8');
  let out = '';
  for (const b of buf) out += String.fromCodePoint(byteToUnicode(b));
  return out;
}

// Characters that appear in German/Swiss/French/Turkish text
const CHARS = [
  // German
  0xE4, 0xF6, 0xFC, 0xC4, 0xD6, 0xDC, 0xDF,
  // French/Italian (Swiss)
  0xE0, 0xE2, 0xE8, 0xE9, 0xEA, 0xEB, 0xEE, 0xF4, 0xF9, 0xFB,
  // Symbols
  0xBB, 0xAB, 0xB0, 0xB7, 0xA0,
  // Special punctuation (3-byte UTF-8)
  0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D,
  0x2022, 0x2026, 0x20AC, 0x2122, 0x2713,
  // Turkish (code comments)
  0x0131, 0x015F, 0x011F, 0x015E, 0x011E, 0x0130,
];

// Generate all replacement pairs
const replacements = [];

for (const cp of CHARS) {
  const original = String.fromCodePoint(cp);

  // Double-encoded
  const dbl = mojibake(original);
  if (dbl !== original && dbl.length > 1) {
    replacements.push([dbl, original]);

    // Triple-encoded (mojibake applied twice)
    const trpl = mojibake(dbl);
    if (trpl !== dbl && trpl.length > dbl.length) {
      replacements.push([trpl, original]);
    }
  }
}

// Sort longest first → triple patterns processed before double
replacements.sort((a, b) => b[0].length - a[0].length);

console.log(`Generated ${replacements.length} replacement patterns\n`);

// ═══════════════════════════════════════════
// Walk & fix files
// ═══════════════════════════════════════════

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, files);
    else if (EXTS.has(path.extname(e.name))) files.push(p);
  }
  return files;
}

// Quick mojibake detector
const MOJIBAKE_RE = /\u00C3[\u0080-\u00FF\u0152\u0153\u0160\u0161\u0178\u017D\u017E\u0192\u2013\u2014\u2018\u2019\u201A\u201C\u201D\u201E\u2022\u20AC\u2122]|\u00E2\u20AC|\u00C2[\u00A0-\u00BF]|\u00C3\u0192|\u00C4[\u00B1\u0082]/;

let fixed = 0;
const files = walk(process.cwd());

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  if (!MOJIBAKE_RE.test(content)) continue;

  let changed = false;
  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.replaceAll(from, to);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    fixed++;
    console.log('Fixed:', path.relative(process.cwd(), file));
  }
}

console.log(`\nDone! Fixed ${fixed} files.`);

