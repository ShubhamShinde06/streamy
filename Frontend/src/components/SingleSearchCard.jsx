import React from "react";
import { IoMdPlay } from "react-icons/io";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SingleSearchCard = ({ index, data, loading}) => {

  return (
    <>
      {loading ? (
        <motion.div
          key={index}
          className="w-full h-[135px] lg:h-42 rounded-lg p-3 flex justify-between gap-4 items-center bg-white/15 backdrop-blur-lg backdrop-opacity-80 shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
        >
          {/* Movie Poster */}
          <div className="w-[40%] md:w-[35%] h-[100%] bg-[#3F3F3F] rounded-lg overflow-hidden animate-pulse"></div>

          {/* Movie Details */}
          <div className="w-full h-full text-[#CACED7] flex flex-col gap-1 lg:gap-2  ">
            <h1 className="text-white text-lg md:text-xl font-bold bg-[#3F3F3F] p-2 animate-pulse"></h1>
            <p className="line-clamp-2 lg:line-clamp-3 text-xs p-5 md:text-sm bg-[#3F3F3F] text-[#A5AAB5] animate-pulse"></p>

            {/* Rating & Play Button */}
            <div className="flex items-center w-full gap-2 justify-between mt-1">
              <div className=" animate-pulse px-2 rounded-md text-xs md:text-sm bg-[#3F3F3F] text-white p-2">
                <h1></h1>
              </div>
              <button className=" animate-pulse w-9 h-9 bg-[#3F3F3F] rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-110 hover:bg-[#7A65E0]"></button>
            </div>
          </div>
        </motion.div>
      ) : (
        <Link
          to={data?.category === "series" ? `/single-show/${data?._id}` : `/single-movie/${data?._id}`}
          key={index}
          className="w-full h-[135px] lg:h-42 rounded-lg p-3 flex justify-between gap-4 items-center bg-white/15 backdrop-blur-lg backdrop-opacity-80 shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
        >
          {/* Movie Poster */}
          <div className="w-[40%] md:w-[35%] h-[100%] rounded-lg overflow-hidden">
            <img
              src={data?.image[0]}
              alt="Movie Poster"
              className="w-full h-full lg:hidden object-cover transition-transform duration-300 hover:scale-110"
              loading="lazy"
            />
            <img
              src={data?.image[1]}
              alt="Movie Poster"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 lg:block hidden"
            />
          </div>

          {/* Movie Details */}
          <div className="w-full h-full text-[#CACED7] flex flex-col gap-1 lg:gap-2">
            <h1 className="text-white text-lg md:text-xl font-bold">
              {data?.title || data?.series_name}
            </h1>
            <p className="line-clamp-2 lg:line-clamp-3 text-xs md:text-sm text-[#A5AAB5]">
              {data?.plot}
            </p>

            {/* Rating & Play Button */}
            <div className="flex items-center w-full gap-2 justify-between mt-1">
              <div className="p-1 px-2 rounded-md text-xs md:text-sm border border-[#616270] bg-[#292B33] text-white">
                <h1>{data?.rating}</h1>
              </div>
              <button className="w-9 h-9 bg-[#6351CF] rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-110 hover:bg-[#7A65E0]">
                <IoMdPlay className="text-white text-lg" />
              </button>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default SingleSearchCard;
