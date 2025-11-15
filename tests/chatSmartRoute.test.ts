import { describe, it, beforeEach, expect } from 'vitest';
import type { NextRequest } from 'next/server';
import { POST } from '@/app/api/chat-smart/route';
import { aiResponseCache } from '@/lib/ai/cache';

type RequestPayload = {
  message: string;
  language?: string;
};

function createMockRequest(payload: RequestPayload): NextRequest {
  const requestLike = {
    json: async () => payload,
    headers: new Headers()
  };

  return requestLike as unknown as NextRequest;
}

beforeEach(() => {
  aiResponseCache.clear();
  delete process.env.OPENAI_API_KEY;
  delete process.env.GOOGLE_GEMINI_API_KEY;
  delete process.env.GOOGLE_API_KEY;
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
});

describe('POST /api/chat-smart', () => {
  it('returns localized fallback response when no providers are configured', async () => {
    const request = createMockRequest({ message: 'website pricing', language: 'fr' });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.provider).toBe('fallback');
    expect(data.response).toContain('Tarification du développement web');
  });

  it('returns cached response on repeated request', async () => {
    const request = createMockRequest({ message: 'chatbot pricing', language: 'en' });

    const first = await POST(request);
    const firstData = await first.json();
    expect(firstData.provider).toBe('fallback');

    const second = await POST(request);
    const secondData = await second.json();
    expect(secondData.provider).toBe('cache');
    expect(secondData.response).toBe(firstData.response);
  });
});




