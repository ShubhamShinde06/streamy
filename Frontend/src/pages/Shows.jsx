import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import { IoSearch } from "react-icons/io5";
import SingleSearchCard from '../components/SingleSearchCard';
import { showsApi } from '../API/showsAPI';

const Shows = () => {
  const { data, isLoading, error, showsGet } = showsApi();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    showsGet();
  }, [showsGet]);

  // Filter shows based on search query
  const filteredShows = Array.isArray(data)
    ? data.filter((show) =>
        show.series_name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="w-full h-full flex lg:flex-row flex-col-reverse">
      <NavBar />
      <div className="text-white lg:p-5 lg:pl-0 p-2 w-full h-full overflow-x-scroll scroll-hidden">
        
        {/* Search Bar */}
        <motion.div
          className="w-full lg:h-1/8 rounded-xl bg-[#242426] flex lg:flex-row flex-col items-center justify-between p-5 gap-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center bg-[#323337] w-full lg:h-full h-12 rounded-xl overflow-hidden pl-2">
            <IoSearch className="lg:text-3xl text-xl text-gray-400" />
            <input
              type="text"
              className="bg-transparent flex-1 p-2 lg:placeholder:text-xl outline-0 text-white"
              placeholder="Enter Web Show Title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Shows Grid */}
        <motion.div
          className="w-full lg:h-auto pt-5 grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
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
            <motion.p
              className="text-center text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Error: {error}
            </motion.p>
          ) : filteredShows.length > 0 ? (
            filteredShows.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <SingleSearchCard 
                  index={index} 
                  data={item} 
                  loading={isLoading} 
                />
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-center text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No shows found.
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Shows;
