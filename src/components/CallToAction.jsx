import React from "react";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 mb-12">
      <div className="bg-gradient-to-br from-teal-800 to-teal-700 rounded-3xl p-12 md:p-20 text-center text-white shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
          Join AirConnect Hanoi today and become part of a community dedicated
          to creating a healthier, more breathable city for everyone.
        </p>
        <button className="inline-flex items-center gap-2 px-8 py-3 bg-[#22c55e] hover:bg-green-500 text-white font-bold rounded-full transition transform hover:-translate-y-1 shadow-lg">
          Join us
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
