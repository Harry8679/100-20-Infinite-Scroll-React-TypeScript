import { useState, useCallback, useEffect } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

interface UseInfiniteScrollOptions<T> {
  fetchData: (page: number) => Promise<{
    data: T[];
    hasMore: boolean;
  }>;
  initialPage?: number;
  threshold?: number;
  rootMargin?: string;
}

export const useInfiniteScroll = <T,>(options: UseInfiniteScrollOptions<T>) => {
  const { fetchData, initialPage = 1, threshold, rootMargin } = options;

  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    enabled: hasMore && !isLoading,
  });

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchData(page);
      setData((prev) => [...prev, ...response.data]);
      setHasMore(response.hasMore);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, page, isLoading, hasMore]);

  const retry = useCallback(() => {
    setError(null);
    loadMore();
  }, [loadMore]);

  const reset = useCallback(() => {
    setData([]);
    setPage(initialPage);
    setError(null);
    setHasMore(true);
  }, [initialPage]);

  // Load initial data
  useEffect(() => {
    if (data.length === 0 && !isLoading && !error) {
      loadMore();
    }
  }, [data.length, error, isLoading, loadMore]);

  // Load more when intersecting
  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore();
    }
  }, [isIntersecting, hasMore, isLoading, loadMore]);

  return {
    data,
    isLoading,
    error,
    hasMore,
    targetRef,
    retry,
    reset,
  };
};