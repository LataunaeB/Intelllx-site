'use client';

import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ComposerProps {
  onSend: (message: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

/**
 * Message Composer Component
 * 
 * Input field for typing messages with send button.
 * - Enter to send
 * - Shift+Enter for newline
 * - Auto-expands up to 3 lines
 */
export default function Composer({ 
  onSend, 
  placeholder = 'Type your message…',
  isLoading = false,
  disabled = false
}: ComposerProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    const maxHeight = 72; // ~3 lines
    textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading || disabled) return;

    onSend(trimmed);
    setValue('');
    
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = value.trim().length > 0 && !isLoading && !disabled;

  return (
    <div className="px-4 py-3 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 pr-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 text-sm leading-relaxed disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '44px', maxHeight: '72px' }}
            aria-label="Message input"
          />
        </div>

        <motion.button
          whileHover={{ scale: canSend ? 1.05 : 1 }}
          whileTap={{ scale: canSend ? 0.95 : 1 }}
          onClick={handleSend}
          disabled={!canSend}
          className={`
            flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${canSend
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
              : 'bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed'
            }
          `}
          aria-label="Send message"
          aria-disabled={!canSend}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      {/* Hint text */}
      <p className="text-xs text-gray-400 dark:text-zinc-500 mt-2 px-1">
        Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-zinc-800 rounded text-xs border border-gray-300 dark:border-zinc-700">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-zinc-800 rounded text-xs border border-gray-300 dark:border-zinc-700">Shift+Enter</kbd> for new line
      </p>
    </div>
  );
}

