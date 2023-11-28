import React from "react";
import ReactPlayer from "react-player/youtube";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };

  return (
    <div
      className={`z-[200] flex justify-center items-center w-full h-full fixed top-0 left-0 ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full bg-[rgba(0, 0, 0, 0.25)] backdrop-blur-[3.5px] transition-opacity delay-[400ms] ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={hidePopup}
      ></div>

      <div
        className={`relative w-[800px] aspect-video bg-white transition-transform delay-[250ms] ${
          show ? "scale-[1]" : "scale-[0.2]"
        }`}
      >
        <span
          className="absolute top-[-24px] right-0 text-white cursor-pointer hover:text-beige transition-all delay-75"
          onClick={hidePopup}
        >
          Close
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width={"100%"}
          height={"100%"}
        />
      </div>
    </div>
  );
};

export default VideoPopup;
