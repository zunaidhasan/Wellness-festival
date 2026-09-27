import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import {
  FESTIVAL_INFO,
  EXPECTATION_CARDS,
  FACILITATORS,
  TESTIMONIALS,
  SPONSORS,
} from '../data/festivalData';
import {
  WireframeBox,
  WireframeHeadshot,
  WireframeLogoBox,
} from '../components/WireframePlaceholder';
import { AnnotationBadge } from '../components/AnnotationBadge';
import {
  Calendar,
  MapPin,
  ArrowRight,
  Clock,
  Quote,
  CheckCircle2,
  Mail,
  Activity,
  Sun,
  Volume2,
  Sparkles,
  BookOpen,
  Compass,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, sectionId?: string) => void;
  onSelectPass: (tierId: string) => void;
  showAnnotations: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  showAnnotations,
}) => {
  // Countdown timer logic to September 18, 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 142,
    hours: 8,
    minutes: 24,
    seconds: 15,
  });

  useEffect(() => {
    const targetDate = new Date('2026-09-18T09:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Newsletter state
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const getExpectationIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Sun':
        return <Sun className="w-5 h-5" />;
      case 'Volume2':
        return <Volume2 className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      case 'Compass':
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  // 4 Featured facilitators
  const featuredFacilitators = FACILITATORS.slice(0, 4);

  return (
    <div className="space-y-16 lg:space-y-24 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnnotationBadge
            label="HERO SECTION"
            notes="1440px desktop container • Large image placeholder • Dual CTA"
            visible={showAnnotations}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Content (7 cols on desktop) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Wireframe Tag + Date & Location Pill */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-gray-700">
                <span className="px-2.5 py-1 bg-gray-200 border border-gray-400 rounded-sm font-semibold tracking-wide">
                  [ FESTIVAL PROTOTYPE ]
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 rounded-sm text-gray-800">
                  <Calendar className="w-3.5 h-3.5 text-gray-600" />
                  <strong>September 18–20</strong>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 rounded-sm text-gray-800">
                  <MapPin className="w-3.5 h-3.5 text-gray-600" />
                  <span>Your City</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-950 tracking-tight leading-[1.12]">
                {FESTIVAL_INFO.heroHeadline}
              </h1>

              {/* Supporting Line */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                {FESTIVAL_INFO.heroSupporting}
              </p>

              {/* Date & Location Callout Block */}
              <div className="p-4 bg-gray-100 border border-gray-300 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-gray-200 border border-gray-400 flex items-center justify-center text-gray-800 font-mono text-xs font-bold">
                    DATES
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">September 18–20, 2026</p>
                    <p className="text-xs text-gray-600 font-mono">Friday 9 AM – Sunday 7 PM</p>
                  </div>
                </div>
                <div className="sm:border-l sm:border-gray-300 sm:pl-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-gray-200 border border-gray-400 flex items-center justify-center text-gray-800 font-mono text-xs font-bold">
                    VENUE
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Riverside Botanical Grounds</p>
                    <p className="text-xs text-gray-600 font-mono">Your City Waterfront</p>
                  </div>
                </div>
              </div>

              {/* Two CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('tickets')}
                  className="px-7 py-3.5 bg-gray-900 text-white font-bold rounded-md hover:bg-gray-800 active:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm text-sm sm:text-base border border-gray-900"
                >
                  <span>Get Tickets</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('schedule')}
                  className="px-7 py-3.5 bg-white text-gray-900 font-bold rounded-md border-2 border-gray-800 hover:bg-gray-100 active:bg-gray-200 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                >
                  <span>View Schedule</span>
                  <Clock className="w-4 h-4" />
                </button>
              </div>

              <div className="font-mono text-xs text-gray-500 flex items-center gap-2 pt-1">
                <span>[Early bird pricing active]</span>
                <span>•</span>
                <span>Tier 1 capacity: 68% reserved</span>
              </div>
            </div>

            {/* Right Hero Image Placeholder (5 cols on desktop) */}
            <div className="lg:col-span-5">
              <div className="relative">
                <WireframeBox
                  label="Hero Banner Image Placeholder"
                  dimension="640 × 520 px (Desktop 1440 Context)"
                  aspectRatio="aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5]"
                  subtext="Key imagery: Outdoor community meditation circle & botanical grounds in natural light"
                  className="shadow-md"
                />
                <div className="absolute -bottom-3 -right-3 hidden sm:block bg-gray-900 text-white font-mono text-[10px] px-3 py-1 rounded border border-gray-700 shadow-md">
                  ASSET_ID: #IMG-HERO-01
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COUNTDOWN TIMER STRIP */}
      <section className="bg-gray-900 text-white py-6 border-y-2 border-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnnotationBadge
            label="COUNTDOWN STRIP"
            notes="Live countdown timer to Sept 18 • Responsive grid"
            visible={showAnnotations}
            className="border-gray-600 bg-gray-800"
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-xs uppercase text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Festival Countdown</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                <span>Starts Sep 18, 2026</span>
              </div>
              <h3 className="text-lg font-bold text-gray-100 font-sans">
                Gathering in Your City
              </h3>
            </div>

            {/* Countdown Units */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 font-mono">
              {[
                { label: 'DAYS', value: timeLeft.days },
                { label: 'HOURS', value: timeLeft.hours },
                { label: 'MINUTES', value: timeLeft.minutes },
                { label: 'SECONDS', value: timeLeft.seconds },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="bg-gray-800 border border-gray-700 rounded p-2.5 sm:p-3 text-center min-w-[65px] sm:min-w-[80px]"
                >
                  <span className="block text-2xl sm:text-3xl font-extrabold text-white">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider block mt-0.5">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('tickets')}
              className="px-5 py-2.5 bg-white text-gray-950 font-mono text-xs uppercase font-bold rounded hover:bg-gray-200 transition-colors shrink-0 cursor-pointer"
            >
              Reserve Passes →
            </button>
          </div>
        </div>
      </section>

      {/* 3. INTRO / MISSION SECTION */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnnotationBadge
          label="INTRO & MISSION"
          notes="Text Block + Image Placeholder • 50/50 Desktop Split"
          visible={showAnnotations}
        />

        <div className="bg-white border-2 border-gray-300 rounded-lg p-6 sm:p-10 lg:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text block (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="font-mono text-xs uppercase font-semibold text-gray-500 tracking-wider">
                [ SECTION: MISSION_STATEMENT ]
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 tracking-tight font-sans">
                {FESTIVAL_INFO.introTitle}
              </h2>
              <p className="text-base font-semibold text-gray-800 leading-snug">
                {FESTIVAL_INFO.introSubtitle}
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {FESTIVAL_INFO.introText}
              </p>

              {/* Highlights bullet list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs text-gray-700">
                <div className="flex items-center gap-2 p-2.5 bg-gray-100 rounded border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-gray-700 shrink-0" />
                  <span>3 Days of Experiential Learning</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-gray-100 rounded border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-gray-700 shrink-0" />
                  <span>18+ Curated Sessions & Talks</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-gray-100 rounded border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-gray-700 shrink-0" />
                  <span>Zero Single-Use Plastics Ground</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-gray-100 rounded border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-gray-700 shrink-0" />
                  <span>All Levels & Sensory Calm Zones</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-black underline underline-offset-4 cursor-pointer"
                >
                  <span>Read our full story, values & ethics</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Image placeholder (5 cols) */}
            <div className="lg:col-span-5">
              <WireframeBox
                label="Mission Image Placeholder"
                dimension="560 × 400 px"
                aspectRatio="aspect-[4/3]"
                subtext="Visual: Peaceful participants engaged in outdoor somatic movement and journaling"
              />
              <div className="mt-2 text-center font-mono text-[11px] text-gray-500">
                [ Figure 1.0: Festival Grounds & Atmosphere Placeholder ]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "WHAT TO EXPECT" - 6 CARDS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnnotationBadge
          label="WHAT TO EXPECT"
          notes="6 Cards Grid (3x2 Desktop, Stacked Mobile) • Icon placeholders • Hover States"
          visible={showAnnotations}
        />

        <div className="space-y-4 mb-8 text-center sm:text-left">
          <div className="font-mono text-xs uppercase font-semibold text-gray-500">
            [ PROGRAMMING PILLARS ]
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 tracking-tight">
            What to Expect at Wellness Festival
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            Six distinct experiential paths thoughtfully woven together across three days in Your City.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPECTATION_CARDS.map((card, idx) => (
            <div
              key={card.id}
              className="bg-white border-2 border-gray-300 rounded-lg p-6 hover:border-gray-800 hover:shadow-md transition-all duration-150 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Icon Placeholder + Card Index Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded bg-gray-100 border border-gray-400 flex items-center justify-center text-gray-800 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                    {getExpectationIcon(card.iconName)}
                  </div>
                  <span className="font-mono text-xs text-gray-400">
                    [0{idx + 1} / 06]
                  </span>
                </div>

                <div>
                  <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                    [ Icon: {card.title} ]
                  </div>
                  <h3 className="text-xl font-bold text-gray-950 font-sans group-hover:text-black">
                    {card.title}
                  </h3>
                  <p className="font-mono text-xs text-gray-500 mt-0.5">
                    {card.subtitle}
                  </p>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('schedule')}
                  className="text-xs font-mono font-bold text-gray-700 hover:text-black flex items-center gap-1 group-hover:underline cursor-pointer"
                >
                  <span>Explore {card.title} Sessions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED FACILITATORS - 4 HEADSHOT PLACEHOLDERS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnnotationBadge
          label="FEATURED FACILITATORS"
          notes="4 Headshot Placeholders • Name + Role • Links to Facilitator bios"
          visible={showAnnotations}
        />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs uppercase font-semibold text-gray-500">
              [ LINEUP PREVIEW ]
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 tracking-tight">
              Featured Facilitators & Guides
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1 max-w-xl">
              Learn from acclaimed somatic educators, neuroscientists, and acoustic sound pioneers.
            </p>
          </div>
          <button
            onClick={() => onNavigate('about')}
            className="px-4 py-2 border border-gray-400 bg-white text-gray-900 rounded font-mono text-xs font-bold hover:bg-gray-100 transition-colors shrink-0 self-start sm:self-auto cursor-pointer"
          >
            View All 6 Facilitators →
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFacilitators.map((person) => (
            <div
              key={person.id}
              className="bg-white border-2 border-gray-300 rounded-lg p-5 flex flex-col items-center text-center hover:border-gray-800 transition-all group"
            >
              {/* 1:1 Headshot placeholder */}
              <div className="mb-4">
                <WireframeHeadshot name={person.name} role={person.role} size="lg" />
              </div>

              <div className="space-y-1 w-full">
                <span className="inline-block px-2 py-0.5 rounded bg-gray-100 border border-gray-300 text-[10px] font-mono font-medium text-gray-700 uppercase mb-1">
                  [{person.discipline}]
                </span>
                <h3 className="font-bold text-base sm:text-lg text-gray-950 group-hover:text-black">
                  {person.name}
                </h3>
                <p className="text-xs font-medium text-gray-600 leading-snug">
                  {person.role}
                </p>
                <p className="font-mono text-[11px] text-gray-500 pt-1 line-clamp-2">
                  {person.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200 w-full">
                <button
                  onClick={() => onNavigate('schedule')}
                  className="text-xs font-mono text-gray-700 hover:text-black font-semibold hover:underline cursor-pointer"
                >
                  View Sessions ({person.sessions.length})
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS - 2 QUOTE CARDS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnnotationBadge
          label="TESTIMONIALS"
          notes="2 Quote Cards • Grayscale wireframe style • Attendee verification"
          visible={showAnnotations}
        />

        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="font-mono text-xs uppercase font-semibold text-gray-500">
            [ COMMUNITY FEEDBACK ]
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
            Past Attendee Experiences
          </h2>
          <p className="text-sm text-gray-600">
            Reflections from community members who joined our previous gatherings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white border-2 border-gray-300 rounded-lg p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs relative"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-gray-400 stroke-[1.5]" />
                <p className="text-gray-800 text-base sm:text-lg leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center gap-3">
                <WireframeHeadshot name={t.author} size="sm" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{t.author}</h4>
                  <p className="font-mono text-xs text-gray-500">{t.location}</p>
                  <span className="font-mono text-[10px] text-gray-400">
                    [{t.yearsAttended}]
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PARTNER / SPONSOR LOGO STRIP (5 GRAY BOXES) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnnotationBadge
          label="PARTNER / SPONSOR STRIP"
          notes="5 Gray Boxes (1 per partner) • Label & tier placeholders"
          visible={showAnnotations}
        />

        <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-6 sm:p-8">
          <div className="text-center mb-6">
            <span className="font-mono text-xs uppercase font-bold text-gray-600 tracking-wider">
              [ 2026 FESTIVAL PARTNERS & SPONSORS ]
            </span>
            <p className="text-xs text-gray-500 mt-1">
              Collaborating with values-aligned organizations in sustainable living and wellness
            </p>
          </div>

          {/* 5 Gray Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SPONSORS.map((sponsor) => (
              <WireframeLogoBox
                key={sponsor.slot}
                slot={sponsor.slot}
                name={sponsor.name}
                tier={sponsor.tier}
              />
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-300 text-center">
            <button
              onClick={() => onNavigate('faq-contact', 'contact')}
              className="font-mono text-xs text-gray-600 hover:text-black underline cursor-pointer"
            >
              Interested in becoming a 2026 Partner? Request Sponsor Kit →
            </button>
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER SIGNUP FIELD + BUTTON */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnnotationBadge
          label="NEWSLETTER SIGNUP"
          notes="Input field + Button • Interactive validation & success state"
          visible={showAnnotations}
        />

        <div className="bg-gray-900 text-white rounded-lg p-8 sm:p-12 border-2 border-gray-800">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-800 border border-gray-700 rounded font-mono text-xs text-gray-300">
              <Mail className="w-3.5 h-3.5" />
              <span>[ MODULE: NEWSLETTER_DISPATCH ]</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Stay Informed as the Schedule & Lineup Unfold
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Sign up for facilitator announcements, workshop registration alerts, and early-bird pass notifications. No spam, just mindful dispatches.
            </p>

            {subscribed ? (
              <div className="p-4 bg-gray-800 border border-gray-600 rounded-md text-sm font-mono text-gray-200 animate-in fade-in flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gray-300" />
                <span>Thank you! Your email is recorded for festival updates.</span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 text-sm focus:outline-hidden focus:border-white font-sans"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-gray-950 font-bold rounded-md hover:bg-gray-200 transition-colors text-sm font-mono uppercase tracking-wider shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="font-mono text-[11px] text-gray-400">
              [ FPO Privacy Note: Unsubscribe anytime with 1-click. Stored securely. ]
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
