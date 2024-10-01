import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { FaArrowLeftLong } from "react-icons/fa6";
import { routes } from "../../routes/Routers";
import { toast } from "react-toastify";

const VerifiedOtp = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [resendTimer, setResendTimer] = useState(59);
    const inputRefs = useRef([]);
    const location = useLocation();
    const UserData = location?.state;

    const notify = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("OTP Submitted:", otp.join(""));

        let resOtp = await axios.post(
            `${baseUrl}/verify_OTP`,
            { email: UserData.email },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(resOtp);

        // try {
        //     let response = await axios.post(
        //         `${baseUrl}/auth/register`,
        //         UserData,
        //         {
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //         }
        //     );

        //     await axios.post(
        //         `${baseUrl}/auth/register_special_user/${response.data.user_id}?type=facilitator`,
        //         {
        //             no_of_professionals: response.data.user_id,
        //         }
        //     );
        //     console.log(response);

        //     notify("Registration successful");
        // } catch (error) {
        //     console.log(error.response.data.message);

        //     notifyError(error.response.data.message);
        // }
    };

    const handleResend = () => {
        console.log("ok");
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
                        <form
                            className="flex flex-col gap-y-3"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex justify-between gap-x-10">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        ref={(el) =>
                                            (inputRefs.current[index] = el)
                                        }
                                        onChange={(e) =>
                                            handleOtpChange(
                                                e.target.value,
                                                index
                                            )
                                        }
                                        className="w-1/4 rounded border border-[#63626A] bg-[#14121E] p-2 text-center text-2xl placeholder:text-[#7F7E84]"
                                    />
                                ))}
                            </div>

                            <p className="mt-4 text-center text-sm text-gray-400">
                                Didn’t get any code?{" "}
                                <span className="text-blue-400">
                                    {resendTimer > 0 ? (
                                        <>
                                            00:
                                            {resendTimer < 10
                                                ? `0${resendTimer}`
                                                : resendTimer}
                                        </>
                                    ) : (
                                        <span
                                            className="cursor-pointer text-blue-500 underline"
                                            onClick={handleResend}
                                        >
                                            Resend
                                        </span>
                                    )}
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
