export interface Cat {
  id: string;
  url: string;
  breeds: Breed[];
  width: number;
  height: number;
}

export interface Breed {
  id: string;
  name: string;
  temperament: string;
  description: string;
  origin: string;
  life_span: string;
}

export interface CatApiResponse {
  data: Cat[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}