import { useState } from 'react';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import type { Movie } from '../../types/movie';
import toast, { Toaster } from 'react-hot-toast';
import MoveGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const notify = () => toast.error('No movies found for your request.');

  const handleSearch = async (query: string) => {
    try {
      setIsError(false);
      setMovies([]);
      setIsLoading(true);
      const data = await fetchMovies(query);
      if (!(data.length > 0)) {
        notify();
        return;
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MoveGrid movies={movies} />}
      <Toaster />
    </div>
  );
}
