import { useState } from 'react';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';
import type { Movie } from '../../types/movie';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const notify = () => toast('No movies found for your request.');

  const handleSearch = async (query: string) => {
    setMovies([]);
    const data = await fetchMovies(query);
    if (!(data.length > 0)) {
      notify();
      return;
    }
    setMovies(data);
    console.log(movies);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
    </>
  );
}
