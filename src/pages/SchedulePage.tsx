import React, { useState, useMemo } from 'react';
import { PageId, Session } from '../types';
import { SESSIONS } from '../data/festivalData';
import { AnnotationBadge } from '../components/AnnotationBadge';
import {
  Clock,
  MapPin,
  User,
  Search,
  Bookmark,
  ChevronRight,
  Info,
  SlidersHorizontal,
  Check,
} from 'lucide-react';

interface SchedulePageProps {
  onNavigate: (page: PageId) => void;
  onOpenSessionModal: (session: Session) => void;
  bookmarkedSessionIds: string[];
  onToggleBookmark: (sessionId: string) => void;
  showAnnotations: boolean;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({
  onNavigate,
  onOpenSessionModal,
  bookmarkedSessionIds,
  onToggleBookmark,
  showAnnotations,
}) => {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState<boolean>(false);

  // Day definitions
  const days = [
    { day: 1 as const, name: 'Day 1', date: 'Friday, Sep 18', label: 'Grounding & Opening' },
    { day: 2 as const, name: 'Day 2', date: 'Saturday, Sep 19', label: 'Immersion & Energy' },
    { day: 3 as const, name: 'Day 3', date: 'Sunday, Sep 20', label: 'Integration & Closure' },
  ];

  // Category filters
  const categories = ['All', 'Yoga', 'Meditation', 'Workshops', 'Talks'];

  // Filtered sessions
  const filteredSessions = useMemo(() => {
    return SESSIONS.filter((session) => {
      // Day matching (unless viewing bookmarks only)
      const matchesDay = showOnlyBookmarked ? true : session.day === activeDay;

      // Category matching
      const matchesCategory =
        activeCategory === 'All' ? true : session.category.toLowerCase() === activeCategory.toLowerCase();

      // Search matching
      const matchesSearch =
        searchQuery.trim() === ''
          ? true
          : session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            session.facilitator.toLowerCase().includes(searchQuery.toLowerCase()) ||
            session.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Bookmark filter
      const matchesBookmark = showOnlyBookmarked ? bookmarkedSessionIds.includes(session.id) : true;

      return matchesDay && matchesCategory && matchesSearch && matchesBookmark;
    });
  }, [activeDay, activeCategory, searchQuery, showOnlyBookmarked, bookmarkedSessionIds]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <AnnotationBadge
        label="SCHEDULE PAGE"
        notes="Day Tabs (Day 1/2/3) • Filter Row • Interactive Time-slot List (6 sessions/day)"
        visible={showAnnotations}
      />

      {/* Page Header */}
      <div className="border-b-2 border-gray-300 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase font-semibold text-gray-500 flex items-center gap-2">
              <span>[ 3-DAY PROGRAM GUIDE ]</span>
              <span>•</span>
              <span>September 18–20, 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mt-1">
              Festival Schedule & Lineup
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 max-w-2xl">
              18 curated sessions across four dedicated pavilions. Select a day, apply category filters, or click any session to inspect details.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('tickets')}
              className="px-5 py-2.5 bg-gray-900 text-white rounded font-mono text-xs uppercase font-bold hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Get Festival Pass
            </button>
          </div>
        </div>
      </div>

      {/* DAY TABS (Day 1 / Day 2 / Day 3) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase font-bold text-gray-600 tracking-wider">
            [ Select Festival Day ]
          </span>
          <button
            onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
            className={`font-mono text-xs px-3 py-1 rounded border flex items-center gap-1.5 transition-colors cursor-pointer ${
              showOnlyBookmarked
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-400 hover:bg-gray-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>My Bookmarks ({bookmarkedSessionIds.length})</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {days.map((item) => {
            const isSelected = activeDay === item.day && !showOnlyBookmarked;
            return (
              <button
                key={item.day}
                onClick={() => {
                  setShowOnlyBookmarked(false);
                  setActiveDay(item.day);
                }}
                className={`p-4 rounded-lg border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md ring-2 ring-gray-900/20'
                    : 'bg-white text-gray-800 border-gray-300 hover:border-gray-500 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-mono text-xs font-bold uppercase tracking-wider ${
                      isSelected ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isSelected ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    6 Sessions
                  </span>
                </div>
                <div className="font-extrabold text-lg sm:text-xl font-sans">
                  {item.date}
                </div>
                <div
                  className={`text-xs mt-1 ${
                    isSelected ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  Theme: {item.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* FILTER ROW (All, Yoga, Meditation, Workshops, Talks) + Search Bar */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-gray-500 font-bold uppercase mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </span>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-gray-900 text-white border-gray-900 shadow-xs'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] max-w-sm">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search session or facilitator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded font-sans focus:outline-hidden focus:border-gray-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Status subline */}
        <div className="flex items-center justify-between text-xs font-mono text-gray-500 pt-1 border-t border-gray-200">
          <span>
            Showing {filteredSessions.length} session{filteredSessions.length === 1 ? '' : 's'}
            {showOnlyBookmarked ? ' in your saved schedule' : ` for Day ${activeDay}`}
          </span>
          {activeCategory !== 'All' && (
            <button
              onClick={() => setActiveCategory('All')}
              className="text-gray-700 hover:text-black underline cursor-pointer"
            >
              Reset category filter
            </button>
          )}
        </div>
      </div>

      {/* TIME-SLOT LIST */}
      <div className="space-y-3">
        {filteredSessions.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center space-y-3">
            <p className="font-mono text-sm text-gray-500 uppercase">
              [ NO MATCHING SESSIONS FOUND ]
            </p>
            <p className="text-gray-700 text-sm">
              Try adjusting your category filter or search keywords.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setShowOnlyBookmarked(false);
              }}
              className="px-4 py-2 bg-gray-900 text-white rounded text-xs font-mono font-bold hover:bg-gray-800 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredSessions.map((session) => {
            const isBookmarked = bookmarkedSessionIds.includes(session.id);

            return (
              <div
                key={session.id}
                className="bg-white border-2 border-gray-300 hover:border-gray-800 rounded-lg p-4 sm:p-5 transition-all duration-150 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer"
                onClick={() => onOpenSessionModal(session)}
              >
                {/* Left: Time & Duration Column */}
                <div className="md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-gray-200 pb-3 md:pb-0 md:pr-4">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-gray-950">
                    <Clock className="w-3.5 h-3.5 text-gray-600" />
                    <span>{session.time}</span>
                  </div>
                  <div className="font-mono text-[11px] text-gray-500 mt-1 flex items-center gap-2">
                    <span>{session.duration}</span>
                    <span>•</span>
                    <span>{session.level}</span>
                  </div>
                  <span className="font-mono text-[10px] text-gray-400 block mt-1">
                    [Day {session.day}]
                  </span>
                </div>

                {/* Center: Title, Facilitator & Location */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Category Tag */}
                    <span className="px-2.5 py-0.5 rounded bg-gray-900 text-white font-mono text-xs font-semibold">
                      {session.category}
                    </span>
                    {/* Location Tag */}
                    <span className="px-2.5 py-0.5 rounded bg-gray-100 border border-gray-300 font-mono text-xs text-gray-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <span>{session.location}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-gray-950 group-hover:text-black">
                    {session.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <User className="w-3.5 h-3.5 text-gray-500" />
                    <span className="font-semibold">{session.facilitator}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">Cap: {session.capacity}</span>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-1 font-sans">
                    {session.description}
                  </p>
                </div>

                {/* Right: Actions */}
                <div
                  className="flex items-center justify-between md:justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-gray-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => onToggleBookmark(session.id)}
                    title={isBookmarked ? 'Remove from My Schedule' : 'Add to My Schedule'}
                    className={`p-2 rounded border transition-colors cursor-pointer ${
                      isBookmarked
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {isBookmarked ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => onOpenSessionModal(session)}
                    className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded font-mono text-xs font-semibold text-gray-800 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Details</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Schedule Info Box */}
      <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg flex items-start gap-3 text-xs text-gray-700">
        <Info className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-gray-900 font-mono">
            [ SCHEDULE ADVISORY & PAVILION ACCESS ]
          </p>
          <p className="text-gray-600 leading-relaxed">
            All Main Meadow Pavilion, Sunlight Shala, and Grove Amphitheater sessions are open on a first-come, first-seated basis. Garden Workshop Tents require pre-reservation via the mobile web app 7 days prior. Weekend & VIP passholders receive priority registration.
          </p>
        </div>
      </div>
    </div>
  );
};
