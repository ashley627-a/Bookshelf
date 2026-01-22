
import React, { useState, useMemo, useEffect } from 'react';
import { Entry, View } from './types';
import { Layout } from './components/Layout';
import { Shelf } from './components/Shelf';
import { MediaModal } from './components/MediaModal';
import { EntryForm } from './components/EntryForm';
import { Dashboard } from './components/Dashboard';
import { INITIAL_DATA } from './constants';
import { Search, Filter, BookOpen, Film } from 'lucide-react';

const App: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>(() => {
    const saved = localStorage.getItem('doodle_library_entries');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });
  
  const [activeView, setActiveView] = useState<View>('library');
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'book' | 'movie'>('all');

  useEffect(() => {
    localStorage.setItem('doodle_library_entries', JSON.stringify(entries));
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           entry.creator.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || entry.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [entries, searchQuery, filterType]);

  const books = filteredEntries.filter(e => e.type === 'book');
  const movies = filteredEntries.filter(e => e.type === 'movie');

  const handleAddEntry = (entry: Entry) => {
    setEntries(prev => [...prev, entry]);
    setActiveView('library');
  };

  const handleUpdateEntry = (updated: Entry) => {
    setEntries(prev => prev.map(e => e.id === updated.id ? updated : e));
    setEditingEntry(null);
    setSelectedEntry(null);
    setActiveView('library');
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
    setSelectedEntry(null);
  };

  const renderView = () => {
    switch (activeView) {
      case 'stats':
        return <Dashboard entries={entries} />;
      case 'add':
        return (
          <EntryForm 
            onSubmit={handleAddEntry} 
            onCancel={() => setActiveView('library')} 
          />
        );
      case 'library':
      default:
        return (
          <div className="space-y-8">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-12 items-center bg-white p-4 hand-drawn-border rotate-[0.5deg]">
              <div className="relative flex-grow w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" size={18} />
                <input 
                  type="text"
                  placeholder="Search titles or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-transparent focus:outline-none border-b-2 border-dashed border-[#4a3728]"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button 
                  onClick={() => setFilterType('all')}
                  className={`flex-1 md:flex-none px-4 py-1 hand-drawn-border transition-colors ${filterType === 'all' ? 'bg-[#d4cbb3]' : 'bg-white'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilterType('book')}
                  className={`flex-1 md:flex-none px-4 py-1 hand-drawn-border transition-colors flex items-center justify-center gap-2 ${filterType === 'book' ? 'bg-[#d4cbb3]' : 'bg-white'}`}
                >
                  <BookOpen size={14} /> Books
                </button>
                <button 
                  onClick={() => setFilterType('movie')}
                  className={`flex-1 md:flex-none px-4 py-1 hand-drawn-border transition-colors flex items-center justify-center gap-2 ${filterType === 'movie' ? 'bg-[#d4cbb3]' : 'bg-white'}`}
                >
                  <Film size={14} /> Movies
                </button>
              </div>
            </div>

            {/* Shelves */}
            {filterType !== 'movie' && (
              <Shelf 
                title="The Paper Trail (Books)" 
                entries={books} 
                onEntryClick={setSelectedEntry} 
              />
            )}
            {filterType !== 'book' && (
              <Shelf 
                title="Silver Screen Scribbles (Movies)" 
                entries={movies} 
                onEntryClick={setSelectedEntry} 
              />
            )}

            {filteredEntries.length === 0 && (
              <div className="text-center py-20 opacity-40 italic">
                <p className="text-2xl">No items found on the shelves...</p>
                <button 
                  onClick={() => {setSearchQuery(''); setFilterType('all');}}
                  className="mt-4 underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {renderView()}

      {selectedEntry && !editingEntry && (
        <MediaModal 
          entry={selectedEntry} 
          onClose={() => setSelectedEntry(null)} 
          onDelete={handleDeleteEntry}
          onEdit={setEditingEntry}
        />
      )}

      {editingEntry && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
          <div className="py-12 w-full">
            <EntryForm 
              initialData={editingEntry}
              onSubmit={handleUpdateEntry}
              onCancel={() => setEditingEntry(null)}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
