import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React from "react";
import MovieCard from "./MovieCard";

export default function Slider({ movies }) {
  return (
    <Swiper className="bg-zinc-900" spaceBetween={40} slidesPerView={6}>
      {movies.map((movie, index) => (
        <SwiperSlide className="mt-[30px]" key={index}>
          <MovieCard
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
