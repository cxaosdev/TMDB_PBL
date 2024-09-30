import "./App.css";
import React from "react";
import dummy from "/src/data/movieListData.json";
import MovieCard from "./components/MovieCard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Slider from "./components/Slider";

function App() {
  return (
    <div>
      <div className="movies-container flex flex-wrap justify-center bg-zinc-900">
        {dummy.results.map((item, index) => {
          return (
            <MovieCard
              key={index}
              title={item.title}
              poster_path={item.poster_path}
              vote_average={item.vote_average}
            />
          );
        })}
      </div>
      <Slider movies={dummy.results} />
    </div>
  );
}

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/detail/:title" element={<MovieDetail />} /> */}
        <Route path="/detail" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
