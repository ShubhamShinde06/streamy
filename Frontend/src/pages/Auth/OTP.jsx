import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { RxCross2 } from "react-icons/rx";
import logo from "../../assets/logo.png";
import { IoChevronBackOutline } from "react-icons/io5";
import { authApi } from "../../API/authAPI";
import { toast } from "react-toastify";

const OTP = () => {
  const { verifyEmail, error, isLoading } = authApi();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newCode = [...code];

    //handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      //focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < s ? lastFilledIndex + 1 : s;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      //move focus to the  next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKayDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationcode = code.join("");
    try {
      await verifyEmail(verificationcode);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
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
          <button onClick={()=>navigate('/auth')} className=" border rounded-full border-gray-400 cursor-pointer text-[#e2dfdf] text-xl lg:text-2xl p-2">
            <IoChevronBackOutline />
          </button>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center mt-10 lg:mt-0">
          <div className="lg:w-1/3 lg:h-full h-[500px] justify-center w-full flex flex-col gap-5">
            <h1 className=" lg:text-4xl text-2xl font-semibold pl-1 lg:pl-0">
              {"Enter Code"}
            </h1>
            <p className=" leading-tight tracking-tight text-white lg:text-xl">
              Enter the 6-digit code sent to your email address.
            </p>
            <form
              onSubmit={handleSubmit}
              className="w-full  flex flex-col gap-6 items-center bg-[#242426] rounded-xl p-5"
            >
              <div className="flex justify-between gap-3">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="6"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKayDown(index, e)}
                    //disabled={isLoading || code.some((digit) => !digit)}
                    className=" border-gray-300  rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 lg:py-5 bg-[#323337] text-white text-center text-xl"
                    required=""
                  />
                ))}
              </div>
              {error && (
                <p className=" text-red-500 font-semibold mt-2">{error}</p>
              )}
              <button className="w-full lg:h-15 h-12 bg-[#6351CF] rounded-xl text-xl  cursor-pointer">
                {isLoading ? "Verifying..." : "Verify Email"}
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

export default OTP;
