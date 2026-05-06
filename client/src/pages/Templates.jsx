import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import TemplateCard from '../components/TemplateCard';

// Must match the category values stored in MongoDB (see server/seed/seedTemplates.js)
const CATEGORIES = ['All', 'Landing Page', 'Dashboard', 'E-Commerce', 'Portfolio', 'Blog'];

export default function Templates() {
  const { user } = useAuth();

  const [templates, setTemplates] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const params = {};
        if (debouncedSearch) params.search = debouncedSearch;
        if (category !== 'All') params.category = category;
        const { data } = await api.get('/templates', { params });
        setTemplates(data.data);
      } catch (err) {
        console.error('Failed to fetch templates:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, [debouncedSearch, category]);

  useEffect(() => {
    if (!user) { setFavoriteIds(new Set()); return; }
    const fetchFavoriteIds = async () => {
      try {
        const { data } = await api.get('/favorites/ids');
        setFavoriteIds(new Set(data.data));
      } catch (err) {
        console.error('Failed to fetch favorite IDs:', err);
      }
    };
    fetchFavoriteIds();
  }, [user]);

  const handleFavoriteToggle = useCallback((templateId, isFavorited) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (isFavorited) next.add(templateId);
      else next.delete(templateId);
      return next;
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">Template Store</h1>
        <p className="text-slate-500 mt-1 text-sm">
          {templates.length} template{templates.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-blue-200 rounded-xl text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm"
          />
        </div>

        {/* Category filter — scrollable on mobile */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                category === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-blue-200 text-slate-600 hover:text-blue-700 hover:border-blue-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white border border-blue-100 rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-video bg-blue-50" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-blue-50 rounded w-3/4" />
                <div className="h-3 bg-blue-50 rounded w-full" />
                <div className="h-3 bg-blue-50 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : templates.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-slate-600 text-lg font-medium">No templates found</p>
          <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {templates.map((template) => (
            <TemplateCard
              key={template._id}
              template={template}
              isFavorited={favoriteIds.has(template._id)}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
