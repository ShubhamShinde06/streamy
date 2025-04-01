import React, { useEffect, useState, useCallback } from "react";
import NavBar from "../components/NavBar";
import { VscFeedback } from "react-icons/vsc";
import { RiArrowRightSLine } from "react-icons/ri";
import { GoDownload } from "react-icons/go";
import { authApi } from "../API/authAPI";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { mixApi } from "../API/mixAPI";

const MyProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = authApi();
  const { mylistaGet, data } = mixApi();
  const [content, setContent] = useState([]);

  const userId = user?._id;

  // Fetch user list only if userId exists
  const fetchUserList = useCallback(() => {
    if (userId) {
      mylistaGet(userId);
    }
  }, [mylistaGet, userId]);

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  useEffect(() => {
    if (data?.length > 0) {
      setContent(
        data.map((item) => ({
          id: item.itemId?._id,
          type: item.itemId?.category || "Unknown",
          imageOne: item.itemId?.image?.[0] || "",
          imageTwo: item.itemId?.image?.[1] || "",
        }))
      );
    }
  }, [data]);

  const handleLogout = () => logout();

  return (
    <div className="w-full h-full flex lg:flex-row flex-col">
      <NavBar />
      <div className="text-white lg:p-5 lg:pl-0 p-2 w-full h-full flex flex-col gap-5 lg:gap-8 overflow-x-scroll scroll-hidden">
        {/* User Info */}
        <div className="w-full flex items-center gap-3 pl-2 mt-10">
          <div className="w-20 h-20 overflow-hidden rounded-full flex items-center justify-center text-6xl">
            {user ? (
              <img
                src="https://cdna.artstation.com/p/assets/images/images/040/954/060/original/maddie_creates-gif3.gif?1630356726"
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaRegUserCircle />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[#8B8E93]">{user ? "Member" : "Not a Member"}</p>
            <span className="text-xl lg:text-2xl">{user?.name || "Guest"}</span>
          </div>
        </div>

        {/* My List Section */}
        <div className="flex flex-col gap-3 lg:hidden">
  <div className="flex items-center justify-between p-2 lg:pl-0 text-2xl lg:text-3xl lg:pr-5">
    <h1>My List</h1>
    <button
      onClick={() => navigate("/my-list")}
      className="border rounded-full border-gray-400 cursor-pointer text-[#e2dfdf]"
    >
      <RiArrowRightSLine />
    </button>
  </div>
  <div className="flex items-center gap-2 overflow-x-scroll scroll-hidden">
    {user ? (
      content.length > 0 ? (
        content.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(item.type === "series"
              ? `/single-show/${item.id}`
              : `/single-movie/${item.id}`
            )}
            className="min-w-30 h-40 rounded-md cursor-pointer"
          >
            <img
              src={item.imageOne}
              alt={item.type}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))
      ) : (
        <p className="w-full text-center text-xl text-gray-500">
          No items found
        </p>
      )
    ) : (
      <p className="w-full text-center text-xl text-gray-500">
        Go to login
      </p>
    )}
  </div>
</div>


        {/* Download & Feedback Buttons */}
        <div className="w-full h-auto rounded-xl bg-[#242426] p-3">
          <div className="flex items-center justify-between border-gray-400 border-b pb-4">
            <div className="flex items-center gap-3">
              <GoDownload className="text-xl" />
              <h1>Download App</h1>
            </div>
            <button className="border rounded-full border-gray-400 cursor-pointer text-[#e2dfdf] text-xl">
              <RiArrowRightSLine />
            </button>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-3">
              <VscFeedback className="text-xl" />
              <h1>Help & Feedback</h1>
            </div>
            <button className="border rounded-full border-gray-400 cursor-pointer text-[#e2dfdf] text-xl">
              <RiArrowRightSLine />
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full text-center text-red-400 text-xl font-bold underline"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
