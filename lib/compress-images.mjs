import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const TARGET_MAX_BYTES = 950 * 1024; // ~950KB to stay safely under 1MB
const PUBLIC_DIR = 'public';

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllImages(fullPath)));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const s = await stat(fullPath);
        if (s.size > TARGET_MAX_BYTES) {
          files.push({ path: fullPath, size: s.size });
        }
      }
    }
  }
  return files;
}

async function compressImage(filePath, originalSize) {
  const ext = extname(filePath).toLowerCase();
  const tempPath = filePath + '.tmp';

  try {
    const metadata = await sharp(filePath).metadata();
    const { width, height } = metadata;

    // Strategy: progressively reduce quality, then resize if needed
    // Start with high quality and work down
    const qualities = [92, 85, 80, 75, 70,];
    const maxWidths = [null, null, null, null, 2400, 2000]; // resize only at lower qualities

    for (let i = 0; i < qualities.length; i++) {
      const quality = qualities[i];
      const maxWidth = maxWidths[i];

      let pipeline = sharp(filePath);

      // Resize if width exceeds maxWidth threshold (only for very stubborn large files)
      if (maxWidth && width > maxWidth) {
        pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
      }

      if (ext === '.png') {
        // Convert PNG to high-quality JPEG (much smaller)
        await pipeline
          .jpeg({ quality, mozjpeg: true, chromaSubsampling: '4:4:4' })
          .toFile(tempPath);
      } else {
        await pipeline
          .jpeg({ quality, mozjpeg: true, chromaSubsampling: quality >= 85 ? '4:4:4' : '4:2:0' })
          .toFile(tempPath);
      }

      const newStat = await stat(tempPath);
      if (newStat.size <= TARGET_MAX_BYTES) {
        // Success - replace original
        await unlink(filePath);

        // If PNG was converted to JPEG, rename accordingly
        if (ext === '.png') {
          const newPath = filePath.replace(/\.png$/i, '.jpg');
          await rename(tempPath, newPath);
          console.log(`  ✓ ${basename(filePath)} → ${basename(newPath)}: ${fmt(originalSize)} → ${fmt(newStat.size)} (q${quality})`);
        } else {
          await rename(tempPath, filePath);
          console.log(`  ✓ ${basename(filePath)}: ${fmt(originalSize)} → ${fmt(newStat.size)} (q${quality})`);
        }
        return { success: true, saved: originalSize - newStat.size };
      }
    }

    // Last resort: resize more aggressively
    let pipeline = sharp(filePath).resize(1920, null, { withoutEnlargement: true });
    await pipeline.jpeg({ quality: 70, mozjpeg: true }).toFile(tempPath);
    const finalStat = await stat(tempPath);

    await unlink(filePath);
    if (ext === '.png') {
      const newPath = filePath.replace(/\.png$/i, '.jpg');
      await rename(tempPath, newPath);
      console.log(`  ✓ ${basename(filePath)} → ${basename(newPath)}: ${fmt(originalSize)} → ${fmt(finalStat.size)} (resized+q70)`);
    } else {
      await rename(tempPath, filePath);
      console.log(`  ✓ ${basename(filePath)}: ${fmt(originalSize)} → ${fmt(finalStat.size)} (resized+q70)`);
    }
    return { success: true, saved: originalSize - finalStat.size };

  } catch (err) {
    // Cleanup temp file if it exists
    try { await unlink(tempPath); } catch {}
    console.error(`  ✗ ${basename(filePath)}: ${err.message}`);
    return { success: false, saved: 0 };
  }
}

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
  return (bytes / 1024).toFixed(0) + 'KB';
}

async function main() {
  console.log('Scanning for images > 950KB in public/...\n');
  const images = await getAllImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images to compress.\n`);

  let totalSaved = 0;
  let successCount = 0;

  for (const img of images) {
    const result = await compressImage(img.path, img.size);
    if (result.success) {
      totalSaved += result.saved;
      successCount++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Compressed ${successCount}/${images.length} images`);
  console.log(`Total saved: ${fmt(totalSaved)}`);
  console.log(`========================================`);
}

main();
