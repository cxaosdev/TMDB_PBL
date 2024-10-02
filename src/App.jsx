import React, { useEffect, useState } from "react";
import dummy from "/src/data/movieListData.json";
import MovieCard from "./components/MovieCard";
import Slider from "./components/Slider";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(dummy.results);
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-center movies-container bg-zinc-900">
        {movies.map((item, index) => (
          <MovieCard
            key={index}
            title={item.title}
            poster_path={item.poster_path}
            vote_average={item.vote_average}
          />
        ))}
      </div>
      <Slider movies={movies} />
    </div>
  );
}

export default App;
