import { useEffect, useState } from 'react';
import { Button } from './Button';
import { MoviesList } from './MoviesList';
import { fetchMovies } from '../service/moviesApi';
import { Loader } from './Loader';

export const App = () => {

  const [movies, setMovies] = useState([]);
  const [isListShown, setIsListShown] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisual = () => {
    setIsListShown((prevState) => !prevState)
  };

  const loadMore = () => {
    setPage((prevState) => prevState + 1)
  }

  const deleteMovie = (id) => {
    setMovies((prevstate) => prevstate.filter((item) => item.id !== id))
  }

  useEffect(() => {
    if (isListShown) {

      setIsLoading(true);
      fetchMovies(page)
        .then(({data:{results}}) => {
        setMovies((prevstate) => [...prevstate, ...results])
        })
        .catch((error) => console.log(error))
        .finally(setIsLoading(false))
    };

    if (isListShown === false) {
      setPage(1);
      setMovies([])
    }
  }, [isListShown, page])



      return (
        <>
          <Button text={isListShown? 'hide movies list ': 'shown movies list' } clickHandler={toggleVisual} />

          {isListShown &&
            <>
            <MoviesList movies={movies} deleteMovie={deleteMovie} />

            {!isLoading &&
              <Button text='Load more' clickHandler={loadMore} />
            }

            {isLoading &&
              <Loader />
            }

            </>
          }
        </>
      );

  }
