const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const SOURCE_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx']);

const toPosixPath = (filePath) => filePath.replace(/\\/g, '/');

const collectFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath));
      continue;
    }

    if (SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
};

const lineNumberAt = (text, index) => text.slice(0, index).split(/\r\n|\r|\n/).length;

const normalizeAssetName = (value) => {
  const withoutQuery = value.trim().split(/[?#]/)[0].replace(/\\/g, '/').replace(/^\/+/, '');

  try {
    return decodeURIComponent(withoutQuery);
  } catch {
    return withoutQuery;
  }
};

const isExternalReference = (assetName) => /^[a-z][a-z0-9+.-]*:\/\//i.test(assetName) || assetName.startsWith('//');

const addReference = (references, sourceFile, text, index, assetName, kind) => {
  const normalizedAsset = normalizeAssetName(assetName);

  if (!normalizedAsset || normalizedAsset.includes('${') || isExternalReference(normalizedAsset)) {
    return;
  }

  references.push({
    asset: normalizedAsset,
    kind,
    line: lineNumberAt(text, index),
    source: toPosixPath(path.relative(ROOT_DIR, sourceFile)),
  });
};

const getResolvedAssetPath = (assetName) => {
  const resolvedPath = path.resolve(PUBLIC_DIR, assetName);
  const publicRoot = PUBLIC_DIR.endsWith(path.sep) ? PUBLIC_DIR : `${PUBLIC_DIR}${path.sep}`;

  if (resolvedPath !== PUBLIC_DIR && !resolvedPath.startsWith(publicRoot)) {
    return { invalid: true, resolvedPath };
  }

  return { invalid: false, resolvedPath };
};

const isInsideRange = (index, ranges) =>
  ranges.some(([start, end]) => index >= start && index < end);

if (!fs.existsSync(SRC_DIR)) {
  console.error(`Missing source directory: ${SRC_DIR}`);
  process.exit(1);
}

if (!fs.existsSync(PUBLIC_DIR)) {
  console.error(`Missing public directory: ${PUBLIC_DIR}`);
  process.exit(1);
}

const references = [];
const unsupportedDynamicReferences = [];

for (const sourceFile of collectFiles(SRC_DIR)) {
  const text = fs.readFileSync(sourceFile, 'utf8');
  const recognizedDynamicRanges = [];

  const numberedAssetPattern =
    /Array\.from\(\s*\{\s*length:\s*(\d+)\s*\}\s*,\s*\(\s*[^,]*,\s*(\w+)\s*\)\s*=>\s*asset\(\s*`([^`]*)\$\{\s*\2\s*\+\s*(\d+)\s*\}([^`]*)`\s*\)\s*\)/gs;
  let match;

  while ((match = numberedAssetPattern.exec(text)) !== null) {
    recognizedDynamicRanges.push([match.index, match.index + match[0].length]);

    const length = Number(match[1]);
    const offset = Number(match[4]);
    const prefix = match[3];
    const suffix = match[5];

    for (let number = offset; number < offset + length; number += 1) {
      addReference(references, sourceFile, text, match.index, `${prefix}${number}${suffix}`, 'numbered asset()');
    }
  }

  const staticAssetPattern = /\basset\(\s*(['"])([^'"]+)\1\s*\)/g;
  while ((match = staticAssetPattern.exec(text)) !== null) {
    addReference(references, sourceFile, text, match.index, match[2], 'asset()');
  }

  const publicUrlPattern = /\$\{process\.env\.PUBLIC_URL\}\/([^`"'<>)}\]\s$]+)/g;
  while ((match = publicUrlPattern.exec(text)) !== null) {
    addReference(references, sourceFile, text, match.index, match[1], 'PUBLIC_URL');
  }

  const dynamicAssetPattern = /\basset\(\s*`([^`]*\$\{[^`]+}[^`]*)`\s*\)/g;
  while ((match = dynamicAssetPattern.exec(text)) !== null) {
    if (isInsideRange(match.index, recognizedDynamicRanges)) {
      continue;
    }

    unsupportedDynamicReferences.push({
      line: lineNumberAt(text, match.index),
      source: toPosixPath(path.relative(ROOT_DIR, sourceFile)),
      value: match[1],
    });
  }
}

const invalidReferences = [];
const missingReferences = [];

for (const reference of references) {
  const { invalid, resolvedPath } = getResolvedAssetPath(reference.asset);

  if (invalid) {
    invalidReferences.push(reference);
    continue;
  }

  if (!fs.existsSync(resolvedPath) || !fs.statSync(resolvedPath).isFile()) {
    missingReferences.push(reference);
  }
}

if (unsupportedDynamicReferences.length > 0) {
  console.error('Unsupported dynamic public asset references found.');
  console.error('Use static asset references or extend scripts/check-public-assets.js for the new pattern.');
  for (const reference of unsupportedDynamicReferences) {
    console.error(`- ${reference.source}:${reference.line} -> asset(\`${reference.value}\`)`);
  }
  process.exit(1);
}

if (invalidReferences.length > 0) {
  console.error('Invalid public asset references found.');
  for (const reference of invalidReferences) {
    console.error(`- ${reference.source}:${reference.line} -> public/${reference.asset} (${reference.kind})`);
  }
  process.exit(1);
}

if (missingReferences.length > 0) {
  console.error('Missing public asset references found.');
  for (const reference of missingReferences) {
    console.error(`- ${reference.source}:${reference.line} -> public/${reference.asset} (${reference.kind})`);
  }
  process.exit(1);
}

console.log(`Public asset reference check passed. ${references.length} references validated.`);
