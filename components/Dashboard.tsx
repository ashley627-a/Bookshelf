
import React from 'react';
import { Entry } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface DashboardProps {
  entries: Entry[];
}

export const Dashboard: React.FC<DashboardProps> = ({ entries }) => {
  const totalItems = entries.length;
  const bookCount = entries.filter(e => e.type === 'book').length;
  const movieCount = entries.filter(e => e.type === 'movie').length;
  const avgRating = totalItems > 0 ? (entries.reduce((acc, curr) => acc + curr.rating, 0) / totalItems).toFixed(1) : 0;

  // Genre data
  const genreDataMap: Record<string, number> = {};
  entries.forEach(e => {
    e.genres.forEach(g => {
      genreDataMap[g] = (genreDataMap[g] || 0) + 1;
    });
  });
  const genreData = Object.entries(genreDataMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Rating distribution
  const ratingData = [1, 2, 3, 4, 5].map(r => ({
    stars: `${r} ★`,
    count: entries.filter(e => e.rating === r).length
  }));

  const COLORS = ['#e6b89c', '#9caf88', '#8ba6a9', '#757081', '#f0a202', '#fe5f55'];

  return (
    <div className="space-y-12">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Logs', value: totalItems },
          { label: 'Books Read', value: bookCount },
          { label: 'Movies Watched', value: movieCount },
          { label: 'Avg Rating', value: `${avgRating} ★` },
        ].map((stat, i) => (
          <div 
            key={stat.label} 
            className="p-6 bg-white hand-drawn-border hand-drawn-shadow text-center flex flex-col items-center justify-center rotate-[-1deg]"
            style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
          >
            <div className="text-4xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm opacity-60 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Genre Pie */}
        <div className="bg-white p-8 hand-drawn-border hand-drawn-shadow rotate-[0.5deg]">
          <h3 className="text-2xl font-bold mb-6 text-center underline decoration-dotted underline-offset-4">Top Genres</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="#4a3728"
                  strokeWidth={2}
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '2px solid #4a3728', 
                    borderRadius: '8px', 
                    fontFamily: 'Patrick Hand' 
                  }} 
                />
                <Legend iconType="circle" wrapperStyle={{ fontFamily: 'Patrick Hand' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rating Bar Chart */}
        <div className="bg-white p-8 hand-drawn-border hand-drawn-shadow rotate-[-0.5deg]">
          <h3 className="text-2xl font-bold mb-6 text-center underline decoration-dotted underline-offset-4">Rating Stacks</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="stars" stroke="#4a3728" axisLine={{ strokeWidth: 2 }} tickLine={false} style={{ fontFamily: 'Patrick Hand' }} />
                <YAxis stroke="#4a3728" axisLine={{ strokeWidth: 2 }} tickLine={false} style={{ fontFamily: 'Patrick Hand' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '2px solid #4a3728', 
                    borderRadius: '8px', 
                    fontFamily: 'Patrick Hand' 
                  }} 
                />
                <Bar 
                  dataKey="count" 
                  fill="#ead7bb" 
                  stroke="#4a3728" 
                  strokeWidth={2}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Inspirational Quote */}
      <div className="text-center py-12 px-8 border-2 border-dashed border-[#4a3728] rounded-3xl bg-white/30 italic">
        <p className="text-2xl mb-2">"A mind needs books as a sword needs a whetstone, if it is to keep its edge."</p>
        <p className="opacity-60">— George R.R. Martin</p>
      </div>
    </div>
  );
};
