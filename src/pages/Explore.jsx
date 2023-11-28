import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { fetchDataFromApi } from "../utils/api";
import Select from "react-select";
import MovieCard from "../components/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";

let filters = {};

const sortByData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const { mediaType } = useParams();

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res?.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortBy(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    setPageNum(1);
    fetchInitialData();
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortBy(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  const skeleton = () => {
    return (
      <div className="h-[335px] w-[224px]  relative mb-16 animate-pulse">
        <div className="rounded-lg h-full w-full bg-slate-700" />
        <div className="absolute bottom-[-16px] right-[16px]  h-8 w-8 p-6 flex items-center justify-center rounded-full bg-slate-700"></div>
        <div className="bg-slate-700 h-4 w-24 rounded-full mt-2"></div>

        <div className="bg-slate-700 h-4 w-16 rounded-full mt-2"></div>
      </div>
    );
  };

  return (
    <div className="py-32 px-8 sm:px-16 md:px-24 xl:px-40 bg-secondary">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-8">
        <div className="text-beige text-xl font-semibold">
          {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:w-1/2 gap-4">
          <Select
            isMulti
            name="genres"
            value={genre}
            closeMenuOnSelect={false}
            options={genresData?.genres}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            onChange={onChange}
            placeholder="Select genres"
            classNamePrefix={"react-select"}
            className="w-full sm:w-1/2"
          />

          <Select
            name="sortby"
            value={sortBy}
            options={sortByData}
            onChange={onChange}
            isClearable={true}
            placeholder="Sort by"
            classNamePrefix={"react-select"}
            className="w-full sm:w-1/2"
          />
        </div>
      </div>
      {!loading ? (
        <div className="">
          {data?.results?.length > 0 && (
            <InfiniteScroll
              className="flex flex-wrap gap-4 justify-center"
              dataLength={data?.results?.length || []}
              next={fetchNextPageData}
              hasMore={pageNum <= data?.total_pages}
              loader={<>Loading...</>}
            >
              {data?.results?.map((item, index) => {
                if (item.media_type === "person") return;
                return (
                  <MovieCard key={index} data={item} mediaType={mediaType} />
                );
              })}
            </InfiniteScroll>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          <>{skeleton()}</>
          <>{skeleton()}</>
          <>{skeleton()}</>
          <>{skeleton()}</>
          <>{skeleton()}</>
          <>{skeleton()}</>
          <>{skeleton()}</>
          <>{skeleton()}</>
          <>{skeleton()}</>
          <>{skeleton()}</>
          <>{skeleton()}</>
          <>{skeleton()}</>
          <>{skeleton()}</>
          <>{skeleton()}</>
        </div>
      )}
    </div>
  );
};

export default Explore;
