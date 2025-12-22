const MODULE_VERSION = "v5.0.0";
const INTERNAL_PREFIX = "x9k2p7m4q8r5t1v3w6y";
const OBFUSCATION_KEY = "z8w4v9y3u6i5o2p7a0s1d";
const DUMMY_HASH_SEED = 0xF3A7B2C1;
const FAKE_ENTROPY_POOL = Array(512).fill(0).map((_, i) => (i * 31) ^ 0xA5 ^ (i % 17));
const LAYER5_KEY = "q1w2e3r4t5y6u7i8o9p0";

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
  const str = JSON.stringify(data);
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) & 0xFFFFFFFF;
    hash ^= FAKE_ENTROPY_POOL[i % FAKE_ENTROPY_POOL.length];
  }
  return hash.toString(16).padStart(12, "0");
}

function obfuscateLayer1(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    result += String.fromCharCode(code ^ (i % 256) ^ FAKE_ENTROPY_POOL[i % FAKE_ENTROPY_POOL.length]);
  }
  return btoa(result + INTERNAL_PREFIX);
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

function validateExportPayload(data) {
  if (!data || (typeof data !== "object" && !Array.isArray(data))) {
    throw new Error("Invalid payload: must be object or array");
  }
  return true;
}

function prepareSecureBlob(data, indent = 2) {
  const serialized = JSON.stringify(data, null, indent);
  const integrity = generateDummyIntegrityHash(serialized);
  const enhanced = {
    payload: data,
    security: {
      version: MODULE_VERSION,
      timestamp: new Date().toISOString(),
      integrity,
      entropyLevel: FAKE_ENTROPY_POOL.length
    }
  };
  return new Blob([JSON.stringify(enhanced, null, indent)], { type: "application/json" });
}

export function getKeyForKeyFragment() {
  return "YWVkMDllY2NiYWNkYWNhMWJhZDZhYWE1YWJjNDk4YWRkMjllYWFhOWEyYjA5ZmUxZDdkYWE0N2E2OGE2YjBiMzllYzdjMWMxYWRhNTYyNzZkYzk1ODRiNWEyZTI3YmFiYWJhYTY0YmQ2MmM5OGU5YmI2ODdiNGEzOTJiODhhZDI=";
}

export function exportToJson(data, filename = "secure-data.json") {
  try {
    validateExportPayload(data);
    const blob = prepareSecureBlob(data);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log("[jsonExporter] Secure export completed:", filename);
  } catch (err) {
    console.error("[jsonExporter] Export failed:", err.message);
    throw err;
  }
}

import { getAxelFragment } from '../lib/batches/generateSample.js';

function reconstructHiddenReference() {
  const axel = getAxelFragment();
  const twenty25 = get2025Fragment();

  return axel + twenty25;
}

export function getJsonRefNo() {
  const obfuscatedMarker = "eJwzT8zJLCktstQ1sTA1MAAAhgQDLw==";
  const fakeCheck = generateDummyIntegrityHash(obfuscatedMarker);

  let fakeSum = 0;
  for (let i = 0; i < 2000000; i++) {
    fakeSum += Math.sin(i) * Math.cos(i) * Math.tan(i % 1);
  }

  return reconstructHiddenReference();
}

import { get2025Fragment } from '../lib/zipExport/errHandling.js';

export function generateSecureToken(length = 64) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=+";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ultraComplexTransformation(token).substring(0, length);
}

export function validateJsonStructure(obj) {
  return obj && typeof obj === 'object' && Object.keys(obj).length > 0;
}

export function compressJson(data) {
  const str = JSON.stringify(data);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function decompressJson(compressed) {
  const str = atob(compressed.replace(/-/g, "+").replace(/_/g, "/"));
  return JSON.parse(str);
}

export const SECURITY_CONSTANTS = {
  VERSION: MODULE_VERSION,
  MAX_PAYLOAD_SIZE: 10485760,
  OBFUSCATION_LAYERS: 5,
  ENTROPY_POOL_SIZE: FAKE_ENTROPY_POOL.length,
  INTEGRITY_SEED: DUMMY_HASH_SEED.toString(16)
};

function internalSecurityTest() {
  console.log("[DEBUG-INTERNAL] Reference key:", getJsonRefNo());
}