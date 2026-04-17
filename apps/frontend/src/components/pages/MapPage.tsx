'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { schoolControllerGetAllSchools } from '@/lib/api-client';
import { School } from '@/lib/types';

const SchoolMap = dynamic(() => import('@/components/map/SchoolMap'), { ssr: false });

type ScoreKey = 'score_1' | 'score_2' | 'score_3' | 'score_4' | 'score_5';

const criteriaList: { label: string; scoreKey: ScoreKey }[] = [
  { label: 'Proactive Pollution Responses', scoreKey: 'score_1' },
  { label: 'Adapted Facilities', scoreKey: 'score_2' },
  { label: 'Air Quality Monitoring', scoreKey: 'score_3' },
  { label: 'Respiratory Health Check-ups', scoreKey: 'score_4' },
  { label: 'Mask Use Instructions', scoreKey: 'score_5' },
];

const getScoreLevel = (score: number) => {
  if (score < 40) return 'bad';
  if (score < 60) return 'moyen';
  if (score < 80) return 'good';
  return 'excellent';
};

export default function MapPage() {
  const [allSchools, setAllSchools] = useState<School[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Partial<Record<ScoreKey, string>>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    schoolControllerGetAllSchools()
      .then(({ data }) => setAllSchools(data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (scoreKey: ScoreKey, level: string) => {
    setFilters(prev => ({ ...prev, [scoreKey]: prev[scoreKey] === level ? undefined : level }));
  };

  const filteredSchools = useMemo(() => {
    let result = allSchools;
    if (searchTerm.trim()) {
      result = result.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    criteriaList.forEach(c => {
      const lvl = filters[c.scoreKey];
      if (lvl) result = result.filter(s => s[c.scoreKey] != null && getScoreLevel(s[c.scoreKey]) === lvl);
    });
    return result;
  }, [allSchools, searchTerm, filters]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 flex relative overflow-hidden">
        <div className="w-[22rem] bg-white border-r border-gray-200 overflow-y-auto p-4 hidden md:block">
          <h2 className="font-bold text-lg text-gray-900 mb-4">Filters</h2>
          {criteriaList.map(c => (
            <div key={c.scoreKey} className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">{c.label}</p>
              <div className="flex flex-wrap gap-2">
                {['bad', 'moyen', 'good', 'excellent'].map(lvl => (
                  <button key={lvl} onClick={() => handleFilterChange(c.scoreKey, lvl)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filters[c.scoreKey] === lvl ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-4 border-t pt-4">
            <p className="text-sm text-gray-500">{filteredSchools.length} schools found</p>
            <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
              {filteredSchools.map(s => (
                <div key={s.id} className="p-2 rounded-lg hover:bg-gray-50 cursor-pointer text-sm">{s.name}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 bg-gray-200 relative overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center"><p className="text-gray-600 text-lg">Loading map...</p></div>
          ) : (
            <>
              <div className="absolute inset-0 z-0 overflow-hidden">
                <SchoolMap filteredSchools={filteredSchools} />
              </div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-10">
                <input type="text" placeholder="Search for a school..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-lg focus:ring-2 focus:ring-teal-400 outline-none" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
