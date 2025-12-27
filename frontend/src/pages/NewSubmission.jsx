import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Megaphone,
  Building2,
  Activity,
  ShieldCheck,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

const CriteriaItem = ({
  icon: Icon,
  title,
  isRequired,
  isExpanded,
  status,
  onToggle,
}) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4 transition-shadow hover:shadow-md">
    <div
      className={`p-5 flex items-center justify-between cursor-pointer ${
        isExpanded ? "bg-gray-50 border-b border-gray-100" : ""
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-2 rounded-full ${
            isExpanded
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-gray-800">
          {title} {isRequired && <span className="text-red-500">*</span>}
        </h3>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1 px-1">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
              status === "Done"
                ? "bg-green-500 text-white shadow-sm"
                : "text-gray-500"
            }`}
          >
            Done
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
              status === "Not Yet"
                ? "bg-gray-300 text-gray-700"
                : "text-gray-400"
            }`}
          >
            Not Yet
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </div>
    </div>

    {/* Expanded Content */}
    {isExpanded && (
      <div className="p-6 space-y-6 animate-fade-in">
        <p className="text-sm text-gray-500">
          Detail your scenario-based response system. Specify actions for
          different air quality levels.
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pollution Level
          </label>
          <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none">
            <option>Level 2: Moderate (AQI 51-100)</option>
            <option>Level 3: Unhealthy (AQI 101-150)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Response Actions
          </label>
          <textarea
            rows="3"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="e.g., At Level 2, outdoor activities for students with asthma are moved indoors..."
          ></textarea>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h4 className="text-blue-800 font-bold text-sm mb-1">
            Website Management Board Notes
          </h4>
          <p className="text-blue-600 text-xs">
            This section is for board notes on city standard compliance and
            solutions. Your submission is{" "}
            <span className="font-bold">waiting for confirmation.</span>
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Share a Lesson / Inspire Others
          </label>
          <textarea
            rows="3"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Share your success stories and insights here..."
          ></textarea>
        </div>

        <div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition">
            <MessageSquare className="w-4 h-4" /> Request Help from Done Schools
          </button>
        </div>
      </div>
    )}
  </div>
);

const NewSubmission = () => {
  const [expandedId, setExpandedId] = useState(0);

  const criteria = [
    {
      icon: Megaphone,
      title: "Proactive Responses",
      required: true,
      status: "Done",
    },
    {
      icon: Building2,
      title: "Adapted Facilities",
      required: true,
      status: "Done",
    },
    {
      icon: Activity,
      title: "Air Quality Monitoring",
      required: true,
      status: "Not Yet",
    },
    {
      icon: ShieldCheck,
      title: "Respiratory Health Check-ups",
      required: false,
      status: "Not Yet",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Update Your Air Pollution Mitigation Efforts
        </h1>
        <p className="text-gray-500 text-sm">
          Set the status for each criterion below. Fields marked with{" "}
          <span className="text-red-500">*</span> are mandatory.
        </p>
      </div>

      <div className="max-w-4xl">
        {criteria.map((item, index) => (
          <CriteriaItem
            key={index}
            {...item}
            isExpanded={index === expandedId}
            onToggle={() => setExpandedId(index === expandedId ? -1 : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewSubmission;
