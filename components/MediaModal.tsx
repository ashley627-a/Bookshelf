
import React from 'react';
import { Entry } from '../types';
import { X, Trash2, Edit2, Calendar, User, Film, BookOpen } from 'lucide-react';

interface MediaModalProps {
  entry: Entry | null;
  onClose: () => void;
  onDelete: (id: string) => void;
  onEdit: (entry: Entry) => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({ entry, onClose, onDelete, onEdit }) => {
  if (!entry) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div 
        className="bg-[#fcf9f2] w-full max-w-2xl hand-drawn-border hand-drawn-shadow overflow-hidden relative rotate-[0.5deg]"
        style={{ fontFamily: "'Patrick Hand', cursive" }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8">
          {/* Left Side: "Doodle" Cover */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div 
              className="w-48 h-64 hand-drawn-border flex flex-col items-center justify-center text-center p-4 rotate-[-2deg] mb-6 shadow-inner"
              style={{ backgroundColor: entry.color }}
            >
              <div className="mb-4 opacity-40">
                {entry.type === 'book' ? <BookOpen size={48} /> : <Film size={48} />}
              </div>
              <h3 className="text-xl font-bold mb-2 leading-tight">{entry.title}</h3>
              <p className="text-sm opacity-70 italic">{entry.creator}</p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => onEdit(entry)}
                className="p-2 border-2 border-[#4a3728] rounded-full hover:bg-yellow-100 transition-colors"
                title="Edit Entry"
              >
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => {
                  if (confirm('Erase this memory?')) {
                    onDelete(entry.id);
                    onClose();
                  }
                }}
                className="p-2 border-2 border-[#4a3728] rounded-full hover:bg-red-100 transition-colors"
                title="Delete Entry"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="flex-grow">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2 text-sm opacity-60">
                <Calendar size={14} />
                <span>{new Date(entry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <h2 className="text-4xl font-bold mb-1">{entry.title}</h2>
              <div className="flex items-center gap-2 text-lg italic opacity-80 mb-4">
                <User size={16} />
                <span>{entry.creator}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {entry.genres.map(genre => (
                  <span key={genre} className="bg-white border-2 border-[#4a3728] px-3 py-0.5 rounded-full text-sm font-bold rotate-[1deg]">
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-3xl ${i < entry.rating ? 'text-yellow-600' : 'text-gray-300 opacity-40'}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-3 left-4 bg-white px-2 text-xs font-bold border border-[#4a3728] rounded transform -rotate-2">
                Thoughts & Reflections
              </div>
              <div className="p-6 pt-8 border-2 border-[#4a3728] rounded-lg bg-white/50 italic leading-relaxed text-lg">
                "{entry.thoughts || 'No reflections logged for this entry yet...'}"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
