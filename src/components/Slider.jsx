import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React from "react";
import MovieCard from "./MovieCard";

export default function Slider({ movies }) {
  return (
    <>
      <p className="w-[100%] text-left text-white ml-[25px] text-xl font-bold">
        오늘의 인기 영화
      </p>
      <Swiper className="bg-zinc-900" spaceBetween={-10} slidesPerView={7}>
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <MovieCard
              title={movie.title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
