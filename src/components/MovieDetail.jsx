import React from "react";
import { BASE_URL } from "./MovieCard";
import { useParams } from "react-router-dom";
import dummy from "/src/data/movieListData.json";

export default function MovieDetail() {
  // const { title } = useParams();

  // const movie = dummy.results.find((item) => item.title === title);

  // if (!movie) {
  //   return (
  //     <div className="flex h-[100vh] items-center justify-center text-[35px] flex-col">
  //       <div>죄송합니다.</div>
  //       <div>해당 영화를 찾을 수 없습니다.</div>
  //     </div>
  //   );
  // }

  const movie = dummy.results[6];
  return (
    <div>
      <div
        className="flex justify-center items-center "
        style={{
          backgroundImage: `url(${BASE_URL + movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 bg-black bg-opacity-60 p-8 rounded-lg shadow-lg max-w-[1000px]">
          <div className="flex justify-center items-start">
            <img
              className="w-[300px] h-[450px] rounded-lg shadow-md"
              src={BASE_URL + movie.poster_path}
              alt="영화 포스터 이미지"
            />
          </div>

          <div className="text-white p-4 space-y-4">
            <h1 className="text-4xl font-[900] text-center">{movie.title}</h1>
            <p className=" text-center text-xl text-red-600 font-bold text-[25px]">
              {movie.vote_average}
            </p>
            <p className="text-lg">{movie.genres}</p>
            <p className="text-md">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
