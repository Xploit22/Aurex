
import React from 'react';
import { Website } from '../types';

interface WebsiteCardProps {
  website: Website;
  accentIndex: number;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website, accentIndex }) => {
  const accents = [
    'accent-indigo',
    'accent-pink',
    'accent-orange',
    'accent-teal'
  ];
  
  const iconColors = [
    'bg-indigo-600',
    'bg-pink-600',
    'bg-orange-600',
    'bg-teal-600'
  ];

  return (
    <a
      href={website.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group vibrant-card p-8 block overflow-hidden ${accents[accentIndex]}`}
    >
      <div className="flex items-center space-x-6">
        <div className={`w-16 h-16 flex-shrink-0 rounded-2xl ${iconColors[accentIndex]} shadow-xl group-hover:scale-110 transition-transform overflow-hidden p-1`}>
          {website.imageUrl ? (
            <img
              src={website.imageUrl}
              alt={website.name}
              className="w-full h-full object-cover rounded-xl opacity-90 group-hover:opacity-100 transition-opacity"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <span className="text-3xl font-black italic">
                {website.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors truncate tracking-tighter">
            {website.name}
          </h3>
          <p className="text-[10px] font-bold text-gray-400 truncate uppercase tracking-[0.2em] mt-1">
            {website.url.replace(/^https?:\/\//, '')}
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all border border-gray-100">
          <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default WebsiteCard;
