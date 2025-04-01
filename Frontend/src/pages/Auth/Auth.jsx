import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { authApi } from "../../API/authAPI";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/Loading";
import { IoEyeOutline } from "react-icons/io5";
import { GoEyeClosed } from "react-icons/go";

const Auth = () => {
  const [show, setShow] = useState(false);
  const [currentState, setCurrentState] = useState("Login");
  const { login, signup, error, isLoading, message } = authApi();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentState === "Login") {
      try {
        await login(email, password);
        navigate("/");
        toast.success(message || "Welcome back");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await signup(name, email, password);
        //toast.success(message);
        navigate("/otp");
      } catch (error) {
        console.log(error);
      }
    }
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
            onClick={() => navigate("/")}
            className=" border rounded-full border-gray-400 cursor-pointer text-[#e2dfdf] text-xl lg:text-2xl p-2"
          >
            <RxCross2 />
          </button>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center mt-10 lg:mt-0">
          <div className="lg:w-1/3 w-full h-150 flex flex-col justify-center gap-5">
            <h1 className=" lg:text-4xl text-center text-3xl font-semibold pl-1 lg:pl-0">
              {currentState === "Login" ? "Log in" : "Sign up"}
            </h1>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-6 items-center bg-[#242426] rounded-xl p-5"
            >
              {currentState === "Login" ? (
                ""
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Joan"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-15 rounded-xl bg-[#323337] p-2 outline-0 "
                  />
                </>
              )}
              <input
                type="email"
                className="w-full h-15 rounded-xl bg-[#323337] p-2 outline-0"
                placeholder="Joan@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="w-full flex relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-15 rounded-xl bg-[#323337] p-2 outline-0 flex-1"
                />
                <div className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
                  {show ? (
                    <IoEyeOutline onClick={() => setShow(false)} />
                  ) : (
                    <GoEyeClosed onClick={() => setShow(true)} />
                  )}
                </div>
              </div>

              <div className=" text-center w-full ">
                {currentState === "Login" ? (
                  <>
                    <div className=" text-[16px] text-end text-[#8471ea]">
                      <Link to={"/send-email"}>
                        <h1 className=" cursor-pointer">Forgot password ?</h1>
                      </Link>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              {error && (
                <p className=" text-red-500 font-semibold mt-2">{error}</p>
              )}

              {currentState === "Login" ? (
                <button
                  type="submit"
                  className="w-full lg:h-15 h-12 bg-[#6351CF] rounded-xl text-xl  cursor-pointer flex items-center justify-center"
                >
                  {isLoading ? <Loading /> : "Log in"}
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full lg:h-15 h-12 bg-[#6351CF] rounded-xl text-xl  cursor-pointer flex items-center justify-center"
                >
                  {isLoading ? <Loading /> : "Sign up"}
                </button>
              )}

              <div className="w-[90%] lg:w-full overflow-hidden mt-5 flex gap-4  text-[gray] justify-center">
                ────────────── <span>Or</span>
                <span>──────────────</span>
              </div>

              <div className=" text-center w-full">
                {currentState === "Login" ? (
                  <div
                    onClick={() => setCurrentState("Sign Up")}
                    className=" cursor-pointer"
                  >
                    <p className="text-[gray] tracking-wider">
                      You have no account?{" "}
                      <span className=" underline font-bold text-white tracking-wide text-[14px] lg:text-[18px]">
                        Create account
                      </span>
                    </p>
                  </div>
                ) : (
                  <div
                    onClick={() => setCurrentState("Login")}
                    className=" cursor-pointer"
                  >
                    <p className="text-[gray] tracking-wider">
                      Already have an account?{" "}
                      <span className=" underline font-bold text-white tracking-wide text-[14px] lg:text-[18px]">
                        Log in
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>{" "}
        <Footer />
      </div>

      <div className="w-full h-full absolute top-0 left-0 auth-bg"></div>
    </div>
  );
};

export default Auth;
