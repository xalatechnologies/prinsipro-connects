import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Area, Category, Principle, Measure } from '@types/index';
import { useDataService } from '@hooks/useDataService';
import { SEARCH_TYPE_ICONS } from '@config/constants';

interface SearchBarProps {
  onResultClick: (type: string, id: string) => void;
}

export function SearchBar({ onResultClick }: SearchBarProps) {
  const dataService = useDataService();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    type: 'area' | 'category' | 'principle' | 'measure';
    item: Area | Category | Principle | Measure;
    path: string[];
  }[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      const searchResults = await dataService.searchContent(value);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (result: {
    type: 'area' | 'category' | 'principle' | 'measure';
    item: Area | Category | Principle | Measure;
  }) => {
    setQuery(result.item.name || result.item.title);
    setResults([]);
    onResultClick(result.type, result.item.id);
  };

  const handleClickOutside = useCallback(() => {
    setResults([]);
  }, []);

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="max-w-3xl mx-auto relative" onClick={handleContainerClick}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          placeholder="Søk i prinsipper og tiltak..."
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-gray-400" />
        </div>
      </div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-[60vh] overflow-y-auto z-50"
          >
            {results.map((result, index) => (
              <motion.button
                key={`${result.type}-${index}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleResultClick(result)}
                className="w-full text-left p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-1">
                    {SEARCH_TYPE_ICONS[result.type]}
                  </span>
                  <div className="flex-grow">
                    <h4 className="text-lg font-medium text-gray-900">
                      {result.item.name || result.item.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">{result.item.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      {result.path.map((step, i) => (
                        <React.Fragment key={i}>
                          {i > 0 && <span>→</span>}
                          <span>{step}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}