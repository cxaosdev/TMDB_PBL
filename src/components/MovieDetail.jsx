import React, { useEffect, useState } from "react";
import { BASE_URL } from "./MovieCard";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import dummy from "/src/data/movieDetailData.json";

export default function MovieDetail() {
  const { title } = useParams();
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?language=ko&api_key=${API_KEY}&query=${title}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const movie = data.results[0];
          setDetail(movie);
        } else {
          throw new Error("Not found");
        }
      })
      .catch((error) => {
        setError("Not found");
      });
  }, [title, API_KEY]);

  if (error) {
    return (
      <div className="flex h-[100vh] items-center justify-center text-[35px] flex-col">
        <div>Sorry.</div>
        <div>The movie you're looking for could not be found.</div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="flex h-[100vh] items-center justify-center text-[35px] flex-col">
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center bg-zinc-900 h-[100vh]">
        <div
          style={{
            backgroundImage: `url(${BASE_URL + detail.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundBlendMode: "color-burn",
          }}
          className="grid grid-cols-1 md:grid-cols-2 items-center p-8 rounded-2xl shadow-lg max-w-[1000px] relative "
        >
          <p
            onClick={() => navigate(-1)}
            className="absolute text-[40px] top-0 left-4 text-white cursor-pointer"
          >
            ×
          </p>
          <div className="flex items-start justify-center m-20 ">
            <img
              className=" h-[400px] rounded-lg shadow-md"
              src={BASE_URL + detail.poster_path}
              alt="영화 포스터 이미지"
            />
          </div>
          <div className="bg-zinc-950 bg-opacity-80 rounded-2xl h-[400px] flex items-center">
            <div className="p-4 space-y-4 text-white">
              <h1 className="text-4xl font-[900] text-center">
                {detail.title}
              </h1>
              <p className="text-center text-xl text-red-700 font-extrabold text-[25px]">
                {detail.vote_average}
              </p>
              {detail.genres && (
                <div className="text-lg">
                  {detail.genres.map((genre, index) => (
                    <span key={index}>
                      {genre.name}
                      {index < detail.genres.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-md">{detail.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
