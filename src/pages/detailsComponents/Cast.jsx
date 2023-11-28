import React from "react";
import { useSelector } from "react-redux";
import avatar from "../../assets/avatar.png";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  return (
    <div className="py-8 px-8 sm:px-16 md:px-24 xl:px-40">
      <div className="text-beige text-xl font-semibold font-outfit mb-4">
        Top Cast
      </div>
      {!loading ? (
        <div className="flex gap-8 w-full overflow-x-auto overflow-y-hidden">
          {data?.map((item) => {
            let imgUrl = item.profile_path
              ? url.profile + item.profile_path
              : avatar;

            return (
              <div
                className="text-beige  flex-shrink-0 flex flex-col items-center justify-center"
                key={item.id}
              >
                <img
                  className="h-32 w-32 mb-2 object-cover object-top rounded-full"
                  src={imgUrl}
                  alt=""
                />
                <div className="font-semibold text-sm">{item.name}</div>
                <div className="font-semibold text-xs">{item.character}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Cast;
