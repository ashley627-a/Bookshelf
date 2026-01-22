
import React from 'react';
import { Entry, EntryType } from '../types';
import { GENRES, SPINE_COLORS } from '../constants';
import { X, Save } from 'lucide-react';

interface EntryFormProps {
  initialData?: Entry | null;
  onSubmit: (entry: Entry) => void;
  onCancel: () => void;
}

export const EntryForm: React.FC<EntryFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState<Partial<Entry>>(
    initialData || {
      type: 'book',
      title: '',
      creator: '',
      genres: [],
      date: new Date().toISOString().split('T')[0],
      rating: 5,
      thoughts: '',
      color: SPINE_COLORS[Math.floor(Math.random() * SPINE_COLORS.length)]
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.creator) return;
    
    onSubmit({
      ...formData,
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      genres: formData.genres || [],
    } as Entry);
  };

  const toggleGenre = (genre: string) => {
    const current = formData.genres || [];
    if (current.includes(genre)) {
      setFormData({ ...formData, genres: current.filter(g => g !== genre) });
    } else {
      setFormData({ ...formData, genres: [...current, genre] });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 hand-drawn-border hand-drawn-shadow rotate-[-0.5deg]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold underline decoration-wavy underline-offset-4">
          {initialData ? 'Edit Entry' : 'Log New Entry'}
        </h2>
        <button onClick={onCancel} className="p-2 hover:bg-black/5 rounded-full">
          <X />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-4 mb-4">
          <label className="flex-1 cursor-pointer">
            <input 
              type="radio" 
              name="type" 
              value="book" 
              className="hidden" 
              checked={formData.type === 'book'}
              onChange={() => setFormData({ ...formData, type: 'book' })}
            />
            <div className={`p-3 text-center hand-drawn-border transition-colors ${formData.type === 'book' ? 'bg-[#d4cbb3]' : 'bg-white'}`}>
              📖 Book
            </div>
          </label>
          <label className="flex-1 cursor-pointer">
            <input 
              type="radio" 
              name="type" 
              value="movie" 
              className="hidden" 
              checked={formData.type === 'movie'}
              onChange={() => setFormData({ ...formData, type: 'movie' })}
            />
            <div className={`p-3 text-center hand-drawn-border transition-colors ${formData.type === 'movie' ? 'bg-[#d4cbb3]' : 'bg-white'}`}>
              🎬 Movie
            </div>
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1 ml-1">Title</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 hand-drawn-border focus:outline-none focus:ring-2 focus:ring-[#d4cbb3]"
              placeholder="e.g. The Hobbit"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 ml-1">
              {formData.type === 'book' ? 'Author' : 'Director'}
            </label>
            <input 
              type="text" 
              required
              value={formData.creator}
              onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
              className="w-full p-3 hand-drawn-border focus:outline-none focus:ring-2 focus:ring-[#d4cbb3]"
              placeholder={formData.type === 'book' ? 'J.R.R. Tolkien' : 'Peter Jackson'}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold mb-1 ml-1">Date</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-3 hand-drawn-border focus:outline-none focus:ring-2 focus:ring-[#d4cbb3]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold mb-1 ml-1">Rating</label>
              <select 
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full p-3 hand-drawn-border focus:outline-none focus:ring-2 focus:ring-[#d4cbb3] appearance-none"
              >
                {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} Stars</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 ml-1">Genres</label>
            <div className="flex flex-wrap gap-2">
              {GENRES.map(genre => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => toggleGenre(genre)}
                  className={`px-3 py-1 rounded-full text-sm border-2 border-[#4a3728] transition-colors ${formData.genres?.includes(genre) ? 'bg-[#4a3728] text-white' : 'bg-white'}`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 ml-1">Personal Thoughts</label>
            <textarea 
              value={formData.thoughts}
              onChange={(e) => setFormData({ ...formData, thoughts: e.target.value })}
              className="w-full p-3 hand-drawn-border focus:outline-none focus:ring-2 focus:ring-[#d4cbb3] h-32"
              placeholder="What did you feel? What did you learn?"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 ml-1">Spine Color</label>
            <div className="flex gap-2">
              {SPINE_COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-8 h-8 rounded-full border-2 border-[#4a3728] ${formData.color === color ? 'ring-2 ring-offset-2 ring-[#4a3728]' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-[#4a3728] text-white py-4 px-6 hand-drawn-border flex items-center justify-center gap-2 hover:bg-[#32251b] transition-colors mt-8 font-bold text-xl"
        >
          <Save size={24} />
          {initialData ? 'Update Scribble' : 'Save Entry'}
        </button>
      </form>
    </div>
  );
};
