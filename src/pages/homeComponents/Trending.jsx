import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Carousel from "../../components/Carousel";
import SwitchTabs from "../../components/SwitchTabs";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");

  const { data, loading } = useFetch(`/trending/all/${endpoint}`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };

  return (
    <div className="bg-secondary px-8 sm:px-16 md:px-24 xl:px-40 py-8">
      <div className="flex items-center justify-between my-4">
        <p className="text-2xl font-outfit text-beige">Trending</p>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Trending;
