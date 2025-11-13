/**
 * Centralized logging utility
 * Replaces console.log with environment-aware logging
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

function shouldLog(level: LogLevel): boolean {
  const env = process.env.NODE_ENV;
  const logLevel = (process.env.LOG_LEVEL || 'info').toLowerCase();
  
  const levels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  };
  
  return levels[level] >= levels[logLevel as LogLevel] || env === 'development';
}

function redactSensitiveData(message: string): string {
  // Redact API keys, tokens, etc.
  return message
    .replace(/(sk-|pk-)[a-zA-Z0-9_-]+/gi, '[REDACTED]')
    .replace(/(api[_-]?key|token|password|secret)[=:]\s*[^\s]+/gi, '$1=[REDACTED]');
}

export const logger = {
  debug(message: string, ...args: unknown[]): void {
    if (shouldLog('debug')) {
      console.debug(`[DEBUG] ${redactSensitiveData(message)}`, ...args);
    }
  },
  
  info(message: string, ...args: unknown[]): void {
    if (shouldLog('info')) {
      console.info(`[INFO] ${redactSensitiveData(message)}`, ...args);
    }
  },
  
  warn(message: string, ...args: unknown[]): void {
    if (shouldLog('warn')) {
      console.warn(`[WARN] ${redactSensitiveData(message)}`, ...args);
    }
  },
  
  error(message: string, error?: unknown, ...args: unknown[]): void {
    if (shouldLog('error')) {
      const errorMsg = error instanceof Error ? error.message : String(error ?? '');
      console.error(`[ERROR] ${redactSensitiveData(message)}`, errorMsg, ...args);
    }
  }
};


