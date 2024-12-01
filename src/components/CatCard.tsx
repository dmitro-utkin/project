import React from 'react';
import { Heart } from 'lucide-react';
import { Cat } from '../types/cat';
import { useCatStore } from '../store/useCatStore';

interface CatCardProps {
  cat: Cat;
}

export const CatCard: React.FC<CatCardProps> = ({ cat }) => {
  const { isFavorite, addFavorite, removeFavorite } = useCatStore();
  const favorite = isFavorite(cat.id);
  const breed = cat.breeds?.[0];

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(cat.id);
    } else {
      addFavorite(cat.id);
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="aspect-w-1 aspect-h-1">
        <img
          src={cat.url}
          alt={breed?.name || 'Cat'}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {breed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg font-semibold mb-1">{breed.name}</h3>
          <p className="text-sm opacity-90">{breed.temperament}</p>
        </div>
      )}
      <button
        onClick={toggleFavorite}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/90 shadow-lg transform transition-all duration-300 hover:scale-110"
      >
        <Heart
          className={`w-6 h-6 ${
            favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
          }`}
        />
      </button>
    </div>
  );
};