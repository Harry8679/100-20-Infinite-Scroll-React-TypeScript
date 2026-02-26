import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { searchUsers } from '../api/mockApi';
import { UserCard } from './UserCard';
import { SkeletonCard } from './SkeletonCard';
import { ErrorState } from './ErrorState';
import { EndOfList } from './EndOfList';
import { LoadingSpinner } from './LoadingSpinner';

export const SearchableList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 500);

  const { data, isLoading, error, hasMore, targetRef, retry, reset } = useInfiniteScroll({
    fetchData: async (page) => {
      const response = await searchUsers(debouncedQuery, page);
      return {
        data: response.data,
        hasMore: response.hasMore,
      };
    },
  });

  // Reset when search query changes
  useEffect(() => {
    reset();
  }, [debouncedQuery, reset]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Recherche avec Infinite Scroll
      </h3>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom, email ou rôle..."
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}

        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)}
      </div>

      {/* Empty state */}
      {!isLoading && data.length === 0 && debouncedQuery && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Aucun résultat
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Aucun utilisateur ne correspond à votre recherche "{debouncedQuery}"
          </p>
        </div>
      )}

      {error && (
        <div className="mt-6">
          <ErrorState message={error} onRetry={retry} />
        </div>
      )}

      {!error && !isLoading && hasMore && (
        <div ref={targetRef} className="mt-6">
          <LoadingSpinner />
        </div>
      )}

      {!error && !hasMore && data.length > 0 && (
        <div className="mt-6">
          <EndOfList />
        </div>
      )}
    </div>
  );
};