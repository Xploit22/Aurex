
import React, { useState } from 'react';
import { Website } from '../types';

interface AdminPanelProps {
  websites: Website[];
  onAdd: (website: Website) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
  onLogout: () => void;
}

type Tab = 'add' | 'manage';

const AdminPanel: React.FC<AdminPanelProps> = ({ websites, onAdd, onDelete, onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('manage');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) return;

    let formattedUrl = url;
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const newWebsite: Website = {
      id: Date.now().toString(),
      name,
      url: formattedUrl,
      imageUrl: imageUrl || undefined,
      createdAt: Date.now(),
    };

    onAdd(newWebsite);
    setName('');
    setUrl('');
    setImageUrl('');
    setActiveTab('manage'); // Switch to manage view after adding
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-indigo-950/90 backdrop-blur-2xl p-4 sm:p-6">
      <div className="vibrant-card bg-white max-w-4xl w-full h-[90vh] sm:h-[80vh] flex flex-col overflow-hidden border-4 border-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
        
        {/* Header Section */}
        <div className="p-6 sm:p-8 border-b border-gray-100 flex items-center justify-between bg-white relative">
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex w-12 h-12 bg-indigo-600 rounded-2xl items-center justify-center text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black text-indigo-900 tracking-tighter italic uppercase">Admin Protocol</h2>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1">Aurex Hub v3.0 // Secure Terminal</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          <button
            onClick={() => setActiveTab('manage')}
            className={`flex-1 py-5 text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-3 ${activeTab === 'manage' ? 'bg-white text-indigo-600 border-b-4 border-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            <span>Active Manifest</span>
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`flex-1 py-5 text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-3 ${activeTab === 'add' ? 'bg-white text-pink-600 border-b-4 border-pink-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            <span>Add New Node</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar">
          {activeTab === 'add' ? (
            <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">Alias / Title</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-indigo-50 rounded-[1.5rem] outline-none focus:border-indigo-600 transition-all font-bold placeholder:text-gray-300"
                    placeholder="Entry Name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">Digital Protocol / URL</label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-indigo-50 rounded-[1.5rem] outline-none focus:border-indigo-600 transition-all font-bold placeholder:text-gray-300"
                    placeholder="domain.ext"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">Visual Asset</label>
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="aurex-file-upload-tab" />
                    <label
                      htmlFor="aurex-file-upload-tab"
                      className="cursor-pointer px-8 py-5 bg-indigo-600 rounded-[1.5rem] text-[10px] font-black text-white hover:bg-indigo-700 transition-all flex items-center space-x-4 w-full sm:w-auto flex-1 shadow-lg uppercase tracking-widest"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      <span>Mount Source</span>
                    </label>
                    {imageUrl && (
                      <div className="relative w-16 h-16 rounded-[1.2rem] border-4 border-indigo-50 shadow-xl overflow-hidden group">
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button onClick={() => setImageUrl('')} className="absolute inset-0 bg-pink-600/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-6 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-black uppercase tracking-[0.4em] rounded-[1.5rem] shadow-2xl hover:scale-[1.01] active:scale-95 transition-all mt-8 text-sm"
                >
                  Deploy Entry
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              {websites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {websites.map((site) => (
                    <div key={site.id} className="flex items-center justify-between p-5 bg-indigo-50/30 rounded-3xl border border-indigo-50 hover:bg-white hover:shadow-lg transition-all group">
                      <div className="flex items-center space-x-5 overflow-hidden">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-indigo-100 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                          {site.imageUrl ? (
                            <img src={site.imageUrl} className="w-full h-full object-cover" alt="" />
                          ) : (
                            <span className="text-xl font-black text-indigo-300 italic">{site.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors truncate text-lg tracking-tight">{site.name}</p>
                          <p className="text-[10px] font-bold text-gray-400 truncate tracking-widest uppercase italic">{site.url.replace(/^https?:\/\//, '')}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onDelete(site.id)}
                        className="w-12 h-12 flex items-center justify-center text-gray-300 hover:text-pink-600 hover:bg-pink-50 rounded-2xl transition-all border border-transparent hover:border-pink-100"
                        title="Purge"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-200 py-32 space-y-6 opacity-50">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-8 4-8-4" /></svg>
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.5em]">No Data Cached</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Area */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <button 
            onClick={onLogout} 
            className="text-[10px] font-black text-pink-600 hover:text-pink-700 uppercase tracking-widest italic flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span>Terminate_Session()</span>
          </button>
          <div className="text-[9px] text-gray-300 font-bold uppercase tracking-[0.3em] flex items-center space-x-2">
            <span>Aurex Protocol</span>
            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
            <span>v3.0.4</span>
            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
            <span>Stable Node</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;
