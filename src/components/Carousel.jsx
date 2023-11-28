import React, { useRef } from "react";
import { useSelector } from "react-redux";
import PosterFallback from "../assets/no-poster.png";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skeleton = () => {
    return (
      <div className="w-56 aspect-auto flex-shrink-0 relative">
        <div className="rounded-lg bg-slate-700 w-[223px] h-[335px]" />
        <div className="bg-slate-700 h-4 w-40 rounded-full mt-2"></div>
        <div className="absolute top-2 right-[-16px] h-8 w-8 p-6 flex items-center justify-center rounded-full bg-slate-700">
          <div className="h-6 w-6 p-5 flex items-center justify-center rounded-full bg-slate-700"></div>
        </div>

        <div className="bg-slate-700 h-4 w-24 rounded-full mt-2"></div>
      </div>
    );
  };

  return (
    <div className="relative">
      <BsFillArrowLeftCircleFill
        size={26}
        className="absolute z-50 top-[40%] left-0 opacity-80 cursor-pointer"
        onClick={() => navigation("left")}
      />
      <BsFillArrowRightCircleFill
        size={26}
        className="absolute z-50 top-[40%] right-0 opacity-80 cursor-pointer"
        onClick={() => navigation("right")}
      />
      {!loading ? (
        <div
          ref={carouselContainer}
          className="flex gap-6 overflow-x-auto overflow-y-hidden"
        >
          {data?.map((item, index) => {
            const posterUrl = item.poster_path
              ? url.poster + item.poster_path
              : PosterFallback;

            return (
              <Link
                to={`/${item?.media_type || endpoint}/${item.id}`}
                key={index}
                className="w-56 aspect-auto flex-shrink-0 relative"
              >
                <img className="rounded-lg " src={posterUrl} alt="" />
                <div className="text-md font-outfit py-1 text-beige font-semibold">
                  {item.title || item.name}
                </div>
                <div className="absolute top-2 right-[-16px] h-8 w-8 p-6 flex items-center justify-center rounded-full text-beige font-bold bg-beige">
                  <div className="h-6 w-6 p-5 flex items-center justify-center rounded-full text-beige font-bold bg-primary">
                    {item.vote_average.toFixed(1)}
                  </div>
                </div>

                <div className="font-outfit text-beige text-sm">
                  {dayjs(item.release_date).format("MMM D, YYYY")}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto overflow-y-hidden animate-pulse">
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
        </div>
      )}
    </div>
  );
};

export default Carousel;
