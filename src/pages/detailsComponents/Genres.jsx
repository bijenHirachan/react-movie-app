import React from "react";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="flex gap-2 mt-2">
      {data?.map((g) => {
        if (!genres[g]?.name) return;

        return (
          <div
            className="bg-tertiary px-2 py-1 rounded-md text-sm font-semibold text-beige"
            key={g}
          >
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
