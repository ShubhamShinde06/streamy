import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { IoMdPlay } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {Link} from 'react-router-dom'
import {server } from '../App'

const fetchPost = async () => {
  const res = await axios.get(server +`/api/mix/get-mix?poster=true&limit=7`);

  return res.data;
};

const Posters = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPost(),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;

  const contentArray = data?.data || [];

  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full lg:h-[100%] h-[70vh] overflow-hidden relative ">
      <Slider {...settings}>
        {isPending ? (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="w-full h-[100vh] flex items-center justify-center text-white"
          >
            <div className="w-full h-full absolute top-0 left-0 in-site-color p-8 pl-0  text-white lg:block hidden">
              <div className="flex items-center gap-4">
                <div className="p-5  px-10 rounded-md text-xl bg-[#3F3F3F]">
                  <h1 className="animate-pulse"></h1>
                </div>
                <div className="p-5  px-10 rounded-md text-xl bg-[#3F3F3F] animate-pulse">
                  <h1></h1>
                </div>
                <div className="p-5  px-10 rounded-md text-xl bg-[#3F3F3F] animate-pulse">
                  <h1></h1>
                </div>
              </div>
              <h1 className="text-9xl font-semibold animate-pulse"></h1>
              <p className="w-1/2 h-40 bg-[#3F3F3F]  text-2xl mt-5 animate-pulse"></p>
              <div className="flex items-center gap-5 text-2xl font-semibold mt-10">
                <button className="w-1/6 p-4 rounded-md bg-[#3F3F3F] cursor-pointer animate-pulse"></button>
              </div>
            </div>

            {/* small screen */}
            <div className="lg:hidden absolute top-[45%] h-full w-full flex justify-center  animate-pulse">
              <div className="w-[95%] h-auto text-white flex flex-col items-center gap-4  animate-pulse">
                <h1 className=" uppercase text-3xl font-semibold  animate-pulse"></h1>
                <div className="w-full h-[150px] rounded-xl bg-[#242426] p-2">
                  <div className=" flex flex-col gap-2 border-b-2 border-[#383A3F] pb-2">
                    <div className="w-1/8 p-2 flex justify-center items-center  rounded-md text-[15px]  bg-[#323337]  animate-pulse">
                      <h1></h1>
                    </div>
                    <p className="text-xs line-clamp-2 text-[#8B8E93]  animate-pulse"></p>
                  </div>
                  <div className=" pt-1 h-1/2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#8B8E93] text-[15px]">
                      <button className="p-1 rounded-md px-2  bg-[#323337]  animate-pulse"></button>
                      <button className="p-1 rounded-md px-2  bg-[#323337]  animate-pulse"></button>
                    </div>
                    <button className="w-10 h-10 pl-0.5 bg-[#6351CF] rounded-full flex items-center justify-center"></button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          contentArray?.map((item, index) => (
            <div key={index + 1} className="relative h-[70vh] ">
              <div className="w-full h-[50vh] lg:h-full lg:hidden">
                <img
                  src={item?.image[0]}
                  alt="Poster"
                  className="w-full h-full object-cover "
                />
              </div>
              <div className="w-full h-[50vh] lg:h-full lg:block hidden">
                <img
                  src={item?.image[1]}
                  alt="Poster"
                  className="w-full h-full object-cover "
                />
              </div>

              <div className=" lg:hidden absolute w-full h-[420px] top-0 in-site-color"></div>

              {/* big screen */}
              <div className="w-full h-full absolute top-0 pt-25 left-0 in-site-color p-8 pl-0 text-white lg:block hidden z-10">
                {/* Movie Rating & Genres */}

                <div className="flex items-center gap-3 mb-4">
                  {item?.genre?.flat().map((item, index) => (
                    <button
                      key={index + 1}
                      className="p-1 rounded-md px-2   bg-[#00A241]"
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* Movie Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl lg:text-7xl  font-bold uppercase"
                >
                  {item?.title || item?.series_name}
                </motion.h1>

                {/* Movie Description */}
                <p className="max-w-2xl text-lg lg:text-xl mt-4 text-white line-clamp-4">
                  {item?.plot}
                </p>

                {/* Play Button */}
                <Link to={item?.category === "series" ? `/single-show/${item?._id}` : `/single-movie/${item?._id}`} className="mt-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-3 bg-[#6351CF] px-6 py-3 rounded-lg text-lg font-semibold shadow-lg"
                  >
                    <IoMdPlay className="text-xl" />
                    Play Now
                  </motion.button>
                </Link>
              </div>

              {/* small screen */}
              <div className="lg:hidden absolute top-[52%] h-full w-full flex justify-center in-site-color">
                <div className="w-[95%] h-auto text-white flex flex-col items-center gap-4">
                  <h1 className=" uppercase text-3xl font-semibold line-clamp-1">
                    {item?.title || item?.series_name}
                  </h1>
                  <div className="w-full h-[150px] rounded-xl bg-[#242426] p-2">
                    <div className=" flex flex-col gap-2 border-b-2 border-[#383A3F] pb-2">
                      <div className="w-1/8 2 flex justify-center items-center  rounded-md text-[15px] bg-[#5E856A]">
                        <h1>8.5</h1>
                      </div>
                      <p className="text-xs line-clamp-2 text-[#8B8E93]">
                        {item?.plot}
                      </p>
                    </div>
                    <div className=" pt-1 h-1/2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#8B8E93] text-[15px]">
                        {item?.genre?.flat().map((item, index) => (
                          <button
                            key={index + 1}
                            className="p-1 rounded-md px-2  bg-[#323337]"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                      <Link to={item?.category === "series" ? `/single-show/${item?._id}` : `/single-movie/${item?._id}`} className="w-10 h-10 pl-0.5 bg-[#6351CF] rounded-full flex items-center justify-center">
                        <IoMdPlay />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </Slider>
    </div>
  );
};

export default Posters;
