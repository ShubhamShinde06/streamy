import React, { useEffect, useState, useRef } from "react";
import Posters from "../components/Posters";
import MultiCards from "./MultiCards";
import { mixApi } from "../API/mixAPI";
import { motion } from "framer-motion";
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
          console.log("Observer triggered"); // Debugging
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        root: null, // Observe within viewport
        rootMargin: "200px", // Triggers earlier on mobile
        threshold: 0.1, // Less strict trigger
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, hasMore]);

  // ✅ Fallback: Manual Scroll Event (if Observer fails)
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        hasMore &&
        !isLoading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  // ✅ Grouping Data by Genre
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
    <div className="w-full min-h-screen overflow-y-auto relative">
      {isLoading && page === 1 ? (
        <LoadingSkeleton />
      ) : error ? (
        <p className="text-center text-red-500 mt-10 text-lg">Error: {error}</p>
      ) : (
        <>
          <Posters />

          <div className="w-full mt-10">
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
                </div>
                <MultiCards title={genre} data={groupedByGenre[genre]} />
              </motion.div>
            ))}
          </div>

          {/* Loading More Cards */}
          {isLoading && (
            <div className="w-full flex items-center p-2">
              {[...Array(3)].map((_, i) => (
                <MotionCard key={i} />
              ))}
            </div>
          )}

          {!hasMore && (
            <p className="text-center text-gray-500 mt-5">No more content</p>
          )}

          {/* Observer Target */}
          <div ref={observerRef} className="h-10 w-full bg-transparent"></div>
        </>
      )}
    </div>
  );
};

export default HomePosterCards;
