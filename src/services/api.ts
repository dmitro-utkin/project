const API_KEY = 'live_kVqIIhuOZQfWSDrkgy5UrMeB5P63E4IxC9r50XQjAlYcFZl8Ta7NMzQE5CqBgpvU';
const BASE_URL = 'https://api.thecatapi.com/v1';

export const fetchCats = async (page: number = 1, breedId?: string) => {
  const limit = 12;
  const url = new URL(`${BASE_URL}/images/search`);
  
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('page', page.toString());
  url.searchParams.append('has_breeds', '1');
  url.searchParams.append('api_key', API_KEY);
  
  if (breedId) {
    url.searchParams.append('breed_ids', breedId);
  }

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Failed to fetch cats');
    }

    const data = await response.json();
    return data.filter((cat: any) => cat.breeds && cat.breeds.length > 0);
  } catch (error) {
    console.error('Error fetching cats:', error);
    return [];
  }
};

export const fetchBreeds = async () => {
  try {
    const url = new URL(`${BASE_URL}/breeds`);
    url.searchParams.append('api_key', API_KEY);
    
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Failed to fetch breeds');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching breeds:', error);
    return [];
  }
};