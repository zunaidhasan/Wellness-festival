import React from 'react';
import { PageId } from '../types';
import { Monitor, Smartphone, Layers, Eye, EyeOff, Calendar, MapPin } from 'lucide-react';

interface PrototypeToolbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  showAnnotations: boolean;
  onToggleAnnotations: () => void;
  viewportMode: 'desktop' | 'fluid';
  onSetViewportMode: (mode: 'desktop' | 'fluid') => void;
}

export const PrototypeToolbar: React.FC<PrototypeToolbarProps> = ({
  currentPage,
  onNavigate,
  showAnnotations,
  onToggleAnnotations,
  viewportMode,
  onSetViewportMode,
}) => {
  const [collapsed, setCollapsed] = React.useState(false);

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white font-mono text-xs px-3 py-2 rounded-full shadow-lg border border-gray-700 flex items-center gap-2 hover:bg-gray-800 transition-all cursor-pointer"
        title="Open Prototype Control Bar"
      >
        <Layers className="w-3.5 h-3.5" />
        <span>Prototype Inspector</span>
      </button>
    );
  }

  return (
    <aside aria-label="Prototype Bar" className="bg-gray-950 text-gray-200 border-b border-gray-800 font-mono text-xs z-50 select-none">
      <div className="max-w-[1440px] mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Prototype Status Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-800 text-gray-200 border border-gray-700 rounded text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></span>
            <span>LOW-FI PROTOTYPE</span>
          </div>
          <span className="hidden md:inline-block text-gray-500">|</span>
          <span className="text-gray-400 hidden lg:inline-flex items-center gap-1 text-[11px]">
            <Calendar className="w-3 h-3 text-gray-500" /> Sep 18–20, 2026
          </span>
          <span className="text-gray-400 hidden lg:inline-flex items-center gap-1 text-[11px]">
            <MapPin className="w-3 h-3 text-gray-500" /> Your City
          </span>
        </div>

        {/* Center: Quick Page Jump */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5">
          <span className="text-gray-500 text-[10px] uppercase tracking-wider mr-1 hidden sm:inline">
            Page:
          </span>
          {(
            [
              { id: 'home', label: '1. Home' },
              { id: 'schedule', label: '2. Schedule' },
              { id: 'tickets', label: '3. Tickets' },
              { id: 'about', label: '4. About' },
              { id: 'faq-contact', label: '5. FAQ & Venue' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                currentPage === item.id
                  ? 'bg-gray-100 text-gray-900 font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: Annotations toggle + Viewport toggle + Collapse */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleAnnotations}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] transition-colors cursor-pointer ${
              showAnnotations
                ? 'bg-gray-800 border-gray-500 text-white font-medium'
                : 'bg-transparent border-gray-800 text-gray-400 hover:text-gray-200'
            }`}
            title="Toggle UX wireframe notes and structural callouts"
          >
            {showAnnotations ? (
              <Eye className="w-3.5 h-3.5 text-gray-300" />
            ) : (
              <EyeOff className="w-3.5 h-3.5 text-gray-500" />
            )}
            <span className="hidden sm:inline">Wireframe Notes</span>
          </button>

          <div className="hidden sm:flex items-center bg-gray-900 border border-gray-800 rounded p-0.5">
            <button
              onClick={() => onSetViewportMode('fluid')}
              className={`p-1 rounded text-[11px] flex items-center gap-1 transition-colors cursor-pointer ${
                viewportMode === 'fluid'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              title="Responsive 100% Fluid Width"
            >
              <Smartphone className="w-3 h-3" />
              <span className="text-[10px]">Fluid</span>
            </button>
            <button
              onClick={() => onSetViewportMode('desktop')}
              className={`p-1 rounded text-[11px] flex items-center gap-1 transition-colors cursor-pointer ${
                viewportMode === 'desktop'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              title="Desktop First Container (1440px wide max)"
            >
              <Monitor className="w-3 h-3" />
              <span className="text-[10px]">1440px Max</span>
            </button>
          </div>

          <button
            onClick={() => setCollapsed(true)}
            className="text-gray-500 hover:text-gray-300 p-1 text-[11px] cursor-pointer"
            title="Minimize toolbar"
          >
            ✕
          </button>
        </div>
      </div>
    </aside>
  );
};
