import { useState } from 'react';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';
import type { Movie } from '../../types/movie';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async (query: string) => {
    const data = await fetchMovies(query);
    setMovies(data);
    console.log(movies);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
    </>
  );
}
