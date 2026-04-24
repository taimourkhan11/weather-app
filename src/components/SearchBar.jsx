import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8 relative">
      <div className="relative flex items-center w-full h-14 rounded-2xl glass focus-within:ring-2 focus-within:ring-white/50 transition-all duration-300 overflow-hidden">
        <MapPin className="ml-4 text-white/70" size={20} />
        <input
          type="text"
          className="peer w-full h-full bg-transparent text-white outline-none px-4 placeholder-white/50 font-medium text-lg"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          className="h-full px-6 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors border-l border-white/10"
        >
          <Search className="text-white" size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
