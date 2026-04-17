'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import { feedbackControllerCreate } from '@/lib/api-client';

export default function FeedbackPage() {
  const [form, setForm] = useState({ full_name: '', email: '', subject: '', message: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    if (error) setError('');
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!form.full_name.trim()) { setError('Full name is required'); return; }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Valid email is required'); return; }
    if (!form.subject.trim()) { setError('Subject is required'); return; }
    if (form.message.trim().length < 10) { setError('Message must be at least 10 characters'); return; }

    setLoading(true);
    try {
      await feedbackControllerCreate({
        body: { ...form, phone: form.phone.trim() || undefined },
      });
      setSuccess(true);
      setForm({ full_name: '', email: '', subject: '', message: '', phone: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Connect With Us</h1>
          <p className="text-gray-500 text-lg">We&apos;d love to hear from you! Whether you have a question, a partnership proposal, or feedback.</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div><p className="font-medium text-green-800">Thank you for your feedback!</p><p className="text-sm text-green-700">We&apos;ve received your message and will get back to you soon.</p></div>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          <div className="hidden lg:block lg:w-2/5 relative">
            <Image src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop" alt="Community" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent flex items-end p-12">
              <div className="text-white">
                <p className="text-sm font-medium text-teal-200">Community</p>
                <h2 className="text-3xl font-bold mt-2">Together Against<br />Air Pollution</h2>
                <p className="text-teal-200 mt-2">AirConnect Hanoi</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label><input name="full_name" value={form.full_name} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" placeholder="Enter your full name" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" placeholder="your.email@example.com" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-gray-400 text-xs">(Optional)</span></label><input name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" placeholder="+84 123 456 789" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label><input name="subject" value={form.subject} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" placeholder="What is this regarding?" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Message *</label><textarea name="message" rows={4} value={form.message} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" placeholder="How can we help? (Min 10 characters)" /></div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Sending...</> : <><Send className="w-5 h-5" />Send Message</>}
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: Mail, label: 'Email Address', value: 'contact@airconnecthanoi.org' },
            { icon: Phone, label: 'Phone Number', value: '+84 123 456 789' },
            { icon: MapPin, label: 'Our Address', value: '1 Dai Co Viet, Hai Ba Trung, Hanoi' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="bg-teal-50 p-3 rounded-full"><Icon className="w-6 h-6 text-teal-600" /></div>
              <div><div className="text-sm text-gray-500">{label}</div><div className="font-medium text-gray-900">{value}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
