import React from "react";
import {
  ClipboardCheck,
  PieChart,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-600 font-medium">{title}</h3>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <div className="text-4xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-500">{subtext}</div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    "Pending Review": "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };
  const dotColors = {
    "Pending Review": "bg-yellow-500",
    Approved: "bg-green-500",
    Rejected: "bg-red-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      <span className={`w-2 h-2 rounded-full ${dotColors[status]}`}></span>
      {status}
    </span>
  );
};

const SchoolDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome back, Hanoi Int'l School!
      </h1>
      <p className="text-gray-500 mb-8">
        Here's an overview of your air quality mitigation efforts and submission
        statuses.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Submissions"
          value="12"
          subtext="items submitted this year"
          icon={ClipboardCheck}
          color="text-green-500"
        />
        <StatCard
          title="Approval Rate"
          value="75%"
          subtext="↗ +5% from last month"
          icon={PieChart}
          color="text-blue-500"
        />
        <StatCard
          title="Pending Reviews"
          value="2"
          subtext="items awaiting admin approval"
          icon={Clock}
          color="text-orange-500"
        />
      </div>

      {/* Main Layout: Chart & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: AQI (Simplified Mockup) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between mb-6">
            <h3 className="font-bold text-gray-900">
              Live Air Quality - Hanoi
            </h3>
            <span className="text-xs text-gray-400">Updated 2 mins ago</span>
          </div>
          <div className="flex flex-col items-center justify-center py-8 relative">
            {/* CSS Circle Mockup */}
            <div className="w-40 h-40 rounded-full border-[12px] border-gray-100 border-t-orange-400 border-r-orange-400 flex items-center justify-center flex-col">
              <span className="text-4xl font-bold text-orange-500">89</span>
              <span className="text-sm font-medium text-orange-600">
                Moderate
              </span>
            </div>
          </div>
          <div className="flex justify-between text-center mt-4 px-4">
            <div>
              <div className="text-xs text-gray-500">PM2.5</div>
              <div className="font-bold">29.8 µg/m³</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">O3</div>
              <div className="font-bold">45 ppb</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">NO2</div>
              <div className="font-bold">12 ppb</div>
            </div>
          </div>
        </div>

        {/* Right: Submission Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-900">
              Submission Status Tracker
            </h3>
            <button className="bg-brand-DEFAULT hover:bg-brand-dark text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
              Share your feedback
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Criterion Updated</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Proactive Responses",
                    date: "2024-05-18",
                    status: "Pending Review",
                    fb: "No feedback yet.",
                  },
                  {
                    name: "Adapted Facilities",
                    date: "2024-05-17",
                    status: "Pending Review",
                    fb: "No feedback yet.",
                  },
                  {
                    name: "Monitoring Stations",
                    date: "2024-05-16",
                    status: "Approved",
                    fb: "Great detail provided.",
                  },
                  {
                    name: "Health Check-ups",
                    date: "2024-05-15",
                    status: "Rejected",
                    fb: "Please provide docs.",
                  },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{row.date}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-500 italic truncate max-w-xs">
                      {row.fb}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;
