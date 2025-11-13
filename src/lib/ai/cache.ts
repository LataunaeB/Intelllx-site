/**
 * Simple in-memory cache for AI responses
 * Reduces redundant API calls for similar questions
 */

interface CacheEntry {
  value: string;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();
const DEFAULT_TTL = 30 * 60 * 1000; // 30 minutes

export function makeCacheKey(message: string): string {
  // Normalize message for cache key
  return message.toLowerCase().trim().replace(/\s+/g, ' ');
}

export const aiResponseCache = {
  get(key: string): string | null {
    const entry = cache.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.expiresAt) {
      cache.delete(key);
      return null;
    }
    
    return entry.value;
  },
  
  set(key: string, value: string, ttl: number = DEFAULT_TTL): void {
    cache.set(key, {
      value,
      expiresAt: Date.now() + ttl
    });
  },
  
  clear(): void {
    cache.clear();
  },
  
  size(): number {
    return cache.size;
  }
};


