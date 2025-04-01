import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import { IoMdPlay } from "react-icons/io";
import { IoAddOutline, IoInformation } from "react-icons/io5";
import { GoDownload } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import { moviesApi } from "../API/moviesAPI";
import { mixApi } from "../API/mixAPI";
import { authApi } from "../API/authAPI";
import axios from "axios";
import { MdFileDownloadDone } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import Loading from "../components/Loading";
import { server } from "../App";

const SingleMovie = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [itemType, setCategory] = useState("");
  const [mylistUpdated, setMyListUpdated] = useState(false);
  const [listId, setListId] = useState([]);
  const [saveId, setSaveId] = useState(null);

  const { user } = authApi();
  const { data, isLoading, error, movieSingleGet } = moviesApi();
  const { addToList, isLoading: loadinganimation, deleteToList } = mixApi();



  const userId = user?._id; // global use
  const itemId = id; // global use

  useEffect(() => {
    if (id) movieSingleGet(id);
  }, [id]);

  // get only category
  useEffect(() => {
    if (data && data.length > 0) {
      setCategory(data[0]?.category || "");
    }
  }, [data]);

  // add movie
  const handleAddToList = async () => {
    try {
      await addToList(userId, itemId, itemType);
      setMyListUpdated((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  // get addlist
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(server +`/api/mylist/get/${userId}`);
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
  }, [userId, mylistUpdated, id]);

  const isSaved = listId.includes(id); // global use

  // remove movie
  const handleDeleteToList = async () => {
    try {
      await deleteToList(userId, saveId);
      setMyListUpdated((prev) => !prev);
      
      //toast.success(message);
      //console.log(message || error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex lg:flex-row flex-col-reverse overflow-y-auto scroll-hidden">
      <NavBar />
      <div className="w-full lg:h-full h-[100vh] overflow-hidden relative overflow-y-auto scroll-hidden">
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

        {/* Error State */}
        {error && (
          <motion.p
            className="text-center text-red-500 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Error: {error}
          </motion.p>
        )}

        {/* Movie Content */}
        {!isLoading && !error && data && (
          <motion.div
            key={data?._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative h-[70vh]"
          >
            {/* Movie Image */}
            <div className="w-full h-[50vh] lg:h-full">
              <img
                src={data?.image?.[1] || data?.image?.[0]}
                alt={data?.title || "Movie Poster"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Black Shadow Overlay */}
            <motion.div
              className="absolute w-full lg:h-[650px] h-[420px] top-0 in-site-color"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />

            {/* Movie Details */}
            <motion.div
              className="absolute lg:top-[70%] top-[52%] w-full flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-[95%] h-auto text-white flex flex-col gap-4">
                {/* Movie Info */}
                <motion.div
                  className="w-full h-auto rounded-xl bg-[#242426] p-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <div className="flex flex-col gap-2 border-b-2 border-[#383A3F] pb-2">
                    <div className="w-full flex justify-between items-center">
                      {/* Rating */}
                      {data?.rating && (
                        <motion.div
                          className="bg-[#00A241] w-10 flex items-center justify-center rounded-md"
                          initial={{ scale: 0.5 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <h1>{data?.rating}</h1>
                        </motion.div>
                      )}
                      {/* Tags */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-10 py-1 flex items-center justify-center rounded-md bg-white/20 backdrop-blur-lg">
                          {"HD"}
                        </span>
                        <span className="w-10 py-1 flex items-center justify-center rounded-md bg-white/20 backdrop-blur-lg">
                          {"15+"}
                        </span>
                      </div>
                    </div>
                    {/* Title */}
                    <h1 className="uppercase text-3xl font-semibold">
                      {data?.title}
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
                        onClick={()=>navigation(`/streamy-player/${data?._id}`)}
                        type="submit"
                        className="lg:flex items-center lg:gap-3 hidden gap-2 bg-[#6351CF] lg:px-6 lg:py-3 py-1 px-3 rounded-lg text-lg lg:font-semibold shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IoMdPlay className="text-xl" />
                        Play Now
                      </motion.button>
                      <button onClick={()=>navigation(`/streamy-player/${data?._id}`)} className="w-10 h-10 pl-0.5 bg-[#6351CF] lg:hidden rounded-full flex items-center justify-center">
                        <IoMdPlay />
                      </button>
                      <div className="flex items-center gap-3">
                        <motion.button
                          className="border rounded-full border-gray-400 text-[#e2dfdf] text-xl lg:text-2xl p-2"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                         <Link to={`${data?.download_link}`}><GoDownload  /></Link> 
                        </motion.button>

                        <button
                          className="border rounded-full border-gray-400 text-[#e2dfdf] text-xl lg:text-2xl p-2"
                          onClick={() => {
                            if (!user) {
                              navigation("/auth");
                            } else {
                              isSaved
                                ? handleDeleteToList()
                                : handleAddToList();
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
                          onClick={handleAddToList}
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

                {/* Genre Section (Fixed) */}
                {Array.isArray(data?.genre) && data?.genre.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-auto rounded-xl bg-[#242426] p-2"
                  >
                    <label className="text-white">Genre</label>
                    <div className="flex flex-wrap items-center gap-2 text-xl mt-2 text-[#8B8E93]">
                      {data.genre.map((genre, index) => (
                        <motion.button
                          key={index}
                          className="p-1 rounded-md px-2 bg-[#323337]"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {genre}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SingleMovie;
