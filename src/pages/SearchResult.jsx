import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { fetchDataFromApi } from "../utils/api";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
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

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

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
    <div className="bg-secondary py-32 px-8 sm:px-16 md:px-24 xl:px-40 min-h-[100svh]">
      {!loading ? (
        <>
          {data?.results?.length > 0 && (
            <>
              <div className="">
                <div className="text-xl font-semibold text-beige italic py-8 text-center">{`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of query '${query}'`}</div>

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
                      <MovieCard key={index} data={item} fromSearch={true} />
                    );
                  })}
                </InfiniteScroll>
              </div>
            </>
          )}
        </>
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

export default SearchResult;
