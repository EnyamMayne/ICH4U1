import { SearchBar } from '@/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?q=${query.trim()}`);
      setQuery('');
    }
  };

  return (
    <header className="bg-gray-800 px-5 py-3 flex items-center justify-between">
      <nav className="flex items-center gap-6 text-sm">
        <button onClick={() => navigate('/movies')} className="hover:text-blue-400 transition">Movies</button>
        <button onClick={() => navigate('/television')} className="hover:text-blue-400 transition">Television</button>
        <button onClick={() => navigate('/trending')} className="hover:text-blue-400 transition">Trending</button>
      </nav>
      <div onKeyDown={handleKeyDown}>
        <SearchBar value={query} onChange={setQuery} />
      </div>
    </header>
  );
};