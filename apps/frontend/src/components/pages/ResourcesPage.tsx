'use client';

import { useState, useEffect, useMemo } from 'react';
import { apiFetch } from '@/lib/api';
import { PostData } from '@/lib/types';

const typeMap: Record<string, { label: string; color: string }> = {
  case_study: { label: 'Case Study', color: 'bg-green-100 text-green-800' },
  best_practice: { label: 'Best Practice', color: 'bg-blue-100 text-blue-800' },
  research: { label: 'Research', color: 'bg-purple-100 text-purple-800' },
  news: { label: 'News', color: 'bg-orange-100 text-orange-800' },
  guide: { label: 'Guide', color: 'bg-indigo-100 text-indigo-800' },
  other: { label: 'Other', color: 'bg-gray-100 text-gray-800' },
};

export default function ResourcesPage() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<PostData[]>('/api/posts/').then(setPosts).catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = posts;
    if (searchTerm.trim()) {
      const s = searchTerm.toLowerCase();
      result = result.filter(p => p.title?.toLowerCase().includes(s) || p.description?.toLowerCase().includes(s) || p.content?.toLowerCase().includes(s));
    }
    if (selectedType) result = result.filter(p => p.type === selectedType);
    return result;
  }, [posts, searchTerm, selectedType]);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-white py-12 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Knowledge Hub: Best Practices for Clean Air</h1>
          <p className="text-green-700">A central repository for best practices, case studies, research, and resources.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0 space-y-6">
          <input type="text" placeholder="Search posts..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" />
          <div>
            <p className="font-medium text-sm text-gray-700 mb-2">Filter by Type</p>
            <div className="space-y-2">
              {Object.entries(typeMap).map(([key, val]) => (
                <button key={key} onClick={() => setSelectedType(selectedType === key ? null : key)} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedType === key ? 'bg-teal-100 text-teal-800 font-medium' : 'hover:bg-gray-100 text-gray-600'}`}>
                  {val.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-600 text-lg">Loading posts...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.length > 0 ? filtered.map(post => {
                const td = typeMap[post.type] || typeMap.other;
                return (
                  <div key={post.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      {post.image && <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
                      <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${td.color}`}>{td.label}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{post.description}</p>
                      <div className="mt-3 text-xs text-gray-400">
                        School ID: {post.school_id} · {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="col-span-full text-center py-12 text-gray-500">No posts found matching your filters.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
