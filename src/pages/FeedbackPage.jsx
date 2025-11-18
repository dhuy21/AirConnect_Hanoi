import React from "react";
import Header from "../components/Header";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

const FeedbackPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Connect With Us
            </h1>
            <p className="text-green-700">
              We'd love to hear from you! Whether you have a question, a
              partnership proposal, or feedback.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Left: Illustration (Dùng ảnh thật hoặc placeholder màu) */}
            <div className="lg:w-1/2 bg-teal-50 relative min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1599235934749-c55a3e6f15f9?q=80&w=2070&auto=format&fit=crop"
                alt="Community"
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent flex items-end p-12">
                <h2 className="text-4xl font-bold text-white uppercase leading-tight">
                  Together Against
                  <br />
                  Air Pollution
                  <br />
                  <span className="text-green-400">AirConnect Hanoi</span>
                </h2>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:w-1/2 p-8 lg:p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-green-400 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="you@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-green-400 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    defaultValue="Partnership Opportunity"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-green-400 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-green-400 outline-none transition"
                  ></textarea>
                </div>
                <button className="w-full py-3 bg-[#22c55e] hover:bg-green-600 text-white font-bold rounded-lg shadow-lg transition">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Footer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Email Address</div>
                <div className="font-medium text-teal-900 text-sm">
                  contact@airconnecthanoi.org
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Phone Number</div>
                <div className="font-medium text-teal-900">+84 123 456 789</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Our Address</div>
                <div className="font-medium text-teal-900 text-xs">
                  1 Dai Co Viet, Hai Ba Trung, Hanoi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
