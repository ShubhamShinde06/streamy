import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import { IoSearch } from "react-icons/io5";
import { moviesApi } from "../API/moviesAPI";
import SingleSearchCard from "../components/SingleSearchCard";

const Movies = () => {
  const { data, isLoading, error, moviesGet } = moviesApi();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    moviesGet();
  }, [moviesGet]);

  // Filter movies based on search query
  const filteredMovies = Array.isArray(data)
    ? data.filter((movie) =>
        movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="w-full h-full flex lg:flex-row flex-col">
      <NavBar />
      <div className="text-white lg:p-5 lg:pl-0 p-2 w-full h-full overflow-x-scroll scroll-hidden">
        
        {/* Search Bar */}
        <div className="w-full lg:h-1/8 rounded-xl bg-[#242426] flex lg:flex-row flex-col items-center justify-between p-5 gap-5">
          <div className="flex items-center bg-[#323337] w-full lg:h-full h-12 rounded-xl overflow-hidden pl-2">
            <IoSearch className="lg:text-3xl text-xl text-gray-400" />
            <input
              type="text"
              className="bg-transparent flex-1 p-2 lg:placeholder:text-xl outline-0 text-white"
              placeholder="Enter Movie Title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Movies Grid */}
        <motion.div
          className="w-full lg:h-auto pt-5 grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading ? (
            // Motion skeleton loaders
            [...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                className="w-full h-40 bg-[#3F3F3F] animate-pulse rounded-lg"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : filteredMovies.length > 0 ? (
            filteredMovies.map((item, index) => (
              <SingleSearchCard
                key={item._id || index}
                index={index}
                data={item}
                loading={isLoading}
              />
            ))
          ) : (
            <p className="text-center text-gray-400">No movies found.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Movies;
