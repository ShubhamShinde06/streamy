import React from "react";
import { FiSearch } from "react-icons/fi";
import { TbMovie } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { RiMovie2Line } from "react-icons/ri";
import { TbLayoutGridAdd } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const NavBar = () => {

  const index = 1

  return (
    <div className="lg:w-1/8 xl:w-1/11 2xl:w-1/12 lg:h-full lg:p-5 w-full h-1/10 lg:relative fixed bottom-0 z-10">
      {/* big screen */}
      <div className="w-full h-full lg:rounded-2xl rounded-xl bg-white/15 backdrop-blur-lg backdrop-opacity-80 lg:flex hidden flex-col justify-around">
        <div className="w-full flex flex-col items-center justify-center gap-10 text-gray-400 text-4xl">
          <img src={logo} alt="" className="w-15 ml-1" />
        </div>
        <div key={index} className="w-full  flex flex-col items-center justify-center gap-14 text-gray-400 text-4xl mt-10">
          {[
            // [<FiSearch />, "/search"],
            [<TbMovie />, "/movies"],
            [<GoHome />, "/"],
            [<RiMovie2Line />, "/shows"],
          ].map((item, index) => (
            <>
              <NavLink key={index + 1} to={`${item[1]}`}>
                {item[0]}
              </NavLink>
            </>
          ))}
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-10 text-gray-400 text-4xl">
          {[[<FaRegUserCircle />, '/my-profile'], [<TbLayoutGridAdd />,'/my-list']].map((item, index) => (
            <>
              <NavLink key={index + 1} to={`${item[1]}`}>
                {item[0]}
              </NavLink>
            </>
          ))}
        </div>
      </div>
      {/* small screen*/}
      <div className="w-full h-full bg-[#242426] text-gray-400 lg:hidden flex items-center justify-around">
        {[
          [<GoHome />, "/", "Home"],
          [<TbMovie />, "/movies", "Movies"],
          [logo, '/'],
          [<RiMovie2Line />, "/shows", "Shows"],
          [<FaRegUserCircle />, "/my-profile", "Profile"],
        ].map((item, index) => (
          <>
            <NavLink
              to={`${item[1]}`}
              key={index + 1}
              className={"flex flex-col items-center"}
            >
              {item[0] === logo ? (
                ""
              ) : (
                <div className="text-2xl icons">{item[0]}</div>
              )}
              <img src={item[0]} alt="" className="w-12" />
              {item[0] === logo ? "" : <div className="text-xs">{item[2]}</div>}
            </NavLink>
          </>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
