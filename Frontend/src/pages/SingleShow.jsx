import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import { GoDownload } from "react-icons/go";
import { showsApi } from "../API/showsAPI";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdPlay } from "react-icons/io";
import { IoAdd, IoAddOutline, IoInformation } from "react-icons/io5";
import { authApi } from "../API/authAPI";
import { mixApi } from "../API/mixAPI";
import Loading from "../components/Loading";
import { MdFileDownloadDone } from "react-icons/md";
import axios from "axios";

const SingleShow = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [mylistUpdated, setMyListUpdated] = useState(false);
  const [listId, setListId] = useState([]);
  const [saveId, setSaveId] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);

  const { user } = authApi();
  const { data, isLoading, error, showSingleGet } = showsApi();
  const { addToList, isLoading: loadinganimation, deleteToList } = mixApi();

  const userId = user?._id; // global use
  const itemId = id; // global use
  const itemType = "web_series";

  useEffect(() => {
    showSingleGet(id);
  }, [id, showSingleGet]);

  useEffect(() => {
    if (data?.seasons?.length) {
      setSelectedSeason(data.seasons[0]); // Select first season by default
    }
  }, [data]);

  // add movie
  const handleAddToList = async () => {
    try {

      await addToList(userId, itemId, itemType);
      setMyListUpdated((prev) => !prev);
    } catch (error) {
      console.log("Error adding to list:", error);
    }
  };

  // get addlist
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/mylist/get/${userId}`);
        const data = response.data.data;
        if (data.length > 0) {
          setListId(data.map((item) => item.itemId._id));
          setSaveId(data.find((item) => item.itemId._id === id)?._id || "");
        } else {
          console.log("No items found");
        }
      } catch (error) {
        console.log(error.response?.data?.message || "Something went wrong");
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, mylistUpdated]);

  const isSaved = listId.includes(id); // global use

  // remove movie
  const handleDeleteToList = async () => {
    try {
      await deleteToList(userId, saveId);
      setMyListUpdated((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  // Fallback image
  const defaultImage = "";

  const topRef = useRef(null);
  const handlePageUp = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="w-full h-full flex lg:flex-row flex-col-reverse overflow-y-auto scroll-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <NavBar />
      <div className="w-full lg:h-[100%] h-[100vh] overflow-hidden relative overflow-y-auto scroll-hidden">
        {/* Loading State */}
        {isLoading && (
          <motion.div
            className="flex justify-center items-center h-screen text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="animate-spin rounded-full h-12 w-12 border-t-4  border-[#6351CF]"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        )}

        <div key={data?._id} className="relative h-[70vh]">
          {/* Image Section */}
          <div className="w-full h-[50vh] lg:h-full">
            <img
              src={data?.image?.[0] || defaultImage}
              alt="Poster"
              className="w-full h-full object-cover lg:hidden"
            />
            <img
              src={data?.image?.[1] || defaultImage}
              alt="Poster"
              className="w-full h-full object-cover hidden lg:block"
            />
          </div>

          {/* Black Shadow Overlay */}
          <motion.div
            className="absolute w-full lg:h-[650px] h-[420px] top-0 in-site-color overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Details Section */}
          <motion.div
            className="absolute lg:top-[70%] top-[52%] h-full w-full flex justify-center in-site-color"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-[95%] h-auto text-white flex flex-col gap-4">
              {/* Show Information */}
              <motion.div
                className="w-full h-auto rounded-xl bg-[#242426] p-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <div className="flex flex-col gap-2 border-b-2 border-[#383A3F] pb-2">
                  <div className="flex justify-between items-center">
                    <div className="bg-[#00A241] w-10 flex items-center justify-center rounded-md">
                      <h1>{data?.rating || "N/A"}</h1>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-10 py-1 flex items-center justify-center rounded-md bg-white/20 backdrop-blur-lg">
                        HD
                      </span>
                      <span className="w-10 py-1 flex items-center justify-center rounded-md bg-white/20 backdrop-blur-lg">
                        15+
                      </span>
                      <span className="px-2 py-1 flex items-center justify-center rounded-md bg-white/20 backdrop-blur-lg">
                        {data?.total_seasons
                          ? `${data.total_seasons} Seasons`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                  <h1 className="uppercase text-3xl font-semibold">
                    {data?.series_name || "Unknown Show"}
                  </h1>
                </div>
                <div className="py-2 flex lg:flex-row flex-col items-center gap-3 justify-between">
                  {/* Description */}
                  <div className="w-full lg:w-1/2 text-[15px] text-[#8B8E93] lg:hidden line-clamp-2">
                    <p>{data?.plot}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="w-full flex items-center justify-between py-1">
                    <motion.button
                      className="lg:flex items-center lg:gap-3 hidden gap-2 bg-[#6351CF] lg:px-6 lg:py-3 py-1 px-3 rounded-lg text-lg lg:font-semibold shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IoMdPlay className="text-xl" />
                      Play Now
                    </motion.button>
                    <button
                      onClick={handlePageUp}
                      className="w-10 h-10 pl-0.5 bg-[#6351CF] lg:hidden rounded-full flex items-center justify-center"
                    >
                      <IoMdPlay />
                    </button>
                    <div className="flex items-center gap-3">
                      <motion.button
                        className="border rounded-full border-gray-400 text-[#e2dfdf] text-xl lg:text-2xl p-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <GoDownload onClick={handlePageUp} />
                      </motion.button>
                      <button
                        className="border rounded-full border-gray-400 text-[#e2dfdf] text-xl lg:text-2xl p-2"
                        onClick={() => {
                          if (!user) {
                            navigation("/auth");
                          } else {
                            isSaved ? handleDeleteToList() : handleAddToList();
                          }
                        }}
                      >
                        {loadinganimation ? (
                          <Loading />
                        ) : isSaved ? (
                          <MdFileDownloadDone />
                        ) : (
                          <IoAdd />
                        )}
                      </button>
                      {/* <motion.button
                        className="border rounded-full border-gray-400 text-[#e2dfdf] text-xl lg:text-2xl p-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IoAddOutline />
                      </motion.button> */}
                      <motion.button
                        className="border rounded-full border-gray-400 text-[#e2dfdf] text-xl lg:text-2xl p-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IoInformation />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Genre Section */}
              <div className="w-full h-auto rounded-xl bg-[#242426] p-2">
                <h1 className="text-white text-lg font-semibold">Genre</h1>
                <div className="flex flex-wrap items-center gap-2 text-xl mt-2 text-[#8B8E93]">
                  {data?.genre &&
                  Array.isArray(data.genre) &&
                  data.genre.length > 0 ? (
                    data.genre.map((item, index) => (
                      <button
                        key={index}
                        className="p-1 rounded-md px-2 bg-[#323337]"
                      >
                        {item}
                      </button>
                    ))
                  ) : (
                    <span>No genres available.</span>
                  )}
                </div>
              </div>

              {/* Seasons Section */}
              <div className="w-full h-auto rounded-xl bg-[#242426] p-4 flex flex-col gap-5">
                <h1 className="text-white text-lg font-semibold">Seasons</h1>
                <div className="flex items-center gap-2">
                  {data?.seasons &&
                  Array.isArray(data.seasons) &&
                  data.seasons.length > 0 ? (
                    data.seasons.map((season) => (
                      <button
                        key={season._id}
                        onClick={() => setSelectedSeason(season)}
                        className={`w-12 h-12 rounded-md flex items-center justify-center text-xl transition-all duration-200 ${
                          selectedSeason?.season_number === season.season_number
                            ? "bg-[#6351CF] text-white"
                            : "border border-gray-600 text-gray-400"
                        }`}
                      >
                        {season.season_number}
                      </button>
                    ))
                  ) : (
                    <span>No seasons available.</span>
                  )}
                </div>
              </div>

              {/* Episodes Section */}
              {selectedSeason?.episodes &&
              Array.isArray(selectedSeason.episodes) &&
              selectedSeason.episodes.length > 0 ? (
                <div
                  ref={topRef}
                  className="w-full h-auto rounded-xl bg-[#242426] p-4"
                >
                  <h1 className="text-white text-lg font-semibold">
                    Episodes - {selectedSeason.release_year || "N/A"}
                  </h1>
                  <div className="mt-2 flex flex-col gap-4">
                    {selectedSeason.episodes.map((episode, index) => (
                      <div
                        key={index}
                        className="w-full lg:h-[200px] h-[100px] flex items-center gap-2"
                      >
                        <Link
                          to={`${episode?.downloadLink}`}
                          className="w-10 lg:w-20 h-full border rounded-md border-gray-500 text-gray-500 flex items-center justify-center text-3xl"
                        >
                          <GoDownload />
                        </Link>
                        <Link
                          to={`/streamy-player/${data?._id}/${episode?._id}`}
                          className="lg:min-w-[340px] md:w-[170px] max-w-[150px] h-full rounded-md cursor-pointer overflow-hidden relative bg-gray-700"
                        >
                          <img src={data?.image?.[0] || defaultImage} alt="" />
                          <div className="absolute w-full left-2 top-2">
                            <div className="w-10 h-5 rounded-sm bg-[#121311] text-xs text-white flex items-center justify-center">
                              {episode.runtime_minutes || "N/A"}
                            </div>
                          </div>
                        </Link>
                        <div className="h-full flex flex-col gap-1">
                          <h1 className="text-white">Episode {index + 1}</h1>
                          <p className="text-[#8B8E93] line-clamp-2">
                            {episode.plot || "No description available."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <span>No episodes available.</span>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SingleShow;
