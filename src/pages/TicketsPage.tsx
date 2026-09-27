import React, { useState } from 'react';
import { PageId, TicketTier } from '../types';
import { TICKET_TIERS } from '../data/festivalData';
import { AnnotationBadge } from '../components/AnnotationBadge';
import {
  Check,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Info,
  Calendar,
  CreditCard,
  Users,
} from 'lucide-react';

interface TicketsPageProps {
  onNavigate: (page: PageId, sectionId?: string) => void;
  onSelectTier: (tier: TicketTier) => void;
  showAnnotations: boolean;
}

export const TicketsPage: React.FC<TicketsPageProps> = ({
  onNavigate,
  onSelectTier,
  showAnnotations,
}) => {
  const [selectedBilling, setSelectedBilling] = useState<'individual' | 'group'>('individual');

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <AnnotationBadge
        label="TICKETS & PRICING"
        notes="3 Pricing Cards • Middle Highlighted 'Most Popular' • Feature lists & CTA buttons • Policy block"
        visible={showAnnotations}
      />

      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase px-3 py-1 bg-gray-100 border border-gray-300 rounded text-gray-700">
          <Calendar className="w-3.5 h-3.5" />
          <span>September 18–20, 2026 • Your City</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight font-sans">
          Choose Your Festival Experience
        </h1>

        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Tier 1 early-bird rates are currently active. All passes include full access to main meadow practices, hydration stations, and evening communal circles.
        </p>

        {/* Individual vs Group Pass Toggle */}
        <div className="inline-flex items-center p-1 bg-gray-200 border border-gray-400 rounded-md font-mono text-xs">
          <button
            onClick={() => setSelectedBilling('individual')}
            className={`px-4 py-1.5 rounded transition-all cursor-pointer ${
              selectedBilling === 'individual'
                ? 'bg-gray-900 text-white font-bold shadow-xs'
                : 'text-gray-700 hover:text-gray-950'
            }`}
          >
            Individual Passes
          </button>
          <button
            onClick={() => setSelectedBilling('group')}
            className={`px-4 py-1.5 rounded transition-all cursor-pointer ${
              selectedBilling === 'group'
                ? 'bg-gray-900 text-white font-bold shadow-xs'
                : 'text-gray-700 hover:text-gray-950'
            }`}
          >
            Group Passes (4+ attendees)
          </button>
        </div>
        {selectedBilling === 'group' && (
          <p className="font-mono text-xs text-gray-500">
            [ Group Discount: Automatic 15% discount applied at checkout for groups of 4 or more ]
          </p>
        )}
      </div>

      {/* 3 PRICING CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
        {TICKET_TIERS.map((tier) => {
          const isPopular = tier.isPopular;

          return (
            <div
              key={tier.id}
              className={`rounded-xl transition-all duration-200 flex flex-col justify-between relative ${
                isPopular
                  ? 'bg-gray-900 text-white border-2 border-gray-900 shadow-xl lg:-translate-y-2'
                  : 'bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-800 shadow-sm'
              } p-6 sm:p-8`}
            >
              {/* Highlight Badge for Middle Card ("Most Popular") */}
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-gray-950 font-mono text-xs uppercase font-extrabold px-4 py-1 rounded-full border-2 border-gray-900 shadow-sm flex items-center gap-1.5 tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{tier.badge || 'Most Popular'}</span>
                </div>
              )}

              {/* Limited tag for VIP */}
              {!isPopular && tier.badge && (
                <div className="absolute -top-3 left-6 bg-gray-100 text-gray-700 font-mono text-[10px] uppercase font-bold px-2.5 py-0.5 rounded border border-gray-400">
                  {tier.badge}
                </div>
              )}

              {/* Card Header & Price */}
              <div className="space-y-4">
                <div className="border-b pb-4 border-gray-200/40">
                  <span
                    className={`font-mono text-xs uppercase tracking-wider block font-semibold ${
                      isPopular ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    [ Pass Option ]
                  </span>
                  <h3
                    className={`text-2xl font-bold font-sans mt-0.5 ${
                      isPopular ? 'text-white' : 'text-gray-950'
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={`text-xs mt-1.5 leading-relaxed ${
                      isPopular ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {tier.description}
                  </p>
                </div>

                {/* Price display */}
                <div className="py-2">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-4xl sm:text-5xl font-extrabold font-mono tracking-tight ${
                        isPopular ? 'text-white' : 'text-gray-950'
                      }`}
                    >
                      {tier.price}
                    </span>
                    <span
                      className={`font-mono text-xs ${
                        isPopular ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      USD
                    </span>
                  </div>
                  <span
                    className={`font-mono text-xs block mt-1 ${
                      isPopular ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {tier.period}
                  </span>
                </div>

                {/* Included Features List (4–5 features) */}
                <div className="pt-2 space-y-3">
                  <span
                    className={`font-mono text-xs uppercase font-bold tracking-wider block ${
                      isPopular ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    What's Included:
                  </span>
                  <ul className="space-y-2.5 text-xs sm:text-sm">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isPopular
                              ? 'bg-gray-800 text-white'
                              : 'bg-gray-100 text-gray-900 border border-gray-300'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                        </span>
                        <span
                          className={`leading-tight ${
                            isPopular ? 'text-gray-200' : 'text-gray-700'
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card CTA Button */}
              <div className="pt-8 mt-6 border-t border-gray-200/30">
                <button
                  onClick={() => onSelectTier(tier)}
                  className={`w-full py-3.5 px-4 rounded-md font-mono text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    isPopular
                      ? 'bg-white text-gray-950 hover:bg-gray-200 active:bg-gray-300'
                      : 'bg-gray-900 text-white hover:bg-gray-800 active:bg-black'
                  }`}
                >
                  <span>{tier.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <p
                  className={`text-center font-mono text-[10px] mt-2 ${
                    isPopular ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  [ Instant Digital Delivery • Apple/Google Wallet ]
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* SHORT INFO BLOCK BELOW */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 sm:p-8 space-y-6">
        <div className="font-mono text-xs uppercase font-bold text-gray-500">
          [ POLICY & VENUE AMENITIES SPECIFICATION ]
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Block 1: What's included */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-gray-700 shrink-0" />
              <span>Standard Across All Passes</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every pass includes unlimited filtered Cascadia spring water refills, complimentary gear check locker access, meditation grounds entry, and sanitary rest stations.
            </p>
          </div>

          {/* Block 2: Refund policy placeholder */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
              <CreditCard className="w-4 h-4 text-gray-700 shrink-0" />
              <span>Refund Policy [Placeholder]</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              100% refund available up to 30 days prior (until August 18, 2026). Within 30 days, passes are non-refundable but 100% transferable to another individual at zero fee.
            </p>
          </div>

          {/* Block 3: Student & Community assistance */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
              <Users className="w-4 h-4 text-gray-700 shrink-0" />
              <span>Community & Sliding Scale</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              We allocate 75 sliding-scale and student passes for individuals facing financial constraints. Apply via our contact form prior to July 31, 2026.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-600">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-gray-500" />
            <span>Questions regarding pass tiers or corporate packages?</span>
          </div>
          <button
            onClick={() => onNavigate('faq-contact', 'faq')}
            className="text-gray-900 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Read Ticketing FAQ</span>
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
