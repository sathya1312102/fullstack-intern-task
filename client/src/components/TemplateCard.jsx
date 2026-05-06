import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function TemplateCard({ template, isFavorited, onFavoriteToggle }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFavorite = async () => {
    if (!user) { navigate('/login'); return; }
    setLoading(true);
    try {
      const { data } = await api.post(`/favorites/${template._id}`);
      onFavoriteToggle(template._id, data.favorited);
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    } finally {
      setLoading(false);
    }
  };

  // Covers all categories in seedTemplates.js
  const categoryColors = {
    'Landing Page': 'bg-blue-100 text-blue-700 border-blue-200',
    'Dashboard':    'bg-indigo-100 text-indigo-700 border-indigo-200',
    'E-Commerce':   'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Portfolio':    'bg-orange-100 text-orange-700 border-orange-200',
    'Blog':         'bg-pink-100 text-pink-700 border-pink-200',
    'SaaS':         'bg-cyan-100 text-cyan-700 border-cyan-200',
  };

  return (
    <div className="group bg-white border border-blue-100 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-200">
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video bg-blue-50">
        <img
          src={template.thumbnail_url}
          alt={template.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://placehold.co/600x340/dbeafe/3b82f6?text=${encodeURIComponent(template.name)}`;
          }}
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${categoryColors[template.category] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
            {template.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-800 text-sm truncate">{template.name}</h3>
            <p className="text-slate-500 text-xs mt-1 line-clamp-2 leading-relaxed">{template.description}</p>
          </div>

          {/* Favorite button */}
          <button
            onClick={handleFavorite}
            disabled={loading}
            title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            className={`flex-shrink-0 p-2 rounded-lg border transition-all duration-200 ${
              isFavorited
                ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50'
            } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {loading ? (
              <div className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
