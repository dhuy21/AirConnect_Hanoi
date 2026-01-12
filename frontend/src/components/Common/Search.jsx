import { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

const Search = ({ items, onSearchChange, placeholder }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearchChange(value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        onSearchChange('');
    };

    return (
        <div className="relative w-full">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon className="w-5 h-5" />
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder={placeholder}
                className="w-full pl-12 pr-10 px-5 py-3 rounded-full shadow-lg border border-gray-200 outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            />
            {searchTerm && (
                <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
    );
};

export default Search;

