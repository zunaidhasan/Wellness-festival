import React from 'react';
import { Tag } from 'lucide-react';

interface AnnotationBadgeProps {
  label: string;
  notes?: string;
  visible: boolean;
  className?: string;
}

export const AnnotationBadge: React.FC<AnnotationBadgeProps> = ({
  label,
  notes,
  visible,
  className = '',
}) => {
  if (!visible) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 mb-3 rounded bg-gray-900 text-white font-mono text-[11px] font-medium tracking-tight shadow-sm border border-gray-700 select-none ${className}`}
    >
      <Tag className="w-3 h-3 text-gray-400" />
      <span className="text-gray-300 font-bold uppercase">{label}</span>
      {notes && (
        <>
          <span className="text-gray-600">•</span>
          <span className="text-gray-400 font-normal">{notes}</span>
        </>
      )}
    </div>
  );
};
