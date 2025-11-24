import React from "react";
import { Users, School, FileText, Settings, TrendingUp } from "lucide-react";

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`p-4 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const stats = [
    {
      icon: School,
      title: "Total Schools",
      value: "124",
      color: "bg-blue-500",
    },
    {
      icon: Users,
      title: "Total Users",
      value: "2,847",
      color: "bg-green-500",
    },
    {
      icon: FileText,
      title: "Submissions",
      value: "89",
      color: "bg-purple-500",
    },
    {
      icon: TrendingUp,
      title: "Compliance Rate",
      value: "72%",
      color: "bg-orange-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Manage and monitor all schools and submissions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Recent Submissions
          </h2>
          <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">
            View All
          </button>
        </div>
        <div className="text-center py-12 text-gray-400">
          <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Admin panel content coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

