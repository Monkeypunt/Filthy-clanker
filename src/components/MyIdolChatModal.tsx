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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#231a14]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative flex flex-col bg-[#fffdf9] border border-[#e7dfd5] rounded-2xl shadow-2xl overflow-hidden w-full transition-all duration-200 ${
          isExpanded ? 'h-[90vh] max-w-4xl' : 'h-[82vh] max-h-[660px] max-w-xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white px-5 py-4 border-b border-[#e7dfd5] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#faf7f2] border border-amber-300 flex items-center justify-center text-xl shrink-0">
              🦍
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 id="winston-chat-title" className="font-bold text-[#231a14] text-base tracking-tight truncate">
                  Winston
                </h2>
                <span className="text-xs text-[#9c8c7e]">·</span>
                <span className="text-xs font-semibold text-amber-700 whitespace-nowrap">My Idol</span>
              </div>
              <p className="text-xs text-[#66574c] truncate">
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
              className="p-2 text-[#7d6c5e] hover:text-[#231a14] hover:bg-[#f1ebe1] rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              title={isExpanded ? 'Collapse window' : 'Expand window'}
              aria-label={isExpanded ? 'Collapse window' : 'Expand window'}
              className="p-2 text-[#7d6c5e] hover:text-[#231a14] hover:bg-[#f1ebe1] rounded-lg transition-colors cursor-pointer hidden sm:block"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Close"
              aria-label="Close chat"
              className="p-2 text-[#7d6c5e] hover:text-[#231a14] hover:bg-[#f1ebe1] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#faf7f2]">
          {messages.map((message) => {
            const isUser = message.role === 'user';
            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-white border border-amber-300 flex items-center justify-center text-sm shrink-0 mt-0.5 shadow-xs">
                    🦍
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-amber-500 text-white font-medium rounded-tr-sm shadow-xs'
                      : 'bg-white text-[#231a14] border border-[#e7dfd5] rounded-tl-sm shadow-xs'
                  }`}
                >
                  {!isUser && (
                    <div className="text-[11px] font-semibold text-amber-700 mb-1 flex items-center gap-1.5">
                      <span>Winston</span>
                      <span className="text-[#c8b79f]">·</span>
                      <span className="text-[#8c7a6b] font-normal tabular-nums">{message.timestamp}</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {isUser && (
                    <div className="text-[10px] text-amber-100 text-right mt-1 tabular-nums">
                      {message.timestamp}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-lg bg-white border border-amber-300 flex items-center justify-center text-sm shrink-0 shadow-xs">
                🦍
              </div>
              <div className="bg-white border border-[#e7dfd5] rounded-2xl rounded-tl-sm px-4 py-3 text-xs text-[#66574c] shadow-xs">
                Thinking...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2.5 bg-white border-t border-[#e7dfd5] overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="text-xs bg-[#faf7f2] hover:bg-amber-50 border border-[#e7dfd5] hover:border-amber-400 text-[#4a3c32] hover:text-amber-800 px-3 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#e7dfd5]">
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
              className="flex-1 bg-[#faf7f2] border border-[#e2d8cb] focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm text-[#231a14] placeholder-[#9c8c7e] outline-none transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 text-sm"
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
