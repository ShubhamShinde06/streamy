import React, { useEffect, useState, useCallback } from "react";
import NavBar from "../components/NavBar";
import { RxCross2 } from "react-icons/rx";
import { authApi } from "../API/authAPI";
import { mixApi } from "../API/mixAPI";
import { useNavigate } from "react-router-dom";

const MyList = () => {
  const { user } = authApi();
  const { mylistaGet, data } = mixApi();
  const [content, setContent] = useState([]);

  const userId = user?._id;
  const navigate = useNavigate();

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
          imageOne: item.itemId?.image?.[0] || "streamy",
          type: item?.itemType,
        }))
      );
    }
  }, [data]);

  console.log(content);

  return (
    <div className="w-full h-full flex lg:flex-row flex-col">
      <NavBar />
      <div className="text-white lg:p-5 lg:pl-0 p-2 w-full h-[calc(100vh-70px)] flex flex-col gap-5 lg:gap-8 overflow-x-scroll scroll-hidden">
        <h1 className="lg:mt-5 mt-2 lg:text-3xl text-xl">My List</h1>

        <div className="w-full flex flex-wrap justify-center lg:justify-start gap-3">
          {content.length > 0 ? (
            content.map((item) => (
              <div
                key={item.id}
                className="lg:w-45 lg:h-65 w-30 h-45 rounded-xl relative"
              >
                <img
                  src={item.imageOne}
                  alt={"streamy"}
                  className="w-full h-full object-cover rounded-xl"
                  onClick={() =>
                    navigate(
                      item.type === "series"
                        ? `/single-show/${item.id}`
                        : `/single-movie/${item.id}`
                    )
                  }
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-xl">No items in your list.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyList;
