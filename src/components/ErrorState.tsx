import type { ErrorStateProps } from '../types';

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        Erreur de chargement
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
        {message}
      </p>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
};