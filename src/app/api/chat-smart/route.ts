import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildBusinessContext, buildSystemPrompt } from '@/lib/ai/context';
import { aiResponseCache, makeCacheKey } from '@/lib/ai/cache';
import { checkRateLimit } from '@/lib/ai/ratelimit';
import { logger } from '@/lib/logger';
import type { SupportedLanguage } from '@/lib/i18n/chat';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n/chat';
import { getLocalizedFallbackResponse } from '@/lib/ai/fallbacks';

const OPENAI_MODEL = 'gpt-3.5-turbo';
const GEMINI_MODEL = 'gemini-1.5-pro';

const SUPPORTED_LANGUAGE_CODES = new Set<SupportedLanguage>(
  SUPPORTED_LANGUAGES.map(lang => lang.code)
);

const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  pt: 'Portuguese',
  it: 'Italian'
};

const RATE_LIMIT_MESSAGES: Record<SupportedLanguage, string> = {
  en: 'A lot of people are asking questions right now. Please try again in a moment, or book a quick discovery call to get immediate help.',
  es: 'Muchas personas están preguntando en este momento. Inténtalo de nuevo en unos minutos o reserva una llamada de descubrimiento para obtener ayuda inmediata.',
  fr: 'Beaucoup de personnes posent des questions en ce moment. Réessayez dans un instant ou réservez un appel découverte pour obtenir de l’aide immédiatement.',
  de: 'Es gehen gerade viele Anfragen ein. Bitte versuchen Sie es gleich noch einmal oder buchen Sie einen Discovery-Call, um sofort Unterstützung zu erhalten.',
  pt: 'Muitas pessoas estão perguntando agora. Tente novamente em instantes ou agende uma chamada de descoberta para receber ajuda imediata.',
  it: 'Stiamo ricevendo molte domande in questo momento. Riprova tra poco oppure prenota una discovery call per ricevere supporto immediato.'
};

function extractMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error && typeof error.message === 'string') {
    return error.message;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const maybeMessage = (error as { message?: unknown }).message;
    return typeof maybeMessage === 'string' ? maybeMessage : '';
  }

  return '';
}

function isQuotaError(error: unknown): boolean {
  const message = extractMessage(error);
  return /insufficient_quota|quota|rate limit|429/i.test(message);
}

function normalizeLanguage(value: unknown): SupportedLanguage {
  if (typeof value !== 'string') {
    return 'en';
  }

  return SUPPORTED_LANGUAGE_CODES.has(value as SupportedLanguage)
    ? (value as SupportedLanguage)
    : 'en';
}

export async function POST(request: NextRequest) {
  try {
    const { message, language: languageInput } = await request.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

    const language = normalizeLanguage(languageInput);

    // Rate limit per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') ||
               'anonymous';
    const limit = await checkRateLimit(`chat-smart:${ip}`);
    if (!limit.allowed) {
      const rateLimitedMessage = RATE_LIMIT_MESSAGES[language] ?? RATE_LIMIT_MESSAGES.en;
      return NextResponse.json({ 
        success: true, 
        provider: 'limited', 
        response: rateLimitedMessage 
      }, { status: 200 });
    }

    const systemPrompt = buildSystemPrompt(language);
    const context = buildBusinessContext();
    
    // Detect pricing intent early for better context
    const lowerMessage = message.toLowerCase();
    const isPricingQuery = lowerMessage.includes('price') || 
                          lowerMessage.includes('cost') || 
                          lowerMessage.includes('how much') ||
                          ((lowerMessage.includes('chatbot') || lowerMessage.includes('chat-bot')) && (lowerMessage.includes('price') || lowerMessage.includes('cost'))) ||
                          ((lowerMessage.includes('website') || lowerMessage.includes('site') || lowerMessage.includes('web')) && (lowerMessage.includes('price') || lowerMessage.includes('cost')));
    
    let userContent: string;
    if (isPricingQuery) {
      userContent = `User Language: ${language}\nUser Question: ${message}\n\nIMPORTANT: The user is asking about PRICING. You MUST provide the exact pricing from the Business Context below. 
- If they ask about "website pricing" or "website cost", provide Website Development pricing (Launch $500, Professional $1,000, Advanced $2,500)
- If they ask about "chatbot pricing" or "chatbot cost", provide LeadFlow Chatbot pricing (Essential $500 setup + $149/mo, Pro $1,000 setup + $299/mo)
- If they ask generally about "pricing", mention both chatbot and website options with exact prices
Do not give generic responses.\n\nBusiness Context:\n${context}`;
    } else {
      userContent = `User Language: ${language}\nUser Question: ${message}\n\nBusiness Context:\n${context}`;
    }

    // Cache check
    const cacheKey = makeCacheKey(`${language}:${message}`);
    const cached = aiResponseCache.get(cacheKey);
    if (cached) {
      logger.debug('[chat-smart] Cache hit', { key: cacheKey.substring(0, 50) });
      return NextResponse.json({ success: true, provider: 'cache', response: cached });
    }

    // Try OpenAI first if configured (with polite retry)
    const openaiKey = process.env.OPENAI_API_KEY;
    if (openaiKey) {
      try {
        const openai = new OpenAI({ apiKey: openaiKey });
        const attempt = async () => openai.chat.completions.create({
          model: OPENAI_MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userContent }
          ],
          max_tokens: 400,
          temperature: 0.4
        });
        let content: string | undefined;
        try {
          const resp1 = await attempt();
          content = resp1.choices?.[0]?.message?.content?.trim();
        } catch (error) {
          if (isQuotaError(error)) {
            logger.warn('[chat-smart] OpenAI quota error, retrying after delay', { error: extractMessage(error) });
            await new Promise(r => setTimeout(r, 600));
            const resp2 = await attempt();
            content = resp2.choices?.[0]?.message?.content?.trim();
          } else {
            throw error;
          }
        }
        if (content) {
          aiResponseCache.set(cacheKey, content);
          logger.info('[chat-smart] OpenAI response cached', { key: cacheKey.substring(0, 50) });
          return NextResponse.json({ success: true, provider: 'openai', response: content });
        }
      } catch (error) {
        logger.warn('[chat-smart] OpenAI failed, trying fallback', { error: extractMessage(error) });
        if (!isQuotaError(error)) {
          // If not a quota error, proceed to fallback anyway
        }
      }
    }

    // Fallback to Gemini if configured
    const geminiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (geminiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
        const prompt = `${systemPrompt}\n\n${userContent}\n\nInstructions: Answer concisely in 2-4 sentences. If pricing is asked (including "pricing for chatbot", "website pricing", "chatbot pricing", "website cost"), you MUST provide the exact pricing from the context including both setup and monthly costs when relevant. Include the booking CTA when useful. Respond in ${LANGUAGE_NAMES[language]} and keep the tone professional and on-brand.`;
        const resp = await model.generateContent({ 
          contents: [{ role: 'user', parts: [{ text: prompt }] }], 
          generationConfig: { maxOutputTokens: 400, temperature: 0.4 } 
        });
        const text = resp.response?.text()?.trim();
        if (text) {
          aiResponseCache.set(cacheKey, text);
          logger.info('[chat-smart] Gemini response cached', { key: cacheKey.substring(0, 50) });
          return NextResponse.json({ success: true, provider: 'gemini', response: text });
        }
      } catch (error) {
        logger.error('[chat-smart] Gemini failed', error);
      }
    }

    const fallback = getLocalizedFallbackResponse(language, message);
    aiResponseCache.set(cacheKey, fallback, 5 * 60 * 1000);
    return NextResponse.json({
      success: true,
      provider: 'fallback',
      response: fallback
    });
  } catch (error) {
    logger.error('[api/chat-smart] Unexpected error', error);
    return NextResponse.json({ success: false, error: 'Unexpected error' }, { status: 500 });
  }
}

