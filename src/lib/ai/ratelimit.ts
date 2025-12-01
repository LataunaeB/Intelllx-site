/**
 * Rate limiting for AI chat endpoint
 * Uses Upstash Redis if configured, falls back to in-memory
 */

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  reset: number;
}

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute

// In-memory rate limit store (fallback)
const memoryStore = new Map<string, { count: number; resetAt: number }>();

async function checkRateLimitMemory(key: string): Promise<RateLimitResult> {
  const now = Date.now();
  const entry = memoryStore.get(key);
  
  if (!entry || now > entry.resetAt) {
    // Reset window
    memoryStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, reset: now + RATE_LIMIT_WINDOW };
  }
  
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, reset: entry.resetAt };
  }
  
  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - entry.count, reset: entry.resetAt };
}

export async function checkRateLimit(key: string): Promise<RateLimitResult> {
  // Try Upstash Redis if configured
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  
  if (upstashUrl && upstashToken) {
    try {
      const response = await fetch(`${upstashUrl}/pipeline`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${upstashToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([
          ['INCR', key],
          ['EXPIRE', key, Math.ceil(RATE_LIMIT_WINDOW / 1000)]
        ])
      });
      
      if (response.ok) {
        const data = await response.json();
        const count = data[0]?.result || 0;
        
        if (count === 1) {
          // First request in window
          return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, reset: Date.now() + RATE_LIMIT_WINDOW };
        }
        
        if (count > RATE_LIMIT_MAX_REQUESTS) {
          return { allowed: false, remaining: 0, reset: Date.now() + RATE_LIMIT_WINDOW };
        }
        
        return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - count, reset: Date.now() + RATE_LIMIT_WINDOW };
      }
    } catch (error) {
      // Fall through to memory store
      console.warn('Upstash rate limit check failed, using memory fallback', error);
    }
  }
  
  // Fallback to in-memory
  return checkRateLimitMemory(key);
}






