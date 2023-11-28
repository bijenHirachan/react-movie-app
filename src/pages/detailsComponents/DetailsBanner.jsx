import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";

import PosterFallback from "../../assets/no-poster.png";
import dayjs from "dayjs";
import Genres from "./Genres";
import VideoPopup from "../../components/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");
  const writers = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? `${minutes}m` : ""}`;
  };

  return (
    <div className="relative h-[100svh] w-full">
      <div className="absolute  bottom-0  w-full h-16 bg-gradient-to-t from-[#435585] to-[rgba(67,85,133, 0.9)] z-[100]"></div>
      {!loading ? (
        <div className="h-[100svh] w-full">
          {data && (
            <img
              className="absolute top-0  h-[100svh] z-10  w-full object-cover object-center  opacity-90"
              src={url?.backdrop + data?.backdrop_path}
              alt=""
            />
          )}
          <div className="absolute z-20 bg-secondary  w-full h-[100svh] left-0 opacity-90"></div>

          <div className="relative flex flex-col sm:flex-row px-8 sm:px-16 md:px-24 xl:px-40 items-center justify-center gap-16 z-30 top-56 left-0 right-0 mx-auto">
            <div className="">
              {data?.poster_path ? (
                <img
                  className="rounded-2xl w-96 aspect-auto hidden sm:block object-cover object-center"
                  src={url?.backdrop + data?.poster_path}
                  alt=""
                />
              ) : (
                <img
                  className="rounded-2xl h-[512px]"
                  src={PosterFallback}
                  alt=""
                />
              )}
            </div>

            <div className="w-full">
              <p className="text-beige text-3xl font-outfit">
                {`${data?.name || data?.title} (${dayjs(
                  data?.release_date
                ).format("YYYY")})`}
              </p>

              <p className="text-beige italic font-outfit mt-2 text-lg">
                {data?.tagline}
              </p>

              <Genres data={_genres} />

              <div className="py-4 flex items-center gap-8">
                <div className="h-8 w-8 p-6 flex items-center justify-center rounded-full text-beige font-bold bg-beige">
                  <div className="h-6 w-6 p-5 flex items-center justify-center rounded-full text-beige font-bold bg-primary">
                    {data?.vote_average.toFixed(1)}
                  </div>
                </div>

                <div
                  className="text-xl text-beige cursor-pointer hover:text-tertiary transition-all delay-75"
                  onClick={() => {
                    setShow(true);
                    setVideoId(video?.key);
                  }}
                >
                  Watch Trailer
                </div>
              </div>

              <div className="text-beige">
                <h2 className="text-xl font-semibold">Overview</h2>
                <p className="text-sm">{data?.overview}</p>
              </div>

              <div className="py-4 text-beige flex justify-between text-sm font-semibold">
                {data?.status && (
                  <div>
                    <div>Status:</div>
                    <div>{data?.status}</div>
                  </div>
                )}
                {data?.status && (
                  <div>
                    <div>Release Date:</div>
                    <div>{dayjs(data?.release_date).format("MMM D, YYYY")}</div>
                  </div>
                )}
                {data?.runtime && (
                  <div>
                    <div>Runtime:</div>
                    <div>{toHoursAndMinutes(data?.runtime)}</div>
                  </div>
                )}
              </div>

              {director?.length > 0 && (
                <div className="text-beige text-sm flex gap-4 items-center font-semibold">
                  <div>Director:</div>
                  <div>
                    {director?.map((d, i) => (
                      <span key={i}>
                        {d.name} {director?.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {writers?.length > 0 && (
                <div className="py-2 text-beige text-sm flex gap-4 items-center font-semibold">
                  <div>Writer:</div>
                  <div>
                    {writers?.map((w, i) => (
                      <span key={i}>
                        {w.name} {writers?.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {data?.created_by?.length > 0 && (
                <div className="py-2 text-beige text-sm flex gap-4 items-center font-semibold">
                  <div>Creator:</div>
                  <div>
                    {data?.created_by?.map((c, i) => (
                      <span key={i}>
                        {c.name} {data?.created_by?.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <div className="relative grid grid-cols-12 z-30 gap-4 py-40  items-center justify-center">
            <div className="col-span-6 flex items-center justify-center">
              {data?.poster_path ? (
                <img
                  className="rounded-2xl h-[512px]"
                  src={url?.backdrop + data?.poster_path}
                  alt=""
                />
              ) : (
                <img
                  className="rounded-2xl h-[512px]"
                  src={PosterFallback}
                  alt=""
                />
              )}
            </div>

            <div className="col-span-6">
              <p className="text-beige text-3xl font-outfit">
                {`${data?.name || data?.title} (${dayjs(
                  data?.release_date
                ).format("YYYY")})`}
              </p>

              <p className="text-beige italic font-outfit mt-2 text-lg">
                {data?.tagline}
              </p>

              <Genres data={_genres} />

              <div className="py-4 flex items-center gap-8">
                <div className="h-8 w-8 p-6 flex items-center justify-center rounded-full text-beige font-bold bg-beige">
                  <div className="h-6 w-6 p-5 flex items-center justify-center rounded-full text-beige font-bold bg-primary">
                    {data?.vote_average.toFixed(1)}
                  </div>
                </div>

                <div
                  className="text-xl text-beige cursor-pointer hover:text-tertiary transition-all delay-75"
                  onClick={() => {
                    setShow(true);
                    setVideoId(video?.key);
                  }}
                >
                  Watch Trailer
                </div>
              </div>

              <div className="text-beige">
                <h2 className="text-xl font-semibold">Overview</h2>
                <p className="text-sm">{data?.overview}</p>
              </div>

              <div className="py-4 text-beige flex justify-between text-sm font-semibold">
                {data?.status && (
                  <div>
                    <div>Status:</div>
                    <div>{data?.status}</div>
                  </div>
                )}
                {data?.status && (
                  <div>
                    <div>Release Date:</div>
                    <div>{dayjs(data?.release_date).format("MMM D, YYYY")}</div>
                  </div>
                )}
                {data?.runtime && (
                  <div>
                    <div>Runtime:</div>
                    <div>{toHoursAndMinutes(data?.runtime)}</div>
                  </div>
                )}
              </div>

              {director?.length > 0 && (
                <div className="text-beige text-sm flex gap-4 items-center font-semibold">
                  <div>Director:</div>
                  <div>
                    {director?.map((d, i) => (
                      <span key={i}>
                        {d.name} {director?.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {writers?.length > 0 && (
                <div className="py-2 text-beige text-sm flex gap-4 items-center font-semibold">
                  <div>Writer:</div>
                  <div>
                    {writers?.map((w, i) => (
                      <span key={i}>
                        {w.name} {writers?.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {data?.created_by?.length > 0 && (
                <div className="py-2 text-beige text-sm flex gap-4 items-center font-semibold">
                  <div>Creator:</div>
                  <div>
                    {data?.created_by?.map((c, i) => (
                      <span key={i}>
                        {c.name} {data?.created_by?.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div> */}
        </div>
      ) : (
        <></>
      )}
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default DetailsBanner;
