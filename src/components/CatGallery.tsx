import React from 'react';
import { useInView } from 'react-intersection-observer';
import { CatCard } from './CatCard';
import { Cat } from '../types/cat';

interface CatGalleryProps {
  cats: Cat[];
  loading: boolean;
  onLoadMore: () => void;
}

export const CatGallery: React.FC<CatGalleryProps> = ({
  cats,
  loading,
  onLoadMore,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView && !loading) {
        onLoadMore();
      }
    },
  });

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cats.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </div>
      <div ref={ref} className="h-20 flex items-center justify-center">
        {loading && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        )}
      </div>
    </div>
  );
};