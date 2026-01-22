
import React from 'react';
import { View } from '../types';
import { BookOpen, BarChart2, PlusCircle, Layout as LayoutIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onViewChange: (view: View) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-5xl mx-auto p-4 md:p-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 rotate-[-1deg] tracking-tight text-[#4a3728]" style={{ fontFamily: "'Indie Flower', cursive" }}>
          The Doodle Library
        </h1>
        <p className="text-xl opacity-80 italic">Logging your media adventures, one scribble at a time.</p>
      </header>

      <nav className="flex justify-center gap-4 mb-12 sticky top-4 z-50">
        <button
          onClick={() => onViewChange('library')}
          className={`px-6 py-2 hand-drawn-border hand-drawn-shadow flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 ${activeView === 'library' ? 'bg-[#d4cbb3]' : 'bg-white'}`}
        >
          <LayoutIcon size={20} />
          <span>Shelves</span>
        </button>
        <button
          onClick={() => onViewChange('stats')}
          className={`px-6 py-2 hand-drawn-border hand-drawn-shadow flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 ${activeView === 'stats' ? 'bg-[#d4cbb3]' : 'bg-white'}`}
        >
          <BarChart2 size={20} />
          <span>Stats</span>
        </button>
        <button
          onClick={() => onViewChange('add')}
          className={`px-6 py-2 hand-drawn-border hand-drawn-shadow flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 ${activeView === 'add' ? 'bg-[#d4cbb3]' : 'bg-white'}`}
        >
          <PlusCircle size={20} />
          <span>Add Entry</span>
        </button>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="mt-20 py-8 text-center opacity-60 border-t-2 border-dashed border-[#4a3728]">
        <p>&copy; {new Date().getFullYear()} — Made with scribbles and coffee.</p>
      </footer>
    </div>
  );
};
