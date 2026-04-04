'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, FilePlus, BarChart3, Settings, ChevronDown, ChevronUp, Megaphone, Building2, Activity, ShieldCheck, CheckCircle } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { apiFetch } from '@/lib/api';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/school' },
  { icon: FilePlus, label: 'New Submission', href: '/dashboard/school/submission' },
  { icon: BarChart3, label: 'My Progress', href: '/dashboard/school' },
  { icon: Settings, label: 'Settings', href: '/dashboard/school' },
];

const criteriaConfig = [
  { icon: Megaphone, title: 'Proactive Responses', required: true, key: 'proactive_responses' },
  { icon: Building2, title: 'Adapted Facilities', required: true, key: 'adapted_facilities' },
  { icon: Activity, title: 'Air Quality Monitoring', required: true, key: 'air_quality_monitoring' },
  { icon: ShieldCheck, title: 'Respiratory Health Check-ups', required: false, key: 'health_checkups' },
];

interface CriterionState {
  status: 'done' | 'not_yet';
  pollutionLevel: string;
  actions: string;
  notes: string;
}

export default function NewSubmission() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState(0);
  const [schoolName, setSchoolName] = useState('School');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [criteria, setCriteria] = useState<Record<string, CriterionState>>(() =>
    Object.fromEntries(criteriaConfig.map(c => [c.key, { status: 'not_yet', pollutionLevel: 'moderate', actions: '', notes: '' }]))
  );

  useEffect(() => {
    setSchoolName(localStorage.getItem('school_name') || 'School');
  }, []);

  const updateCriterion = (key: string, field: keyof CriterionState, value: string) => {
    setCriteria(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
  };

  const handleSubmit = async () => {
    const requiredMissing = criteriaConfig
      .filter(c => c.required && criteria[c.key].status === 'not_yet')
      .map(c => c.title);

    if (requiredMissing.length > 0) {
      setError(`Please mark these required criteria as Done: ${requiredMissing.join(', ')}`);
      return;
    }

    setSubmitting(true);
    setError('');

    const content = criteriaConfig.map(c => {
      const state = criteria[c.key];
      return `[${c.title}] Status: ${state.status}, Level: ${state.pollutionLevel}, Actions: ${state.actions || 'N/A'}, Notes: ${state.notes || 'N/A'}`;
    }).join('\n\n');

    try {
      await apiFetch('/api/submissions/', {
        method: 'POST',
        body: JSON.stringify({ type: 'request', content }),
      });
      setSuccess(true);
      setTimeout(() => router.push('/dashboard/school'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <DashboardSidebar items={sidebarItems} userName={schoolName} userRole="School User" avatarColor="bg-teal-800">
        <div className="flex flex-col items-center justify-center py-20">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission Successful!</h2>
          <p className="text-gray-500">Redirecting to dashboard...</p>
        </div>
      </DashboardSidebar>
    );
  }

  return (
    <DashboardSidebar items={sidebarItems} userName={schoolName} userRole="School User" avatarColor="bg-teal-800">
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Update Your Air Pollution Mitigation Efforts</h1>
          <p className="text-gray-500 text-sm">Set the status for each criterion below. Fields marked with <span className="text-red-500">*</span> are mandatory.</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}

        <div className="max-w-4xl">
          {criteriaConfig.map((item, index) => {
            const Icon = item.icon;
            const isExpanded = index === expandedId;
            const state = criteria[item.key];
            return (
              <div key={item.key} className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4 transition-shadow hover:shadow-md">
                <div className={`p-5 flex items-center justify-between cursor-pointer ${isExpanded ? 'bg-gray-50 border-b border-gray-100' : ''}`} onClick={() => setExpandedId(isExpanded ? -1 : index)}>
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${state.status === 'done' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}><Icon className="w-5 h-5" /></div>
                    <h3 className="font-bold text-gray-800">{item.title} {item.required && <span className="text-red-500">*</span>}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1 px-1">
                      <button type="button" onClick={e => { e.stopPropagation(); updateCriterion(item.key, 'status', 'done'); }} className={`px-3 py-1 rounded-full text-xs font-bold transition ${state.status === 'done' ? 'bg-green-500 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}>Done</button>
                      <button type="button" onClick={e => { e.stopPropagation(); updateCriterion(item.key, 'status', 'not_yet'); }} className={`px-3 py-1 rounded-full text-xs font-bold transition ${state.status === 'not_yet' ? 'bg-gray-300 text-gray-700' : 'text-gray-400 hover:bg-gray-200'}`}>Not Yet</button>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </div>
                {isExpanded && (
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pollution Level</label>
                      <select value={state.pollutionLevel} onChange={e => updateCriterion(item.key, 'pollutionLevel', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none">
                        <option value="moderate">Level 2: Moderate (AQI 51-100)</option>
                        <option value="unhealthy">Level 3: Unhealthy (AQI 101-150)</option>
                        <option value="very_unhealthy">Level 4: Very Unhealthy (AQI 151-200)</option>
                        <option value="hazardous">Level 5: Hazardous (AQI 201+)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Response Actions</label>
                      <textarea rows={3} value={state.actions} onChange={e => updateCriterion(item.key, 'actions', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none" placeholder="e.g., At Level 2, outdoor activities are moved indoors..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                      <textarea rows={3} value={state.notes} onChange={e => updateCriterion(item.key, 'notes', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none" placeholder="Share your success stories or challenges..." />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <button onClick={handleSubmit} disabled={submitting} className="mt-6 w-full py-4 bg-teal-600 text-white rounded-xl font-bold text-lg hover:bg-teal-700 transition-colors disabled:opacity-50">
            {submitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </div>
    </DashboardSidebar>
  );
}
