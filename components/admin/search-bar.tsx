'use client';

import { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

import useDebounce from '@/hooks/useDebounce';
import { Input } from '../ui/input';

interface SearchBarProps<T> {
  data: T[];
  searchField: keyof T;
  onSearchResults: (results: T[]) => void;
  placeholder?: string;
}

const SearchBar = <T,>({ data, searchField, onSearchResults, placeholder = "Search...",}: SearchBarProps<T>) => {
  const [searchTerms, setSearchTerms] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchTerms, 300);

  useEffect(() => {
    if (debouncedSearchValue && debouncedSearchValue.length > 0) {
      const filteredData = data.filter(
        (item: T) =>
          (item[searchField] as unknown as string)
            .toLowerCase()
            .includes(debouncedSearchValue.toLowerCase())
      );
      onSearchResults(filteredData);
    } else {
      onSearchResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue, data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    if (searchTerm) {
      setSearchTerms(searchTerm);
    }
    if (!searchTerm) {
      setSearchTerms("");
    }
  };

  return (
    <div className="relative block">
      <span className="sr-only">Search</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <IoIosSearch size={22} className="text-secondary-gray " />
      </span>
      <Input
        className="placeholder:text-secondary-gray bg-transparent w-full border border-secondary-black focus:border-none rounded-md py-2 pl-9 pr-3 shadow-sm sm:text-sm"
        placeholder={placeholder}
        type="text"
        onChange={handleChange}
      />
    </div>
  );
};

export { SearchBar };
