import React from "react";
import { useNavigate } from "react-router-dom";
import { PopButton, WaveCard, PulseButton } from "../components";
import { BookOpen, BarChart3, Users } from "lucide-react";
import routes from "../config/routes";


const FEATURE_CARDS = [
  {
    id: "knowledge-base",
    icon: BookOpen,
    title: "Shared Knowledge Base",
    description:
      "Access a curated library of best practices, case studies, and proven strategies from peers.",
  },
  {
    id: "air-quality",
    icon: BarChart3,
    title: "Live Air Quality Insights",
    description:
      "Get real-time data and alerts for your facilities to make informed, proactive decisions.",
  },
  {
    id: "community",
    icon: Users,
    title: "Community & Expert Network",
    description:
      "Connect with experts, participate in forums, and collaborate on solutions with fellow managers.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleJoinUs = () => {
    navigate(routes.register);
  };

  const handleLogin = () => {
    navigate(routes.login);
  };

  return (
    <div className="bg-white font-sans text-gray-900 selection:bg-green-200">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-teal-900 leading-tight">
            Breathe Easier, <br />
            <span className="text-teal-800">Together.</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-md leading-relaxed">
            The collaborative hub for Hanoi's facility managers to share best
            practices and combat air pollution in our city.
          </p>

          <div className="flex gap-4 pt-4">
            <PopButton variant="green" onClick={handleJoinUs}>Join us</PopButton>
            <PopButton variant="teal" onClick={handleLogin}>Login</PopButton>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 w-full">
          <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-video">
            <img
              src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop"
              alt="Hanoi Turtle Tower"
              className="w-full h-full object-cover hover:scale-105 transition duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white text-center px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-teal-600 font-bold text-xs tracking-widest uppercase">
            Our Mission
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-900">
            Uniting for Cleaner Air in Hanoi
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Hanoi faces significant air quality challenges. AirConnect provides a
            collaborative platform for facility managers to unite, share
            innovative solutions, and make a tangible impact on the air we
            breathe.
          </p>
        </div>
      </section>

      {/* Features Section */}
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
            {FEATURE_CARDS.map((card) => (
              <WaveCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="bg-gradient-to-br from-teal-800 to-teal-700 rounded-3xl p-12 md:p-20 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Join AirConnect Hanoi today and become part of a community dedicated
            to creating a healthier, more breathable city for everyone.
          </p>
          <PulseButton variant="green" onClick={handleJoinUs}>Join us now</PulseButton>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
