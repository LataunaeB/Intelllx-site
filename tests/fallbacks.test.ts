import { describe, it, expect } from 'vitest';
import { getLocalizedFallbackResponse, getTimeoutMessage } from '@/lib/ai/fallbacks';

describe('getLocalizedFallbackResponse', () => {
  it('returns website pricing details in Spanish', () => {
    const input = '¿Cuál es el pricing de su website?';
    const response = getLocalizedFallbackResponse('es', input);
    expect(response).toContain('Precios de desarrollo web');
    expect(response).toContain('Launch');
    expect(response).toContain('¿Quieres programar una llamada de descubrimiento');
  });

  it('returns chatbot pricing details in German', () => {
    const input = 'Was sind die Chatbot Kosten?';
    const response = getLocalizedFallbackResponse('de', input);
    expect(response).toContain('LeadFlow-Chatbot-Preise');
    expect(response).toContain('Essential');
    expect(response).toContain('Discovery-Call');
  });

  it('falls back to default messaging when intent is unknown', () => {
    const input = 'Tell me more about Intelllx';
    const response = getLocalizedFallbackResponse('en', input);
    expect(response).toMatch(/Intelllx/i);
    expect(response.length).toBeGreaterThan(10);
  });
});

describe('getTimeoutMessage', () => {
  it('returns localized timeout message', () => {
    expect(getTimeoutMessage('fr')).toContain('La demande a expiré');
    expect(getTimeoutMessage('pt')).toContain('A solicitação expirou');
  });
});


