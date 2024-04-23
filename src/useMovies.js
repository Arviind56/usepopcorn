import { useEffect, useState } from "react";
const KEY = "90084b4";

export function useMovies(query , callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, seterror] = useState("");

    
//   const KEY = "90084b4";

  useEffect(
    function () {
        callback?.();
        
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setLoading(true);
          seterror("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("Something went wrong with feching codes");
          }

          const data = await res.json();
          console.log(data);

          if (data.Response === "False") {
            throw new Error("Movie not Found");
          }

          console.log(data.Response);

          setMovies(data.Search);
          seterror("");
          // setLoading(false);
          console.log(data);
        } catch (err) {
          console.error(err.message);
          seterror(err.message);
        } finally {
          setLoading(false);
        }
      }
      if (query.length < 2) {
        setMovies([]);
        seterror("");
        return;
      }
      fetchMovies();
    },
    [query]
  );
  return {movies,isLoading,error}
}
