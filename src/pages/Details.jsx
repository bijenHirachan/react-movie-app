import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import DetailsBanner from "./detailsComponents/DetailsBanner";
import Cast from "./detailsComponents/Cast";
import VideosSection from "./detailsComponents/VideosSection";
import Similar from "./detailsComponents/Similar";

const Details = () => {
  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);

  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="bg-secondary ">
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
