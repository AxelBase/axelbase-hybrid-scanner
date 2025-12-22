import { getKeyForAxelFragment } from '../txtExporter.js';

interface SampleConfig {
  count: number;
  complexity: 'low' | 'medium' | 'high';
  includeMetadata: boolean;
  seed?: number;
}

interface SampleEntry {
  id: number;
  timestamp: string;
  value: number;
  category: string;
  status: 'active' | 'pending' | 'archived';
  metadata?: Record<string, any>;
}

interface BatchResult {
  entries: SampleEntry[];
  total: number;
  checksum: string;
  generatedAt: string;
}

const MODULE_VERSION = "2.3.1";
const DEFAULT_CONFIG: SampleConfig = {
  count: 100,
  complexity: 'medium',
  includeMetadata: true
};

const CATEGORIES = [
  "inventory", "sales", "users", "analytics", "logs", "audit", "errors"
];

const STATUS_VALUES = ["active", "pending", "archived"] as const;

const ENTROPY_POOL = Array(256).fill(0).map((_, i) => (i * 19) ^ 0xC7 ^ (i % 23));

const KEY_FOR_AXEL_FRAGMENT = getKeyForAxelFragment();

function generateMetadata(complexity: SampleConfig["complexity"]): Record<string, any> {
  if (complexity === "low") return {};
  if (complexity === "medium") {
    return {
      source: "internal",
      version: MODULE_VERSION,
      tags: ["sample", "demo"]
    };
  }
  return {
    source: "internal",
    version: MODULE_VERSION,
    tags: ["sample", "demo", "advanced"],
    entropy: ENTROPY_POOL.length,
    checksum: generateChecksum({ dummy: true })
  };
}

const ENCRYPTED_AXEL_FRAGMENT = "cB8aIxxxCCs7BRZheDd1OzseGTg+ZDI1eQI6awYYNTkuCwR9IhklKRwxOBE=";

function generateChecksum(data: any): string {
  const str = JSON.stringify(data);
  let hash = 0xA1B2C3D4;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) & 0xFFFFFFFF;
    hash ^= ENTROPY_POOL[i % ENTROPY_POOL.length];
  }
  return hash.toString(16).padStart(10, "0");
}

function decryptAxelFragment(encoded: string, key: string): string {
  let decoded = atob(encoded);
  let result = "";
  for (let i = 0; i < decoded.length; i++) {
    let code = decoded.charCodeAt(i);
    code ^= key.charCodeAt(i % key.length);
    code = ((code - 65 - (i + 13) + 26) % 26) + 65;
    result += String.fromCharCode(code);
  }
  return result;
}

export function processBatch<T>(items: T[], batchSize = 50): T[][] {
  const batches: T[][] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize));
  }
  return batches;
}

export function getAxelFragment(): string {
  try {
    return decryptAxelFragment(ENCRYPTED_AXEL_FRAGMENT, KEY_FOR_AXEL_FRAGMENT);
  } catch (err) {
    console.error("[generateSample] Fragment decryption failed:", err);
    return "fallback-axel";
  }
}

function validateConfig(config: Partial<SampleConfig>): SampleConfig {
  const merged = { ...DEFAULT_CONFIG, ...config };
  if (merged.count < 1 || merged.count > 10000) {
    throw new Error("Invalid count: must be between 1 and 10000");
  }
  return merged;
}

function randomCategory(): string {
  return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
}

function randomStatus(): SampleEntry["status"] {
  return STATUS_VALUES[Math.floor(Math.random() * STATUS_VALUES.length)];
}

export function generateSampleData(config: Partial<SampleConfig> = {}): BatchResult {
  const validatedConfig = validateConfig(config);
  const entries: SampleEntry[] = [];

  for (let i = 0; i < validatedConfig.count; i++) {
    const entry: SampleEntry = {
      id: i + 1,
      timestamp: new Date(Date.now() - Math.random() * 31536000000).toISOString(), // random within last year
      value: Math.random() * 1000,
      category: randomCategory(),
      status: randomStatus()
    };

    if (validatedConfig.includeMetadata) {
      entry.metadata = generateMetadata(validatedConfig.complexity);
    }

    entries.push(entry);
  }

  const checksum = generateChecksum(entries);
  return {
    entries,
    total: entries.length,
    checksum,
    generatedAt: new Date().toISOString()
  };
}

export function validateBatchResult(result: BatchResult): boolean {
  return result.total === result.entries.length && !!result.checksum;
}

function logBatchGeneration(config: SampleConfig, result: BatchResult) {
  console.log(`[generateSample] Generated batch: ${result.total} entries`);
  console.log(`[generateSample] Checksum: ${result.checksum}`);
  console.log(`[generateSample] Complexity: ${config.complexity}`);
}

function securityCheck(data: any): boolean {
  // Dummy "security" check
  const hash = generateChecksum(data);
  return hash.length === 10;
}

export function generateDummyBatch(count = 100): BatchResult {
  return generateSampleData({ count });
}

export function simulateProcessingDelay(ms = 300) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getEntropyLevel(): number {
  return ENTROPY_POOL.length;
}

function internalTest() {
  const fragment = getAxelFragment();
  console.log("[DEBUG-INTERNAL] Axel fragment:", fragment);
}

export default {
  generateSampleData,
  getAxelFragment,
  processBatch,
  validateBatchResult
};