export const EndOfList = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-6xl mb-4">🎉</div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        Fin de la liste
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Vous avez vu tous les éléments disponibles
      </p>
    </div>
  );
};