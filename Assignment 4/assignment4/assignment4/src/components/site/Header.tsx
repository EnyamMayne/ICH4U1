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
    <header className="flex items-center justify-between bg-gray-800 px-5 py-3">
      <nav className="flex items-center gap-6 text-sm">
        <button onClick={() => navigate('/movies')} className="transition hover:text-blue-400">
          Movies
        </button>
        <button onClick={() => navigate('/television')} className="transition hover:text-blue-400">
          Television
        </button>
        <button onClick={() => navigate('/genre')} className="transition hover:text-blue-400">
          Genre
        </button>
        <button onClick={() => navigate('/trending')} className="transition hover:text-blue-400">
          Trending
        </button>
      </nav>
      <div onKeyDown={handleKeyDown}>
        <SearchBar value={query} onChange={setQuery} />
      </div>
    </header>
  );
};
