import React, { useState } from "react";
import VideoPopup from "../../components/VideoPopup";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState();

  return (
    <div className="px-8 sm:px-16 md:px-24 xl:px-40 py-4">
      <div className="text-beige text-xl font-semibold font-outfit mb-4">
        Official Videos
      </div>
      <div>
        {!loading ? (
          <div className="cursor-pointer flex gap-2 w-full overflow-x-auto overflow-y-hidden">
            {data?.results?.map((video) => (
              <div
                key={video.id}
                className="w-64 flex-shrink-0"
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
              >
                <img
                  className="rounded-xl h-40 aspect-video"
                  src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  alt=""
                />
                <div className="text-beige text-sm font-semibold mt-2 hover:text-tertiary transition-all delay-75">
                  {video.name}
                </div>
              </div>
            ))}
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
    </div>
  );
};

export default VideosSection;
