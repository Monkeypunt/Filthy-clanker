import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  initialService: string;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  initialService,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [service, setService] = useState(initialService);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      setService(initialService);
      setStatus('idle');
    }
  }, [isOpen, initialService]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSending) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSending, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || isSending) return;

    setIsSending(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          service: service.trim(),
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setStatus('success');
      setName('');
      setContact('');
      setMessage('');
    } catch {
      setStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={() => {
        if (!isSending) onClose();
      }}
    >
      <div
        className="relative max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <h2 id="order-modal-title" className="text-lg font-bold text-white">
            {service ? 'Order Service' : 'Contact'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isSending}
            aria-label="Close"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="order-name" className="block text-xs font-medium text-neutral-300">
              Name <span className="text-rose-400">*</span>
            </label>
            <input
              id="order-name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-3.5 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="order-contact" className="block text-xs font-medium text-neutral-300">
              Contact <span className="text-rose-400">*</span>
            </label>
            <input
              id="order-contact"
              name="contact"
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Phone number or email"
              className="w-full px-3.5 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="order-service" className="block text-xs font-medium text-neutral-300">
              Service
            </label>
            <input
              id="order-service"
              name="service"
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Optional"
              className="w-full px-3.5 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="order-message" className="block text-xs font-medium text-neutral-300">
              Message
            </label>
            <textarea
              id="order-message"
              name="message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Additional details"
              className="w-full px-3.5 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 resize-none"
            />
          </div>

          {status === 'success' && (
            <p className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3.5 py-2.5">
              Request successful, will contact soon
            </p>
          )}

          {status === 'error' && (
            <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3.5 py-2.5">
              Request failed, please try again.
            </p>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSending}
              className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-300 hover:text-white bg-neutral-800/70 hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-950 bg-white hover:bg-neutral-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSending ? 'Sending request' : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
