import { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

const Search = ({ schools, onChange, value, name, className, required, placeholder }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [filteredSchools, setFilteredSchools] = useState(schools);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const selectedSchool = schools.find(s => s.id.toString() === value);
        setSearchTerm(selectedSchool ? selectedSchool.name : '');
    }, [value, schools]);

    useEffect(() => {
        if (searchTerm) {
            const filtered = schools.filter(school =>
                school.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSchools(filtered);
            setIsOpen(true);
        } else {
            setFilteredSchools(schools);
            setIsOpen(false);
        }
    }, [searchTerm, schools]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectSchool = (school) => {
        setSearchTerm(school.name);
        setIsOpen(false);
        const syntheticEvent = {
            target: { name, value: school.id.toString() }
        };
        onChange(syntheticEvent);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setIsOpen(false);
        const syntheticEvent = {
            target: { name, value: '' }
        };
        onChange(syntheticEvent);
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                <SearchIcon className="w-5 h-5" />
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
                className={`${className} pl-10 ${searchTerm ? 'pr-10' : ''}`}
                required={required}
            />
            {searchTerm && (
                <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
            {isOpen && filteredSchools.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredSchools.map((school) => (
                        <div
                            key={school.id}
                            onClick={() => handleSelectSchool(school)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {school.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;

