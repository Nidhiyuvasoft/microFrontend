const fs = require('fs');
const path = require('path');
const strip = require('strip-comments');

const ROOT = process.cwd();
const TARGETS = [
  path.join(ROOT, 'src'),
  path.join(ROOT, 'tailwind.config.js'),
  path.join(ROOT, 'vite.config.mjs'),
  path.join(ROOT, 'postcss.config.js'),
];

const ALLOWED_EXTS = new Set(['.js', '.jsx', '.ts', '.tsx']);

function isFile(p) {
  try { return fs.statSync(p).isFile(); } catch { return false; }
}

function isDir(p) {
  try { return fs.statSync(p).isDirectory(); } catch { return false; }
}

function listFilesRecursive(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFilesRecursive(full));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

function stripJsxCurlyComments(source) {
  // Remove JSX curly comments entirely, including the surrounding braces
  return source.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
}

function stripAllComments(source, ext) {
  const pre = stripJsxCurlyComments(source);
  const lang = ext === '.ts' || ext === '.tsx' ? 'typescript' : 'javascript';
  return strip(pre, { language: lang });
}

function processFile(filePath) {
  const ext = path.extname(filePath);
  if (!ALLOWED_EXTS.has(ext)) return { processed: false };
  const original = fs.readFileSync(filePath, 'utf8');
  const without = stripAllComments(original, ext);
  if (without !== original) {
    fs.writeFileSync(filePath, without, 'utf8');
    return { processed: true };
  }
  return { processed: false };
}

function main() {
  let count = 0;
  for (const target of TARGETS) {
    if (isDir(target)) {
      const files = listFilesRecursive(target);
      for (const f of files) {
        const res = processFile(f);
        if (res.processed) count++;
      }
    } else if (isFile(target)) {
      const res = processFile(target);
      if (res.processed) count++;
    }
  }
  console.log(`[remove-comments] Updated files: ${count}`);
}

main();


