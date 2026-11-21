import React, { useState, useEffect } from 'react';
import { X, PawPrint } from 'lucide-react';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231a14]/60 backdrop-blur-sm"
      onClick={() => {
        if (!isSending) onClose();
      }}
    >
      <div
        className="relative max-w-md w-full bg-[#fffdf9] border border-[#e7dfd5] rounded-2xl p-6 space-y-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#e7dfd5]">
          <h2 id="order-modal-title" className="inline-flex items-center gap-2 text-lg font-bold text-[#231a14]">
            <PawPrint className="w-4 h-4 text-amber-600" aria-hidden="true" />
            <span>{service ? 'Order Service' : 'Contact'}</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isSending}
            aria-label="Close"
            className="p-1.5 rounded-lg text-[#7d6c5e] hover:text-[#231a14] hover:bg-[#f1ebe1] transition-colors disabled:opacity-50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="order-name" className="block text-xs font-semibold text-[#4a3c32]">
              Name <span className="text-rose-600">*</span>
            </label>
            <input
              id="order-name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-3.5 py-2 rounded-xl bg-[#faf7f2] border border-[#e2d8cb] text-sm text-[#231a14] placeholder-[#9c8c7e] focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="order-contact" className="block text-xs font-semibold text-[#4a3c32]">
              Contact <span className="text-rose-600">*</span>
            </label>
            <input
              id="order-contact"
              name="contact"
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Phone number or email"
              className="w-full px-3.5 py-2 rounded-xl bg-[#faf7f2] border border-[#e2d8cb] text-sm text-[#231a14] placeholder-[#9c8c7e] focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="order-service" className="block text-xs font-semibold text-[#4a3c32]">
              Service
            </label>
            <input
              id="order-service"
              name="service"
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Optional"
              className="w-full px-3.5 py-2 rounded-xl bg-[#faf7f2] border border-[#e2d8cb] text-sm text-[#231a14] placeholder-[#9c8c7e] focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="order-message" className="block text-xs font-semibold text-[#4a3c32]">
              Message
            </label>
            <textarea
              id="order-message"
              name="message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Additional details"
              className="w-full px-3.5 py-2 rounded-xl bg-[#faf7f2] border border-[#e2d8cb] text-sm text-[#231a14] placeholder-[#9c8c7e] focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          {status === 'success' && (
            <p className="text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2.5">
              Request successful, will contact soon
            </p>
          )}

          {status === 'error' && (
            <p className="text-sm font-medium text-rose-800 bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-2.5">
              Request failed, please try again.
            </p>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSending}
              className="px-4 py-2 rounded-xl text-sm font-medium text-[#66574c] hover:text-[#231a14] bg-[#f1ebe1] hover:bg-[#e7dfd5] transition-colors disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSending ? 'Sending request' : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
