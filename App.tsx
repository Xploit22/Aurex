
import React, { useState, useEffect, useCallback } from 'react';
import { Website } from './types';
import { INITIAL_WEBSITES } from './constants';
import WebsiteCard from './components/WebsiteCard';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [syncId, setSyncId] = useState<string | null>(() => localStorage.getItem('aurex_sync_id'));
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Initial Data Load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const localData = localStorage.getItem('aurex_hub_links');
      
      if (syncId) {
        try {
          const response = await fetch(`https://api.npoint.io/bins/${syncId}`);
          if (response.ok) {
            const cloudData = await response.json();
            setWebsites(cloudData.websites || []);
          } else {
            // If bin not found, fall back to local
            setWebsites(localData ? JSON.parse(localData) : INITIAL_WEBSITES);
          }
        } catch (error) {
          console.error("Cloud fetch failed:", error);
          setWebsites(localData ? JSON.parse(localData) : INITIAL_WEBSITES);
        }
      } else {
        setWebsites(localData ? JSON.parse(localData) : INITIAL_WEBSITES);
      }
      setIsLoading(false);
    };

    loadData();
  }, [syncId]);

  // Auto-Save Logic (Local + Cloud)
  useEffect(() => {
    if (isLoading) return;

    localStorage.setItem('aurex_hub_links', JSON.stringify(websites));

    if (syncId) {
      const syncToCloud = async () => {
        setIsSyncing(true);
        try {
          await fetch(`https://api.npoint.io/bins/${syncId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ websites })
          });
        } catch (error) {
          console.error("Cloud sync failed:", error);
        } finally {
          setIsSyncing(false);
        }
      };

      const timeoutId = setTimeout(syncToCloud, 1000); // Debounce sync
      return () => clearTimeout(timeoutId);
    }
  }, [websites, syncId, isLoading]);

  const handleAddWebsite = (website: Website) => {
    setWebsites((prev) => [website, ...prev]);
  };

  const handleDeleteWebsite = (id: string) => {
    if (window.confirm('Are you sure you want to remove this node from Aurex?')) {
      setWebsites((prev) => prev.filter((w) => w.id !== id));
    }
  };

  const handleSetSyncId = (id: string | null) => {
    setSyncId(id);
    if (id) {
      localStorage.setItem('aurex_sync_id', id);
    } else {
      localStorage.removeItem('aurex_sync_id');
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowAdminPanel(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowAdminPanel(false);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Decorative background elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500 rounded-full blur-[120px] opacity-20 floating"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-500 rounded-full blur-[150px] opacity-20 floating" style={{ animationDelay: '2s' }}></div>

      <header className="pt-24 pb-16 px-6 max-w-6xl mx-auto w-full text-center relative z-10">
        <div className="inline-block mb-8">
          <div className="bg-white/10 backdrop-blur-xl px-12 py-6 rounded-[2.5rem] border border-white/20 shadow-2xl">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl italic">
              Aurex
            </h1>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xl md:text-2xl font-bold text-white/90 tracking-tight">Curated Digital Repository</p>
          <div className="flex items-center justify-center space-x-4">
             <div className="h-[1px] w-12 bg-white/20"></div>
             {syncId && (
               <div className="flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
                 <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
                 <span className="text-[10px] text-white font-black uppercase tracking-widest">Cloud Active</span>
               </div>
             )}
             {!syncId && <p className="text-white/60 font-bold uppercase tracking-[0.5em] text-[10px]">Created by Ashish</p>}
             <div className="h-[1px] w-12 bg-white/20"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 pb-48 relative z-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-6">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            <p className="text-white/40 font-black uppercase tracking-[0.4em] text-xs">Accessing Cloud Manifest...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {websites.map((site, index) => (
              <WebsiteCard 
                key={site.id} 
                website={site} 
                accentIndex={index % 4}
              />
            ))}

            {isLoggedIn && (
              <button 
                onClick={() => setShowAdminPanel(true)}
                className="group vibrant-card p-10 flex flex-col items-center justify-center border-dashed border-2 border-indigo-200 bg-white/40 hover:bg-white transition-all min-h-[200px]"
              >
                <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-xl group-hover:rotate-12 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="font-extrabold text-indigo-700 uppercase tracking-widest text-xs">Add New Node</span>
              </button>
            )}
          </div>
        )}

        {!isLoading && websites.length === 0 && (
          <div className="text-center py-40 bg-white/10 rounded-[3rem] border-2 border-dashed border-white/20">
            <p className="text-2xl font-black text-white/40 uppercase tracking-[0.4em]">Database Empty</p>
          </div>
        )}
      </main>

      {/* Control Fab */}
      <div className="fixed bottom-12 right-12 z-50">
        {!isLoggedIn ? (
          <button
            onClick={() => setShowLoginModal(true)}
            className="w-16 h-16 bg-white rounded-[1.5rem] shadow-2xl flex items-center justify-center text-indigo-600 hover:scale-110 active:scale-90 transition-all border border-indigo-50"
            title="System Access"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => setShowAdminPanel(true)}
            className="w-16 h-16 bg-white rounded-[1.5rem] shadow-2xl flex items-center justify-center text-pink-600 hover:scale-110 active:scale-90 transition-all border border-pink-50"
            title="Control Center"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </button>
        )}
      </div>

      {showLoginModal && (
        <AdminLogin
          onLogin={handleLogin}
          onClose={() => setShowLoginModal(false)}
        />
      )}

      {showAdminPanel && isLoggedIn && (
        <AdminPanel
          websites={websites}
          syncId={syncId}
          isSyncing={isSyncing}
          onAdd={handleAddWebsite}
          onDelete={handleDeleteWebsite}
          onSetSyncId={handleSetSyncId}
          onClose={() => setShowAdminPanel(false)}
          onLogout={handleLogout}
        />
      )}
      
      <footer className="py-16 text-center relative z-10 opacity-40">
        <p className="text-white text-[10px] font-black uppercase tracking-[0.8em]">
          &copy; {new Date().getFullYear()} AUREX PROTOCOL • v3.1 • CLOUD ENABLED
        </p>
      </footer>
    </div>
  );
};

export default App;
