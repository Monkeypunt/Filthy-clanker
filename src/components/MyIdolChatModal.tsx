import React, { useState, useEffect, useRef } from 'react';
import { X, Send, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

interface MyIdolChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STARTER_PROMPTS = [
  'Why do you stay at Overwatch?',
  'How do you enjoy peanut butter?',
  'Tell me a science joke!',
  'Are you an AI or a gorilla?',
  'I got a cut on my finger playing outside',
];

export const MyIdolChatModal: React.FC<MyIdolChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content:
        "Greetings! I'm Winston. Brilliant scientist, adventurer, and dedicated member of Overwatch. Did someone say... peanut butter? How may I assist you with scientific inquiry today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend ?? input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const apiMessages = newMessages
        .filter((m) => m.id !== 'welcome' || newMessages.length === 2)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.reply || data.error || 'Failed to communicate with Winston.');
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: data.reply || "A fascinating hypothesis! Let's investigate further.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: unknown) {
      const errMsg =
        err instanceof Error
          ? err.message
          : 'Pardon me! An unexpected electromagnetic burst disrupted my communicator. Please try again!';
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: errMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'model',
        content:
          'Greetings once again! Ready for inquiries on particle physics, Overwatch missions, or the culinary merits of crunchy peanut butter.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="winston-chat-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative flex flex-col bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden w-full transition-all duration-200 ${
          isExpanded ? 'h-[90vh] max-w-4xl' : 'h-[82vh] max-h-[660px] max-w-xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-neutral-950/90 px-5 py-4 border-b border-neutral-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-amber-500/30 flex items-center justify-center text-xl shrink-0">
              🦍
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 id="winston-chat-title" className="font-bold text-white text-base tracking-tight truncate">
                  Winston
                </h2>
                <span className="text-xs text-neutral-500">·</span>
                <span className="text-xs font-medium text-amber-400 whitespace-nowrap">My Idol</span>
              </div>
              <p className="text-xs text-neutral-400 truncate">
                Scientist &amp; Adventurer · Overwatch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handleResetChat}
              title="Reset chat"
              aria-label="Reset chat"
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              title={isExpanded ? 'Collapse window' : 'Expand window'}
              aria-label={isExpanded ? 'Collapse window' : 'Expand window'}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer hidden sm:block"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Close"
              aria-label="Close chat"
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((message) => {
            const isUser = message.role === 'user';
            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-neutral-950 border border-amber-500/30 flex items-center justify-center text-sm shrink-0 mt-0.5">
                    🦍
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-amber-500 text-neutral-950 font-medium rounded-tr-sm'
                      : 'bg-neutral-800/80 text-neutral-100 border border-neutral-700/70 rounded-tl-sm'
                  }`}
                >
                  {!isUser && (
                    <div className="text-[11px] font-medium text-amber-400 mb-1 flex items-center gap-1.5">
                      <span>Winston</span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-neutral-400 tabular-nums">{message.timestamp}</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {isUser && (
                    <div className="text-[10px] text-neutral-900/70 text-right mt-1 tabular-nums">
                      {message.timestamp}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-lg bg-neutral-950 border border-amber-500/30 flex items-center justify-center text-sm shrink-0">
                🦍
              </div>
              <div className="bg-neutral-800/80 border border-neutral-700/70 rounded-2xl rounded-tl-sm px-4 py-3 text-xs text-neutral-300">
                Thinking...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2.5 bg-neutral-950/60 border-t border-neutral-800/80 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="text-xs bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-amber-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-3 sm:p-4 bg-neutral-950 border-t border-neutral-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Winston about Overwatch, peanut butter, or science..."
              disabled={isLoading}
              className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-amber-500/60 rounded-xl px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 text-sm"
            >
              <span className="hidden sm:inline">Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
