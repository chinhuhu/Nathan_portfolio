const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const MAX_MB = Number(process.env.MAX_IMAGE_MB || 2);
const MAX_BYTES = MAX_MB * 1024 * 1024;
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']);

const formatMb = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

const collectFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (IMAGE_EXTENSIONS.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
};

if (!fs.existsSync(PUBLIC_DIR)) {
  console.error(`Missing public directory: ${PUBLIC_DIR}`);
  process.exit(1);
}

const violations = collectFiles(PUBLIC_DIR)
  .map((filePath) => {
    const stats = fs.statSync(filePath);
    return {
      file: path.relative(path.resolve(__dirname, '..'), filePath),
      sizeBytes: stats.size,
    };
  })
  .filter((item) => item.sizeBytes > MAX_BYTES)
  .sort((a, b) => b.sizeBytes - a.sizeBytes);

if (violations.length > 0) {
  console.error(`Image size check failed. Max allowed size is ${MAX_MB} MB.`);
  for (const item of violations) {
    console.error(`- ${item.file}: ${formatMb(item.sizeBytes)} MB`);
  }
  process.exit(1);
}

console.log(`Image size check passed. No files over ${MAX_MB} MB in public/.`);
