import React, { useEffect, useState } from "react";
import { IoChevronBackOutline, IoSend } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { authApi } from "../API/authAPI";
import { server } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import Loading from "../components/Loading";

const Chat = () => {
  const { user } = authApi();
  const userId = user?._id;

  const [updateData, setUpdateData] = useState(false);
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${server}/api/suggest/add`, {
        title,
        userId,
      });

      if (response?.data?.success) {
        toast.success(response.data.message);
        setTitle("");
        setUpdateData((prev) => !prev);
        setIsLoading(false);
      } else {
        toast.success(response?.data?.message);
        setTitle("");
        setUpdateData((prev) => !prev);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      toast.error("Failed to submit. Please try again later.");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/api/suggest/get/${userId}`);
        setData(response.data.data); // Store fetched data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [userId, updateData]);

  return (
    <div className="w-full h-full flex flex-col pt-4 ">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-4 py-2 shadow-md">
        <Link
          to={"/my-profile"}
          className="border border-gray-500 rounded-full p-2 text-white hover:bg-gray-700 transition"
        >
          <IoChevronBackOutline size={22} />
        </Link>
        <h1 className="text-2xl font-semibold text-white">Chats</h1>
        <div className="w-10" /> {/* Placeholder for alignment */}
      </div>

      {/* Message Box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Received Message */}
        <div className="flex flex-col items-start">
          <div className="bg-[#303030] text-white py-2 px-4 rounded-lg max-w-[75%]">
            Request a title, and we'll upload it within minutes! Share your
            feedback in the app to help us improve. 🙌🎬 Thank you! 😊
          </div>
        </div>

        {/* Sent Message */}
        <div className="flex flex-col items-end gap-2">
          {data?.map((item, index) => (
            <>
              <div className="bg-[#7339E5] text-white py-2 px-4 rounded-lg max-w-[75%]">
                {item?.title}
              </div>
              <div className="flex items-center gap-1">
                <p className="text-xs text-gray-400">
                  {format(item.createdAt)}
                </p>
                <IoCheckmarkDoneSharp className="text-blue-400 text-sm" />
              </div>
            </>
          ))}
        </div>
      </div>

      {/* Send Box */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center gap-3 bg-[#242426] p-3 shadow-md"
      >
        <div className="flex-1 h-12 flex items-center bg-[#303030] rounded-full px-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full bg-transparent text-white outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-[#6351CF] p-3 rounded-full hover:bg-[#543AB7] transition"
        >
          {user ? (
            isLoading ? (
              <Loading />
            ) : (
              <IoSend className="text-white" size={24} />
            )
          ) : (
            <Link to={'/auth'}><IoSend className="text-white" size={24} /></Link>
          )}
        </button>
      </form>
    </div>
  );
};

export default Chat;
