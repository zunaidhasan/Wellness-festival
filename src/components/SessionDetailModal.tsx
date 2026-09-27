import React from 'react';
import { Session } from '../types';
import { X, Clock, MapPin, Bookmark, Check, Users, Award } from 'lucide-react';
import { WireframeHeadshot } from './WireframePlaceholder';

interface SessionDetailModalProps {
  session: Session | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (sessionId: string) => void;
}

export const SessionDetailModal: React.FC<SessionDetailModalProps> = ({
  session,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  if (!isOpen || !session) return null;

  const dayLabels = {
    1: 'Day 1 — Friday, Sep 18',
    2: 'Day 2 — Saturday, Sep 19',
    3: 'Day 3 — Sunday, Sep 20',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white border-2 border-gray-800 rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Modal Top Wireframe Header */}
        <div className="bg-gray-100 border-b border-gray-300 p-4 sm:p-5 flex items-start justify-between gap-3">
          <div>
            <div className="font-mono text-[10px] uppercase font-bold text-gray-500 mb-1">
              [ MODAL: SESSION_SPECIFICATION ]
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-gray-900 text-white font-mono text-xs font-semibold">
                {session.category}
              </span>
              <span className="px-2 py-0.5 rounded bg-gray-200 border border-gray-400 font-mono text-xs text-gray-800">
                {dayLabels[session.day]}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-950 leading-snug">
              {session.title}
            </h3>
            <p className="text-sm font-semibold text-gray-700 mt-1 flex items-center gap-1.5">
              <span>Led by:</span>
              <span className="text-gray-900 underline underline-offset-2">
                {session.facilitator}
              </span>
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-gray-50 rounded border border-gray-300 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500 shrink-0" />
              <div>
                <p className="text-gray-400 text-[10px]">TIME / DURATION</p>
                <p className="font-bold text-gray-900">{session.time}</p>
                <p className="text-gray-500 text-[10px]">({session.duration})</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
              <div>
                <p className="text-gray-400 text-[10px]">VENUE LOCATION</p>
                <p className="font-bold text-gray-900">{session.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <Users className="w-4 h-4 text-gray-500 shrink-0" />
              <div>
                <p className="text-gray-400 text-[10px]">CAPACITY / LEVEL</p>
                <p className="font-bold text-gray-900">{session.level}</p>
                <p className="text-gray-500 text-[10px]">Cap: {session.capacity}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-gray-900 mb-2">
              [Session Overview]
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {session.description}
            </p>
          </div>

          {/* Facilitator Preview */}
          <div className="p-4 bg-gray-100 rounded border border-gray-300 flex items-center gap-4">
            <WireframeHeadshot name={session.facilitator} size="sm" />
            <div>
              <div className="font-mono text-[10px] text-gray-500 uppercase">
                FACILITATOR BIO SUMMARY
              </div>
              <h5 className="font-bold text-sm text-gray-900">{session.facilitator}</h5>
              <p className="text-xs text-gray-600 mt-0.5">
                Specialized in evidence-based instruction, alignment, and accessible group facilitation.
              </p>
            </div>
          </div>

          {/* What to Bring Info */}
          <div className="p-3 bg-gray-50 border border-dashed border-gray-400 rounded text-xs space-y-1 text-gray-700">
            <div className="font-mono font-bold text-gray-800 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-gray-600" />
              <span>Recommended Items to Bring:</span>
            </div>
            <p className="text-gray-600">
              Yoga mat or cushion, hydration bottle, breathable layered clothing, journal and pen. Props (blocks, straps) provided on-site.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-100 border-t border-gray-300 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onToggleBookmark(session.id)}
            className={`px-4 py-2 rounded text-xs font-mono font-semibold flex items-center gap-2 border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-800 border-gray-400 hover:bg-gray-200'
            }`}
          >
            {isBookmarked ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved to My Schedule</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Add to My Schedule</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 text-white rounded text-xs font-mono font-bold hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
