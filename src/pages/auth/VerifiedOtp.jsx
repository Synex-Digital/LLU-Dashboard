import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { FaArrowLeftLong } from "react-icons/fa6";
import { routes } from "../../routes/Routers";

const VerifiedOtp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(59);
  const inputRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (resendTimer > 0) {
        setResendTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP Submitted:", otp.join(""));
  };

  return (
    <main className="h-screen bg-background font-inter text-white">
      <section className="flex items-center justify-center">
        <div className="my-10 xl:w-1/3 px-2 sm:w-4/5">
          <div className="flex items-center">
            <Link
              to={routes.login.path}
              className="text-base font-semibold text-Primary"
            >
              <FaArrowLeftLong />
            </Link>
            <h1 className="w-full text-center text-2xl font-medium">
              Verified OTP
            </h1>
          </div>
          <div className="mt-16 flex flex-col gap-y-3">
            <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
              <div className="flex justify-between gap-x-10">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className="w-1/4 rounded border border-[#63626A] bg-[#14121E] p-2 text-center text-2xl placeholder:text-[#7F7E84]"
                  />
                ))}
              </div>

              <p className="mt-4 text-center text-sm text-gray-400">
                Didn’t get any code?{" "}
                <span className="text-blue-400">
                  Resend in 00:
                  {resendTimer < 10 ? `0${resendTimer}` : resendTimer}
                </span>
              </p>

              <Button title={"Send"} className="mt-5" />
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VerifiedOtp;
