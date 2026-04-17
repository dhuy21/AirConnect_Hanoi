'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  authControllerLoginAdmin,
  authControllerLoginSchool,
  authControllerLoginStudent,
  authControllerRegisterStudent,
  schoolControllerGetAllSchools,
} from '@/lib/api-client';
import type { AuthResponseDto } from '@airconnect/shared-types/api';
import { School } from '@/lib/types';
import { storeAuthData } from '@/lib/auth';
import { ROLE_DASHBOARD_MAP, ROUTES } from '@/lib/routes';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'register');
  const [userType, setUserType] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    schoolControllerGetAllSchools()
      .then(({ data }) => setSchools(data ?? []))
      .catch(() => {});
  }, []);

  const [loginForm, setLoginForm] = useState({ email: '', username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    first_name: '', last_name: '', email: '', password: '', phone: '',
    birth_date: '', sex: 'male', health_status: '', school_id: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let data: AuthResponseDto | undefined;
      if (userType === 'admin') {
        const res = await authControllerLoginAdmin({
          body: { username: loginForm.username, password: loginForm.password },
        });
        data = res.data;
      } else if (userType === 'school') {
        const res = await authControllerLoginSchool({
          body: { email: loginForm.email, password: loginForm.password },
        });
        data = res.data;
      } else {
        const res = await authControllerLoginStudent({
          body: { email: loginForm.email, password: loginForm.password },
        });
        data = res.data;
      }
      if (!data) throw new Error('Empty auth response');

      storeAuthData(data);
      router.push(ROLE_DASHBOARD_MAP[data.role] ?? ROUTES.DASHBOARD_USER);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const schoolId = parseInt(registerForm.school_id);
      if (!schoolId || schoolId <= 0) { setError('Please select a valid school'); setLoading(false); return; }

      const res = await authControllerRegisterStudent({
        body: {
          first_name: registerForm.first_name,
          last_name: registerForm.last_name,
          email: registerForm.email,
          password: registerForm.password,
          phone: registerForm.phone,
          birth_date: registerForm.birth_date,
          sex: registerForm.sex as 'male' | 'female',
          health_status: registerForm.health_status,
          school_id: schoolId,
        },
      });
      if (!res.data) throw new Error('Empty auth response');

      storeAuthData(res.data);
      router.push(ROUTES.DASHBOARD_USER);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex bg-white transition-all duration-700 ${isLogin ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className="hidden lg:block w-[45%] relative overflow-hidden">
        <Image src={isLogin ? '/images/Login.jpeg' : '/images/Signin.jpeg'} alt="City" fill sizes="45vw" className="object-cover" />
        <div className="absolute bottom-20 left-12 text-white max-w-xl">
          <h2 className="text-5xl font-bold mb-4 leading-tight">{isLogin ? 'Welcome Back to' : 'Join'} AirConnect Hanoi</h2>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-12 lg:px-24 py-12 overflow-y-auto">
        <div className="flex gap-4 mb-6">
          <button onClick={() => setIsLogin(true)} className={`px-6 py-2 rounded-full font-medium transition-all ${isLogin ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Login</button>
          <button onClick={() => setIsLogin(false)} className={`px-6 py-2 rounded-full font-medium transition-all ${!isLogin ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Register</button>
        </div>

        {isLogin && (
          <div className="flex gap-2 mb-6">
            {['student', 'admin', 'school'].map(t => (
              <button key={t} onClick={() => setUserType(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${userType === t ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{isLogin ? 'Welcome Back' : 'Create Your Account'}</h2>
          <p className="text-gray-500">{isLogin ? "Join us and improve Hanoi's air quality." : "Connect with facility managers and improve Hanoi's air quality."}</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            {userType === 'admin' ? (
              <input type="text" placeholder="Username" value={loginForm.username} onChange={e => setLoginForm(p => ({ ...p, username: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" required />
            ) : (
              <input type="email" placeholder="Email" value={loginForm.email} onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" required />
            )}
            <input type="password" placeholder="Password" value={loginForm.password} onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" required />
            <button type="submit" disabled={loading} className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" value={registerForm.first_name} onChange={e => setRegisterForm(p => ({ ...p, first_name: e.target.value }))} className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" required />
              <input type="text" placeholder="Last Name" value={registerForm.last_name} onChange={e => setRegisterForm(p => ({ ...p, last_name: e.target.value }))} className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" required />
            </div>
            <input type="email" placeholder="Email" value={registerForm.email} onChange={e => setRegisterForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" required />
            <input type="password" placeholder="Password" value={registerForm.password} onChange={e => setRegisterForm(p => ({ ...p, password: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" required />
            <input type="tel" placeholder="Phone" value={registerForm.phone} onChange={e => setRegisterForm(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" required />
            <input type="date" value={registerForm.birth_date} onChange={e => setRegisterForm(p => ({ ...p, birth_date: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" required />
            <select value={registerForm.sex} onChange={e => setRegisterForm(p => ({ ...p, sex: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input type="text" placeholder="Health Status" value={registerForm.health_status} onChange={e => setRegisterForm(p => ({ ...p, health_status: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" required />
            <select value={registerForm.school_id} onChange={e => setRegisterForm(p => ({ ...p, school_id: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none" required>
              <option value="">Select your school</option>
              {schools.map(s => <option key={s.id} value={s.id}>{s.name} — {s.district || s.address}</option>)}
            </select>
            <button type="submit" disabled={loading} className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors disabled:opacity-50">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
