import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Carousel from "../../components/Carousel";
import SwitchTabs from "../../components/SwitchTabs";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="bg-secondary px-8 sm:px-16 md:px-24 xl:px-40 py-8">
      <div className="flex items-center justify-between my-4">
        <p className="text-2xl font-outfit text-beige">Popular</p>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Popular;
