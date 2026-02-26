import { UserList } from './UserList';
import { PhotoGallery } from './PhotoGallery';
import { SearchableList } from './SearchableList';
import { ScrollToTop } from './ScrollToTop';

export const InfiniteScrollDemo = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
            ♾️ Infinite Scroll
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            Projet 20/100 • Intersection Observer API
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Chargement infini avec détection de visibilité
          </p>
        </div>

        {/* Demos */}
        <div className="space-y-12">
          {/* User List */}
          <UserList />

          {/* Photo Gallery */}
          <PhotoGallery />

          {/* Searchable List */}
          <SearchableList />

          {/* Features */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              ✨ Fonctionnalités
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Intersection Observer</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    API native pour détecter la visibilité
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Lazy Loading</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Chargement progressif des images
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Skeleton Loaders</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    États de chargement élégants
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Error Handling</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Gestion d'erreurs avec retry
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Search Integration</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Recherche avec debounce
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Scroll to Top</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Bouton de retour en haut
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};