import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PopButton, WaveCard, PulseButton } from "../components";
import { BookOpen, BarChart3, Users, Sparkles } from "lucide-react";
import imageHome from "../assets/images/Home.jpeg";
import routes from "../config/routes";
import styles from "./HomePage.module.css";


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

  useEffect(() => {
    const animateOnLoad = () => {
      const elements = document.querySelectorAll("[data-animate]");
      
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.9;
        
        if (isVisible) {
          el.classList.add("opacity-0", "translate-y-8");
          setTimeout(() => {
            el.classList.add(styles.animateEntry);
            el.classList.remove("opacity-0", "translate-y-8");
          }, index * 150);
        } else {
          el.classList.add("opacity-0", "translate-y-8", "transition-all", "duration-700");
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateEntry);
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    animateOnLoad();

    return () => observer.disconnect();
  }, []);

  const handleJoinUs = () => {
    navigate(routes.register);
  };

  const handleLogin = () => {
    navigate(routes.login);
  };

  return (
    <div className="bg-gradient-to-b from-white via-teal-50/30 to-white font-sans text-gray-900 selection:bg-green-200 overflow-hidden flex flex-col">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12 relative w-full">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl -z-10" />

        {/* Text Content */}
        <div className="flex-1 space-y-6" data-animate>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100/50 rounded-full text-teal-700 text-sm font-medium mb-4 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Join the Movement</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className={styles.gradientText}>Breathe Easier,</span>
            <br />
            <span className="text-teal-800 relative inline-block">
              Together.
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-teal-200/40 -z-10 transform -skew-x-12"></span>
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg max-w-md leading-relaxed">
            The collaborative hub for Hanoi's facility managers to share best
            practices and combat air pollution in our city.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <PopButton 
              variant="green" 
              onClick={handleJoinUs}
              className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
            >
              Join us
            </PopButton>
            <PopButton 
              variant="teal" 
              onClick={handleLogin}
              className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
            >
              Login
            </PopButton>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 w-full" data-animate>
          <div className={`rounded-3xl overflow-hidden shadow-2xl relative aspect-video ${styles.floatAnimation} group`}>
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            <img
              src={imageHome}
              alt="Hanoi Turtle Tower"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />
            <div className={`absolute inset-0 ${styles.shimmer} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white text-center px-6 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-50/50 to-transparent" />
        <div className="max-w-3xl mx-auto space-y-4 relative z-10 flex flex-col items-center" data-animate>
          <p className="text-teal-600 font-bold text-xs tracking-widest uppercase inline-block px-4 py-1 bg-teal-50 rounded-full">
            Our Mission
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-900 relative inline-block">
            Uniting for Cleaner Air in Hanoi
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent"></span>
          </h2>
          <p className="text-gray-500 leading-relaxed text-lg">
            Hanoi faces significant air quality challenges. AirConnect provides a
            collaborative platform for facility managers to unite, share
            innovative solutions, and make a tangible impact on the air we
            breathe.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white px-6 w-full">
        <div className="max-w-7xl mx-auto flex flex-col">
          <div className="text-center mb-12" data-animate>
            <h2 className="text-3xl font-bold text-teal-900 mb-2">
              Empowering Facility Managers
            </h2>
            <p className="text-gray-500 text-lg">
              Tools and community to elevate your air quality management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURE_CARDS.map((card) => (
              <div
                key={card.id}
                data-animate
                className="transform hover:scale-105 transition-all duration-300"
              >
                <WaveCard
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16 w-full">
        <div 
          className={`bg-gradient-to-br from-teal-800 via-teal-700 to-green-700 rounded-3xl p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden ${styles.pulseGlow} transform hover:scale-[1.02] transition-transform duration-500 flex flex-col items-center`}
          data-animate
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-teal-100 mb-8 max-w-2xl mx-auto text-lg">
              Join AirConnect Hanoi today and become part of a community dedicated
              to creating a healthier, more breathable city for everyone.
            </p>
            <PulseButton 
              variant="green" 
              onClick={handleJoinUs}
              className="transform hover:scale-110 transition-all duration-300"
            >
              Join us now
            </PulseButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
