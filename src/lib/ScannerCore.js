// src/lib/ScannerCore.js

import { getAxelFragment } from './batches/generateSample.js';
import { get2025Fragment } from './zipExport/errHandling.js';
import { getHybridFragment } from './zipExport/pngExporter.js';
import { getKeyFragment } from './batches/batchScan.js';

console.log('[ScannerCore] module loaded');

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
let lastProcessedSecret = null;

/* -----------------------------
   MASTER KEY INITIALIZATION
------------------------------ */
let MASTER_KEY = '';

try {
  MASTER_KEY =
    getAxelFragment() +
    get2025Fragment() +
    getHybridFragment() +
    getKeyFragment();

  console.log('[ScannerCore] MASTER_KEY initialized');
} catch (err) {
  console.error('[ScannerCore] MASTER_KEY init failed', err);
}

/* -----------------------------
   INITIALIZE SCANNER
------------------------------ */
export function initScanner(videoEl, canvasEl) {
  try {
    console.log('[ScannerCore] initScanner called');

    video = videoEl;
    canvas = canvasEl;
    ctx = canvas.getContext('2d');

    if (typeof window === 'undefined') {
      console.warn('[ScannerCore] window undefined (SSR)');
      return;
    }

    if (!window.ZXing || !ZXing.BrowserMultiFormatReader) {
      console.warn('[ScannerCore] ZXing not available');
      return;
    }

    codeReader = new ZXing.BrowserMultiFormatReader();

    const hints = new Map();
    hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, [ZXing.BarcodeFormat.CODE_128]);
    hints.set(ZXing.DecodeHintType.TRY_HARDER, true);
    hints.set(ZXing.DecodeHintType.ASSUME_CODE_IN_LANDSCAPE, true);
    hints.set(ZXing.DecodeHintType.PURE_BARCODE, true);

    codeReader.hints = hints;

    console.log('[ScannerCore] ZXing reader ready');
  } catch (err) {
    console.error('[ScannerCore] initScanner error', err);
  }
}

/* -----------------------------
   START / STOP
------------------------------ */
export function startScanning(isBatch = false, target = 0) {
  if (scanning) return;

  try {
    scanning = true;
    batchMode = isBatch;
    batchTarget = target || 0;
    batchResults = [];
    lastQrData = null;
    lastBarcodeData = null;
    lastProcessedSecret = null;

    console.log('[ScannerCore] scanning started', {
      batchMode,
      batchTarget
    });

    requestAnimationFrame(scanFrame);
  } catch (err) {
    console.error('[ScannerCore] startScanning failed', err);
  }
}

export function stopScanning() {
  if (!scanning) return;

  try {
    scanning = false;

    if (codeReader) {
      try {
        codeReader.reset();
      } catch (_) {}
    }

    console.log('[ScannerCore] scanning stopped');

    window.dispatchEvent(new CustomEvent('scanningStopped'));
  } catch (err) {
    console.error('[ScannerCore] stopScanning error', err);
  }
}

/* -----------------------------
   MAIN SCAN LOOP
------------------------------ */
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

    /* ---- QR ---- */
    if (window.jsQR) {
      const qrCode = jsQR(
        grayscaleData.data,
        grayscaleData.width,
        grayscaleData.height
      );

      if (qrCode && qrCode.data !== lastQrData) {
        lastQrData = qrCode.data;
        console.log('[ScannerCore] QR detected');
      }
    }

    /* ---- BARCODE (lower half) ---- */
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height / 2;

    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(
      canvas,
      0,
      canvas.height / 2,
      canvas.width,
      canvas.height / 2,
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
    );

    const tempImage = new Image();
    tempImage.src = tempCanvas.toDataURL();

    tempImage.onload = () => {
      if (!scanning || !codeReader) return;

      codeReader
        .decodeFromImageElement(tempImage)
        .then(result => {
          if (result?.text && result.text !== lastBarcodeData) {
            lastBarcodeData = result.text.trim();
            console.log('[ScannerCore] Barcode detected');
          }
        })
        .catch(() => {});
    };

    /* ---- PROCESS PAIR ---- */
    if (lastQrData && lastBarcodeData) {
      const pairKey = `${lastQrData}|${lastBarcodeData}`;

      if (pairKey !== lastProcessedSecret) {
        processHybrid(lastQrData, lastBarcodeData);
        lastProcessedSecret = pairKey;
      }

      if (!batchMode) {
        lastQrData = null;
        lastBarcodeData = null;
        lastProcessedSecret = null;
      }
    }
  } catch (err) {
    console.error('[ScannerCore] scanFrame error', err);
  }

  if (scanning) requestAnimationFrame(scanFrame);
}

/* -----------------------------
   UTILITIES
------------------------------ */
function toGrayscale(imageData) {
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const gray = Math.round(
      0.299 * data[i] +
      0.587 * data[i + 1] +
      0.114 * data[i + 2]
    );

    data[i] = data[i + 1] = data[i + 2] = gray;
  }

  return imageData;
}

/* -----------------------------
   DECRYPT + SUCCESS
------------------------------ */
function processHybrid(qrData, barcodeData) {
  try {
    const parts = qrData.split('|');
    if (parts.length !== 2) return;

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
    console.error('[ScannerCore] decrypt failed', err);
  }
}

function handleSuccess(secret) {
  try {
    if (!batchMode) {
      batchResults = [secret];
    } else {
      batchResults.push(secret);
    }

    console.log('[ScannerCore] secret found');

    window.dispatchEvent(
      new CustomEvent('secretFound', {
        detail: {
          secret,
          batchResults: [...batchResults]
        }
      })
    );

    if (batchMode && batchTarget > 0 && batchResults.length >= batchTarget) {
      stopScanning();
    }
  } catch (err) {
    console.error('[ScannerCore] handleSuccess error', err);
  }
}
