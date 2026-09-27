import React, { useState } from 'react';
import { PageId } from '../types';
import { FAQS, FESTIVAL_INFO } from '../data/festivalData';
import { WireframeMapBox } from '../components/WireframePlaceholder';
import { AnnotationBadge } from '../components/AnnotationBadge';
import {
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  MapPin,
  Bus,
  Car,
  Bike,
  Search,
} from 'lucide-react';

interface FaqContactPageProps {
  onNavigate: (page: PageId) => void;
  showAnnotations: boolean;
}

export const FaqContactPage: React.FC<FaqContactPageProps> = ({
  showAnnotations,
}) => {
  // Accordion state: open IDs
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [faqSearch, setFaqSearch] = useState('');

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General Inquiries');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    if (openFaqIds.length === FAQS.length) {
      setOpenFaqIds([]);
    } else {
      setOpenFaqIds(FAQS.map((f) => f.id));
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 600);
  };

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.category.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 lg:space-y-20">
      <AnnotationBadge
        label="FAQ, CONTACT & VENUE"
        notes="8-Question Accordion • Form (Name, Email, Message) • Venue Map Placeholder & Address"
        visible={showAnnotations}
      />

      {/* Page Title */}
      <div className="border-b-2 border-gray-300 pb-4">
        <div className="font-mono text-xs uppercase font-semibold text-gray-500">
          [ GUEST SERVICES & VENUE DIRECTORY ]
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-tight mt-1 font-sans">
          FAQ, Contact & Venue Guide
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1 max-w-2xl">
          Everything you need to know about attending Wellness Festival 2026, finding the grounds, and getting support.
        </p>
      </div>

      {/* 1. FAQ ACCORDION WITH 8 QUESTIONS */}
      <section id="faq" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase font-semibold text-gray-500">
              [ COMPONENT: ACCORDION_LIST ]
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              Frequently Asked Questions (8 Topics)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExpandAll}
              className="px-3.5 py-1.5 bg-white border border-gray-400 rounded font-mono text-xs text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {openFaqIds.length === FAQS.length ? 'Collapse All' : 'Expand All'}
            </button>
          </div>
        </div>

        {/* Quick Search for FAQs */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. refund, what to bring, food)..."
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded font-sans focus:outline-hidden focus:border-gray-900"
          />
        </div>

        {/* 8 Accordion Items */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaqIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden transition-all duration-150 hover:border-gray-600 shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-gray-400 shrink-0 mt-0.5">
                      Q0{index + 1}
                    </span>
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded bg-gray-100 border border-gray-300 font-mono text-[10px] text-gray-600 uppercase mb-1">
                        [{faq.category}]
                      </span>
                      <h3 className="font-bold text-base sm:text-lg text-gray-950 font-sans">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center shrink-0 text-gray-700">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 pt-1 sm:px-5 sm:pb-6 text-sm text-gray-700 leading-relaxed border-t border-gray-200 bg-gray-50/50 animate-in fade-in duration-150">
                    <div className="pl-8 sm:pl-9">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. VENUE MAP PLACEHOLDER + ADDRESS SECTION */}
      <section id="venue" className="space-y-6 pt-4">
        <div className="space-y-2">
          <div className="font-mono text-xs uppercase font-semibold text-gray-500">
            [ VENUE SPECIFICATION & LOCATION ]
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
            Festival Grounds & Directions
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            Hosted entirely within the botanical parklands of {FESTIVAL_INFO.location}, designed for fresh air and tranquil communion with nature.
          </p>
        </div>

        {/* Large Wireframe Map Box */}
        <WireframeMapBox address={FESTIVAL_INFO.venueAddress} />

        {/* Address & Transit Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Card 1: Official Address */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-gray-900 uppercase">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span>Official Address</span>
            </div>
            <p className="font-bold text-sm text-gray-950">{FESTIVAL_INFO.venueName}</p>
            <p className="font-mono text-xs text-gray-600 leading-relaxed">
              {FESTIVAL_INFO.venueAddress}
            </p>
            <span className="font-mono text-[10px] text-gray-400 block pt-1">
              [ Main Public Gate: Gate 1 North ]
            </span>
          </div>

          {/* Card 2: Public Transit */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-gray-900 uppercase">
              <Bus className="w-4 h-4 text-gray-600" />
              <span>Transit & Subway</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              <strong>Green Line Metro:</strong> Waterfront Station (4-minute walk to Gate 1).
            </p>
            <p className="text-xs text-gray-700 leading-relaxed">
              <strong>Bus Routes:</strong> #14, #27, and #82 stop directly in front of the Botanical Pavilion.
            </p>
          </div>

          {/* Card 3: Parking & Shuttles */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-gray-900 uppercase">
              <Car className="w-4 h-4 text-gray-600" />
              <span>Parking Facilities</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              Designated North Lot parking pass available for $15/day (included with VIP). Electric vehicle charging stations available in Lot B.
            </p>
          </div>

          {/* Card 4: Bike & Active Travel */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-gray-900 uppercase">
              <Bike className="w-4 h-4 text-gray-600" />
              <span>Bicycle Valet</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              Complimentary monitored bicycle valet parking provided at Gate 2. Waterfront bike path connects directly to city greenways.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM: NAME, EMAIL, MESSAGE, SUBMIT BUTTON */}
      <section id="contact" className="space-y-6 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Explanatory Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="font-mono text-xs uppercase font-semibold text-gray-500">
              [ COMPONENT: CONTACT_FORM ]
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight font-sans">
              Get in Touch with the Organizers
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Need assistance with tickets, accessibility requests, press passes, or vendor inquiries? Send our coordinating staff a message.
            </p>

            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300 font-mono text-xs space-y-2 text-gray-700">
              <p className="font-bold text-gray-900 uppercase">[ RESPONSE COMMITMENT ]</p>
              <p>Our team responds to all inquiries within 1 business day.</p>
              <p className="text-gray-500">Email: info@wellnessfestival.org</p>
              <p className="text-gray-500">Festival HQ: (555) 019-2026</p>
            </div>
          </div>

          {/* Actual Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-gray-300 rounded-lg p-6 sm:p-8 shadow-xs">
            {isSubmitted ? (
              <div className="p-8 text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-950">
                  Message Dispatched Successfully!
                </h3>
                <p className="text-sm text-gray-600 font-mono">
                  [Simulated Prototype Form Submission]
                </p>
                <p className="text-sm text-gray-700">
                  Thank you for reaching out. We have logged your request and a festival representative will be in touch shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 bg-gray-900 text-white rounded font-mono text-xs font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="font-mono text-xs uppercase font-bold text-gray-500 pb-1 border-b border-gray-200">
                  [ INQUIRY FORM SPECIFICATION ]
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Taylor Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-hidden focus:border-gray-900 font-sans"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. taylor@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-hidden focus:border-gray-900 font-sans"
                    />
                  </div>
                </div>

                {/* Topic field */}
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-gray-700 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-hidden focus:border-gray-900 font-sans cursor-pointer"
                  >
                    <option>General Inquiries</option>
                    <option>Ticketing & Transfers</option>
                    <option>Accessibility & ADA Services</option>
                    <option>Volunteer Program</option>
                    <option>Sponsorship & Artisan Vendor Market</option>
                    <option>Press & Media Credentials</option>
                  </select>
                </div>

                {/* Message field */}
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-gray-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your question, request, or accommodation needs..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-hidden focus:border-gray-900 font-sans"
                  ></textarea>
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <span className="font-mono text-[11px] text-gray-500">
                    * Required fields • No marketing spam
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-gray-900 text-white font-mono text-xs uppercase font-bold rounded-md hover:bg-gray-800 active:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending...' : 'Submit Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
