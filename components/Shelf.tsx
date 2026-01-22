
import React from 'react';
import { Entry } from '../types';
import { MediaItem } from './MediaItem';

interface ShelfProps {
  title: string;
  entries: Entry[];
  onEntryClick: (entry: Entry) => void;
}

export const Shelf: React.FC<ShelfProps> = ({ title, entries, onEntryClick }) => {
  return (
    <div className="mb-16 relative">
      <h2 className="text-3xl font-bold mb-6 ml-4 rotate-[-2deg] underline decoration-wavy underline-offset-8">
        {title}
      </h2>
      
      <div className="relative pt-4 pb-0 flex flex-wrap items-end gap-2 md:gap-4 border-b-8 border-[#4a3728] rounded-b-xl px-4 min-h-[220px]">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <MediaItem key={entry.id} entry={entry} onClick={() => onEntryClick(entry)} />
          ))
        ) : (
          <p className="w-full text-center pb-4 italic opacity-50">This shelf is empty...</p>
        )}
      </div>
      
      {/* Decorative Shelf Shadow */}
      <div className="h-4 w-full bg-black/5 blur-sm -mt-2"></div>
    </div>
  );
};
