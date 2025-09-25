import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from '@babel/parser';
import generate from '@babel/generator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

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

function babelStrip(source, ext) {
  const isTS = ext === '.ts' || ext === '.tsx';
  const isJSX = ext === '.jsx' || ext === '.tsx' || /React/.test(source);
  const plugins = [
    'classProperties',
    'classPrivateProperties',
    'classPrivateMethods',
    'dynamicImport',
    'importMeta',
    'topLevelAwait',
    isJSX && 'jsx',
    isTS && 'typescript',
  ].filter(Boolean);

  const ast = parse(source, {
    sourceType: 'module',
    allowReturnOutsideFunction: true,
    plugins,
  });

  const { code } = generate.default ? generate.default(ast, {
    comments: false,
    retainLines: true,
  }, source) : generate(ast, { comments: false, retainLines: true }, source);

  // Also remove JSX curly comments that are not represented in AST output
  return code.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
}

function processFile(filePath) {
  const ext = path.extname(filePath);
  if (!ALLOWED_EXTS.has(ext)) return false;
  const original = fs.readFileSync(filePath, 'utf8');
  let without;
  try {
    without = babelStrip(original, ext);
  } catch (e) {
    // If parsing fails, fall back to removing only JSX curly comments
    without = original.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  }
  if (without !== original) {
    fs.writeFileSync(filePath, without, 'utf8');
    return true;
  }
  return false;
}

function main() {
  let count = 0;
  for (const target of TARGETS) {
    if (isDir(target)) {
      const files = listFilesRecursive(target);
      for (const f of files) {
        if (processFile(f)) count++;
      }
    } else if (isFile(target)) {
      if (processFile(target)) count++;
    }
  }
  console.log(`[remove-comments] Updated files: ${count}`);
}

main();


