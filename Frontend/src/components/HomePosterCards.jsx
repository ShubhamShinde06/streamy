import React, { useEffect, useState, useRef } from "react";
import Posters from "../components/Posters";
import MultiCards from "./MultiCards";
import { mixApi } from "../API/mixAPI";
import { RiArrowRightSLine } from "react-icons/ri";
import { motion } from "framer-motion"; // ✅ Added smooth animations
import LoadingSkeleton from "./LoadingSkeleton";
import MotionCard from "./MotionCard";

const HomePosterCards = () => {
  const { data, isLoading, error, mixDataGet, hasMore } = mixApi();
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const observerRef = useRef(null);

  // ✅ Fetch data on page change
  useEffect(() => {
    mixDataGet(page);
  }, [page]);

  // ✅ Append new data (avoid duplicates)
  useEffect(() => {
    if (data?.length > 0) {
      setAllData((prevData) => {
        const newData = data.filter(
          (item) => !prevData.some((p) => p._id === item._id)
        );
        return [...prevData, ...newData];
      });
    }
  }, [data]);

  // ✅ Infinite Scroll using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, hasMore, page]);

  const groupedByGenre = {};
  allData.forEach((item) => {
    item?.genre?.flat().forEach((g) => {
      const genreName = typeof g === "string" ? g : g[0];
      if (genreName) {
        if (!groupedByGenre[genreName]) {
          groupedByGenre[genreName] = [];
        }
        if (groupedByGenre[genreName].length < 7) {
          groupedByGenre[genreName].push(item);
        }
      }
    });
  });

  return (
    <div className="w-full h-screen overflow-y-auto scroll-hidden relative">
      {isLoading && page === 1 ? (
        <>
          <LoadingSkeleton/>
        </>
        
      ) : error ? (
        <p className="text-center text-red-500 mt-10 text-lg">Error: {error}</p>
      ) : (
        <>
          <Posters />

          <div className="w-full mt-10 lg:absolute lg:top-[70%]">
            {Object.keys(groupedByGenre).map((genre) => (
              <motion.div
                key={genre}
                className="mb-10 px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Title Section */}
                <div className="flex items-center justify-between text-2xl lg:text-3xl text-white">
                  <h1 className="font-semibold">{genre}</h1>
                  {/* <button className="border rounded-full border-gray-500 p-2 hover:bg-gray-700 transition">
                    <RiArrowRightSLine size={24} />
                  </button> */}
                </div>
                <MultiCards title={genre} data={groupedByGenre[genre]} />
              </motion.div>

              
            ))}
          </div>

          {isLoading && (
            <div className="w-full mt-0 flex items-center p-2">
            {[...Array(3)].map((_, i) => (
              <MotionCard key={i}/>
            ))}
          </div>
          )}
          {!hasMore && (
            <p className="text-center text-gray-500 mt-5">No more content</p>
          )}
          <div ref={observerRef} className="h-20"></div>
        </>
      )}
    </div>
  );
};

export default HomePosterCards;
