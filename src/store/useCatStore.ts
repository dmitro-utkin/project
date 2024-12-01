import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CatStore {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useCatStore = create<CatStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (id) =>
        set((state) => ({
          favorites: [...state.favorites, id],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((favId) => favId !== id),
        })),
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: 'cat-favorites',
    }
  )
);