import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import { IoChevronBackOutline } from "react-icons/io5";
import { authApi } from "../../API/authAPI";

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const { resetPassword, error, isLoading, message } = authApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password Do Not Match");
    }
    await resetPassword(token, password);
    navigate("/auth");
    toast.success("Password reset successfully");
  };

  return (
    <div className="w-full h-full relative ">
      <div className="w-full h-full text-white flex flex-col lg:px-5 px-2 p-5 overflow-x-scroll scroll-hidden">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="w-10 lg:w-15" />
            <h1 className="font-bold lg:text-3xl text-2xl">STREAMY</h1>
          </div>
          <button onClick={()=>navigate('/auth')} className=" border rounded-full border-gray-400 cursor-pointer text-[#e2dfdf] text-xl lg:text-2xl p-2">
            <IoChevronBackOutline />
          </button>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center mt-10 lg:mt-0">
          <div className="lg:w-1/3 lg:h-full h-[500px] justify-center w-full flex flex-col gap-5">
            <h1 className=" lg:text-4xl text-2xl font-semibold pl-1 lg:pl-0">
              {"Set Up New Password"}
            </h1>
            {error && (
              <p className=" text-red-500 font-semibold mt-2">{error}</p>
            )}
            {message && (
              <p className=" text-green-500 font-semibold mt-2">{message}</p>
            )}
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-6 items-center bg-[#242426] rounded-xl p-5"
            >
              <input
                type="password"
                className="w-full h-15 rounded-xl bg-[#323337] p-2 outline-0"
                placeholder="●●●●●●"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />  
              <input
                type="password"
                className="w-full h-15 rounded-xl bg-[#323337] p-2 outline-0"
                placeholder="●●●●●●"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button className="w-full lg:h-15 h-12 bg-[#6351CF] rounded-xl text-xl  cursor-pointer">
                {isLoading ? "Resetting.." : "Set New Password"}
              </button>
            </form>
          </div>
        </div>{" "}
        <Footer />
      </div>

      <div className="w-full h-full absolute top-0 left-0 auth-bg"></div>
    </div>
  );
};

export default ForgotPassword;
