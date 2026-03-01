import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';

interface SearchResult {
  results: string[];
}

export function useAISearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const search = async (query: string): Promise<string[]> => {
    if (!query.trim()) return [];

    setIsSearching(true);
    try {
      const response = await apiRequest('POST', '/api/portfolio-search', { query });
      const data: SearchResult = await response.json();
      setSearchResults(data.results);
      return data.results;
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
      return [];
    } finally {
      setIsSearching(false);
    }
  };

  return {
    search,
    isSearching,
    searchResults,
    clearResults: () => setSearchResults([])
  };
}
