import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import SwitchTabs from "../../components/SwitchTabs";
import Carousel from "../../components/Carousel";

const TopRated = () => {
  const [endpoint, setEndPoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/top_rated`);

  const onTabChange = (tab) => {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="bg-secondary px-8 sm:px-16 md:px-24 xl:px-40 pt-8 pb-16">
      <div className="flex items-center justify-between my-4">
        <p className="text-2xl font-outfit text-beige">Top Rated</p>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default TopRated;
