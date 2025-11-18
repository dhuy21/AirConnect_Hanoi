import React from "react";
import { BookOpen, BarChart3, Users } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, colorClass }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col gap-4">
    <div
      className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass}`}
    >
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-teal-900">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Shared Knowledge Base",
      description:
        "Access a curated library of best practices, case studies, and proven strategies from peers.",
      colorClass: "bg-green-100 text-green-600",
    },
    {
      icon: BarChart3,
      title: "Live Air Quality Insights",
      description:
        "Get real-time data and alerts for your facilities to make informed, proactive decisions.",
      colorClass: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: Users,
      title: "Community & Expert Network",
      description:
        "Connect with experts, participate in forums, and collaborate on solutions with fellow managers.",
      colorClass: "bg-blue-100 text-blue-600",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-teal-900 mb-2">
            Empowering Facility Managers
          </h2>
          <p className="text-gray-500">
            Tools and community to elevate your air quality management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, index) => (
            <FeatureCard key={index} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
