import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SingleCard = ({ data, status }) => {
  return (
    <>
      {status ? (
        <>
          <motion.div className="lg:w-[340px] bg-[#3F3F3F]  shadow-2xl animate-pulse  lg:h-[200px] md:w-[170px] h-[180px] min-w-[140px] rounded-md cursor-pointer overflow-hidden relative mr-3">
            <div className="lg:w-[340px]  lg:h-[200px] md:w-[170px] h-[180px] min-w-[140px] rounded-md cursor-pointer overflow-hidden relative mr-3">
              <div className="w-full h-full lg:hidden block"></div>
              <div className="w-full h-full lg:block hidden"></div>
              <div className=" opacity-0 absolute top-0 w-[100%] h-full flex justify-center items-center text-5xl backdrop-blur-sm bg-white/5 show-box"></div>
            </div>
          </motion.div>
        </>
      ) : (
        <Link
          to={
            data?.category === "series"
              ? `/single-show/${data?._id}`
              : `/single-movie/${data?._id}`
          }
          className="lg:w-[340px] ml-2 lg:ml-0 lg:h-[260px] md:w-[170px] w-[200px] h-[200px] rounded-md cursor-pointer overflow-hidden scroll-hover "
        >
          <div className="lg:w-[340px] lg:h-[200px] md:w-[170px] w-[200px] h-[130px] rounded-md cursor-pointer overflow-hidden relative">
            <div className=" absolute w-full left-2 top-2">
              <div className="w-8 h-5 rounded-sm bg-[#00A241] text-xs text-white flex items-center justify-center">
                {data?.rating}
              </div>
            </div>
            <img
              src={data?.image[1]}
              alt="streamy"
              className="w-full h-full lg:hidden block"
              loading="lazy"
            />
            <img
              src={data?.image[0]}
              alt="streamy"
              className="w-full h-full lg:block hidden"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col pt-2 ">
            <h1 className="text-xl line-clamp-1">
              {" "}
              {data?.title || data?.series_name}
            </h1>
            <p className="text-xs line-clamp-1 text-[#8B8E93] pl-1">
              {data?.plot}
            </p>
          </div>
        </Link>
      )}
    </>
  );
};

export default SingleCard;
