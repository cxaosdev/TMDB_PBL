import React from "react";
import { useNavigate } from "react-router-dom";

export const BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function Movie(props) {
  const navigate = useNavigate();

  const onClickMovieDetail = () => {
    // navigate(`/detail/${props.title}`, {
    //   state: props,
    // });
    navigate("/detail");
  };

  return (
    <div
      className="movie-container w-[250px] m-[16px] shadow-xl shadow-black bg-black"
      onClick={onClickMovieDetail}
    >
      <div className="relative">
        <img src={BASE_URL + props.poster_path} alt="영화포스터" />
        <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-black to-transparent"></div>
      </div>
      <div className="mt-[10px] movie-info text-white text-center">
        <p className="font-[900]">{props.title}</p>
        <p className="text-red-600 font-[600]">{props.vote_average}</p>
      </div>
    </div>
  );
}
