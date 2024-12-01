import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Heart, ImageIcon } from 'lucide-react';
import { BreedFilter } from './components/BreedFilter';
import { CatGallery } from './components/CatGallery';
import { fetchBreeds, fetchCats } from './services/api';
import { useCatStore } from './store/useCatStore';

const queryClient = new QueryClient();

function CatApp() {
  const [selectedBreed, setSelectedBreed] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites } = useCatStore();

  const { data: breeds = [] } = useQuery({
    queryKey: ['breeds'],
    queryFn: fetchBreeds,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['cats', selectedBreed],
    queryFn: ({ pageParam = 1 }) => fetchCats(pageParam, selectedBreed),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 12 ? allPages.length + 1 : undefined;
    },
  });

  const allCats = data?.pages.flat() ?? [];
  const displayedCats = showFavorites
    ? allCats.filter((cat) => favorites.includes(cat.id))
    : allCats;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">Cat Gallery</h1>
            </div>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                showFavorites
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart className={showFavorites ? 'fill-white' : ''} />
              <span>Favorites</span>
            </button>
          </div>
          <div className="mt-6">
            <BreedFilter
              breeds={breeds}
              selectedBreed={selectedBreed}
              onBreedChange={setSelectedBreed}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          </div>
        ) : displayedCats.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {showFavorites
                ? 'No favorite cats yet. Start adding some!'
                : 'No cats found for the selected breed.'}
            </p>
          </div>
        ) : (
          <CatGallery
            cats={displayedCats}
            loading={isFetchingNextPage}
            onLoadMore={() => hasNextPage && fetchNextPage()}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CatApp />
    </QueryClientProvider>
  );
}

export default App;