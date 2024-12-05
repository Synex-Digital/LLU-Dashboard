import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

import { FaArrowLeftLong } from "react-icons/fa6";
import { routes } from "../../routes/Routers";
import { toast } from "react-toastify";
import axios from "axios";
import { LoadingIcon } from "../../assets/icon";
import {
    GoogleMap,
    Marker,
    InfoWindow,
    useLoadScript,
} from "@react-google-maps/api";

const VerifiedOtp = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [resendTimer, setResendTimer] = useState(59);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);
    const location = useLocation();
    const UserData = location?.state;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAP_KEY}&loading=async`,
    });

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
        setLoading(true);
        let user_OTP = Number(otp.join(""));
        try {
            let resOtp = await axios.post(
                `${baseUrl}/auth/verify_OTP`,
                { email: UserData.email, user_otp: user_OTP },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(resOtp);

            let data = {
                full_name: UserData.full_name,
                email: UserData.email,
                password: UserData.password,
            };

            let response = await axios.post(`${baseUrl}/auth/register`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(response);
            let vip_user = await axios.post(
                `${baseUrl}/auth/register_special_user/${response.data.user_id}?type=facilitator`,
                {
                    no_of_professionals: response.data.user_id,
                    latitude: 40.712776,
                    longitude: -74.005974,
                }
            );
            console.log(vip_user);

            setLoading(false);
            notify("Registration successful");
            navigate(routes.dashboard.path);
        } catch (error) {
            console.error(
                "Error:",
                error.response?.data?.message || error.message
            );
            setLoading(false);
            notifyError(error.response?.data?.message || "An error occurred");
        }
    };

    if (!isLoaded) return <div>Loading...</div>;

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

                            {loading ? (
                                <Button
                                    title={<LoadingIcon />}
                                    className="mt-5 !p-1 flex justify-center"
                                />
                            ) : (
                                <Button title={"Send"} className="mt-5" />
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default VerifiedOtp;
