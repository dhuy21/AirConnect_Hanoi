'use client';

import { useEffect, useState } from 'react';
import { LayoutDashboard, Map, MessageSquare, BookOpen, Settings, Check, X } from 'lucide-react';
import { Users, School, FileText, TrendingUp } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { apiFetch } from '@/lib/api';
import { StatsData, SubmissionData } from '@/lib/types';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/admin' },
  { icon: Map, label: 'Map', href: '/map' },
  { icon: MessageSquare, label: 'Feedback', href: '/feedback' },
  { icon: BookOpen, label: 'Resource Hub', href: '/resources' },
  { icon: Settings, label: 'Settings', href: '/dashboard/admin' },
];

const defaultStats: StatsData = {
  total_schools: 0, total_students: 0, total_submissions: 0,
  pending_reviews: 0, approved_submissions: 0, rejected_submissions: 0,
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData>(defaultStats);
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('Admin');
  const [reviewingId, setReviewingId] = useState<number | null>(null);
  const [reviewNote, setReviewNote] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  const fetchData = () => {
    Promise.all([
      apiFetch<StatsData>('/api/stats/').catch(() => null),
      apiFetch<SubmissionData[]>('/api/submissions/?limit=20').catch(() => []),
    ]).then(([s, sub]) => {
      if (s) setStats(s);
      setSubmissions(sub || []);
    }).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => {
    setUserName(localStorage.getItem('admin_username') || localStorage.getItem('admin_name') || 'Admin');
    fetchData();
  }, []);

  const handleReview = async (submissionId: number, decision: 'accepted' | 'rejected') => {
    setReviewLoading(true);
    try {
      await apiFetch('/api/reviews/', {
        method: 'POST',
        body: JSON.stringify({ submission_id: submissionId, decision, note: reviewNote }),
      });
      setReviewingId(null);
      setReviewNote('');
      fetchData();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Review failed');
    } finally {
      setReviewLoading(false);
    }
  };

  const statCards = [
    { icon: School, title: 'Total Schools', value: stats.total_schools, color: 'bg-blue-500' },
    { icon: Users, title: 'Total Students', value: stats.total_students, color: 'bg-green-500' },
    { icon: FileText, title: 'Submissions', value: stats.total_submissions, color: 'bg-purple-500' },
    { icon: TrendingUp, title: 'Pending Reviews', value: stats.pending_reviews, color: 'bg-orange-500' },
  ];

  return (
    <DashboardSidebar items={sidebarItems} userName={userName} userRole="Administrator">
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage and monitor all schools and submissions</p>
        </div>
        {loading ? <div className="text-center py-12 text-gray-400">Loading...</div> : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((s, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm text-gray-500 mb-1">{s.title}</p><p className="text-3xl font-bold text-gray-900">{s.value}</p></div>
                    <div className={`p-4 rounded-full ${s.color}`}><s.icon className="w-6 h-6 text-white" /></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Submissions</h2>
              {submissions.length === 0 ? <p className="text-center py-12 text-gray-400">No submissions yet</p> : (
                <div className="space-y-4">
                  {submissions.map(sub => (
                    <div key={sub.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{sub.type} — Submission #{sub.id}</p>
                          <p className="text-sm text-gray-500">School ID: {sub.from_school_id}</p>
                          {sub.content && <p className="text-xs text-gray-400 mt-1 line-clamp-2">{sub.content.substring(0, 200)}</p>}
                        </div>
                        <div className="flex gap-2 shrink-0">
                          {reviewingId === sub.id ? (
                            <div className="flex flex-col gap-2">
                              <textarea value={reviewNote} onChange={e => setReviewNote(e.target.value)} placeholder="Review note (optional)" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" rows={2} />
                              <div className="flex gap-2">
                                <button onClick={() => handleReview(sub.id, 'accepted')} disabled={reviewLoading} className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50"><Check className="w-4 h-4" /> Approve</button>
                                <button onClick={() => handleReview(sub.id, 'rejected')} disabled={reviewLoading} className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:opacity-50"><X className="w-4 h-4" /> Reject</button>
                                <button onClick={() => { setReviewingId(null); setReviewNote(''); }} className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                              </div>
                            </div>
                          ) : (
                            <button onClick={() => setReviewingId(sub.id)} className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors">Review</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardSidebar>
  );
}
