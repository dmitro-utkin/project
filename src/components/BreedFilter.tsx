import React from 'react';
import { Breed } from '../types/cat';

interface BreedFilterProps {
  breeds: Breed[];
  selectedBreed: string;
  onBreedChange: (breedId: string) => void;
}

export const BreedFilter: React.FC<BreedFilterProps> = ({
  breeds,
  selectedBreed,
  onBreedChange,
}) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <select
        value={selectedBreed}
        onChange={(e) => onBreedChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed.id} value={breed.id}>
            {breed.name}
          </option>
        ))}
      </select>
    </div>
  );
};