
import React, { useState } from 'react';
import { Website } from '../types';

interface AdminPanelProps {
  websites: Website[];
  onAdd: (website: Website) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ websites, onAdd, onDelete, onClose, onLogout }) => {
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
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-indigo-950/90 backdrop-blur-2xl p-4">
      <div className="vibrant-card bg-white max-w-6xl w-full h-[85vh] flex flex-col md:flex-row overflow-hidden border-4 border-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
        
        {/* Input Terminal */}
        <div className="w-full md:w-1/2 p-12 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col bg-indigo-50/20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black text-indigo-900 tracking-tighter italic">Link Terminal</h2>
            <button onClick={onClose} className="md:hidden text-indigo-600">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 flex-1">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">Alias / Title</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-5 bg-white border-2 border-indigo-50 rounded-[1.5rem] outline-none focus:border-indigo-600 transition-all font-bold placeholder:text-gray-300 shadow-sm"
                placeholder="Database Entry Name"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">Digital Protocol / URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-6 py-5 bg-white border-2 border-indigo-50 rounded-[1.5rem] outline-none focus:border-indigo-600 transition-all font-bold placeholder:text-gray-300 shadow-sm"
                placeholder="domain.ext"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">Visual Asset</label>
              <div className="flex items-center space-x-6">
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="aurex-file-upload" />
                <label
                  htmlFor="aurex-file-upload"
                  className="cursor-pointer px-8 py-5 bg-indigo-600 rounded-[1.5rem] text-xs font-black text-white hover:bg-indigo-700 transition-all flex items-center space-x-4 flex-1 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  <span>Mount Source Image</span>
                </label>
                {imageUrl && (
                  <div className="relative w-16 h-16 rounded-[1.2rem] border-4 border-white shadow-xl overflow-hidden group">
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
              className="w-full py-6 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-black uppercase tracking-[0.4em] rounded-[1.5rem] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all mt-8"
            >
              Deploy Node
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
            <button onClick={onLogout} className="text-xs font-black text-pink-600 hover:text-pink-700 uppercase tracking-widest italic">
              Term_Exit()
            </button>
            <div className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
               Aurex Protocol v3.0
            </div>
          </div>
        </div>

        {/* Manifest View */}
        <div className="w-full md:w-1/2 p-12 flex flex-col bg-white">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-[0.4em]">Active Manifest</h2>
            <button onClick={onClose} className="hidden md:flex w-12 h-12 rounded-2xl bg-gray-50 items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-4 custom-scrollbar">
            {websites.length > 0 ? (
              websites.map((site) => (
                <div key={site.id} className="flex items-center justify-between p-5 bg-indigo-50/30 rounded-3xl border border-transparent hover:border-indigo-100 transition-all group">
                  <div className="flex items-center space-x-5 overflow-hidden">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-indigo-50 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
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
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-200 py-24 space-y-4 opacity-50">
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-8 4-8-4" /></svg>
                <span className="text-xs font-black uppercase tracking-[0.5em]">No Data Cached</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;
