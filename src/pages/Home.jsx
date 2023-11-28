import React from "react";
import HeroBanner from "./homeComponents/HeroBanner";
import Trending from "./homeComponents/Trending";
import Popular from "./homeComponents/Popular";
import TopRated from "./homeComponents/TopRated";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </>
  );
};

export default Home;
