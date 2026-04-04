'use client';

import { useEffect, useState } from 'react';
import { ClipboardCheck, PieChart, Clock } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import AirQualityCard from '@/components/ui/AirQualityCard';
import { apiFetch } from '@/lib/api';
import { SubmissionData, AirQualityData, ReviewData } from '@/lib/types';
import { AUTH_KEYS } from '@/lib/auth';
import { schoolSidebarItems } from './sidebar-items';

export default function SchoolDashboard() {
  const [schoolName, setSchoolName] = useState('School');
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [reviews, setReviews] = useState<Record<number, ReviewData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const name = localStorage.getItem(AUTH_KEYS.SCHOOL_NAME);
    if (name) setSchoolName(name);
    const schoolId = localStorage.getItem(AUTH_KEYS.SCHOOL_ID);
    if (!schoolId) { setLoading(false); return; }

    Promise.all([
      apiFetch<SubmissionData[]>(`/api/submissions/school/${schoolId}`).catch(() => []),
      apiFetch<AirQualityData>(`/api/air-quality/school/${schoolId}`).catch(() => null),
    ]).then(([subs, aq]) => {
      setSubmissions(subs || []);
      setAirQuality(aq);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (submissions.length === 0) return;
    const fetchReviews = async () => {
      const results = await Promise.allSettled(
        submissions.map(sub =>
          apiFetch<ReviewData[]>(`/api/reviews/submission/${sub.id}`).then(d => ({ subId: sub.id, review: d[0] ?? null }))
        )
      );
      const map: Record<number, ReviewData> = {};
      for (const result of results) {
        if (result.status === 'fulfilled' && result.value.review) {
          map[result.value.subId] = result.value.review;
        }
      }
      setReviews(map);
    };
    fetchReviews();
  }, [submissions]);

  const approvedCount = Object.values(reviews).filter(r => r.decision === 'accepted').length;
  const pendingCount = submissions.length - Object.keys(reviews).length;
  const approvalRate = submissions.length > 0 ? Math.round((approvedCount / submissions.length) * 100) : 0;

  const getStatus = (subId: number) => {
    const review = reviews[subId];
    if (!review) return 'Pending Review';
    if (review.decision === 'accepted') return 'Approved';
    if (review.decision === 'rejected') return 'Rejected';
    return 'Pending Review';
  };

  const statusColors: Record<string, string> = {
    'Pending Review': 'bg-yellow-100 text-yellow-700',
    'Approved': 'bg-green-100 text-green-700',
    'Rejected': 'bg-red-100 text-red-700',
  };

  return (
    <DashboardSidebar items={schoolSidebarItems} userName={schoolName} userRole="School User" avatarColor="bg-teal-800">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-slide-down">Welcome back, {schoolName}!</h1>
        <p className="text-gray-500 mb-8">Here&apos;s an overview of your air quality mitigation efforts and submission statuses.</p>
        {loading ? <div className="text-center py-12 text-gray-400">Loading...</div> : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: 'Total Submissions', value: submissions.length, sub: 'items submitted', icon: ClipboardCheck, color: 'text-green-500' },
                { title: 'Approval Rate', value: `${approvalRate}%`, sub: `${approvedCount} approved`, icon: PieChart, color: 'text-blue-500' },
                { title: 'Pending Reviews', value: pendingCount, sub: 'awaiting admin approval', icon: Clock, color: 'text-orange-500' },
              ].map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-gray-600 font-medium">{s.title}</h3>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-1">{s.value}</div>
                  <div className="text-sm text-gray-500">{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <AirQualityCard airQuality={airQuality} loading={loading} />

              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100"><h3 className="font-bold text-lg text-gray-900">Submission Status Tracker</h3></div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                      <tr><th className="px-6 py-3">Criterion</th><th className="px-6 py-3">Date</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Feedback</th></tr>
                    </thead>
                    <tbody>
                      {submissions.length === 0 ? (
                        <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">No submissions yet</td></tr>
                      ) : submissions.map(sub => {
                        const status = getStatus(sub.id);
                        const review = reviews[sub.id];
                        return (
                          <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900">{sub.type} - #{sub.id}</td>
                            <td className="px-6 py-4 text-gray-500">{review ? new Date(review.date).toLocaleDateString() : 'N/A'}</td>
                            <td className="px-6 py-4"><span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>{status}</span></td>
                            <td className="px-6 py-4 text-gray-500 italic truncate max-w-xs">{review?.note || 'No feedback yet.'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardSidebar>
  );
}
