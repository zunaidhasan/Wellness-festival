import React, { useState } from 'react';
import { TicketTier } from '../types';
import { X, Check, ShieldCheck, CreditCard } from 'lucide-react';

interface TicketCheckoutModalProps {
  isOpen: boolean;
  tier: TicketTier | null;
  onClose: () => void;
  onSuccess: (tierName: string, quantity: number) => void;
}

export const TicketCheckoutModal: React.FC<TicketCheckoutModalProps> = ({
  isOpen,
  tier,
  onClose,
  onSuccess,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen || !tier) return null;

  const priceNum = parseInt(tier.price.replace('$', ''), 10) || 89;
  const subtotal = priceNum * quantity;
  const processingFee = Math.round(subtotal * 0.05);
  const total = subtotal + processingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmed(true);
      setTimeout(() => {
        onSuccess(tier.name, quantity);
        setConfirmed(false);
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white border-2 border-gray-800 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gray-100 border-b border-gray-300 p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase font-bold text-gray-500">
              [ MODAL: TICKET_CHECKOUT_FLOW ]
            </div>
            <h3 className="text-lg font-bold text-gray-950 font-sans">
              Reserve {tier.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-gray-950">Reservation Confirmed!</h4>
            <p className="text-sm text-gray-600 font-mono">
              [Simulated Prototype Transaction]
            </p>
            <p className="text-sm text-gray-700">
              {quantity}x {tier.name} reserved for <strong>{name || 'Attendee'}</strong> ({email || 'email@example.com'}).
            </p>
            <div className="p-3 bg-gray-100 rounded border border-gray-300 text-xs font-mono text-gray-600">
              Confirmation code: #WF26-{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
            {/* Pass details summary */}
            <div className="p-4 bg-gray-50 rounded border border-gray-300 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-gray-900 text-base">{tier.name}</span>
                <span className="font-mono font-bold text-lg text-gray-950">{tier.price}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{tier.description}</p>
              <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded border border-gray-400 bg-white font-mono font-bold text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-sm">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-8 h-8 rounded border border-gray-400 bg-white font-mono font-bold text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Attendee Form */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Miller"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-hidden focus:border-gray-900 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jordan@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-hidden focus:border-gray-900 font-sans"
                />
              </div>
            </div>

            {/* Price calculation */}
            <div className="p-3 bg-gray-100 rounded border border-gray-200 font-mono text-xs space-y-1.5 text-gray-700">
              <div className="flex justify-between">
                <span>{tier.price} × {quantity} pass(es)</span>
                <span>${subtotal}.00</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Estimated environmental fund (5%)</span>
                <span>${processingFee}.00</span>
              </div>
              <div className="pt-2 border-t border-gray-300 flex justify-between font-bold text-sm text-gray-950">
                <span>Total Amount:</span>
                <span>${total}.00</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
              <ShieldCheck className="w-4 h-4 text-gray-700 shrink-0" />
              <span>Full refund guarantee up to 30 days prior • Transfers allowed</span>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-gray-900 text-white rounded text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <CreditCard className="w-4 h-4" />
                <span>{isSubmitting ? 'Processing...' : `Confirm ($${total}.00)`}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
