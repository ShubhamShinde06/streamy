import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { IoChevronBackOutline } from "react-icons/io5";
import { authApi } from "../../API/authAPI";
import { IoMdArrowBack } from "react-icons/io";
import Loading from "../../components/Loading";

const SendEmail = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const { isLoading, forgotPassword } = authApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
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
          <button
            onClick={() => navigate("/auth")}
            className=" border rounded-full border-gray-400 cursor-pointer text-[#e2dfdf] text-xl lg:text-2xl p-2"
          >
            <IoChevronBackOutline />
          </button>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center mt-10 lg:mt-0">
          <div className="lg:w-1/3 lg:h-full h-[500px] justify-center w-full flex flex-col gap-5">
            <h1 className=" lg:text-4xl text-2xl font-semibold pl-1 lg:pl-0">
              {"Reset password"}
            </h1>
            <p className="  leading-tight tracking-tight text-white lg:text-xl pl-1 lg:pl-0">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-6 items-center bg-[#242426] rounded-xl p-5"
              >
                <input
                  type="Email"
                  className="w-full h-15 rounded-xl bg-[#323337] p-2 outline-0"
                  placeholder="Joan@exmple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="w-full lg:h-15 h-12 bg-[#6351CF] rounded-xl text-xl  cursor-pointer">
                  {isLoading ? <Loading /> : "Send Reset Link"}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <p className=" mb-6">
                  If an account exists for{" "}
                  <span className="text-[#e82d2dfb] font-bold ">{email}</span>, you
                  will receive a password reset link shortly.
                </p>
                <p className="text-sm font-light flex items-center justify-center">
                  <Link
                    to="/auth"
                    className=" flex items-center gap-1 text-white font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    <IoMdArrowBack className="text-xl" /> Back to Login
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>{" "}
        <Footer />
      </div>

      <div className="w-full h-full absolute top-0 left-0 auth-bg"></div>
    </div>
  );
};

export default SendEmail;
