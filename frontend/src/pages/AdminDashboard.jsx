import React, { useEffect, useState } from "react";
import { Users, School, FileText, TrendingUp } from "lucide-react";
import { BACKEND_URL } from "../config/env";
import styles from "./AdminDashboard.module.css";

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1 group-hover:text-gray-700 transition-colors">{title}</p>
        <p className="text-3xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">{value}</p>
      </div>
      <div className={`p-4 rounded-full ${color} group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_schools: 0,
    total_students: 0,
    total_submissions: 0,
    pending_reviews: 0,
  });
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, submissionsRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/stats/`),
          fetch(`${BACKEND_URL}/api/submissions/?limit=10`),
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (submissionsRes.ok) {
          const submissionsData = await submissionsRes.json();
          setSubmissions(submissionsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statsCards = [
    {
      icon: School,
      title: "Total Schools",
      value: stats.total_schools,
      color: "bg-blue-500",
    },
    {
      icon: Users,
      title: "Total Students",
      value: stats.total_students,
      color: "bg-green-500",
    },
    {
      icon: FileText,
      title: "Submissions",
      value: stats.total_submissions,
      color: "bg-purple-500",
    },
    {
      icon: TrendingUp,
      title: "Pending Reviews",
      value: stats.pending_reviews,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className={styles.animateFadeIn}>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold text-gray-900 ${styles.animateSlideDown}`}>Admin Dashboard</h1>
        <p className={`text-gray-500 mt-2 ${styles.animateSlideDown} ${styles.animationDelay100}`}>
          Manage and monitor all schools and submissions
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <div key={index} className={styles.animateFadeInUp} style={{ animationDelay: `${index * 100}ms` }}>
                <StatCard {...stat} />
              </div>
            ))}
          </div>

          <div className={`bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 ${styles.animateFadeInUp}`} style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Recent Submissions
              </h2>
            </div>
            {submissions.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p>No submissions yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((sub, index) => (
                  <div
                    key={sub.id}
                    className="border-b border-gray-100 pb-4 last:border-0 hover:bg-gray-50 hover:rounded-lg p-3 -mx-3 transition-all duration-200 cursor-pointer"
                    style={{ animationDelay: `${(index + 5) * 50}ms` }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          {sub.type} - Submission #{sub.id}
                        </p>
                        <p className="text-sm text-gray-500">
                          School ID: {sub.from_school_id}
                        </p>
                        {sub.content && (
                          <p className="text-xs text-gray-400 mt-1 truncate max-w-md">
                            {sub.content.substring(0, 100)}...
                          </p>
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
  );
};

export default AdminDashboard;

