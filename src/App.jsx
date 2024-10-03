import React, { useEffect, useState } from "react";
// import dummy from "/src/data/movieListData.json";
import MovieCard from "./components/MovieCard";
import Slider from "./components/Slider";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko&api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies:", error));
  }, [API_KEY]);

  return (
    <>
      <NavBar></NavBar>
      <div>
        <div className="flex flex-wrap justify-center movies-container bg-zinc-900 pt-[110px]">
          <Slider movies={movies} />
          <p className="w-[100%] text-left text-white ml-[25px] text-xl font-bold">
            현재 상영 중인 영화
          </p>
          {movies.map((item, index) => (
            <MovieCard
              key={index}
              title={item.title}
              poster_path={item.poster_path}
              vote_average={item.vote_average}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
