
import React, { useState } from 'react';
import { ADMIN_CREDENTIALS } from '../constants';

interface AdminLoginProps {
  onLogin: () => void;
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      onLogin();
    } else {
      setError('ACCESS_DENIED: Invalid Identity Secret');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-indigo-950/80 backdrop-blur-xl p-4">
      <div className="vibrant-card max-w-sm w-full p-12 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-600 via-pink-600 to-yellow-600"></div>
        
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-300 hover:text-gray-900 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-6 bg-indigo-50 rounded-[2rem] flex items-center justify-center border-2 border-indigo-100 shadow-inner">
            <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a2 2 0 012 2v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2V4a2 2 0 014 0v1h2V4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11v8a2 2 0 002 2h6a2 2 0 002-2v-8H7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight italic">Root Access</h2>
          <p className="text-[10px] text-indigo-500 font-black tracking-[0.4em] uppercase mt-2">Aurex Hub Protocol</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Identity</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-600 transition-all font-bold placeholder:text-gray-300"
              placeholder="System User"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Secret Key</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-600 transition-all font-bold placeholder:text-gray-300"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-pink-600 text-xs font-black text-center animate-pulse">{error}</p>}

          <button
            type="submit"
            className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl uppercase tracking-[0.3em] shadow-xl hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
