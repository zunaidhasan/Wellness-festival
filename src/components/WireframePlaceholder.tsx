import React from 'react';
import { Image as ImageIcon, User, MapPin, Compass } from 'lucide-react';

interface WireframeBoxProps {
  label?: string;
  dimension?: string;
  aspectRatio?: string; // e.g. "aspect-video", "aspect-[16/9]", "aspect-[4/3]", "h-64", "h-96"
  className?: string;
  showDiagonals?: boolean;
  subtext?: string;
}

export const WireframeBox: React.FC<WireframeBoxProps> = ({
  label = 'Image Placeholder',
  dimension,
  aspectRatio = 'aspect-[16/9]',
  className = '',
  showDiagonals = true,
  subtext,
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden bg-gray-200 border border-gray-400/80 rounded-md select-none group flex flex-col items-center justify-center p-4 text-center transition-colors hover:bg-gray-250 ${aspectRatio} ${className}`}
    >
      {/* Wireframe crossed diagonals */}
      {showDiagonals && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none text-gray-300 stroke-current opacity-70"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <line x1="0" y1="0" x2="100" y2="100" strokeWidth="0.75" />
          <line x1="100" y1="0" x2="0" y2="100" strokeWidth="0.75" />
        </svg>
      )}

      {/* Wireframe content tag */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1.5 bg-gray-100/90 backdrop-blur-xs px-3.5 py-2 rounded border border-gray-400 text-gray-700 shadow-xs max-w-[90%]">
        <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-semibold text-gray-800">
          <ImageIcon className="w-3.5 h-3.5 text-gray-600 shrink-0" />
          <span className="truncate">[{label}]</span>
        </div>
        {dimension && (
          <span className="font-mono text-[10px] text-gray-500 tracking-tight">
            Dimensions: {dimension}
          </span>
        )}
        {subtext && (
          <span className="text-[11px] text-gray-600 font-sans leading-tight">
            {subtext}
          </span>
        )}
      </div>

      {/* Corner wireframe dimension ticks */}
      <span className="absolute top-1.5 left-2 font-mono text-[9px] text-gray-400 tracking-wider">
        + FPO
      </span>
      <span className="absolute bottom-1.5 right-2 font-mono text-[9px] text-gray-400 tracking-wider">
        GRAYSCALE WIREFRAME
      </span>
    </div>
  );
};

export const WireframeHeadshot: React.FC<{
  name?: string;
  role?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ name, role, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-36 h-36 sm:w-44 sm:h-44',
  }[size];

  return (
    <div
      className={`relative ${sizeClasses} rounded-md bg-gray-200 border-2 border-gray-400 flex flex-col items-center justify-center overflow-hidden shrink-0 select-none group hover:border-gray-600 transition-colors ${className}`}
      title={name ? `${name} - ${role || 'Facilitator'}` : 'Headshot Placeholder'}
    >
      <svg
        className="absolute inset-0 w-full h-full text-gray-300 stroke-current opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line x1="0" y1="0" x2="100" y2="100" strokeWidth="1" />
        <line x1="100" y1="0" x2="0" y2="100" strokeWidth="1" />
      </svg>
      <div className="relative z-10 flex flex-col items-center justify-center p-1 bg-gray-100/95 rounded border border-gray-300 text-center w-4/5">
        <User className="w-5 h-5 text-gray-600" />
        <span className="font-mono text-[9px] uppercase tracking-tighter text-gray-700 truncate max-w-full font-medium">
          {name ? `[${name.split(' ')[0]}]` : '[Headshot]'}
        </span>
      </div>
    </div>
  );
};

export const WireframeLogoBox: React.FC<{
  name: string;
  tier?: string;
  slot?: string;
  className?: string;
}> = ({ name, tier, slot, className = '' }) => {
  return (
    <div
      className={`h-20 sm:h-24 bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-400 rounded-md flex flex-col items-center justify-center p-3 text-center transition-all ${className}`}
    >
      <div className="font-mono text-xs uppercase font-semibold text-gray-800 tracking-wide flex items-center gap-1.5">
        <span>[{slot || 'Logo Placeholder'}]</span>
      </div>
      <p className="text-xs font-medium text-gray-700 truncate max-w-full mt-0.5">
        {name}
      </p>
      {tier && (
        <span className="font-mono text-[10px] text-gray-500 uppercase">
          {tier}
        </span>
      )}
    </div>
  );
};

export const WireframeMapBox: React.FC<{
  address: string;
  className?: string;
}> = ({ address, className = '' }) => {
  return (
    <div
      className={`relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[260px] bg-gray-200 border-2 border-gray-400 rounded-lg overflow-hidden flex flex-col items-center justify-center p-6 ${className}`}
    >
      {/* Blueprint grid pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
           style={{
             backgroundImage: 'linear-gradient(to right, #6b7280 1px, transparent 1px), linear-gradient(to bottom, #6b7280 1px, transparent 1px)',
             backgroundSize: '32px 32px'
           }}
      />
      
      {/* Diagonal markers */}
      <svg
        className="absolute inset-0 w-full h-full text-gray-300 stroke-current opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line x1="0" y1="0" x2="100" y2="100" strokeWidth="0.5" />
        <line x1="100" y1="0" x2="0" y2="100" strokeWidth="0.5" />
      </svg>

      {/* Map Pin Box */}
      <div className="relative z-10 bg-white border-2 border-gray-800 p-4 sm:p-5 rounded-md shadow-md max-w-md text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white mb-2">
          <MapPin className="w-5 h-5" />
        </div>
        <div className="font-mono text-xs uppercase font-bold text-gray-900 tracking-wider mb-1">
          [ Interactive Map & Venue Placeholder ]
        </div>
        <p className="text-sm font-semibold text-gray-900">
          Riverside Botanical Grounds & Cultural Pavilion
        </p>
        <p className="text-xs text-gray-600 mt-1 font-mono">{address}</p>
        <div className="mt-3 pt-2 border-t border-gray-200 flex items-center justify-center gap-3 text-xs text-gray-500 font-mono">
          <span className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" /> 45°31'12"N, 122°40'55"W
          </span>
          <span>•</span>
          <span>Gate A & North Parking</span>
        </div>
      </div>

      <span className="absolute bottom-2 left-3 font-mono text-[10px] text-gray-500">
        [ MAP_API_EMBED_CONTAINER_1440x600 ]
      </span>
      <span className="absolute top-2 right-3 font-mono text-[10px] text-gray-500">
        SCALE: 1:5000 (SIMULATED)
      </span>
    </div>
  );
};
