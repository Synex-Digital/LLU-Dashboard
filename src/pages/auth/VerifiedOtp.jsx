import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

import { FaArrowLeftLong } from "react-icons/fa6";
import { routes } from "../../routes/Routers";
import { toast } from "react-toastify";
import axios from "axios";
import { LoadingIcon } from "../../assets/icon";
import { useLoadScript } from "@react-google-maps/api";

const VerifiedOtp = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [mapLocation, setMapLocation] = useState(null);
    const inputRefs = useRef([]);
    const location = useLocation();
    const UserData = location?.state;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAP_KEY}&loading=async`,
    });
    console.log(mapLocation);

    const notify = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setMapLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting location", error);
                    setMapLocation({ lat: 23.7918436, lng: 90.3666064 });
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

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

        if (!mapLocation) {
            notifyError("Unable to get your location. Please try again.");
            setLoading(false);
            return;
        }

        let user_OTP = Number(otp.join(""));
        try {
            // Step 1: Verify OTP
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

            // Step 2: Register User
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

            // Step 3: Register VIP User with Real-Time Location
            let vip_user = await axios.post(
                `${baseUrl}/auth/register_special_user/${response.data.user_id}?type=facilitator`,
                {
                    no_of_professionals: response.data.user_id,
                    latitude: mapLocation.lat,
                    longitude: mapLocation.lng,
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
