
import React from 'react';
import { Entry } from '../types';
import { Film, BookOpen } from 'lucide-react';

interface MediaItemProps {
  entry: Entry;
  onClick: () => void;
}

export const MediaItem: React.FC<MediaItemProps> = ({ entry, onClick }) => {
  // Random variation for a hand-drawn look
  const rotation = React.useMemo(() => (Math.random() * 4 - 2).toFixed(1), []);
  const height = React.useMemo(() => (160 + Math.random() * 40).toFixed(0), []);
  const width = React.useMemo(() => (35 + Math.random() * 15).toFixed(0), []);

  return (
    <div 
      className="group relative cursor-pointer"
      onClick={onClick}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Hover Speech Bubble */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white border-2 border-[#4a3728] px-3 py-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none shadow-md">
        <div className="flex items-center gap-1 font-bold">
          {Array.from({ length: entry.rating }).map((_, i) => (
            <span key={i} className="text-yellow-600">★</span>
          ))}
        </div>
        <div className="text-xs italic text-[#4a3728]/80">{entry.genres[0]}</div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-[#4a3728] rotate-45"></div>
      </div>

      <div 
        className="hand-drawn-border hand-drawn-shadow flex flex-col items-center justify-between py-4 transition-transform group-hover:-translate-y-2 group-hover:scale-105"
        style={{ 
          backgroundColor: entry.color,
          width: `${width}px`, 
          height: `${height}px` 
        }}
      >
        <div className="text-[#4a3728] opacity-60">
          {entry.type === 'book' ? <BookOpen size={16} /> : <Film size={16} />}
        </div>
        
        <div className="flex-grow flex items-center justify-center">
          <span 
            className="font-bold text-sm tracking-tighter [writing-mode:vertical-lr] rotate-180 uppercase truncate max-h-[100px]"
            title={entry.title}
          >
            {entry.title}
          </span>
        </div>

        <div className="w-full px-1 border-t border-[#4a3728]/20 mt-2">
           <div className="text-[8px] truncate text-center opacity-70">{entry.creator}</div>
        </div>
      </div>
    </div>
  );
};
