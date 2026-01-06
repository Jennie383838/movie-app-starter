import { useEffect, useState } from "react";
const KEY = "5a36dfc6";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");

 useEffect(() => {
    const controller = new AbortController();
 
    // fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
    //   signal: controller.signal,
    // })
    //   .then((res) => res.json())
    //   .then((data) => data.Response === "True" && setMovies(data.Search))
    //   .catch((err) => console.error(err));
 
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        data.Response === "True" && setMovies(data.Search);
      } catch (err) {
        console.error(err);
      }
    };
 
    fetchMovies();
 
    return () => controller.abort(); // Cleanup on unmount or query change, aborting the fetch
  }, [query]);

  return (
    <div>
      <h1>Movies</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.imdbID}>
              <td>{movie.Title}</td>
              <td>{movie.Year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
