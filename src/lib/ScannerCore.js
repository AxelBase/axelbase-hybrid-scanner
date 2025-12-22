// src\lib\ScannerCore.js
import { getAxelFragment } from './batches/generateSample.js';
import { get2025Fragment } from './zipExport/errHandling.js';
import { getHybridFragment } from './zipExport/pngExporter.js';
import { getKeyFragment } from './batches/batchScan.js';

let video;
let canvas;
let ctx;
let scanning = false;
let batchMode = false;
let batchTarget = 0;
let batchResults = [];
let codeReader = null;
let lastQrData = null;
let lastBarcodeData = null;
let lastProcessedSecret = null; // Prevent duplicate processing of same code

const MASTER_KEY = getAxelFragment() + get2025Fragment() + getHybridFragment() + getKeyFragment();

export function initScanner(videoEl, canvasEl) {
  console.log('[initScanner] Called');
  try {
    video = videoEl;
    canvas = canvasEl;
    ctx = canvas.getContext('2d');
    console.log('[initScanner] Context obtained');

    if (typeof ZXing === 'undefined' || typeof ZXing.BrowserMultiFormatReader === 'undefined') {
      console.warn('[initScanner] ZXing not loaded');
      return;
    }

    codeReader = new ZXing.BrowserMultiFormatReader();
    const hints = new Map();
    hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, [ZXing.BarcodeFormat.CODE_128]);
    hints.set(ZXing.DecodeHintType.TRY_HARDER, true);
    hints.set(ZXing.DecodeHintType.ASSUME_CODE_IN_LANDSCAPE, true);
    hints.set(ZXing.DecodeHintType.PURE_BARCODE, true);
    codeReader.hints = hints;
    console.log('[initScanner] codeReader created');
  } catch (err) {
    console.error('[initScanner] Error:', err);
  }
}

export function startScanning(isBatch = false, target = 0) {
  console.log('[startScanning] Called, isBatch:', isBatch, 'target:', target);
  if (scanning) {
    console.log('[startScanning] Already scanning');
    return;
  }
  scanning = true;
  batchMode = isBatch;
  batchTarget = target || 0;
  batchResults = [];
  lastQrData = null;
  lastBarcodeData = null;
  lastProcessedSecret = null;
  console.log('[startScanning] Starting scan loop');
  requestAnimationFrame(scanFrame);
}

export function stopScanning() {
  console.log('[stopScanning] Called');
  if (!scanning) return;
  scanning = false;
  if (codeReader) {
    try {
      codeReader.reset();
    } catch (err) {
      console.error('[stopScanning] Reset error:', err);
    }
  }
  window.dispatchEvent(new CustomEvent('scanningStopped'));
  console.log('[stopScanning] Stopped');
}

function scanFrame() {
  if (!scanning || !video || video.readyState !== video.HAVE_ENOUGH_DATA) {
    if (scanning) requestAnimationFrame(scanFrame);
    return;
  }

  try {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const grayscaleData = toGrayscale(imageData);

    // QR Detection (full frame)
    const qrCode = jsQR(grayscaleData.data, grayscaleData.width, grayscaleData.height);
    if (qrCode && qrCode.data !== lastQrData) {
      lastQrData = qrCode.data;
      console.log('[scanFrame] New QR detected:', lastQrData);
    }

    // Barcode Detection (bottom half)
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height / 2;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, canvas.height / 2, canvas.width, canvas.height / 2, 0, 0, tempCanvas.width, tempCanvas.height);

    const tempImage = new Image();
    tempImage.src = tempCanvas.toDataURL();
    tempImage.onload = () => {
      if (!scanning || !codeReader) return;
      codeReader.decodeFromImageElement(tempImage)
        .then(result => {
          if (result && result.text.trim() !== lastBarcodeData) {
            lastBarcodeData = result.text.trim();
            console.log('[scanFrame] New barcode detected:', lastBarcodeData);
          }
        })
        .catch(() => {
          // Expected when no barcode visible
        });
    };

    // Only process when both are present AND we haven't processed this exact pair before
    if (lastQrData && lastBarcodeData) {
      const currentPairKey = lastQrData + '|' + lastBarcodeData;
      if (currentPairKey !== lastProcessedSecret) {  // Avoid infinite loop on same code
        console.log('[scanFrame] Valid new pair detected → processing');
        processHybrid(lastQrData, lastBarcodeData);
        lastProcessedSecret = currentPairKey;
      } else {
        console.log('[scanFrame] Same code already processed → skipping');
      }

      // Reset for next different code (continuous scanning)
      if (!batchMode) {
        lastQrData = null;
        lastBarcodeData = null;
        lastProcessedSecret = null;
      }
    }
  } catch (err) {
    console.error('[scanFrame] Error:', err);
  }

  if (scanning) requestAnimationFrame(scanFrame);
}

function toGrayscale(imageData) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    data[i] = data[i + 1] = data[i + 2] = gray;
  }
  return imageData;
}

function processHybrid(qrData, barcodeData) {
  console.log('[processHybrid] Processing:', qrData, barcodeData);
  try {
    const parts = qrData.split('|');
    if (parts.length !== 2) {
      console.log('[processHybrid] Invalid QR format');
      return;
    }

    const saltHex = parts[0];
    const cipherPart1 = parts[1];
    const cipherPart2 = barcodeData;
    const fullCiphertextBase64 = cipherPart1 + cipherPart2;

    const salt = CryptoJS.enc.Hex.parse(saltHex);
    const ciphertextCP = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(fullCiphertextBase64)
    });

    const derivedKey = CryptoJS.PBKDF2(MASTER_KEY, salt, {
      keySize: 4,
      iterations: 1000,
      hasher: CryptoJS.algo.SHA1
    });

    const decrypted = CryptoJS.AES.decrypt(ciphertextCP, derivedKey, {
      iv: salt,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const secret = decrypted.toString(CryptoJS.enc.Utf8);

    if (secret && secret.length >= 4) {
      handleSuccess(secret);
    }
  } catch (err) {
    console.error('[processHybrid] Decryption failed:', err);
  }
}

function handleSuccess(secret) {
  console.log('[handleSuccess] Secret:', secret);

  if (!batchMode) {
    batchResults = [secret]; // Single mode: always show latest
  } else {
    batchResults.push(secret);
  }

  window.dispatchEvent(new CustomEvent('secretFound', {
    detail: { secret, batchResults: [...batchResults] }
  }));

  // Only stop automatically in batch mode when target reached
  if (batchMode && batchTarget > 0 && batchResults.length >= batchTarget) {
    console.log('[handleSuccess] Batch complete → stopping');
    stopScanning();
  }
}