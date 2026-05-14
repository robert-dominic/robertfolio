import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const STATIC_DIR = './static/images';
const QUALITY = 82;

const RESIZE_MAP = {
  'image-1': { width: 200, height: 200 },
  'image-2': { width: 600, height: 600 },
  'image-3': { width: 600, height: 900 },
};
const PROJECT_MAX_WIDTH = 900;
const SKIP_FILES = new Set(['placeholder.jpg']);

async function convertToWebP(inputPath, outputPath, resizeOpts) {
  const img = sharp(inputPath).webp({ quality: QUALITY });
  if (resizeOpts) {
    img.resize(resizeOpts.width, resizeOpts.height, { fit: 'inside', withoutEnlargement: true });
  }
  await img.toFile(outputPath);
  const inSize = (await stat(inputPath)).size;
  const outSize = (await stat(outputPath)).size;
  const saving = (((inSize - outSize) / inSize) * 100).toFixed(1);
  console.log(`  ${basename(inputPath)} → ${basename(outputPath)}  ${(inSize/1024).toFixed(0)}KB → ${(outSize/1024).toFixed(0)}KB  (-${saving}%)`);
}

async function processDir(dir, isPhotos) {
  const files = await readdir(dir);
  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
    if (SKIP_FILES.has(file)) continue;
    const name = basename(file, ext);
    const input = join(dir, file);
    const output = join(dir, `${name}.webp`);
    const resize = isPhotos
      ? RESIZE_MAP[name]
      : { width: PROJECT_MAX_WIDTH, height: Math.round(PROJECT_MAX_WIDTH * 0.6), ...RESIZE_MAP[name] };
    await convertToWebP(input, output, isPhotos ? resize : { width: PROJECT_MAX_WIDTH });
  }
}

console.log('\nPhotos:');
await processDir(join(STATIC_DIR, 'photos'), true);
console.log('\nProjects:');
await processDir(join(STATIC_DIR, 'projects'), false);
console.log('\nDone.');
