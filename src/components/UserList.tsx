import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { fetchUsers } from '../api/mockApi';
import { UserCard } from './UserCard';
import { SkeletonCard } from './SkeletonCard';
import { ErrorState } from './ErrorState';
import { EndOfList } from './EndOfList';
import { LoadingSpinner } from './LoadingSpinner';

export const UserList = () => {
  const { data, isLoading, error, hasMore, targetRef, retry, reset } = useInfiniteScroll({
    fetchData: async (page) => {
      const response = await fetchUsers(page);
      return {
        data: response.data,
        hasMore: response.hasMore,
      };
    },
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          Liste d'utilisateurs
        </h3>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-semibold transition-colors"
        >
          ⟳ Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}

        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)}
      </div>

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