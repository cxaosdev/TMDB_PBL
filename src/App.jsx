import React from "react";
import dummy from "/src/data/movieListData.json";
import MovieCard from "./components/MovieCard";
import Slider from "./components/Slider";
import "./App.css";

function App() {
  return (
    <div>
      <div className="flex flex-wrap justify-center movies-container bg-zinc-900">
        {dummy.results.map((item, index) => (
          <MovieCard
            key={index}
            title={item.title}
            poster_path={item.poster_path}
            vote_average={item.vote_average}
          />
        ))}
      </div>
      <Slider movies={dummy.results} />
    </div>
  );
}

export default App;
