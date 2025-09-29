import { useState, useEffect } from 'react';

// Custom hook for managing shimmer loading states
export const useShimmer = (isLoading, delay = 0) => {
  const [showShimmer, setShowShimmer] = useState(isLoading);
  
  useEffect(() => {
    if (isLoading) {
      setShowShimmer(true);
    } else {
      const timer = setTimeout(() => {
        setShowShimmer(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isLoading, delay]);
  
  return showShimmer;
};

// Hook for managing API loading states with shimmer
export const useApiWithShimmer = (apiCall, dependencies = []) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await apiCall();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, dependencies);
  
  return { data, isLoading, error };
};

// Hook for managing multiple API calls with shimmer
export const useMultipleApiWithShimmer = (apiCalls) => {
  const [loadingStates, setLoadingStates] = useState({});
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    const fetchAllData = async () => {
      const promises = Object.entries(apiCalls).map(async ([key, apiCall]) => {
        try {
          setLoadingStates(prev => ({ ...prev, [key]: true }));
          setErrors(prev => ({ ...prev, [key]: null }));
          
          const result = await apiCall();
          setData(prev => ({ ...prev, [key]: result }));
        } catch (error) {
          setErrors(prev => ({ ...prev, [key]: error }));
        } finally {
          setLoadingStates(prev => ({ ...prev, [key]: false }));
        }
      });
      
      await Promise.all(promises);
    };
    
    fetchAllData();
  }, []);
  
  return { data, loadingStates, errors };
};

// Hook for managing pagination with shimmer
export const usePaginationWithShimmer = (apiCall, initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  
  const loadPage = async (page) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await apiCall(page);
      
      if (page === 1) {
        setData(result.data);
      } else {
        setData(prev => [...prev, ...result.data]);
      }
      
      setHasMore(result.hasMore);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadPage(currentPage);
  }, [currentPage]);
  
  const loadNextPage = () => {
    if (!isLoading && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const reset = () => {
    setCurrentPage(1);
    setData([]);
    setHasMore(true);
    setError(null);
  };
  
  return {
    data,
    isLoading,
    error,
    hasMore,
    loadNextPage,
    reset,
    currentPage
  };
};

// Hook for managing search with shimmer
export const useSearchWithShimmer = (searchApi, debounceMs = 300) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }
    
    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        setError(null);
        const searchResults = await searchApi(query);
        setResults(searchResults);
      } catch (err) {
        setError(err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);
    
    return () => clearTimeout(timeoutId);
  }, [query, debounceMs]);
  
  return {
    query,
    setQuery,
    isLoading,
    results,
    error
  };
};

// Hook for managing infinite scroll with shimmer
export const useInfiniteScrollWithShimmer = (apiCall, threshold = 0.1) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  
  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const result = await apiCall(page);
      
      setData(prev => [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setPage(prev => prev + 1);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      
      if (scrollPercentage >= 1 - threshold) {
        loadMore();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);
  
  const reset = () => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    setIsLoading(false);
  };
  
  return {
    data,
    isLoading,
    hasMore,
    error,
    reset
  };
};

export default useShimmer;
