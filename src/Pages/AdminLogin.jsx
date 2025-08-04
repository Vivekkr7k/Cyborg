import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = 'admin1@gmail.com';
const ADMIN_PASS = 'admin001';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setSuccess(true);
      setError('');
      setTimeout(() => {
        navigate('/adminhomepage');
      }, 800);
    } else {
      setError('Invalid email or password');
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-cyan-100 font-montserrat">
      <div className="bg-white/90 rounded-3xl shadow-2xl flex flex-col items-center px-8 py-10 w-full max-w-md border border-blue-200">
        <img src="https://cyborgsapient.com/assets/images/logo.png" alt="Logo" className="w-20 h-20 mb-6 rounded-full shadow-md bg-white p-2" />
        <h2 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">Admin Login</h2>
        <p className="text-slate-500 mb-6 text-center">Sign in to your admin account</p>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-700 text-sm mb-1" htmlFor="email">Email ID</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-cyan-500 focus:outline-none bg-blue-50 text-slate-800 placeholder-slate-400 transition"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-cyan-500 focus:outline-none bg-blue-50 text-slate-800 placeholder-slate-400 transition"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">Login successful!</div>}
          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all text-lg tracking-wide"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
