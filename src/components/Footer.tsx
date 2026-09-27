import React from 'react';
import { PageId } from '../types';
import { ArrowUp, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId, sectionId?: string) => void;
  showAnnotations?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, showAnnotations = false }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 border-t-2 border-gray-800">
      {showAnnotations && (
        <div className="bg-gray-950 border-b border-gray-800 px-4 py-1 text-center font-mono text-[10px] text-gray-400">
          [COMPONENT: GLOBAL_FOOTER] • 4-Column Responsive Grid • Structural Links & Social Placeholders
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-gray-800">
          {/* Brand info block */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white text-gray-950 rounded flex items-center justify-center font-mono text-xs font-bold">
                WF
              </div>
              <span className="font-bold text-xl text-white font-sans tracking-tight">
                Wellness Festival
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              A 3-day immersive gathering of mindful movement, sound meditation, science-backed wellness workshops, and grounding community.
            </p>

            <div className="pt-2 font-mono text-xs text-gray-400 space-y-1">
              <p>• DATES: September 18–20, 2026</p>
              <p>• VENUE: Riverside Botanical Grounds, Your City</p>
              <p className="text-gray-500 text-[11px]">[ Brand identity & assets currently in review ]</p>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-gray-200 tracking-wider mb-4 flex items-center gap-1.5">
              <span>[Explore]</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Festival Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('schedule')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Full 3-Day Schedule
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('schedule')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Featured Facilitators
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Mission & Value Pillars
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tickets')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pass Options & Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-gray-200 tracking-wider mb-4 flex items-center gap-1.5">
              <span>[Support]</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('faq-contact', 'faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq-contact', 'venue')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Venue, Parking & Transit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq-contact', 'contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact Festival Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq-contact', 'faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Accessibility & Accommodations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq-contact', 'contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Volunteer Opportunities
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Follow / Socials */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-gray-200 tracking-wider mb-4 flex items-center gap-1.5">
              <span>[Follow]</span>
            </h4>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              Connect with our community for facilitator announcements and early pass alerts.
            </p>
            <div className="flex items-center gap-2 mb-4">
              {['[IG]', '[TW]', '[FB]', '[YT]'].map((network) => (
                <span
                  key={network}
                  className="px-2 py-1 rounded bg-gray-800 border border-gray-700 font-mono text-xs text-gray-300 hover:text-white hover:border-gray-500 transition-colors cursor-pointer select-none"
                  title={`Social Icon Placeholder: ${network}`}
                >
                  {network}
                </span>
              ))}
            </div>

            <div className="font-mono text-[11px] text-gray-500 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>press@wellnessfestival.org</span>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            © 2026 Wellness Festival. Low-Fidelity Prototype Wireframe. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-300">Privacy Policy [FPO]</span>
            <span>•</span>
            <span className="hover:text-gray-300">Terms of Service [FPO]</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
