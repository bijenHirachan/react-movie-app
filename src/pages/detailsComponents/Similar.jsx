import React from "react";
import useFetch from "../../hooks/useFetch";
import Carousel from "../../components/Carousel";

const Similar = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
  return (
    <div className="px-8 sm:px-16 md:px-24 xl:px-40 pt-8 pb-16">
      <p className="text-beige text-xl font-semibold mb-4">{title}</p>
      <Carousel data={data?.results} loading={loading} endpoint={mediaType} />
    </div>
  );
};

export default Similar;
