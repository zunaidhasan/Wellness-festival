import React from 'react';
import { PageId, Facilitator } from '../types';
import { FACILITATORS, VALUE_PILLARS, FESTIVAL_INFO } from '../data/festivalData';
import { WireframeBox, WireframeHeadshot } from '../components/WireframePlaceholder';
import { AnnotationBadge } from '../components/AnnotationBadge';
import {
  Heart,
  Globe,
  Sparkles,
  ArrowRight,
  Mail,
  CheckCircle,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenFacilitatorModal?: (facilitator: Facilitator) => void;
  showAnnotations: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  showAnnotations,
}) => {
  const getPillarIcon = (number: string) => {
    switch (number) {
      case '01':
        return <Heart className="w-5 h-5" />;
      case '02':
        return <Sparkles className="w-5 h-5" />;
      case '03':
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 lg:space-y-24">
      <AnnotationBadge
        label="ABOUT PAGE"
        notes="Mission & Story with Image Placeholder • 3 Value Pillars • 6 Facilitators Grid • Contact Block"
        visible={showAnnotations}
      />

      {/* 1. MISSION / STORY SECTION WITH IMAGE PLACEHOLDER */}
      <section className="space-y-6">
        <div className="border-b-2 border-gray-300 pb-4">
          <div className="font-mono text-xs uppercase font-semibold text-gray-500">
            [ ABOUT THE GATHERING ]
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-tight mt-1 font-sans">
            Our Mission & Origin Story
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Narrative text (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-gray-700 leading-relaxed text-sm sm:text-base">
            <p className="font-semibold text-gray-950 text-base sm:text-lg">
              Wellness Festival was founded on a simple conviction: genuine restorative practices should be accessible, grounded in science, and experienced in communion with nature.
            </p>
            <p>
              In a culture increasingly characterized by digital fragmentation and hurried schedules, we envisioned a dedicated sanctuary where individuals could unplug, reconnect with bodily somatic wisdom, and learn directly from master educators across contemplative traditions.
            </p>
            <p>
              Held on the protected grounds of Riverside Botanical Grounds in {FESTIVAL_INFO.location}, our annual gathering brings together over 1,500 participants for three uninterrupted days of movement, sound acoustic journeys, and evidence-informed health keynotes.
            </p>

            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300 font-mono text-xs space-y-2 text-gray-800">
              <div className="font-bold uppercase tracking-wider text-gray-900">
                [ GUIDING FESTIVAL PRINCIPLES ]
              </div>
              <ul className="space-y-1 text-gray-600">
                <li>• Accessible pricing tiers with dedicated community sliding-scale passes</li>
                <li>• Non-dogmatic, multi-tradition contemplative instruction</li>
                <li>• Zero commercial pitch stages; 100% focused on participant education</li>
              </ul>
            </div>
          </div>

          {/* Image placeholder (5 cols) */}
          <div className="lg:col-span-5">
            <WireframeBox
              label="Founding Story & Grounds Image"
              dimension="600 × 480 px"
              aspectRatio="aspect-[4/3] sm:aspect-[1/1]"
              subtext="Visual: Archival photo of botanical meadow and gathering pavilion in morning sunlight"
            />
            <div className="text-center font-mono text-[11px] text-gray-500 mt-2">
              [ FIG 2.1: RIVERSIDE BOTANICAL MEADOW SITE PLACEHOLDER ]
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3 VALUE PILLARS */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="font-mono text-xs uppercase font-semibold text-gray-500">
            [ CORE VALUES ]
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 tracking-tight">
            Our Three Foundational Pillars
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Every teacher invited and workshop curated must align with these core commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUE_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-white border-2 border-gray-300 rounded-lg p-6 sm:p-8 hover:border-gray-800 transition-all shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded bg-gray-900 text-white flex items-center justify-center">
                    {getPillarIcon(pillar.number)}
                  </div>
                  <span className="font-mono text-sm font-extrabold text-gray-400">
                    [{pillar.number}]
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-950 font-sans">
                    {pillar.title}
                  </h3>
                  <p className="font-mono text-xs text-gray-500 mt-0.5">
                    {pillar.subtitle}
                  </p>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-gray-200">
                <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500">
                  <CheckCircle className="w-3.5 h-3.5 text-gray-700" />
                  <span>Guaranteed in every festival stage</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FACILITATOR GRID (6 PEOPLE) */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-gray-300 pb-4">
          <div>
            <div className="font-mono text-xs uppercase font-semibold text-gray-500">
              [ MENTORS & GUIDES ]
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 tracking-tight mt-1">
              The 2026 Facilitator Faculty
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Six esteemed practitioners leading movement, acoustics, neuroscience, and botanical workshops.
            </p>
          </div>

          <button
            onClick={() => onNavigate('schedule')}
            className="px-4 py-2 bg-gray-900 text-white rounded font-mono text-xs uppercase font-bold hover:bg-gray-800 transition-colors shrink-0 cursor-pointer"
          >
            View Complete Schedule →
          </button>
        </div>

        {/* 6 Facilitators Grid (3 cols desktop, 2 tablet, 1 mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITATORS.map((person) => (
            <div
              key={person.id}
              className="bg-white border-2 border-gray-300 rounded-lg p-6 hover:border-gray-800 transition-all flex flex-col justify-between group shadow-xs"
            >
              <div className="space-y-4">
                {/* Top: Headshot placeholder + discipline */}
                <div className="flex items-start gap-4">
                  <WireframeHeadshot name={person.name} role={person.role} size="md" />
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded bg-gray-100 border border-gray-300 text-[10px] font-mono font-semibold text-gray-700 uppercase">
                      [{person.discipline}]
                    </span>
                    <h3 className="font-bold text-lg text-gray-950 mt-1 leading-tight group-hover:text-black">
                      {person.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5 font-medium leading-snug">
                      {person.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {person.bio}
                </p>

                {/* Sessions Led */}
                <div className="pt-2 font-mono text-xs">
                  <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">
                    Confirmed 2026 Sessions:
                  </span>
                  <ul className="space-y-1">
                    {person.sessions.map((sess, i) => (
                      <li key={i} className="text-gray-800 flex items-center gap-1.5 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        <span className="truncate">{sess}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <button
                  onClick={() => onNavigate('schedule')}
                  className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded font-mono text-xs text-gray-800 font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>See Schedule Times</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CONTACT BLOCK */}
      <section className="bg-gray-100 border-2 border-gray-300 rounded-lg p-8 sm:p-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 rounded font-mono text-xs text-gray-700">
            <Mail className="w-3.5 h-3.5" />
            <span>[ SECTION: GET_INVOLVED_CONTACT ]</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 font-sans tracking-tight">
            Have Questions or Want to Get Involved?
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Whether you are inquiring about accessibility accommodations, volunteer applications, or press credentials, our festival coordinating committee is here to help.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('faq-contact', 'contact')}
              className="px-6 py-3 bg-gray-900 text-white rounded font-mono text-xs uppercase font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Open Contact Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('faq-contact', 'faq')}
              className="px-6 py-3 bg-white text-gray-900 border border-gray-400 rounded font-mono text-xs uppercase font-bold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Read 8 Frequent Questions
            </button>
          </div>

          <div className="font-mono text-xs text-gray-500 pt-2 flex flex-wrap justify-center gap-4">
            <span>Direct Email: info@wellnessfestival.org</span>
            <span>•</span>
            <span>Volunteer Inquiries: volunteer@wellnessfestival.org</span>
          </div>
        </div>
      </section>
    </div>
  );
};
