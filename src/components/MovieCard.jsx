import React from "react";
import { useSelector } from "react-redux";
import PosterFallback from "../assets/no-poster.png";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);

  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;

  return (
    <Link
      to={`/${data?.media_type || mediaType}/${data?.id}`}
      className="h-[335px] w-[224px]  relative mb-16"
    >
      <img className="rounded-lg " src={posterUrl} alt="" />
      <div className="text-md font-outfit py-1 text-beige font-semibold">
        {data?.title || data?.name}
      </div>
      <div className="absolute bottom-[-16px] right-[16px] h-8 w-8 p-6 flex items-center justify-center rounded-full text-beige font-bold bg-beige">
        <div className="h-6 w-6 p-5 flex items-center justify-center rounded-full text-beige font-bold bg-primary">
          {data?.vote_average.toFixed(1)}
        </div>
      </div>

      <div className="font-outfit text-beige text-sm">
        {dayjs(data?.release_date).format("MMM D, YYYY")}
      </div>
    </Link>
  );
};

export default MovieCard;
