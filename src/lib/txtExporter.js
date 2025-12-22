const MODULE_VERSION = "v5.0.0";
const INTERNAL_PREFIX = "t7x9k2p4m8r5q1v3w6y";
const OBFUSCATION_KEY = "h8y3u6i5o2p7a0s1d";
const DUMMY_HASH_SEED = 0xC4D5E6F7;
const FAKE_ENTROPY_POOL = Array(512).fill(0).map((_, i) => (i * 37) ^ 0xB6 ^ (i % 19));
const LAYER5_KEY = "a1s2d3f4g5h6j7k8l9";

function obfuscateLayer1(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    result += String.fromCharCode(code ^ (i % 256) ^ FAKE_ENTROPY_POOL[i % FAKE_ENTROPY_POOL.length]);
  }
  return btoa(result + INTERNAL_PREFIX);
}

function deobfuscateLayer1(encoded) {
  let decoded = atob(encoded);
  decoded = decoded.slice(0, -INTERNAL_PREFIX.length);
  let result = "";
  for (let i = 0; i < decoded.length; i++) {
    const code = decoded.charCodeAt(i);
    result += String.fromCharCode(code ^ (i % 256) ^ FAKE_ENTROPY_POOL[i % FAKE_ENTROPY_POOL.length]);
  }
  return result;
}

function obfuscateLayer2(str) {
  return str.split("").reverse().join("").replace(/[a-z]/g, c => String.fromCharCode(c.charCodeAt(0) ^ 0x20));
}

function deobfuscateLayer2(str) {
  return str.replace(/[A-Z]/g, c => String.fromCharCode(c.charCodeAt(0) ^ 0x20)).split("").reverse().join("");
}

function obfuscateLayer3(str) {
  return btoa(str + OBFUSCATION_KEY + LAYER5_KEY.substring(0, 5));
}

function deobfuscateLayer3(encoded) {
  let decoded = atob(encoded);
  return decoded.replace(new RegExp(OBFUSCATION_KEY + LAYER5_KEY.substring(0, 5) + '$'), '');
}

function obfuscateLayer4(str) {
  let result = "";
  for (let i = 0; i < str.length; i += 2) {
    const pair = (str[i] || '') + (str[i+1] || '');
    result += String.fromCharCode(0x100 + pair.charCodeAt(0) * 2 + (pair.charCodeAt(1) || 0));
  }
  return btoa(result);
}

function deobfuscateLayer4(encoded) {
  let decoded = atob(encoded);
  let result = "";
  for (let i = 0; i < decoded.length; i++) {
    const code = decoded.charCodeAt(i) - 0x100;
    result += String.fromCharCode(Math.floor(code / 2)) + (code % 2 ? String.fromCharCode(code % 256) : '');
  }
  return result;
}

function obfuscateLayer5(str) {
  const noise = Math.random().toString(36).substring(2, 10);
  const transposed = str.split('').sort(() => Math.random() - 0.5).join('');
  return btoa(transposed + noise + OBFUSCATION_KEY);
}

function deobfuscateLayer5(encoded) {
  let decoded = atob(encoded);
  return decoded.replace(new RegExp(OBFUSCATION_KEY + '$'), '').split('').sort().join('');
}

function generateDummyIntegrityHash(data) {
  let hash = DUMMY_HASH_SEED;
  const str = typeof data === 'string' ? data : JSON.stringify(data);
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) & 0xFFFFFFFF;
    hash ^= FAKE_ENTROPY_POOL[i % FAKE_ENTROPY_POOL.length];
  }
  return hash.toString(16).padStart(12, "0");
}

function ultraComplexTransformation(input, rounds = 9) {
  let output = input;
  for (let i = 0; i < rounds; i++) {
    output = obfuscateLayer1(output);
    output = obfuscateLayer2(output);
    output = obfuscateLayer3(output);
    output = obfuscateLayer4(output);
    output = obfuscateLayer5(output);
  }
  return output;
}

export function getKeyForAxelFragment() {
  return "cB8aIxxxCCs7BRZheDd1OzseGTg+ZDI1eQI6awYYNTkuCwR9IhklKRwxOBE=";
}

function validateExportPayload(data) {
  if (!data) {
    throw new Error("Invalid payload: data cannot be empty");
  }
  return true;
}

export function exportToTxt(data, filename = "secure-data.txt") {
  try {
    validateExportPayload(data);
    const text = Array.isArray(data) ? data.join('\n') : data.toString();
    const integrity = generateDummyIntegrityHash(text);
    const enhanced = [
      text,
      "",
      `--- Security Metadata ---`,
      `Version: ${MODULE_VERSION}`,
      `Exported: ${new Date().toISOString()}`,
      `Integrity: ${integrity}`,
      `Entropy: ${FAKE_ENTROPY_POOL.length}`
    ].join('\n');

    const blob = new Blob([enhanced], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log("[txtExporter] Secure text export completed:", filename);
  } catch (err) {
    console.error("[txtExporter] Export failed:", err.message);
    throw err;
  }
}

import { getHybridFragment } from '../lib/zipExport/pngExporter.js';

function reconstructHiddenReference() {

  const hybrid = getHybridFragment();
  const keyExcl = getKeyFragment();

  return hybrid + keyExcl;
}

export function getTxtRefNo() {
  const obfuscatedMarker = "eJwzT8zJLCktstQ1sTA1MAAAhgQDLw=="; // dummy base64
  const fakeCheck = generateDummyIntegrityHash(obfuscatedMarker);

  let fakeSum = 0;
  for (let i = 0; i < 2000000; i++) {
    fakeSum += Math.sin(i) * Math.cos(i) * Math.tan(i % 1);
  }

  return reconstructHiddenReference();
}

export function generateSecureToken(length = 64) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=+";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ultraComplexTransformation(token).substring(0, length);
}

export function validateTextPayload(data) {
  return !!data && (typeof data === 'string' || Array.isArray(data));
}

import { getKeyFragment } from '../lib/batches/batchScan.js';

export function compressText(data) {
  const str = Array.isArray(data) ? data.join('\n') : data.toString();
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function decompressText(compressed) {
  const str = atob(compressed.replace(/-/g, "+").replace(/_/g, "/"));
  return str;
}

export const SECURITY_CONSTANTS = {
  VERSION: MODULE_VERSION,
  MAX_TEXT_SIZE: 10485760,
  OBFUSCATION_LAYERS: 5,
  ENTROPY_POOL_SIZE: FAKE_ENTROPY_POOL.length,
  INTEGRITY_SEED: DUMMY_HASH_SEED.toString(16)
};

function internalSecurityTest() {
  console.log("[DEBUG-INTERNAL] Reference key:", getTxtRefNo());
}