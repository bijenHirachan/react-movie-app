import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const { url } = useSelector((state) => state.home);

  const navigate = useNavigate();

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const movie = data?.results?.[Math.floor(Math.random() * 20)];

    setBackground(url?.backdrop + movie?.backdrop_path);
  }, [data, url]);

  const searchHandler = (e) => {
    e.preventDefault();

    if (!query) {
      return;
    }

    navigate(`/search/${query}`);
  };
  return (
    <div className="relative h-[100svh] w-full">
      <div className="h-[100svh] w-full">
        <div className="flex flex-col gap-2 ">
          {!loading && (
            <img
              src={background}
              alt=""
              className="h-[100svh]  object-cover object-center"
            />
          )}
        </div>
        <div className="absolute top-0 z-20 bg-secondary w-full h-[100svh] left-0 opacity-70"></div>
      </div>

      <div className="absolute bottom-[0] w-full h-16 bg-gradient-to-t from-[#435585] to-[rgba(67,85,133,0.1)]"></div>

      <div className="absolute z-50 h-full gap-4 w-full top-0 left-0 flex flex-col justify-center items-center ">
        <h2 className="text-white drop-shadow-2xl text-2xl sm:text-4xl font-outfit">
          Welcome To Movie App
        </h2>
        <form
          onSubmit={searchHandler}
          className="flex justify-center items-center w-full"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="h-10  w-4/6 sm:w-3/6 lg:w-2/6 border-none focus:outline-none px-4 py-2 rounded-l-full"
            placeholder="Search Movie or a TV show"
          />
          <button
            type="submit"
            className="h-10 rounded-r-full bg-primary text-beige uppercase text-xs font-semibold border-none focus:outline-none px-4 py-2"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroBanner;
