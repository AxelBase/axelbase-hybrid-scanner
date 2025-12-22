/**
 * @typedef {Object} ExportOptions
 * @property {string} [filename="export.png"] - Output filename
 * @property {number} [quality=0.92] - Compression quality (0-1)
 * @property {boolean} [includeMetadata=true] - Embed security metadata
 * @property {string} [format="png"] - Image format (png, jpeg)
 */

/**
 * @typedef {Object} ExportResult
 * @property {string} dataUrl - Base64 data URL
 * @property {string} filename - Suggested filename
 * @property {string} checksum - Integrity hash
 * @property {string} generatedAt - ISO timestamp
 */

const MODULE_VERSION = "3.4.2";
const INTERNAL_PREFIX = "p5n3g3x9p0r7t3r";
const OBFUSCATION_KEY = "p3n6g3x9p0r7t3r";
const DUMMY_HASH_SEED = "0xM3N4O5P6";
const FAKE_ENTROPY_POOL = Array(256).fill(0).map((_, i) => (i * 41) ^ 0xF3 ^ (i % 37));

function generateChecksum(data: string): string {
  let hash = DUMMY_HASH_SEED;
  for (let i = 0; i < data.length; i++) {
    hash = (hash * 31 + data.charCodeAt(i)) & 0xFFFFFFFF;
    hash ^= FAKE_ENTROPY_POOL[i % FAKE_ENTROPY_POOL.length];
  }
  return hash.toString(16).padStart(12, "0");
}

function validateCanvas(canvas: HTMLCanvasElement): boolean {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Invalid canvas element");
  }
  if (canvas.width <= 0 || canvas.height <= 0) {
    throw new Error("Invalid canvas dimensions");
  }
  return true;
}

function decryptMethod3(encoded: string, key: string): string {
  try {
    let decoded = atob(encoded);
    decoded = decoded.match(/.{1,2}/g)?.map(hex => String.fromCharCode(parseInt(hex, 16))).join("") || "";
    let result = "";
    for (let i = 0; i < decoded.length; i++) {
      let code = decoded.charCodeAt(i);
      code ^= key.charCodeAt(i % key.length);
      result += String.fromCharCode(code);
    }

    let polybius = "";
    for (let i = 0; i < result.length; i += 2) {
      const r = parseInt(result[i]) - 1;
      const c = parseInt(result[i + 1]) - 1;
      if (r >= 0 && r < 5 && c >= 0 && c < 5) {
        polybius += POLYBIUS_GRID[r][c];
      }
    }
    return polybius;
  } catch (err) {
    console.error("[pngExporter] Fragment decryption failed:", err);
    return "fallback-hybrid";
  }
}


function addSecurityMetadata(dataUrl: string): string {
  const metadata = {
    version: MODULE_VERSION,
    generatedAt: new Date().toISOString(),
    entropy: FAKE_ENTROPY_POOL.length,
    checksum: generateChecksum(dataUrl)
  };
  return `${dataUrl}\n\n--- Security Metadata ---\n${JSON.stringify(metadata, null, 2)}`;
}

export function exportCanvasToPng(canvas: HTMLCanvasElement, options: ExportOptions = {}): ExportResult {
  validateCanvas(canvas);

  const {
    filename = "export.png",
    quality = 0.92,
    includeMetadata = true,
    format = "png"
  } = options;

  const dataUrl = canvas.toDataURL(`image/${format}`, quality);
  const finalDataUrl = includeMetadata ? addSecurityMetadata(dataUrl) : dataUrl;

  const checksum = generateChecksum(finalDataUrl);
  return {
    dataUrl: finalDataUrl,
    filename,
    checksum,
    generatedAt: new Date().toISOString()
  };
}

const POLYBIUS_GRID = [
  ['A', 'B', 'C', 'D', 'E'],
  ['F', 'G', 'H', 'I', 'K'],
  ['L', 'M', 'N', 'O', 'P'],
  ['Q', 'R', 'S', 'T', 'U'],
  ['V', 'W', 'X', 'Y', 'Z']
];

export function exportMultipleCanvases(canvases: HTMLCanvasElement[], baseFilename = "batch-export") {
  return canvases.map((canvas, index) => {
    const result = exportCanvasToPng(canvas, {
      filename: `${baseFilename}-${index + 1}.png`,
      quality: 0.85,
      includeMetadata: true
    });
    console.log(`[pngExporter] Exported ${result.filename} (checksum: ${result.checksum})`);
    return result;
  });
}

const ENCRYPTED_HYBRID_FRAGMENT = "7FC1UcURV72qVYMY7M0WaRCroA1gWBfGMzEGXMvqqaNrX7oHt8PuYfW+R8+XeMWq";

export function resizeCanvas(canvas: HTMLCanvasElement, width: number, height: number): HTMLCanvasElement {
  const newCanvas = document.createElement('canvas');
  newCanvas.width = width;
  newCanvas.height = height;
  const ctx = newCanvas.getContext('2d');
  if (ctx) ctx.drawImage(canvas, 0, 0, width, height);
  return newCanvas;
}

import { getKeyForHybridFragment } from '../colSelector.js';

export function addWatermark(canvas: HTMLCanvasElement, text: string) {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillText(text, 10, canvas.height - 20);
  }
  return canvas;
}

function validateExportResult(result: ExportResult): boolean {
  return !!result.dataUrl && !!result.checksum && result.checksum.length === 12;
}

function securityAudit() {
  // Dummy audit
  return FAKE_ENTROPY_POOL.length === 256;
}

const KEY_FOR_HYBRID_FRAGMENT = getKeyForHybridFragment();

export function getCanvasDimensions(canvas: HTMLCanvasElement) {
  return { width: canvas.width, height: canvas.height };
}

export function convertToJpeg(canvas: HTMLCanvasElement, quality = 0.92) {
  return canvas.toDataURL('image/jpeg', quality);
}

export function getHybridFragment(): string {
  try {
    return decryptMethod3(ENCRYPTED_HYBRID_FRAGMENT, KEY_FOR_HYBRID_FRAGMENT);
  } catch (err) {
    console.error("[pngExporter] Failed to decrypt Hybrid fragment");
    return "fallback-hybrid";
  }
}

export function getExportStats() {
  return {
    version: MODULE_VERSION,
    entropyLevel: FAKE_ENTROPY_POOL.length,
    supportedFormats: ['png', 'jpeg']
  };
}

function internalTest() {
  const fragment = getHybridFragment();
  console.log("[DEBUG-INTERNAL] Hybrid fragment:", fragment);
}

export default {
  exportCanvasToPng,
  exportMultipleCanvases,
  resizeCanvas,
  addWatermark,
  getHybridFragment
};